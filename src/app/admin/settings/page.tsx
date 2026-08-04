import Link from "next/link";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import {
  Database,
  ExternalLink,
  Globe2,
  Layers3,
  Search,
  Share2,
  Shield,
  TriangleAlert,
} from "lucide-react";
import {
  auditSeoConfig,
  getSeoGlobal,
  getSeoSections,
  SEO_SECTION_KEYS,
} from "@/lib/siteSettings";
import SeoEditor from "./SeoEditor";

export const dynamic = "force-dynamic";

function getScoreTone(score: number) {
  if (score >= 90) {
    return {
      label: "可直接上线",
      text: "全站默认 SEO 结构完整，栏目默认也已经接入后台，可继续做页面级精修。",
      pill: "bg-emerald-500/12 text-emerald-200 ring-1 ring-inset ring-emerald-400/30",
    };
  }

  if (score >= 70) {
    return {
      label: "基础可用",
      text: "全站默认已经可控，但仍有机会继续提升点击率、分享一致性和栏目承接力。",
      pill: "bg-amber-500/12 text-amber-100 ring-1 ring-inset ring-amber-400/30",
    };
  }

  return {
    label: "需要补齐",
    text: "建议先补齐默认标题、描述、分享图和验证信息，再继续发布栏目内容。",
    pill: "bg-rose-500/12 text-rose-100 ring-1 ring-inset ring-rose-400/30",
  };
}

export default async function SettingsPage() {
  const [seo, seoSections] = await Promise.all([getSeoGlobal(), getSeoSections()]);
  const audit = auditSeoConfig(seo);
  const scoreTone = getScoreTone(audit.score);

  const configuredSections = SEO_SECTION_KEYS.filter((key) => {
    const current = seoSections[key];
    return current.siteTitle.trim() && current.siteDescription.trim();
  }).length;
  const sectionKeywordCoverage = SEO_SECTION_KEYS.filter(
    (key) => seoSections[key].keywords.trim().length > 0,
  ).length;
  const sectionImageCoverage = SEO_SECTION_KEYS.filter(
    (key) => seoSections[key].ogImage.trim().length > 0,
  ).length;

  const summaryCards = [
    {
      label: "标题长度",
      value: audit.titleLength > 0 ? `${audit.titleLength} 字符` : "未填写",
      detail: "建议 30-60 字符",
      icon: Search,
    },
    {
      label: "描述长度",
      value: audit.descriptionLength > 0 ? `${audit.descriptionLength} 字符` : "未填写",
      detail: "建议 120-165 字符",
      icon: Globe2,
    },
    {
      label: "已配置栏目",
      value: `${configuredSections}/${SEO_SECTION_KEYS.length}`,
      detail: "首页 / 产品 / 博客 / 报价 / 样品 / 联系",
      icon: Layers3,
    },
    {
      label: "栏目关键词覆盖",
      value: `${sectionKeywordCoverage}/${SEO_SECTION_KEYS.length}`,
      detail: "栏目默认关键词",
      icon: Share2,
    },
  ];

  const metadataFlow = [
    { label: "全站元数据入口", value: "src/app/layout.tsx / generateMetadata()" },
    { label: "栏目元数据入口", value: "home / products / blog / quote / samples / contact" },
    { label: "主域名", value: "https://www.zhixinpaper.com" },
    { label: "后台存储", value: "site_settings -> seo.global + seo.sections" },
  ];

  const impactAreas = [
    {
      title: "搜索摘要",
      text: "全站默认值会兜底未单独配置的页面，栏目默认值会覆盖 6 个高价值入口页的默认标题、描述和关键词。",
      icon: Search,
    },
    {
      title: "社媒分享",
      text: "全站分享图负责站点底座，栏目分享图负责重点入口的独立卡片视觉。",
      icon: Share2,
    },
    {
      title: "内容运营",
      text: "博客、产品、样品、报价这些入口页现在都能在后台调整，不需要再改代码才能更新默认 SEO。",
      icon: Layers3,
    },
    {
      title: "站长工具",
      text: "Google 和 Bing 验证值继续由根布局统一输出，保证 Search Console / Webmaster 接入稳定。",
      icon: Shield,
    },
  ];

  return (
    <div className="max-w-7xl space-y-6">
      <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:p-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
              <Search className="h-3.5 w-3.5 text-blue-600" />
              后台 SEO 工作台
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              从全站默认，扩展到栏目默认 SEO 管理
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
              这页已经不再只是填几个字段。现在它同时控制根布局的全站默认元数据，以及首页、产品、
              博客、报价、样品、联系这 6 个入口页的栏目默认 SEO。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                查看前台
                <ExternalLink className="h-4 w-4" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                返回仪表盘
              </Link>
            </div>
          </div>

          <div className="rounded-[24px] bg-slate-950 p-6 text-white">
            <div className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${scoreTone.pill}`}>
              {scoreTone.label}
            </div>
            <div className="mt-5 flex items-end gap-2">
              <div className="text-5xl font-black tracking-tight">{audit.score}</div>
              <div className="pb-1 text-sm text-slate-400">/ 100</div>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">{scoreTone.text}</p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                <span>全站字段完成度</span>
                <span>
                  {audit.completedFields}/{audit.totalFields}
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500"
                  style={{ width: `${(audit.completedFields / audit.totalFields) * 100}%` }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">待处理问题</span>
                <span className="font-semibold text-white">{audit.issues.length} 项</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-slate-400">栏目独立分享图</span>
                <span className="font-semibold text-white">
                  {sectionImageCoverage}/{SEO_SECTION_KEYS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
                  <Icon className="h-4 w-4" />
                </div>
                <span className="text-xs font-medium text-slate-400">{card.detail}</span>
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-500">{card.label}</p>
              <p className="mt-1 text-2xl font-bold tracking-tight text-slate-950">{card.value}</p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
        <SeoEditor initialGlobal={seo} initialSections={seoSections} />

        <aside className="space-y-6">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <TriangleAlert className="h-4 w-4 text-amber-500" />
              <h2 className="text-base font-bold text-slate-950">当前审核重点</h2>
            </div>
            {audit.issues.length === 0 ? (
              <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                当前全站默认 SEO 没有明显阻塞项，可以继续推进页面级优化、博客发布和栏目内容补强。
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {audit.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-950">{issue.title}</p>
                      <span
                        className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                          issue.severity === "critical"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {issue.severity === "critical" ? "阻塞项" : "建议优化"}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{issue.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-950">这页会影响什么</h2>
            </div>
            <div className="mt-4 space-y-4">
              {impactAreas.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-2xl bg-slate-50 p-4">
                    <div className="flex items-center gap-2">
                      <div className="rounded-xl bg-white p-2 text-slate-700 shadow-sm ring-1 ring-slate-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-sm font-semibold text-slate-950">{item.title}</p>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-slate-500" />
              <h2 className="text-base font-bold text-slate-950">元数据链路</h2>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              {metadataFlow.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0"
                >
                  <span className="text-slate-500">{item.label}</span>
                  <span className="max-w-[200px] text-right font-medium text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-2">
              <Shield className="h-4 w-4 text-blue-600" />
              <h2 className="text-base font-bold text-slate-950">管理员安全</h2>
            </div>
            <ChangePasswordForm />
          </div>
        </aside>
      </section>
    </div>
  );
}
