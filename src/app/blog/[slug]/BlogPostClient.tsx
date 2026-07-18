"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import CTABanner from "@/components/ui/CTABanner";
import { BLOG_POSTS } from "@/lib/data";
import { BLOG_CONTENT } from "@/lib/blog-content";
import { ArrowRight, Clock, Calendar, CheckCircle, BookOpen, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkLineBreaks } from "@/lib/remarkLineBreaks";

interface DBPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  coverImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  status: string;
}

interface Props {
  slug: string;
  dbPost: DBPost | null;
}

export default function BlogPostClient({ slug, dbPost }: Props) {
  const isPilot = slug === "what-is-thermal-paper";

  if (dbPost) {
    const publishDate = dbPost.publishedAt || dbPost.createdAt;
    const formattedDate = new Date(publishDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const tagList = dbPost.tags ? dbPost.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
    const related = BLOG_POSTS.filter((p) => p.category === dbPost.category).slice(0, 3);

    return (
      <main id="main-content" className={isPilot ? "pilot-brand-page pilot-article-page" : undefined}>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-slate-500 truncate max-w-xs">{dbPost.title}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">{dbPost.category}</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock className="w-3 h-3" />{dbPost.readTime} read</span>
              <span className="flex items-center gap-1 text-slate-400 text-xs"><Calendar className="w-3 h-3" />{formattedDate}</span>
            </div>
            <h1 className="font-bold text-slate-900 text-3xl md:text-5xl leading-tight max-w-4xl mb-6">{dbPost.title}</h1>
            <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">{dbPost.excerpt}</p>
            {tagList.length > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                {tagList.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {dbPost.coverImage && (
          <div className="max-w-6xl mx-auto px-6 mt-8 mb-0">
            <img src={dbPost.coverImage} alt={dbPost.title} className="w-full max-h-96 object-cover  shadow-lg" />
          </div>
        )}

        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <article className="lg:col-span-2">
                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-ul:text-slate-600 prose-ol:text-slate-600 prose-li:my-1 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50  prose-blockquote:py-1 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1  prose-pre:bg-slate-900  prose-img:shadow-md prose-hr:border-slate-200 prose-table:text-sm prose-th:bg-slate-100 prose-th:text-slate-700">
                  <ReactMarkdown remarkPlugins={[remarkGfm, remarkLineBreaks]}>{dbPost.content}</ReactMarkdown>
                </div>
                <div className="mt-12 p-6 bg-gradient-to-r from-blue-600 to-blue-700  text-white">
                  <h3 className="font-bold text-xl mb-2">Need Expert Guidance?</h3>
                  <p className="text-blue-100 text-sm mb-4">Contact our technical team for detailed compliance documentation, product specifications, or a custom quote for your market.</p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold  hover:bg-blue-50 transition-colors text-sm">Contact Us <ArrowRight className="w-4 h-4" /></Link>
                    <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white/50 text-white font-semibold  hover:bg-white/10 transition-all text-sm">Get Quote</Link>
                  </div>
                </div>
              </article>
              <aside>
                <div className="bg-white border border-slate-200  p-6 mb-6 sticky top-24 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.length > 0 ? related.map((p) => (
                      <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-semibold tracking-widest uppercase ">{p.category}</span>
                        </div>
                        <h4 className="font-semibold text-slate-700 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{p.title}</h4>
                        <p className="text-slate-400 text-xs mt-1">{p.readTime} · {p.date}</p>
                      </Link>
                    )) : <p className="text-slate-400 text-sm">More articles coming soon.</p>}
                  </div>
                  <div className="mt-5 pt-5 border-t border-slate-200">
                    <Link href="/blog" className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide hover:gap-3 transition-all">All Articles <ArrowRight className="w-3.5 h-3.5" /></Link>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-100  p-6">
                  <h3 className="font-bold text-slate-900 text-sm mb-3">Quick Links</h3>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: "Request a Sample", href: "/samples" },
                      { label: "Get a Quote", href: "/quote" },
                      { label: "Compliance Certificates", href: "/compliance/certificates" },
                      { label: "FAQ", href: "/faq" },
                      { label: "Contact Us", href: "/contact" },
                    ].map((link) => (
                      <Link key={link.href} href={link.href} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"><ArrowRight className="w-3 h-3" />{link.label}</Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
        <CTABanner />
      </main>
    );
  }

  // Static data fallback
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const content = BLOG_CONTENT.find((c) => c.slug === slug);
  const related = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="main-content" className={isPilot ? "pilot-brand-page pilot-article-page" : undefined}>
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 to-blue-50 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-500 truncate max-w-xs">{post.title}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wide">{post.category}</span>
            {post.tag === "New" && <span className="px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide bg-emerald-100 text-emerald-700">New</span>}
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Clock className="w-3 h-3" />{post.readTime} read</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Calendar className="w-3 h-3" />{post.date}</span>
          </div>
          <h1 className="font-bold text-slate-900 text-3xl md:text-5xl leading-tight max-w-4xl mb-6">{post.title}</h1>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">{post.excerpt}</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              {content ? (
                <div className="space-y-8">
                  <div className="bg-blue-50 border-l-4 border-blue-500  p-6">
                    <p className="text-slate-700 text-base leading-relaxed font-medium">{content.intro}</p>
                  </div>
                  {content.sections.map((section, i) => (
                    <div key={i}>
                      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        {section.heading}
                      </h2>
                      <div className="space-y-3 pl-9">
                        {section.body.map((para, j) => <p key={j} className="text-slate-600 leading-relaxed">{para}</p>)}
                      </div>
                    </div>
                  ))}
                  <div className="bg-slate-50  p-6 border border-slate-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-600" />Conclusion</h2>
                    <p className="text-slate-600 leading-relaxed">{content.conclusion}</p>
                  </div>
                  <div className="bg-green-50  p-6 border border-green-200">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-600" />Key Takeaways</h2>
                    <ul className="space-y-2">
                      {content.keyTakeaways.map((point, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                          <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-blue-50 border-l-4 border-blue-500  p-6">
                    <p className="text-slate-700 text-base leading-relaxed font-medium">{post.excerpt}</p>
                  </div>
                  <p className="text-slate-600 leading-relaxed">This comprehensive guide covers everything you need to know about {post.title.toLowerCase()}.</p>
                </div>
              )}
              <div className="mt-10 p-6 bg-gradient-to-r from-blue-600 to-blue-700  text-white">
                <h3 className="font-bold text-xl mb-2">Need Expert Guidance?</h3>
                <p className="text-blue-100 text-sm mb-4">Contact our technical team for detailed compliance documentation, product specifications, or a custom quote for your market.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold  hover:bg-blue-50 transition-colors text-sm">Contact Us <ArrowRight className="w-4 h-4" /></Link>
                  <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-white/50 text-white font-semibold  hover:bg-white/10 transition-all text-sm">Get Quote</Link>
                </div>
              </div>
            </article>
            <aside>
              <div className="bg-white border border-slate-200  p-6 mb-6 sticky top-24 shadow-sm">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {(related.length > 0 ? related : otherPosts).map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="block group">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-semibold tracking-widest uppercase ">{p.category}</span>
                      </div>
                      <h4 className="font-semibold text-slate-700 text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{p.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{p.readTime} · {p.date}</p>
                    </Link>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-slate-200">
                  <Link href="/blog" className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide hover:gap-3 transition-all">All Articles <ArrowRight className="w-3.5 h-3.5" /></Link>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100  p-6">
                <h3 className="font-bold text-slate-900 text-sm mb-3">Quick Links</h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Request a Sample", href: "/samples" },
                    { label: "Get a Quote", href: "/quote" },
                    { label: "Compliance Certificates", href: "/compliance/certificates" },
                    { label: "FAQ", href: "/faq" },
                    { label: "Contact Us", href: "/contact" },
                  ].map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-2 text-blue-700 hover:text-blue-900 font-medium"><ArrowRight className="w-3 h-3" />{link.label}</Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTABanner />
    </main>
  );
}
