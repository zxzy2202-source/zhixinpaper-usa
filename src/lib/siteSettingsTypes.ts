/**
 * Site Settings 边界安全文件
 * 仅保留 types、constants、defaults、pure helpers。
 * 客户端组件可直接 import；服务端 db 读写逻辑放在 siteSettings.ts。
 */

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
  badge: "Thermal Paper Supply · Est. 2008",
  headlineLine1: "Regional",
  headlineHighlight: "Thermal",
  headlineLine2: "Paper",
  headlineLine3: "Supply",
  subtitle:
    "Thermal paper rolls and labels for distributors in Europe, the USA, Canada, and Mexico. Share your size, volume, destination, and certificate needs before ordering.",
  primaryCtaText: "Get a Custom Quote",
  primaryCtaHref: "/quote",
  secondaryCtaText: "Request Samples",
  secondaryCtaHref: "/samples",
  tertiaryCtaText: "Browse Products",
  tertiaryCtaHref: "/products",
};

export type SeoConfig = {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
  twitterHandle: string;
  googleSiteVerification: string;
  bingSiteVerification: string;
};

export type SeoSectionConfig = Pick<
  SeoConfig,
  "siteTitle" | "siteDescription" | "keywords" | "ogImage"
>;

export const SEO_SECTION_KEYS = [
  "home",
  "products",
  "blog",
  "quote",
  "samples",
  "contact",
] as const;

export type SeoSectionKey = (typeof SEO_SECTION_KEYS)[number];

export type SeoSectionSettings = Record<SeoSectionKey, SeoSectionConfig>;

export const SEO_SECTION_META: Record<
  SeoSectionKey,
  { label: string; path: string; description: string }
> = {
  home: {
    label: "首页",
    path: "/",
    description: "控制网站首页的主标题、摘要关键词和默认社媒分享图。",
  },
  products: {
    label: "产品总页",
    path: "/products",
    description: "控制产品目录页，适合承接产品词、采购词和类目导航流量。",
  },
  blog: {
    label: "博客总页",
    path: "/blog",
    description: "控制文章列表页，适合承接知识型搜索和行业趋势入口。",
  },
  quote: {
    label: "询盘报价页",
    path: "/quote",
    description: "控制 RFQ 入口页，适合承接高意向采购和询价流量。",
  },
  samples: {
    label: "样品申请页",
    path: "/samples",
    description: "控制寄样入口页，适合承接打样、验证和对比采购流程。",
  },
  contact: {
    label: "联系页",
    path: "/contact",
    description: "控制联系入口页，适合承接品牌词和直接商务联系需求。",
  },
};

export type SeoAuditSeverity = "good" | "warning" | "critical";

export type SeoAuditIssue = {
  id: string;
  severity: SeoAuditSeverity;
  title: string;
  detail: string;
  field?: keyof SeoConfig;
};

