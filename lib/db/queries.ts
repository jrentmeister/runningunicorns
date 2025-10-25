import { db, episodes, merchItems, merchVariants, events } from '@/db'
import { desc, eq, gt } from 'drizzle-orm'

/**
 * Episode queries
 */
export async function getAllEpisodes() {
  return db.select().from(episodes).orderBy(desc(episodes.publishedAt))
}

export async function getEpisodeByNumber(episodeNumber: number) {
  const result = await db
    .select()
    .from(episodes)
    .where(eq(episodes.episodeNumber, episodeNumber))
    .limit(1)
  return result[0] || null
}

export async function getRecentEpisodes(limit: number = 5) {
  return db
    .select()
    .from(episodes)
    .orderBy(desc(episodes.publishedAt))
    .limit(limit)
}

/**
 * Merch queries
 */
export async function getAllMerchWithVariants() {
  const results = await db
    .select({
      item: merchItems,
      variant: merchVariants,
    })
    .from(merchItems)
    .leftJoin(merchVariants, eq(merchItems.id, merchVariants.itemId))

  // Group variants by item
  const itemsMap = new Map()
  for (const row of results) {
    const itemId = row.item.id
    if (!itemsMap.has(itemId)) {
      itemsMap.set(itemId, {
        ...row.item,
        variants: [],
      })
    }
    if (row.variant) {
      itemsMap.get(itemId).variants.push(row.variant)
    }
  }

  return Array.from(itemsMap.values())
}

export async function getMerchByCategory(category: string) {
  const results = await db
    .select({
      item: merchItems,
      variant: merchVariants,
    })
    .from(merchItems)
    .leftJoin(merchVariants, eq(merchItems.id, merchVariants.itemId))
    .where(eq(merchItems.category, category))

  // Group variants by item
  const itemsMap = new Map()
  for (const row of results) {
    const itemId = row.item.id
    if (!itemsMap.has(itemId)) {
      itemsMap.set(itemId, {
        ...row.item,
        variants: [],
      })
    }
    if (row.variant) {
      itemsMap.get(itemId).variants.push(row.variant)
    }
  }

  return Array.from(itemsMap.values())
}

/**
 * Events queries
 */
export async function getAllEvents() {
  return db.select().from(events).orderBy(desc(events.date))
}

export async function getUpcomingEvents() {
  const now = new Date()
  return db.select().from(events).where(gt(events.date, now)).orderBy(events.date)
}

export async function getEventById(id: string) {
  const result = await db.select().from(events).where(eq(events.id, id)).limit(1)
  return result[0] || null
}
