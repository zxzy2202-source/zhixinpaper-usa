"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Rocket } from "lucide-react";
import { publishDueBlogPostsNow } from "@/app/admin/actions";

export default function PublishDuePostsButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handlePublish() {
    setMessage(null);
    setError(null);

    startTransition(async () => {
      try {
        const result = await publishDueBlogPostsNow();
        setMessage(`已发布 ${result.published.length} 篇到期文章，拦截 ${result.rejected.length} 篇。`);
        router.refresh();
      } catch (caught) {
        setError(caught instanceof Error ? caught.message : "执行发布失败。");
      }
    });
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handlePublish}
        disabled={isPending}
        className="inline-flex items-center gap-2 border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-blue-300 hover:text-blue-700 disabled:opacity-50"
      >
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Rocket className="h-4 w-4" />}
        发布到期文章
      </button>
      {message ? <p className="text-xs text-emerald-600">{message}</p> : null}
      {error ? <p className="max-w-sm text-right text-xs text-amber-600">{error}</p> : null}
    </div>
  );
}