export type SeoAudit = {
  score: number;
  completedFields: number;
  totalFields: number;
  titleLength: number;
  descriptionLength: number;
  keywordCount: number;
  verificationCount: number;
  ogImageStatus: "missing" | "relative" | "absolute" | "invalid";
  twitterStatus: "missing" | "valid" | "invalid";
  issues: SeoAuditIssue[];
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

export const DEFAULT_SEO_SECTION: SeoSectionConfig = {
  siteTitle: "",
  siteDescription: "",
  keywords: "",
  ogImage: "",
};

export const DEFAULT_SEO_SECTIONS: SeoSectionSettings = {
  home: {
    siteTitle: "Thermal Paper Rolls & Labels Manufacturer",
    siteDescription:
      "Thermal paper rolls and labels for distributors, importers, and private-label buyers. Confirm size, material, files, samples, packing, and delivery terms.",
    keywords:
      "thermal paper rolls manufacturer, thermal labels manufacturer, receipt paper rolls wholesale, 80mm thermal paper rolls, POS paper rolls supplier, 4x6 shipping labels wholesale, direct thermal labels supplier, BPA free thermal paper, private label thermal paper",
    ogImage: "",
  },
  products: {
    siteTitle: "Wholesale Thermal Paper Products",
    siteDescription:
      "Browse wholesale thermal paper rolls and labels by use case, size, compliance files, packing, and RFQ details for repeat import orders.",
    keywords:
      "thermal paper products, thermal paper rolls wholesale, thermal labels wholesale, BPA free thermal paper rolls, POS paper rolls supplier, ATM paper rolls, lottery ticket thermal paper, direct thermal labels, freezer labels, custom printed thermal rolls, OEM thermal paper manufacturer",
    ogImage: "",
  },
  blog: {
    siteTitle: "Thermal Paper Guides & Industry News",
    siteDescription:
      "Thermal paper sourcing guides covering specifications, printer fit, materials, compliance scope, packing, and market requirements for distributors.",
    keywords:
      "thermal paper guide, BPA-free thermal paper compliance, thermal paper distributor resources, thermal paper regulations Europe, thermal paper industry news",
    ogImage: "",
  },
  quote: {
    siteTitle: "Request a Quote - Thermal Paper Rolls & Labels",
    siteDescription:
      "Submit an RFQ for thermal paper rolls and labels. Share product, destination, volume, and compliance needs. Sales reviews spec, samples, and freight before quoting.",
    keywords:
      "thermal paper quote request, thermal labels quote request, request thermal paper quotation, OEM thermal paper RFQ, wholesale thermal labels inquiry",
    ogImage: "",
  },
  samples: {
    siteTitle: "Request Free Thermal Paper Samples",
    siteDescription:
      "Request thermal paper roll and label samples for specification, printer-fit, material, print-quality, adhesive, and document checks before a wholesale order.",
    keywords:
      "free thermal paper samples, thermal paper sample request, thermal label samples wholesale, BPA-free thermal paper sample, thermal paper distributor samples",
    ogImage: "",
  },
  contact: {
    siteTitle: "Contact Us - Get a Quote or Request Samples",
    siteDescription:
      "Contact Zhixin Paper about wholesale thermal paper rolls and labels. Request a specification review, sample, document pack, packing plan, or custom quote.",
    keywords:
      "contact thermal paper manufacturer, thermal paper wholesale inquiry, thermal paper quote request, Zhixin Paper contact, thermal paper supplier contact China",
    ogImage: "",
  },
};

export const SETTING_KEYS = {
  HERO_HOME: "hero.home",
  SEO_GLOBAL: "seo.global",
  SEO_SECTIONS: "seo.sections",
} as const;

export function parseSeoKeywords(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getOgImageStatus(value: string): SeoAudit["ogImageStatus"] {
  const trimmed = value.trim();
  if (!trimmed) return "missing";
  if (trimmed.startsWith("/")) return "relative";

  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return "absolute";
    }
    return "invalid";
  } catch {
    return "invalid";
  }
}

