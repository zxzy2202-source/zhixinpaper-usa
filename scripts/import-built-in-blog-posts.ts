import { inArray } from "drizzle-orm";
import { db } from "../src/lib/db";
import { getBuiltInBlogSeeds } from "../src/lib/blogBuiltInSeeds";
import { validateBlogPost } from "../src/lib/blogPostValidation";
import { blogPosts } from "../src/lib/db/schema";

async function main() {
  const seeds = getBuiltInBlogSeeds();
  const slugs = seeds.map((seed) => seed.slug);
  const existing = slugs.length > 0
    ? await db
        .select({ slug: blogPosts.slug })
        .from(blogPosts)
        .where(inArray(blogPosts.slug, slugs))
    : [];
  const existingSlugs = new Set(existing.map((row) => row.slug));

  let created = 0;
  let skipped = 0;
  let invalid = 0;

  for (const seed of seeds) {
    if (existingSlugs.has(seed.slug)) {
      skipped += 1;
      continue;
    }

    const validation = validateBlogPost({
      title: seed.title,
      excerpt: seed.excerpt,
      content: seed.content,
      metaTitle: seed.seoTitle,
      metaDescription: seed.seoDescription,
    });

    if (validation.errors.length > 0) {
      invalid += 1;
      console.error(`skip ${seed.slug}: ${validation.errors.map((issue) => issue.code).join(", ")}`);
      continue;
    }

    await db.insert(blogPosts).values({
      slug: seed.slug,
      title: seed.title,
      excerpt: seed.excerpt,
      content: seed.content,
      category: seed.category,
      tags: seed.tags,
      readTime: seed.readTime,
      status: seed.status,
      seoTitle: seed.seoTitle,
      seoDescription: seed.seoDescription,
      seoKeywords: seed.seoKeywords,
      publishedAt: seed.publishedAt,
      createdAt: seed.publishedAt,
      updatedAt: seed.publishedAt,
    });
    created += 1;
  }

  console.log(JSON.stringify({ total: seeds.length, created, skipped, invalid }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
