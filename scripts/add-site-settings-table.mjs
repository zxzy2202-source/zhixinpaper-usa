/**
 * 一次性脚本：在 Turso（生产）加 site_settings 表
 * 用法：node scripts/add-site-settings-table.mjs
 * 幂等：CREATE TABLE IF NOT EXISTS，可重复跑
 */
import { createClient } from "@libsql/client";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";

async function loadEnv(path) {
  if (!existsSync(path)) return;
  const raw = await readFile(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, k, vRaw] = m;
    if (k.startsWith("#")) continue;
    let v = vRaw.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}
await loadEnv(".env.local");
await loadEnv(".env");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("❌ TURSO_DATABASE_URL not set in .env.local");
  process.exit(1);
}

console.log(`📦 Connecting → ${url.replace(/:\/\/.*@/, "://****@")}`);

const client = createClient({ url, ...(authToken ? { authToken } : {}) });

try {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      section_key TEXT NOT NULL,
      value TEXT NOT NULL DEFAULT '{}',
      updated_by INTEGER REFERENCES admin_users(id),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  console.log("✓ site_settings table ensured");

  const r = await client.execute("SELECT COUNT(*) AS n FROM site_settings");
  console.log(`✅ Current rows: ${r.rows[0].n}`);
} catch (e) {
  console.error("❌ Failed:", e.message);
  process.exit(1);
} finally {
  client.close();
}
