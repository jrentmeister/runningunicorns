import { z } from 'zod'

export const episodeSchema = z.object({
  id: z.string(),
  episodeNumber: z.number(),
  title: z.string(),
  description: z.string(),
  guestName: z.string(),
  publishedAt: z.string(),
  duration: z.string(),
  audioUrl: z.string().url(),
  imageUrl: z.string().url(),
})

export type Episode = z.infer<typeof episodeSchema>

export const mockEpisodes: Episode[] = [
  {
    id: '1',
    episodeNumber: 1,
    title: 'Finding Your Stride',
    description:
      'Olympic marathoner discusses the mental game, overcoming injury, and what it takes to compete at the highest level.',
    guestName: 'Sarah Martinez',
    publishedAt: '2025-01-15T08:00:00Z',
    duration: '42 min',
    audioUrl: 'https://example.com/ep1.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800',
  },
  {
    id: '2',
    episodeNumber: 2,
    title: 'Art Meets Hustle',
    description:
      'Street artist turned creative director shares how sports culture influences modern art and brand storytelling.',
    guestName: 'Marcus Chen',
    publishedAt: '2025-01-22T08:00:00Z',
    duration: '38 min',
    audioUrl: 'https://example.com/ep2.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?w=800',
  },
  {
    id: '3',
    episodeNumber: 3,
    title: 'Community Over Competition',
    description:
      'Grassroots organizer building youth sports programs in underserved neighborhoods talks impact and inclusion.',
    guestName: 'Aisha Williams',
    publishedAt: '2025-01-29T08:00:00Z',
    duration: '45 min',
    audioUrl: 'https://example.com/ep3.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
  },
  {
    id: '4',
    episodeNumber: 4,
    title: 'From Courtside to Boardroom',
    description:
      'Former pro athlete turned entrepreneur discusses transitioning careers and building a tech startup.',
    guestName: 'James Rodriguez',
    publishedAt: '2025-02-05T08:00:00Z',
    duration: '50 min',
    audioUrl: 'https://example.com/ep4.mp3',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
  },
]