function getTwitterStatus(value: string): SeoAudit["twitterStatus"] {
  const trimmed = value.trim();
  if (!trimmed) return "missing";
  return /^@?[A-Za-z0-9_]{1,15}$/.test(trimmed) ? "valid" : "invalid";
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function auditSeoConfig(seo: SeoConfig): SeoAudit {
  const title = seo.siteTitle.trim();
  const description = seo.siteDescription.trim();
  const keywords = parseSeoKeywords(seo.keywords);
  const ogImageStatus = getOgImageStatus(seo.ogImage);
  const twitterStatus = getTwitterStatus(seo.twitterHandle);
  const titleLength = title.length;
  const descriptionLength = description.length;
  const verificationCount =
    Number(Boolean(seo.googleSiteVerification.trim())) +
    Number(Boolean(seo.bingSiteVerification.trim()));
  const completedFields = [
    seo.siteTitle,
    seo.siteDescription,
    seo.keywords,
    seo.ogImage,
    seo.twitterHandle,
    seo.googleSiteVerification,
    seo.bingSiteVerification,
  ].filter((value) => value.trim()).length;
  const issues: SeoAuditIssue[] = [];

  let score = 10;

  if (!title) {
    issues.push({
      id: "site-title-missing",
      severity: "critical",
      title: "缺少全站默认标题",
      detail: "未单独配置标题的页面会回退到默认文案，品牌与核心关键词控制力不足。",
      field: "siteTitle",
    });
  } else if (titleLength < 30 || titleLength > 60) {
    score += 10;
    issues.push({
      id: "site-title-length",
      severity: "warning",
      title: "默认标题长度不理想",
      detail: `当前 ${titleLength} 字符，建议控制在 30-60 字符，兼顾品牌名与主关键词。`,
      field: "siteTitle",
    });
  } else {
    score += 18;
  }

  if (!description) {
    issues.push({
      id: "site-description-missing",
      severity: "critical",
      title: "缺少全站默认描述",
      detail: "搜索摘要无法稳定传达产品范围、客户类型和报价入口。",
      field: "siteDescription",
    });
  } else if (descriptionLength < 120 || descriptionLength > 165) {
    score += 12;
    issues.push({
      id: "site-description-length",
      severity: "warning",
      title: "默认描述长度需要调整",
      detail: `当前 ${descriptionLength} 字符，建议控制在 120-165 字符。`,
      field: "siteDescription",
    });
  } else {
    score += 22;
  }

  if (keywords.length === 0) {
    issues.push({
      id: "keywords-missing",
      severity: "warning",
      title: "默认关键词为空",
      detail: "建议至少维护 3-8 个全站核心词，避免后台长期空置。",
      field: "keywords",
    });
  } else if (keywords.length > 12) {
    score += 6;
    issues.push({
      id: "keywords-overflow",
      severity: "warning",
      title: "默认关键词偏多",
      detail: `当前拆分出 ${keywords.length} 个关键词，建议收敛到 12 个以内。`,
      field: "keywords",
    });
  } else {
    score += 10;
  }

  if (ogImageStatus === "missing") {
    issues.push({
      id: "og-image-missing",
      severity: "warning",
      title: "未设置默认分享图",
      detail: "首页和未单独配置的页面将使用代码中的兜底图，后台不可见且不利于运营控制。",
      field: "ogImage",
    });
  } else if (ogImageStatus === "invalid") {
    score += 8;
    issues.push({
      id: "og-image-invalid",
      severity: "critical",
      title: "分享图地址无效",
      detail: "请输入以 / 开头的站内路径，或完整的 http/https 图片地址。",
      field: "ogImage",
    });
  } else {
    score += 16;
  }

  if (seo.googleSiteVerification.trim()) {
    score += 10;
  }
  if (seo.bingSiteVerification.trim()) {
    score += 6;
  }
  if (verificationCount === 0) {
    issues.push({
      id: "verification-missing",
      severity: "warning",
      title: "站长平台验证未配置",
      detail: "Google Search Console 与 Bing Webmaster 验证码都为空，收录诊断链路不完整。",
    });
  }

  if (twitterStatus === "missing") {
    issues.push({
      id: "twitter-missing",
      severity: "warning",
      title: "Twitter 账号未配置",
      detail: "如果需要社媒分享一致性，可补充品牌账号；若不使用 Twitter，可保持为空。",
      field: "twitterHandle",
    });
  } else if (twitterStatus === "invalid") {
    score += 3;
    issues.push({
      id: "twitter-invalid",
      severity: "warning",
      title: "Twitter Handle 格式不正确",
      detail: "建议使用 @brand 或 brand，长度不超过 15 个字符。",
      field: "twitterHandle",
    });
  } else {
    score += 8;
  }

  return {
    score: clampScore(score),
    completedFields,
    totalFields: 7,
    titleLength,
    descriptionLength,
    keywordCount: keywords.length,
    verificationCount,
    ogImageStatus,
    twitterStatus,
    issues,
  };
}

export function calculateSeoScore(seo: SeoConfig): number {
  return auditSeoConfig(seo).score;
}
