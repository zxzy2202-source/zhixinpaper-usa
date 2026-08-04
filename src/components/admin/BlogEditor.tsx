"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  AlertTriangle,
  ArrowLeft,
  Bold,
  CheckCircle2,
  Eye,
  FileText,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Minus,
  Quote,
  Save,
  Search,
  SplitSquareHorizontal,
  X,
} from "lucide-react";
import { saveBlogPost } from "@/app/admin/actions";
import { validateBlogPost, type BlogValidationResult } from "@/lib/blogPostValidation";
import { remarkLineBreaks } from "@/lib/remarkLineBreaks";

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
  scheduledAt: string;
  publishApproved: boolean;
  campaignId: string;
}

interface MediaFile {
  id: number;
  url: string;
  alt: string;
  filename: string;
  originalName: string;
}

interface Props {
  initialData?: Partial<BlogPost>;
}

type MediaPickerTarget = "cover" | "content";

const CATEGORY_OPTIONS = [
  { value: "Compliance", label: "合规" },
  { value: "Education", label: "知识科普" },
  { value: "Industry News", label: "行业动态" },
  { value: "Product Guide", label: "产品指南" },
  { value: "E-Commerce", label: "电商" },
  { value: "Sustainability", label: "可持续" },
  { value: "Technical Tips", label: "技术技巧" },
  { value: "Market Insights", label: "市场洞察" },
];

const KEYWORD_STOP_WORDS = new Set([
  "about",
  "after",
  "also",
  "and",
  "are",
  "article",
  "before",
  "between",
  "blog",
  "can",
  "com",
  "for",
  "from",
  "guide",
  "has",
  "have",
  "how",
  "into",
  "its",
  "may",
  "more",
  "not",
  "our",
  "paper",
  "post",
  "product",
  "products",
  "should",
  "that",
  "the",
  "their",
  "these",
  "this",
  "through",
  "use",
  "used",
  "using",
  "what",
  "when",
  "where",
  "which",
  "while",
  "with",
  "your",
]);

const DEFAULT_KEYWORDS = [
  "thermal paper",
  "thermal paper manufacturer",
  "BPA-free thermal paper",
  "direct thermal labels",
  "receipt paper rolls",
];

const SEO_TITLE_MAX_LENGTH = 60;
const SEO_DESCRIPTION_MAX_LENGTH = 160;

function formatDateTimeLocal(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16);
}

