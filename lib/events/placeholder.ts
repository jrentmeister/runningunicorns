import { z } from 'zod'

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  location: z.string(),
  imageUrl: z.string().url(),
  rsvpUrl: z.string().url().optional(),
  type: z.enum(['live-recording', 'meetup', 'workshop', 'panel']),
  capacity: z.number().optional(),
})

export type Event = z.infer<typeof eventSchema>

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Live Podcast Recording: The Future of Sport',
    description:
      'Join us for a live recording with special guests discussing how technology is transforming athletic performance and fan engagement.',
    date: '2025-03-15T19:00:00Z',
    location: 'Brooklyn Creative Studio, NYC',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    rsvpUrl: 'https://example.com/events/e1',
    type: 'live-recording',
    capacity: 50,
  },
  {
    id: 'e2',
    title: 'Community Run & Brunch',
    description:
      'Casual 5K through the city followed by a community brunch. All paces welcome!',
    date: '2025-03-22T08:00:00Z',
    location: 'Prospect Park, Brooklyn',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
    rsvpUrl: 'https://example.com/events/e2',
    type: 'meetup',
    capacity: 30,
  },
  {
    id: 'e3',
    title: 'Building Your Personal Brand Workshop',
    description:
      'Interactive session on storytelling, social media strategy, and authentic community building for athletes and creatives.',
    date: '2025-04-10T18:00:00Z',
    location: 'The Commons Co-Working, Manhattan',
    imageUrl: 'https://images.unsplash.com/photo-1559223607-a43c990c8d0b?w=800',
    rsvpUrl: 'https://example.com/events/e3',
    type: 'workshop',
    capacity: 25,
  },
  {
    id: 'e4',
    title: 'Panel: Sport, Culture, & Social Change',
    description:
      'Moderated discussion with activist athletes on using platforms for advocacy and community impact.',
    date: '2025-04-28T19:30:00Z',
    location: 'Impact Hub, Brooklyn',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
    rsvpUrl: 'https://example.com/events/e4',
    type: 'panel',
    capacity: 75,
  },
]
