import { db } from "@/lib/db";
import { contactInquiries, quoteRequests, sampleRequests } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import { Mail, FileText, Package } from "lucide-react";

export const dynamic = "force-dynamic";

type TabType = "inquiry" | "quote" | "sample";

const STATUS_COLORS: Record<string, string> = {
  // contact
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  replied: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-500",
  // quote
  quoted: "bg-sky-100 text-sky-700",
  negotiating: "bg-amber-100 text-amber-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-rose-100 text-rose-600",
  // sample
  preparing: "bg-amber-100 text-amber-700",
  shipped: "bg-sky-100 text-sky-700",
  delivered: "bg-emerald-100 text-emerald-700",
  converted: "bg-fuchsia-100 text-fuchsia-700",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  in_progress: "跟进中",
  replied: "已回复",
  closed: "已关闭",
  quoted: "已报价",
  negotiating: "谈判中",
  won: "已成交",
  lost: "已流失",
  preparing: "备货中",
  shipped: "已发货",
  delivered: "已送达",
  converted: "已转化",
};

const TABS: { id: TabType; label: string; icon: typeof Mail; href: string }[] = [
  { id: "inquiry", label: "联系询盘", icon: Mail, href: "/admin/inquiries?type=inquiry" },
  { id: "quote", label: "报价请求", icon: FileText, href: "/admin/inquiries?type=quote" },
  { id: "sample", label: "样品申请", icon: Package, href: "/admin/inquiries?type=sample" },
];

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  const type: TabType = (["inquiry", "quote", "sample"] as const).includes(params.type as TabType)
    ? (params.type as TabType)
    : "inquiry";

  // 并发统计三类总数 + 当前 tab 列表
  const [inqAll, quoteAll, sampleAll] = await Promise.all([
    db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)),
    db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt)),
    db.select().from(sampleRequests).orderBy(desc(sampleRequests.createdAt)),
  ]);

  const counts = {
    inquiry: inqAll.length,
    quote: quoteAll.length,
    sample: sampleAll.length,
  };

  // 根据 tab 决定当前数据 + 详情页前缀
  const currentList: Array<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    company: string | null;
    country: string | null;
    status: string;
    createdAt: string;
    summary: string;
  }> = (() => {
    if (type === "inquiry") {
      return inqAll.map((x) => ({
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        company: x.company,
        country: x.country,
        status: x.status,
        createdAt: x.createdAt,
        summary: x.subject || x.message?.slice(0, 60) || "—",
      }));
    }
    if (type === "quote") {
      return quoteAll.map((x) => ({
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        email: x.email,
        company: x.company,
        country: x.country,
        status: x.status,
        createdAt: x.createdAt,
        summary: `${x.productType || "—"} × ${x.quantity || "?"}`,
      }));
    }
    return sampleAll.map((x) => ({
      id: x.id,
      firstName: x.firstName,
      lastName: x.lastName,
      email: x.email,
      company: x.company,
      country: x.country,
      status: x.status,
      createdAt: x.createdAt,
      summary: (() => {
        try {
          const arr = JSON.parse(x.products || "[]");
          return Array.isArray(arr) ? arr.slice(0, 2).join(", ") || "—" : "—";
        } catch {
          return x.products?.slice(0, 60) || "—";
        }
      })(),
    }));
  })();

  const detailPrefix =
    type === "inquiry" ? "/admin/inquiries"
    : type === "quote" ? "/admin/quotes"
    : "/admin/samples";

  const summaryHeader =
    type === "inquiry" ? "主题/留言"
    : type === "quote" ? "产品/数量"
    : "申请样品";

  const EmptyIcon =
    type === "inquiry" ? Mail
    : type === "quote" ? FileText
    : Package;

  return (
    <div>
      {/* 标题 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">客户询盘</h1>
        <p className="text-slate-500 text-sm mt-1">
          联系询盘 {counts.inquiry} · 报价请求 {counts.quote} · 样品申请 {counts.sample}
        </p>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 mb-6 bg-white border border-slate-200 rounded-xl p-1 w-fit">
        {TABS.map((tab) => {
          const active = tab.id === type;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                active
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span
                className={`text-xs px-1.5 py-0.5 rounded ${
                  active ? "bg-white/20" : "bg-slate-100 text-slate-500"
                }`}
              >
                {counts[tab.id]}
              </span>
            </Link>
          );
        })}
      </div>

      {/* 列表 */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">联系人</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">公司</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">国家</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">{summaryHeader}</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">状态</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">日期</th>
                <th className="text-left px-4 py-3 text-xs font-bold text-slate-500 uppercase tracking-wide">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <EmptyIcon className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    <p>暂无记录</p>
                  </td>
                </tr>
              ) : (
                currentList.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-slate-900">{row.firstName} {row.lastName}</p>
                        <p className="text-slate-400 text-xs">{row.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.company || "—"}</td>
                    <td className="px-4 py-3 text-slate-600">{row.country || "—"}</td>
                    <td className="px-4 py-3">
                      <p className="text-slate-700 truncate max-w-[240px]">{row.summary}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[row.status] || "bg-slate-100 text-slate-700"}`}>
                        {STATUS_LABELS[row.status] || row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" })}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`${detailPrefix}/${row.id}`}
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
