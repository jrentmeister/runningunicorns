'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Play, Clock } from 'lucide-react'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface EpisodeCardProps {
  episodeNumber: number
  theme: string
  guestName: string
  description: string
  imageSrc: string
  duration?: string
  onPlay?: () => void
}

export function EpisodeCard({
  episodeNumber,
  theme,
  guestName,
  description,
  imageSrc,
  duration = '45 min',
  onPlay = () => console.log(`Playing episode ${episodeNumber}`),
}: EpisodeCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
      whileHover={reducedMotion ? {} : { y: -8 }}
    >
      <Card
        className="overflow-hidden group cursor-pointer"
        data-testid={`card-episode-${episodeNumber}`}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={imageSrc}
            alt={`Episode ${episodeNumber}: ${theme}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              className="h-16 w-16 rounded-full bg-white/90 hover:bg-white text-brand-blue backdrop-blur-sm"
              onClick={onPlay}
              data-testid={`button-play-${episodeNumber}`}
            >
              <Play className="h-8 w-8 fill-current" />
            </Button>
          </div>

          <Badge
            variant="secondary"
            className="absolute top-3 left-3 font-poppins font-bold bg-gradient-to-r from-brand-blue to-brand-mint text-white border-0"
          >
            EP. {episodeNumber}
          </Badge>
        </div>

        <div className="p-5 space-y-3">
          <h3
            className="font-erbaum text-2xl font-black uppercase tracking-tight gradient-text"
            data-testid={`text-theme-${episodeNumber}`}
          >
            {theme}
          </h3>

          <p
            className="font-poppins font-bold text-sm text-foreground"
            data-testid={`text-guest-${episodeNumber}`}
          >
            {guestName}
          </p>

          <p className="font-poppins font-light text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-poppins">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
