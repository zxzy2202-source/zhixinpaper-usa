#!/usr/bin/env node
/**
 * 初始化 Turso 云数据库
 * 用法: TURSO_DATABASE_URL=... TURSO_AUTH_TOKEN=... node scripts/init-turso.js
 */

const { createClient } = require("@libsql/client");
const bcrypt = require("bcryptjs");

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error("❌ 缺少 TURSO_DATABASE_URL 环境变量");
  process.exit(1);
}

const client = createClient({ url, authToken });

async function init() {
  console.log("🚀 初始化 Turso 数据库...");
  console.log("📡 连接到:", url);

  // 创建所有表
  const createTables = [
    `CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin' CHECK(role IN ('admin', 'super_admin', 'viewer')),
      last_login_at TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      phone TEXT,
      country TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'in_progress', 'replied', 'closed')),
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
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'quoted', 'negotiating', 'won', 'lost')),
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
      status TEXT NOT NULL DEFAULT 'new' CHECK(status IN ('new', 'preparing', 'shipped', 'delivered', 'converted')),
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
      cover_image TEXT,
      category TEXT,
      tags TEXT,
      read_time TEXT,
      status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft', 'published', 'archived')),
      author_id INTEGER REFERENCES admin_users(id),
      published_at TEXT,
      seo_title TEXT,
      seo_description TEXT,
      seo_keywords TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS media_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
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
      url TEXT NOT NULL,
      size INTEGER,
      mime_type TEXT,
      width INTEGER,
      height INTEGER,
      alt TEXT,
      folder TEXT DEFAULT 'uploads',
      category_id INTEGER REFERENCES media_categories(id),
      uploaded_by INTEGER REFERENCES admin_users(id),
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )`,
    `CREATE TABLE IF NOT EXISTS product_overrides (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      product_type TEXT NOT NULL CHECK(product_type IN ('roll', 'label')),
      name TEXT,
      subtitle TEXT,
      hero_desc TEXT,
      description TEXT,
      features TEXT,
      specifications TEXT,
      moq TEXT,
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

  for (const sql of createTables) {
    await client.execute(sql);
  }
  console.log("✅ 所有表创建完成");

  // 创建管理员账号
  const existing = await client.execute({
    sql: "SELECT id FROM admin_users WHERE email = ?",
    args: ["admin@zhixinpaper.com"],
  });

  if (existing.rows.length === 0) {
    const passwordHash = bcrypt.hashSync("ZhixinAdmin2025!", 12);
    await client.execute({
      sql: "INSERT INTO admin_users (email, name, password_hash, role) VALUES (?, ?, ?, ?)",
      args: ["admin@zhixinpaper.com", "Admin", passwordHash, "super_admin"],
    });
    console.log("✅ 管理员账号创建: admin@zhixinpaper.com");
  } else {
    console.log("ℹ️  管理员账号已存在，跳过");
  }

  // 插入媒体分类
  const catCheck = await client.execute("SELECT id FROM media_categories LIMIT 1");
  if (catCheck.rows.length === 0) {
    const categories = [
      ["Product Images", "product-images", "Product photography and renders", 1],
      ["Factory Photos", "factory-photos", "Manufacturing facility images", 2],
      ["Banners & Ads", "banners-ads", "Marketing banners and advertisements", 3],
      ["Certifications", "certifications", "Compliance and certification documents", 4],
    ];
    for (const [name, slug, description, sort_order] of categories) {
      await client.execute({
        sql: "INSERT INTO media_categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)",
        args: [name, slug, description, sort_order],
      });
    }
    console.log("✅ 媒体分类创建完成");
  }

  // 插入示例询盘数据
  const inquiryCheck = await client.execute("SELECT id FROM contact_inquiries LIMIT 1");
  if (inquiryCheck.rows.length === 0) {
    await client.execute({
      sql: `INSERT INTO contact_inquiries (first_name, last_name, email, company, country, subject, message, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        "Hans", "Mueller", "hans.mueller@example.de", "Papier GmbH", "Germany",
        "BPA-Free Thermal Paper Inquiry",
        "We are looking for BPA-free thermal paper rolls for our POS systems. Please send us a quote for 500,000 rolls per month.",
        "new"
      ],
    });
    await client.execute({
      sql: `INSERT INTO quote_requests (first_name, last_name, email, company, country, product_type, quantity, message, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        "Sarah", "Johnson", "sarah@ecommerce-co.com", "FastShip LLC", "United States",
        "Direct Thermal Labels 4x6", "500,000 labels/month",
        "We need Amazon FBA compliant 4x6 shipping labels. Please provide pricing for 500K/month.",
        "new"
      ],
    });
    await client.execute({
      sql: `INSERT INTO sample_requests (first_name, last_name, email, company, country, address, products, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        "Pierre", "Dubois", "pierre@distribution.fr", "Euro Distribution SAS", "France",
        "15 Rue de la Paix, 75001 Paris, France",
        JSON.stringify(["Standard POS Rolls 80x80mm", "Direct Thermal Labels 100x150mm"]),
        "new"
      ],
    });
    console.log("✅ 示例数据插入完成");
  }

  console.log("\n🎉 Turso 数据库初始化完成！");
  console.log("📊 数据库 URL:", url);
  client.close();
}

init().catch((err) => {
  console.error("❌ 初始化失败:", err);
  process.exit(1);
});
