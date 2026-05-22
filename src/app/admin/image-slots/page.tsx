"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon, Link2, Unlink, X, Loader2, CheckCircle2 } from "lucide-react";

interface SlotData {
  key: string;
  label: string;
  description: string;
  group: string;
  fallback: string;
  defaultAlt: string;
  recommendedSize?: string;
  binding: null | {
    mediaFileId: number;
    url: string;
    filename: string;
    width: number | null;
    height: number | null;
    updatedAt: string;
  };
}

interface MediaFile {
  id: number;
  url: string;
  originalName: string;
  width: number | null;
  height: number | null;
}

export default function ImageSlotsPage() {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [groupLabels, setGroupLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [pickerOpen, setPickerOpen] = useState<string | null>(null); // slotKey
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/image-slots", { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "加载失败");
      setSlots(j.slots);
      setGroupLabels(j.groupLabels);
    } catch (e) {
      setToast((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function bind(slotKey: string, mediaFileId: number | null) {
    setSavingKey(slotKey);
    try {
      const r = await fetch("/api/admin/image-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotKey, mediaFileId }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "保存失败");
      setToast(mediaFileId === null ? "已解绑" : "绑定成功");
      setPickerOpen(null);
      await load();
    } catch (e) {
      setToast((e as Error).message);
    } finally {
      setSavingKey(null);
      setTimeout(() => setToast(null), 2500);
    }
  }

  // 按 group 分组
  const grouped = slots.reduce<Record<string, SlotData[]>>((acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 加载中…
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-6xl">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">图片槽位</h1>
        <p className="text-sm text-slate-500 mt-1">
          为前台关键位置绑定图片。未绑定时使用 fallback 兜底图，永远不会显示破图。
        </p>
      </header>

      {Object.entries(grouped).map(([groupKey, list]) => (
        <section key={groupKey}>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            {groupLabels[groupKey] ?? groupKey}
            <span className="ml-2 text-slate-400 font-normal normal-case">
              ({list.length} 个槽位)
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((slot) => {
              const isSaving = savingKey === slot.key;
              const hasBinding = slot.binding !== null;
              const displayUrl = slot.binding?.url ?? slot.fallback;
              return (
                <div
                  key={slot.key}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image
                      src={displayUrl}
                      alt={slot.label}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      {hasBinding ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-xs font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> 已绑定
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-medium">
                          fallback
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {slot.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                        {slot.description}
                      </p>
                    </div>

                    <div className="text-xs text-slate-400 font-mono break-all">
                      {slot.key}
                    </div>

                    {slot.recommendedSize && (
                      <p className="text-xs text-slate-400">
                        建议尺寸：{slot.recommendedSize}
                      </p>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setPickerOpen(slot.key)}
                        disabled={isSaving}
                        className="flex-1 px-3 py-2 text-xs font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        <Link2 className="w-3.5 h-3.5" />
                        {hasBinding ? "更换" : "绑定"}
                      </button>
                      {hasBinding && (
                        <button
                          onClick={() => bind(slot.key, null)}
                          disabled={isSaving}
                          title="解绑（恢复 fallback）"
                          className="px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 flex items-center"
                        >
                          {isSaving ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Unlink className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* 媒体选择器弹窗 */}
      {pickerOpen && (
        <MediaPicker
          slotKey={pickerOpen}
          onClose={() => setPickerOpen(null)}
          onPick={(mediaFileId) => bind(pickerOpen, mediaFileId)}
        />
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl text-sm z-50 animate-in fade-in slide-in-from-bottom-4">
          {toast}
        </div>
      )}
    </div>
  );
}

// ── 媒体选择器 ─────────────────────────────────────────────────
function MediaPicker({
  slotKey,
  onClose,
  onPick,
}: {
  slotKey: string;
  onClose: () => void;
  onPick: (mediaFileId: number) => void;
}) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/admin/media?limit=200", { cache: "no-store" });
        const j = await r.json();
        if (r.ok) setFiles(j.items ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900">选择图片</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{slotKey}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-40 text-slate-400">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 加载图片…
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">媒体库还没有图片</p>
              <p className="text-xs mt-1">
                先去
                <a href="/admin/media" className="text-blue-600 hover:underline mx-1">
                  图片管理
                </a>
                上传几张
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onPick(f.id)}
                  className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-600 transition-colors"
                  title={f.originalName}
                >
                  <Image
                    src={f.url}
                    alt={f.originalName}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/20 transition-colors flex items-center justify-center">
                    <span className="px-3 py-1.5 text-xs font-medium bg-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      选择
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-[10px] truncate">
                      {f.originalName}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
