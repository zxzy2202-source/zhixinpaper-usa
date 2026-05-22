/**
 * 数据库迁移脚本 v2
 * 修复所有表的列名不匹配问题：
 * 1. media_files: alt_text -> alt, 添加 folder, uploaded_by
 * 2. media_categories: 添加 sort_order 列
 */
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/zhixinpaper.db');
const db = new Database(DB_PATH);

console.log('开始数据库迁移 v2...\n');

db.exec('BEGIN TRANSACTION');

try {
  // === media_files 表 ===
  const filesInfo = db.prepare('PRAGMA table_info(media_files)').all();
  const filesCols = filesInfo.map(c => c.name);
  console.log('media_files 当前列:', filesCols);
  
  // 1. 重命名 alt_text -> alt（如果还没重命名）
  if (filesCols.includes('alt_text') && !filesCols.includes('alt')) {
    db.exec('ALTER TABLE media_files RENAME COLUMN alt_text TO alt');
    console.log('✓ media_files: alt_text -> alt');
  }
  
  // 重新获取列信息
  const filesInfo2 = db.prepare('PRAGMA table_info(media_files)').all();
  const filesCols2 = filesInfo2.map(c => c.name);
  
  // 2. 添加 folder 列
  if (!filesCols2.includes('folder')) {
    db.exec("ALTER TABLE media_files ADD COLUMN folder TEXT DEFAULT 'uploads'");
    console.log('✓ media_files: 添加 folder 列');
  }
  
  // 3. 添加 uploaded_by 列
  if (!filesCols2.includes('uploaded_by')) {
    db.exec('ALTER TABLE media_files ADD COLUMN uploaded_by INTEGER');
    console.log('✓ media_files: 添加 uploaded_by 列');
  }
  
  // === media_categories 表 ===
  const catsInfo = db.prepare('PRAGMA table_info(media_categories)').all();
  const catsCols = catsInfo.map(c => c.name);
  console.log('\nmedia_categories 当前列:', catsCols);
  
  // 4. 添加 sort_order 列
  if (!catsCols.includes('sort_order')) {
    db.exec('ALTER TABLE media_categories ADD COLUMN sort_order INTEGER DEFAULT 0');
    console.log('✓ media_categories: 添加 sort_order 列');
  }
  
  db.exec('COMMIT');
  console.log('\n✅ 迁移完成！');
  
  // 验证结果
  const finalFiles = db.prepare('PRAGMA table_info(media_files)').all();
  const finalCats = db.prepare('PRAGMA table_info(media_categories)').all();
  console.log('\n迁移后 media_files 列:', finalFiles.map(c => c.name));
  console.log('迁移后 media_categories 列:', finalCats.map(c => c.name));
  
} catch (err) {
  db.exec('ROLLBACK');
  console.error('迁移失败:', err);
  process.exit(1);
}

db.close();
