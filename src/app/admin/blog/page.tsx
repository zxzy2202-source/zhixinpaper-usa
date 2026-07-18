import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { FileText, Plus, Pencil, Info } from "lucide-react";
import DeleteBlogButton from "@/components/admin/DeleteBlogButton";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-slate-100 text-slate-500",
  published: "bg-emerald-100 text-emerald-700",
  archived: "bg-amber-100 text-amber-600",
};

const STATUS_LABELS: Record<string, string> = {
  draft: "草稿",
  published: "已发布",
  archived: "已归档",
};

export default async function BlogAdminPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt));

  const counts = {
    total: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">博客文章</h1>
          <p className="text-slate-500 text-sm mt-1">
            数据库中 {counts.total} 篇文章
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold  text-sm transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          新建文章
        </Link>
      </div>

      {/* Built-in articles notice */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200  p-4 mb-6">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-blue-800 text-sm font-medium">前台博客包含 11 篇内置文章</p>
          <p className="text-blue-600 text-xs mt-1">
            内置文章为静态内容，无需在此管理。此处管理通过后台创建的动态文章，新建文章发布后将自动显示在前台博客页面。
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "数据库文章", value: counts.total, color: "text-slate-900" },
          { label: "已发布", value: counts.published, color: "text-emerald-600" },
          { label: "草稿", value: counts.draft, color: "text-slate-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200  p-4">
            <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Posts List */}
      <div className="bg-white border border-slate-200  overflow-hidden">
        {posts.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-2">暂无数据库文章</p>
            <p className="text-xs mb-4">点击"新建文章"创建第一篇动态博客文章</p>
            <Link href="/admin/blog/new" className="text-blue-600 hover:underline text-sm">
              创建第一篇文章
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${STATUS_COLORS[post.status]}`}>
                      {STATUS_LABELS[post.status] || post.status}
                    </span>
                    {post.category && (
                      <span className="text-slate-400 text-xs">{post.category}</span>
                    )}
                  </div>
                  <h3 className="font-semibold text-slate-900 text-sm truncate">{post.title}</h3>
                  {post.excerpt && (
                    <p className="text-slate-400 text-xs mt-0.5 truncate">{post.excerpt}</p>
                  )}
                </div>
                <div className="text-slate-400 text-xs whitespace-nowrap">
                  {new Date(post.createdAt).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/blog/${post.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold  text-xs transition-colors"
                  >
                    <Pencil className="w-3 h-3" />
                    编辑
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
