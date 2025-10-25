import { EpisodeCard } from '../components/EpisodeCard'
import { mockEpisodes } from '@/lib/rss/mockFeed'

export const metadata = {
  title: 'Podcasts | Running Unicorns',
  description: 'Browse all Running Unicorns podcast episodes',
}

export default function PodcastsPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <h1 className="font-erbaum text-5xl font-black uppercase mb-4 gradient-text">
          All Episodes
        </h1>
        <p className="font-poppins text-lg text-muted-foreground mb-12">
          Deep conversations with athletes, artists, and activists
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockEpisodes.map((episode) => (
            <EpisodeCard
              key={episode.id}
              episodeNumber={episode.episodeNumber}
              theme={episode.title}
              guestName={episode.guestName}
              description={episode.description}
              imageSrc={episode.imageUrl}
              duration={episode.duration}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
