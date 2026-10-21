import { db, client } from './index.js'
import { tours } from './schema.js'
import { toursData } from './tours.data.js'

try {
    for (const tour of toursData) {
        await db
            .insert(tours)
            .values(tour)
            .onConflictDoUpdate({
                target: tours.id,
                set: {
                    slug: tour.slug,
                },
            })
    }

    console.log(`Seeded ${toursData.length} tours.`)
} catch (error) {
    console.error('Seeding failed:', error.message)
    process.exitCode = 1
} finally {
    await client.end()
}