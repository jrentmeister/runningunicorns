'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Play } from 'lucide-react'
import { ShearedRectangle, TrianglePattern } from './GeometricShapes'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

interface HeroSectionProps {
  imageSrc: string
  title: string
  subtitle: string
  ctaText?: string
  ctaAction?: () => void
  height?: string
}

export function HeroSection({
  imageSrc,
  title,
  subtitle,
  ctaText = 'LISTEN NOW',
  ctaAction = () => console.log('CTA clicked'),
  height = 'h-[80vh]',
}: HeroSectionProps) {
  const reducedMotion = useReducedMotion()

  return (
    <section className={`relative w-full ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent" />

      <TrianglePattern className="text-white" />

      <ShearedRectangle
        className="w-96 h-96 -top-20 -right-20"
        gradient="from-brand-blue/30 to-brand-mint/30"
      />
      <ShearedRectangle
        className="w-64 h-64 -bottom-10 -left-10"
        gradient="from-brand-pink/30 to-brand-purple/30"
        skew="-skew-y-3"
      />

      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-erbaum text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8 }}
          >
            {title}
          </motion.h1>

          <motion.p
            className="font-poppins text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.4 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-brand-blue to-brand-mint border-2 border-white/20 backdrop-blur-sm font-poppins font-bold text-base px-8"
              onClick={ctaAction}
              data-testid="button-hero-cta"
            >
              <Play className="mr-2 h-5 w-5" />
              {ctaText}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
