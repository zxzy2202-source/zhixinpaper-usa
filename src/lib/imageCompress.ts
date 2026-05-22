/**
 * 浏览器端图片压缩
 * ─────────────────────────────────────────────────────────────────
 * 设计目标：上传前在 canvas 里先压一遍。
 *   - 减少上传带宽 & 服务器 sharp 压力（10MB → ~500KB 常见）
 *   - 用户在弱网环境也能秒传
 *   - 服务端 sharp 仍保留作二次保险
 *
 * 约束：
 *   - 仅在浏览器调用（依赖 document/canvas/Image），SSR 安全：
 *     运行时检测 typeof window，缺失则直接返回原文件。
 *   - SVG、GIF、AVIF 这类不适合 canvas 压缩 → 跳过。
 *   - 透明 PNG 强制保持 PNG 输出，避免黑底。
 */

export interface CompressOptions {
  /** 最长边像素，默认 2400（B2B 产品图够用，过大无意义） */
  maxDimension?: number;
  /** JPEG/WebP 质量 0-1，默认 0.85 */
  quality?: number;
  /** 输出格式优先级，默认优先 webp（更小） */
  preferWebp?: boolean;
  /** 跳过小于该字节数的文件（默认 200KB） */
  minSizeToCompress?: number;
}

export interface CompressResult {
  /** 压缩后的 Blob（或原文件 File，跳过压缩时） */
  blob: Blob;
  /** 原文件大小 (bytes) */
  originalSize: number;
  /** 压缩后大小 (bytes) */
  compressedSize: number;
  /** 节省百分比 0-100 */
  savedPercent: number;
  /** 输出 MIME */
  mimeType: string;
  /** 是否被跳过（未压缩） */
  skipped: boolean;
  /** 跳过原因 */
  skipReason?: string;
}

const SKIP_TYPES = new Set([
  "image/svg+xml",
  "image/gif",
  "image/avif",
  "image/x-icon",
  "image/vnd.microsoft.icon",
]);

/**
 * 主入口：压缩一张图片。失败/跳过时返回原文件。
 *
 * 用法：
 *   const res = await compressImage(file);
 *   const uploadBlob = res.blob;  // 用这个上传
 *   const fileName = res.skipped ? file.name : renameExt(file.name, res.mimeType);
 */
export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const {
    maxDimension = 2400,
    quality = 0.85,
    preferWebp = true,
    minSizeToCompress = 200 * 1024,
  } = options;

  const original = {
    blob: file,
    originalSize: file.size,
    compressedSize: file.size,
    savedPercent: 0,
    mimeType: file.type,
    skipped: true,
  } as CompressResult;

  // 环境检查
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { ...original, skipReason: "not in browser" };
  }

  // 类型过滤
  if (!file.type.startsWith("image/")) {
    return { ...original, skipReason: "not an image" };
  }
  if (SKIP_TYPES.has(file.type)) {
    return { ...original, skipReason: `format ${file.type} not compressible` };
  }
  if (file.size < minSizeToCompress) {
    return { ...original, skipReason: "already small" };
  }

  // 解码
  let bitmap: ImageBitmap | HTMLImageElement;
  try {
    if (typeof createImageBitmap === "function") {
      bitmap = await createImageBitmap(file);
    } else {
      bitmap = await loadImageElement(file);
    }
  } catch (e) {
    return { ...original, skipReason: `decode failed: ${(e as Error).message}` };
  }

  const srcW = "width" in bitmap ? bitmap.width : (bitmap as HTMLImageElement).naturalWidth;
  const srcH = "height" in bitmap ? bitmap.height : (bitmap as HTMLImageElement).naturalHeight;
  if (!srcW || !srcH) {
    cleanupBitmap(bitmap);
    return { ...original, skipReason: "zero dimension" };
  }

  // 等比缩放
  const scale = Math.min(1, maxDimension / Math.max(srcW, srcH));
  const dstW = Math.round(srcW * scale);
  const dstH = Math.round(srcH * scale);

  // 透明 PNG 必须保持 PNG（否则黑底）
  const isPng = file.type === "image/png";
  const outType = isPng ? "image/png" : preferWebp ? "image/webp" : "image/jpeg";

  // 绘制
  const canvas = document.createElement("canvas");
  canvas.width = dstW;
  canvas.height = dstH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    cleanupBitmap(bitmap);
    return { ...original, skipReason: "canvas 2d not available" };
  }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(bitmap as CanvasImageSource, 0, 0, dstW, dstH);
  cleanupBitmap(bitmap);

  // 导出
  const blob = await canvasToBlob(canvas, outType, isPng ? undefined : quality);
  if (!blob) {
    return { ...original, skipReason: "canvas.toBlob returned null" };
  }

  // 比原文件还大就放弃，用原文件
  if (blob.size >= file.size) {
    return { ...original, skipReason: "compressed not smaller" };
  }

  const savedPercent = Math.round((1 - blob.size / file.size) * 100);
  return {
    blob,
    originalSize: file.size,
    compressedSize: blob.size,
    savedPercent,
    mimeType: outType,
    skipped: false,
  };
}

// ── 辅助函数 ─────────────────────────────────────────────────────

function cleanupBitmap(b: ImageBitmap | HTMLImageElement) {
  if ("close" in b && typeof b.close === "function") b.close();
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e instanceof Error ? e : new Error("image load failed"));
    };
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((b) => resolve(b), type, quality);
  });
}

/**
 * 根据压缩后的 mimeType 调整原文件名扩展名。
 * 例：banner.png + image/webp → banner.webp
 */
export function renameForMime(originalName: string, mimeType: string): string {
  const extMap: Record<string, string> = {
    "image/webp": "webp",
    "image/jpeg": "jpg",
    "image/png": "png",
  };
  const ext = extMap[mimeType];
  if (!ext) return originalName;
  const dot = originalName.lastIndexOf(".");
  const base = dot > 0 ? originalName.slice(0, dot) : originalName;
  return `${base}.${ext}`;
}

/**
 * 格式化字节为人类可读字符串。供 UI 显示压缩比。
 */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
