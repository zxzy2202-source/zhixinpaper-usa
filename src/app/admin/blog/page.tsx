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

export const dynamic = "force-dynamic";

function getPostStatus(post: {
  status: string;
  scheduledAt: string | null;
  publishApproved: boolean;
}) {
  if (post.status === "published") {
    return { label: "Published", className: "bg-emerald-100 text-emerald-700", detail: null };
  }
  if (post.status === "archived") {
    return { label: "Archived", className: "bg-amber-100 text-amber-700", detail: null };
  }
  if (post.scheduledAt && post.publishApproved) {
    return {
      label: "Approved Queue",
      className: "bg-blue-100 text-blue-700",
      detail: new Date(post.scheduledAt).toLocaleString("en-US", {
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
      label: "Scheduled Draft",
      className: "bg-amber-100 text-amber-800",
      detail: new Date(post.scheduledAt).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  }

  return { label: "Draft", className: "bg-slate-100 text-slate-600", detail: null };
}

export default async function BlogAdminPage() {
  await ensureBlogPostSchema();

  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.updatedAt), desc(blogPosts.createdAt));

  const counts = {
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    draft: posts.filter((post) => post.status === "draft" && !post.scheduledAt).length,
    scheduled: posts.filter((post) => post.status === "draft" && Boolean(post.scheduledAt)).length,
    approvedQueue: posts.filter((post) => post.status === "draft" && Boolean(post.scheduledAt) && Boolean(post.publishApproved)).length,
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
          <h1 className="text-2xl font-bold text-slate-900">Blog Articles</h1>
          <p className="mt-1 text-sm text-slate-500">
            {counts.total} database article{counts.total === 1 ? "" : "s"}, with {counts.approvedQueue} currently approved for scheduled release.
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
            New Article
          </Link>
        </div>
      </div>

      <BlogCampaignImporter campaigns={campaignSummaries} />

      <div className="mb-6 flex items-start gap-3 border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            The public blog currently includes {BLOG_POSTS.length} built-in articles plus any database posts you publish from the admin.
          </p>
          <p className="mt-1 text-xs text-blue-600">
            Built-in articles can be imported for editing, while campaign batches create scheduled drafts that still need a human review and publish approval.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
        {[
          { label: "Database Articles", value: counts.total, color: "text-slate-900" },
          { label: "Published", value: counts.published, color: "text-emerald-600" },
          { label: "Drafts", value: counts.draft, color: "text-slate-500" },
          { label: "Scheduled", value: counts.scheduled, color: "text-amber-700" },
          { label: "Approved Queue", value: counts.approvedQueue, color: "text-blue-700" },
        ].map((stat) => (
          <div key={stat.label} className="border border-slate-200 bg-white p-4">
            <p className="mb-1 text-xs text-slate-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="overflow-hidden border border-slate-200 bg-white">
        {posts.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
            <p className="mb-2 font-medium">No database articles yet</p>
            <p className="mb-4 text-xs">
              Import built-in posts, import a campaign batch, or create your first backend-managed article.
            </p>
            <Link href="/admin/blog/new" className="text-sm text-blue-600 hover:underline">
              Create the first article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {posts.map((post) => {
              const status = getPostStatus(post);
              return (
                <div key={post.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${status.className}`}>
                        {status.label}
                      </span>
                      {post.category ? <span className="text-xs text-slate-400">{post.category}</span> : null}
                      {post.campaignId ? (
                        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
                          Campaign
                        </span>
                      ) : null}
                    </div>
                    <h3 className="truncate text-sm font-semibold text-slate-900">{post.title}</h3>
                    {post.excerpt ? <p className="mt-0.5 truncate text-xs text-slate-400">{post.excerpt}</p> : null}
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <code>/blog/{post.slug}</code>
                      {status.detail ? <span>{status.detail}</span> : null}
                    </div>
                  </div>
                  <div className="whitespace-nowrap text-xs text-slate-400">
                    {new Date(post.updatedAt || post.createdAt).toLocaleDateString("en-US", {
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
                      Edit
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
