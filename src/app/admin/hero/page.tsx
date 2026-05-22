import { db } from "@/lib/db";
import { imageSlots, mediaFiles } from "@/lib/db/schema";
import { eq, inArray } from "drizzle-orm";
import { SLOT_REGISTRY, type SlotKey } from "@/lib/imageSlots";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ExternalLink, Edit3 } from "lucide-react";

export const dynamic = "force-dynamic";

const HERO_SLOT_KEYS: SlotKey[] = [
  "home.hero",
  "geo.us.hero",
  "geo.ca.hero",
  "geo.eu.hero",
];

const PAGE_LABEL: Record<string, { label: string; previewHref: string; emoji: string }> = {
  "home.hero": { label: "首页 Hero", previewHref: "/", emoji: "🏠" },
  "geo.us.hero": { label: "美国市场 Hero", previewHref: "/us", emoji: "🇺🇸" },
  "geo.ca.hero": { label: "加拿大市场 Hero", previewHref: "/ca", emoji: "🇨🇦" },
  "geo.eu.hero": { label: "欧洲市场 Hero", previewHref: "/eu", emoji: "🇪🇺" },
};

export default async function HeroAdminPage() {
  // 取这几个槽位的当前绑定
  const bindings = await db
    .select({
      slotKey: imageSlots.slotKey,
      mediaFileId: imageSlots.mediaFileId,
      url: mediaFiles.url,
      filename: mediaFiles.originalName,
      width: mediaFiles.width,
      height: mediaFiles.height,
      updatedAt: imageSlots.updatedAt,
    })
    .from(imageSlots)
    .leftJoin(mediaFiles, eq(imageSlots.mediaFileId, mediaFiles.id))
    .where(inArray(imageSlots.slotKey, HERO_SLOT_KEYS as unknown as string[]));

  const bindMap = new Map(bindings.map((b) => [b.slotKey, b]));

  // 组装 hero 槽位 + 元数据
  const heroSlots = HERO_SLOT_KEYS.map((key) => {
    const def = SLOT_REGISTRY.find((s) => s.key === key);
    const binding = bindMap.get(key);
    const meta = PAGE_LABEL[key];
    return {
      key,
      label: meta.label,
      emoji: meta.emoji,
      previewHref: meta.previewHref,
      recommendedSize: def?.recommendedSize,
      description: def?.description ?? "",
      fallback: def?.fallback ?? "",
      currentUrl: binding?.url ?? def?.fallback ?? "",
      isCustom: !!binding?.mediaFileId,
      filename: binding?.filename,
    };
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">🎯 首页 Hero</h1>
        <p className="text-slate-500 text-sm mt-2">
          首屏 Hero 是网站的&ldquo;门面&rdquo;——客户进站 3 秒内决定是否继续浏览。
          这里集中管理首页和 3 个地区市场的 Hero 大图。
        </p>
      </div>

      {/* 小贴士 */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl p-4 mb-6 text-sm text-slate-700">
        <p className="font-semibold text-slate-900 mb-1">💡 选图建议</p>
        <ul className="text-slate-600 space-y-0.5 text-xs leading-relaxed">
          <li>• <b>真实工厂照片</b> 比 AI 图更有说服力（车间、产线、堆叠成品都行）</li>
          <li>• 推荐尺寸 <b>1920×1080</b> 或更高，横屏 16:9</li>
          <li>• 避免文字过多的图片（前台会叠加标题文案）</li>
          <li>• 上传后会被自动压缩成 WebP，无需手动处理</li>
        </ul>
      </div>

      {/* Hero 卡片列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {heroSlots.map((slot) => (
          <div
            key={slot.key}
            className={`bg-white border-2 rounded-2xl overflow-hidden transition ${
              slot.isCustom ? "border-blue-200" : "border-slate-200"
            }`}
          >
            {/* 大预览图 */}
            <div className="relative aspect-video bg-slate-100">
              {slot.currentUrl ? (
                <Image
                  src={slot.currentUrl}
                  alt={slot.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm">
                  无图
                </div>
              )}
              <div
                className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold ${
                  slot.isCustom
                    ? "bg-blue-600 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                {slot.isCustom ? "✓ 已自定义" : "⚠ 使用默认图"}
              </div>
            </div>

            {/* 信息 + 操作 */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <span>{slot.emoji}</span>
                    {slot.label}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {slot.recommendedSize && <span>📐 {slot.recommendedSize}</span>}
                    {slot.filename && <span className="ml-2 text-slate-400">· {slot.filename}</span>}
                  </p>
                </div>
                <Link
                  href={slot.previewHref}
                  target="_blank"
                  className="text-xs text-slate-400 hover:text-blue-600 flex items-center gap-1 mt-1"
                  title="查看前台效果"
                >
                  预览 <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4">{slot.description}</p>

              <Link
                href={`/admin/image-slots#${encodeURIComponent(slot.key)}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition"
              >
                <Edit3 className="w-4 h-4" />
                换图
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 底部说明 */}
      <div className="mt-8 bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-sm text-slate-600">
          <b className="text-slate-900">需要修改 Hero 文案？</b>{" "}
          目前文案保存在代码中。如需修改主标题、副标题、CTA 按钮文字，
          请告知具体内容，我会帮您改好（后续会做成可视化编辑）。
        </p>
      </div>
    </div>
  );
}
