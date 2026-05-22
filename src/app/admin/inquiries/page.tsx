import { db } from "@/lib/db";
import { contactInquiries } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Mail } from "lucide-react";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  replied: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-500",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  in_progress: "跟进中",
  replied: "已回复",
  closed: "已关闭",
};

export default async function InquiriesPage() {
  const inquiries = await db
    .select()
    .from(contactInquiries)
    .orderBy(desc(contactInquiries.createdAt));

  const counts = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    in_progress: inquiries.filter((i) => i.status === "in_progress").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">联系询盘</h1>
          <p className="text-slate-500 text-sm mt-1">共 {counts.total} 条询盘记录</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "全部", value: counts.total, color: "text-slate-900" },
          { label: "新建", value: counts.new, color: "text-blue-600" },
          { label: "跟进中", value: counts.in_progress, color: "text-amber-600" },
          { label: "已回复", value: counts.replied, color: "text-emerald-600" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">联系人</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">公司</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">国家</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">主题</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">状态</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">日期</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Mail className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>暂无询盘记录</p>
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{inquiry.firstName} {inquiry.lastName}</p>
                        <p className="text-slate-400 text-xs">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{inquiry.company || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{inquiry.country || "—"}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 truncate max-w-[200px]">{inquiry.subject || "—"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[inquiry.status]}`}>
                        {STATUS_LABELS[inquiry.status] || inquiry.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(inquiry.createdAt).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
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
