import { Router } from 'express'
import { eq } from 'drizzle-orm'
import { db } from '../db/index.js'
import { tours } from '../db/schema.js'

export const toursRouter = Router()

// Return all tours.
toursRouter.get('/', async (_req, res) => {
    try {
        const rows = await db.select().from(tours)

        res.json(rows)
    } catch (error) {
        console.error('Failed to load tours:', error.message)

        res.status(500).json({
            error: 'Unable to load tours',
        })
    }
})

// Return one tour matching the requested slug.
toursRouter.get('/:slug', async (req, res) => {
    try {
        const rows = await db
            .select()
            .from(tours)
            .where(eq(tours.slug, req.params.slug))
            .limit(1)

        const tour = rows[0]

        if (!tour) {
            return res.status(404).json({
                error: 'Tour not found',
            })
        }

        res.json(tour)
    } catch (error) {
        console.error('Failed to load tour:', error.message)

        res.status(500).json({
            error: 'Unable to load tour',
        })
    }
})