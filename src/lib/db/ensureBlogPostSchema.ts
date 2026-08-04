import { createClient } from "@libsql/client";

const CREATE_BLOG_POSTS_TABLE_SQL = `CREATE TABLE IF NOT EXISTS blog_posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT,
  tags TEXT,
  read_time TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  author_id INTEGER REFERENCES admin_users(id),
  published_at TEXT,
  scheduled_at TEXT,
  publish_approved INTEGER NOT NULL DEFAULT 0,
  campaign_id TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  cover_image TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
)`;

const COLUMN_ALTERS: Array<{ name: string; sql: string }> = [
  { name: "scheduled_at", sql: "ALTER TABLE blog_posts ADD COLUMN scheduled_at TEXT" },
  { name: "publish_approved", sql: "ALTER TABLE blog_posts ADD COLUMN publish_approved INTEGER NOT NULL DEFAULT 0" },
  { name: "campaign_id", sql: "ALTER TABLE blog_posts ADD COLUMN campaign_id TEXT" },
];

let ensurePromise: Promise<void> | null = null;

export function ensureBlogPostSchema() {
  if (ensurePromise) {
    return ensurePromise;
  }

  ensurePromise = (async () => {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db",
      ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
    });

    try {
      await client.execute(CREATE_BLOG_POSTS_TABLE_SQL);
      const info = await client.execute("PRAGMA table_info(blog_posts)");
      const columns = new Set(info.rows.map((row) => String(row.name)));

      for (const alter of COLUMN_ALTERS) {
        if (!columns.has(alter.name)) {
          await client.execute(alter.sql);
        }
      }
    } finally {
      client.close();
    }
  })();

  return ensurePromise;
}
