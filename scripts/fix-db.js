const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.join(__dirname, '../data/zhixinpaper.db'));

// 检查并添加 cover_image 列到 blog_posts
const blogCols = db.prepare("PRAGMA table_info(blog_posts)").all().map(c => c.name);
if (!blogCols.includes('cover_image')) {
  db.exec('ALTER TABLE blog_posts ADD COLUMN cover_image TEXT');
  console.log('✅ 添加 blog_posts.cover_image 列');
} else {
  console.log('blog_posts.cover_image 已存在');
}

// 插入示例图片到 media_files（如果为空）
const fileCount = db.prepare('SELECT COUNT(*) as cnt FROM media_files').get().cnt;
if (fileCount === 0) {
  const catId = db.prepare("SELECT id FROM media_categories WHERE slug='products'").get();
  const images = [
    { filename: 'thermal-rolls-product.jpg', url: '/images/thermal-rolls-product.jpg', alt: 'Thermal paper rolls product', cat: 1 },
    { filename: 'thermal-labels-product.jpg', url: '/images/thermal-labels-product.jpg', alt: 'Thermal labels product', cat: 1 },
    { filename: 'factory-overview.jpg', url: '/images/factory-overview.jpg', alt: 'Factory overview', cat: 2 },
    { filename: 'compliance-certifications.jpg', url: '/images/compliance-certifications.jpg', alt: 'Compliance certifications', cat: 3 },
    { filename: 'hero-bg.jpg', url: '/images/hero-bg.jpg', alt: 'Hero background', cat: 5 },
    { filename: 'logo-original.jpg', url: '/images/logo-original.jpg', alt: 'ZhixinPaper logo original', cat: 1 },
    { filename: 'logo.png', url: '/images/logo.png', alt: 'ZhixinPaper logo', cat: 1 },
  ];
  const ins = db.prepare('INSERT INTO media_files (filename, original_name, mime_type, size, url, alt, folder, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  images.forEach(img => {
    const mime = img.filename.endsWith('.png') ? 'image/png' : 'image/jpeg';
    ins.run(img.filename, img.filename, mime, 100000, img.url, img.alt, 'uploads', img.cat);
  });
  console.log('✅ 插入 7 张示例图片');
} else {
  console.log('media_files 已有数据，跳过');
}

console.log('✅ 数据库修复完成');
