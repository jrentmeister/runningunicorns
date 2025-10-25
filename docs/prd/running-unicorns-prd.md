# Running Unicorns PRD (Draft)

## 1. Overview
- **Product**: Running Unicorns — podcast and community hub celebrating sport, culture, and human connection.
- **Goal**: Deliver an energetic, inclusive web experience featuring podcast discovery, community events, guest booking, and merch.
- **Status**: Brand approved.

## 2. Audience & Personas
- **Core listeners**: 20–40 year olds who blend athletic pursuits with creative and entrepreneurial interests.
- **Community members**: Local and online supporters seeking events, merch, and guest engagement.
- **Potential guests & partners**: Athletes, artists, activists evaluating brand credibility before committing to collaborations.

## 3. Success Metrics
- Increase podcast play-through and newsletter growth (baseline TBD).
- Minimum 30% CTA click-through on booking and merch modules during launch month.
- Event RSVPs conversion ≥ 20% of unique event page visitors.

## 4. Feature Set (MVP)
1. **Homepage**: Kinetic hero, featured episodes, community highlights.
2. **Podcast Library**: Filterable episode grid with hover animations, detail view, embedded player links.
3. **Guest Booking**: Calendly-integrated form with contextual copy and FAQ.
4. **Merch Store**: Curated products surfaced from Shopify Lite/Printful feed; cart/checkout handled by provider.
5. **Events Page**: Calendar overview, upcoming list, ability to subscribe (ICS/Google) and RSVP.
6. **Newsletter**: ConvertKit signup blocks throughout; track conversions.

## 5. Design Direction
- **Palette**: Gradients using #3b76f9, #68e2ab, #f069b7, #f86634, #a761f2.
- **Typography**: Erbaum (titles), Poppins (body/supporting).
- **Visual Language**: Geometric shapes, layered gradients, motion patterns, inclusive imagery.
- **Animation**: Subtle hover motion on cards, scroll-triggered reveals, smooth transitions respecting reduced motion.

## 6. Functional Requirements
- Responsive layout (mobile-first, optimized up to 1440px).
- Episode data sourced from RSS feed ingestion (cron every 30 min).
- Events data sync from canonical source (Google Calendar or CMS) with timezone awareness.
- Merch data via Shopify Lite or Printful API with fallback to static placeholders.
- Booking embed modular; enable/disable via env flag.
- Newsletter components reusable across pages; handle success/failure states.

## 7. Non-Functional Requirements
- **Performance**: Largest Contentful Paint < 2.5s on 3G; hydrate critical content via server components/ISR.
- **Accessibility**: WCAG 2.1 AA (focus, contrast, semantic structure).
- **Security**: Env secrets stored in Vercel; validate external JSON with Zod.
- **Scalability**: Architecture supports future mobile app via shared API endpoints.
- **Maintainability**: Documented code structure, typed modules, test coverage (unit + integration + e2e).

## 8. Integrations
- **Podcast**: RSS -> ingestion job -> Postgres -> `/api/rss`.
- **Merch**: Shopify Lite/Printful -> aggregator -> `/api/merch`.
- **Events**: Google Calendar API -> transformer -> `/api/events`.
- **Booking**: Calendly embed.
- **Newsletter**: ConvertKit form API.

## 9. Timeline (High-Level)
1. Visual design system & component library.
2. Next.js App Router scaffolding + placeholder datasets.
3. Data integration (RSS, merch, events).
4. QA & accessibility hardening.
5. Content upload, analytics wiring, launch.

## 10. Risks & Mitigations
- **RSS feed quality**: If metadata inconsistent, fallback to manual CMS overrides.
- **Multiple providers**: Abstract service adapters to swap vendors without touching UI.
- **Animation performance**: Test on mid-tier devices; provide static fallback for high-motion scenes.
- **Content freshness**: Automate ingestion and alerting on failures (cron logs + notifications).

## 11. Open Questions
- Final selection of database (Neon vs Supabase) and ORM (Drizzle vs Prisma).
- Ownership for content updates (manual via CMS vs automated sync).
- Scope of merch experience (direct checkout vs external redirect).

_Prepared for James to reference once the story enters development._
