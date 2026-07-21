/**
 * Site Settings 边界安全文件
 * ─────────────────────────────────────────────────────────────────
 * ⚠ 零 Node 依赖：只放 types、constants、defaults、pure helpers
 * 给客户端组件 import（HeroEditor / SeoEditor）
 *
 * 服务端 db 读写逻辑请放在 siteSettings.ts
 */

// ── Hero 配置 ─────────────────────────────────────────────────────
export type HeroConfig = {
  badge: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2: string;
  headlineLine3: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaHref: string;
  secondaryCtaText: string;
  secondaryCtaHref: string;
  tertiaryCtaText: string;
  tertiaryCtaHref: string;
};

export const DEFAULT_HERO_HOME: HeroConfig = {
  badge: "ISO 9001 Certified Manufacturer · Est. 2008",
  headlineLine1: "Regional",
  headlineHighlight: "Thermal",
  headlineLine2: "Paper",
  headlineLine3: "Supply",
  subtitle:
    "Thermal paper rolls and labels for distributors in Europe, the USA, Canada, and Mexico. Share your size, volume, destination, and certificate needs before ordering.",
  primaryCtaText: "Get a Custom Quote",
  primaryCtaHref: "/quote",
  secondaryCtaText: "Request Free Samples",
  secondaryCtaHref: "/samples",
  tertiaryCtaText: "Browse Products",
  tertiaryCtaHref: "/products",
};

// ── SEO 配置 ──────────────────────────────────────────────────────
export type SeoConfig = {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
  twitterHandle: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
};

export const DEFAULT_SEO: SeoConfig = {
  siteTitle: "",
  siteDescription: "",
  keywords: "",
  ogImage: "",
  twitterHandle: "",
  googleSiteVerification: "",
  bingSiteVerification: "",
};

// ── Settings Key 注册表 ───────────────────────────────────────────
export const SETTING_KEYS = {
  HERO_HOME: "hero.home",
  SEO_GLOBAL: "seo.global",
} as const;

// ── SEO 评分（纯函数，可在 client/server 共用）─────────────────────
export function calculateSeoScore(seo: SeoConfig): number {
  let score = 40;
  if (seo.siteTitle?.trim()) score += 15;
  if (seo.siteDescription?.trim()) score += 15;
  if (seo.keywords?.trim()) score += 8;
  if (seo.ogImage?.trim()) score += 12;
  if (seo.googleSiteVerification?.trim()) score += 5;
  if (seo.bingSiteVerification?.trim()) score += 3;
  if (seo.twitterHandle?.trim()) score += 2;
  return Math.min(score, 100);
}
