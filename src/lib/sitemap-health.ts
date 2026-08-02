import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { BLOG_POSTS } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export type SitemapHealthSnapshot = {
  ok: boolean;
  database: "reachable" | "unavailable";
  sitemap: "complete" | "incomplete" | "unavailable" | "unchecked";
  publishedDatabasePosts: number | null;
  missingDatabasePosts: number | null;
  staticPosts: number;
  checkedAt: string;
  error?: string;
};

type SitemapHealthDependencies = {
  getPublishedSlugs: () => Promise<string[]>;
  fetchSitemap: typeof fetch;
};

const defaultDependencies: SitemapHealthDependencies = {
  getPublishedSlugs: async () => {
    const posts = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"));
    return posts.map((post) => post.slug);
  },
  fetchSitemap: fetch,
};

export async function checkSitemapHealth(
  sitemapUrl: string,
  canonicalBaseUrl = SITE_URL,
  dependencies: SitemapHealthDependencies = defaultDependencies,
): Promise<SitemapHealthSnapshot> {
  const checkedAt = new Date().toISOString();

  try {
    const publishedSlugs = await dependencies.getPublishedSlugs();

    let response: Response;
    try {
      response = await dependencies.fetchSitemap(sitemapUrl, {
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
    } catch (error) {
      return {
        ok: false,
        database: "reachable",
        sitemap: "unavailable",
        publishedDatabasePosts: publishedSlugs.length,
        missingDatabasePosts: null,
        staticPosts: BLOG_POSTS.length,
        checkedAt,
        error: error instanceof Error ? error.message : String(error),
      };
    }

    if (!response.ok) {
      return {
        ok: false,
        database: "reachable",
        sitemap: "unavailable",
        publishedDatabasePosts: publishedSlugs.length,
        missingDatabasePosts: null,
        staticPosts: BLOG_POSTS.length,
        checkedAt,
        error: `Sitemap returned HTTP ${response.status}`,
      };
    }

    const sitemapXml = await response.text();
    const missingDatabasePosts = publishedSlugs.filter((slug) => {
      const canonicalUrl = new URL(`/blog/${slug}`, canonicalBaseUrl).toString();
      return !sitemapXml.includes(`<loc>${canonicalUrl}</loc>`);
    }).length;

    return {
      ok: missingDatabasePosts === 0,
      database: "reachable",
      sitemap: missingDatabasePosts === 0 ? "complete" : "incomplete",
      publishedDatabasePosts: publishedSlugs.length,
      missingDatabasePosts,
      staticPosts: BLOG_POSTS.length,
      checkedAt,
      ...(missingDatabasePosts > 0
        ? { error: `${missingDatabasePosts} published database post(s) missing from sitemap` }
        : {}),
    };
  } catch (error) {
    return {
      ok: false,
      database: "unavailable",
      sitemap: "unchecked",
      publishedDatabasePosts: null,
      missingDatabasePosts: null,
      staticPosts: BLOG_POSTS.length,
      checkedAt,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export function toPublicSitemapHealth(snapshot: SitemapHealthSnapshot) {
  const { error: _error, ...publicSnapshot } = snapshot;
  return publicSnapshot;
}
