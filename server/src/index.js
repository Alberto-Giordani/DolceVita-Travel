import 'dotenv/config'
import express from 'express'
import { toursRouter } from './routes/tours.js'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

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