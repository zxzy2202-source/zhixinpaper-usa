"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { type SeoConfig, SETTING_KEYS } from "@/lib/siteSettingsTypes";

const FIELDS: Array<{
  key: keyof SeoConfig;
  label: string;
  help?: string;
  placeholder?: string;
  type?: "text" | "textarea";
}> = [
  { key: "siteTitle", label: "全站默认标题", help: "未单独配置标题的页面使用", placeholder: "Thermal Paper Manufacturer | ..." },
  { key: "siteDescription", label: "全站默认描述", type: "textarea", placeholder: "ISO 9001 certified manufacturer of..." },
  { key: "keywords", label: "默认关键词", help: "逗号分隔", placeholder: "thermal paper, thermal labels, ..." },
  { key: "ogImage", label: "OG 分享图 URL", help: "Facebook/LinkedIn 分享时显示，1200x630 最佳", placeholder: "https://your-r2.../og.jpg" },
  { key: "twitterHandle", label: "Twitter Handle", help: "带 @", placeholder: "@yourbrand" },
  { key: "googleSiteVerification", label: "Google 站长验证码", help: "GSC → 设置 → 用户与权限 → HTML 标签验证", placeholder: "Sx9F..." },
  { key: "bingSiteVerification", label: "Bing 站长验证码", placeholder: "ABC123..." },
];

export default function SeoEditor({ initial }: { initial: SeoConfig }) {
  const [seo, setSeo] = useState<SeoConfig>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const setField = (k: keyof SeoConfig, v: string) => setSeo((s) => ({ ...s, [k]: v }));

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      const r = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: SETTING_KEYS.SEO_GLOBAL, data: seo }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "保存失败");
      setMsg({ type: "ok", text: "✓ 保存成功，刷新页面后评分会更新" });
    } catch (e) {
      setMsg({ type: "err", text: e instanceof Error ? e.message : "保存失败" });
    } finally {
      setSaving(false);
      setTimeout(() => setMsg(null), 4000);
    }
  }

  return (
    <div className="space-y-4">
      {FIELDS.map((f) => (
        <div key={f.key}>
          <label className="block mb-1.5">
            <span className="text-sm font-semibold text-slate-800">{f.label}</span>
            {f.help && <span className="text-xs text-slate-400 ml-2">{f.help}</span>}
          </label>
          {f.type === "textarea" ? (
            <textarea
              value={seo[f.key]}
              onChange={(e) => setField(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          ) : (
            <input
              type="text"
              value={seo[f.key]}
              onChange={(e) => setField(f.key, e.target.value)}
              placeholder={f.placeholder}
              className="w-full px-3 py-2 border border-slate-200  text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
            />
          )}
        </div>
      ))}

      <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
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
          {saving ? "保存中..." : "保存 SEO 设置"}
        </button>
      </div>
    </div>
  );
}
