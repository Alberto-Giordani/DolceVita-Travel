import {Router} from 'express'
import {db} from '../db/index.js'
import {tours} from '../db/schema.js'

export const toursRouter = Router()

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