"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Upload, Grid3X3, List, Search, Trash2, Copy, Check,
  X, Plus, Edit2, Tag, FolderOpen, Image as ImageIcon,
  Settings2, AlertCircle, Loader2, ChevronDown, MoreHorizontal,
  ZoomIn, Link2, Pencil, RefreshCw, Filter, FileImage, Sparkles,
  Zap
} from "lucide-react";
import { compressImage, renameForMime } from "@/lib/imageCompress";

// ── 类型定义 ──────────────────────────────────────────────────────────────────
interface MediaFile {
  id: number;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  url: string;
  alt: string | null;
  categoryId?: number | null;
  createdAt: string;
}

interface MediaCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  sortOrder: number;
  imageCount: number;
}

interface UploadItem {
  file: File;
  preview: string;
  status: "pending" | "compressing" | "uploading" | "success" | "error";
  progress: number;
  error?: string;
  /** 服务端 sharp 压缩结果 */
  compression?: { originalSize: number; compressedSize: number; savedPercent: number };
  /** 浏览器端预压缩结果（上传前） */
  clientCompression?: { originalSize: number; compressedSize: number; savedPercent: number; skipped: boolean; skipReason?: string };
}

// ── 工具函数 ──────────────────────────────────────────────────────────────────
const COLOR_PRESETS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
  "#ec4899", "#06b6d4", "#84cc16", "#f97316", "#6366f1",
];

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
  });
}

