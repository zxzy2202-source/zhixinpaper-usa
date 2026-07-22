import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, FileCode2, GitCommitHorizontal, Route } from "lucide-react";
import { getOptimizationLog } from "@/lib/optimizationLog";
import { OPTIMIZATION_CATEGORY_LABELS } from "@/lib/optimizationLogTypes";

export const dynamic = "force-dynamic";

function DetailList({ items, empty = "未记录" }: { items: string[]; empty?: string }) {
  if (!items.length) return <p className="text-sm text-slate-400">{empty}</p>;
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function OptimizationLogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const record = await getOptimizationLog(Number(id));
  if (!record) notFound();

  return (
    <div className="max-w-5xl">
      <Link href="/admin/optimizations" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-700">
        <ArrowLeft className="h-4 w-4" />
        返回优化记录
      </Link>

      <div className="mb-6 border-b border-slate-200 pb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
            {OPTIMIZATION_CATEGORY_LABELS[record.category]}
          </span>
          <time className="text-sm text-slate-500">{record.date}</time>
          <span className="text-xs text-slate-400">#{record.id}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{record.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{record.goal}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,0.8fr)]">
        <div className="space-y-5">
          <section className="border border-slate-200 bg-white p-5">
            <h2 className="mb-4 font-bold text-slate-900">已完成改动</h2>
            <DetailList items={record.changes} />
          </section>
          <section className="border border-slate-200 bg-white p-5">
            <h2 className="mb-4 font-bold text-slate-900">验证结果</h2>
            <DetailList items={record.validation} />
          </section>
        </div>

        <div className="space-y-5">
          <section className="border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <GitCommitHorizontal className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-slate-900">代码提交</h2>
            </div>
            <p className="break-all font-mono text-xs leading-5 text-slate-600">{record.commit || "未关联 commit"}</p>
          </section>
          <section className="border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <Route className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-slate-900">影响页面</h2>
            </div>
            <DetailList items={record.affectedRoutes} empty="未单独记录页面" />
          </section>
          <section className="border border-slate-200 bg-white p-5">
            <div className="mb-3 flex items-center gap-2">
              <FileCode2 className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-slate-900">影响文件</h2>
            </div>
            <div className="space-y-2">
              {record.affectedFiles.length ? record.affectedFiles.map((file) => (
                <p key={file} className="break-all font-mono text-xs leading-5 text-slate-600">{file}</p>
              )) : <p className="text-sm text-slate-400">未单独记录文件</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
