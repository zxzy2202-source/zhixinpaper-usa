import Link from "next/link";
import { desc } from "drizzle-orm";
import { FileText, Info, Pencil, Plus } from "lucide-react";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";
import ImportBuiltInPostsButton from "@/components/admin/ImportBuiltInPostsButton";
import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { BLOG_POSTS } from "@/lib/data";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-500",
  published: "bg-emerald-100 text-emerald-700",
  archived: "bg-amber-100 text-amber-600",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "Draft",
  published: "Published",
  archived: "Archived",
};

export default async function BlogAdminPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  const counts = {
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    draft: posts.filter((post) => post.status === "draft").length,
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Articles</h1>
          <p className="mt-1 text-sm text-slate-500">
            {counts.total} database article{counts.total === 1 ? "" : "s"}
          </p>
        </div>
        <div className="flex items-start gap-3">
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

      <div className="mb-6 flex items-start gap-3 border border-blue-200 bg-blue-50 p-4">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
        <div>
          <p className="text-sm font-medium text-blue-800">
            The public blog currently includes {BLOG_POSTS.length} built-in articles.
          </p>
          <p className="mt-1 text-xs text-blue-600">
            Import them into the admin database if you want to keep writing, editing, and publishing from one backend workflow instead of maintaining static and database content separately.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          { label: "Database Articles", value: counts.total, color: "text-slate-900" },
          { label: "Published", value: counts.published, color: "text-emerald-600" },
          { label: "Drafts", value: counts.draft, color: "text-slate-500" },
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
              Import the built-in posts or create your first backend-managed blog article.
            </p>
            <Link href="/admin/blog/new" className="text-sm text-blue-600 hover:underline">
              Create the first article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_COLORS[post.status]}`}>
                      {STATUS_LABELS[post.status] || post.status}
                    </span>
                    {post.category ? (
                      <span className="text-xs text-slate-400">{post.category}</span>
                    ) : null}
                  </div>
                  <h3 className="truncate text-sm font-semibold text-slate-900">{post.title}</h3>
                  {post.excerpt ? (
                    <p className="mt-0.5 truncate text-xs text-slate-400">{post.excerpt}</p>
                  ) : null}
                </div>
                <div className="whitespace-nowrap text-xs text-slate-400">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
