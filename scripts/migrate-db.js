/**
 * 数据库迁移脚本
 * 修复 media_files 表的列名不匹配问题：
 * - 数据库有 alt_text，schema 期望 alt
 * - 数据库缺少 folder 和 uploaded_by 列
 */
const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/zhixinpaper.db');
const db = new Database(DB_PATH);

console.log('开始数据库迁移...');

// 检查当前列
const info = db.prepare('PRAGMA table_info(media_files)').all();
const cols = info.map(c => c.name);
console.log('当前列:', cols);

db.exec('BEGIN TRANSACTION');

try {
  // 1. 如果有 alt_text 但没有 alt，重命名列（SQLite 3.25+ 支持 RENAME COLUMN）
  if (cols.includes('alt_text') && !cols.includes('alt')) {
    console.log('重命名 alt_text -> alt...');
    db.exec('ALTER TABLE media_files RENAME COLUMN alt_text TO alt');
    console.log('✓ alt_text 已重命名为 alt');
  }
  
  // 2. 添加 folder 列（如果不存在）
  const updatedInfo = db.prepare('PRAGMA table_info(media_files)').all();
  const updatedCols = updatedInfo.map(c => c.name);
  
  if (!updatedCols.includes('folder')) {
    console.log('添加 folder 列...');
    db.exec("ALTER TABLE media_files ADD COLUMN folder TEXT DEFAULT 'uploads'");
    console.log('✓ folder 列已添加');
  }
  
  // 3. 添加 uploaded_by 列（如果不存在）
  if (!updatedCols.includes('uploaded_by')) {
    console.log('添加 uploaded_by 列...');
    db.exec('ALTER TABLE media_files ADD COLUMN uploaded_by INTEGER REFERENCES admin_users(id)');
    console.log('✓ uploaded_by 列已添加');
  }
  
  db.exec('COMMIT');
  console.log('\n✅ 迁移完成！');
  
  // 验证结果
  const finalInfo = db.prepare('PRAGMA table_info(media_files)').all();
  console.log('迁移后列:', finalInfo.map(c => c.name));
  
} catch (err) {
  db.exec('ROLLBACK');
  console.error('迁移失败:', err);
  process.exit(1);
}

db.close();
