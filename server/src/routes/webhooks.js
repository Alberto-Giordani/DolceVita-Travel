import 'dotenv/config'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders } from '../db/schema.js'
import { stripe } from '../stripe.js'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!webhookSecret?.startsWith('whsec_')) {
    throw new Error(
        'STRIPE_WEBHOOK_SECRET must contain your webhook signing secret.'
    )
}

const paymentEvents = [
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
]

export async function stripeWebhook(req, res) {
    let event

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            req.get('stripe-signature'),
            webhookSecret
        )
    } catch {
        return res.status(400).json({
            error: 'Invalid webhook signature.',
        })
    }

    if (event.livemode !== false) {
        return res.status(400).json({
            error: 'Only test-mode events are accepted.',
        })
    }

    if (!paymentEvents.includes(event.type)) {
        return res.json({ received: true })
    }

    const checkoutSession = event.data.object

    if (
        checkoutSession.mode !== 'payment' ||
        checkoutSession.payment_status !== 'paid'
    ) {
        return res.json({ received: true })
    }

    const orderId = checkoutSession.metadata?.orderId

    // Ignore Checkout Sessions unrelated to our orders.
    if (!orderId) {
        return res.json({ received: true })
    }

    try {
        const [order] = await db
            .select()
            .from(orders)
            .where(eq(orders.id, orderId))
            .limit(1)

        if (!order) {
            throw new Error('Webhook order was not found.')
        }

        if (
            order.stripeSessionId !== checkoutSession.id ||
            order.totalAmount !== checkoutSession.amount_total ||
            order.currency !== checkoutSession.currency
        ) {
            throw new Error(
                'Stripe checkout details do not match the order.'
            )
        }

        const [updatedOrder] = await db
            .update(orders)
            .set({
                status: 'paid',
                paidAt: new Date(),
            })
            .where(
                and(
                    eq(orders.id, orderId),
                    eq(orders.stripeSessionId, checkoutSession.id),
                    eq(orders.status, 'pending')
                )
            )
            .returning({ id: orders.id })

        if (updatedOrder) {
            console.log(`Order ${updatedOrder.id} marked as paid.`)
        }

        return res.json({ received: true })
    } catch (error) {
        console.error('Webhook processing failed:', error.message)

        return res.status(500).json({
            error: 'Unable to process the payment notification.',
        })
    }
}