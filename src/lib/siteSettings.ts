/**
 * Site Settings 服务端读写层（含 db 调用，仅 server 可 import）
 * ─────────────────────────────────────────────────────────────────
 * 客户端组件请 import 自 ./siteSettingsTypes（零 Node 依赖）
 */
import { db } from "./db";
import { siteSettings } from "./db/schema";
import { eq } from "drizzle-orm";
import {
  DEFAULT_HERO_HOME,
  DEFAULT_SEO,
  SETTING_KEYS,
  type HeroConfig,
  type SeoConfig,
} from "./siteSettingsTypes";

// 重导出（方便服务端代码统一 import 自 siteSettings）
export {
  DEFAULT_HERO_HOME,
  DEFAULT_SEO,
  SETTING_KEYS,
  calculateSeoScore,
  type HeroConfig,
  type SeoConfig,
} from "./siteSettingsTypes";

// ── 读取 ──────────────────────────────────────────────────────────
export async function getSetting<T>(key: string, defaults: T): Promise<T> {
  try {
    const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key)).limit(1);
    if (rows.length === 0) return defaults;
    const parsed = JSON.parse(rows[0].value);
    return { ...defaults, ...parsed } as T;
  } catch {
    return defaults;
  }
}

export const getHeroHome = () => getSetting<HeroConfig>(SETTING_KEYS.HERO_HOME, DEFAULT_HERO_HOME);
export const getSeoGlobal = () => getSetting<SeoConfig>(SETTING_KEYS.SEO_GLOBAL, DEFAULT_SEO);

// ── 写入 ──────────────────────────────────────────────────────────
export async function setSetting<T>(
  key: string,
  sectionKey: string,
  value: T,
  updatedBy?: number,
) {
  const valueStr = JSON.stringify(value);
  const existing = await db
    .select({ key: siteSettings.key })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(siteSettings)
      .set({
        value: valueStr,
        updatedBy: updatedBy ?? null,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(siteSettings.key, key));
  } else {
    await db.insert(siteSettings).values({
      key,
      sectionKey,
      value: valueStr,
      updatedBy: updatedBy ?? null,
    });
  }
}
