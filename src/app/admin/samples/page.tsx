import { db } from "@/lib/db";
import { sampleRequests } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  preparing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  converted: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  preparing: "备货中",
  shipped: "已发货",
  delivered: "已签收",
  converted: "已转化",
};

export default async function SamplesPage() {
  const samples = await db
    .select()
    .from(sampleRequests)
    .orderBy(desc(sampleRequests.createdAt));

  const counts = {
    total: samples.length,
    new: samples.filter((s) => s.status === "new").length,
    shipped: samples.filter((s) => s.status === "shipped").length,
    converted: samples.filter((s) => s.status === "converted").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">样品申请</h1>
          <p className="text-slate-500 text-sm mt-1">共 {counts.total} 条样品申请</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "全部", value: counts.total, color: "text-slate-900" },
          { label: "新建", value: counts.new, color: "text-blue-600" },
          { label: "已发货", value: counts.shipped, color: "text-purple-600" },
          { label: "已转化", value: counts.converted, color: "text-emerald-600" },
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
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">国家</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">申请产品</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">状态</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">物流单号</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">日期</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {samples.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-slate-400">
                    <FlaskConical className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>暂无样品申请</p>
                  </td>
                </tr>
              ) : (
                samples.map((sample) => {
                  let productList: string[] = [];
                  try { productList = JSON.parse(sample.products || "[]"); } catch {}
                  return (
                    <tr key={sample.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-semibold text-slate-900">{sample.firstName} {sample.lastName}</p>
                          <p className="text-slate-400 text-xs">{sample.email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">{sample.company || "—"}</td>
                      <td className="px-4 py-3 text-slate-600">{sample.country || "—"}</td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        {productList.length > 0 ? (
                          <div className="space-y-0.5">
                            {productList.slice(0, 2).map((p, i) => (
                              <p key={i} className="truncate max-w-[160px]">{p}</p>
                            ))}
                            {productList.length > 2 && <p className="text-slate-400">+{productList.length - 2} 项</p>}
                          </div>
                        ) : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[sample.status]}`}>
                          {STATUS_LABELS[sample.status] || sample.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {sample.trackingNumber || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(sample.createdAt).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/samples/${sample.id}`}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold"
                        >
                          查看
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
