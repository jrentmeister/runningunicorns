# Running Unicorns Coding Standards

## Source Format & Style
- Use TypeScript with strict type checking (`"strict": true` in `tsconfig.json`).
- Adhere to Next.js 15 App Router conventions; colocate route handlers, server actions, and UI components under `app/`.
- Format with Prettier and lint with ESLint (`next/core-web-vitals` + custom rules). Ensure CI blocks on lint errors.
- Prefer function components and hooks; avoid class components.
- Keep files focused: one React component or utility per file. Extract shared UI into `/app/(marketing)/components`.
- Limit component props to typed interfaces; avoid `any`. Use Zod schemas for runtime validation of external data.

## Naming Conventions
- Directories and files: kebab-case (`episode-feed`, `merch-grid.tsx`). Shared React components can use PascalCase when exported (`HeroSection.tsx`).
- Constants: screaming snake case (`RSS_FEED_URL`), hooks `useX`, server actions `actionName`.
- Env vars prefixed with `NEXT_PUBLIC_` for browser exposure; otherwise keep private and accessed only in server code.

## React / Next.js Patterns
- Server components by default. Opt into `"use client"` only when a component needs browser APIs, stateful hooks, or animations.
- Wrap data fetching in `async` server components or server actions; for client-side reactivity use TanStack Query with explicit query keys.
- Avoid prop drilling by composing context providers at `app/layout.tsx` layer only when necessary.
- Use Suspense/Loading UI segments for async routes; provide skeletons for episode lists and merch grids.

## Styling & Motion
- Tailwind CSS with custom theme tokens defined in `tailwind.config.ts` (`brand.blue`, `brand.mint`, `brand.pink`, `brand.orange`, `brand.purple`).
- Encapsulate gradient backgrounds and geometric shapes in utility components to promote reuse.
- Use Framer Motion variants for hover and scroll animations; ensure reduced motion preferences are respected (`useReducedMotion`).
- Maintain accessibility: color contrast ≥ 4.5:1, keyboard focus states, ARIA labels for animated elements.

## Testing Standards
- Unit tests with Vitest and React Testing Library for component logic.
- Integration tests for API handlers using Vitest + Supertest.
- Snapshot tests allowed only for static UI shells; prefer assertion-based checks.
- Use Playwright for critical user flows (homepage load, episode playback CTA, booking modal, merch cart interaction).
- CI pipeline must run `pnpm lint`, `pnpm test`, and Playwright suites before deployment.

## Documentation & Comments
- Keep README and `/docs` updated with architectural decisions and integration status.
- Use JSDoc for complex utilities or data transformation logic.
- Avoid inline comments that describe the obvious; reserve for non-trivial decisions or edge cases.

## Git Hygiene
- One story per branch; use conventional commits (`feat:`, `fix:`, `chore:`).
- Require peer review before merging into `main`.
- Squash merge preferred to keep history linear.

## Error Handling & Logging
- Use typed error helpers for API routes; return standardized JSON `{ error: { code, message } }`.
- Log ingestion jobs and external API failures via a shared `logger` utility (console for now, future-ready for a hosted service).
- Surface meaningful user-facing error states (empty states, retries) instead of raw error messages.

## Security & Privacy
- Validate all external payloads (RSS, merch, calendaring) with Zod schemas.
- Never commit secrets; rely on Vercel environment variables.
- Sanitize user-supplied strings before rendering (e.g., Markdown from CMS).
