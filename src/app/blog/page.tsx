import type { Metadata } from "next";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { BLOG_POSTS } from "@/lib/data";
import BlogListClient from "./BlogListClient";

export const metadata: Metadata = {
  title: "Thermal Paper Guides & Industry News",
  description:
    "Expert knowledge base for thermal paper distributors and importers. Compliance guides, product specifications, BPA-free regulations, and market insights for Europe, USA, and Canada.",
  keywords: [
    "thermal paper guide",
    "BPA-free thermal paper compliance",
    "thermal paper distributor resources",
    "thermal paper regulations Europe",
    "thermal paper industry news",
  ],
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPage() {
  let dbPosts: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    category: string | null;
    tags: string | null;
    readTime: string | null;
    coverImage: string | null;
    publishedAt: string | null;
    createdAt: string;
  }[] = [];

  try {
    dbPosts = await db
      .select({
        id: blogPosts.id,
        slug: blogPosts.slug,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        category: blogPosts.category,
        tags: blogPosts.tags,
        readTime: blogPosts.readTime,
        coverImage: blogPosts.coverImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.status, "published"))
      .orderBy(desc(blogPosts.publishedAt));
  } catch (e) {
    console.error("Failed to fetch blog posts from DB:", e);
  }

  const dynamicPosts = dbPosts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || "",
    category: p.category || "General",
    tags: p.tags || "",
    readTime: p.readTime || "5 min read",
    coverImage: p.coverImage || null,
    date: p.publishedAt
      ? new Date(p.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
      : new Date(p.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    tag: null as string | null,
    fromDB: true,
  }));

  const dbSlugs = new Set(dynamicPosts.map((p) => p.slug));
  const staticPosts = BLOG_POSTS.filter((p) => !dbSlugs.has(p.slug)).map((p) => ({
    id: null as number | null,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    tags: "",
    readTime: p.readTime,
    coverImage: null as string | null,
    date: p.date,
    tag: p.tag || null,
    fromDB: false,
  }));

  const allPosts = [...dynamicPosts, ...staticPosts];

  return <BlogListClient posts={allPosts} />;
}
