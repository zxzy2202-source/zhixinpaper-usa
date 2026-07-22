import Link from "next/link";
import { FileCheck2, GitCommitHorizontal, History, Plus } from "lucide-react";
import { listOptimizationLogs } from "@/lib/optimizationLog";
import { OPTIMIZATION_CATEGORY_LABELS } from "@/lib/optimizationLogTypes";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Shanghai",
  }).format(new Date(`${value}T00:00:00Z`));
}

export default async function OptimizationLogsPage() {
  const records = await listOptimizationLogs();
  const categoryCount = new Set(records.map((record) => record.category)).size;
  const validatedCount = records.filter((record) => record.validation.length > 0).length;

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">优化记录</h1>
          <p className="mt-1 text-sm text-slate-500">网站优化、影响范围、代码提交和验证结果的持久化记录。</p>
        </div>
        <Link
          href="/admin/optimizations/new"
          className="inline-flex min-h-10 items-center gap-2 bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          新增记录
        </Link>
      </div>

      <div className="mb-6 grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-3">
        {[
          { label: "记录总数", value: records.length, icon: History },
          { label: "优化类别", value: categoryCount, icon: GitCommitHorizontal },
          { label: "含验证结果", value: validatedCount, icon: FileCheck2 },
        ].map((item) => (
          <div key={item.label} className="bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
              <item.icon className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-bold tabular-nums text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>

      {records.length === 0 ? (
        <div className="border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <History className="mx-auto mb-3 h-9 w-9 text-slate-300" />
          <p className="font-semibold text-slate-700">暂无优化记录</p>
          <Link href="/admin/optimizations/new" className="mt-3 inline-block text-sm font-semibold text-blue-600 hover:text-blue-800">
            创建第一条记录
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden border border-slate-200 bg-white md:block">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">日期</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">类别</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">优化事项</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">Commit</th>
                  <th className="px-4 py-3 text-left text-xs font-bold uppercase text-slate-500">验证</th>
                  <th className="px-4 py-3 text-right text-xs font-bold uppercase text-slate-500">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.id} className="transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-4 py-4 text-slate-600">{formatDate(record.date)}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                        {OPTIMIZATION_CATEGORY_LABELS[record.category]}
                      </span>
                    </td>
                    <td className="max-w-md px-4 py-4">
                      <p className="font-semibold text-slate-900">{record.title}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">{record.goal}</p>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-slate-500">{record.commit ? record.commit.slice(0, 8) : "-"}</td>
                    <td className="px-4 py-4 text-slate-600">{record.validation.length} 项</td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/admin/optimizations/${record.id}`} className="font-semibold text-blue-600 hover:text-blue-800">查看</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 bg-white md:hidden">
            {records.map((record) => (
              <Link key={record.id} href={`/admin/optimizations/${record.id}`} className="block p-4 transition-colors hover:bg-slate-50">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="bg-blue-50 px-2 py-1 text-xs font-bold text-blue-700">
                    {OPTIMIZATION_CATEGORY_LABELS[record.category]}
                  </span>
                  <time className="text-xs text-slate-500">{formatDate(record.date)}</time>
                </div>
                <p className="font-semibold text-slate-900">{record.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{record.goal}</p>
                {record.commit && <p className="mt-2 font-mono text-xs text-slate-400">{record.commit.slice(0, 8)}</p>}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
