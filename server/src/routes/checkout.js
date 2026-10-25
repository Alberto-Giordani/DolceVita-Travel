import { Router } from 'express'
import { requireAuth } from '../middleware/require-auth.js'

export const checkoutRouter = Router()

checkoutRouter.use(requireAuth)

checkoutRouter.get('/check-auth', (req, res) => {
    res.json({
        ok: true,
        name: req.user.name,
    })
})