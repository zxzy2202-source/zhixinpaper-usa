"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Save, Eye, ImageIcon, ArrowRight, Sparkles, RotateCcw } from "lucide-react";
import {
  type HeroConfig,
  DEFAULT_HERO_HOME,
  SETTING_KEYS,
} from "@/lib/siteSettingsTypes";

type Props = {
  initialHero: HeroConfig;
  currentImage: string;
  isCustomImage: boolean;
  recommendedSize?: string;
  filename?: string | null;
};

const FIELDS: Array<{
  key: keyof HeroConfig;
  label: string;
  help?: string;
  type?: "text" | "textarea";
  placeholder?: string;
}> = [
  { key: "badge", label: "顶部小徽章", help: "Hero 最上方那行小字（如认证、行业地位）", placeholder: "ISO 9001 Certified Manufacturer · Est. 2010" },
  { key: "headlineLine1", label: "主标题 - 第 1 行", help: "通常 1-2 个词", placeholder: "One-Stop" },
  { key: "headlineHighlight", label: "主标题 - 高亮词", help: "蓝色渐变高亮（紧跟第 1 行）", placeholder: "Thermal" },
  { key: "headlineLine2", label: "主标题 - 第 2 行", help: "", placeholder: "Consumables" },
  { key: "headlineLine3", label: "主标题 - 第 3 行", help: "浅色辅助词", placeholder: "Platform" },
  { key: "subtitle", label: "副标题", help: "1-2 句话讲清楚&ldquo;给谁卖什么&rdquo;", type: "textarea", placeholder: "Thermal paper rolls & thermal labels for distributors..." },
  { key: "primaryCtaText", label: "主按钮文案", placeholder: "Get a Custom Quote" },
  { key: "primaryCtaHref", label: "主按钮链接", help: "建议站内路径", placeholder: "/quote" },
  { key: "secondaryCtaText", label: "次按钮文案", placeholder: "Request Free Samples" },
  { key: "secondaryCtaHref", label: "次按钮链接", placeholder: "/samples" },
  { key: "tertiaryCtaText", label: "第三按钮文案", placeholder: "Browse Products" },
  { key: "tertiaryCtaHref", label: "第三按钮链接", placeholder: "/products" },
];

export default function HeroEditor({
  initialHero,
  currentImage,
  isCustomImage,
  recommendedSize,
  filename,
}: Props) {
  const [hero, setHero] = useState<HeroConfig>(initialHero);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const setField = (k: keyof HeroConfig, v: string) => setHero((h) => ({ ...h, [k]: v }));

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: SETTING_KEYS.HERO_HOME, data: hero }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "保存失败");
      setMsg({ type: "ok", text: "✓ 保存成功，前台 30 秒内生效" });
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "保存失败" });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 4000);
    }
  }

  function handleResetDefaults() {
    if (!confirm("确认恢复默认文案？您当前的修改将被替换（保存后才会真正生效）。")) return;
    setHero(DEFAULT_HERO_HOME);
  }

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">🎯 首页 Hero</h1>
          <p className="text-slate-500 text-sm mt-2">
            编辑首页第一屏的大图、标题、副标题与 CTA 按钮。客户进站后 3 秒内决定是否继续浏览，这块至关重要。
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-600 bg-white border border-slate-200  hover:border-blue-300 hover:text-blue-600 transition"
          >
            <Eye className="w-4 h-4" /> 预览前台
          </Link>
          <button
            onClick={handleResetDefaults}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-slate-500 bg-white border border-slate-200  hover:border-amber-300 hover:text-amber-600 transition"
          >
            <RotateCcw className="w-4 h-4" /> 恢复默认
          </button>
        </div>
      </div>

      {/* 提示 */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100  p-4 mb-6 text-sm flex gap-3">
        <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="text-slate-700">
          <b className="text-slate-900">写文案小贴士：</b>
          <span className="text-slate-600">
            副标题里加上 <b>目标市场 + 卖点</b>（如 &ldquo;for distributors in Europe, USA &amp; Canada&rdquo;），
            既精准锁定客户又利于 SEO。
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 左：图片卡 */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white border border-slate-200  overflow-hidden">
            <div className="relative aspect-video bg-slate-100">
              {currentImage ? (
                <Image
                  src={currentImage}
                  alt="Hero 当前图"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                isCustomImage ? "bg-blue-600 text-white" : "bg-amber-500 text-white"
              }`}>
                {isCustomImage ? "✓ 已自定义" : "⚠ 默认图"}
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs font-bold text-slate-900 mb-1">Hero 背景图</p>
              <p className="text-xs text-slate-500 mb-3">
                {recommendedSize && <>📐 {recommendedSize}</>}
                {filename && <span className="block text-slate-400 mt-1">{filename}</span>}
              </p>
              <Link
                href="/admin/image-slots#home.hero"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold  transition"
              >
                换图 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 实时预览 */}
          <div className="bg-slate-900  p-5 text-white relative overflow-hidden">
            <p className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wide">实时预览</p>
            <div className="inline-block px-2 py-1 bg-blue-500/15 border border-blue-400/25 rounded-full text-blue-300 text-[10px] font-semibold mb-3">
              {hero.badge || "—"}
            </div>
            <p className="font-extrabold text-2xl leading-tight mb-2">
              {hero.headlineLine1}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-cyan-200">
                {hero.headlineHighlight}
              </span>
              <br />
              {hero.headlineLine2}
              <br />
              <span className="text-blue-200">{hero.headlineLine3}</span>
            </p>
            <p className="text-blue-100/80 text-xs leading-relaxed mb-3 line-clamp-3">{hero.subtitle}</p>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-1 bg-blue-500 text-white text-[10px] font-bold ">{hero.primaryCtaText}</span>
              <span className="px-2 py-1 bg-white/10 text-white text-[10px] font-semibold  border border-white/20">{hero.secondaryCtaText}</span>
              <span className="px-2 py-1 text-blue-300 text-[10px] font-semibold  border border-blue-400/30">{hero.tertiaryCtaText}</span>
            </div>
          </div>
        </div>

        {/* 右：表单 */}
        <div className="lg:col-span-2 bg-white border border-slate-200  p-6">
          <h2 className="font-bold text-slate-900 text-base mb-5">📝 文案编辑</h2>
          <div className="space-y-5">
            {FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block mb-1.5">
                  <span className="text-sm font-semibold text-slate-800">{f.label}</span>
                  {f.help && (
                    <span className="text-xs text-slate-400 ml-2" dangerouslySetInnerHTML={{ __html: f.help }} />
                  )}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    value={hero[f.key]}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                ) : (
                  <input
                    type="text"
                    value={hero[f.key]}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 固定底部保存栏 */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-end gap-3 z-30 shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
        {msg && (
          <span className={`text-sm font-semibold ${msg.type === "ok" ? "text-emerald-600" : "text-rose-600"}`}>
            {msg.text}
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold  text-sm transition shadow-sm"
        >
          <Save className="w-4 h-4" />
          {saving ? "保存中..." : "保存全部"}
        </button>
      </div>
    </div>
  );
}
