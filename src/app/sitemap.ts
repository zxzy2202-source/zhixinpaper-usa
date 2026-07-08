import type { MetadataRoute } from "next";
import {
  THERMAL_PAPER_ROLLS,
  THERMAL_LABELS,
  INDUSTRIES,
  GEO_REGIONS,
  COMPLIANCE_ITEMS,
  BLOG_POSTS,
} from "@/lib/data";
import { SITE_URL } from "@/lib/seo";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

const BASE_URL = SITE_URL;

type SitemapEntry = MetadataRoute.Sitemap[number];

function uniqueSitemap(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Map<string, SitemapEntry>();

  for (const entry of entries) {
    if (!seen.has(entry.url)) {
      seen.set(entry.url, entry);
    }
  }

  return Array.from(seen.values());
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/products/thermal-paper-rolls`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/products/thermal-labels`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/industries`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/eu`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/eu/germany`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/eu/uk`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/eu/france`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/eu/netherlands`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/eu/poland`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/us`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/us/fda-compliant`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/us/cannabis-labels`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/ca`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/ca/cannabis-labels`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/factory`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/factory/overview`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/factory/equipment`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/factory/capacity`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/factory/quality-control`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/factory/virtual-tour`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/oem-custom`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/oem-custom/private-label`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/oem-custom/custom-printing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/oem-custom/moq-guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/oem-custom/sample-process`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance/certificates`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compliance/bpa-free`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compliance/reach-rohs`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compliance/iso-9001`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance/fsc-paper`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance/eu-food-contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/compliance/fda-us`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/case-studies`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/quote`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/samples`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const rollPages: MetadataRoute.Sitemap = THERMAL_PAPER_ROLLS.map((roll) => ({
    url: `${BASE_URL}/products/thermal-paper-rolls/${roll.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const labelPages: MetadataRoute.Sitemap = THERMAL_LABELS.map((label) => ({
    url: `${BASE_URL}/products/thermal-labels/${label.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const industryPages: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${BASE_URL}/industries/${industry.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const euCountryPages: MetadataRoute.Sitemap =
    GEO_REGIONS.find((r) => r.slug === "eu")?.countries?.map((c) => ({
      url: `${BASE_URL}/eu/${c.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })) || [];

  const compliancePages: MetadataRoute.Sitemap = COMPLIANCE_ITEMS.map((item) => ({
    url: `${BASE_URL}/compliance/${item.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // 后台（DB）发布的博客文章 — 保证新文章能被搜索引擎从 sitemap 发现
  let dbBlogPages: MetadataRoute.Sitemap = [];
  try {
    const dbPosts = await db
      .select({
        slug: blogPosts.slug,
        publishedAt: blogPosts.publishedAt,
        updatedAt: blogPosts.updatedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));

    dbBlogPages = dbPosts.map((post) => {
      const lastModified = post.updatedAt || post.publishedAt || post.createdAt;
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  } catch (e) {
    console.error("sitemap: failed to fetch blog posts from DB:", e);
  }

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return uniqueSitemap([
    ...staticPages,
    ...rollPages,
    ...labelPages,
    ...industryPages,
    ...euCountryPages,
    ...compliancePages,
    ...dbBlogPages,
    ...blogPages,
  ]);
}
