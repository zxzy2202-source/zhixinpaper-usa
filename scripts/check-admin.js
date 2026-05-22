const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('./data/zhixinpaper.db');
const user = db.prepare('SELECT * FROM admin_users WHERE email = ?').get('admin@zhixinpaper.com');

console.log('用户存在:', !!user);
if (user) {
  const hash = user.password_hash;
  console.log('password_hash 长度:', hash ? hash.length : 'NULL');
  console.log('password_hash 前缀:', hash ? hash.substring(0, 10) : 'NULL');
  
  bcrypt.compare('ZhixinAdmin2025!', hash).then(function(result) {
    console.log('密码验证结果:', result);
    db.close();
  });
} else {
  console.log('未找到管理员账号');
  db.close();
}
