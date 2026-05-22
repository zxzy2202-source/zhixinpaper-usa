"use client";
import { useState, useTransition, useCallback } from "react";
import { useRouter } from "next/navigation";
import { saveBlogPost } from "@/app/admin/actions";
import { Save, Eye, Loader2, CheckCircle2, ArrowLeft, Image as ImageIcon, X, SplitSquareHorizontal, FileText, Search } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  status: "draft" | "published" | "archived";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  coverImage: string;
}

const CATEGORIES = ["Compliance","Education","Industry News","Product Guide","E-Commerce","Sustainability","Technical Tips","Market Insights"];

interface MediaFile { id: number; url: string; alt: string; filename: string; originalName: string; }
interface Props { initialData?: Partial<BlogPost>; }

export default function BlogEditor({ initialData }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [editorMode, setEditorMode] = useState<"edit" | "preview" | "split">("edit");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [mediaSearch, setMediaSearch] = useState("");
  const [mediaLoading, setMediaLoading] = useState(false);
  const [form, setForm] = useState<BlogPost>({
    id: initialData?.id,
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    tags: initialData?.tags || "",
    readTime: initialData?.readTime || "",
    status: initialData?.status || "draft",
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
    seoKeywords: initialData?.seoKeywords || "",
    coverImage: (initialData as BlogPost)?.coverImage || "",
  });

  const handleChange = (field: keyof BlogPost, value: string) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && !initialData?.slug) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
      }
      if (field === "title" && !prev.seoTitle) updated.seoTitle = value;
      return updated;
    });
  };

  const handleSave = (status: "draft" | "published") => {
    startTransition(async () => {
      await saveBlogPost({ ...form, status });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      router.refresh();
    });
  };

  const openMediaPicker = useCallback(async () => {
    setShowMediaPicker(true);
    setMediaLoading(true);
    try {
      const res = await fetch("/api/admin/media?limit=100");
      const data = await res.json();
      setMediaFiles(data.items || []);
    } catch { setMediaFiles([]); } finally { setMediaLoading(false); }
  }, []);

  const filteredMedia = mediaFiles.filter((f) =>
    f.originalName.toLowerCase().includes(mediaSearch.toLowerCase()) || (f.alt || "").toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" />返回列表
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-lg font-bold text-slate-900">{form.id ? "编辑文章" : "新建文章"}</h1>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium"><CheckCircle2 className="w-4 h-4" />已保存</span>}
          {form.slug && form.status === "published" && (
            <Link href={`/blog/${form.slug}`} target="_blank" className="inline-flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-blue-600 border border-slate-200 rounded-xl text-sm font-medium transition-colors">
              <Eye className="w-4 h-4" />预览前台
            </Link>
          )}
          <button onClick={() => handleSave("draft")} disabled={isPending || !form.title || !form.content} className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}存为草稿
          </button>
          <button onClick={() => handleSave("published")} disabled={isPending || !form.title || !form.content || !form.slug} className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors disabled:opacity-50 shadow-sm">
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Eye className="w-4 h-4" />}发布文章
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <input type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} placeholder="Article title (English, for international customers)..." className="w-full text-2xl font-bold text-slate-900 border-none outline-none bg-transparent placeholder:text-slate-300" />
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
              <span className="text-xs text-slate-400 shrink-0">URL:</span>
              <span className="text-xs font-mono text-blue-600">/blog/</span>
              <input type="text" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} placeholder="url-slug" className="flex-1 text-xs font-mono text-slate-600 border-none outline-none bg-transparent" />
            </div>
          </div>

          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            <button onClick={() => setActiveTab("content")} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "content" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>内容</button>
            <button onClick={() => setActiveTab("seo")} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === "seo" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>SEO</button>
          </div>

          {activeTab === "content" ? (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">摘要</label>
                <textarea value={form.excerpt} onChange={(e) => handleChange("excerpt", e.target.value)} rows={3} placeholder="Article summary in English (100-200 characters)..." className="w-full text-sm text-slate-700 border-none outline-none resize-none bg-transparent" />
                <p className="text-xs text-slate-400 mt-1">{form.excerpt.length} 字符</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">正文内容（Markdown）</label>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
                    <button onClick={() => setEditorMode("edit")} title="编辑" className={`p-1.5 rounded-md transition-all ${editorMode === "edit" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}><FileText className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditorMode("split")} title="分屏" className={`p-1.5 rounded-md transition-all ${editorMode === "split" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}><SplitSquareHorizontal className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditorMode("preview")} title="预览" className={`p-1.5 rounded-md transition-all ${editorMode === "preview" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"}`}><Eye className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className={editorMode === "split" ? "grid grid-cols-2 divide-x divide-slate-100" : ""}>
                  {(editorMode === "edit" || editorMode === "split") && (
                    <textarea value={form.content} onChange={(e) => handleChange("content", e.target.value)} rows={24} placeholder="# Article Title&#10;&#10;## Introduction&#10;&#10;Write your article content here..." className="w-full p-5 text-sm text-slate-700 border-none outline-none resize-y bg-transparent font-mono leading-relaxed" />
                  )}
                  {(editorMode === "preview" || editorMode === "split") && (
                    <div className="p-5 overflow-auto max-h-[600px]">
                      <div className="prose prose-slate prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content || "*Start typing to see preview...*"}</ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-4">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">标签（逗号分隔）</label>
                <input type="text" value={form.tags} onChange={(e) => handleChange("tags", e.target.value)} placeholder="BPA-free, thermal paper, compliance, EU regulations" className="w-full text-sm text-slate-700 border-none outline-none bg-transparent" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">SEO 标题</label>
                <input type="text" value={form.seoTitle} onChange={(e) => handleChange("seoTitle", e.target.value)} placeholder="SEO Title (50-60 characters)" className="w-full text-sm text-slate-700 border-none outline-none bg-transparent" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-400">{form.seoTitle.length} 字符</p>
                  <p className={`text-xs ${form.seoTitle.length > 60 ? "text-red-500" : form.seoTitle.length >= 50 ? "text-emerald-600" : "text-slate-400"}`}>{form.seoTitle.length > 60 ? "过长" : form.seoTitle.length >= 50 ? "✓ 合适" : "建议 50-60"}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Meta 描述</label>
                <textarea value={form.seoDescription} onChange={(e) => handleChange("seoDescription", e.target.value)} rows={3} placeholder="Meta description (150-160 characters)" className="w-full text-sm text-slate-700 border-none outline-none resize-none bg-transparent" />
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-slate-400">{form.seoDescription.length} 字符</p>
                  <p className={`text-xs ${form.seoDescription.length > 160 ? "text-red-500" : form.seoDescription.length >= 150 ? "text-emerald-600" : "text-slate-400"}`}>{form.seoDescription.length > 160 ? "过长" : form.seoDescription.length >= 150 ? "✓ 合适" : "建议 150-160"}</p>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">关键词</label>
                <input type="text" value={form.seoKeywords} onChange={(e) => handleChange("seoKeywords", e.target.value)} placeholder="thermal paper manufacturer, BPA-free receipt paper" className="w-full text-sm text-slate-700 border-none outline-none bg-transparent" />
              </div>
              {(form.seoTitle || form.title) && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">Google 搜索预览</p>
                  <p className="text-blue-700 text-base font-medium truncate">{form.seoTitle || form.title} | Zhixin Paper</p>
                  <p className="text-green-700 text-xs mt-0.5">www.zhixinpaper.com › blog › {form.slug || "slug"}</p>
                  <p className="text-slate-600 text-sm mt-1 line-clamp-2">{form.seoDescription || form.excerpt || "Meta description..."}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">发布状态</label>
            <select value={form.status} onChange={(e) => handleChange("status", e.target.value)} className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
              <option value="archived">已归档</option>
            </select>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">分类</label>
            <select value={form.category} onChange={(e) => handleChange("category", e.target.value)} className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">选择分类...</option>
              {CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
            </select>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">阅读时长</label>
            <input type="text" value={form.readTime} onChange={(e) => handleChange("readTime", e.target.value)} placeholder="例：5 min read" className="w-full text-sm text-slate-700 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            {form.content && !form.readTime && (
              <button type="button" onClick={() => { const mins = Math.max(1, Math.round(form.content.split(/\s+/).length / 200)); handleChange("readTime", `${mins} min read`); }} className="mt-2 text-xs text-blue-600 hover:underline">自动计算</button>
            )}
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">封面图</label>
            {form.coverImage ? (
              <div className="relative">
                <img src={form.coverImage} alt="封面图" className="w-full h-36 object-cover rounded-xl" />
                <button onClick={() => handleChange("coverImage", "")} className="absolute top-2 right-2 w-6 h-6 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors"><X className="w-3 h-3" /></button>
              </div>
            ) : (
              <button onClick={openMediaPicker} className="w-full h-28 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors">
                <ImageIcon className="w-6 h-6" /><span className="text-xs font-medium">从图片库选择</span>
              </button>
            )}
            {form.coverImage && <button onClick={openMediaPicker} className="mt-2 w-full text-xs text-blue-600 hover:underline text-center">更换图片</button>}
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-3">发布检查</p>
            <div className="space-y-2">
              {[
                { label: "标题已填写", ok: !!form.title },
                { label: "URL Slug 已设置", ok: !!form.slug },
                { label: "摘要已填写", ok: !!form.excerpt },
                { label: "正文内容 > 100字符", ok: form.content.length > 100 },
                { label: "分类已选择", ok: !!form.category },
                { label: "SEO 标题已填写", ok: !!form.seoTitle },
                { label: "封面图已设置", ok: !!form.coverImage },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 ${item.ok ? "bg-emerald-500" : "bg-slate-200"}`}>{item.ok ? "✓" : ""}</div>
                  <span className={`text-xs ${item.ok ? "text-slate-600" : "text-slate-400"}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showMediaPicker && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="font-bold text-slate-900">选择封面图</h3>
              <button onClick={() => setShowMediaPicker(false)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={mediaSearch} onChange={(e) => setMediaSearch(e.target.value)} placeholder="搜索图片..." className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {mediaLoading ? (
                <div className="flex items-center justify-center py-12"><Loader2 className="w-6 h-6 animate-spin text-slate-400" /></div>
              ) : filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-slate-400"><ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" /><p className="text-sm">暂无图片</p></div>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {filteredMedia.map((file) => (
                    <button key={file.id} onClick={() => { handleChange("coverImage", file.url); setShowMediaPicker(false); }} className="group relative aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all">
                      <img src={file.url} alt={file.alt || file.originalName} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold bg-blue-600 px-2 py-1 rounded-lg transition-opacity">选择</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
