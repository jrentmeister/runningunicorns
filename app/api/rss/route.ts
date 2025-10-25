import { NextResponse } from 'next/server'
import { db, episodes } from '@/db'
import { desc } from 'drizzle-orm'

export async function GET() {
  try {
    const allEpisodes = await db
      .select()
      .from(episodes)
      .orderBy(desc(episodes.publishedAt))

    // Transform to match frontend expected format
    const formattedEpisodes = allEpisodes.map((ep: any) => ({
      id: ep.guid || ep.id,
      episodeNumber: ep.episodeNumber,
      title: ep.title,
      description: ep.description,
      guestName: ep.guestName,
      publishedAt: ep.publishedAt.toISOString(),
      duration: ep.duration,
      audioUrl: ep.audioUrl,
      imageUrl: ep.imageUrl,
    }))

    return NextResponse.json({
      episodes: formattedEpisodes,
      meta: {
        total: formattedEpisodes.length,
        lastUpdated: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('RSS feed error:', error)
    return NextResponse.json({ error: 'Failed to fetch episodes' }, { status: 500 })
  }
}
