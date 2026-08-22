"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
import { BLOG_CONTENT } from "@/lib/blog-content";
import { BLOG_INDUSTRY_LINKS } from "@/lib/blog-industry-links";
import { BLOG_PRODUCT_LINKS } from "@/lib/blog-product-links";
import { ArrowLeft, ArrowRight, BookOpen, Calendar, Check, Clock, Link2, Mail, Search, Send, Share2, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkLineBreaks } from "@/lib/remarkLineBreaks";

interface DBPost { id: number; slug: string; title: string; excerpt: string; content: string; category: string; tags: string; readTime: string; coverImage: string | null; publishedAt: string | null; createdAt: string; status: string; }
interface RelatedPost { slug: string; title: string; category: string; readTime: string; date: string; }
interface Props { slug: string; dbPost: DBPost | null; publishedDbPosts?: RelatedPost[]; }
type ProductLink = { href: string; label: string; description: string };
type IndustryLink = { slug: string; label: string; description: string };
type ArticleHeaderProps = { slug: string; title: string; excerpt: string; category: string; readTime: string; date: string; tags?: string[]; coverImage?: string | null; };

const CATEGORY_IMAGES: Record<string, string> = {
  Compliance: "/images/compliance-certifications.jpg",
  Education: "/images/thermal-rolls-product.jpg",
  Products: "/images/thermal-rolls-product.jpg",
  "E-Commerce": "/images/thermal-labels-product.jpg",
};

