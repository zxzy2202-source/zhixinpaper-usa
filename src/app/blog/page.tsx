import type { Metadata } from "next";
import { desc, eq } from "drizzle-orm";
import { BLOG_POSTS } from "@/lib/data";
import { db } from "@/lib/db";
import { ensureBlogPostSchema } from "@/lib/db/ensureBlogPostSchema";
import { blogPosts } from "@/lib/db/schema";
import { buildSectionMetadata, DEFAULT_SEO_SECTIONS } from "@/lib/siteSettings";
import BlogListClient from "./BlogListClient";

const blogSeoDefaults = DEFAULT_SEO_SECTIONS.blog;

export async function generateMetadata(): Promise<Metadata> {
  return buildSectionMetadata("blog", {
    fallbackTitle: blogSeoDefaults.siteTitle,
    fallbackDescription: blogSeoDefaults.siteDescription,
    path: "/blog",
    fallbackKeywords: blogSeoDefaults.keywords.split(",").map((item) => item.trim()),
  });
}

// ISR：列表页静态化，后台 saveBlogPost/deleteBlogPost 里的
// revalidatePath("/blog") 会在发布/删除时立即刷新
export const revalidate = 300;

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
    await ensureBlogPostSchema();
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

  const dynamicPosts = dbPosts.map((post) => ({
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    category: post.category || "General",
    tags: post.tags || "",
    readTime: post.readTime || "5 min read",
    coverImage: post.coverImage || null,
    date: post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }),
    tag: null as string | null,
    fromDB: true,
  }));

  const dbSlugs = new Set(dynamicPosts.map((post) => post.slug));
  const staticPosts = BLOG_POSTS.filter((post) => !dbSlugs.has(post.slug)).map((post) => ({
    id: null as number | null,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: "",
    readTime: post.readTime,
    coverImage: null as string | null,
    date: post.date,
    tag: post.tag || null,
    fromDB: false,
  }));

  return <BlogListClient posts={[...dynamicPosts, ...staticPosts]} />;
}
