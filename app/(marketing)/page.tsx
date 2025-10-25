import { HeroSection } from './components/HeroSection'
import { EpisodeCard } from './components/EpisodeCard'
import { mockEpisodes } from '@/lib/rss/mockFeed'

export default function HomePage() {
  const featuredEpisodes = mockEpisodes.slice(0, 3)

  return (
    <>
      <HeroSection
        imageSrc="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1920"
        title="Running Unicorns"
        subtitle="Sports talk that runs deeper. Conversations to fuel your life, your passion, and your decisions."
      />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="font-erbaum text-4xl font-black uppercase text-center mb-12 gradient-text">
            Featured Episodes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEpisodes.map((episode) => (
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
      </section>
    </>
  )
}
