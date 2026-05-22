"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ImageIcon, Upload, RotateCcw, X, Loader2, CheckCircle2,
  AlertCircle, FolderOpen, ExternalLink,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────
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

interface UploadDialogState {
  slot: SlotData;
  rawFile: File;
  previewUrl: string;
  width: number;
  height: number;
  originalSize: number;
  alt: string;
  warning: string | null;
}

type FilterMode = "all" | "bound" | "unbound";

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────
function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function parseRecommendedAspect(rec?: string): number | null {
  if (!rec) return null;
  const m = rec.match(/(\d+)\s*[×x]\s*(\d+)/);
  if (!m) return null;
  return parseInt(m[1]) / parseInt(m[2]);
}

async function readImageMeta(file: File): Promise<{ width: number; height: number; url: string }> {
  const url = URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight, url });
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("图片解析失败")); };
    img.src = url;
  });
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export default function ImageSlotsPage() {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [groupLabels, setGroupLabels] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [successKey, setSuccessKey] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [filter, setFilter] = useState<FilterMode>("all");

  const [dialog, setDialog] = useState<UploadDialogState | null>(null);
  const [picker, setPicker] = useState<SlotData | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  async function load() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/image-slots", { cache: "no-store" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "加载失败");
      setSlots(j.slots);
      setGroupLabels(j.groupLabels);
    } catch (e) {
      flash((e as Error).message, "err");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function flash(msg: string, type: "ok" | "err" = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  // ─────── 一键上传流程 ───────
  async function handlePickFile(slot: SlotData, file: File) {
    try {
      const meta = await readImageMeta(file);
      const targetRatio = parseRecommendedAspect(slot.recommendedSize);
      let warning: string | null = null;
      if (targetRatio) {
        const actual = meta.width / meta.height;
        const diff = Math.abs(actual - targetRatio) / targetRatio;
        if (diff > 0.15) {
          warning = `图片比例 ${meta.width}×${meta.height} 与推荐 ${slot.recommendedSize} 偏差 ${(diff * 100).toFixed(0)}%，前台显示可能有裁切。`;
        }
      }
      setDialog({
        slot,
        rawFile: file,
        previewUrl: meta.url,
        width: meta.width,
        height: meta.height,
        originalSize: file.size,
        alt: slot.defaultAlt || file.name.replace(/\.[^.]+$/, ""),
        warning,
      });
    } catch (e) {
      flash((e as Error).message, "err");
    }
  }

  async function handleConfirmUpload() {
    if (!dialog) return;
    const slot = dialog.slot;
    setSavingKey(slot.key);
    try {
      // 1. 上传到媒体库
      const fd = new FormData();
      fd.append("file", dialog.rawFile);
      fd.append("alt", dialog.alt);
      const upRes = await fetch("/api/admin/media", { method: "POST", body: fd });
      const upJson = await upRes.json();
      if (!upRes.ok) throw new Error(upJson.error || "上传失败");

      // 2. 自动绑定到槽位
      const bindRes = await fetch("/api/admin/image-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotKey: slot.key, mediaFileId: upJson.file.id }),
      });
      const bindJson = await bindRes.json();
      if (!bindRes.ok) throw new Error(bindJson.error || "绑定失败");

      // 3. 完成
      URL.revokeObjectURL(dialog.previewUrl);
      setDialog(null);
      flash("已更新", "ok");
      setSuccessKey(slot.key);
      setTimeout(() => setSuccessKey(null), 2500);
      await load();
    } catch (e) {
      flash((e as Error).message, "err");
    } finally {
      setSavingKey(null);
    }
  }

  function handleCancelDialog() {
    if (dialog) URL.revokeObjectURL(dialog.previewUrl);
    setDialog(null);
  }

  async function bindExisting(slotKey: string, mediaFileId: number) {
    setSavingKey(slotKey);
    try {
      const r = await fetch("/api/admin/image-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotKey, mediaFileId }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "绑定失败");
      flash("已绑定", "ok");
      setSuccessKey(slotKey);
      setTimeout(() => setSuccessKey(null), 2500);
      setPicker(null);
      await load();
    } catch (e) {
      flash((e as Error).message, "err");
    } finally {
      setSavingKey(null);
    }
  }

  async function handleUnbind(slotKey: string) {
    if (!confirm("确定要解绑吗？前台将恢复为内置占位图。")) return;
    setSavingKey(slotKey);
    try {
      const r = await fetch("/api/admin/image-slots", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotKey, mediaFileId: null }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "解绑失败");
      flash("已解绑", "ok");
      await load();
    } catch (e) {
      flash((e as Error).message, "err");
    } finally {
      setSavingKey(null);
    }
  }

  // 按 group 分组 + 过滤
  const filteredSlots = slots.filter((s) => {
    if (filter === "bound") return !!s.binding;
    if (filter === "unbound") return !s.binding;
    return true;
  });
  const grouped = filteredSlots.reduce<Record<string, SlotData[]>>((acc, s) => {
    (acc[s.group] ||= []).push(s);
    return acc;
  }, {});

  const boundCount = slots.filter((s) => !!s.binding).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400">
        <Loader2 className="w-5 h-5 mr-2 animate-spin" /> 加载中…
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* ── Header ── */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">📸 图片管理</h1>
        <p className="text-slate-500 mt-1">
          全站共 <b className="text-slate-900">{slots.length}</b> 个图片位，已自定义{" "}
          <b className="text-blue-600">{boundCount}</b> 个。点「换图」直接上传新图，自动替换。
        </p>
      </div>

      {/* ── Filter + Library 入口 ── */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {[
          { key: "all", label: `全部 (${slots.length})` },
          { key: "bound", label: `已自定义 (${boundCount})` },
          { key: "unbound", label: `使用默认 (${slots.length - boundCount})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key as FilterMode)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              filter === f.key
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-700 hover:border-slate-400"
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="flex-1" />
        <Link
          href="/admin/media"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-700 hover:border-slate-400 flex items-center gap-1.5"
        >
          <FolderOpen className="w-4 h-4" /> 完整媒体库
        </Link>
      </div>

      {/* ── 分组列表 ── */}
      {Object.entries(grouped).map(([groupKey, list]) => (
        <section key={groupKey} className="mb-8">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 px-1">
            {groupLabels[groupKey] ?? groupKey}（{list.length}）
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {list.map((slot) => {
              const isCustom = !!slot.binding;
              const isSaving = savingKey === slot.key;
              const isSuccess = successKey === slot.key;
              const displayUrl = slot.binding?.url ?? slot.fallback;

              return (
                <div
                  key={slot.key}
                  className={`bg-white rounded-xl border-2 transition overflow-hidden ${
                    isCustom ? "border-blue-200" : "border-slate-200"
                  } ${isSuccess ? "ring-2 ring-emerald-400" : ""}`}
                >
                  {/* 缩略图 */}
                  <div className="relative aspect-video bg-slate-100">
                    {displayUrl ? (
                      <Image
                        src={displayUrl}
                        alt={slot.label}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full text-slate-400 text-xs">
                        无图
                      </div>
                    )}
                    {isCustom && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium bg-blue-600 text-white">
                        已自定义
                      </div>
                    )}
                    {!isCustom && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium bg-amber-500 text-white">
                        默认图
                      </div>
                    )}
                    {isSaving && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                        <Loader2 className="animate-spin" size={28} />
                      </div>
                    )}
                    {isSuccess && (
                      <div className="absolute inset-0 bg-emerald-500/80 flex items-center justify-center text-white font-semibold">
                        <CheckCircle2 size={28} className="mr-1" /> 已更新
                      </div>
                    )}
                  </div>

                  {/* 信息 */}
                  <div className="p-4">
                    <div className="font-medium text-slate-900 text-sm">{slot.label}</div>
                    <div className="text-xs text-slate-500 mt-1 line-clamp-2">{slot.description}</div>
                    <div className="text-xs text-slate-400 mt-2 flex flex-wrap items-center gap-2">
                      {slot.recommendedSize && <span>📐 {slot.recommendedSize}</span>}
                      <code className="text-slate-400">{slot.key}</code>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-2 mt-3">
                      <input
                        ref={(el) => { fileInputs.current[slot.key] = el; }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) handlePickFile(slot, f);
                          e.target.value = "";
                        }}
                      />
                      <button
                        onClick={() => fileInputs.current[slot.key]?.click()}
                        disabled={isSaving}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
                      >
                        <Upload size={14} /> 换图
                      </button>
                      <button
                        onClick={() => setPicker(slot)}
                        disabled={isSaving}
                        title="从媒体库选已有图"
                        className="p-2 border border-slate-200 hover:bg-slate-50 rounded-lg text-slate-600 disabled:opacity-50"
                      >
                        <FolderOpen size={14} />
                      </button>
                      {isCustom && (
                        <button
                          onClick={() => handleUnbind(slot.key)}
                          disabled={isSaving}
                          title="恢复默认图"
                          className="p-2 border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 rounded-lg text-slate-600 disabled:opacity-50"
                        >
                          <RotateCcw size={14} />
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

      {/* ── 上传确认弹框 ── */}
      {dialog && (
        <UploadDialog
          state={dialog}
          isUploading={savingKey === dialog.slot.key}
          onAltChange={(alt) => setDialog({ ...dialog, alt })}
          onCancel={handleCancelDialog}
          onConfirm={handleConfirmUpload}
        />
      )}

      {/* ── 媒体库选图弹框 ── */}
      {picker && (
        <MediaPicker
          slot={picker}
          onClose={() => setPicker(null)}
          onPick={(mediaFileId) => bindExisting(picker.key, mediaFileId)}
        />
      )}

      {/* ── Toast ── */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl shadow-2xl text-sm z-50 flex items-center gap-2 ${
            toast.type === "ok" ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.type === "ok" ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Upload Dialog
// ─────────────────────────────────────────────────────────────
function UploadDialog({
  state, isUploading, onAltChange, onCancel, onConfirm,
}: {
  state: UploadDialogState;
  isUploading: boolean;
  onAltChange: (v: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="font-semibold text-slate-900">上传到「{state.slot.label}」</h3>
            <p className="text-xs text-slate-500 mt-1">
              <code className="text-slate-400">{state.slot.key}</code>
            </p>
          </div>
          <button onClick={onCancel} className="text-slate-400 hover:text-slate-600 p-1">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* 预览 */}
          <div className="bg-slate-100 rounded-lg overflow-hidden">
            {/* 这里用原生 <img> 是因为 blob: URL Next/Image 不认 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={state.previewUrl} alt="preview" className="w-full max-h-80 object-contain" />
          </div>

          {/* 元信息 */}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="bg-slate-50 rounded p-2">
              <div className="text-slate-400">尺寸</div>
              <div className="font-mono text-slate-700 mt-0.5">{state.width}×{state.height}</div>
            </div>
            <div className="bg-slate-50 rounded p-2">
              <div className="text-slate-400">原始大小</div>
              <div className="font-mono text-slate-700 mt-0.5">{formatBytes(state.originalSize)}</div>
            </div>
            <div className="bg-emerald-50 rounded p-2">
              <div className="text-emerald-600">推荐</div>
              <div className="font-mono text-emerald-700 mt-0.5">{state.slot.recommendedSize || "无限制"}</div>
            </div>
          </div>

          {/* 比例警告 */}
          {state.warning && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">比例不匹配</div>
                <div className="text-xs mt-0.5">{state.warning}</div>
              </div>
            </div>
          )}

          {/* Alt 输入 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              图片描述 (alt) <span className="text-slate-400 font-normal">— 用于 SEO 和无障碍</span>
            </label>
            <input
              type="text"
              value={state.alt}
              onChange={(e) => onAltChange(e.target.value)}
              placeholder="如：zhixin-factory-aerial-view"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-slate-400 mt-1">
              上传后服务端会自动压缩、生成缩略图（WebP）并存入媒体库。
            </p>
          </div>
        </div>

        <div className="flex gap-2 px-6 py-4 border-t border-slate-100 bg-slate-50">
          <button
            onClick={onCancel}
            disabled={isUploading}
            className="flex-1 py-2 px-4 border border-slate-200 hover:bg-white text-slate-700 text-sm font-medium rounded-lg transition"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            disabled={isUploading}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            {isUploading ? (
              <><Loader2 className="animate-spin" size={14} /> 上传中</>
            ) : (
              <><Upload size={14} /> 确认上传</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Media Library Picker (复用旧图)
// ─────────────────────────────────────────────────────────────
function MediaPicker({
  slot, onClose, onPick,
}: {
  slot: SlotData;
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
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <div>
            <h3 className="font-bold text-slate-900">从媒体库选图 → 绑定到「{slot.label}」</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">{slot.key}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1">
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
              <p className="text-xs mt-1">关闭此窗口，直接点「换图」上传第一张吧</p>
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
                    <p className="text-white text-[10px] truncate">{f.originalName}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>共 {files.length} 张</span>
          <Link href="/admin/media" target="_blank" className="text-blue-600 hover:underline flex items-center gap-1">
            完整管理 <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
