/**
 * Site Settings 服务端读写层。
 * 这里允许 db 调用，仅供 server 侧 import。
 * 客户端组件请从 ./siteSettingsTypes 引用纯类型与纯函数。
 */

import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { db } from "./db";
import { siteSettings } from "./db/schema";
import { buildMetadata } from "./seo";
import {
  auditSeoConfig,
  calculateSeoScore,
  DEFAULT_HERO_HOME,
  DEFAULT_SEO,
  DEFAULT_SEO_SECTION,
  DEFAULT_SEO_SECTIONS,
  parseSeoKeywords,
  SEO_SECTION_KEYS,
  SETTING_KEYS,
  type HeroConfig,
  type SeoAudit,
  type SeoAuditIssue,
  type SeoAuditSeverity,
  type SeoConfig,
  type SeoSectionConfig,
  type SeoSectionKey,
  type SeoSectionSettings,
} from "./siteSettingsTypes";

export {
  auditSeoConfig,
  calculateSeoScore,
  DEFAULT_HERO_HOME,
  DEFAULT_SEO,
  DEFAULT_SEO_SECTION,
  DEFAULT_SEO_SECTIONS,
  parseSeoKeywords,
  SEO_SECTION_KEYS,
  SETTING_KEYS,
  type HeroConfig,
  type SeoAudit,
  type SeoAuditIssue,
  type SeoAuditSeverity,
  type SeoConfig,
  type SeoSectionConfig,
  type SeoSectionKey,
  type SeoSectionSettings,
} from "./siteSettingsTypes";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeWithDefaults<T>(defaults: T, value: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(value) ? value : defaults) as T;
  }

  if (isPlainObject(defaults)) {
    const source = isPlainObject(value) ? value : {};
    const merged: Record<string, unknown> = { ...defaults };

    for (const [key, defaultValue] of Object.entries(defaults)) {
      merged[key] = mergeWithDefaults(defaultValue, source[key]);
    }

    for (const [key, incomingValue] of Object.entries(source)) {
      if (!(key in merged)) {
        merged[key] = incomingValue;
      }
    }

    return merged as T;
  }

  if (value === undefined || value === null) {
    return defaults;
  }

  return value as T;
}

export async function getSetting<T>(key: string, defaults: T): Promise<T> {
  try {
    const rows = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key))
      .limit(1);

    if (rows.length === 0) {
      return defaults;
    }

    const parsed = JSON.parse(rows[0].value);
    return mergeWithDefaults(defaults, parsed);
  } catch {
    return defaults;
  }
}

export const getHeroHome = () => getSetting<HeroConfig>(SETTING_KEYS.HERO_HOME, DEFAULT_HERO_HOME);
export const getSeoGlobal = () => getSetting<SeoConfig>(SETTING_KEYS.SEO_GLOBAL, DEFAULT_SEO);
export const getSeoSections = () =>
  getSetting<SeoSectionSettings>(SETTING_KEYS.SEO_SECTIONS, DEFAULT_SEO_SECTIONS);

export async function getSeoSection(sectionKey: SeoSectionKey): Promise<SeoSectionConfig> {
  const sections = await getSeoSections();
  return mergeWithDefaults(DEFAULT_SEO_SECTION, sections[sectionKey]);
}

export async function buildSectionMetadata(
  sectionKey: SeoSectionKey,
  {
    fallbackTitle,
    fallbackDescription,
    path,
    fallbackKeywords: _fallbackKeywords = [],
    fallbackImage,
    noIndex = false,
    locale,
    languages,
  }: {
    fallbackTitle: string;
    fallbackDescription: string;
    path: string;
    fallbackKeywords?: string[];
    fallbackImage?: string;
    noIndex?: boolean;
    locale?: string;
    languages?: Record<string, string>;
  },
): Promise<Metadata> {
  const [sectionSeo, globalSeo] = await Promise.all([
    getSeoSection(sectionKey),
    getSeoGlobal(),
  ]);

  const sectionKeywords = parseSeoKeywords(sectionSeo.keywords);

  return buildMetadata({
    title: sectionSeo.siteTitle.trim() || fallbackTitle,
    description: sectionSeo.siteDescription.trim() || fallbackDescription,
    path,
    image:
      sectionSeo.ogImage.trim() ||
      globalSeo.ogImage.trim() ||
      fallbackImage,
    noIndex,
    locale,
    languages,
  });
}

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
    return;
  }

  await db.insert(siteSettings).values({
    key,
    sectionKey,
    value: valueStr,
    updatedBy: updatedBy ?? null,
  });
}
