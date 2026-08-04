import Link from "next/link";
import { desc } from "drizzle-orm";
import { FileText, Info, Pencil, Plus } from "lucide-react";
import BlogCampaignImporter from "@/components/admin/BlogCampaignImporter";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import ImportBuiltInPostsButton from "@/components/admin/ImportBuiltInPostsButton";
import PublishDuePostsButton from "@/components/admin/PublishDuePostsButton";
import { BLOG_CAMPAIGNS } from "@/content/blogCampaigns/registry";
import { db } from "@/lib/db";
import { ensureBlogPostSchema } from "@/lib/db/ensureBlogPostSchema";
import { blogPosts } from "@/lib/db/schema";
import { BLOG_POSTS } from "@/lib/data";
import { validateBlogPost } from "@/lib/blogPostValidation";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  Compliance: "合规",
  Education: "知识科普",
  "Industry News": "行业动态",
  "Product Guide": "产品指南",
  "E-Commerce": "电商",
  Sustainability: "可持续",
  "Technical Tips": "技术技巧",
  "Market Insights": "市场洞察",
};

function getCategoryLabel(category?: string | null) {
  if (!category) {
    return "";
  }
  return CATEGORY_LABELS[category] || category;
}

function getPostStatus(post: {
  status: string;
  scheduledAt: string | null;
  publishApproved: boolean;
}) {
  if (post.status === "published") {
    return { label: "已发布", className: "bg-emerald-100 text-emerald-700", detail: null };
  }

  if (post.status === "archived") {
    return { label: "已归档", className: "bg-amber-100 text-amber-700", detail: null };
  }

  if (post.scheduledAt && post.publishApproved) {
    return {
      label: "待自动发布",
      className: "bg-blue-100 text-blue-700",
      detail: new Date(post.scheduledAt).toLocaleString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  if (post.scheduledAt) {
    return {
      label: "定时草稿",
      className: "bg-amber-100 text-amber-800",
      detail: new Date(post.scheduledAt).toLocaleString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  return { label: "草稿", className: "bg-slate-100 text-slate-600", detail: null };
}

function getAiRiskBadge(risk: ReturnType<typeof validateBlogPost>["qualityAudit"]["aiStyleRisk"]) {
  switch (risk) {
    case "high":
      return { label: "AI味高", className: "bg-rose-100 text-rose-700" };
    case "medium":
      return { label: "AI味待润色", className: "bg-amber-100 text-amber-700" };
    default:
      return { label: "AI味低", className: "bg-emerald-100 text-emerald-700" };
  }
}

function getQualityBadge(level: ReturnType<typeof validateBlogPost>["qualityAudit"]["contentQualityLevel"]) {
  switch (level) {
    case "strong":
      return { label: "内容可发布", className: "bg-emerald-100 text-emerald-700" };
    case "needs-review":
      return { label: "内容待补强", className: "bg-amber-100 text-amber-700" };
    default:
      return { label: "内容偏弱", className: "bg-rose-100 text-rose-700" };
  }
}

export default async function BlogAdminPage() {
  await ensureBlogPostSchema();

  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.updatedAt), desc(blogPosts.createdAt));

  const postAudits = posts.map((post) => {
    const validation = validateBlogPost({
      title: post.title,
      excerpt: post.excerpt || "",
      content: post.content,
      metaTitle: post.seoTitle || "",
      metaDescription: post.seoDescription || "",
    });

    return {
      post,
      validation,
      aiBadge: getAiRiskBadge(validation.qualityAudit.aiStyleRisk),
      qualityBadge: getQualityBadge(validation.qualityAudit.contentQualityLevel),
    };
  });

  const counts = {
    total: postAudits.length,
    published: postAudits.filter(({ post }) => post.status === "published").length,
    draft: postAudits.filter(({ post }) => post.status === "draft" && !post.scheduledAt).length,
    scheduled: postAudits.filter(({ post }) => post.status === "draft" && Boolean(post.scheduledAt)).length,
    approvedQueue: postAudits.filter(({ post }) => post.status === "draft" && Boolean(post.scheduledAt) && Boolean(post.publishApproved)).length,
    aiHighRisk: postAudits.filter(({ validation }) => validation.qualityAudit.aiStyleRisk === "high").length,
    qualityNeedsWork: postAudits.filter(({ validation }) => validation.qualityAudit.contentQualityLevel !== "strong").length,
  };

  const campaignSummaries = BLOG_CAMPAIGNS.map((campaign) => ({
    id: campaign.id,
    name: campaign.name,
    description: campaign.description || "",
    cadenceDays: campaign.cadenceDays,
    total: campaign.posts.length,
    imported: posts.filter((post) => post.campaignId === campaign.id).length,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">博客文章管理</h1>
          <p className="mt-1 text-sm text-slate-500">
            当前共有 {counts.total} 篇数据库文章，其中 {counts.approvedQueue} 篇已批准按计划自动发布。
          </p>
        </div>
        <div className="flex items-start gap-3">
          <PublishDuePostsButton />
          <ImportBuiltInPostsButton totalBuiltInPosts={BLOG_POSTS.length} />
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            新建文章
          </Link>
        </div>
      </div>

      <BlogCampaignImporter campaigns={campaignSummaries} />

      <div className="mb-6 flex items-start gap-3 border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            当前前台博客包含 {BLOG_POSTS.length} 篇内置文章，以及您在后台发布的数据库文章。
          </p>
          <p className="mt-1 text-xs text-blue-600">
            新增的 AI 味和内容质量检查会直接显示在列表和编辑页，方便先筛问题稿，再决定是否发布或排期。
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-7">
        {[
          { label: "数据库文章", value: counts.total, color: "text-slate-900" },
          { label: "已发布", value: counts.published, color: "text-emerald-600" },
          { label: "普通草稿", value: counts.draft, color: "text-slate-500" },
          { label: "定时草稿", value: counts.scheduled, color: "text-amber-700" },
          { label: "待自动发布", value: counts.approvedQueue, color: "text-blue-700" },
          { label: "AI味高风险", value: counts.aiHighRisk, color: "text-rose-600" },
          { label: "待补强文章", value: counts.qualityNeedsWork, color: "text-amber-700" },
        ].map((stat) => (
          <div key={stat.label} className="border border-slate-200 bg-white p-4">
            <p className="mb-1 text-xs text-slate-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden border border-slate-200 bg-white">
        {postAudits.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="mb-2 font-medium">还没有数据库文章</p>
            <p className="mb-4 text-xs">
              可以先导入内置文章、导入活动草稿，或直接新建第一篇后台文章。
            </p>
            <Link href="/admin/blog/new" className="text-sm text-blue-600 hover:underline">
              新建第一篇文章
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {postAudits.map(({ post, validation, aiBadge, qualityBadge }) => {
              const status = getPostStatus(post);

              return (
                <div key={post.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.className}`}>
                        {status.label}
                      </span>
                      {post.category ? <span className="text-xs text-slate-400">{getCategoryLabel(post.category)}</span> : null}
                      {post.campaignId ? (
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                          活动
                        </span>
                      ) : null}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${aiBadge.className}`}>
                        {aiBadge.label}
                      </span>
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${qualityBadge.className}`}>
                        {qualityBadge.label}
                      </span>
                    </div>
                    <h3 className="truncate text-sm font-semibold text-slate-900">{post.title}</h3>
                    {post.excerpt ? <p className="mt-0.5 truncate text-xs text-slate-400">{post.excerpt}</p> : null}
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <code>/blog/{post.slug}</code>
                      {status.detail ? <span>{status.detail}</span> : null}
                      <span>
                        {validation.errors.length} 阻断 / {validation.warnings.length} 提醒 / 质量分 {validation.qualityAudit.contentQualityScore}
                      </span>
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-xs text-slate-400">
                    {new Date(post.updatedAt || post.createdAt).toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/${post.id}`}
                      className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                    >
                      <Pencil className="h-3 w-3" />
                      编辑
                    </Link>
                    <DeleteBlogButton id={post.id} title={post.title} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
