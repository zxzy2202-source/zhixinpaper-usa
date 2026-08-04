import { and, eq, lte } from "drizzle-orm";
import { db } from "@/lib/db";
import { ensureBlogPostSchema } from "@/lib/db/ensureBlogPostSchema";
import { validateBlogPost } from "@/lib/blogPostValidation";
import { blogPosts } from "@/lib/db/schema";

export async function publishDueScheduledBlogPosts(now = new Date()) {
  await ensureBlogPostSchema();

  const nowIso = now.toISOString();
  const duePosts = await db
    .select()
    .from(blogPosts)
    .where(
      and(
        eq(blogPosts.status, "draft"),
        eq(blogPosts.publishApproved, true),
        lte(blogPosts.scheduledAt, nowIso),
      ),
    );

  const published: Array<{ id: number; slug: string }> = [];
  const rejected: Array<{ slug: string; errors: string[] }> = [];

  for (const post of duePosts) {
    const validation = validateBlogPost({
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      metaTitle: post.seoTitle || "",
      metaDescription: post.seoDescription || "",
    });

    if (validation.errors.length > 0) {
      rejected.push({
        slug: post.slug,
        errors: validation.errors.map((issue) => issue.message),
      });
      continue;
    }

    await db.update(blogPosts)
      .set({
        status: "published",
        publishedAt: post.publishedAt || nowIso,
        scheduledAt: null,
        publishApproved: false,
        updatedAt: nowIso,
      })
      .where(eq(blogPosts.id, post.id));

    published.push({ id: post.id, slug: post.slug });
  }

  return { published, rejected };
}
