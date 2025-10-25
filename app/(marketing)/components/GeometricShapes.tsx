'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/lib/hooks/useReducedMotion'

export function ShearedRectangle({
  className = '',
  gradient = 'from-brand-blue to-brand-mint',
  skew = 'skew-y-3',
}: {
  className?: string
  gradient?: string
  skew?: string
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`absolute bg-gradient-to-r ${gradient} ${skew} opacity-20 ${className}`}
      initial={reducedMotion ? { opacity: 0.2, scale: 1 } : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.2, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.8 }}
    />
  )
}

export function TrianglePattern({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 opacity-10 ${className}`}>
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="triangles"
            x="0"
            y="0"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <polygon points="50,10 90,90 10,90" fill="currentColor" opacity="0.3" />
            <polygon points="25,30 40,60 10,60" fill="currentColor" opacity="0.2" />
            <polygon points="70,20 85,50 55,50" fill="currentColor" opacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#triangles)" />
      </svg>
    </div>
  )
}
