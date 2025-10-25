# Running Unicorns Tech Stack

## Platform & Hosting
- **Primary Framework**: Next.js 15 (App Router) with TypeScript.
- **Runtime**: Node.js 20 on Vercel Edge / Serverless Functions as appropriate.
- **Hosting**: Vercel (preview deployments per branch, production on `main`).
- **Background Jobs**: Vercel Scheduled Functions (cron) or external scheduler invoking `/api/cron/*` routes.

## Frontend
- **UI Layer**: React 18 Server/Client Components mix.
- **Styling**: Tailwind CSS with custom theme tokens; shadcn/ui for Radix-driven primitives.
- **Animations**: Framer Motion with reduced-motion fallbacks.
- **State/Data**: React Query for client-side invalidation + Suspense for server data.
- **Fonts**: Erbaum (headings) via Adobe/hosted CSS; Poppins (body) via Google Fonts.
- **Media Handling**: Next Image Optimization for episode art and merch imagery.

## Backend
- **API Surface**: Next.js Route Handlers under `app/api/*`.
- **Ingestion Services**: Server actions + cron tasks to fetch and persist RSS feed, events data, and merch catalog.
- **Real-Time**: Not required initially; consider Pusher/Ably if live events emerge.

## Data Layer
- **Database**: Neon Serverless PostgreSQL (recommended) via Prisma or Drizzle ORM (pending final selection).
- **ORM Choice**: Drizzle ORM for schema-first approach with Zod validation (matches existing placeholder schema).
- **Caching**: Incremental Static Regeneration or React Cache for frequently accessed read operations.
- **Content Management**: Optional headless CMS (e.g., Sanity) if editors need GUI; otherwise maintain via admin routes.

## Tooling
- **Package Manager**: pnpm.
- **Linting/Formatting**: ESLint (`next/core-web-vitals`) + Prettier.
- **Testing**: Vitest + React Testing Library + Playwright.
- **CI/CD**: GitHub Actions wiring to Vercel (lint/test/build + deploy).
- **Analytics**: Vercel Web Analytics or PostHog for engagement tracking.

## Integrations (Initial Placeholders)
- **Podcast RSS**: Mock module returning sample episodes; future integration pulls from real RSS endpoint.
- **Merch**: Placeholder data aligned with Shopify/Printful schema; swap to live provider when credentials provided.
- **Calendar/Events**: Placeholder events list; eventual sync from Google Calendar (API) or ConvertKit events.
- **Newsletter**: ConvertKit embed component; use env-driven form ID.
- **Booking**: Calendly inline widget; load script lazily.

## Observability
- **Logging**: Console logging now, design for upgrade to Axiom/Logtail via Vercel integrations.
- **Metrics**: Vercel request metrics + custom API timing logs.
- **Error Tracking**: Plan for Sentry integration once app stabilizes.

## Security & Compliance
- HTTPS enforced through Vercel.
- Implement Content Security Policy via Next.js headers.
- Rate-limit API endpoints (middleware) to protect from abuse.
- Sanitize external data prior to rendering; no eval/dynamic HTML without purification.

## Future Enhancements
- Offline-ready mobile experience (PWA) if community demands.
- Personalized dashboards once authentication is introduced.
- Multi-tenant capabilities for partner podcasts.
