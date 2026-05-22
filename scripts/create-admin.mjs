/**
 * 创建/重置后台超级管理员
 * ─────────────────────────────────────────────────────────────────
 * 用法（任选一种）：
 *
 *   交互式：
 *     npm run admin:create
 *     → 提示输入邮箱、姓名、密码
 *
 *   环境变量（适合脚本/CI）：
 *     ADMIN_EMAIL=you@example.com ADMIN_NAME="老板" ADMIN_PASSWORD=xxxxxx npm run admin:create
 *
 * 行为：
 *   - 邮箱不存在 → 新增 super_admin
 *   - 邮箱已存在 → 更新姓名 + 密码 + 角色（幂等）
 *
 * 密码用 bcryptjs cost=12，与 src/app/api/admin/login/route.ts 一致。
 */

import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";

// ── 极简 .env 解析（同 init-db.mjs 风格） ───────────────────────
async function loadEnv(path) {
  if (!existsSync(path)) return;
  const raw = await readFile(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    const [, k, vRaw] = m;
    if (k.startsWith("#")) continue;
    let v = vRaw.trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!(k in process.env)) process.env[k] = v;
  }
}
await loadEnv(".env.local");
await loadEnv(".env");

const url = process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

// ── 收集输入（env 优先；缺则交互式问） ──────────────────────────
async function ask(rl, label, { hide = false } = {}) {
  if (!hide) return (await rl.question(`${label}: `)).trim();
  // 简易隐藏密码：覆盖 _writeToOutput
  const muted = { value: false };
  const writer = rl.output.write.bind(rl.output);
  rl.output.write = (chunk) => (muted.value ? writer("*") : writer(chunk));
  process.nextTick(() => (muted.value = true));
  const ans = await rl.question(`${label}: `);
  rl.output.write = writer;
  console.log();
  return ans.trim();
}

let email = process.env.ADMIN_EMAIL;
let name = process.env.ADMIN_NAME;
let password = process.env.ADMIN_PASSWORD;

if (!email || !name || !password) {
  const rl = createInterface({ input: stdin, output: stdout });
  if (!email) email = await ask(rl, "📧 Email");
  if (!name) name = await ask(rl, "👤 Name (可中文)");
  if (!password) password = await ask(rl, "🔒 Password (至少 8 位)", { hide: true });
  rl.close();
}

// ── 校验 ─────────────────────────────────────────────────────────
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  console.error("❌ 邮箱格式不合法");
  process.exit(1);
}
if (!name) {
  console.error("❌ 姓名不能为空");
  process.exit(1);
}
if (!password || password.length < 8) {
  console.error("❌ 密码至少 8 位");
  process.exit(1);
}

// ── 执行 ─────────────────────────────────────────────────────────
const client = createClient({ url, ...(authToken ? { authToken } : {}) });

try {
  const hash = await bcrypt.hash(password, 12);

  const existing = await client.execute({
    sql: "SELECT id FROM admin_users WHERE email = ?",
    args: [email],
  });

  if (existing.rows.length > 0) {
    await client.execute({
      sql: `UPDATE admin_users
            SET name = ?, password_hash = ?, role = 'super_admin'
            WHERE email = ?`,
      args: [name, hash, email],
    });
    console.log(`\n♻️  已更新超级管理员: ${email}`);
  } else {
    await client.execute({
      sql: `INSERT INTO admin_users (email, name, password_hash, role)
            VALUES (?, ?, ?, 'super_admin')`,
      args: [email, name, hash],
    });
    console.log(`\n✅ 已创建超级管理员: ${email}`);
  }

  console.log(`   姓名: ${name}`);
  console.log(`   角色: super_admin`);
  console.log(`   登录地址: http://localhost:3000/admin/login`);
} catch (e) {
  console.error("\n❌ 操作失败:", e.message);
  process.exit(1);
} finally {
  client.close();
}
