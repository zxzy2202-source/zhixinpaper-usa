"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { getBuiltInBlogSeeds } from "@/lib/blogBuiltInSeeds";
import { validateBlogPost } from "@/lib/blogPostValidation";
import {
  blogPosts,
  contactInquiries,
  productOverrides,
  quoteRequests,
  sampleRequests,
} from "@/lib/db/schema";
import { getSession } from "@/lib/session";

async function requireAdminSession() {
  const session = await getSession();
  if (!session?.email) {
    throw new Error("Not authenticated.");
  }

  return session;
}

export async function updateLeadStatus({
  id,
  type,
  status,
  notes,
}: {
  id: number;
  type: "inquiry" | "quote" | "sample";
  status: string;
  notes: string;
}) {
  const now = new Date().toISOString();

  if (type === "inquiry") {
    await db.update(contactInquiries)
      .set({ status: status as any, notes, updatedAt: now })
      .where(eq(contactInquiries.id, id));
    revalidatePath("/admin/inquiries");
    revalidatePath(`/admin/inquiries/${id}`);
  } else if (type === "quote") {
    await db.update(quoteRequests)
      .set({ status: status as any, notes, updatedAt: now })
      .where(eq(quoteRequests.id, id));
    revalidatePath("/admin/quotes");
    revalidatePath(`/admin/quotes/${id}`);
  } else if (type === "sample") {
    await db.update(sampleRequests)
      .set({ status: status as any, notes, updatedAt: now })
      .where(eq(sampleRequests.id, id));
    revalidatePath("/admin/samples");
    revalidatePath(`/admin/samples/${id}`);
  }
}

export async function updateSampleTracking({
  id,
  trackingNumber,
  shippedAt,
}: {
  id: number;
  trackingNumber: string;
  shippedAt: string;
}) {
  await db.update(sampleRequests)
    .set({
      trackingNumber,
      shippedAt,
      status: "shipped",
      updatedAt: new Date().toISOString(),
    })
    .where(eq(sampleRequests.id, id));
  revalidatePath("/admin/samples");
  revalidatePath(`/admin/samples/${id}`);
}

export async function saveBlogPost(data: {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  status: "draft" | "published" | "archived";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  coverImage?: string;
  publishedAt?: string;
}) {
  const session = await requireAdminSession();
  const now = new Date().toISOString();
  const validation = validateBlogPost({
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    metaTitle: data.seoTitle,
    metaDescription: data.seoDescription,
  });
  const existing = data.id
    ? await db.select().from(blogPosts).where(eq(blogPosts.id, data.id)).then((rows) => rows[0] || null)
    : null;
  const previousSlug = existing?.slug || null;

  if (!data.slug.trim()) {
    return {
      success: false,
      error: "Slug is required.",
      validation,
    };
  }

  if (data.status === "published" && validation.errors.length > 0) {
    return {
      success: false,
      error: "Fix the blocking blog checks before publishing.",
      validation,
    };
  }

  const publishedAt = data.status === "published"
    ? existing?.publishedAt || data.publishedAt || now
    : data.status === "draft"
      ? null
      : existing?.publishedAt || data.publishedAt || null;

  if (data.id) {
    await db.update(blogPosts)
      .set({
        slug: data.slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        category: data.category,
        tags: data.tags,
        readTime: data.readTime,
        status: data.status,
        seoTitle: data.seoTitle,
        seoDescription: data.seoDescription,
        seoKeywords: data.seoKeywords,
        coverImage: data.coverImage || null,
        publishedAt,
        updatedAt: now,
      })
      .where(eq(blogPosts.id, data.id));
  } else {
    await db.insert(blogPosts).values({
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category: data.category,
      tags: data.tags,
      readTime: data.readTime,
      status: data.status,
      authorId: session.id,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      coverImage: data.coverImage || null,
      publishedAt,
    });
  }

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  if (previousSlug && previousSlug !== data.slug) {
    revalidatePath(`/blog/${previousSlug}`);
  }
  revalidatePath("/sitemap.xml");

  return {
    success: true,
    validation,
  };
}

export async function deleteBlogPost(id: number) {
  await requireAdminSession();
  const existing = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .then((rows) => rows[0]);

  await db.delete(blogPosts).where(eq(blogPosts.id, id));

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (existing?.slug) {
    revalidatePath(`/blog/${existing.slug}`);
  }
  revalidatePath("/sitemap.xml");
}

export async function importBuiltInBlogPosts() {
  await requireAdminSession();

  const seeds = getBuiltInBlogSeeds();
  const slugs = seeds.map((seed) => seed.slug);
  const existing = slugs.length > 0
    ? await db
        .select({ slug: blogPosts.slug })
        .from(blogPosts)
        .where(inArray(blogPosts.slug, slugs))
    : [];
  const existingSlugs = new Set(existing.map((row) => row.slug));
  const created: string[] = [];
  const skipped: string[] = [];
  const invalid: Array<{ slug: string; errors: string[] }> = [];

  for (const seed of seeds) {
    if (existingSlugs.has(seed.slug)) {
      skipped.push(seed.slug);
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
      invalid.push({
        slug: seed.slug,
        errors: validation.errors.map((issue) => issue.message),
      });
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
    created.push(seed.slug);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  return {
    success: invalid.length === 0,
    created,
    skipped,
    invalid,
  };
}

export async function saveProductOverride(data: {
  slug: string;
  productType: "roll" | "label";
  name?: string;
  subtitle?: string;
  heroDesc?: string;
  description?: string;
  features?: string;
  specifications?: string;
  moq?: string;
}) {
  const existingRows = await db.select()
    .from(productOverrides)
    .where(eq(productOverrides.slug, data.slug));
  const existing = existingRows[0];

  if (existing) {
    await db.update(productOverrides)
      .set({ ...data, updatedAt: new Date().toISOString() })
      .where(eq(productOverrides.slug, data.slug));
  } else {
    await db.insert(productOverrides).values(data);
  }

  revalidatePath("/admin/products");
  revalidatePath(`/products/thermal-paper-rolls/${data.slug}`);
  revalidatePath(`/products/thermal-labels/${data.slug}`);
}

export async function changeAdminPassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}): Promise<{ success?: boolean; error?: string }> {
  const session = await getSession();
  if (!session?.email) {
    return { error: "Not authenticated." };
  }

  const { adminUsers } = await import("@/lib/db/schema");
  const userRows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, session.email));
  const user = userRows[0];

  if (!user) return { error: "User not found." };

  const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!isValid) return { error: "Current password is incorrect." };

  const newHash = await bcrypt.hash(newPassword, 12);
  await db.update(adminUsers)
    .set({ passwordHash: newHash })
    .where(eq(adminUsers.id, user.id));

  return { success: true };
}
