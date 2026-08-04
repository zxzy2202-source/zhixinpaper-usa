import { createClient } from "@libsql/client";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";

async function loadEnv(path) {
  if (!existsSync(path)) return;

  const raw = await readFile(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match) continue;

    const [, key, rawValue] = match;
    if (key.startsWith("#")) continue;

    let value = rawValue.trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

await loadEnv(".env.local");
await loadEnv(".env");

const url = process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log(`Init DB -> ${url}`);

if (url.startsWith("file:")) {
  const filePath = url.replace(/^file:/, "").replace(/^\.\//, "");
  const dir = dirname(filePath);
  if (dir && dir !== "." && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

const client = createClient({
  url,
  ...(authToken ? { authToken } : {}),
});

const statements = [
  `CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    last_login_at TEXT
  )`,
  `CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    notes TEXT,
    source TEXT DEFAULT 'contact_form',
    ip_address TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS quote_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    product_type TEXT,
    quantity TEXT,
    specifications TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    estimated_value REAL,
    notes TEXT,
    source TEXT DEFAULT 'quote_form',
    ip_address TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS sample_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    country TEXT,
    address TEXT,
    products TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'new',
    tracking_number TEXT,
    shipped_at TEXT,
    source TEXT DEFAULT 'samples_form',
    ip_address TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS blog_posts (
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
  )`,
  `CREATE TABLE IF NOT EXISTS product_overrides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    product_type TEXT NOT NULL,
    name TEXT,
    subtitle TEXT,
    hero_desc TEXT,
    description TEXT,
    features TEXT,
    specifications TEXT,
    moq TEXT,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS media_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT DEFAULT '',
    color TEXT DEFAULT '#6366f1',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS media_files (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    width INTEGER,
    height INTEGER,
    url TEXT NOT NULL,
    alt TEXT DEFAULT '',
    folder TEXT DEFAULT 'uploads',
    category_id INTEGER REFERENCES media_categories(id),
    uploaded_by INTEGER REFERENCES admin_users(id),
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS image_slots (
    slot_key TEXT PRIMARY KEY,
    media_file_id INTEGER REFERENCES media_files(id) ON DELETE SET NULL,
    updated_by INTEGER REFERENCES admin_users(id),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    section_key TEXT NOT NULL,
    value TEXT NOT NULL DEFAULT '{}',
    updated_by INTEGER REFERENCES admin_users(id),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
  `CREATE TABLE IF NOT EXISTS activity_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    admin_id INTEGER REFERENCES admin_users(id),
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id INTEGER,
    details TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`,
];

try {
  for (const statement of statements) {
    const tableName = statement.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
    await client.execute(statement);
    console.log(`  OK ${tableName}`);
  }

  const blogColumns = await client.execute("PRAGMA table_info(blog_posts)");
  const blogColumnNames = new Set(blogColumns.rows.map((row) => String(row.name)));
  const blogColumnAlters = [
    ["scheduled_at", "ALTER TABLE blog_posts ADD COLUMN scheduled_at TEXT"],
    ["publish_approved", "ALTER TABLE blog_posts ADD COLUMN publish_approved INTEGER NOT NULL DEFAULT 0"],
    ["campaign_id", "ALTER TABLE blog_posts ADD COLUMN campaign_id TEXT"],
  ];

  for (const [columnName, statement] of blogColumnAlters) {
    if (!blogColumnNames.has(columnName)) {
      await client.execute(statement);
      console.log(`  OK blog_posts.${columnName}`);
    }
  }

  console.log("\nDatabase initialized successfully");
  console.log(`   Tables: ${statements.length}`);
  console.log(`   Location: ${url}`);
} catch (error) {
  console.error("\nInit failed:", error.message);
  process.exit(1);
} finally {
  client.close();
}
