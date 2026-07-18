"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveProductOverride } from "@/app/admin/actions";
import { ArrowLeft, Save, Loader2, CheckCircle2, RotateCcw } from "lucide-react";
import Link from "next/link";

interface Props {
  slug: string;
  productType: "roll" | "label";
  baseProduct: {
    name: string;
    subtitle: string;
    heroDesc: string;
    description: string;
    features: string[];
    moq: string;
    specifications: Record<string, string | undefined>;
    [key: string]: unknown;
  };
  override: {
    name?: string | null;
    subtitle?: string | null;
    heroDesc?: string | null;
    description?: string | null;
    features?: string | null;
    specifications?: string | null;
    moq?: string | null;
  } | null;
}

export default function ProductEditor({ slug, productType, baseProduct, override }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: override?.name || baseProduct.name,
    subtitle: override?.subtitle || baseProduct.subtitle,
    heroDesc: override?.heroDesc || baseProduct.heroDesc,
    description: override?.description || baseProduct.description,
    features: override?.features
      ? JSON.parse(override.features).join("\n")
      : baseProduct.features.join("\n"),
    moq: override?.moq || baseProduct.moq,
    specifications: override?.specifications
      ? JSON.stringify(JSON.parse(override.specifications), null, 2)
      : JSON.stringify(baseProduct.specifications, null, 2),
  });

  const handleReset = (field: keyof typeof form) => {
    const defaults: Record<string, string> = {
      name: baseProduct.name,
      subtitle: baseProduct.subtitle,
      heroDesc: baseProduct.heroDesc,
      description: baseProduct.description,
      features: baseProduct.features.join("\n"),
      moq: baseProduct.moq,
      specifications: JSON.stringify(baseProduct.specifications, null, 2),
    };
    setForm((prev) => ({ ...prev, [field]: defaults[field] }));
  };

  const handleSave = () => {
    startTransition(async () => {
      let featuresArr: string[] = [];
      try {
        featuresArr = form.features.split("\n").map((f: string) => f.trim()).filter(Boolean);
      } catch {}

      let specsObj: Record<string, string> = {};
      try {
        specsObj = JSON.parse(form.specifications);
      } catch {}

      await saveProductOverride({
        slug,
        productType,
        name: form.name,
        subtitle: form.subtitle,
        heroDesc: form.heroDesc,
        description: form.description,
        features: JSON.stringify(featuresArr),
        specifications: JSON.stringify(specsObj),
        moq: form.moq,
      });

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        router.push("/admin/products");
      }, 1500);
    });
  };

  const Field = ({
    label,
    field,
    multiline = false,
    rows = 3,
    mono = false,
  }: {
    label: string;
    field: keyof typeof form;
    multiline?: boolean;
    rows?: number;
    mono?: boolean;
  }) => (
    <div className="bg-white border border-slate-200  p-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</label>
        <button
          type="button"
          onClick={() => handleReset(field)}
          className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          恢复默认
        </button>
      </div>
      {multiline ? (
        <textarea
          value={form[field]}
          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
          rows={rows}
          className={`w-full text-sm text-slate-700 border-none outline-none resize-y bg-transparent leading-relaxed ${mono ? "font-mono" : ""}`}
        />
      ) : (
        <input
          type="text"
          value={form[field]}
          onChange={(e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))}
          className="w-full text-sm text-slate-700 border-none outline-none bg-transparent"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/products" className="text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">编辑产品</h1>
            <p className="text-slate-500 text-sm mt-0.5">{slug} · {productType}</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  text-sm transition-colors shadow-sm disabled:opacity-50"
        >
          {saved ? (
            <><CheckCircle2 className="w-4 h-4" /> 已保存！</>
          ) : isPending ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> 保存中...</>
          ) : (
            <><Save className="w-4 h-4" /> 保存更改</>
          )}
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200  px-4 py-3 mb-5 text-xs text-blue-700">
        此处的修改将覆盖产品默认内容。点击"恢复默认"可撤销单个字段的修改。
      </div>

      <div className="space-y-4">
        <Field label="产品名称" field="name" />
        <Field label="副标题" field="subtitle" />
        <Field label="首屏描述" field="heroDesc" multiline rows={3} />
        <Field label="完整描述" field="description" multiline rows={6} />
        <div className="bg-white border border-slate-200  p-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400">产品特性（每行一条）</label>
            <button
              type="button"
              onClick={() => handleReset("features")}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              恢复默认
            </button>
          </div>
          <textarea
            value={form.features}
            onChange={(e) => setForm((prev) => ({ ...prev, features: e.target.value }))}
            rows={6}
            placeholder="每行输入一条特性..."
            className="w-full text-sm text-slate-700 border-none outline-none resize-y bg-transparent leading-relaxed"
          />
        </div>
        <Field label="最小起订量 (MOQ)" field="moq" />
        <div className="bg-white border border-slate-200  p-5">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-400">规格参数（JSON 格式）</label>
            <button
              type="button"
              onClick={() => handleReset("specifications")}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              恢复默认
            </button>
          </div>
          <textarea
            value={form.specifications}
            onChange={(e) => setForm((prev) => ({ ...prev, specifications: e.target.value }))}
            rows={12}
            className="w-full text-sm text-slate-700 border-none outline-none resize-y bg-transparent font-mono leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
