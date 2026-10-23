#!/usr/bin/env node
/**
 * 检查本地数据库管理员账号
 * 用法: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/check-admin.js
 */
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

if (!adminEmail || !adminPassword) {
  console.error('❌ 缺少 ADMIN_EMAIL 或 ADMIN_PASSWORD 环境变量');
  console.error('用法: ADMIN_EMAIL=... ADMIN_PASSWORD=... node scripts/check-admin.js');
  process.exit(1);
}

const db = new Database('./data/zhixinpaper.db');
const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get(adminEmail);

console.log('用户存在:', !!user);
if (user) {
  const hash = user.password_hash;
  console.log('password_hash 长度:', hash ? hash.length : 'NULL');
  console.log('password_hash 前缀:', hash ? hash.substring(0, 10) : 'NULL');
  
  bcrypt.compare(adminPassword, hash).then(function(result) {
    console.log('密码验证结果:', result);
    db.close();
  });
} else {
  console.log('未找到管理员账号');
  db.close();
}
