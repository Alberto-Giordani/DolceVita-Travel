import { sql } from 'drizzle-orm'
import { db, client } from './index.js'

try {
  await db.execute(sql`select 1`)
  console.log('Database connection successful!')
} catch {
  console.error('Database connection failed. Check your connection settings.')
  process.exitCode = 1
} finally {
  await client.end()
}