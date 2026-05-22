/**
 * 将 AI 生成的图片 SEO 信息导入后台图片管理数据库
 */
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../data/zhixinpaper.db');
const RESULTS_PATH = path.join(__dirname, 'image-seo-results.json');
const PUBLIC_DIR = path.join(__dirname, '../public');

const db = new Database(DB_PATH);
const results = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf-8'));

// 获取分类 ID 映射
const categories = db.prepare('SELECT id, slug FROM media_categories').all();
const categoryMap = {};
categories.forEach(c => { categoryMap[c.slug] = c.id; });

console.log('分类映射:', categoryMap);

// 分类 slug 映射
const CATEGORY_SLUG_MAP = {
  'banners': 'banners',
  'factory': 'factory',
  'products': 'products',
  'certifications': 'certifications',
  'blog': 'blog',
};

let inserted = 0;
let updated = 0;

for (const img of results) {
  if (!img.alt_text) continue; // 跳过错误记录

  const filePath = path.join(PUBLIC_DIR, img.url);
  let fileSize = 0;
  let width = 0;
  let height = 0;

  try {
    const stat = fs.statSync(filePath);
    fileSize = stat.size;
  } catch (e) {
    console.warn(`  警告: 无法读取文件大小 ${img.url}`);
  }

  // 获取图片尺寸（从文件名推断或使用默认值）
  const sizeMap = {
    'hero-bg.jpg': { w: 2752, h: 1536 },
    'factory-overview.jpg': { w: 2752, h: 1536 },
    'thermal-rolls-product.jpg': { w: 2400, h: 1792 },
    'thermal-labels-product.jpg': { w: 2400, h: 1792 },
    'compliance-certifications.jpg': { w: 2400, h: 1792 },
    'logo.png': { w: 2048, h: 2048 },
    'logo-original.jpg': { w: 1609, h: 1609 },
  };
  const dims = sizeMap[img.filename] || { w: 0, h: 0 };
  width = dims.w;
  height = dims.h;

  const categorySlug = CATEGORY_SLUG_MAP[img.category] || null;
  const categoryId = categorySlug ? (categoryMap[categorySlug] || null) : null;

  // 检查是否已存在
  const existing = db.prepare('SELECT id FROM media_files WHERE url = ?').get(img.url);

  if (existing) {
    // 更新现有记录
    db.prepare(`
      UPDATE media_files SET
        alt_text = ?,
        category_id = ?
      WHERE url = ?
    `).run(img.alt_text, categoryId, img.url);
    console.log(`  ✓ 更新: ${img.filename}`);
    updated++;
  } else {
    // 插入新记录
    const ext = path.extname(img.filename).toLowerCase();
    const mimeMap = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
    const mimeType = mimeMap[ext] || 'image/jpeg';

    db.prepare(`
      INSERT INTO media_files (
        filename, original_name, url, mime_type, size,
        width, height, alt_text, category_id,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      img.filename, img.filename, img.url, mimeType, fileSize,
      width, height, img.alt_text, categoryId
    );
    console.log(`  ✓ 插入: ${img.filename}`);
    inserted++;
  }
}

db.close();

console.log(`\n✅ 完成！插入 ${inserted} 条，更新 ${updated} 条`);
