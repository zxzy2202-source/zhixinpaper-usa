"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { BLOG_POSTS } from "@/lib/data";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogClient() {
  const categories = [...new Set(BLOG_POSTS.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredPosts =
    activeCategory === "ALL"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Blog</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Thermal Paper Guides & News
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Expert knowledge base for thermal paper distributors, importers, and industry professionals. Compliance guides, product specifications, and market insights.
            </p>
          </div>
        </section>

        <section className="pt-32 pb-20 bg-white">
          <div className="container-site">
            {/* Category filter */}
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setActiveCategory("ALL")}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all  ${
                  activeCategory === "ALL"
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold transition-all  ${
                    activeCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-slate-200 text-slate-500 hover:border-blue-400 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Post count */}
            <p className="text-slate-400 text-sm mb-8">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              {activeCategory !== "ALL" && ` in ${activeCategory}`}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className=" border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 text-[10px] tracking-widest uppercase text-blue-600">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 text-xs">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    {post.tag === "New" && (
                      <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase border bg-emerald-500/10 text-emerald-600 border-emerald-500/25">
                        New
                      </span>
                    )}
                  </div>
                  <h2 className="font-bold text-slate-900 text-xl leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <span className="text-slate-400 text-xs">{post.date}</span>
                    <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wide">
                      Read More <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
