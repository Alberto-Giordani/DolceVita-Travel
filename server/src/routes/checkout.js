import { randomUUID } from 'node:crypto'
import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { tours, orders, orderItems } from '../db/schema.js'
import { requireAuth } from '../middleware/require-auth.js'
import { stripe } from '../stripe.js'

export const checkoutRouter = Router()

const clientURL = new URL(process.env.CLIENT_URL).origin

checkoutRouter.use(requireAuth)

checkoutRouter.get('/check-auth', (req, res) => {
    res.json({
        ok: true,
        name: req.user.name,
    })
})

checkoutRouter.post('/', async (req, res) => {
    if (req.get('origin') !== clientURL) {
        return res.status(403).json({
            error: 'Checkout must be started from our website.',
        })
    }

    if (!req.is('application/json')) {
        return res.status(415).json({
            error: 'The request must contain JSON.',
        })
    }

    const { tourId, quantity } = req.body ?? {}

    if (typeof tourId !== 'string' || !tourId.trim()) {
        return res.status(400).json({
            error: 'A tour ID is required.',
        })
    }

    if (
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 8
    ) {
        return res.status(400).json({
            error: 'Choose between 1 and 8 travellers.',
        })
    }

    try {
        const [tour] = await db
            .select()
            .from(tours)
            .where(eq(tours.id, tourId))
            .limit(1)

        if (!tour) {
            return res.status(404).json({
                error: 'Tour not found.',
            })
        }

        // Existing tour prices are in dollars.
        // Orders and Stripe amounts use cents.
        const unitPrice = tour.price * 100
        const totalAmount = unitPrice * quantity
        const currency = 'usd'

        if (
            !Number.isSafeInteger(unitPrice) ||
            unitPrice <= 0 ||
            !Number.isSafeInteger(totalAmount) ||
            totalAmount > 2_147_483_647
        ) {
            throw new Error('Invalid tour price.')
        }

        const orderId = randomUUID()

        await db.transaction(async (tx) => {
            await tx.insert(orders).values({
                id: orderId,
                userId: req.user.id,
                status: 'pending',
                currency,
                totalAmount,
            })

            await tx.insert(orderItems).values({
                id: randomUUID(),
                orderId,
                tourId: tour.id,
                tourTitle: tour.title,
                quantity,
                unitPrice,
            })
        })

        const checkoutSession = await stripe.checkout.sessions.create(
            {
                mode: 'payment',
                allowed_payment_method_types: ['card'],

                adaptive_pricing: {
                    enabled: false,
                },

                customer_email: req.user.email,

                client_reference_id: orderId,

                metadata: {
                    orderId,
                },

                line_items: [
                    {
                        price_data: {
                            currency,
                            unit_amount: unitPrice,
                            product_data: {
                                name: tour.title,
                            },
                        },
                        quantity,
                    },
                ],

                success_url:
                    `${clientURL}/checkout/success?order_id=${orderId}`,

                cancel_url:
                    `${clientURL}/tours/${encodeURIComponent(tour.slug)}`,
            },
            {
                idempotencyKey: `checkout-${orderId}`,
            }
        )

        if (!checkoutSession.url) {
            throw new Error('Stripe did not return a checkout URL.')
        }

        await db
            .update(orders)
            .set({
                stripeSessionId: checkoutSession.id,
            })
            .where(eq(orders.id, orderId))

        return res.status(201).json({
            orderId,
            url: checkoutSession.url,
        })
    } catch (error) {
        console.error('Checkout creation failed:', error.message)

        return res.status(500).json({
            error: 'Unable to start checkout. Please try again.',
        })
    }
})