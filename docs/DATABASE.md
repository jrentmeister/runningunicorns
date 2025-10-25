# Database Layer Documentation

## Overview

Running Unicorns uses **Drizzle ORM** with **Neon PostgreSQL** for data persistence.

## Quick Start

### 1. Set Up Neon Database

1. Create account at [console.neon.tech](https://console.neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `.env.local`:

```bash
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require
```

### 2. Generate and Run Migrations

```bash
# Generate migration files from schema
pnpm db:generate

# Apply migrations to database
pnpm db:migrate
```

### 3. Seed Database

```bash
# Populate with placeholder data
pnpm db:seed
```

### 4. Explore Database (Optional)

```bash
# Launch Drizzle Studio
pnpm db:studio
```

Open [https://local.drizzle.studio](https://local.drizzle.studio) to browse data.

## Schema

### Tables

#### `episodes`
Stores podcast episodes from RSS feed ingestion.

```typescript
{
  id: uuid (PK)
  episodeNumber: integer (unique)
  title: varchar(255)
  description: text
  guestName: varchar(255)
  publishedAt: timestamp with timezone
  duration: varchar(50)
  audioUrl: text
  imageUrl: text
  guid: varchar(500) (unique) // RSS feed GUID
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `merch_items`
Merchandise products synced from Shopify/Printful.

```typescript
{
  id: uuid (PK)
  externalId: varchar(255) (unique) // Shopify/Printful ID
  name: varchar(255)
  description: text
  price: decimal(10,2)
  imageUrl: text
  category: varchar(50) // 'apparel' | 'accessories' | 'prints'
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `merch_variants`
Product variants (size, color) for merch items.

```typescript
{
  id: uuid (PK)
  itemId: uuid (FK -> merch_items.id)
  externalId: varchar(255) (unique)
  size: varchar(50)
  color: varchar(50)
  stock: integer
  createdAt: timestamp
  updatedAt: timestamp
}
```

#### `events`
Community events synced from Google Calendar.

```typescript
{
  id: uuid (PK)
  externalId: varchar(255) (unique) // Google Calendar event ID
  title: varchar(255)
  description: text
  date: timestamp with timezone
  location: varchar(500)
  imageUrl: text
  rsvpUrl: text
  type: varchar(50) // 'live-recording' | 'meetup' | 'workshop' | 'panel'
  capacity: integer
  createdAt: timestamp
  updatedAt: timestamp
}
```

## Usage

### Query Utilities

Use pre-built queries from `lib/db/queries.ts`:

```typescript
import { getAllEpisodes, getUpcomingEvents, getAllMerchWithVariants } from '@/lib/db/queries'

// Get all episodes
const episodes = await getAllEpisodes()

// Get upcoming events
const events = await getUpcomingEvents()

// Get merch with variants
const merch = await getAllMerchWithVariants()
```

### Direct Database Access

```typescript
import { db, episodes } from '@/db'
import { desc } from 'drizzle-orm'

const allEpisodes = await db
  .select()
  .from(episodes)
  .orderBy(desc(episodes.publishedAt))
```

### Error Handling

```typescript
import { handleDatabaseError, NotFoundError } from '@/lib/db/errors'

try {
  const episode = await getEpisodeByNumber(1)
  if (!episode) {
    throw new NotFoundError('Episode', 1)
  }
} catch (error) {
  handleDatabaseError(error)
}
```

## Migrations

### Creating Migrations

1. Update schema in `db/schema.ts`
2. Generate migration:

```bash
pnpm db:generate
```

3. Review generated SQL in `db/migrations/`
4. Apply migration:

```bash
pnpm db:migrate
```

### Migration Best Practices

- Always review generated SQL before applying
- Test migrations on development database first
- Use transactions for multi-statement migrations
- Keep migrations small and focused
- Never modify existing migration files after they've been applied

## Integration Points

### RSS Ingestion

The `/api/cron/rss-sync` endpoint:
1. Fetches RSS feed from `RSS_FEED_URL`
2. Parses episodes
3. Upserts to `episodes` table (by `guid`)
4. Runs every 30 minutes via Vercel Scheduled Functions

### Merch Sync

Future: Webhook or scheduled job to sync from Shopify/Printful API to `merch_items` and `merch_variants` tables.

### Events Sync

Future: Google Calendar API integration to sync events to `events` table.

## Connection Pooling

Neon Serverless driver handles connection pooling automatically. No additional configuration needed for Vercel serverless environment.

## Backup & Recovery

Neon provides:
- Automatic backups (configurable retention)
- Point-in-time recovery
- Branch/fork capabilities for development

Configure in Neon dashboard.

## Performance

### Indexes

Current indexes:
- `episodes.episodeNumber` (unique)
- `episodes.guid` (unique)
- `merch_items.externalId` (unique)
- `merch_variants.externalId` (unique)
- `events.externalId` (unique)

Add custom indexes as needed based on query patterns.

### Query Optimization

- Use `select()` to fetch only needed columns
- Add `.limit()` for large datasets
- Use joins sparingly; prefer separate queries for complex data
- Cache frequently accessed data with Next.js Data Cache

## Troubleshooting

### Migration Fails

```bash
# Reset database (DANGER: deletes all data)
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

### Connection Issues

- Verify `DATABASE_URL` is set correctly
- Check Neon dashboard for database status
- Ensure SSL mode is enabled (`?sslmode=require`)

### Seed Script Errors

- Ensure database is migrated first
- Check for duplicate data (seed script doesn't handle conflicts)
- Clear tables before re-seeding if needed

## Development Workflow

1. **Make schema changes** in `db/schema.ts`
2. **Generate migration**: `pnpm db:generate`
3. **Review SQL** in `db/migrations/`
4. **Apply migration**: `pnpm db:migrate`
5. **Test locally** with `pnpm dev`
6. **Commit** migration files
7. **Deploy** to Vercel (migrations run automatically via build hook)

## Production Considerations

- Set `DATABASE_URL` in Vercel environment variables
- Use Neon production branch for production deployments
- Monitor query performance via Neon dashboard
- Set up alerts for connection limits
- Consider read replicas for high-traffic scenarios

## Resources

- [Drizzle ORM Docs](https://orm.drizzle.team)
- [Neon Documentation](https://neon.tech/docs)
- [Drizzle Kit Reference](https://orm.drizzle.team/kit-docs/overview)
