"use client";

import { useTransition } from "react";
import { deleteBlogPost } from "@/app/admin/actions";
import { Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  title: string;
}

export default function DeleteBlogButton({ id, title }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (!confirm(`确定要删除《${title}》吗？此操作不可撤销。`)) return;
    startTransition(async () => {
      await deleteBlogPost(id);
      router.refresh();
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-lg text-xs transition-colors disabled:opacity-50"
    >
      {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
      删除
    </button>
  );
}
