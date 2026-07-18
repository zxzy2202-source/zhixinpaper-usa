import { db } from "@/lib/db";
import { quoteRequests } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Send } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  quoted: "bg-purple-100 text-purple-700",
  negotiating: "bg-amber-100 text-amber-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  quoted: "已报价",
  negotiating: "谈判中",
  won: "已成交",
  lost: "已失败",
};

export default async function QuotesPage() {
  const quotes = await db
    .select()
    .from(quoteRequests)
    .orderBy(desc(quoteRequests.createdAt));

  const counts = {
    total: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    quoted: quotes.filter((q) => q.status === "quoted").length,
    won: quotes.filter((q) => q.status === "won").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">报价请求</h1>
          <p className="text-slate-500 text-sm mt-1">共 {counts.total} 条报价记录</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "全部", value: counts.total, color: "text-slate-900" },
          { label: "新建", value: counts.new, color: "text-blue-600" },
          { label: "已报价", value: counts.quoted, color: "text-purple-600" },
          { label: "已成交", value: counts.won, color: "text-emerald-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200  p-4">
            <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200  overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">联系人</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">公司</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">产品</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">数量</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">国家</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">状态</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">日期</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <Send className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>暂无报价请求</p>
                  </td>
                </tr>
              ) : (
                quotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{quote.firstName} {quote.lastName}</p>
                        <p className="text-slate-400 text-xs">{quote.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{quote.company || "—"}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-[150px] truncate">{quote.productType || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{quote.quantity || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{quote.country || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[quote.status]}`}>
                        {STATUS_LABELS[quote.status] || quote.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(quote.createdAt).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                      >
                        查看
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
