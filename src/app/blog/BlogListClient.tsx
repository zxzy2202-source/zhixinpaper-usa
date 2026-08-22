"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock,
  FileSearch,
  PackageCheck,
  Search,
  Send,
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface PostItem {
  id: number | null;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  readTime: string;
  coverImage: string | null;
  date: string;
  tag: string | null;
  fromDB: boolean;
}

interface Props {
  posts: PostItem[];
}

const CATEGORY_IMAGES: Record<string, string> = {
  COMPLIANCE: "/images/compliance-certifications.jpg",
  EDUCATION: "/images/thermal-rolls-product.jpg",
  "E-COMMERCE": "/images/thermal-labels-product.jpg",
  PRODUCTS: "/images/thermal-rolls-product.jpg",
  "PRODUCT GUIDE": "/images/thermal-rolls-product.jpg",
  SUSTAINABILITY: "/images/factory-overview.jpg",
  "TECHNICAL TIPS": "/images/factory-overview.jpg",
  "MARKET INSIGHTS": "/images/factory-overview.jpg",
  "INDUSTRY NEWS": "/images/factory-overview.jpg",
};

const RFQ_CHECKLIST = [
  "Roll size or printer model",
  "Paper grade, label material, or adhesive",
  "Packing format and estimated volume",
  "Destination and required documents",
];

function getPostImage(post: PostItem) {
  return post.coverImage || CATEGORY_IMAGES[post.category.toUpperCase()] || "/images/factory-overview.jpg";
}

function formatDate(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function SearchField({
  id,
  query,
  onChange,
}: {
  id: string;
  query: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        Search blog articles
      </label>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687772]" aria-hidden="true" />
      <input
        id={id}
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search guides and topics"
        className="h-12 w-full border border-[#c8bcaa] bg-white pl-11 pr-4 text-sm text-[#14211f] outline-none transition-colors placeholder:text-[#87918c] focus:border-[#0f5f5c]"
      />
    </div>
  );
}

function ArticleMeta({ post }: { post: PostItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#687772]">
      <span className="font-semibold text-[#0f5f5c]">{post.category}</span>
      <span aria-hidden="true">/</span>
      <span>{formatDate(post.date)}</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {post.readTime}
      </span>
    </div>
  );
}

