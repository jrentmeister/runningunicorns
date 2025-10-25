import Link from 'next/link'
import { siteConfig } from '@/lib/config'

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-erbaum text-xl font-black uppercase tracking-tight gradient-text mb-4">
              Running Unicorns
            </h3>
            <p className="font-poppins font-light text-sm text-muted-foreground max-w-sm">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h4 className="font-poppins font-bold text-sm uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm font-poppins font-light">
              <li>
                <Link
                  href="/podcasts"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Podcasts
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Merch
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Be a Guest
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-poppins font-bold text-sm uppercase mb-4">Connect</h4>
            <ul className="space-y-2 text-sm font-poppins font-light">
              <li>
                <a
                  href={siteConfig.links.instagram}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.twitter}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Spotify
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="font-poppins font-light text-sm text-muted-foreground">
            © 2025 Running Unicorns. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
