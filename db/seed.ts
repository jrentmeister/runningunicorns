import 'dotenv/config'
import { db, episodes, merchItems, merchVariants, events } from './index'
import { mockEpisodes } from '../lib/rss/mockFeed'
import { mockMerchItems } from '../lib/merch/placeholder'
import { mockEvents } from '../lib/events/placeholder'

async function seed() {
  console.log('🌱 Seeding database...')

  try {
    // Seed episodes
    console.log('📻 Seeding episodes...')
    for (const episode of mockEpisodes) {
      await db.insert(episodes).values({
        episodeNumber: episode.episodeNumber,
        title: episode.title,
        description: episode.description,
        guestName: episode.guestName,
        publishedAt: new Date(episode.publishedAt),
        duration: episode.duration,
        audioUrl: episode.audioUrl,
        imageUrl: episode.imageUrl,
        guid: episode.id,
      })
    }
    console.log(`✅ Seeded ${mockEpisodes.length} episodes`)

    // Seed merch items and variants
    console.log('👕 Seeding merch items...')
    for (const item of mockMerchItems) {
      const [insertedItem] = await db
        .insert(merchItems)
        .values({
          externalId: item.id,
          name: item.name,
          description: item.description,
          price: item.price.toString(),
          imageUrl: item.imageUrl,
          category: item.category,
        })
        .returning()

      // Seed variants for this item
      for (const variant of item.variants) {
        await db.insert(merchVariants).values({
          itemId: insertedItem.id,
          externalId: variant.id,
          size: variant.size,
          color: variant.color,
          stock: variant.stock,
        })
      }
    }
    console.log(`✅ Seeded ${mockMerchItems.length} merch items with variants`)

    // Seed events
    console.log('📅 Seeding events...')
    for (const event of mockEvents) {
      await db.insert(events).values({
        externalId: event.id,
        title: event.title,
        description: event.description,
        date: new Date(event.date),
        location: event.location,
        imageUrl: event.imageUrl,
        rsvpUrl: event.rsvpUrl,
        type: event.type,
        capacity: event.capacity,
      })
    }
    console.log(`✅ Seeded ${mockEvents.length} events`)

    console.log('✨ Database seeding complete!')
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seed()
