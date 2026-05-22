import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];

// 图片压缩配置
const COMPRESS_CONFIG = {
  maxWidth: 2400,       // 最大宽度
  maxHeight: 2400,      // 最大高度
  quality: 85,          // 压缩质量 (1-100)
  thumbnailWidth: 400,  // 缩略图宽度
  thumbnailQuality: 70, // 缩略图质量
};

/**
 * 压缩图片并生成缩略图
 * 返回 { optimized, thumbnail, width, height }
 */
async function processImage(buffer: Buffer, mimeType: string) {
  // SVG 不做压缩处理
  if (mimeType === "image/svg+xml") {
    return { optimized: buffer, thumbnail: null, width: undefined, height: undefined };
  }

  let pipeline = sharp(buffer);
  const metadata = await pipeline.metadata();
  const origWidth = metadata.width || 0;
  const origHeight = metadata.height || 0;

  // 如果图片超过最大尺寸，等比缩放
  if (origWidth > COMPRESS_CONFIG.maxWidth || origHeight > COMPRESS_CONFIG.maxHeight) {
    pipeline = pipeline.resize(COMPRESS_CONFIG.maxWidth, COMPRESS_CONFIG.maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // 根据原始格式压缩
  let optimized: Buffer;
  if (mimeType === "image/png") {
    optimized = await pipeline.png({ quality: COMPRESS_CONFIG.quality, compressionLevel: 8 }).toBuffer();
  } else if (mimeType === "image/webp") {
    optimized = await pipeline.webp({ quality: COMPRESS_CONFIG.quality }).toBuffer();
  } else if (mimeType === "image/gif") {
    optimized = await pipeline.gif().toBuffer();
  } else {
    // JPEG 默认
    optimized = await pipeline.jpeg({ quality: COMPRESS_CONFIG.quality, mozjpeg: true }).toBuffer();
  }

  // 生成缩略图 (WebP 格式，体积最小)
  const thumbnail = await sharp(buffer)
    .resize(COMPRESS_CONFIG.thumbnailWidth, COMPRESS_CONFIG.thumbnailWidth, {
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: COMPRESS_CONFIG.thumbnailQuality })
    .toBuffer();

  // 获取压缩后的实际尺寸
  const optimizedMeta = await sharp(optimized).metadata();

  return {
    optimized,
    thumbnail,
    width: optimizedMeta.width,
    height: optimizedMeta.height,
  };
}

// GET — 获取图片列表（支持按 categoryId 筛选）
export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  const uncategorized = searchParams.get("uncategorized") === "true";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "48");
  const offset = (page - 1) * limit;

  try {
    const allFiles = await db
      .select()
      .from(mediaFiles)
      .orderBy(desc(mediaFiles.createdAt));

    let filtered = allFiles;

    if (uncategorized) {
      filtered = allFiles.filter((f) => f.categoryId === null);
    } else if (categoryId) {
      const catId = parseInt(categoryId);
      filtered = allFiles.filter((f) => f.categoryId === catId);
    }

    const total = filtered.length;
    const items = filtered.slice(offset, offset + limit);

    return NextResponse.json({ items, total, page, limit });
  } catch (error) {
    console.error("获取图片列表失败:", error);
    return NextResponse.json({ error: "获取失败" }, { status: 500 });
  }
}

// POST — 上传图片（Vercel Blob + 自动压缩 + 缩略图）
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "未授权" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const alt = (formData.get("alt") as string) || "";
    const categoryIdStr = formData.get("categoryId") as string | null;
    const categoryId = categoryIdStr ? parseInt(categoryIdStr) : null;

    if (!file) {
      return NextResponse.json({ error: "未找到文件" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "不支持的文件格式，仅支持 JPG、PNG、WebP、GIF、SVG" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "文件大小超过 10MB 限制" },
        { status: 400 }
      );
    }

    // 读取文件内容
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 压缩图片 + 生成缩略图
    const { optimized, thumbnail, width, height } = await processImage(buffer, file.type);

    // 生成安全文件名
    const timestamp = Date.now();
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeName = file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5_-]/g, "_")
      .substring(0, 50);
    const blobFilename = `media/${timestamp}_${safeName}.${ext}`;

    // 上传压缩后的图片到 Vercel Blob
    const blob = await put(blobFilename, optimized, {
      access: "public",
      addRandomSuffix: false,
    });

    // 上传缩略图到 Vercel Blob
    let thumbnailUrl: string | null = null;
    if (thumbnail) {
      const thumbBlob = await put(
        `media/thumbs/${timestamp}_${safeName}.webp`,
        thumbnail,
        {
          access: "public",
          addRandomSuffix: false,
        }
      );
      thumbnailUrl = thumbBlob.url;
    }

    // 写入数据库
    const [record] = await db
      .insert(mediaFiles)
      .values({
        filename: `${timestamp}_${safeName}.${ext}`,
        originalName: file.name,
        mimeType: file.type,
        size: optimized.length,
        width,
        height,
        url: blob.url,
        alt,
        folder: thumbnailUrl || "",  // 复用 folder 字段存储缩略图 URL
        categoryId: categoryId && !isNaN(categoryId) ? categoryId : null,
        uploadedBy: session.id || 1,
      })
      .returning();

    return NextResponse.json({
      success: true,
      file: record,
      compression: {
        originalSize: file.size,
        compressedSize: optimized.length,
        savedPercent: Math.round((1 - optimized.length / file.size) * 100),
      },
    });
  } catch (error) {
    console.error("上传图片失败:", error);
    return NextResponse.json({ error: "上传失败，请重试" }, { status: 500 });
  }
}
