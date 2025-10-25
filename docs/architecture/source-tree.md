# Running Unicorns Source Tree

```
/
├── app/                         # Next.js App Router entry point
│   ├── (marketing)/             # Public-facing routes (home, podcasts, merch, events, booking)
│   │   ├── layout.tsx           # Shared layout for marketing pages
│   │   ├── page.tsx             # Homepage
│   │   ├── podcasts/            # Podcast library routes
│   │   ├── merch/               # Merch catalogue routes
│   │   ├── events/              # Events calendar views
│   │   └── booking/             # Guest booking page
│   ├── api/                     # Route handlers for data APIs
│   │   ├── rss/route.ts         # RSS feed proxy / normalized data
│   │   ├── merch/route.ts       # Merch catalogue handler
│   │   └── events/route.ts      # Events data handler
│   ├── layout.tsx               # Root layout (fonts, providers)
│   └── page.tsx                 # App index (redirects to `(marketing)`)
├── components/                  # Reusable UI primitives (shadcn/ui registry)
├── lib/
│   ├── rss/                     # RSS ingestion + placeholder data
│   ├── merch/                   # Merch placeholder + service adapters
│   ├── events/                  # Events placeholder + sync logic
│   ├── config.ts                # Site-wide config constants
│   └── logger.ts                # Logging utilities
├── public/                      # Static assets (favicons, fallback images)
├── styles/                      # Global CSS (Tailwind base, tokens, layer overrides)
├── tests/                       # Vitest unit/integration suites
│   ├── components/              # Component-focused tests
│   ├── api/                     # Route handler tests
│   └── e2e/                     # Playwright specs
├── scripts/                     # One-off scripts (migrations, cron triggers)
├── drizzle/ or prisma/          # ORM schema + migrations (final choice pending)
├── docs/                        # Project documentation (PRD, architecture, stories)
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── playwright.config.ts
```

## Notes
- Colocate feature-specific assets under route folders when they are not reused elsewhere.
- Keep server-only modules inside `lib/server/` (or mark with `.server.ts`) to prevent accidental client imports.
- Use `@/` alias pointing to project root via `tsconfig.json`.
