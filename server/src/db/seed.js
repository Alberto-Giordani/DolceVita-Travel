import { db, client } from './index.js'
import { tours } from './schema.js'
import { toursData } from './tours.data.js'

try {
  const inserted = await db
    .insert(tours)
    .values(toursData)
    .onConflictDoNothing({ target: tours.id })
    .returning({ id: tours.id })

  console.log(`Inserted ${inserted.length} tours.`)
} catch (error) {
  console.error('Seeding failed:', error.message)
  process.exitCode = 1
} finally {
  await client.end()
}