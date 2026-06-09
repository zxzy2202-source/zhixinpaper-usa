"use server";

import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { contactInquiries, quoteRequests, sampleRequests, blogPosts, productOverrides } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// ── Update Lead Status ────────────────────────────────────────────────────────
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

// ── Update Sample Tracking ────────────────────────────────────────────────────
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

// ── Blog Post Actions ─────────────────────────────────────────────────────────
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
}) {
  const now = new Date().toISOString();
  const previousSlug = data.id
    ? await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, data.id)).then((rows) => rows[0]?.slug)
    : null;

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
        publishedAt: data.status === "published" ? now : undefined,
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
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,
      seoKeywords: data.seoKeywords,
      coverImage: data.coverImage || null,
      publishedAt: data.status === "published" ? now : undefined,
    });
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  if (previousSlug && previousSlug !== data.slug) revalidatePath(`/blog/${previousSlug}`);
}

export async function deleteBlogPost(id: number) {
  const existing = await db.select({ slug: blogPosts.slug }).from(blogPosts).where(eq(blogPosts.id, id)).then((rows) => rows[0]);
  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
}

// ── Product Override Actions ──────────────────────────────────────────────────
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

// ── Change Admin Password ─────────────────────────────────────────────────────
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
