#!/usr/bin/env node
/**
 * 一次性修复：把 DB 里被多打了 "ch" 的错误 R2 URL 改回正确的
 * 错误：https://pub-xxx.r2.devch/media/...
 * 正确：https://pub-xxx.r2.dev/media/...
 */

import { createClient } from "@libsql/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnv() {
  const p = resolve(process.cwd(), ".env.local");
  if (!existsSync(p)) return;
  const txt = readFileSync(p, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (!m) continue;
    let val = m[2];
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (!process.env[m[1]]) process.env[m[1]] = val;
  }
}
loadEnv();

const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

console.log("🔧 扫描 media_files 表中错误的 R2 URL...\n");

const { rows } = await db.execute("SELECT id, url, folder FROM media_files");

let fixedMain = 0;
let fixedThumb = 0;

for (const row of rows) {
  const updates = {};

  if (row.url && row.url.includes(".r2.devch/")) {
    updates.url = row.url.replace(".r2.devch/", ".r2.dev/");
    fixedMain++;
  }

  if (row.folder && row.folder.includes(".r2.devch/")) {
    updates.folder = row.folder.replace(".r2.devch/", ".r2.dev/");
    fixedThumb++;
  }

  if (Object.keys(updates).length > 0) {
    const setClause = Object.keys(updates).map((k) => `${k} = ?`).join(", ");
    const args = [...Object.values(updates), row.id];
    await db.execute({
      sql: `UPDATE media_files SET ${setClause} WHERE id = ?`,
      args,
    });
    console.log(`  ✓ [${row.id}] 已修复`);
  }
}

console.log(`\n✅ 完成 — 主图 ${fixedMain} 条，缩略图 ${fixedThumb} 条\n`);
