# Database Initialization

## First-time setup

Run the following command to initialize the SQLite database and create the default admin user:

```bash
npx tsx scripts/init-db.ts
```

## Default Admin Credentials

- **Email:** admin@zhixinpaper.com
- **Password:** ZhixinAdmin2025!

**⚠️ Important:** Change the password immediately after first login via `/admin/settings`.

## Database Location

The database is stored at `data/zhixinpaper.db` (excluded from git).

## Admin Panel

Access the admin panel at: `/admin`

## Modules

| Module | URL | Description |
|--------|-----|-------------|
| Dashboard | `/admin` | Overview stats, recent leads, trends |
| Contact Inquiries | `/admin/inquiries` | Contact form submissions |
| Quote Requests | `/admin/quotes` | Quote form submissions |
| Sample Requests | `/admin/samples` | Sample request form submissions |
| Blog Posts | `/admin/blog` | Create, edit, publish blog articles |
| Products | `/admin/products` | Override product descriptions |
| Settings | `/admin/settings` | Change admin password |
