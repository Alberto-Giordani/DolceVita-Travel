import express from 'express'

const app = express()
const PORT = Number(process.env.PORT ?? 3000)

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'DolceVita Travel API is running',
  })
})

app.listen(PORT, () => {
  console.log(`DolceVita API listening on http://localhost:${PORT}`)
})