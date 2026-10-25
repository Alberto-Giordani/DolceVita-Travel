import { fromNodeHeaders } from 'better-auth/node'
import { auth } from '../auth.js'

export async function requireAuth(req, res, next) {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        })

        if (!session?.user) {
            return res.status(401).json({
                error: 'Please sign in before starting checkout.',
            })
        }

        req.user = session.user

        next()
    } catch (error) {
        console.error('Session verification failed:', error.message)

        return res.status(503).json({
            error: 'Unable to verify your session. Please try again.',
        })
    }
}