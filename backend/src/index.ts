import express from 'express'
import { prisma } from '@permitiq/db'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// Internal sanity check — verifies the DB connection is reachable.
// Not publicly exposed in production; gate behind network policy or internal auth.
app.get('/db/ping', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ status: 'ok' })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(503).json({ error: { code: 'DB_UNAVAILABLE', message } })
  }
})

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`)
})
