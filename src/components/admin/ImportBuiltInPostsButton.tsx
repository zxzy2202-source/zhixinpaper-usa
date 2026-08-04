"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Download, Loader2 } from "lucide-react";
import { importBuiltInBlogPosts } from "@/app/admin/actions";

interface Props {
  totalBuiltInPosts: number;
}

export default function ImportBuiltInPostsButton({ totalBuiltInPosts }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleImport = () => {
    if (!confirm(`要把 ${totalBuiltInPosts} 篇内置博客文章导入后台数据库吗？若 slug 已存在，将自动跳过。`)) {
      return;
    }

    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const result = await importBuiltInBlogPosts();
        if (result.invalid.length > 0) {
          setError(`已导入 ${result.created.length} 篇，跳过 ${result.skipped.length} 篇，另有 ${result.invalid.length} 篇因校验未通过而被拦截。`);
        } else {
          setMessage(`已导入 ${result.created.length} 篇内置文章，跳过 ${result.skipped.length} 篇已存在文章。`);
        }
        router.refresh();
      } catch (importError) {
        setError(importError instanceof Error ? importError.message : "导入失败。");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleImport}
        disabled={isPending}
        className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        导入内置文章
      </button>
      {message ? <p className="text-xs text-emerald-600">{message}</p> : null}
      {error ? <p className="max-w-sm text-right text-xs text-amber-600">{error}</p> : null}
    </div>
  );
}
