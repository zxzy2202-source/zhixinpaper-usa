"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Globe2,
  ImageIcon,
  Layers3,
  RefreshCcw,
  Save,
  Search,
  Share2,
  ShieldCheck,
} from "lucide-react";
import {
  auditSeoConfig,
  DEFAULT_SEO,
  DEFAULT_SEO_SECTIONS,
  SEO_SECTION_KEYS,
  SEO_SECTION_META,
  type SeoConfig,
  type SeoSectionKey,
  type SeoSectionSettings,
  SETTING_KEYS,
} from "@/lib/siteSettingsTypes";

type FieldConfig = {
  key: string;
  label: string;
  help: string;
  placeholder: string;
  type?: "text" | "textarea";
  rows?: number;
};

const SEARCH_FIELDS: FieldConfig[] = [
  {
    key: "siteTitle",
    label: "全站默认标题",
    help: "没有单独 metadata.title 的页面，会优先回退到这里。建议带品牌名和核心采购词。",
    placeholder: "Thermal Paper Rolls & Labels Manufacturer | Zhixin Paper",
  },
  {
    key: "siteDescription",
    label: "全站默认描述",
    help: "优先说清楚卖什么、卖给谁，以及采购前需要提供什么信息。建议控制在 120-165 字符。",
    placeholder:
      "Thermal paper rolls and labels for distributors and OEM buyers. Share size, application, destination, and document requirements before quoting.",
    type: "textarea",
    rows: 4,
  },
  {
    key: "keywords",
    label: "全站默认关键词",
    help: "使用英文逗号分隔，聚焦全站最高频的产品词和采购词，不要堆太多。",
    placeholder: "thermal paper rolls, thermal labels, OEM thermal paper, custom labels",
    type: "textarea",
    rows: 3,
  },
];

const SHARE_FIELDS: FieldConfig[] = [
  {
    key: "ogImage",
    label: "全站默认分享图 URL",
    help: "支持站内相对路径或完整图片地址。推荐 1200x630，供 Open Graph 和 Twitter 卡片复用。",
    placeholder: "/images/og-default.jpg",
  },
  {
    key: "twitterHandle",
    label: "Twitter Handle",
    help: "可填 @zhixinpaper 或 zhixinpaper。不运营 X/Twitter 就保持为空。",
    placeholder: "@zhixinpaper",
  },
];

const VERIFICATION_FIELDS: FieldConfig[] = [
  {
    key: "googleSiteVerification",
    label: "Google Site Verification",
    help: "填写 Google Search Console 的验证值，不需要带完整 meta 标签。",
    placeholder: "Sx9F-xxxxxxxxxxxxxxxxxxxx",
  },
  {
    key: "bingSiteVerification",
    label: "Bing Site Verification",
    help: "填写 Bing Webmaster Tools 的验证值，不需要带完整 meta 标签。",
    placeholder: "1234567890ABCDEF",
  },
];

const SECTION_FIELDS: FieldConfig[] = [
  {
    key: "siteTitle",
    label: "栏目默认标题",
    help: "当该栏目首页没有单独配置标题时，优先使用这里的标题。",
    placeholder: "Wholesale Thermal Paper Products",
  },
  {
    key: "siteDescription",
    label: "栏目默认描述",
    help: "描述这个栏目承接的买家需求、产品范围或内容意图。",
    placeholder:
      "Browse wholesale thermal paper rolls and labels by use case, size, compliance files, packing, and RFQ details.",
    type: "textarea",
    rows: 4,
  },
  {
    key: "keywords",
    label: "栏目关键词",
    help: "适合这个栏目首页的主关键词，建议 3-10 个，用英文逗号分隔。",
    placeholder: "thermal paper products, thermal labels wholesale, OEM thermal paper manufacturer",
    type: "textarea",
    rows: 3,
  },
  {
    key: "ogImage",
    label: "栏目分享图 URL",
    help: "留空时会优先使用全站默认分享图；只有该栏目需要独立卡片视觉时再单独设置。",
    placeholder: "/images/og-default.jpg",
  },
];

