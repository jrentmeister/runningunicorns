import { NextResponse } from 'next/server'
import { db, events } from '@/db'
import { gt, desc } from 'drizzle-orm'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const upcoming = searchParams.get('upcoming') === 'true'

    let query = db.select().from(events).orderBy(desc(events.date))

    if (upcoming) {
      const now = new Date()
      query = query.where(gt(events.date, now)) as any
    }

    const allEvents = await query

    // Transform to match frontend expected format
    const formattedEvents = allEvents.map((event: any) => ({
      id: event.externalId || event.id,
      title: event.title,
      description: event.description,
      date: event.date.toISOString(),
      location: event.location,
      imageUrl: event.imageUrl,
      rsvpUrl: event.rsvpUrl,
      type: event.type,
      capacity: event.capacity,
    }))

    return NextResponse.json({
      events: formattedEvents,
      meta: {
        total: formattedEvents.length,
        types: ['live-recording', 'meetup', 'workshop', 'panel'],
      },
    })
  } catch (error) {
    console.error('Events API error:', error)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}
