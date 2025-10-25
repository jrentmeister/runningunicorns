import { NextResponse } from 'next/server'
import { db, episodes } from '@/db'
import { sql } from 'drizzle-orm'

// Note: Edge runtime doesn't support all Node.js APIs
// For RSS parsing, consider using a serverless function instead
export const runtime = 'nodejs'

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized access
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    console.log('[RSS Sync] Starting RSS feed ingestion...')

    const rssUrl = process.env.RSS_FEED_URL
    if (!rssUrl) {
      console.log('[RSS Sync] RSS_FEED_URL not configured, skipping')
      return NextResponse.json({
        success: true,
        timestamp: new Date().toISOString(),
        episodesProcessed: 0,
        message: 'RSS_FEED_URL not configured',
      })
    }

    // TODO: Implement actual RSS parsing
    // For now, this is a placeholder that can be extended with rss-parser
    // Example:
    // const Parser = require('rss-parser')
    // const parser = new Parser()
    // const feed = await parser.parseURL(rssUrl)
    //
    // for (const item of feed.items) {
    //   await db.insert(episodes)
    //     .values({
    //       guid: item.guid,
    //       title: item.title,
    //       description: item.contentSnippet || item.content,
    //       guestName: extractGuestName(item),
    //       publishedAt: new Date(item.pubDate),
    //       duration: item.itunes?.duration || 'Unknown',
    //       audioUrl: item.enclosure?.url || '',
    //       imageUrl: item.itunes?.image || feed.image?.url || '',
    //       episodeNumber: extractEpisodeNumber(item),
    //     })
    //     .onConflictDoUpdate({
    //       target: episodes.guid,
    //       set: { updatedAt: sql`CURRENT_TIMESTAMP` }
    //     })
    // }

    const result = {
      success: true,
      timestamp: new Date().toISOString(),
      episodesProcessed: 0,
      message: 'RSS sync ready - add RSS_FEED_URL and implement parser',
    }

    console.log('[RSS Sync] Completed:', result)
    return NextResponse.json(result)
  } catch (error) {
    console.error('[RSS Sync] Error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
