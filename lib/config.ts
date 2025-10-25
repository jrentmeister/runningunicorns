export const siteConfig = {
  name: 'Running Unicorns',
  description: 'Podcast and community hub celebrating sport, culture, and human connection',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  links: {
    twitter: 'https://twitter.com/runningunicorns',
    instagram: 'https://instagram.com/runningunicorns',
  },
}

export const brandColors = {
  blue: '#3b76f9',
  mint: '#68e2ab',
  pink: '#f069b7',
  orange: '#f86634',
  purple: '#a761f2',
} as const
