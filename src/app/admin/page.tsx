import { db } from "@/lib/db";
import { contactInquiries, quoteRequests, sampleRequests, blogPosts } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import {
  Mail, Send, FlaskConical, FileText, TrendingUp,
  ArrowRight, Clock, Globe
} from "lucide-react";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { BLOG_POSTS } from "@/lib/data";

export const dynamic = "force-dynamic";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  replied: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-100 text-slate-500",
  quoted: "bg-purple-100 text-purple-700",
  negotiating: "bg-amber-100 text-amber-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-600",
  preparing: "bg-amber-100 text-amber-700",
  shipped: "bg-purple-100 text-purple-700",
  delivered: "bg-emerald-100 text-emerald-700",
  converted: "bg-green-100 text-green-700",
};

const STATUS_LABELS: Record<string, string> = {
  new: "新建",
  in_progress: "跟进中",
  replied: "已回复",
  closed: "已关闭",
  quoted: "已报价",
  negotiating: "谈判中",
  won: "已成交",
  lost: "已失败",
  preparing: "备货中",
  shipped: "已发货",
  delivered: "已签收",
  converted: "已转化",
  published: "已发布",
  draft: "草稿",
};

export default async function AdminDashboard() {
  const [allInquiries, allQuotes, allSamples, allPosts] = await Promise.all([
    await db.select().from(contactInquiries).orderBy(desc(contactInquiries.createdAt)),
    await db.select().from(quoteRequests).orderBy(desc(quoteRequests.createdAt)),
    await db.select().from(sampleRequests).orderBy(desc(sampleRequests.createdAt)),
    await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)),
  ]);

  const stats = [
    {
      label: "联系询盘",
      value: allInquiries.length,
      new: allInquiries.filter((i) => i.status === "new").length,
      icon: Mail,
      href: "/admin/inquiries",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "报价请求",
      value: allQuotes.length,
      new: allQuotes.filter((q) => q.status === "new").length,
      icon: Send,
      href: "/admin/quotes",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      label: "样品申请",
      value: allSamples.length,
      new: allSamples.filter((s) => s.status === "new").length,
      icon: FlaskConical,
      href: "/admin/samples",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "博客文章",
      value: allPosts.length + BLOG_POSTS.length,
      new: allPosts.filter((p) => p.status === "published").length,
      icon: FileText,
      href: "/admin/blog",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      newLabel: `已发布 (${BLOG_POSTS.length} 篇内置)`,
    },
  ];

  // Country distribution
  const countryCount: Record<string, number> = {};
  [...allInquiries, ...allQuotes, ...allSamples].forEach((item) => {
    const country = item.country || "未知";
    countryCount[country] = (countryCount[country] || 0) + 1;
  });
  const topCountries = Object.entries(countryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Recent leads
  const recentLeads = [
    ...allInquiries.slice(0, 5).map((i) => ({
      id: i.id,
      type: "inquiry" as const,
      name: `${i.firstName} ${i.lastName}`,
      company: i.company || "—",
      country: i.country || "—",
      status: i.status,
      createdAt: i.createdAt,
      href: `/admin/inquiries/${i.id}`,
    })),
    ...allQuotes.slice(0, 5).map((q) => ({
      id: q.id,
      type: "quote" as const,
      name: `${q.firstName} ${q.lastName}`,
      company: q.company || "—",
      country: q.country || "—",
      status: q.status,
      createdAt: q.createdAt,
      href: `/admin/quotes/${q.id}`,
    })),
    ...allSamples.slice(0, 5).map((s) => ({
      id: s.id,
      type: "sample" as const,
      name: `${s.firstName} ${s.lastName}`,
      company: s.company || "—",
      country: s.country || "—",
      status: s.status,
      createdAt: s.createdAt,
      href: `/admin/samples/${s.id}`,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  // 30-day daily counts for chart
  const dailyCounts: Record<string, { inquiries: number; quotes: number; samples: number }> = {};
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const key = d.toISOString().split("T")[0];
    dailyCounts[key] = { inquiries: 0, quotes: 0, samples: 0 };
  }
  allInquiries.forEach((item) => {
    const key = item.createdAt.split("T")[0];
    if (dailyCounts[key]) dailyCounts[key].inquiries++;
  });
  allQuotes.forEach((item) => {
    const key = item.createdAt.split("T")[0];
    if (dailyCounts[key]) dailyCounts[key].quotes++;
  });
  allSamples.forEach((item) => {
    const key = item.createdAt.split("T")[0];
    if (dailyCounts[key]) dailyCounts[key].samples++;
  });

  const chartData = Object.entries(dailyCounts).map(([date, counts]) => ({
    date: date.slice(5),
    ...counts,
    total: counts.inquiries + counts.quotes + counts.samples,
  }));

  const TYPE_LABELS: Record<string, string> = {
    inquiry: "联系",
    quote: "报价",
    sample: "样品",
  };

  const TYPE_COLORS: Record<string, string> = {
    inquiry: "bg-blue-100 text-blue-700",
    quote: "bg-purple-100 text-purple-700",
    sample: "bg-amber-100 text-amber-700",
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">仪表盘</h1>
        <p className="text-slate-500 text-sm mt-1">
          欢迎回来，以下是您的线索概览。
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              {stat.new > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full">
                  {stat.new} {stat.newLabel || "条新"}
                </span>
              )}
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
            <p className="text-slate-500 text-xs flex items-center gap-1 group-hover:text-blue-600 transition-colors">
              {stat.label}
              <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </Link>
        ))}
      </div>

      {/* Charts */}
      <DashboardCharts chartData={chartData} topCountries={topCountries} />

      {/* Recent Leads */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">最新线索</h2>
          <div className="flex items-center gap-3">
            <Link href="/admin/inquiries" className="text-xs text-blue-600 hover:underline">查看全部</Link>
          </div>
        </div>
        {recentLeads.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p>暂无线索。分享您的网站以开始接收询盘。</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentLeads.map((lead) => (
              <Link
                key={`${lead.type}-${lead.id}`}
                href={lead.href}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-bold ${TYPE_COLORS[lead.type]}`}>
                      {TYPE_LABELS[lead.type]}
                    </span>
                    <p className="font-semibold text-slate-900 text-sm truncate">{lead.name}</p>
                  </div>
                  <p className="text-slate-400 text-xs">{lead.company} · {lead.country}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS[lead.status] || lead.status}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(lead.createdAt).toLocaleDateString("zh-CN", { month: "2-digit", day: "2-digit" })}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
