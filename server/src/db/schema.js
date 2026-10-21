import { pgTable, text, integer } from 'drizzle-orm/pg-core'

export const tours = pgTable('tours', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  days: integer('days').notNull(),
  nights: integer('nights').notNull(),
  price: integer('price').notNull(),
  image: text('image').notNull(),
  alt: text('alt').notNull(),
})