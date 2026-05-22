#!/usr/bin/env node
/**
 * 修复 Turso 数据库列名不匹配问题
 * init-turso.js 创建的列名与 Drizzle schema 不一致
 */
const { createClient } = require("@libsql/client");
const fs = require("fs");

const url = process.env.TURSO_DATABASE_URL || "libsql://zhixinpaper-usa-zxpapers.aws-ap-northeast-1.turso.io";
const authToken = process.env.TURSO_AUTH_TOKEN || fs.readFileSync("/home/ubuntu/.turso_token", "utf8").trim();

const client = createClient({ url, authToken });

async function fix() {
  console.log("🔧 修复数据库列名...");

  // 1. admin_users: 添加 last_login_at 列（Drizzle schema 期望的列名）
  try {
    await client.execute("ALTER TABLE admin_users ADD COLUMN last_login_at TEXT");
    console.log("✅ admin_users: 添加 last_login_at 列");
  } catch (e) {
    if (e.message && e.message.includes("duplicate column")) {
      console.log("ℹ️  admin_users: last_login_at 列已存在");
    } else {
      console.log("⚠️  admin_users last_login_at:", e.message);
    }
  }

  // 2. 从 last_login 复制数据到 last_login_at
  try {
    await client.execute("UPDATE admin_users SET last_login_at = last_login WHERE last_login IS NOT NULL AND last_login_at IS NULL");
    console.log("✅ admin_users: 数据从 last_login 复制到 last_login_at");
  } catch (e) {
    console.log("⚠️  复制数据:", e.message);
  }

  // 3. media_categories: 添加 color 列
  try {
    const catCols = await client.execute("PRAGMA table_info(media_categories)");
    const hasColor = catCols.rows.some(r => r.name === "color");
    if (!hasColor) {
      await client.execute("ALTER TABLE media_categories ADD COLUMN color TEXT DEFAULT '#6366f1'");
      console.log("✅ media_categories: 添加 color 列");
    } else {
      console.log("ℹ️  media_categories: color 列已存在");
    }
  } catch (e) {
    console.log("⚠️  media_categories color:", e.message);
  }

  // 4. 验证修复结果
  console.log("\n📋 验证结果:");
  const adminCols = await client.execute("PRAGMA table_info(admin_users)");
  console.log("admin_users 列:");
  for (const row of adminCols.rows) {
    console.log("  ", row.name, row.type);
  }

  const catCols = await client.execute("PRAGMA table_info(media_categories)");
  console.log("media_categories 列:");
  for (const row of catCols.rows) {
    console.log("  ", row.name, row.type);
  }

  console.log("\n🎉 修复完成！");
  client.close();
  process.exit(0);
}

fix().catch(err => {
  console.error("❌ 修复失败:", err);
  process.exit(1);
});
