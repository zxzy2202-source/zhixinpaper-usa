/**
 * 服务端：根据 slotKey 解析最终图片 URL + alt
 * ─────────────────────────────────────────────────────────────────
 * 单独成文件（不放进 imageSlots.ts），因为这里要 import DB 模块，
 * 必须保持"服务端独立"。imageSlots.ts 是边界安全文件，要可被 client 引用。
 *
 * 使用方：
 *   - components/ui/SlotImage.tsx (Server Component)
 *   - 任何 Server Component 想拿"槽位真实 URL"
 *
 * 性能：
 *   - 一次性 SELECT 拉所有 image_slots 进 process 内存缓存
 *   - 缓存 TTL 60 秒（开发可改），后台改图后下次请求自动失效
 */

import { db } from "@/lib/db";
import { imageSlots, mediaFiles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSlot, type SlotKey } from "@/lib/imageSlots";

interface ResolvedSlot {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  /** 是否走的 fallback (未绑定) */
  isFallback: boolean;
}

interface CacheEntry {
  data: Map<string, { url: string; alt: string; width?: number; height?: number }>;
  expiresAt: number;
}

const CACHE_TTL_MS = 60_000;
let cache: CacheEntry | null = null;

async function loadAll(): Promise<CacheEntry["data"]> {
  if (cache && cache.expiresAt > Date.now()) return cache.data;

  const map = new Map<string, { url: string; alt: string; width?: number; height?: number }>();
  try {
    const rows = await db
      .select({
        slotKey: imageSlots.slotKey,
        url: mediaFiles.url,
        alt: mediaFiles.alt,
        width: mediaFiles.width,
        height: mediaFiles.height,
      })
      .from(imageSlots)
      .leftJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id));

    for (const r of rows) {
      if (!r.url) continue; // 槽位记录存在但媒体被删
      map.set(r.slotKey, {
        url: r.url,
        alt: r.alt ?? "",
        width: r.width ?? undefined,
        height: r.height ?? undefined,
      });
    }
    cache = { data: map, expiresAt: Date.now() + CACHE_TTL_MS };
  } catch (e) {
    // 表未建 / DB 不通 → 静默退化用 fallback，保证页面不挂
    console.warn("[imageSlotResolver] DB read failed, using fallbacks:", (e as Error).message);
    cache = { data: map, expiresAt: Date.now() + 5_000 };
  }
  return map;
}

/**
 * 解析一个槽位。绑定了→返回真实 URL；未绑定/出错→返回 fallback。
 * 永不抛异常。
 */
export async function resolveSlot(slotKey: SlotKey | string): Promise<ResolvedSlot> {
  const def = getSlot(slotKey);
  // 未注册的 key：仍可工作，返回一个安全占位
  if (!def) {
    console.warn(`[imageSlotResolver] unknown slotKey: ${slotKey}`);
    return {
      url: "/images/hero-bg.jpg",
      alt: "",
      isFallback: true,
    };
  }

  const map = await loadAll();
  const bound = map.get(slotKey);
  if (bound) {
    return {
      url: bound.url,
      alt: bound.alt || def.defaultAlt,
      width: bound.width,
      height: bound.height,
      isFallback: false,
    };
  }
  return { url: def.fallback, alt: def.defaultAlt, isFallback: true };
}

/** 手动失效缓存（管理后台改完图后调用） */
export function invalidateSlotCache() {
  cache = null;
}
