# Running Unicorns

Podcast and community hub celebrating sport, culture, and human connection.

## Tech Stack

- **Framework**: Next.js 15 (App Router) with TypeScript
- **Database**: Drizzle ORM + Neon PostgreSQL
- **Styling**: Tailwind CSS v4 with custom brand tokens
- **UI Components**: shadcn/ui + custom components
- **Animations**: Framer Motion with reduced-motion support
- **Data Fetching**: React Query + Next.js Server Components
- **Testing**: Vitest + React Testing Library + Playwright
- **Hosting**: Vercel with Scheduled Functions for cron jobs

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env.local

# Set up database (requires DATABASE_URL)
pnpm db:generate    # Generate migrations
pnpm db:migrate     # Run migrations
pnpm db:seed        # Seed with placeholder data

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
pnpm test         # Run unit tests with Vitest
pnpm test:e2e     # Run E2E tests with Playwright

# Database
pnpm db:generate  # Generate migration from schema changes
pnpm db:migrate   # Apply migrations to database
pnpm db:seed      # Seed database with placeholder data
pnpm db:studio    # Launch Drizzle Studio (database GUI)
```

## Project Structure

See [docs/architecture/source-tree.md](docs/architecture/source-tree.md) for detailed structure.

```
/
├── app/
│   ├── (marketing)/         # Public-facing routes
│   │   ├── components/      # Shared marketing components
│   │   ├── podcasts/
│   │   ├── merch/
│   │   ├── events/
│   │   └── booking/
│   └── api/                 # API route handlers
│       ├── rss/             # RSS feed proxy
│       ├── merch/           # Merch catalog
│       ├── events/          # Events data
│       └── cron/            # Scheduled jobs
├── components/ui/           # shadcn/ui components
├── lib/                     # Utilities and data modules
│   ├── rss/                 # RSS placeholder data
│   ├── merch/               # Merch placeholder data
│   ├── events/              # Events placeholder data
│   ├── config.ts            # Site configuration
│   └── utils.ts             # Helper functions
└── tests/                   # Test suites
```

## Environment Variables

See [.env.example](.env.example) for all available variables.

### Required for Development

None - the app runs with placeholder data out of the box.

### Required for Production

- `NEXT_PUBLIC_SITE_URL` - Public URL of deployed site
- `CRON_SECRET` - Secret for authenticating cron requests

### Optional Integrations

- `RSS_FEED_URL` - RSS feed for podcast episodes
- `SHOPIFY_*` / `PRINTFUL_TOKEN` - Merch provider credentials
- `GOOGLE_CALENDAR_*` - Events sync credentials
- `NEXT_PUBLIC_CALENDLY_URL` - Guest booking embed
- `NEXT_PUBLIC_CONVERTKIT_FORM_ID` - Newsletter signup
- `DATABASE_URL` - PostgreSQL connection (Neon/Supabase)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

Vercel will automatically:

- Run builds on every push
- Enable Scheduled Functions for RSS sync (cron)
- Optimize for edge performance

### Cron Jobs

The RSS sync job runs every 30 minutes via Vercel Scheduled Functions:

- Endpoint: `/api/cron/rss-sync`
- Schedule: `*/30 * * * *`
- Requires: `CRON_SECRET` env var

## Data Integration Status

### Current (Placeholder)

- RSS episodes: `lib/rss/mockFeed.ts`
- Merch items: `lib/merch/placeholder.ts`
- Events: `lib/events/placeholder.ts`

### Future Implementation

1. **RSS Ingestion**: Implement actual feed parsing in `/api/cron/rss-sync`
2. **Database**: Add Drizzle ORM + Neon PostgreSQL for persistence
3. **Merch**: Connect to Shopify Lite or Printful API
4. **Events**: Sync from Google Calendar API or CMS
5. **Newsletter**: Wire ConvertKit form submission

See [docs/architecture/tech-stack.md](docs/architecture/tech-stack.md) for integration details.

## Development Standards

- Follow [docs/architecture/coding-standards.md](docs/architecture/coding-standards.md)
- Use TypeScript with strict mode
- Write tests for new features
- Ensure accessibility (WCAG 2.1 AA)
- Respect reduced-motion preferences

## Contributing

1. Create a feature branch
2. Make changes with tests
3. Run `pnpm lint && pnpm test && pnpm build`
4. Submit PR with description

## License

© 2025 Running Unicorns. All rights reserved.