function getToneClass(tone: "slate" | "emerald" | "amber" | "rose") {
  if (tone === "emerald") return "bg-emerald-100 text-emerald-700";
  if (tone === "amber") return "bg-amber-100 text-amber-700";
  if (tone === "rose") return "bg-rose-100 text-rose-700";
  return "bg-slate-100 text-slate-600";
}

function getFieldStatus(field: string, values: Record<string, string>) {
  const audit = auditSeoConfig({
    ...DEFAULT_SEO,
    siteTitle: values.siteTitle ?? "",
    siteDescription: values.siteDescription ?? "",
    keywords: values.keywords ?? "",
    ogImage: values.ogImage ?? "",
    twitterHandle: values.twitterHandle ?? "",
    googleSiteVerification: values.googleSiteVerification ?? "",
    bingSiteVerification: values.bingSiteVerification ?? "",
  });

  if (field === "siteTitle") {
    if (!values.siteTitle?.trim()) return { label: "待填写", tone: "slate" as const };
    if (audit.titleLength >= 30 && audit.titleLength <= 60) {
      return { label: "长度合适", tone: "emerald" as const };
    }
    return { label: `${audit.titleLength} 字符`, tone: "amber" as const };
  }

  if (field === "siteDescription") {
    if (!values.siteDescription?.trim()) return { label: "待填写", tone: "slate" as const };
    if (audit.descriptionLength >= 120 && audit.descriptionLength <= 165) {
      return { label: "长度合适", tone: "emerald" as const };
    }
    return { label: `${audit.descriptionLength} 字符`, tone: "amber" as const };
  }

  if (field === "keywords") {
    if (!values.keywords?.trim()) return { label: "待填写", tone: "slate" as const };
    if (audit.keywordCount <= 12) {
      return { label: `${audit.keywordCount} 个`, tone: "emerald" as const };
    }
    return { label: `${audit.keywordCount} 个`, tone: "amber" as const };
  }

  if (field === "ogImage") {
    if (audit.ogImageStatus === "missing") return { label: "继承全站", tone: "slate" as const };
    if (audit.ogImageStatus === "invalid") return { label: "地址无效", tone: "rose" as const };
    return {
      label: audit.ogImageStatus === "absolute" ? "远程图片" : "站内图片",
      tone: "emerald" as const,
    };
  }

  if (field === "twitterHandle") {
    if (!values.twitterHandle?.trim()) return { label: "可选", tone: "slate" as const };
    if (audit.twitterStatus === "invalid") return { label: "格式错误", tone: "rose" as const };
    return { label: "格式正确", tone: "emerald" as const };
  }

  if (!values[field]?.trim()) {
    return { label: "未配置", tone: "slate" as const };
  }

  return { label: "已配置", tone: "emerald" as const };
}

function renderField(
  field: FieldConfig,
  values: Record<string, string>,
  setField: (key: string, value: string) => void,
  compact = false,
) {
  const status = getFieldStatus(field.key, values);

  return (
    <div
      key={field.key}
      className={`rounded-2xl border border-slate-200 bg-slate-50/80 ${
        compact ? "p-4" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <label className="text-sm font-semibold text-slate-950">{field.label}</label>
          <p className="mt-1 text-sm leading-6 text-slate-600">{field.help}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${getToneClass(
            status.tone,
          )}`}
        >
          {status.label}
        </span>
      </div>

      {field.type === "textarea" ? (
        <textarea
          value={values[field.key] ?? ""}
          onChange={(event) => setField(field.key, event.target.value)}
          placeholder={field.placeholder}
          rows={field.rows ?? 3}
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
      ) : (
        <input
          type="text"
          value={values[field.key] ?? ""}
          onChange={(event) => setField(field.key, event.target.value)}
          placeholder={field.placeholder}
          className="mt-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        />
      )}
    </div>
  );
}

