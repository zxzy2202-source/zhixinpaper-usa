"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { OPTIMIZATION_CATEGORIES, OPTIMIZATION_CATEGORY_LABELS } from "@/lib/optimizationLogTypes";

const inputClass = "mt-1.5 min-h-10 w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

function toLines(value: string) {
  return value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
}

export default function OptimizationLogForm({ defaultDate }: { defaultDate: string }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setFields({});
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("title"),
      date: form.get("date"),
      category: form.get("category"),
      goal: form.get("goal"),
      commit: form.get("commit"),
      changes: toLines(String(form.get("changes") || "")),
      affectedRoutes: toLines(String(form.get("affectedRoutes") || "")),
      affectedFiles: toLines(String(form.get("affectedFiles") || "")),
      validation: toLines(String(form.get("validation") || "")),
    };

    try {
      const response = await fetch("/api/admin/optimizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) {
        setFields(result.fields || {});
        throw new Error(result.error || "保存失败");
      }
      router.push(`/admin/optimizations/${result.record.id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-4xl">
      <Link href="/admin/optimizations" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700">
        <ArrowLeft className="h-4 w-4" />
        返回优化记录
      </Link>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">新增优化记录</h1>
        <p className="mt-1 text-sm text-slate-500">记录已完成的改动与验证证据；相同 commit 不会重复写入。</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="border border-slate-200 bg-white p-5">
          <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_180px_160px]">
            <label className="text-sm font-semibold text-slate-700">
              标题
              <input name="title" required maxLength={120} className={inputClass} placeholder="例如：优化美国市场产品页询盘路径" />
              {fields.title && <span className="mt-1 block text-xs text-red-600">{fields.title}</span>}
            </label>
            <label className="text-sm font-semibold text-slate-700">
              日期
              <input name="date" type="date" required defaultValue={defaultDate} className={inputClass} />
              {fields.date && <span className="mt-1 block text-xs text-red-600">{fields.date}</span>}
            </label>
            <label className="text-sm font-semibold text-slate-700">
              类别
              <select name="category" defaultValue="seo" className={inputClass}>
                {OPTIMIZATION_CATEGORIES.map((category) => (
                  <option key={category} value={category}>{OPTIMIZATION_CATEGORY_LABELS[category]}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-5 block text-sm font-semibold text-slate-700">
            问题或目标
            <textarea name="goal" required rows={4} maxLength={1200} className={inputClass} placeholder="说明为什么要做、要解决什么问题。" />
            {fields.goal && <span className="mt-1 block text-xs text-red-600">{fields.goal}</span>}
          </label>
          <label className="mt-5 block text-sm font-semibold text-slate-700">
            Commit
            <input name="commit" maxLength={40} className={`${inputClass} font-mono`} placeholder="Git commit 哈希，可留空" />
            {fields.commit && <span className="mt-1 block text-xs text-red-600">{fields.commit}</span>}
          </label>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <label className="border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700">
            已完成改动
            <textarea name="changes" required rows={8} className={inputClass} placeholder={"每行一项\n重写核心页面元数据\n新增墨西哥市场页"} />
            {fields.changes && <span className="mt-1 block text-xs text-red-600">{fields.changes}</span>}
          </label>
          <label className="border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700">
            验证结果
            <textarea name="validation" required rows={8} className={inputClass} placeholder={"每行一项\n生产构建通过\n93 个 sitemap 页面全部返回 200"} />
            {fields.validation && <span className="mt-1 block text-xs text-red-600">{fields.validation}</span>}
          </label>
          <label className="border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700">
            影响页面
            <textarea name="affectedRoutes" rows={6} className={inputClass} placeholder={"每行一个路由\n/\n/mx\n/products"} />
          </label>
          <label className="border border-slate-200 bg-white p-5 text-sm font-semibold text-slate-700">
            影响文件
            <textarea name="affectedFiles" rows={6} className={`${inputClass} font-mono`} placeholder={"每行一个文件\nsrc/app/mx/page.tsx"} />
          </label>
        </div>

        {error && <p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
        <div className="flex flex-wrap justify-end gap-3">
          <Link href="/admin/optimizations" className="inline-flex min-h-10 items-center border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">取消</Link>
          <button disabled={saving} className="inline-flex min-h-10 items-center gap-2 bg-blue-600 px-5 py-2 text-sm font-bold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            保存记录
          </button>
        </div>
      </form>
    </div>
  );
}