function stripMarkdown(value: string) {
  return value
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[`*_>#|~\-[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSentence(value: string, maxLength: number) {
  const text = stripMarkdown(value);
  if (text.length <= maxLength) return text;

  const suffix = "...";
  const bodyMaxLength = Math.max(1, maxLength - suffix.length);
  const clipped = text.slice(0, bodyMaxLength + 1);
  const sentenceEnd = Math.max(clipped.lastIndexOf("."), clipped.lastIndexOf("?"), clipped.lastIndexOf("!"));
  const wordEnd = clipped.lastIndexOf(" ");
  const cutAt = Math.min(
    bodyMaxLength,
    sentenceEnd >= 80 ? sentenceEnd + 1 : wordEnd >= 80 ? wordEnd : bodyMaxLength,
  );

  return `${clipped.slice(0, cutAt).trim().replace(/[,.!?;:]$/, "")}${suffix}`;
}

function buildSeoTitle(title: string) {
  const cleanTitle = stripMarkdown(title);
  if (!cleanTitle) return "";
  return cleanTitle.length <= SEO_TITLE_MAX_LENGTH
    ? cleanTitle
    : normalizeSentence(cleanTitle, SEO_TITLE_MAX_LENGTH);
}

function buildSeoDescription(excerpt: string, content: string) {
  const cleanExcerpt = stripMarkdown(excerpt);
  const cleanContent = stripMarkdown(content);
  const source = cleanExcerpt && cleanExcerpt.length < 140
    ? `${cleanExcerpt} ${cleanContent}`
    : cleanExcerpt || cleanContent;

  return normalizeSentence(source, SEO_DESCRIPTION_MAX_LENGTH);
}

function buildSeoKeywords(form: BlogPost) {
  const phraseCandidates = [form.category, ...form.tags.split(","), ...DEFAULT_KEYWORDS];
  const keywords = new Map<string, number>();

  phraseCandidates.forEach((candidate, index) => {
    const keyword = stripMarkdown(candidate).toLowerCase();
    if (keyword && keyword.length >= 3) {
      keywords.set(keyword, (keywords.get(keyword) || 0) + 20 - index);
    }
  });

  const source = `${form.title} ${form.excerpt} ${form.content}`.toLowerCase();
  const words = stripMarkdown(source).match(/[a-z][a-z0-9-]{2,}/g) || [];

  words.forEach((word) => {
    if (KEYWORD_STOP_WORDS.has(word) || /^\d+$/.test(word)) return;
    keywords.set(word, (keywords.get(word) || 0) + 1);
  });

  return Array.from(keywords.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([keyword]) => keyword)
    .join(", ");
}

function buildSeoFields(form: BlogPost) {
  return {
    seoTitle: buildSeoTitle(form.seoTitle || form.title),
    seoDescription: normalizeSentence(
      form.seoDescription || buildSeoDescription(form.excerpt, form.content),
      SEO_DESCRIPTION_MAX_LENGTH,
    ),
    seoKeywords: form.seoKeywords || buildSeoKeywords(form),
  };
}

function formatAiRiskLabel(risk: BlogValidationResult["qualityAudit"]["aiStyleRisk"]) {
  switch (risk) {
    case "high":
      return "高";
    case "medium":
      return "中";
    default:
      return "低";
  }
}

export default function BlogEditor({ initialData }: Props) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"content" | "seo">("content");
  const [editorMode, setEditorMode] = useState<"edit" | "preview" | "split">("edit");
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaPickerTarget, setMediaPickerTarget] = useState<MediaPickerTarget>("cover");
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
    scheduledAt: formatDateTimeLocal(initialData?.scheduledAt),
    publishApproved: initialData?.publishApproved || false,
    campaignId: initialData?.campaignId || "",
  });

  const validation = validateBlogPost({
    title: form.title,
    excerpt: form.excerpt,
    content: form.content,
    metaTitle: form.seoTitle,
    metaDescription: form.seoDescription,
  });

  const draftActionStatus =
    form.status === "published"
      ? "published"
      : form.status === "archived"
        ? "archived"
        : "draft";
  const draftActionLabel =
    draftActionStatus === "published"
      ? "更新已发布文章"
      : draftActionStatus === "archived"
        ? "保存归档文章"
        : "保存草稿";

  const handleChange = useCallback((field: keyof BlogPost, value: string) => {
    setSaveError("");
    setSaveMessage("");
    setForm((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === "title" && !initialData?.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-")
          .trim();
      }
      if (field === "title" && !prev.seoTitle) {
        updated.seoTitle = value;
      }
      if (field === "status" && value !== "draft") {
        updated.scheduledAt = "";
        updated.publishApproved = false;
      }
      return updated;
    });
  }, [initialData?.slug]);

  const handleScheduledAtChange = useCallback((value: string) => {
    setSaveError("");
    setSaveMessage("");
    setForm((prev) => ({
      ...prev,
      scheduledAt: value,
      publishApproved: value ? prev.publishApproved : false,
    }));
  }, []);

  const handlePublishApprovalChange = useCallback((checked: boolean) => {
    setSaveError("");
    setSaveMessage("");
    setForm((prev) => ({
      ...prev,
      publishApproved: checked,
    }));
  }, []);

  const handleGenerateSeo = () => {
    setForm((prev) => ({
      ...prev,
      seoTitle: buildSeoTitle(prev.title),
      seoDescription: buildSeoDescription(prev.excerpt, prev.content),
      seoKeywords: buildSeoKeywords(prev),
    }));
  };

  const handleSave = (status: "draft" | "published" | "archived") => {
    startTransition(async () => {
      const generatedSeo = buildSeoFields(form);
      const result = await saveBlogPost({
        ...form,
        status,
        seoTitle: form.seoTitle || generatedSeo.seoTitle,
        seoDescription: generatedSeo.seoDescription,
        seoKeywords: form.seoKeywords || generatedSeo.seoKeywords,
      });

      if (!result.success) {
        setSaveError(result.error || "保存失败。");
        setSaveMessage("");
        if (status === "published") {
          setActiveTab("content");
        }
        return;
      }

      setSaveError("");
      setSaveMessage(
        status === "published"
          ? "文章已发布。"
          : status === "archived"
            ? "文章已归档。"
            : "草稿已保存。",
      );
      setForm((prev) => ({
        ...prev,
        status,
        scheduledAt: status === "draft" ? prev.scheduledAt : "",
        publishApproved: status === "draft" ? prev.publishApproved : false,
      }));
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setSaveMessage("");
      }, 3000);
      router.refresh();
    });
  };

  const updateContentSelection = useCallback((nextValue: string, start: number, end: number) => {
    handleChange("content", nextValue);
    requestAnimationFrame(() => {
      contentRef.current?.focus();
      contentRef.current?.setSelectionRange(start, end);
    });
  }, [handleChange]);

  const insertMarkdown = useCallback((before: string, after = "", placeholder = "") => {
    const textarea = contentRef.current;
    const value = form.content;
    const start = textarea?.selectionStart ?? value.length;
    const end = textarea?.selectionEnd ?? value.length;
    const selected = value.slice(start, end) || placeholder;
    const inserted = `${before}${selected}${after}`;
    const nextValue = `${value.slice(0, start)}${inserted}${value.slice(end)}`;
    const selectionStart = start + before.length;
    const selectionEnd = selectionStart + selected.length;

    updateContentSelection(nextValue, selectionStart, selectionEnd);
  }, [form.content, updateContentSelection]);

  const replaceSelection = useCallback((inserted: string) => {
    const textarea = contentRef.current;
    const value = form.content;
    const start = textarea?.selectionStart ?? value.length;
    const end = textarea?.selectionEnd ?? value.length;
    const nextValue = `${value.slice(0, start)}${inserted}${value.slice(end)}`;

    updateContentSelection(nextValue, start, start + inserted.length);
  }, [form.content, updateContentSelection]);

  const prefixSelectedLines = useCallback((prefix: string) => {
    const textarea = contentRef.current;
    const value = form.content;
    const start = textarea?.selectionStart ?? value.length;
    const end = textarea?.selectionEnd ?? value.length;
    const selected = value.slice(start, end) || "列表项";
    const inserted = selected
      .split(/\r?\n/)
      .map((line) => (line.trim() ? `${prefix}${line}` : line))
      .join("\n");
    const nextValue = `${value.slice(0, start)}${inserted}${value.slice(end)}`;

    updateContentSelection(nextValue, start, start + inserted.length);
  }, [form.content, updateContentSelection]);

  const insertImageMarkdown = useCallback((file: MediaFile) => {
    replaceSelection(`![${file.alt || file.originalName}](${file.url})`);
  }, [replaceSelection]);

  const convertHtmlToMarkdown = useCallback((html: string) => {
    const container = document.createElement("div");
    container.innerHTML = html;
    container.querySelectorAll("script, style, meta, link").forEach((node) => node.remove());

    const clean = (value: string) => value.replace(/\u00a0/g, " ").replace(/[ \t]+\n/g, "\n");
    const textOf = (node: Node): string => Array.from(node.childNodes).map(toMarkdown).join("");
    const block = (value: string) => {
      const trimmed = clean(value).trim();
      return trimmed ? `\n\n${trimmed}\n\n` : "";
    };

    const toMarkdown = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) return node.textContent || "";
      if (node.nodeType !== Node.ELEMENT_NODE) return "";

      const element = node as HTMLElement;
      const tagName = element.tagName.toLowerCase();
      const children = textOf(element);

      if (/^h[1-6]$/.test(tagName)) return block(`${"#".repeat(Number(tagName[1]))} ${children.trim()}`);
      if (tagName === "p" || tagName === "div" || tagName === "section" || tagName === "article") return block(children);
      if (tagName === "br") return "\n";
      if (tagName === "strong" || tagName === "b") return `**${children.trim()}**`;
      if (tagName === "em" || tagName === "i") return `*${children.trim()}*`;
      if (tagName === "blockquote") return block(children.trim().split(/\r?\n/).map((line) => `> ${line}`).join("\n"));
      if (tagName === "code") return `\`${children.trim()}\``;
      if (tagName === "pre") return block(`\`\`\`\n${element.textContent?.trim() || ""}\n\`\`\``);
      if (tagName === "a") {
        const href = element.getAttribute("href");
        return href ? `[${children.trim() || href}](${href})` : children;
      }
      if (tagName === "img") {
        const src = element.getAttribute("src");
        const alt = element.getAttribute("alt") || "";
        return src ? `\n\n![${alt}](${src})\n\n` : "";
      }
      if (tagName === "ul" || tagName === "ol") {
        const items = Array.from(element.children)
          .filter((child) => child.tagName.toLowerCase() === "li")
          .map((child, index) => {
            const marker = tagName === "ol" ? `${index + 1}. ` : "- ";
            return `${marker}${clean(textOf(child)).trim()}`;
          });
        return block(items.join("\n"));
      }
      if (tagName === "hr") return "\n\n---\n\n";
      if (tagName === "table") {
        const rows = Array.from(element.querySelectorAll("tr"))
          .map((row) => Array.from(row.querySelectorAll("th,td")).map((cell) => clean(cell.textContent || "").trim()));
        if (rows.length === 0) return "";
        const header = rows[0];
        const separator = header.map(() => "---");
        const body = rows.slice(1);
        return block([header, separator, ...body].map((row) => `| ${row.join(" | ")} |`).join("\n"));
      }

      return children;
    };

    return clean(textOf(container)).replace(/\n{3,}/g, "\n\n").trim();
  }, []);

  const handleContentPaste = useCallback((event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const html = event.clipboardData.getData("text/html");
    if (!html) return;

    const markdown = convertHtmlToMarkdown(html);
    if (!markdown) return;

    event.preventDefault();
    replaceSelection(markdown);
  }, [convertHtmlToMarkdown, replaceSelection]);

  const openMediaPicker = useCallback(async (target: MediaPickerTarget = "cover") => {
    setMediaPickerTarget(target);
    setShowMediaPicker(true);
    setMediaLoading(true);
    try {
      const response = await fetch("/api/admin/media?limit=100");
      const data = await response.json();
      setMediaFiles(data.items || []);
    } catch {
      setMediaFiles([]);
    } finally {
      setMediaLoading(false);
    }
  }, []);

  const filteredMedia = mediaFiles.filter((file) =>
    file.originalName.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    (file.alt || "").toLowerCase().includes(mediaSearch.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            返回博客列表
          </Link>
          <span className="text-slate-300">/</span>
          <h1 className="text-lg font-bold text-slate-900">
            {form.id ? "编辑文章" : "新建文章"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          {saved ? (
            <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
              已保存
            </span>
          ) : null}
          {saveMessage ? <span className="text-sm text-slate-500">{saveMessage}</span> : null}
          {saveError ? <span className="max-w-xs text-right text-sm text-amber-600">{saveError}</span> : null}
          {form.slug && form.status === "published" ? (
            <Link
              href={`/blog/${form.slug}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
            >
              <Eye className="h-4 w-4" />
              查看页面
            </Link>
          ) : null}
          <button
            type="button"
            onClick={() => handleSave(draftActionStatus)}
            disabled={isPending || !form.title || !form.content}
            className="inline-flex items-center gap-1.5 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {draftActionLabel}
          </button>
          <button
            type="button"
            onClick={() => handleSave("published")}
            disabled={isPending || !form.title || !form.content || !form.slug || validation.errors.length > 0}
            className="inline-flex items-center gap-1.5 bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
            立即发布
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <div className="border border-slate-200 bg-white p-5">
            <input
              type="text"
              value={form.title}
              onChange={(event) => handleChange("title", event.target.value)}
              placeholder="输入文章标题..."
              className="w-full border-none bg-transparent text-2xl font-bold text-slate-900 outline-none placeholder:text-slate-300"
            />
            <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
              <span className="shrink-0 text-xs text-slate-400">链接：</span>
              <span className="text-xs font-mono text-blue-600">/blog/</span>
              <input
                type="text"
                value={form.slug}
                onChange={(event) => handleChange("slug", event.target.value)}
                placeholder="文章 slug"
                className="flex-1 border-none bg-transparent text-xs font-mono text-slate-600 outline-none"
              />
            </div>
          </div>

          <div className="flex w-fit gap-1 bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("content")}
              className={`px-4 py-1.5 text-sm font-semibold transition-all ${activeTab === "content" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              内容
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("seo")}
              className={`px-4 py-1.5 text-sm font-semibold transition-all ${activeTab === "seo" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
            >
              SEO
            </button>
          </div>

          {activeTab === "content" ? (
            <div className="space-y-4">
              <div className="border border-slate-200 bg-white p-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  摘要
                </label>
                <textarea
                  value={form.excerpt}
                  onChange={(event) => handleChange("excerpt", event.target.value)}
                  rows={3}
                  placeholder="用于文章卡片和搜索摘要的简短说明..."
                  className="w-full resize-none border-none bg-transparent text-sm text-slate-700 outline-none"
                />
                <p className="mt-1 text-xs text-slate-400">{form.excerpt.length} 字符</p>
              </div>

              <div className="overflow-hidden border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
                  <label className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    文章正文（Markdown）
                  </label>
                  <div className="flex gap-1 bg-slate-100 p-0.5">
                    <button
                      type="button"
                      onClick={() => setEditorMode("edit")}
                      title="编辑"
                      className={`p-1.5 transition-all ${editorMode === "edit" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("split")}
                      title="分栏"
                      className={`p-1.5 transition-all ${editorMode === "split" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                    >
                      <SplitSquareHorizontal className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorMode("preview")}
                      title="预览"
                      className={`p-1.5 transition-all ${editorMode === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-400"}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-100 px-5 py-2">
                  <div className="flex gap-1 bg-slate-100 p-0.5">
                    <button type="button" onClick={() => insertMarkdown("## ", "", "二级标题")} title="二级标题" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Heading2 className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertMarkdown("### ", "", "三级标题")} title="三级标题" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Heading3 className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertMarkdown("**", "**", "加粗文字")} title="加粗" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Bold className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertMarkdown("*", "*", "斜体文字")} title="斜体" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Italic className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => prefixSelectedLines("- ")} title="无序列表" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><List className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => prefixSelectedLines("1. ")} title="有序列表" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><ListOrdered className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => prefixSelectedLines("> ")} title="引用" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Quote className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertMarkdown("[", "](https://)", "链接文字")} title="链接" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Link2 className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => openMediaPicker("content")} title="插入图片" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><ImageIcon className="h-3.5 w-3.5" /></button>
                    <button type="button" onClick={() => insertMarkdown("\n\n---\n\n")} title="分隔线" className="p-1.5 text-slate-500 transition-all hover:bg-white hover:text-slate-900 hover:shadow-sm"><Minus className="h-3.5 w-3.5" /></button>
                  </div>
                </div>

                <div className={editorMode === "split" ? "grid grid-cols-2 divide-x divide-slate-100" : ""}>
                  {editorMode === "edit" || editorMode === "split" ? (
                    <textarea
                      ref={contentRef}
                      value={form.content}
                      onChange={(event) => handleChange("content", event.target.value)}
                      onPaste={handleContentPaste}
                      rows={24}
                      placeholder="请使用 Markdown 编写文章..."
                      className="w-full resize-y border-none bg-transparent p-5 font-mono text-sm leading-relaxed text-slate-700 outline-none"
                    />
                  ) : null}
                  {editorMode === "preview" || editorMode === "split" ? (
                    <div className="max-h-[600px] overflow-auto p-5">
                      <div className="prose prose-slate prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm, remarkLineBreaks]}>
                          {form.content || "*开始输入后可在这里预览...*"}
                        </ReactMarkdown>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="border border-slate-200 bg-white p-4">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  标签
                </label>
                <input
                  type="text"
                  value={form.tags}
                  onChange={(event) => handleChange("tags", event.target.value)}
                  placeholder="例如：bpa-free, thermal paper, compliance"
                  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 border border-blue-100 bg-blue-50 p-4">
                <div>
                  <p className="text-sm font-bold text-slate-900">SEO 自动生成</p>
                  <p className="mt-1 text-xs text-slate-500">
                    根据当前文章内容生成 SEO 标题、描述和关键词建议。
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleGenerateSeo}
                  disabled={!form.title && !form.content}
                  className="inline-flex shrink-0 items-center gap-1.5 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  <Search className="h-4 w-4" />
                  生成
                </button>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  SEO 标题
                </label>
                <input
                  type="text"
                  value={form.seoTitle}
                  onChange={(event) => handleChange("seoTitle", event.target.value)}
                  placeholder="SEO 标题（建议不超过 60 个字符）"
                  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
                />
                <div className="mt-1 flex justify-between">
                  <p className="text-xs text-slate-400">{form.seoTitle.length} 字符</p>
                  <p className={`text-xs ${form.seoTitle.length > 60 ? "text-red-500" : form.seoTitle.length >= 50 ? "text-emerald-600" : "text-slate-400"}`}>
                    {form.seoTitle.length > 60 ? "过长" : form.seoTitle.length >= 50 ? "合适" : "建议 50-60"}
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  Meta 描述
                </label>
                <textarea
                  value={form.seoDescription}
                  onChange={(event) => handleChange("seoDescription", event.target.value)}
                  rows={3}
                  placeholder="Meta 描述（建议 120-165 个字符）"
                  className="w-full resize-none border-none bg-transparent text-sm text-slate-700 outline-none"
                />
                <div className="mt-1 flex justify-between">
                  <p className="text-xs text-slate-400">{form.seoDescription.length} 字符</p>
                  <p className={`text-xs ${form.seoDescription.length > 165 ? "text-red-500" : form.seoDescription.length >= 120 ? "text-emerald-600" : "text-slate-400"}`}>
                    {form.seoDescription.length > 165 ? "过长" : form.seoDescription.length >= 120 ? "合适" : "建议 120-165"}
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 bg-white p-5">
                <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
                  关键词
                </label>
                <input
                  type="text"
                  value={form.seoKeywords}
                  onChange={(event) => handleChange("seoKeywords", event.target.value)}
                  placeholder="例如：thermal paper manufacturer, receipt paper rolls"
                  className="w-full border-none bg-transparent text-sm text-slate-700 outline-none"
                />
              </div>

              {(form.seoTitle || form.title) ? (
                <div className="border border-slate-200 bg-slate-50 p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-400">
                    搜索预览
                  </p>
                  <p className="truncate text-base font-medium text-blue-700">
                    {form.seoTitle || form.title} | Zhixin Paper
                  </p>
                  <p className="mt-0.5 text-xs text-green-700">
                    www.zhixinpaper.com / blog / {form.slug || "slug"}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">
                    {form.seoDescription || form.excerpt || "Meta 描述预览..."}
                  </p>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="border border-slate-200 bg-white p-4">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-400">
              状态
            </label>
            <select
              value={form.status}
              onChange={(event) => handleChange("status", event.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
              <option value="archived">已归档</option>
            </select>
            <p className="mt-2 text-xs text-slate-400">
              只有草稿支持定时发布；已发布和已归档文章不会保留定时设置。
            </p>
          </div>

          <div className="border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="block text-xs font-bold uppercase tracking-wide text-slate-400">
                定时发布
              </label>
              {form.scheduledAt ? (
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600">
                  {form.publishApproved ? "已批准" : "待审核"}
                </span>
              ) : null}
            </div>
            <input
              type="datetime-local"
              value={form.scheduledAt}
              onChange={(event) => handleScheduledAtChange(event.target.value)}
              disabled={form.status !== "draft"}
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            />
            <label className="mt-3 flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={form.publishApproved}
                onChange={(event) => handlePublishApprovalChange(event.target.checked)}
                disabled={form.status !== "draft" || !form.scheduledAt}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span>
                到达预定时间后，允许系统自动发布。
              </span>
            </label>
            <p className="mt-2 text-xs text-slate-400">
              活动导入的文章默认保留为定时草稿，需人工复核后再开启自动发布。
            </p>
          </div>

          {form.campaignId ? (
            <div className="border border-violet-200 bg-violet-50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-violet-700">
                活动来源
              </p>
              <p className="rounded bg-white px-3 py-2 font-mono text-xs text-violet-700">
                {form.campaignId}
              </p>
              <p className="mt-2 text-xs text-violet-600">
                这篇文章来自活动批量导入，编辑时应尽量保持其买家意图和主题范围不偏离原活动。
              </p>
            </div>
          ) : null}

          <div className="border border-slate-200 bg-white p-4">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-400">
              分类
            </label>
            <select
              value={form.category}
              onChange={(event) => handleChange("category", event.target.value)}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">请选择分类...</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="border border-slate-200 bg-white p-4">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-400">
              阅读时长
            </label>
            <input
              type="text"
              value={form.readTime}
              onChange={(event) => handleChange("readTime", event.target.value)}
              placeholder="例如：8 min"
              className="w-full border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.content && !form.readTime ? (
              <button
                type="button"
                onClick={() => {
                  const mins = Math.max(1, Math.round(form.content.split(/\s+/).length / 200));
                  handleChange("readTime", `${mins} min`);
                }}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                自动计算
              </button>
            ) : null}
          </div>

          <div className="border border-slate-200 bg-white p-4">
            <label className="mb-3 block text-xs font-bold uppercase tracking-wide text-slate-400">
              封面图
            </label>
            {form.coverImage ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={form.coverImage} alt="封面图" className="h-36 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleChange("coverImage", "")}
                  className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => openMediaPicker("cover")}
                className="flex h-28 w-full flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-200 text-slate-400 transition-colors hover:border-blue-400 hover:text-blue-500"
              >
                <ImageIcon className="h-6 w-6" />
                <span className="text-xs font-medium">从媒体库选择</span>
              </button>
            )}
            {form.coverImage ? (
              <button
                type="button"
                onClick={() => openMediaPicker("cover")}
                className="mt-2 w-full text-center text-xs text-blue-600 hover:underline"
              >
                更换图片
              </button>
            ) : null}
          </div>

          <div className="border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                发布校验
              </p>
              <div className="flex items-center gap-2 text-xs">
                <span className={`rounded-full px-2 py-0.5 font-semibold ${validation.errors.length > 0 ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                  {validation.errors.length} 个阻塞项
                </span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 font-semibold text-slate-600">
                  {validation.warnings.length} 个提醒
                </span>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
              <div className="rounded bg-white px-3 py-2">
                <span className="block text-[10px] uppercase tracking-wide text-slate-400">字数</span>
                <span className="font-semibold text-slate-700">{validation.wordCount}</span>
              </div>
              <div className="rounded bg-white px-3 py-2">
                <span className="block text-[10px] uppercase tracking-wide text-slate-400">H2 小节</span>
                <span className="font-semibold text-slate-700">{validation.h2Count}</span>
              </div>
              <div className="rounded bg-white px-3 py-2">
                <span className="block text-[10px] uppercase tracking-wide text-slate-400">FAQ</span>
                <span className="font-semibold text-slate-700">{validation.hasFaq ? "有" : "无"}</span>
              </div>
              <div className="rounded bg-white px-3 py-2">
                <span className="block text-[10px] uppercase tracking-wide text-slate-400">AI 风险</span>
                <span className="font-semibold text-slate-700">{formatAiRiskLabel(validation.qualityAudit.aiStyleRisk)}</span>
              </div>
            </div>

            {validation.errors.length > 0 ? (
              <div className="mb-3 space-y-2">
                {validation.errors.map((issue) => (
                  <div key={issue.code} className="flex gap-2 rounded bg-amber-50 px-3 py-2 text-xs text-amber-700">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{issue.message}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-3 flex items-center gap-2 rounded bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>已满足发布要求，剩余仅为非阻塞提醒。</span>
              </div>
            )}

            {validation.warnings.length > 0 ? (
              <div className="space-y-2">
                {validation.warnings.slice(0, 4).map((issue) => (
                  <div key={issue.code} className="rounded bg-white px-3 py-2 text-xs text-slate-600">
                    {issue.message}
                  </div>
                ))}
                {validation.warnings.length > 4 ? (
                  <p className="text-xs text-slate-400">
                    还有 {validation.warnings.length - 4} 条提醒未展开显示。
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {showMediaPicker ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[80vh] w-full max-w-3xl flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <h3 className="font-bold text-slate-900">
                {mediaPickerTarget === "cover" ? "选择封面图" : "插入图片"}
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaPicker(false)}
                className="flex h-8 w-8 items-center justify-center transition-colors hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="border-b border-slate-100 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={mediaSearch}
                  onChange={(event) => setMediaSearch(event.target.value)}
                  placeholder="搜索图片..."
                  className="w-full border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {mediaLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
                </div>
              ) : filteredMedia.length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <ImageIcon className="mx-auto mb-2 h-10 w-10 opacity-30" />
                  <p className="text-sm">未找到图片</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {filteredMedia.map((file) => (
                    <button
                      key={file.id}
                      type="button"
                      onClick={() => {
                        if (mediaPickerTarget === "content") {
                          insertImageMarkdown(file);
                        } else {
                          handleChange("coverImage", file.url);
                        }
                        setShowMediaPicker(false);
                      }}
                      className="group relative aspect-square overflow-hidden border-2 border-transparent transition-all hover:border-blue-500"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={file.url} alt={file.alt || file.originalName} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
                        <span className="bg-blue-600 px-2 py-1 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                          选择
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