export default function SeoEditor({
  initialGlobal,
  initialSections,
}: {
  initialGlobal: SeoConfig;
  initialSections: SeoSectionSettings;
}) {
  const [globalSeo, setGlobalSeo] = useState<SeoConfig>(initialGlobal);
  const [sectionSeo, setSectionSeo] = useState<SeoSectionSettings>(initialSections);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const audit = auditSeoConfig(globalSeo);
  const googleTitle =
    globalSeo.siteTitle.trim() || "Zhixin Paper | Thermal Paper Rolls & Labels Manufacturer";
  const googleDescription =
    globalSeo.siteDescription.trim() ||
    "Thermal paper rolls and labels for distributors and OEM buyers. Share size, destination, and document needs before quoting.";
  const shareImage = globalSeo.ogImage.trim() || "/images/og-default.jpg";
  const keywordList = globalSeo.keywords
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const configuredSections = SEO_SECTION_KEYS.filter((key) => {
    const current = sectionSeo[key];
    return current.siteTitle.trim() && current.siteDescription.trim();
  }).length;
  const sectionKeywordCoverage = SEO_SECTION_KEYS.filter(
    (key) => sectionSeo[key].keywords.trim().length > 0,
  ).length;
  const sectionImageCoverage = SEO_SECTION_KEYS.filter(
    (key) => sectionSeo[key].ogImage.trim().length > 0,
  ).length;

  const setGlobalField = (key: string, value: string) => {
    setGlobalSeo((current) => ({ ...current, [key]: value }));
  };

  const setSectionField = (sectionKey: SeoSectionKey, key: string, value: string) => {
    setSectionSeo((current) => ({
      ...current,
      [sectionKey]: {
        ...current[sectionKey],
        [key]: value,
      },
    }));
  };

  async function saveSetting(key: string, data: unknown) {
    const response = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, data }),
    });
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error || "保存失败");
    }
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);

    try {
      await Promise.all([
        saveSetting(SETTING_KEYS.SEO_GLOBAL, globalSeo),
        saveSetting(SETTING_KEYS.SEO_SECTIONS, sectionSeo),
      ]);

      setMsg({
        type: "ok",
        text: "SEO 设置已保存。全站默认和栏目默认都会在前台元数据里生效。",
      });
    } catch (error) {
      setMsg({ type: "err", text: error instanceof Error ? error.message : "保存失败" });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 4500);
    }
  }

  function handleReset() {
    setGlobalSeo(initialGlobal);
    setSectionSeo(initialSections);
    setMsg({ type: "ok", text: "已恢复为当前已保存版本，未提交的改动已撤销。" });
    setTimeout(() => setMsg(null), 3200);
  }

  function handleClear() {
    setGlobalSeo(DEFAULT_SEO);
    setSectionSeo(DEFAULT_SEO_SECTIONS);
    setMsg({
      type: "ok",
      text: "已恢复后台建议默认稿。可继续调整后再保存。",
    });
    setTimeout(() => setMsg(null), 3200);
  }

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-6 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-950">全站默认 + 栏目默认 SEO</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              上半部分管理站点底座，下半部分管理首页、产品、博客、报价、样品、联系这 6
              个高价值入口的默认元数据。页面没有单独写 metadata 时，会优先吃这里的默认值。
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "保存中..." : "保存 SEO 设置"}
          </button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-slate-950 px-4 py-4 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">SEO score</p>
            <p className="mt-2 text-3xl font-black">{audit.score}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">已填写全站字段</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {audit.completedFields}/{audit.totalFields}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">已配置栏目</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {configuredSections}/{SEO_SECTION_KEYS.length}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">栏目独立分享图</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">
              {sectionImageCoverage}/{SEO_SECTION_KEYS.length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 px-6 py-6 xl:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
        <div className="space-y-6">
          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-950">全站搜索摘要底座</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              控制没有单独配置 metadata 的页面默认标题、默认描述和默认关键词。
            </p>
            <div className="mt-4 space-y-4">
              {SEARCH_FIELDS.map((field) =>
                renderField(field, globalSeo as Record<string, string>, setGlobalField),
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Share2 className="h-4 w-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-950">全站社媒分享与品牌账号</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              控制默认分享图和品牌账号，栏目没有单独设置时会继续复用这里的分享图。
            </p>
            <div className="mt-4 space-y-4">
              {SHARE_FIELDS.map((field) =>
                renderField(field, globalSeo as Record<string, string>, setGlobalField),
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-950">站长平台验证</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              这些值会进入根布局的 head，供 Google Search Console 和 Bing Webmaster 使用。
            </p>
            <div className="mt-4 space-y-4">
              {VERIFICATION_FIELDS.map((field) =>
                renderField(field, globalSeo as Record<string, string>, setGlobalField),
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-950">栏目默认 SEO</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              这一层是运营真正可控的栏目默认值。它会优先覆盖对应栏目页的硬编码默认文案，但仍保留页面级精修空间。
            </p>

            <div className="mt-5 grid gap-5 xl:grid-cols-2">
              {SEO_SECTION_KEYS.map((sectionKey) => {
                const meta = SEO_SECTION_META[sectionKey];
                const current = sectionSeo[sectionKey];
                const sectionAudit = auditSeoConfig({
                  ...DEFAULT_SEO,
                  ...current,
                });

                return (
                  <div
                    key={sectionKey}
                    className="rounded-[24px] border border-slate-200 bg-slate-50/70 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold text-slate-950">{meta.label}</h4>
                          <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-500 ring-1 ring-slate-200">
                            {meta.path}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{meta.description}</p>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          sectionAudit.score >= 85
                            ? "bg-emerald-100 text-emerald-700"
                            : sectionAudit.score >= 70
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {sectionAudit.score} 分
                      </span>
                    </div>

                    <div className="mt-4 grid gap-4">
                      {SECTION_FIELDS.map((field) =>
                        renderField(
                          field,
                          current as Record<string, string>,
                          (key, value) => setSectionField(sectionKey, key, value),
                          true,
                        ),
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-5">
          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-950">搜索结果预览</h3>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="truncate text-[13px] text-emerald-700">https://www.zhixinpaper.com</p>
              <p className="mt-1 line-clamp-2 text-lg leading-6 text-blue-700">{googleTitle}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{googleDescription}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-950">分享卡片预览</h3>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex h-32 items-center justify-center bg-[linear-gradient(135deg,#0f172a,#1d4ed8)] px-4 text-center text-sm font-semibold text-white">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-blue-100/80">OG Image</p>
                  <p className="mt-2 break-all text-xs text-blue-50/85">{shareImage}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="line-clamp-2 text-sm font-semibold text-slate-950">{googleTitle}</p>
                <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                  {googleDescription}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-950">当前审核</h3>
            </div>
            <div className="mt-4 space-y-3">
              {audit.issues.length === 0 ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-800">
                  全站默认设置没有明显阻塞项。下一层重点是继续做页面级 metadata 和 hreflang 细化。
                </div>
              ) : (
                audit.issues.slice(0, 4).map((issue) => (
                  <div key={issue.id} className="rounded-2xl border border-slate-200 bg-white p-4">
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
                ))
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-950">栏目覆盖概览</h3>
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  已配置标题与描述
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {configuredSections}/{SEO_SECTION_KEYS.length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  栏目关键词覆盖
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {sectionKeywordCoverage}/{SEO_SECTION_KEYS.length}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  独立分享图覆盖
                </p>
                <p className="mt-2 text-2xl font-bold text-slate-950">
                  {sectionImageCoverage}/{SEO_SECTION_KEYS.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-bold text-slate-950">当前关键词草稿</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {keywordList.length > 0 ? (
                keywordList.slice(0, 12).map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-200"
                  >
                    {keyword}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-500">还没有全站默认关键词，建议先补 3-8 个核心词。</p>
              )}
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-4 lg:px-8">
        <div className="min-h-6 text-sm font-medium">
          {msg && (
            <span className={msg.type === "ok" ? "text-emerald-600" : "text-rose-600"}>
              {msg.text}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleReset}
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <RefreshCcw className="h-4 w-4" />
            恢复已保存版本
          </button>
          <button
            onClick={handleClear}
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-amber-300 hover:text-amber-700"
          >
            恢复建议默认稿
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "保存中..." : "保存 SEO 设置"}
          </button>
        </div>
      </div>
    </section>
  );
}
