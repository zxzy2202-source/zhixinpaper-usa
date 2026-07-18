"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { ArrowRight, Clock, BookOpen, ShieldCheck, GraduationCap, Package, ShoppingCart, Leaf, Wrench, BarChart2, Newspaper } from "lucide-react";

// 按分类返回渐变色和图标
function getCategoryStyle(category: string): { gradient: string; icon: React.ReactNode; label: string } {
  const cat = category.toUpperCase();
  if (cat === "COMPLIANCE") return {
    gradient: "from-blue-600/20 via-blue-400/10 to-slate-100",
    icon: <ShieldCheck className="w-12 h-12 text-blue-400/60" />,
    label: "COMPLIANCE",
  };
  if (cat === "EDUCATION") return {
    gradient: "from-violet-600/20 via-violet-400/10 to-slate-100",
    icon: <GraduationCap className="w-12 h-12 text-violet-400/60" />,
    label: "EDUCATION",
  };
  if (cat === "PRODUCTS" || cat === "PRODUCT GUIDE") return {
    gradient: "from-emerald-600/20 via-emerald-400/10 to-slate-100",
    icon: <Package className="w-12 h-12 text-emerald-400/60" />,
    label: "PRODUCTS",
  };
  if (cat === "E-COMMERCE") return {
    gradient: "from-orange-600/20 via-orange-400/10 to-slate-100",
    icon: <ShoppingCart className="w-12 h-12 text-orange-400/60" />,
    label: "E-COMMERCE",
  };
  if (cat === "SUSTAINABILITY") return {
    gradient: "from-green-600/20 via-green-400/10 to-slate-100",
    icon: <Leaf className="w-12 h-12 text-green-400/60" />,
    label: "SUSTAINABILITY",
  };
  if (cat === "TECHNICAL TIPS") return {
    gradient: "from-cyan-600/20 via-cyan-400/10 to-slate-100",
    icon: <Wrench className="w-12 h-12 text-cyan-400/60" />,
    label: "TECHNICAL",
  };
  if (cat === "MARKET INSIGHTS" || cat === "INDUSTRY NEWS") return {
    gradient: "from-amber-600/20 via-amber-400/10 to-slate-100",
    icon: <BarChart2 className="w-12 h-12 text-amber-400/60" />,
    label: "INSIGHTS",
  };
  return {
    gradient: "from-slate-200 via-slate-100 to-white",
    icon: <Newspaper className="w-12 h-12 text-slate-300" />,
    label: category.toUpperCase(),
  };
}

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

export default function BlogListClient({ posts }: Props) {
  const categories = ["ALL", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const filteredPosts =
    activeCategory === "ALL"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
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
            <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
              <BookOpen className="w-4 h-4" />
              <span>{posts.length} articles published</span>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="pt-12 pb-20 bg-white">
          <div className="container-site">
            {/* Category filter */}
            <div className="flex flex-wrap gap-3 mb-10">
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
                  {cat === "ALL" ? "All" : cat}
                </button>
              ))}
            </div>

            {/* Post count */}
            <p className="text-slate-400 text-sm mb-8">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
              {activeCategory !== "ALL" && ` in ${activeCategory}`}
            </p>

            {filteredPosts.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="text-lg font-medium">No articles yet</p>
                <p className="text-sm mt-1">Check back soon for new content.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className=" border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all group overflow-hidden"
                  >
                    {/* Cover image */}
                    {post.coverImage ? (
                      <div className="w-full h-44 overflow-hidden bg-slate-100">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (() => {
                      const style = getCategoryStyle(post.category);
                      return (
                        <div className={`w-full h-44 bg-gradient-to-br ${style.gradient} flex flex-col items-center justify-center gap-2 relative overflow-hidden`}>
                          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
                          {style.icon}
                          <span className="text-[9px] tracking-[0.2em] font-bold text-slate-400 uppercase">{style.label}</span>
                        </div>
                      );
                    })()}

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
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
                        {post.fromDB && (
                          <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase border bg-violet-500/10 text-violet-600 border-violet-500/25">
                            Latest
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
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