function ArticleCard({ post, priority = false }: { post: PostItem; priority?: boolean }) {
  return (
    <article className="overflow-hidden border border-[#ded6c8] bg-white transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#0f5f5c]/35 hover:shadow-[0_16px_38px_rgba(20,33,31,0.08)]">
      <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col">
        <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
          <ArticleMeta post={post} />
          <h2 className="mt-4 line-clamp-3 text-xl leading-snug text-[#14211f] transition-colors group-hover:text-[#0f5f5c] sm:text-2xl">
            {post.title}
          </h2>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden bg-[#e7eee9]">
          <Image
            src={getPostImage(post)}
            alt={`${post.title} article cover`}
            fill
            priority={priority}
            sizes="(min-width: 1024px) calc((100vw - 500px) / 2), 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
          <p className="line-clamp-3 text-sm leading-6 text-[#687772]">
            {post.excerpt}
          </p>
          <span className="mt-auto flex min-h-11 w-full items-center justify-center gap-2 bg-[#0f5f5c] px-4 pt-px text-sm font-bold text-white transition-colors group-hover:bg-[#0b4c4a]">
            Keep reading
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  );
}

export default function BlogListClient({ posts }: Props) {
  const categories = ["ALL", ...Array.from(new Set(posts.map((post) => post.category)))];
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === "ALL" || post.category === activeCategory;
    const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags}`.toLowerCase();
    return matchesCategory && (!normalizedQuery || searchText.includes(normalizedQuery));
  });

  const recommendedPosts = posts.slice(0, 4);

  return (
    <>
      <Header />
      <main id="main-content" className="bg-[#fbfaf6]">
        <section className="border-b border-[#ded6c8] bg-[#f4f0e8] pt-24 sm:pt-28">
          <div className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14 xl:px-10 2xl:px-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#687772]">
              <Link href="/" className="transition-colors hover:text-[#0f5f5c]">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/blog" className="transition-colors hover:text-[#0f5f5c]">Resources</Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-[#14211f]">Blog</span>
            </nav>

            <div className="mt-7 max-w-4xl">
              <h1 className="text-4xl leading-[1.03] text-[#14211f] md:text-5xl lg:text-[56px]">
                Thermal Paper Guides &amp; News
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[#4f5f5a] sm:text-lg sm:leading-8">
                Practical guidance for distributors, importers, and operations teams comparing thermal paper rolls, labels, printer fit, compliance files, and supply requirements.
              </p>
              <div className="mt-5 inline-flex items-center gap-2 text-sm text-[#687772]">
                <BookOpen className="h-4 w-4 text-[#9c661d]" aria-hidden="true" />
                <span>{posts.length} articles published</span>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:px-10 2xl:px-12">
          <div className="mb-6 lg:hidden">
            <SearchField id="blog-search-mobile" query={query} onChange={setQuery} />
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:pb-0">
            {categories.map((category) => {
              const count = category === "ALL" ? posts.length : posts.filter((post) => post.category === category).length;
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`shrink-0 border px-4 py-2.5 text-xs font-bold transition-colors ${
                    isActive
                      ? "border-[#0f5f5c] bg-[#0f5f5c] text-white"
                      : "border-[#c8bcaa] bg-white text-[#4f5f5a] hover:border-[#0f5f5c] hover:text-[#0f5f5c]"
                  }`}
                >
                  {category === "ALL" ? "All topics" : category}
                  <span className={`ml-1.5 ${isActive ? "text-white/70" : "text-[#87918c]"}`}>{count}</span>
                </button>
              );
            })}
          </div>

          <div className="grid w-full items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">
            <div className="min-w-0">
              <div className="mb-5 flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[#14211f]" aria-live="polite">
                  {filteredPosts.length} {filteredPosts.length === 1 ? "guide" : "guides"}
                  {activeCategory !== "ALL" ? ` in ${activeCategory}` : ""}
                </p>
                {(query || activeCategory !== "ALL") && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveCategory("ALL");
                    }}
                    className="text-xs font-semibold text-[#0f5f5c] hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {filteredPosts.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {filteredPosts.map((post, index) => (
                    <ArticleCard key={post.slug} post={post} priority={index < 2} />
                  ))}
                </div>
              ) : (
                <div className="border border-[#ded6c8] bg-white px-6 py-16 text-center">
                  <FileSearch className="mx-auto h-9 w-9 text-[#9c661d]" aria-hidden="true" />
                  <h2 className="mt-4 text-xl text-[#14211f]">No matching guides</h2>
                  <p className="mt-2 text-sm text-[#687772]">Try another search term or clear the topic filter.</p>
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28">
              <section className="bg-[#101b19] p-6 text-white sm:p-7">
                <div className="flex h-10 w-10 items-center justify-center bg-[#d6b273] text-[#101b19]">
                  <PackageCheck className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl leading-tight text-white">Turn research into a quote</h2>
                <p className="mt-3 text-sm leading-6 text-[#c7d0cb]">
                  Share the specification behind your sourcing question so our team can review the right product path.
                </p>
                <ul className="mt-5 space-y-3">
                  {RFQ_CHECKLIST.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-5 text-[#d9dfda]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d6b273]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid gap-3">
                  <Link href="/quote" className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-5 text-sm font-bold text-white transition-colors hover:bg-[#7d4f16]">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Start an RFQ
                  </Link>
                  <Link href="/samples" className="inline-flex min-h-12 items-center justify-center border border-white/25 px-5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/5">
                    Request samples
                  </Link>
                </div>
              </section>

              <section className="hidden border border-[#ded6c8] bg-white p-5 lg:block">
                <h2 className="mb-4 text-base text-[#14211f]">Search the knowledge base</h2>
                <SearchField id="blog-search-desktop" query={query} onChange={setQuery} />
              </section>

              <section className="border border-[#ded6c8] bg-white p-5">
                <h2 className="text-base text-[#14211f]">Browse topics</h2>
                <div className="mt-3 divide-y divide-[#ebe5d9]">
                  {categories.slice(1).map((category) => {
                    const count = posts.filter((post) => post.category === category).length;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm text-[#4f5f5a] transition-colors hover:text-[#0f5f5c]"
                      >
                        <span>{category}</span>
                        <span className="tabular-nums text-xs text-[#87918c]">{count}</span>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="border border-[#ded6c8] bg-white p-5">
                <h2 className="text-base text-[#14211f]">Recommended starting points</h2>
                <div className="mt-4 divide-y divide-[#ebe5d9]">
                  {recommendedPosts.map((post, index) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex gap-3 py-4 first:pt-0 last:pb-0">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#f4f0e8] text-xs font-bold text-[#9c661d]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className="line-clamp-2 text-sm font-semibold leading-5 text-[#14211f] transition-colors group-hover:text-[#0f5f5c]">{post.title}</span>
                        <span className="mt-1 block text-xs text-[#87918c]">{post.readTime}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
