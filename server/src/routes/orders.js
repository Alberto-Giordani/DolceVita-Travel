import { Router } from 'express'
import { and, eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { orders, orderItems } from '../db/schema.js'
import { requireAuth } from '../middleware/require-auth.js'

export const ordersRouter = Router()

ordersRouter.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
})

ordersRouter.use(requireAuth)

ordersRouter.get('/:orderId', async (req, res) => {
    try {
        const [order] = await db
            .select({
                id: orders.id,
                status: orders.status,
                currency: orders.currency,
                totalAmount: orders.totalAmount,
                createdAt: orders.createdAt,
                paidAt: orders.paidAt,
            })
            .from(orders)
            .where(
                and(
                    eq(orders.id, req.params.orderId),
                    eq(orders.userId, req.user.id)
                )
            )
            .limit(1)

        if (!order) {
            return res.status(404).json({
                error: 'Order not found.',
            })
        }

        const items = await db
            .select({
                id: orderItems.id,
                tourTitle: orderItems.tourTitle,
                quantity: orderItems.quantity,
                unitPrice: orderItems.unitPrice,
            })
            .from(orderItems)
            .where(eq(orderItems.orderId, order.id))

        return res.json({
            ...order,
            items,
        })
    } catch (error) {
        console.error('Order lookup failed:', error.message)

        return res.status(500).json({
            error: 'Unable to load your order. Please try again.',
        })
    }
})