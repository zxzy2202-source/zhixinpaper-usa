/**
 * <SlotImage> — 槽位化的 next/image 封装
 * ─────────────────────────────────────────────────────────────────
 * 一行替换全站硬编码 <Image src="/images/xxx.jpg">：
 *
 *   旧：
 *     <Image src="/images/hero-bg.jpg" alt="..." fill priority />
 *
 *   新：
 *     <SlotImage slotKey="home.hero" alt="..." fill priority />
 *
 * 运营在 /admin/image-slots 后台拖图绑定到 slotKey 即换图，无需改代码。
 * 未绑定时自动用 SLOT_REGISTRY 里的 fallback 兜底，永不报错。
 *
 * 注意：本组件是 Server Component（内部 await DB 查询），
 * 不可在 'use client' 组件里直接 import 使用。
 * 客户端组件如需用图，请由父级 Server Component 取好 url 后透传 prop。
 */

import Image, { type ImageProps } from "next/image";
import { resolveSlot } from "@/lib/imageSlotResolver";
import type { SlotKey } from "@/lib/imageSlots";

type BaseImageProps = Omit<ImageProps, "src" | "alt"> & {
  /** 槽位 key，必须在 SLOT_REGISTRY 中已注册 */
  slotKey: SlotKey | (string & {});
  /** 覆盖 alt；不传则用槽位 defaultAlt 或后台填写的 alt */
  alt?: string;
};

export async function SlotImage({ slotKey, alt, ...rest }: BaseImageProps) {
  const slot = await resolveSlot(slotKey);

  // 如果用户没给 width/height/fill，又恰好 DB 里有尺寸，自动带上
  const sizeProps: Partial<ImageProps> = {};
  if (!("fill" in rest) && !("width" in rest) && slot.width && slot.height) {
    sizeProps.width = slot.width;
    sizeProps.height = slot.height;
  }

  return (
    <Image
      src={slot.url}
      alt={alt ?? slot.alt}
      {...sizeProps}
      {...rest}
    />
  );
}

export default SlotImage;
