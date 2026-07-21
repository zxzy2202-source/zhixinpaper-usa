import type { Metadata } from "next";

export const SITE_URL = "https://www.zhixinpaper.com";
export const SITE_NAME = "Zhixin Paper";
export const CONTACT_EMAIL = "Sales@zxpapers.com";
export const SALES_PHONE_E164 = "+8615339247872";
export const WHATSAPP_PHONE_E164 = "+8618792771927";
const DEFAULT_IMAGE = "/images/og-default.jpg";

export function canonicalUrl(path = "/") {
  const normalizedPath = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

// ─── Core metadata factory ────────────────────────────────────────────────────
export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  keywords = [],
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = canonicalUrl(path);
  // Don't append SITE_NAME here - layout.tsx template already adds "| Zhixin Paper"
  const fullTitle = title;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
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
      "ISO 9001:2015 certified manufacturer of BPA-free, FDA-compliant thermal paper rolls and thermal labels. Serving distributors and importers in Europe, USA, and Canada with factory-direct pricing. Prop 65 compliant, compatible with Zebra, Epson, Star, and all major printer brands.",
    foundingDate: "2008",
    numberOfEmployees: { "@type": "QuantitativeValue", value: 200 },
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
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "ISO 9001:2015" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "FSC Chain of Custody" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "REACH SVHC Compliant" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "BPA-Free Certified" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "FDA 21 CFR Compliant" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "California Prop 65 Compliant" },
    ],
    areaServed: ["Europe", "United States", "Canada"],
    knowsAbout: [
      "Thermal Paper Manufacturing",
      "Thermal Labels",
      "BPA-Free Thermal Paper",
      "FDA Compliant Thermal Paper",
      "POS Paper Rolls",
      "ATM Paper Rolls",
      "Thermal Transfer Labels",
      "OEM Paper Products",
      "Casino TITO Paper",
      "Cannabis Compliance Labels",
      "Cold Chain Labels",
      "Prop 65 Compliant Materials",
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
    image: `${SITE_URL}${image}`,
    url: `${SITE_URL}${url}`,
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
      item: `${SITE_URL}${item.url}`,
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
    image: `${SITE_URL}${image}`,
    url: `${SITE_URL}${url}`,
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
      "@id": `${SITE_URL}${url}`,
    },
  };
}

export function localBusinessSchema(region: "eu" | "us" | "ca") {
  const regionData = {
    eu: {
      name: `${SITE_NAME} — Europe`,
      description: "BPA-free thermal paper rolls and thermal labels for European distributors. REACH/RoHS compliant, ISO 9001 certified. Factory-direct pricing, FOB Qingdao.",
      areaServed: ["DE", "GB", "FR", "NL", "PL"],
    },
    us: {
      name: `${SITE_NAME} — USA`,
      description: "FDA-compliant, Prop 65 compliant thermal paper rolls and labels for US distributors. BPA-free, 21 CFR food contact safe, ISO 9001 certified manufacturer. Cannabis labels available. Compatible with Zebra, Epson, Star printers. DDP shipping to USA available.",
      areaServed: ["US"],
    },
    ca: {
      name: `${SITE_NAME} — Canada`,
      description: "Thermal paper rolls and labels for Canadian distributors and importers. Health Canada compliant, BPA-free options. ISO 9001 certified.",
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
    description: "ISO 9001 certified manufacturer of BPA-free, FDA-compliant thermal paper rolls and thermal labels. Factory-direct wholesale pricing for distributors in Europe, USA, and Canada. Pallet and container load pricing available.",
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
    description: "Chinese manufacturer of thermal paper rolls and thermal labels for international distributors and OEM buyers. ISO 9001:2015 certified production with BPA-free and market-specific compliance options.",
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