function removeLeadingMarkdownTitle(content: string, title: string) {
  const lines = content.split(/\r?\n/);
  const firstContentLine = lines.findIndex((line) => line.trim().length > 0);
  if (firstContentLine === -1) return content;
  const heading = lines[firstContentLine].match(/^#\s+(.+)$/);
  if (heading?.[1].trim().toLocaleLowerCase() !== title.trim().toLocaleLowerCase()) return content;
  lines.splice(firstContentLine, 1);
  return lines.join("\n").trimStart();
}

function formatDate(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function extractHeadings(content: string) {
  return content.split(/\r?\n/).map((line) => line.match(/^##\s+(.+)$/)?.[1]?.trim()).filter((heading): heading is string => Boolean(heading)).slice(0, 8);
}

function headingId(heading: string) {
  return `article-section-${heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;
}

function ShareLinks({ slug, title }: { slug: string; title: string }) {
  const url = `https://www.zhixinpaper.com/blog/${slug}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const items = [
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, icon: Share2 },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, icon: Send },
    { label: "Email this article", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`, icon: Mail },
    { label: "Open canonical article URL", href: url, icon: Link2 },
  ];
  return <div className="flex items-center gap-2" aria-label="Share this article">
    <span className="mr-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#87918c]">Share</span>
    {items.map(({ label, href, icon: Icon }) => <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} aria-label={label} title={label} className="grid h-9 w-9 place-items-center rounded-full border border-[#ded6c8] bg-white text-[#0f5f5c] transition hover:border-[#0f5f5c] hover:bg-[#eef5ef]"><Icon className="h-4 w-4" aria-hidden="true" /></a>)}
  </div>;
}

function ArticleHeader({ slug, title, excerpt, category, readTime, date, tags = [], coverImage }: ArticleHeaderProps) {
  return <>
    <div className="border-b border-[#e4e8e7] bg-white">
      <div className="mx-auto max-w-[1380px] px-5 py-5 sm:px-8 lg:px-10">
        <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-sm text-[#687772]"><Link href="/" className="font-medium text-[#0f5f5c] hover:underline">Home</Link><span aria-hidden="true">»</span><Link href="/blog" className="font-medium text-[#0f5f5c] hover:underline">Blog</Link><span aria-hidden="true">»</span><span className="truncate text-[#14211f]">{title}</span></nav>
      </div>
    </div>
    <header className="bg-white">
      <div className="mx-auto max-w-[1380px] px-5 pb-8 pt-12 sm:px-8 md:pb-10 md:pt-16 lg:px-10">
        <div className="max-w-4xl">
          <h1 className="text-[2.1rem] font-bold leading-[1.08] text-[#14211f] md:text-5xl">{title}</h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#687772]"><span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" aria-hidden="true" />{formatDate(date)}</span><span aria-hidden="true">/</span><span>By Zhixin Paper</span><span aria-hidden="true">/</span><span className="font-medium text-[#0f5f5c]">{category}</span><span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{readTime} read</span></div>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#4f5f5a] md:text-lg md:leading-8">{excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4"><ShareLinks slug={slug} title={title} />{tags.length > 0 && <div className="flex flex-wrap items-center gap-2 text-xs text-[#87918c]"><Tag className="h-4 w-4" aria-hidden="true" />{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>}</div>
        </div>
        {coverImage && <div className="relative mt-10 aspect-[16/7] max-w-4xl overflow-hidden bg-[#eef2f0]"><Image src={coverImage} alt="" fill priority sizes="(min-width: 1024px) 900px, 100vw" className="object-cover" /></div>}
      </div>
    </header>
  </>;
}

function InquirySidebar() {
  return <section className="border border-[#e1e6e4] bg-white p-5 shadow-[0_10px_28px_rgba(20,33,31,0.05)]"><h2 className="text-lg font-bold text-[#14211f]">Send Your Inquiry Today</h2><p className="mt-2 text-sm leading-6 text-[#687772]">Share your roll or label specification and our team will route it to the right product path.</p><Link href="/quote" className="mt-5 flex min-h-11 items-center justify-center gap-2 bg-[#0f5f5c] px-4 text-sm font-bold text-white transition hover:bg-[#0a4745]">Start a quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></section>;
}

function ArticleSidebar({ related, outline, category }: { related: RelatedPost[]; outline: string[]; category: string }) {
  const popular = related.length > 0 ? related : BLOG_POSTS.slice(0, 3).map((post) => ({ slug: post.slug, title: post.title, category: post.category, readTime: post.readTime, date: post.date }));
  return <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
    <InquirySidebar />
    <section className="border border-[#e1e6e4] bg-white"><h2 className="flex items-center justify-between bg-[#0f6af2] px-4 py-3 text-lg font-bold text-white"><span className="inline-flex items-center gap-2"><Search className="h-4 w-4" aria-hidden="true" />Search</span><span aria-hidden="true">⌄</span></h2><form action="/blog" method="get" role="search" className="p-3"><label className="sr-only" htmlFor="blog-detail-search">Search blog articles</label><div className="flex border border-[#e1e6e4]"><input id="blog-detail-search" name="q" type="search" placeholder="Search..." className="min-w-0 flex-1 px-3 py-2 text-sm text-[#14211f] outline-none placeholder:text-[#9aa5a0]" /><button type="submit" aria-label="Search" title="Search" className="px-3 text-[#14211f]"><Search className="h-4 w-4" aria-hidden="true" /></button></div></form></section>
    {outline.length > 0 && <section className="border border-[#e1e6e4] bg-white"><h2 className="bg-[#0f6af2] px-4 py-3 text-lg font-bold text-white">On this page</h2><ol className="space-y-2 p-4 text-sm leading-5 text-[#687772]">{outline.map((heading) => <li key={heading}><a href={`#${headingId(heading)}`} className="hover:text-[#0f5f5c]">{heading}</a></li>)}</ol></section>}
    <section className="border border-[#e1e6e4] bg-white"><h2 className="bg-[#0f6af2] px-4 py-3 text-lg font-bold text-white">Most Popular</h2><nav aria-label="Most popular articles" className="divide-y divide-[#eef1ef] p-2">{popular.slice(0, 3).map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="block px-2 py-3 text-sm font-medium leading-5 text-[#14211f] transition hover:text-[#0f5f5c]">{post.title}</Link>)}</nav></section>
    <section className="border border-[#e1e6e4] bg-white"><h2 className="bg-[#0f6af2] px-4 py-3 text-lg font-bold text-white">Categories</h2><nav aria-label="Blog categories" className="space-y-2 p-4 text-sm"><Link href="/blog" className="block text-[#0f5f5c] hover:underline">All articles</Link><Link href={`/blog?category=${encodeURIComponent(category)}`} className="block text-[#14211f] hover:text-[#0f5f5c]">{category}</Link></nav></section>
  </aside>;
}

function ProductFit({ links }: { links: ProductLink[] }) {
  if (links.length === 0) return null;
  return <section className="mt-12 border-y border-[#c8bcaa] bg-[#f4f0e8] px-5 py-7 md:px-8" aria-labelledby="related-products-heading"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f5f5c]">Product fit</p><h2 id="related-products-heading" className="mt-2 text-2xl font-bold text-[#14211f]">Continue with the matching specification.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-[#4f5f5a]">Compare construction, application fit, and the information needed for a representative sample or quotation.</p><div className="mt-5 grid gap-3 sm:grid-cols-2">{links.map((product) => <Link key={product.href} href={product.href} className="group border border-[#c8bcaa] bg-white p-4 transition hover:border-[#0f5f5c]"><span className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c]">{product.label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span><span className="mt-2 block text-sm leading-6 text-[#4f5f5a]">{product.description}</span></Link>)}</div></section>;
}

function IndustryFit({ links }: { links: IndustryLink[] }) {
  if (links.length === 0) return null;
  return <section className="mt-12 border-t border-[#ded6c8] pt-8" aria-labelledby="related-industries-heading"><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f5f5c]">Related applications</p><h2 id="related-industries-heading" className="mt-2 text-2xl font-bold text-[#14211f]">Apply this guide to an industry specification.</h2><ul className="mt-5 space-y-3 text-sm leading-6 text-[#4f5f5a]">{links.map((industry) => <li key={industry.slug} className="flex gap-2"><ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[#b9822f]" aria-hidden="true" /><span><Link className="font-bold text-[#0f5f5c] hover:underline" href={`/industries/${industry.slug}`}>{industry.label}</Link>: {industry.description}</span></li>)}</ul><p className="mt-5 text-xs leading-5 text-[#687772]">They do not replace device qualification, document-scope review, or representative sample testing.</p></section>;
}

function ArticleActions() {
  return <div className="mt-12 border-t border-[#e1e6e4] pt-7"><div className="flex flex-wrap gap-3"><Link href="/contact" className="btn-primary">Contact technical team <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/quote" className="btn-outline">Get a quote <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></div></div>;
}

function RelatedPosts({ related }: { related: RelatedPost[] }) {
  const cards = related.slice(0, 2);
  if (cards.length === 0) return null;
  return <section className="mt-16 border-t border-[#e1e6e4] pt-10" aria-labelledby="related-posts-heading"><h2 id="related-posts-heading" className="text-2xl font-bold text-[#14211f] md:text-3xl">Related Posts</h2><div className="mt-7 grid gap-6 md:grid-cols-2">{cards.map((post) => <article key={post.slug} className="group border border-[#e1e6e4] bg-white"><Link href={`/blog/${post.slug}`} className="block"><div className="relative aspect-[16/8] overflow-hidden bg-[#eef2f0]"><Image src={CATEGORY_IMAGES[post.category] || "/images/factory-overview.jpg"} alt="" fill sizes="(min-width: 768px) 430px, 100vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" /></div><div className="p-5"><h3 className="text-lg font-semibold leading-6 text-[#14211f] group-hover:text-[#0f5f5c]">{post.title}</h3><p className="mt-3 text-sm text-[#0f5f5c]">{post.category} / By Zhixin Paper</p></div></Link></article>)}</div></section>;
}

function PreviousPost({ related }: { related: RelatedPost[] }) {
  const previous = related[0];
  if (!previous) return null;
  return <nav aria-label="Post navigation" className="mt-14 border-t border-[#e1e6e4] pt-8"><Link href={`/blog/${previous.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#0f6af2] hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Previous Post</Link></nav>;
}

function InquiryBand() {
  return <section className="mt-16 bg-[#f4f6f8] px-5 py-8 md:px-8"><h2 className="text-2xl font-bold text-[#14211f]">Send Your Inquiry Today</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#687772]">Tell us the product, dimensions, material, quantity, and destination. We will review the right specification before quoting.</p><Link href="/quote" className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 bg-[#0f6af2] px-6 text-sm font-bold text-white transition hover:bg-[#0956c9]">Submit your requirement <Send className="h-4 w-4" aria-hidden="true" /></Link></section>;
}

function ArticleFrame({ header, outline, related, children, productLinks, industryLinks }: { header: ArticleHeaderProps; outline: string[]; related: RelatedPost[]; children: React.ReactNode; productLinks: ProductLink[]; industryLinks: IndustryLink[] }) {
  return <main id="main-content"><ArticleHeader {...header} /><section className="bg-white py-8 md:py-12"><div className="mx-auto grid max-w-[1380px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-10"><article className="min-w-0 max-w-4xl">{children}<ProductFit links={productLinks} /><IndustryFit links={industryLinks} /><ArticleActions /><PreviousPost related={related} /><RelatedPosts related={related} /><InquiryBand /></article><ArticleSidebar related={related} outline={outline} category={header.category} /></div></section></main>;
}

const markdownClasses = "prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-[-0.01em] prose-headings:text-[#14211f] prose-h2:scroll-mt-28 prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-3xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-xl prose-p:my-0 prose-p:leading-8 prose-p:text-[#3f504c] prose-p:mb-6 prose-a:font-semibold prose-a:text-[#0f5f5c] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#14211f] prose-li:text-[#3f504c] prose-li:leading-7 prose-blockquote:border-[#b9822f] prose-blockquote:bg-[#f4f0e8] prose-blockquote:py-1 prose-code:rounded prose-code:bg-[#e7eee9] prose-code:px-1 prose-code:text-[#0f5f5c] prose-pre:bg-[#14211f] prose-img:shadow-md prose-hr:border-[#ded6c8] prose-table:text-sm prose-th:bg-[#e7eee9] prose-th:text-[#14211f]";

export default function BlogPostClient({ slug, dbPost, publishedDbPosts = [] }: Props) {
  const productLinks = BLOG_PRODUCT_LINKS[slug] || [];
  if (dbPost) {
    const date = dbPost.publishedAt || dbPost.createdAt;
    const related = [...publishedDbPosts, ...BLOG_POSTS.filter((post) => post.slug !== slug && post.category === dbPost.category).map((post) => ({ slug: post.slug, title: post.title, category: post.category, readTime: post.readTime, date: post.date }))].filter((post, index, posts) => posts.findIndex((candidate) => candidate.slug === post.slug) === index).filter((post) => post.slug !== slug && post.category === dbPost.category).slice(0, 3);
    const tags = dbPost.tags ? dbPost.tags.split(",").map((tag) => tag.trim()).filter(Boolean) : [];
    const content = removeLeadingMarkdownTitle(dbPost.content, dbPost.title);
    return <ArticleFrame header={{ slug, title: dbPost.title, excerpt: dbPost.excerpt, category: dbPost.category, readTime: dbPost.readTime, date, tags, coverImage: dbPost.coverImage }} outline={extractHeadings(content)} related={related} productLinks={productLinks} industryLinks={[]}><div className={markdownClasses}><ReactMarkdown remarkPlugins={[remarkGfm, remarkLineBreaks]} components={{ h2: ({ children, ...props }) => <h2 id={headingId(String(children))} {...props}>{children}</h2> }}>{content}</ReactMarkdown></div></ArticleFrame>;
  }
  // Static data fallback
  const post = BLOG_POSTS.find((candidate) => candidate.slug === slug);
  if (!post) notFound();
  const industryLinks = BLOG_INDUSTRY_LINKS[slug] || [];
  const content = BLOG_CONTENT.find((candidate) => candidate.slug === slug);
  const related = [...publishedDbPosts, ...BLOG_POSTS.filter((candidate) => candidate.slug !== slug && candidate.category === post.category).map((candidate) => ({ slug: candidate.slug, title: candidate.title, category: candidate.category, readTime: candidate.readTime, date: candidate.date }))].filter((item, index, items) => items.findIndex((candidate) => candidate.slug === item.slug) === index).filter((item) => item.slug !== slug && item.category === post.category).slice(0, 3);
  const fallbackRelated = related.length > 0 ? related : BLOG_POSTS.filter((candidate) => candidate.slug !== slug).slice(0, 3).map((candidate) => ({ slug: candidate.slug, title: candidate.title, category: candidate.category, readTime: candidate.readTime, date: candidate.date }));
  const outline = content?.sections.map((section) => section.heading) || [];
  return <ArticleFrame header={{ slug, title: post.title, excerpt: post.excerpt, category: post.category, readTime: post.readTime, date: post.date, tags: post.tag ? [post.tag] : [] }} outline={outline} related={fallbackRelated} productLinks={productLinks} industryLinks={industryLinks}>{content ? <div className="space-y-10"><p className="border-l-2 border-[#b9822f] pl-5 text-xl leading-8 text-[#14211f] md:text-2xl">{content.intro}</p>{content.sections.map((section) => <section key={section.heading} id={headingId(section.heading)} className="scroll-mt-28"><h2 className="mb-5 text-3xl font-bold text-[#14211f]">{section.heading}</h2><div className="space-y-6 text-lg leading-8 text-[#3f504c]">{section.body.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}</div></section>)}<section className="border-t border-[#ded6c8] pt-8"><h2 className="flex items-center gap-2 text-2xl font-bold text-[#14211f]"><BookOpen className="h-5 w-5 text-[#0f5f5c]" aria-hidden="true" /> Conclusion</h2><p className="mt-4 text-lg leading-8 text-[#3f504c]">{content.conclusion}</p></section><section className="bg-[#e7eee9] px-5 py-7 md:px-8"><h2 className="text-2xl font-bold text-[#14211f]">Key takeaways</h2><ul className="mt-5 space-y-3">{content.keyTakeaways.map((point) => <li key={point} className="flex gap-3 text-lg leading-7 text-[#3f504c]"><Check className="mt-1 h-5 w-5 shrink-0 text-[#0f5f5c]" aria-hidden="true" />{point}</li>)}</ul></section></div> : <p className="border-l-2 border-[#b9822f] pl-5 text-xl leading-8 text-[#14211f]">{post.excerpt}</p>}</ArticleFrame>;
}
