# Running Unicorns Deployment Guide

## Quick Start

The project is configured for zero-config deployment to Vercel.

## Prerequisites

- GitHub repository linked to Vercel
- Vercel account
- Environment variables configured (see below)

## Deploy to Vercel

### Option 1: GitHub Integration (Recommended)

1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
pnpm add -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Environment Variables

### Required

```bash
NEXT_PUBLIC_SITE_URL=https://runningunicorns.com
CRON_SECRET=your-random-secret-string
```

### Optional (Future Integrations)

```bash
# RSS Feed
RSS_FEED_URL=https://example.com/feed.xml

# Merch Provider
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token
PRINTFUL_TOKEN=your_printful_token

# Events
GOOGLE_CALENDAR_ID=your_calendar_id
GOOGLE_CALENDAR_API_KEY=your_api_key

# Booking
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/runningunicorns

# Newsletter
NEXT_PUBLIC_CONVERTKIT_FORM_ID=your_form_id

# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Observability
SENTRY_DSN=https://your-sentry-dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
```

## Scheduled Functions (Cron Jobs)

The RSS sync runs automatically via Vercel Scheduled Functions:

- **Endpoint**: `/api/cron/rss-sync`
- **Schedule**: Every 30 minutes (`*/30 * * * *`)
- **Authentication**: Bearer token using `CRON_SECRET`

No additional configuration required - Vercel reads `vercel.json` automatically.

## Build Configuration

### Build Command
```bash
pnpm build
```

### Output Directory
```
.next/
```

### Node Version
20.x (specified in `package.json` via `packageManager`)

## Post-Deployment Checks

1. Visit homepage: `https://your-domain.com`
2. Test navigation between routes
3. Verify API endpoints:
   - `https://your-domain.com/api/rss`
   - `https://your-domain.com/api/merch`
   - `https://your-domain.com/api/events`
4. Check cron job logs in Vercel dashboard

## Custom Domain

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `NEXT_PUBLIC_SITE_URL` environment variable

## Performance

- **Target**: LCP < 2.5s on 3G
- **Strategy**: Static generation where possible, ISR for dynamic content
- **CDN**: Vercel Edge Network (automatic)
- **Image Optimization**: Next.js Image component (automatic)

## Monitoring

- **Vercel Analytics**: Enabled by default
- **Error Tracking**: Add Sentry DSN when ready
- **User Analytics**: Add PostHog key when ready

## Rollback

If deployment fails:

```bash
vercel rollback
```

Or use Vercel dashboard to redeploy previous version.

## Troubleshooting

### Build Fails

- Check build logs in Vercel dashboard
- Verify environment variables are set
- Test locally: `pnpm build`

### Cron Not Running

- Verify `CRON_SECRET` is set
- Check Vercel function logs
- Test endpoint manually:
  ```bash
  curl -H "Authorization: Bearer YOUR_SECRET" \
    https://your-domain.com/api/cron/rss-sync
  ```

### Runtime Errors

- Check Vercel function logs
- Verify API routes return expected data
- Test locally: `pnpm dev`

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- Project Issues: [GitHub Issues](https://github.com/your-org/runningunicorns/issues)
