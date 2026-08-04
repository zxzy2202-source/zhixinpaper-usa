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
    if (!confirm(`Import ${totalBuiltInPosts} built-in blog posts into the admin database? Existing database posts with the same slug will be skipped.`)) {
      return;
    }

    setMessage("");
    setError("");

    startTransition(async () => {
      try {
        const result = await importBuiltInBlogPosts();
        if (result.invalid.length > 0) {
          setError(`Imported ${result.created.length}, skipped ${result.skipped.length}, and blocked ${result.invalid.length} due to validation errors.`);
        } else {
          setMessage(`Imported ${result.created.length} built-in posts. Skipped ${result.skipped.length} existing posts.`);
        }
        router.refresh();
      } catch (importError) {
        setError(importError instanceof Error ? importError.message : "Import failed.");
      }
    });
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={handleImport}
        disabled={isPending}
        className="inline-flex items-center gap-2 px-4 py-2 border border-slate-200 bg-white hover:border-blue-300 hover:text-blue-700 text-slate-700 font-semibold text-sm transition-colors disabled:opacity-50"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        Import Built-In Posts
      </button>
      {message ? <p className="text-xs text-emerald-600">{message}</p> : null}
      {error ? <p className="max-w-sm text-right text-xs text-amber-600">{error}</p> : null}
    </div>
  );
}
