/**
 * 一次性数据库初始化脚本
 * ─────────────────────────────────────────────────────────────────
 * 用法：npm run db:init
 *
 * 行为：
 *   - 读取 TURSO_DATABASE_URL（默认 file:./data/zhixinpaper.db）
 *   - 自动创建 data/ 目录
 *   - 用 CREATE TABLE IF NOT EXISTS 建所有表（幂等，可重复跑）
 *   - 不会删数据
 *
 * 设计原因：项目用 drizzle-orm 但没有 migrations 目录，
 *   生产走 Turso，开发本地需要一把"建表"工具。
 */

import { createClient } from "@libsql/client";
import { mkdir, readFile } from "node:fs/promises";
import { dirname } from "node:path";
import { existsSync } from "node:fs";

// ── 极简 .env 解析（避免引入 dotenv 依赖） ──────────────────────
async function loadEnv(path) {
  if (!existsSync(path)) return;
  const raw = await readFile(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, k, vRaw] = m;
    if (k.startsWith("#")) continue;
    let v = vRaw.trim();
    // 去掉两端的单/双引号
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}
await loadEnv(".env.local");
await loadEnv(".env");

const url = process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log(`📦 Init DB → ${url}`);

// 本地 file:// 自动建目录
if (url.startsWith("file:")) {
  const filePath = url.replace(/^file:/, "").replace(/^\.\//, "");
  const dir = dirname(filePath);
  if (dir && dir !== "." && !existsSync(dir)) {
    await mkdir(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
}

const client = createClient({
  url,
  ...(authToken ? { authToken } : {}),
});

// ── DDL（与 src/lib/db/schema.ts 同步） ──────────────────────────
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
  for (const sql of statements) {
    const tableName = sql.match(/CREATE TABLE IF NOT EXISTS (\w+)/)?.[1];
    await client.execute(sql);
    console.log(`  ✓ ${tableName}`);
  }
  console.log("\n✅ Database initialized successfully");
  console.log(`   Tables: ${statements.length}`);
  console.log(`   Location: ${url}`);
} catch (e) {
  console.error("\n❌ Init failed:", e.message);
  process.exit(1);
} finally {
  client.close();
}
