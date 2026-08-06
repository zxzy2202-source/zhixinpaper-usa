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
 *   - 使用 Next.js Data Cache，后台改图后通过标签跨实例失效
 */

import { unstable_cache } from "next/cache";
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

interface CachedSlot {
  slotKey: string;
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export const IMAGE_SLOT_CACHE_TAG = "image-slots";

async function queryAll(): Promise<CachedSlot[]> {
  const slots: CachedSlot[] = [];
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
      slots.push({
        slotKey: r.slotKey,
        url: r.url,
        alt: r.alt ?? "",
        width: r.width ?? undefined,
        height: r.height ?? undefined,
      });
    }
  } catch (e) {
    // 表未建 / DB 不通 → 静默退化用 fallback，保证页面不挂
    console.warn("[imageSlotResolver] DB read failed, using fallbacks:", (e as Error).message);
  }
  return slots;
}

const loadAll = unstable_cache(queryAll, [IMAGE_SLOT_CACHE_TAG], {
  revalidate: 60,
  tags: [IMAGE_SLOT_CACHE_TAG],
});

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

  const cachedSlots = await loadAll();
  const bound = cachedSlots.find((item) => item.slotKey === slotKey);
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
