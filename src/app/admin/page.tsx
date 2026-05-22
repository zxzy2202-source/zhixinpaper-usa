import { db } from "@/lib/db";
import { contactInquiries, quoteRequests, sampleRequests, blogPosts, imageSlots } from "@/lib/db/schema";
import Link from "next/link";
import {
  Image as ImageIcon, FileText, MessageSquare, Search,
  ArrowRight, ExternalLink, Sparkles
} from "lucide-react";
import { SLOT_REGISTRY } from "@/lib/imageSlots";
import { getSeoGlobal, calculateSeoScore } from "@/lib/siteSettings";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 并发拉数据
  const [allInquiries, allQuotes, allSamples, allPosts, allSlots, seo] = await Promise.all([
    db.select().from(contactInquiries),
    db.select().from(quoteRequests),
    db.select().from(sampleRequests),
    db.select().from(blogPosts),
    db.select().from(imageSlots),
    getSeoGlobal(),
  ]);

  // 三类询盘合并后的"今日"数
  const today = new Date().toISOString().slice(0, 10);
  const todayLeads = [
    ...allInquiries,
    ...allQuotes,
    ...allSamples,
  ].filter((x) => (x.createdAt || "").startsWith(today)).length;

  const totalSlots = SLOT_REGISTRY.length;
  const usedSlots = allSlots.filter((s) => s.mediaFileId).length;
  const customPercent = totalSlots > 0 ? Math.round((usedSlots / totalSlots) * 100) : 0;

  // 真实 SEO 分（基于实际填写的 SEO 字段）
  const seoScore = calculateSeoScore(seo);

  const cards = [
    {
      label: "图片管理",
      desc: "一键替换全站占位图",
      value: `${usedSlots}/${totalSlots}`,
      sub: "已自定义",
      href: "/admin/image-slots",
      icon: ImageIcon,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "文章管理",
      desc: "撰写发布博客文章",
      value: allPosts.length || "—",
      sub: "文章数",
      href: "/admin/blog",
      icon: FileText,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "客户询盘",
      desc: "查看所有客户留言",
      value: todayLeads || "—",
      sub: "今日询盘",
      href: "/admin/inquiries",
      icon: MessageSquare,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      label: "SEO 设置",
      desc: "全站 SEO 与元数据",
      value: seoScore,
      sub: "健康度",
      href: "/admin/settings",
      icon: Search,
      iconBg: "bg-fuchsia-100",
      iconColor: "text-fuchsia-600",
    },
  ];

  const quickStart = [
    {
      title: "换掉 AI 占位图",
      desc: "进入「图片管理」，点击任意图片旁的「换图」按钮，上传您拍摄的真实工厂/产品图。",
      done: usedSlots > 0,
    },
    {
      title: "发布第一篇博客",
      desc: "进入「文章管理」点「+ 写新文章」，标题+封面+正文，发布后立即可被 Google 收录。",
      done: allPosts.length > 0,
    },
    {
      title: "接收客户询盘",
      desc: "去「SEO 设置」配置好微信/邮件通知，客户提交表单时您手机会立即收到提醒。",
      done: false,
    },
    {
      title: "优化 SEO 分数",
      desc: "进入「SEO 设置」修改全站标题、关键词、OG 分享图，让 Google 更喜欢您的网站。",
      done: false,
    },
  ];

  const progressMsg =
    customPercent < 30 ? "刚开始，加油把占位图替换掉"
    : customPercent < 60 ? "继续加油，市场页也很重要"
    : customPercent < 90 ? "快完工了，再坚持一下"
    : "🎉 全部替换完成，棒！";

  return (
    <div>
      {/* 标题区 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
          老板，您好 <span className="inline-block animate-wave origin-bottom-right">👋</span>
        </h1>
        <p className="text-slate-500 text-sm mt-2">欢迎回来。下面是您网站的实时状态。</p>
      </div>

      {/* 四大功能卡 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-6">
              <div className={`w-11 h-11 ${c.iconBg} rounded-xl flex items-center justify-center`}>
                <c.icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            </div>
            <p className="font-bold text-slate-900 text-base mb-1">{c.label}</p>
            <p className="text-xs text-slate-500 mb-4">{c.desc}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-slate-900 tabular-nums">{c.value}</p>
              <p className="text-xs text-slate-400">{c.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* 快速开始 + 图片进度 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 快速开始 */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 text-base mb-5 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            快速开始
          </h2>
          <ol className="space-y-1">
            {quickStart.map((step, idx) => (
              <li
                key={idx}
                className={`flex items-start gap-4 px-3 py-3 rounded-xl ${
                  step.done ? "bg-emerald-50/60" : "hover:bg-slate-50"
                } transition-colors`}
              >
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                    step.done
                      ? "bg-emerald-500 text-white"
                      : "bg-blue-50 text-blue-600 border border-blue-100"
                  }`}
                >
                  {step.done ? "✓" : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm">{step.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* 图片进度卡 */}
        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
          <h2 className="font-bold text-base mb-5 flex items-center gap-2">
            <span className="text-xl">📊</span>
            图片自定义进度
          </h2>
          <div className="mb-2 flex items-baseline justify-between">
            <p className="text-sm text-slate-300">已替换 AI 占位图</p>
            <p className="text-2xl font-bold tabular-nums">{customPercent}%</p>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${customPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-400 mb-6">{progressMsg}</p>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            查看前台网站
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
