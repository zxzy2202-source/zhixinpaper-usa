#!/usr/bin/env node
/**
 * Blob → R2 一次性迁移脚本
 * ─────────────────────────────────────────────────────────────────
 * 把 media_files 表里所有 url / folder（缩略图）字段中
 * 仍指向 *.public.blob.vercel-storage.com 的图片：
 *   1. 从 Blob 下载文件流
 *   2. 上传到 R2（key 保持 media/<filename> 的语义）
 *   3. 更新 DB url / folder 字段为 R2 公开 URL
 *
 * 特性：
 *   - 幂等：再跑只会处理仍指向 Blob 的记录
 *   - 失败不影响其他记录：单条出错 → log + 跳过
 *   - 输出统计：成功 / 跳过（非 Blob）/ 失败
 *
 * 使用：
 *   1. .env.local 已配置 TURSO_* + R2_* + NEXT_PUBLIC_R2_URL
 *   2. npm run migrate:r2
 */

import { createClient } from "@libsql/client";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// ─── Load .env.local (no dependency) ──────────────────────────────
function loadEnv() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) {
    console.warn("⚠️  .env.local 不存在，假设环境变量已通过 shell 注入");
    return;
  }
  const txt = readFileSync(envPath, "utf-8");
  for (const line of txt.split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.+?)\s*$/);
    if (!m) continue;
    const key = m[1];
    let val = m[2];
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

// ─── Validate env ─────────────────────────────────────────────────
const required = [
  "TURSO_DATABASE_URL",
  "TURSO_AUTH_TOKEN",
  "R2_ACCOUNT_ID",
  "R2_ACCESS_KEY_ID",
  "R2_SECRET_ACCESS_KEY",
  "R2_BUCKET_NAME",
  "NEXT_PUBLIC_R2_URL",
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("❌ 缺少环境变量：", missing.join(", "));
  process.exit(1);
}

const R2_PUBLIC_BASE = process.env.NEXT_PUBLIC_R2_URL.replace(/\/$/, "");
const BUCKET = process.env.R2_BUCKET_NAME;

// ─── Clients ──────────────────────────────────────────────────────
const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

// ─── Helpers ──────────────────────────────────────────────────────
function isBlobUrl(url) {
  return typeof url === "string" && url.includes(".public.blob.vercel-storage.com");
}

/**
 * 从 Blob URL 解析出对象 key（用作 R2 中的存储路径）
 *  "https://xxx.public.blob.vercel-storage.com/media/123_foo.jpg"
 *  → "media/123_foo.jpg"
 *
 *  "https://xxx.public.blob.vercel-storage.com/media-foo-rand123.jpg"
 *  → "media/foo.jpg"（兜底：把第一段当目录名）
 */
function extractKeyFromBlobUrl(url) {
  const u = new URL(url);
  const path = u.pathname.replace(/^\/+/, "");
  // 已经是 media/... 这种结构，直接用
  if (path.startsWith("media/")) return path;
  // 兜底：放在 migrated/ 下保持唯一
  const fname = path.split("/").pop() || "unknown";
  return `migrated/${fname}`;
}

async function fetchAsBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Blob 下载失败 ${res.status}: ${url}`);
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}

async function uploadToR2(key, buffer, contentType) {
  await r2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );
  return `${R2_PUBLIC_BASE}/${key}`;
}

// 简单 MIME 推断（迁移脚本足够用）
function guessMime(url) {
  const ext = url.split(".").pop()?.toLowerCase().split("?")[0];
  return {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
  }[ext] || "application/octet-stream";
}

// ─── Main ─────────────────────────────────────────────────────────
async function main() {
  console.log("\n🚚 开始 Blob → R2 迁移\n");
  console.log("   Bucket:", BUCKET);
  console.log("   Public:", R2_PUBLIC_BASE);
  console.log("");

  // 拉所有 media_files
  const { rows } = await db.execute("SELECT id, url, folder FROM media_files");
  console.log(`📊 总记录数: ${rows.length}\n`);

  let migratedMain = 0;
  let migratedThumb = 0;
  let skipped = 0;
  let failed = 0;
  const errors = [];

  for (const row of rows) {
    const id = row.id;
    const oldUrl = row.url;
    const oldThumb = row.folder;

    const updates = {};

    // 主图迁移
    if (isBlobUrl(oldUrl)) {
      try {
        const key = extractKeyFromBlobUrl(oldUrl);
        const newUrl = `${R2_PUBLIC_BASE}/${key}`;

        process.stdout.write(`[${id}] 主图 → ${key} ... `);
        const buf = await fetchAsBuffer(oldUrl);
        await uploadToR2(key, buf, guessMime(oldUrl));
        updates.url = newUrl;
        migratedMain++;
        console.log("✅");
      } catch (e) {
        console.log("❌", e.message);
        failed++;
        errors.push({ id, type: "main", err: e.message });
        continue; // 主图失败时跳过缩略图
      }
    } else {
      skipped++;
    }

    // 缩略图迁移（folder 字段被复用存缩略图 URL）
    if (isBlobUrl(oldThumb)) {
      try {
        const key = extractKeyFromBlobUrl(oldThumb);
        const newUrl = `${R2_PUBLIC_BASE}/${key}`;

        process.stdout.write(`[${id}] 缩略图 → ${key} ... `);
        const buf = await fetchAsBuffer(oldThumb);
        await uploadToR2(key, buf, "image/webp");
        updates.folder = newUrl;
        migratedThumb++;
        console.log("✅");
      } catch (e) {
        console.log("⚠️ 缩略图失败:", e.message);
        // 缩略图失败不算 failed（不致命）
      }
    }

    // 写回 DB
    if (Object.keys(updates).length > 0) {
      const setClauses = Object.keys(updates)
        .map((k) => `${k} = ?`)
        .join(", ");
      const values = [...Object.values(updates), id];
      await db.execute({
        sql: `UPDATE media_files SET ${setClauses} WHERE id = ?`,
        args: values,
      });
    }
  }

  console.log("\n──────────── 迁移结果 ────────────");
  console.log(`✅ 主图迁移成功:   ${migratedMain}`);
  console.log(`🖼  缩略图迁移成功: ${migratedThumb}`);
  console.log(`⏭  跳过（非 Blob）: ${skipped}`);
  console.log(`❌ 主图失败:       ${failed}`);
  if (errors.length) {
    console.log("\n失败明细:");
    for (const e of errors) console.log(`  [${e.id}] ${e.type}: ${e.err}`);
  }
  console.log("──────────────────────────────────\n");

  if (failed > 0) {
    console.log("💡 失败的记录可以再跑一次 npm run migrate:r2，幂等不会重复迁移已成功的。\n");
    process.exit(2);
  } else {
    console.log("🎉 全部完成！前台应立刻看到 R2 图片。\n");
  }
}

main().catch((e) => {
  console.error("\n💥 迁移异常退出:", e);
  process.exit(1);
});
