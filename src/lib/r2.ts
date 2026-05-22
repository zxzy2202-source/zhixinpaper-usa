/**
 * Cloudflare R2 上传层（S3 兼容协议）
 * ─────────────────────────────────────────────────────────────────
 * 替代 Vercel Blob，统一图片存储到 R2。
 *
 * 环境变量：
 *   R2_ACCOUNT_ID         — 32 位（endpoint URL 中间部分）
 *   R2_ACCESS_KEY_ID      — API Token Access Key
 *   R2_SECRET_ACCESS_KEY  — API Token Secret
 *   R2_BUCKET_NAME        — bucket 名称（如 zhixinpaper）
 *   NEXT_PUBLIC_R2_URL    — 公开访问 URL 前缀（https://pub-xxx.r2.dev 或自定义 CDN 域名）
 */

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

// ── Client (Lazy Init) ────────────────────────────────────────────
let _client: S3Client | null = null;

function getR2Client(): S3Client {
  if (_client) return _client;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error(
      "R2 环境变量未配置完整：需要 R2_ACCOUNT_ID / R2_ACCESS_KEY_ID / R2_SECRET_ACCESS_KEY"
    );
  }

  _client = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
  });

  return _client;
}

// ── Config Helpers ───────────────────────────────────────────────
function getBucket(): string {
  const b = process.env.R2_BUCKET_NAME;
  if (!b) throw new Error("R2_BUCKET_NAME 未配置");
  return b;
}

function getPublicBase(): string {
  const url = process.env.NEXT_PUBLIC_R2_URL;
  if (!url) throw new Error("NEXT_PUBLIC_R2_URL 未配置");
  return url.replace(/\/$/, ""); // 去尾斜杠
}

/**
 * 拼接对外 URL：
 *   key = "media/123_xxx.jpg"
 * → "https://pub-xxx.r2.dev/media/123_xxx.jpg"
 */
export function r2PublicUrl(key: string): string {
  const cleaned = key.replace(/^\/+/, "");
  return `${getPublicBase()}/${cleaned}`;
}

// ── Core API ─────────────────────────────────────────────────────

export interface UploadResult {
  key: string;     // R2 内部对象 key（如 media/1700000000_xxx.jpg）
  url: string;     // 公开访问 URL
  size: number;    // 字节
  contentType: string;
}

/**
 * 上传 Buffer / Uint8Array 到 R2
 *
 * @param key         对象 key（含路径前缀，如 "media/123_xxx.jpg"）
 * @param body        Buffer 或 Uint8Array
 * @param contentType MIME 类型（如 "image/jpeg"）
 * @param cacheControl 可选，缓存控制头（默认 1 年）
 */
export async function uploadToR2(
  key: string,
  body: Buffer | Uint8Array,
  contentType: string,
  cacheControl = "public, max-age=31536000, immutable"
): Promise<UploadResult> {
  const cleanedKey = key.replace(/^\/+/, "");

  await getR2Client().send(
    new PutObjectCommand({
      Bucket: getBucket(),
      Key: cleanedKey,
      Body: body,
      ContentType: contentType,
      CacheControl: cacheControl,
    })
  );

  return {
    key: cleanedKey,
    url: r2PublicUrl(cleanedKey),
    size: body.length,
    contentType,
  };
}

/**
 * 从 URL 反推 R2 object key
 *   "https://pub-xxx.r2.dev/media/foo.jpg" → "media/foo.jpg"
 *   非 R2 URL 返回 null
 */
export function r2KeyFromUrl(url: string): string | null {
  const base = getPublicBase();
  if (!url.startsWith(base)) return null;
  return url.slice(base.length).replace(/^\/+/, "");
}

/**
 * 删除 R2 对象（接受 URL 或 key）
 * 失败不抛错，仅返回 false（删除失败不应阻塞业务）
 */
export async function deleteFromR2(urlOrKey: string): Promise<boolean> {
  try {
    const key = urlOrKey.startsWith("http")
      ? r2KeyFromUrl(urlOrKey)
      : urlOrKey.replace(/^\/+/, "");
    if (!key) return false;

    await getR2Client().send(
      new DeleteObjectCommand({
        Bucket: getBucket(),
        Key: key,
      })
    );
    return true;
  } catch (e) {
    console.warn("R2 删除失败:", urlOrKey, e);
    return false;
  }
}
