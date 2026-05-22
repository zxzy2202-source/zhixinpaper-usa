import { sql } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

// ── Admin Users ──────────────────────────────────────────────────────────────
export const adminUsers = sqliteTable("admin_users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role", { enum: ["super_admin", "admin", "viewer"] }).notNull().default("admin"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  lastLoginAt: text("last_login_at"),
});

// ── Contact Inquiries ─────────────────────────────────────────────────────────
export const contactInquiries = sqliteTable("contact_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  country: text("country"),
  subject: text("subject"),
  message: text("message").notNull(),
  status: text("status", { enum: ["new", "in_progress", "replied", "closed"] }).notNull().default("new"),
  notes: text("notes"),
  source: text("source").default("contact_form"),
  ipAddress: text("ip_address"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Quote Requests ────────────────────────────────────────────────────────────
export const quoteRequests = sqliteTable("quote_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  country: text("country"),
  productType: text("product_type"),
  quantity: text("quantity"),
  specifications: text("specifications"),
  message: text("message"),
  status: text("status", { enum: ["new", "quoted", "negotiating", "won", "lost"] }).notNull().default("new"),
  estimatedValue: real("estimated_value"),
  notes: text("notes"),
  source: text("source").default("quote_form"),
  ipAddress: text("ip_address"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Sample Requests ───────────────────────────────────────────────────────────
export const sampleRequests = sqliteTable("sample_requests", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  phone: text("phone"),
  country: text("country"),
  address: text("address"),
  products: text("products"), // JSON array of requested products
  notes: text("notes"),
  status: text("status", { enum: ["new", "preparing", "shipped", "delivered", "converted"] }).notNull().default("new"),
  trackingNumber: text("tracking_number"),
  shippedAt: text("shipped_at"),
  source: text("source").default("samples_form"),
  ipAddress: text("ip_address"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Blog Posts ────────────────────────────────────────────────────────────────
export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  category: text("category"),
  tags: text("tags"), // comma-separated
  readTime: text("read_time"),
  status: text("status", { enum: ["draft", "published", "archived"] }).notNull().default("draft"),
  authorId: integer("author_id").references(() => adminUsers.id),
  publishedAt: text("published_at"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  seoKeywords: text("seo_keywords"),
  coverImage: text("cover_image"),  // 封面图 URL
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Products (overrides for data.ts) ─────────────────────────────────────────
export const productOverrides = sqliteTable("product_overrides", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  productType: text("product_type", { enum: ["roll", "label"] }).notNull(),
  name: text("name"),
  subtitle: text("subtitle"),
  heroDesc: text("hero_desc"),
  description: text("description"),
  features: text("features"), // JSON array
  specifications: text("specifications"), // JSON object
  moq: text("moq"),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Media Categories ──────────────────────────────────────────────────────────
export const mediaCategories = sqliteTable("media_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  slug: text("slug").notNull().unique(),
  description: text("description").default(""),
  color: text("color").default("#6366f1"),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ── Media Library ───────────────────────────────────────────────────────────
export const mediaFiles = sqliteTable("media_files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),       // 磁盘上的实际文件名（含时间戳）
  originalName: text("original_name").notNull(), // 用户上传时的原始文件名
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),             // 字节数
  width: integer("width"),
  height: integer("height"),
  url: text("url").notNull(),                  // 公开访问 URL
  alt: text("alt").default(""),               // 图片 alt 文本
  folder: text("folder").default("uploads"),  // 分类文件夹
  categoryId: integer("category_id").references(() => mediaCategories.id),
  uploadedBy: integer("uploaded_by").references(() => adminUsers.id),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ── Image Slots（运营自助换图） ────────────────────────────────────────────────
// slotKey 是注册在 src/lib/imageSlots.ts SLOT_REGISTRY 中的强类型 key。
// 表里只存"槽位 → 媒体文件"映射，未绑定时前台用 fallback 兜底。
export const imageSlots = sqliteTable("image_slots", {
  slotKey: text("slot_key").primaryKey(),
  mediaFileId: integer("media_file_id").references(() => mediaFiles.id, {
    onDelete: "set null",
  }),
  updatedBy: integer("updated_by").references(() => adminUsers.id),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Site Settings（站点级配置 - Hero 文案/SEO/公司信息等）────────────────────
// 通用 key-value，value 存 JSON 字符串，sectionKey 用于按区域分组
export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),               // e.g. "hero.home", "seo.global"
  sectionKey: text("section_key").notNull(),   // e.g. "hero", "seo", "company"
  value: text("value").notNull().default("{}"),// JSON 字符串
  updatedBy: integer("updated_by").references(() => adminUsers.id),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ── Admin Activity Log ────────────────────────────────────────────────────────
export const activityLog = sqliteTable("activity_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  adminId: integer("admin_id").references(() => adminUsers.id),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: integer("entity_id"),
  details: text("details"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});
