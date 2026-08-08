import type { Metadata } from "next";

export const SITE_URL = "https://www.zhixinpaper.com";
export const SITE_NAME = "Zhixin Paper";
export const CONTACT_EMAIL = "sales@zhixinpaper.com";
export const SALES_PHONE_E164 = "+8615339247872";
export const WHATSAPP_PHONE_E164 = "+8618792771927";
const DEFAULT_IMAGE = "/images/og-default.jpg";

const DEFAULT_HREFLANGS = {
  en: SITE_URL,
  "x-default": SITE_URL,
} as const;

export function canonicalUrl(path = "/") {
  if (/^https?:\/\//i.test(path)) return path;
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

export function absoluteUrl(value: string) {
  return canonicalUrl(value);
}

// ─── Core metadata factory ────────────────────────────────────────────────────
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  keywords: _keywords = [],
  noIndex = false,
  locale,
  languages,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
  locale?: string;
  languages?: Record<string, string>;
}): Metadata {
  const url = canonicalUrl(path);
  const normalizedLanguages =
    languages && Object.keys(languages).length > 0 ? languages : DEFAULT_HREFLANGS;
  // Don't append SITE_NAME here - layout.tsx template already adds "| Zhixin Paper"
  const fullTitle = title;

  return {
    title: fullTitle,
    description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages: normalizedLanguages,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      ...(locale ? { locale } : {}),
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}

// ─── JSON-LD generators ───────────────────────────────────────────────────────

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ManufacturingBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    alternateName: ["Zhixin Paper Co., Ltd.", "ZX Papers", "zxpapers"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 200,
      height: 60,
    },
    description:
      "Manufacturer of thermal paper rolls and thermal labels for distributor and OEM projects. Product suitability, documentation, printer compatibility, and market requirements are reviewed against the selected specification.",
    foundingDate: "2008",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 15, Phase 1 Zone 2, Ronghao Industrial Park",
      addressLocality: "Xi'an",
      addressRegion: "Shaanxi",
      addressCountry: "CN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: SALES_PHONE_E164,
        email: CONTACT_EMAIL,
        availableLanguage: ["English", "German", "French"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: WHATSAPP_PHONE_E164,
        contactOption: "WhatsApp",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/zhixin-paper",
      // 如需加 Alibaba，请填店铺完整 URL（如 https://xxx.en.alibaba.com），
      // 指向 alibaba.com 首页的链接对 SEO 无效
    ],
    areaServed: ["Europe", "United States", "Canada"],
    knowsAbout: [
      "Thermal Paper Manufacturing",
      "Thermal Labels",
      "Thermal Paper Material Review",
      "US Food-Contact Documentation Review",
      "POS Paper Rolls",
      "ATM Paper Rolls",
      "Thermal Transfer Labels",
      "OEM Paper Products",
      "Casino TITO Paper",
      "Regulated Label Material Review",
      "Cold Chain Labels",
      "Market-Specific Material Documentation",
    ],
  };
}

export function productSchema({
  name,
  description,
  image,
  url,
  sku,
  brand = SITE_NAME,
  category,
  keywords,
  additionalProperties = [],
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  sku: string;
  brand?: string;
  category: string;
  keywords: string;
  additionalProperties?: { name: string; value: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(url),
    sku,
    brand: { "@type": "Brand", name: brand },
    category,
    keywords,
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    // 不输出 offers：B2B 询价制没有公开价格，缺 price 的 Offer
    // 会让 Search Console 商家信息校验持续报错

    ...(additionalProperties.length
      ? {
          additionalProperty: additionalProperties.map((property) => ({
            "@type": "PropertyValue",
            ...property,
          })),
        }
      : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function articleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = SITE_NAME,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(url),
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(url),
    },
  };
}

export function localBusinessSchema(region: "eu" | "us" | "ca") {
  const regionData = {
    eu: {
      name: `${SITE_NAME} — Europe`,
      description: "Thermal paper rolls and labels for European distributor and OEM projects. Material declarations, chemical-document scope, quality-system evidence, packing, Incoterms, and destination requirements are reviewed for the quoted construction.",
      areaServed: ["DE", "GB", "FR", "NL", "PL"],
    },
    us: {
      name: `${SITE_NAME} — USA`,
      description: "Thermal paper rolls and labels for US distributor and OEM projects. Food-contact documentation, California warning review, material declarations, printer compatibility, customs scope, and delivery terms are confirmed by grade, application, and destination.",
      areaServed: ["US"],
    },
    ca: {
      name: `${SITE_NAME} — Canada`,
      description: "Thermal paper rolls and labels for Canadian distributor and OEM projects. Material documentation, bilingual or regulated-label requirements, quality-system evidence, packing, and delivery terms are reviewed for each quotation.",
      areaServed: ["CA"],
    },
  };

  const data = regionData[region];
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: data.name,
    description: data.description,
    url: `${SITE_URL}/${region}`,
    areaServed: data.areaServed,
    priceRange: "$$",
    image: `${SITE_URL}/images/factory-overview.jpg`,
    telephone: SALES_PHONE_E164,
    email: CONTACT_EMAIL,
  };
}

// ─── New: WebSite schema for sitelinks searchbox ─────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: "Thermal paper rolls and thermal labels for distributor and OEM projects. Product specifications, material declarations, quality evidence, printer compatibility, packing, and destination requirements are reviewed for each quotation.",
    // 站内没有实现 ?q= 搜索，声明 SearchAction 属于无效结构化数据；
    // 若日后在 /products 实现搜索，再加回 potentialAction
  };
}

// ─── New: Manufacturer schema ─────────────────────────────────────────────────
export function manufacturerSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Corporation",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    foundingDate: "2008",
    description: "Chinese manufacturer of thermal paper rolls and thermal labels for distributor and OEM projects. Product construction, quality-system evidence, material documents, packing, and destination requirements are confirmed for the selected order scope.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Building 15, Phase 1 Zone 2, Ronghao Industrial Park",
      addressLocality: "Xi'an",
      addressRegion: "Shaanxi",
      postalCode: "710000",
      addressCountry: "CN",
    },
    telephone: SALES_PHONE_E164,
    email: CONTACT_EMAIL,
  };
}
