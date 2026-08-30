# Zhixin Paper Website

Next.js App Router website for Zhixin Paper's thermal paper roll and thermal label catalog, regional and industry pages, compliance-document review content, inquiry workflows, blog, case studies, and internal administration.

## Requirements

- Node.js and npm
- Environment variables copied from `.env.example`
- A local libSQL file for development, or Turso credentials for a hosted database

## Local Development

```bash
npm install
npm run db:init
npm run dev
```

The development server uses the URL printed by Next.js. The database defaults to `data/zhixinpaper.db` when `TURSO_DATABASE_URL` is not set.

## Hostinger GitHub Deployment

Hostinger Node.js Web Apps supports Next.js deployments from GitHub. Use a Business or Cloud plan, select **Deploy Web App** → **Import Git Repository**, and choose this repository. Hostinger supports Node.js 18.x, 20.x, 22.x, and 24.x; this project declares Node.js `>=20.9.0`, so select Node.js 20 or newer.

Use these build settings when Hostinger asks for them:

- Install command: `npm install`
- Build command: `npm run build`
- Start command: `npm run start`
- Framework: `Next.js`

The `prebuild` script runs `npm run db:init` before `next build`. This creates the schema on a fresh GitHub checkout, where the ignored local `data/` directory is not present. For production, configure `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in Hostinger instead of relying on the local SQLite fallback.

Add the required runtime variables from `.env.example` in Hostinger's environment-variable settings, especially `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_SESSION_SECRET`, and `NEXT_PUBLIC_SITE_URL`. Add R2 and notification variables if the media library or inquiry notifications are enabled. Do not commit `.env.local`, credentials, API keys, or database tokens.

After deployment, verify the public homepage, `/contact`, `/samples`, `/api/quote` (POST), `/sitemap.xml`, and `/robots.txt`. GitHub-connected deployments redeploy after pushes to the selected production branch.

## Quality Gates

Run the repository-defined checks before release:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The test suite covers product-explorer behavior, optimization-log behavior, route and architecture contracts, and inquiry-delivery status handling.

## Application Structure

- `src/app`: public pages, admin pages, metadata routes, and API routes
- `src/components`: shared layout, UI, product, and admin components
- `src/lib/data.ts`: shared product, industry, region, compliance, and blog index data
- `src/lib/blog-content.ts`: long-form static blog content
- `src/lib/db`: Drizzle schema and libSQL client
- `src/lib/inquiry-delivery.ts`: inquiry acceptance and notification result contract
- `public`: static images, video, icons, and other public assets
- `tests`: Node-based unit and contract tests
- `scripts`: database, administration, migration, and operational scripts

## Environment Configuration

Use `.env.example` as the source of truth for variable names. Main groups are:

- Database: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`
- Admin session: `ADMIN_SESSION_SECRET` or legacy `NEXTAUTH_SECRET`
- Media storage: Cloudflare R2 variables
- Inquiry notification: ServerChan and/or Resend variables
- Canonical site URL: `NEXT_PUBLIC_SITE_URL`
- Optional Feishu reader variables

Do not commit `.env.local`, credentials, API keys, database tokens, or storage secrets.

## Content And Compliance Rules

Public claims about certificates, regulatory scope, product performance, compatibility, order quantity, samples, delivery, customs, and destination terms must be tied to the quoted product construction and current project evidence. Do not publish fixed certificate identifiers, universal compliance claims, or unconditional commercial promises without approved documentation.

## Database And Admin

`npm run db:init` initializes the configured database. Admin routes live under `/admin` and require a production-grade session secret. Media uploads require the configured R2 account, bucket, and public URL.

## Release Notes

A successful local build does not deploy the site. Production publishing, database changes, and production optimization-log entries are separate authorized operations and require post-release verification of public pages, forms, sitemap, canonical URLs, and genuine 404 responses.
