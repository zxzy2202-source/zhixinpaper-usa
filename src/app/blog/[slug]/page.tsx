import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { BLOG_POSTS } from "@/lib/data";
import BlogPostClient from "./BlogPostClient";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const STATIC_POST_SEO: Record<string, { title: string; keywords: string[] }> = {
  "thermal-paper-roll-sizes-guide": {
    title: "Thermal Paper Roll Sizes Guide",
    keywords: [
      "thermal paper roll size guide",
      "thermal paper roll dimensions",
      "thermal paper roll size chart",
      "how to measure thermal paper roll",
      "3 1/8 thermal paper",
      "2 1/4 thermal paper rolls",
    ],
  },
  "thermal-paper-printer-compatibility-guide": {
    title: "Thermal Paper Printer Compatibility Guide",
    keywords: [
      "thermal printer paper",
      "thermal paper printer compatibility",
      "receipt printer paper rolls",
      "paper for thermal printer",
      "payment terminal paper compatibility",
      "POS printer paper size",
    ],
  },
};

// ISR：文章页静态化，后台保存时 revalidatePath(`/blog/${slug}`) 即时刷新
export const revalidate = 300;

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  let dbPost = null;
  try {
    dbPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).then(r => r[0]);
  } catch {}

  if (dbPost) {
    return {
      title: `${dbPost.seoTitle || dbPost.title} | Blog`,
      description: dbPost.seoDescription || dbPost.excerpt || "",
      keywords: dbPost.seoKeywords
        ? dbPost.seoKeywords.split(",").map((k: string) => k.trim())
        : ["thermal paper", dbPost.category || "", "BPA-free thermal paper"],
      openGraph: {
        title: dbPost.title,
        description: dbPost.excerpt || "",
        type: "article",
        publishedTime: dbPost.publishedAt || dbPost.createdAt,
        authors: ["Zhixin Paper"],
        images: dbPost.coverImage ? [{ url: dbPost.coverImage }] : [],
      },
      alternates: { canonical: `https://www.zhixinpaper.com/blog/${slug}` },
    };
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found" };
  const staticSeo = STATIC_POST_SEO[slug];
  return {
    title: staticSeo?.title || `${post.title} | Blog`,
    description: post.excerpt,
    keywords: staticSeo?.keywords || ["thermal paper", post.category.toLowerCase(), "BPA free thermal paper", "thermal paper manufacturer"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Zhixin Paper"],
    },
    alternates: { canonical: `https://www.zhixinpaper.com/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let dbPost = null;
  try {
    dbPost = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).then(r => r[0]);
  } catch {}

  if (dbPost) {
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: dbPost.title,
      description: dbPost.excerpt || "",
      datePublished: dbPost.publishedAt || dbPost.createdAt,
      dateModified: dbPost.updatedAt,
      author: { "@type": "Organization", name: "Zhixin Paper", url: "https://www.zhixinpaper.com" },
      publisher: { "@type": "Organization", name: "Zhixin Paper", url: "https://www.zhixinpaper.com" },
      mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.zhixinpaper.com/blog/${slug}` },
      ...(dbPost.coverImage ? { image: dbPost.coverImage } : {}),
    };

    return (
      <>
        <Header />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <BlogPostClient
          slug={slug}
          dbPost={{
            id: dbPost.id,
            slug: dbPost.slug,
            title: dbPost.title,
            excerpt: dbPost.excerpt || "",
            content: dbPost.content,
            category: dbPost.category || "General",
            tags: dbPost.tags || "",
            readTime: dbPost.readTime || "5 min read",
            coverImage: dbPost.coverImage || null,
            publishedAt: dbPost.publishedAt,
            createdAt: dbPost.createdAt,
            status: dbPost.status,
          }}
        />
        <Footer />
      </>
    );
  }

  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Zhixin Paper", url: "https://www.zhixinpaper.com" },
    publisher: {
      "@type": "Organization",
      name: "Zhixin Paper",
      url: "https://www.zhixinpaper.com",
      logo: { "@type": "ImageObject", url: "https://www.zhixinpaper.com/images/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.zhixinpaper.com/blog/${slug}` },
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BlogPostClient slug={slug} dbPost={null} />
      <Footer />
    </>
  );
}
