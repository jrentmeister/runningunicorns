import { pgTable, text, integer, timestamp, varchar, uuid, decimal } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// Episodes table
export const episodes = pgTable('episodes', {
  id: uuid('id').primaryKey().defaultRandom(),
  episodeNumber: integer('episode_number').notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  guestName: varchar('guest_name', { length: 255 }).notNull(),
  publishedAt: timestamp('published_at', { withTimezone: true }).notNull(),
  duration: varchar('duration', { length: 50 }).notNull(),
  audioUrl: text('audio_url').notNull(),
  imageUrl: text('image_url').notNull(),
  // RSS metadata
  guid: varchar('guid', { length: 500 }).unique(),
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Merch items table
export const merchItems = pgTable('merch_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  externalId: varchar('external_id', { length: 255 }).unique(), // Shopify/Printful ID
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  imageUrl: text('image_url').notNull(),
  category: varchar('category', { length: 50 }).notNull(), // apparel, accessories, prints
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Merch variants table
export const merchVariants = pgTable('merch_variants', {
  id: uuid('id').primaryKey().defaultRandom(),
  itemId: uuid('item_id')
    .notNull()
    .references(() => merchItems.id, { onDelete: 'cascade' }),
  externalId: varchar('external_id', { length: 255 }).unique(), // Shopify/Printful variant ID
  size: varchar('size', { length: 50 }),
  color: varchar('color', { length: 50 }),
  stock: integer('stock').notNull().default(0),
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Events table
export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  externalId: varchar('external_id', { length: 255 }).unique(), // Google Calendar event ID
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  date: timestamp('date', { withTimezone: true }).notNull(),
  location: varchar('location', { length: 500 }).notNull(),
  imageUrl: text('image_url').notNull(),
  rsvpUrl: text('rsvp_url'),
  type: varchar('type', { length: 50 }).notNull(), // live-recording, meetup, workshop, panel
  capacity: integer('capacity'),
  // Timestamps
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
})

// Type exports
export type Episode = typeof episodes.$inferSelect
export type NewEpisode = typeof episodes.$inferInsert

export type MerchItem = typeof merchItems.$inferSelect
export type NewMerchItem = typeof merchItems.$inferInsert

export type MerchVariant = typeof merchVariants.$inferSelect
export type NewMerchVariant = typeof merchVariants.$inferInsert

export type Event = typeof events.$inferSelect
export type NewEvent = typeof events.$inferInsert
