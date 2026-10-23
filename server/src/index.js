import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './auth.js'
import { toursRouter } from './routes/tours.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

app.all('/api/auth/*splat', toNodeHandler(auth))

app.use(express.json())

app.get('/api/health', (_req, res) => {
    res.json({
        ok: true,
        message: 'DolceVita Travel API is running',
    })
})

app.use('/api/tours', toursRouter)

app.listen(PORT, () => {
    console.log(`DolceVita API listening on http://localhost:${PORT}`)
})