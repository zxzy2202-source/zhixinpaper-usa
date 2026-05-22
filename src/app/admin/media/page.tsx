import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import MediaManager from "@/components/admin/MediaManager";

export const metadata = {
  title: "图片管理 — 知新纸业后台",
};

export default async function MediaPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="p-6 max-w-7xl mx-auto h-[calc(100vh-2rem)]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">图片管理</h1>
        <p className="text-gray-500 mt-1">上传、管理网站所用图片，支持按分类筛选</p>
      </div>
      <MediaManager />
    </div>
  );
}