// ── 分类管理弹窗 ──────────────────────────────────────────────────────────────
function CategoryModal({
  categories,
  onClose,
  onRefresh,
}: {
  categories: MediaCategory[];
  onClose: () => void;
  onRefresh: () => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "", slug: "", description: "", color: "#6366f1" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const resetForm = () => { setForm({ name: "", slug: "", description: "", color: "#6366f1" }); setError(""); };

  const startCreate = () => { resetForm(); setEditingId(null); setCreating(true); };
  const startEdit = (cat: MediaCategory) => {
    setForm({ name: cat.name, slug: cat.slug, description: cat.description || "", color: cat.color });
    setEditingId(cat.id); setCreating(false);
  };
  const cancelEdit = () => { setEditingId(null); setCreating(false); resetForm(); };

  const handleSave = async () => {
    if (!form.name.trim()) { setError("分类名称不能为空"); return; }
    if (!form.slug.trim()) { setError("标识符不能为空"); return; }
    setSaving(true); setError("");
    try {
      const url = creating ? "/api/admin/media-categories" : `/api/admin/media-categories/${editingId}`;
      const method = creating ? "POST" : "PATCH";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || "操作失败"); }
      cancelEdit(); onRefresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "操作失败");
    } finally { setSaving(false); }
  };

  const handleDelete = async (cat: MediaCategory) => {
    if (!confirm(`确定删除分类「${cat.name}」？\n该分类下 ${cat.imageCount} 张图片将变为未分类。`)) return;
    await fetch(`/api/admin/media-categories/${cat.id}`, { method: "DELETE" });
    onRefresh();
  };

  const FormBlock = ({ isNew }: { isNew: boolean }) => (
    <div className={`rounded-xl p-4 space-y-3 border-2 ${isNew ? "border-emerald-300 bg-emerald-50" : "border-blue-300 bg-blue-50"}`}>
      {isNew && <p className="text-sm font-semibold text-emerald-700">新建分类</p>}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">分类名称 *</label>
          <input value={form.name} onChange={(e) => {
            const name = e.target.value;
            if (isNew) {
              const slug = name.toLowerCase().replace(/[\u4e00-\u9fa5]/g, "").replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "category";
              setForm({ ...form, name, slug });
            } else setForm({ ...form, name });
          }} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="如：产品图片" autoFocus={isNew} />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">标识符 *</label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="如：products" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-1">描述（可选）</label>
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="分类描述" />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-600 mb-2">颜色标签</label>
        <div className="flex gap-2 flex-wrap">
          {COLOR_PRESETS.map((c) => (
            <button key={c} onClick={() => setForm({ ...form, color: c })}
              className={`w-6 h-6 rounded-full border-2 transition-all ${form.color === c ? "border-slate-800 scale-125 shadow-md" : "border-white shadow-sm hover:scale-110"}`}
              style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      <div className="flex gap-2 justify-end pt-1">
        <button onClick={cancelEdit} className="px-3 py-1.5 text-sm text-slate-600 hover:bg-white/60 rounded-lg transition-colors">取消</button>
        <button onClick={handleSave} disabled={saving}
          className={`px-4 py-1.5 text-sm text-white rounded-lg disabled:opacity-50 flex items-center gap-1.5 transition-colors ${isNew ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700"}`}>
          {saving && <Loader2 className="w-3 h-3 animate-spin" />}
          {isNew ? "创建分类" : "保存修改"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
              <Tag className="w-4 h-4 text-blue-600" />
            </div>
            管理图片分类
          </h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {categories.length === 0 && !creating && (
            <div className="text-center py-8 text-slate-400">
              <Tag className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">暂无分类，点击下方按钮创建</p>
            </div>
          )}
          {categories.map((cat) => (
            <div key={cat.id}>
              {editingId === cat.id ? <FormBlock isNew={false} /> : (
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 group transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color + "20" }}>
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate">{cat.name}</p>
                    <p className="text-xs text-slate-400">{cat.slug} · {cat.imageCount} 张图片</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => startEdit(cat)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(cat)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {creating && <FormBlock isNew={true} />}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
          <button onClick={startCreate} disabled={creating || editingId !== null}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-900 text-white rounded-xl hover:bg-slate-700 disabled:opacity-40 transition-colors">
            <Plus className="w-4 h-4" />新建分类
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">完成</button>
        </div>
      </div>
    </div>
  );
}

// ── 图片详情弹窗 ──────────────────────────────────────────────────────────────
function ImageDetailModal({
  file,
  categories,
  onClose,
  onDelete,
  onUpdate,
}: {
  file: MediaFile;
  categories: MediaCategory[];
  onClose: () => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, data: { alt?: string; categoryId?: number | null }) => Promise<void>;
}) {
  const [alt, setAlt] = useState(file.alt || "");
  const [categoryId, setCategoryId] = useState<number | null>(file.categoryId ?? null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(file.url.startsWith("http") ? file.url : window.location.origin + file.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    setSaving(true);
    await onUpdate(file.id, { alt, categoryId });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentCategory = categories.find((c) => c.id === categoryId);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-[480px]">
          {/* 左侧：图片预览 */}
          <div className="w-56 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0 relative">
            <img src={file.url} alt={file.alt || file.originalName}
              className="max-w-full max-h-full object-contain p-4" />
            <div className="absolute bottom-3 left-3 right-3">
              <div className="bg-black/50 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-white text-xs">
                {file.width && file.height ? `${file.width} x ${file.height} px` : "尺寸未知"}
              </div>
            </div>
          </div>

          {/* 右侧：详情编辑 */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-sm font-semibold text-slate-800 truncate">{file.originalName}</p>
                <p className="text-xs text-slate-400 mt-0.5">{formatFileSize(file.size)} · {formatDate(file.createdAt)}</p>
              </div>
              <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {/* 所属分类 */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">所属分类</label>
                <select value={categoryId ?? ""} onChange={(e) => setCategoryId(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors">
                  <option value="">未分类</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
                {currentCategory && (
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentCategory.color }} />
                    <span className="text-xs text-slate-500">{currentCategory.name}</span>
                  </div>
                )}
              </div>

              {/* Alt 文本 */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Alt 描述 <span className="text-slate-400 font-normal normal-case">(SEO 优化)</span></label>
                <textarea value={alt} onChange={(e) => setAlt(e.target.value)} rows={2}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors resize-none"
                  placeholder="描述图片内容，有助于搜索引擎理解" />
              </div>

              {/* 图片链接 */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">图片链接</label>
                <div className="flex gap-2">
                  <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 min-w-0">
                    <Link2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="text-xs text-slate-600 truncate">{file.url}</span>
                  </div>
                  <button onClick={copyUrl}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 shrink-0 transition-all ${copied ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200"}`}>
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "已复制" : "复制"}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-slate-100 flex gap-2">
              <button onClick={handleSave} disabled={saving}
                className={`flex-1 py-2.5 text-sm font-medium rounded-xl flex items-center justify-center gap-2 transition-all ${saved ? "bg-emerald-600 text-white" : "bg-slate-900 text-white hover:bg-slate-700"} disabled:opacity-50`}>
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : null}
                {saving ? "保存中..." : saved ? "已保存" : "保存修改"}
              </button>
              <button onClick={() => { if (confirm("确定删除此图片？此操作不可撤销。")) { onDelete(file.id); } }}
                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 上传预览弹窗 ─────────────────────────────────────────────────────────────
function UploadPreviewModal({
  items,
  categories,
  uploadCategoryId,
  onChangeCategory,
  onRemove,
  onConfirm,
  onClose,
}: {
  items: UploadItem[];
  categories: MediaCategory[];
  uploadCategoryId: number | null;
  onChangeCategory: (id: number | null) => void;
  onRemove: (idx: number) => void;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const allDone = items.every((i) => i.status === "success" || i.status === "error");
  const uploading = items.some((i) => i.status === "uploading" || i.status === "compressing");
  const successCount = items.filter((i) => i.status === "success").length;
  const totalSaved = items.reduce((sum, i) => {
    if (i.compression) return sum + (i.compression.originalSize - i.compression.compressedSize);
    return sum;
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-blue-600" />
            </div>
            {allDone ? "上传完成" : uploading ? "正在上传..." : `确认上传 ${items.length} 张图片`}
          </h2>
          <button onClick={onClose} disabled={uploading} className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 分类选择 */}
        {!uploading && !allDone && (
          <div className="px-6 py-3 border-b border-slate-100 flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500">上传到分类：</span>
            <select value={uploadCategoryId ?? ""} onChange={(e) => onChangeCategory(e.target.value ? parseInt(e.target.value) : null)}
              className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">未分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}

        {/* 文件列表 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((item, idx) => (
              <div key={idx} className="relative rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                {/* 预览图 */}
                <div className="aspect-square relative">
                  <img src={item.preview} alt={item.file.name} className="w-full h-full object-cover" />
                  {/* 状态遮罩 */}
                  {item.status === "compressing" && (
                    <div className="absolute inset-0 bg-indigo-500/50 flex items-center justify-center">
                      <div className="text-center">
                        <Zap className="w-6 h-6 text-white mx-auto mb-1 animate-pulse" />
                        <p className="text-white text-xs font-medium">压缩中...</p>
                      </div>
                    </div>
                  )}
                  {item.status === "uploading" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="w-6 h-6 text-white animate-spin mx-auto mb-1" />
                        <p className="text-white text-xs font-medium">上传中...</p>
                      </div>
                    </div>
                  )}
                  {item.status === "success" && (
                    <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  {item.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                        <X className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  {/* 删除按钮（仅待上传时） */}
                  {item.status === "pending" && (
                    <button onClick={() => onRemove(idx)}
                      className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/50 hover:bg-red-500 rounded-full flex items-center justify-center text-white transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {/* 文件信息 */}
                <div className="px-2.5 py-2">
                  <p className="text-[11px] text-slate-600 font-medium truncate">{item.file.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {formatFileSize(item.file.size)}
                    {item.clientCompression && !item.clientCompression.skipped && (
                      <span className="text-indigo-600 ml-1" title="浏览器端预压缩">
                        ⚡ {formatFileSize(item.clientCompression.compressedSize)} (-{item.clientCompression.savedPercent}%)
                      </span>
                    )}
                    {item.compression && (
                      <span className="text-emerald-600 ml-1" title="服务端二次压缩">
                        → {formatFileSize(item.compression.compressedSize)} (-{item.compression.savedPercent}%)
                      </span>
                    )}
                  </p>
                  {item.error && <p className="text-[10px] text-red-500 mt-0.5">{item.error}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100">
          {allDone ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-slate-600">
                  成功上传 {successCount}/{items.length} 张
                  {totalSaved > 0 && <span className="text-emerald-600 ml-1">· 自动压缩节省 {formatFileSize(totalSaved)}</span>}
                </span>
              </div>
              <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-xl hover:bg-slate-700 transition-colors">
                完成
              </button>
            </div>
          ) : uploading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <div className="flex-1">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${Math.round((items.filter(i => i.status === "success" || i.status === "error").length / items.length) * 100)}%` }} />
                </div>
              </div>
              <span className="text-xs text-slate-500 shrink-0">
                {items.filter(i => i.status === "success" || i.status === "error").length}/{items.length}
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-400">
                共 {items.length} 张图片 · {formatFileSize(items.reduce((s, i) => s + i.file.size, 0))}
                · 上传后自动压缩优化
              </p>
              <div className="flex gap-2">
                <button onClick={onClose} className="px-4 py-2.5 text-sm text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                  取消
                </button>
                <button onClick={onConfirm} className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  开始上传
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── 主组件 ────────────────────────────────────────────────────────────────────
export default function MediaManager() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "all" | "uncategorized">("all");
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [uploadCategoryId, setUploadCategoryId] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [batchMoveCat, setBatchMoveCat] = useState<string>("");
  const [uploadItems, setUploadItems] = useState<UploadItem[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media-categories");
      if (res.ok) setCategories(await res.json());
    } catch {}
  }, []);

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory === "uncategorized") params.set("uncategorized", "true");
      else if (selectedCategory !== "all") params.set("categoryId", String(selectedCategory));
      params.set("limit", "300");
      const res = await fetch(`/api/admin/media?${params}`);
      if (res.ok) {
        const data = await res.json();
        setFiles(data.items || []);
      }
    } catch {} finally { setLoading(false); }
  }, [selectedCategory]);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);
  useEffect(() => { fetchFiles(); setSelectedIds(new Set()); }, [fetchFiles]);

  // 准备上传 — 生成预览
  const prepareUpload = (fileList: FileList) => {
    const arr = Array.from(fileList);
    const items: UploadItem[] = arr.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
      progress: 0,
    }));
    setUploadItems(items);
  };

  // 执行上传（2 个并发）
  const executeUpload = async () => {
    if (!uploadItems) return;

    const items = [...uploadItems];
    const CONCURRENCY = 2;
    let idx = 0;

    const uploadOne = async (i: number) => {
      // 阶段 1：浏览器端压缩（失败/跳过则用原文件，绝不阻塞上传）
      items[i] = { ...items[i], status: "compressing" };
      setUploadItems([...items]);

      const original = items[i].file;
      let uploadBlob: Blob = original;
      let uploadName = original.name;
      let clientCompression: UploadItem["clientCompression"];
      try {
        const result = await compressImage(original);
        clientCompression = {
          originalSize: result.originalSize,
          compressedSize: result.compressedSize,
          savedPercent: result.savedPercent,
          skipped: result.skipped,
          skipReason: result.skipReason,
        };
        if (!result.skipped) {
          uploadBlob = result.blob;
          uploadName = renameForMime(original.name, result.mimeType);
        }
      } catch (e) {
        // 压缩异常 → 静默回退原文件
        console.warn("[compress] failed, falling back to original:", e);
        clientCompression = {
          originalSize: original.size,
          compressedSize: original.size,
          savedPercent: 0,
          skipped: true,
          skipReason: (e as Error).message,
        };
      }

      // 阶段 2：上传
      items[i] = { ...items[i], status: "uploading", clientCompression };
      setUploadItems([...items]);

      const formData = new FormData();
      // 压缩后产物是 Blob，需要给 FormData 一个文件名才能正确命名
      formData.append("file", uploadBlob, uploadName);
      if (uploadCategoryId) formData.append("categoryId", String(uploadCategoryId));

      try {
        const res = await fetch("/api/admin/media", { method: "POST", body: formData });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `上传失败 (${res.status})`);
        }
        const data = await res.json();
        items[i] = {
          ...items[i],
          status: "success",
          progress: 100,
          compression: data.compression,
        };
      } catch (err) {
        items[i] = {
          ...items[i],
          status: "error",
          error: err instanceof Error ? err.message : "上传失败",
        };
      }
      setUploadItems([...items]);
    };

    // 并发控制
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (idx < items.length) {
        const currentIdx = idx++;
        await uploadOne(currentIdx);
      }
    });

    await Promise.all(workers);
    await fetchFiles();
    await fetchCategories();
  };

  const removeUploadItem = (i: number) => {
    if (!uploadItems) return;
    const newItems = uploadItems.filter((_, idx) => idx !== i);
    if (newItems.length === 0) {
      setUploadItems(null);
    } else {
      setUploadItems(newItems);
    }
  };

  const closeUploadModal = () => {
    if (uploadItems) {
      uploadItems.forEach((item) => URL.revokeObjectURL(item.preview));
    }
    setUploadItems(null);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) prepareUpload(e.target.files);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    if (e.dataTransfer.files?.length) prepareUpload(e.dataTransfer.files);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setSelectedFile(null);
    setSelectedIds((prev) => { const s = new Set(prev); s.delete(id); return s; });
    await fetchCategories();
  };

  const handleUpdate = async (id: number, data: { alt?: string; categoryId?: number | null }) => {
    await fetch(`/api/admin/media/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data),
    });
    setFiles((prev) => prev.map((f) => f.id === id ? { ...f, ...data } : f));
    if (selectedFile?.id === id) setSelectedFile((prev) => prev ? { ...prev, ...data } : null);
    await fetchCategories();
  };

  // 批量操作
  const toggleSelect = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(filtered.map((f) => f.id)));
  };

  const batchDelete = async () => {
    if (!confirm(`确定删除选中的 ${selectedIds.size} 张图片？此操作不可撤销。`)) return;
    for (const id of selectedIds) await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    setFiles((prev) => prev.filter((f) => !selectedIds.has(f.id)));
    setSelectedIds(new Set());
    await fetchCategories();
  };

  const batchMove = async () => {
    if (!batchMoveCat && batchMoveCat !== "0") return;
    const catId = batchMoveCat === "0" ? null : parseInt(batchMoveCat);
    for (const id of selectedIds) {
      await fetch(`/api/admin/media/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ categoryId: catId }),
      });
    }
    await fetchFiles(); await fetchCategories();
    setSelectedIds(new Set()); setBatchMoveCat("");
  };

  // 搜索过滤
  const filtered = files.filter((f) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return f.originalName.toLowerCase().includes(q) || (f.alt || "").toLowerCase().includes(q);
  });

  const totalAllFiles = categories.reduce((sum, c) => sum + c.imageCount, 0);

  return (
    <div className="flex gap-5 min-h-0">
      {/* ── 左侧分类导航 ── */}
      <aside className="w-48 shrink-0 space-y-2">
        {/* 分类标题 */}
        <div className="flex items-center justify-between px-1 mb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">分类</span>
          <button onClick={() => setShowCategoryModal(true)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="管理分类">
            <Settings2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 全部 */}
        <button onClick={() => setSelectedCategory("all")}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === "all" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>
          <FolderOpen className={`w-4 h-4 shrink-0 ${selectedCategory === "all" ? "text-white" : "text-slate-400"}`} />
          <span className="flex-1 text-left">全部图片</span>
          <span className={`text-xs px-1.5 py-0.5 rounded-md font-normal ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
            {totalAllFiles}
          </span>
        </button>

        {/* 各分类 */}
        {categories.map((cat) => (
          <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.id ? "shadow-sm text-white" : "text-slate-600 hover:bg-slate-100"}`}
            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}>
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: selectedCategory === cat.id ? "rgba(255,255,255,0.8)" : cat.color }} />
            <span className="flex-1 text-left truncate">{cat.name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-normal ${selectedCategory === cat.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
              {cat.imageCount}
            </span>
          </button>
        ))}

        {/* 未分类 */}
        <button onClick={() => setSelectedCategory("uncategorized")}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === "uncategorized" ? "bg-slate-900 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}>
          <ImageIcon className={`w-4 h-4 shrink-0 ${selectedCategory === "uncategorized" ? "text-white" : "text-slate-400"}`} />
          <span className="flex-1 text-left">未分类</span>
        </button>

        {/* 分隔线 + 管理入口 */}
        <div className="pt-2 border-t border-slate-200">
          <button onClick={() => setShowCategoryModal(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            管理分类
          </button>
        </div>
      </aside>

      {/* ── 右侧主区域 ── */}
      <div className="flex-1 min-w-0 space-y-3">
        {/* 顶部工具栏 */}
        <div className="bg-white rounded-2xl border border-slate-200 px-4 py-3 flex items-center gap-3 flex-wrap">
          {/* 上传按钮 */}
          <button onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-xl hover:bg-slate-700 transition-colors shadow-sm">
            <Upload className="w-4 h-4" />
            上传图片
          </button>
          <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileInput} />

          {/* 上传目标分类 */}
          <div className="relative">
            <select value={uploadCategoryId ?? ""}
              onChange={(e) => setUploadCategoryId(e.target.value ? parseInt(e.target.value) : null)}
              className="appearance-none pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
              <option value="">上传到：未分类</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>上传到：{cat.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          </div>

          <div className="flex-1" />

          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索图片名称..."
              className="pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-44 bg-slate-50 focus:bg-white transition-colors" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 刷新 */}
          <button onClick={fetchFiles} className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors" title="刷新">
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* 视图切换 */}
          <div className="flex border border-slate-200 rounded-xl overflow-hidden">
            <button onClick={() => setViewMode("grid")}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "grid" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50"}`} title="网格视图">
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode("list")}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === "list" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-50"}`} title="列表视图">
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 批量操作栏 */}
        {selectedIds.size > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-blue-800">已选 {selectedIds.size} 张</span>
            </div>
            <div className="flex items-center gap-2">
              <select value={batchMoveCat} onChange={(e) => setBatchMoveCat(e.target.value)}
                className="border border-blue-200 rounded-lg px-2.5 py-1.5 text-sm bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">移动到分类...</option>
                <option value="0">未分类</option>
                {categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
              </select>
              {batchMoveCat !== "" && (
                <button onClick={batchMove} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  确认移动
                </button>
              )}
            </div>
            <div className="flex-1" />
            <button onClick={batchDelete} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200">
              <Trash2 className="w-3.5 h-3.5" />
              批量删除
            </button>
            <button onClick={() => setSelectedIds(new Set())} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 拖拽上传区 */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl py-5 px-6 flex items-center gap-4 cursor-pointer transition-all ${isDragging ? "border-blue-400 bg-blue-50 scale-[1.01]" : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/50"}`}>
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isDragging ? "bg-blue-100" : "bg-slate-100"}`}>
            <Upload className={`w-5 h-5 ${isDragging ? "text-blue-600" : "text-slate-400"}`} />
          </div>
          <div>
            <p className={`text-sm font-medium ${isDragging ? "text-blue-700" : "text-slate-600"}`}>
              {isDragging ? "松开鼠标上传图片" : "拖拽图片到此处，或点击选择文件"}
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              支持 JPG、PNG、WebP、GIF、SVG，单文件最大 10MB · 上传后自动压缩优化
              {uploadCategoryId && <span className="text-blue-500 ml-1">→ 上传到：{categories.find(c => c.id === uploadCategoryId)?.name}</span>}
            </p>
          </div>
          {filtered.length > 0 && (
            <div className="ml-auto flex items-center gap-2">
              <button onClick={(e) => { e.stopPropagation(); selectAll(); }}
                className="text-xs text-slate-500 hover:text-blue-600 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors border border-slate-200">
                {selectedIds.size === filtered.length ? "取消全选" : "全选"}
              </button>
            </div>
          )}
        </div>

        {/* 图片列表 */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            <p className="text-sm text-slate-400">加载中...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-sm font-medium text-slate-500">暂无图片</p>
            <p className="text-xs text-slate-400">
              {search ? `未找到包含「${search}」的图片` : "点击上方按钮或拖拽文件上传"}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          /* 网格视图 */
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {filtered.map((file) => {
              const cat = categories.find((c) => c.id === file.categoryId);
              const isSelected = selectedIds.has(file.id);
              return (
                <div key={file.id} onClick={() => setSelectedFile(file)}
                  className={`group relative bg-white border-2 rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-md ${isSelected ? "border-blue-500 shadow-md" : "border-transparent hover:border-slate-200"}`}>
                  {/* 图片 */}
                  <div className="aspect-square bg-slate-100 overflow-hidden">
                    <img src={file.url} alt={file.alt || file.originalName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy" />
                  </div>

                  {/* 选择框 */}
                  <div onClick={(e) => toggleSelect(file.id, e)}
                    className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${isSelected ? "bg-blue-600 border-blue-600" : "bg-white/80 border-slate-300 opacity-0 group-hover:opacity-100"}`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>

                  {/* 分类标签 */}
                  {cat && (
                    <div className="absolute top-1.5 right-1.5">
                      <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: cat.color }} title={cat.name} />
                    </div>
                  )}

                  {/* Hover 操作层 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-1.5">
                      <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
                        <ZoomIn className="w-3.5 h-3.5 text-slate-700" />
                      </div>
                    </div>
                  </div>

                  {/* 文件名 */}
                  <div className="px-2 py-1.5">
                    <p className="text-[11px] text-slate-500 truncate">{file.originalName}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* 列表视图 */
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-10 px-4 py-3">
                    <div onClick={selectAll}
                      className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${selectedIds.size === filtered.length && filtered.length > 0 ? "bg-blue-600 border-blue-600" : "border-slate-300 hover:border-blue-400"}`}>
                      {selectedIds.size === filtered.length && filtered.length > 0 && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">图片</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">文件名</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">分类</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">大小</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">尺寸</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">上传时间</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((file) => {
                  const cat = categories.find((c) => c.id === file.categoryId);
                  const isSelected = selectedIds.has(file.id);
                  return (
                    <tr key={file.id} className={`hover:bg-slate-50 transition-colors ${isSelected ? "bg-blue-50" : ""}`}>
                      <td className="px-4 py-3" onClick={(e) => toggleSelect(file.id, e)}>
                        <div className={`w-4 h-4 rounded border-2 cursor-pointer flex items-center justify-center transition-colors ${isSelected ? "bg-blue-600 border-blue-600" : "border-slate-300 hover:border-blue-400"}`}>
                          {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                        </div>
                      </td>
                      <td className="px-3 py-3 cursor-pointer" onClick={() => setSelectedFile(file)}>
                        <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden">
                          <img src={file.url} alt={file.alt || file.originalName} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      </td>
                      <td className="px-3 py-3 cursor-pointer" onClick={() => setSelectedFile(file)}>
                        <p className="font-medium text-slate-800 truncate max-w-[160px]">{file.originalName}</p>
                        {file.alt && <p className="text-xs text-slate-400 truncate max-w-[160px] mt-0.5">{file.alt}</p>}
                      </td>
                      <td className="px-3 py-3">
                        {cat ? (
                          <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium text-white" style={{ backgroundColor: cat.color }}>
                            {cat.name}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 px-2.5 py-1 bg-slate-100 rounded-full">未分类</span>
                        )}
                      </td>
                      <td className="px-3 py-3 text-slate-500 text-xs whitespace-nowrap">{formatFileSize(file.size)}</td>
                      <td className="px-3 py-3 text-slate-500 text-xs whitespace-nowrap">{file.width ? `${file.width}x${file.height}` : "\u2014"}</td>
                      <td className="px-3 py-3 text-slate-500 text-xs whitespace-nowrap">{formatDate(file.createdAt)}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          <button onClick={() => setSelectedFile(file)} className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="编辑">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => { if (confirm("确定删除此图片？")) handleDelete(file.id); }}
                            className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="删除">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 图片详情弹窗 */}
      {selectedFile && (
        <ImageDetailModal
          file={selectedFile}
          categories={categories}
          onClose={() => setSelectedFile(null)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}

      {/* 分类管理弹窗 */}
      {showCategoryModal && (
        <CategoryModal
          categories={categories}
          onClose={() => setShowCategoryModal(false)}
          onRefresh={async () => { await fetchCategories(); await fetchFiles(); }}
        />
      )}

      {/* 上传预览弹窗 */}
      {uploadItems && (
        <UploadPreviewModal
          items={uploadItems}
          categories={categories}
          uploadCategoryId={uploadCategoryId}
          onChangeCategory={setUploadCategoryId}
          onRemove={removeUploadItem}
          onConfirm={executeUpload}
          onClose={closeUploadModal}
        />
      )}
    </div>
  );
}
