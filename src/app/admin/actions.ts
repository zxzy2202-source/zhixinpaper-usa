"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { ensureBlogPostSchema } from "@/lib/db/ensureBlogPostSchema";
import { getBuiltInBlogSeeds } from "@/lib/blogBuiltInSeeds";
import { validateBlogPost } from "@/lib/blogPostValidation";
import { BLOG_CAMPAIGNS, getBlogCampaign } from "@/content/blogCampaigns/registry";
import { publishDueScheduledBlogPosts } from "@/lib/blogPublishing";
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

function normalizeScheduledAt(value?: string | null) {
  if (!value?.trim()) return null;

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Scheduled publish time is invalid.");
  }

  return date.toISOString();
}

function revalidateBlogPaths(slug?: string | null, previousSlug?: string | null) {
  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/blog/${previousSlug}`);
  }
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
  scheduledAt?: string | null;
  publishApproved?: boolean;
  campaignId?: string | null;
}) {
  const session = await requireAdminSession();
  await ensureBlogPostSchema();

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

  let scheduledAt: string | null;
  try {
    scheduledAt = data.status === "published" || data.status === "archived"
      ? null
      : normalizeScheduledAt(data.scheduledAt);
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Scheduled publish time is invalid.",
      validation,
    };
  }

  const publishApproved = data.status === "draft" ? Boolean(data.publishApproved) : false;
  if (publishApproved && !scheduledAt) {
    return {
      success: false,
      error: "Choose a scheduled publish time before approving automatic publication.",
      validation,
    };
  }

  const publishedAt = data.status === "published"
    ? existing?.publishedAt || data.publishedAt || now
    : existing?.publishedAt || data.publishedAt || null;

  const values = {
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
    publishedAt: data.status === "published" ? publishedAt : data.status === "archived" ? publishedAt : null,
    scheduledAt,
    publishApproved,
    campaignId: data.campaignId || existing?.campaignId || null,
    updatedAt: now,
  } as const;

  if (data.id) {
    await db.update(blogPosts)
      .set(values)
      .where(eq(blogPosts.id, data.id));
  } else {
    await db.insert(blogPosts).values({
      ...values,
      authorId: session.id,
      createdAt: now,
    });
  }

  revalidateBlogPaths(data.slug, previousSlug);

  return {
    success: true,
    validation,
  };
}

export async function deleteBlogPost(id: number) {
  await requireAdminSession();
  await ensureBlogPostSchema();

  const existing = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .then((rows) => rows[0]);

  await db.delete(blogPosts).where(eq(blogPosts.id, id));
  revalidateBlogPaths(existing?.slug || null, null);
}

export async function importBuiltInBlogPosts() {
  await requireAdminSession();
  await ensureBlogPostSchema();

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
      scheduledAt: null,
      publishApproved: false,
      campaignId: null,
      createdAt: seed.publishedAt,
      updatedAt: seed.publishedAt,
    });
    created.push(seed.slug);
  }

  revalidateBlogPaths(null, null);

  return {
    success: invalid.length === 0,
    created,
    skipped,
    invalid,
  };
}

export async function importBlogCampaign({
  campaignId,
  startAt,
}: {
  campaignId: string;
  startAt: string;
}) {
  const session = await requireAdminSession();
  await ensureBlogPostSchema();

  const campaign = getBlogCampaign(campaignId);
  if (!campaign) {
    throw new Error("Campaign not found.");
  }

  const startDate = new Date(startAt);
  if (Number.isNaN(startDate.getTime())) {
    throw new Error("Choose a valid first publish slot.");
  }

  const existing = await db
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(inArray(blogPosts.slug, campaign.posts.map((post) => post.slug)));
  const existingSlugs = new Set(existing.map((row) => row.slug));
  const created: Array<{ slug: string; scheduledAt: string }> = [];
  const skipped: string[] = [];
  const now = new Date().toISOString();

  for (const [index, post] of campaign.posts.entries()) {
    if (existingSlugs.has(post.slug)) {
      skipped.push(post.slug);
      continue;
    }

    const scheduledAt = new Date(
      startDate.getTime() + index * campaign.cadenceDays * 24 * 60 * 60 * 1000,
    ).toISOString();

    await db.insert(blogPosts).values({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      tags: post.tags || "",
      readTime: post.readTime || "",
      status: "draft",
      authorId: session.id,
      publishedAt: null,
      scheduledAt,
      publishApproved: false,
      campaignId: campaign.id,
      seoTitle: post.title,
      seoDescription: post.excerpt,
      seoKeywords: "",
      coverImage: null,
      createdAt: now,
      updatedAt: now,
    });

    existingSlugs.add(post.slug);
    created.push({ slug: post.slug, scheduledAt });
  }

  revalidateBlogPaths(null, null);

  return {
    campaign: campaign.id,
    created,
    skipped,
  };
}

export async function publishDueBlogPostsNow() {
  await requireAdminSession();
  const result = await publishDueScheduledBlogPosts();

  if (result.published.length > 0) {
    revalidateBlogPaths(null, null);
    for (const post of result.published) {
      revalidatePath(`/blog/${post.slug}`);
    }
  }

  return result;
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

export async function getBlogCampaignSummaries() {
  await requireAdminSession();
  await ensureBlogPostSchema();

  const posts = await db
    .select({
      campaignId: blogPosts.campaignId,
      slug: blogPosts.slug,
    })
    .from(blogPosts);

  return BLOG_CAMPAIGNS.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    description: campaign.description || "",
    cadenceDays: campaign.cadenceDays,
    total: campaign.posts.length,
    imported: posts.filter((post) => post.campaignId === campaign.id).length,
  }));
}
