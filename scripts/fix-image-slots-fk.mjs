#!/usr/bin/env node
/**
 * 一次性修复脚本：重建 image_slots 表
 * ─────────────────────────────────────────────────────────────────
 * 背景：生产 Turso 里的 image_slots 表外键指向不存在的 `users` 表（历史遗留），
 *      导致任何 DELETE / UPDATE 操作触发外键检查失败，500 错误。
 *
 * 操作：
 *   1. 读取生产 Turso 连接（必须从 .env.local 拿到 TURSO_DATABASE_URL + TURSO_AUTH_TOKEN）
 *   2. 备份当前 image_slots 数据到内存
 *   3. DROP 旧表
 *   4. 用正确 schema 重建（外键指向 admin_users）
 *   5. 把备份数据塞回去
 *
 * 用法：node scripts/fix-image-slots-fk.mjs
 */

import { createClient } from "@libsql/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// ── 加载 .env.local ──
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

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url || !url.startsWith("libsql://")) {
  console.error("❌ TURSO_DATABASE_URL 不是生产 libsql:// 地址");
  console.error("   当前值:", url || "(空)");
  console.error("   .env.local 里 TURSO_DATABASE_URL 必须填 https://app.turso.tech 拿到的 libsql:// 地址");
  process.exit(1);
}
if (!authToken) {
  console.error("❌ 缺 TURSO_AUTH_TOKEN");
  process.exit(1);
}

console.log("🔗 连接生产 Turso:", url);
const db = createClient({ url, authToken });

try {
  // 1. 备份现有数据
  console.log("\n📦 备份 image_slots 现有数据...");
  let backup = [];
  try {
    const res = await db.execute("SELECT slot_key, media_file_id, updated_at FROM image_slots");
    backup = res.rows;
    console.log(`   找到 ${backup.length} 条槽位绑定`);
  } catch (e) {
    console.log("   (表不存在或读取失败，跳过备份)");
  }

  // 2. DROP 旧表
  console.log("\n💣 DROP 旧 image_slots 表...");
  await db.execute("DROP TABLE IF EXISTS image_slots");
  console.log("   ✓ 已删除");

  // 3. 重建（外键指向 admin_users）
  console.log("\n🔨 重建 image_slots 表（正确 schema）...");
  await db.execute(`
    CREATE TABLE image_slots (
      slot_key TEXT PRIMARY KEY,
      media_file_id INTEGER REFERENCES media_files(id) ON DELETE SET NULL,
      updated_by INTEGER REFERENCES admin_users(id),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);
  console.log("   ✓ 已创建");

  // 4. 恢复数据
  if (backup.length > 0) {
    console.log(`\n♻️  恢复 ${backup.length} 条绑定...`);
    for (const row of backup) {
      await db.execute({
        sql: "INSERT INTO image_slots (slot_key, media_file_id, updated_at) VALUES (?, ?, ?)",
        args: [row.slot_key, row.media_file_id, row.updated_at],
      });
    }
    console.log("   ✓ 全部恢复完成");
  }

  console.log("\n✅ 修复完成！现在可以正常绑定图片槽位了。");
} catch (e) {
  console.error("\n💥 修复失败:", e.message);
  console.error(e);
  process.exit(1);
}
