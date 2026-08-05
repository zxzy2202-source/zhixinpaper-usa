import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Package, TrendingUp, Users } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { buildMetadata } from "@/lib/seo";
import { CASE_STUDIES } from "@/lib/case-studies";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug);
  if (!caseStudy) return { title: "Case Study Not Found" };

  const pageUrl = `https://www.zhixinpaper.com/case-studies/${slug}`;

  return buildMetadata({
    title: `${caseStudy.title} | Project Case Studies`,
    description: caseStudy.challenge.slice(0, 160),
    path: `/case-studies/${slug}`,
  });
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((item) => item.slug === slug);
  if (!caseStudy) notFound();

  const pageUrl = `https://www.zhixinpaper.com/case-studies/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.challenge,
    url: pageUrl,
    author: { "@type": "Organization", name: "Zhixin Paper", url: "https://www.zhixinpaper.com" },
    publisher: {
      "@type": "Organization",
      name: "Zhixin Paper",
      url: "https://www.zhixinpaper.com",
      logo: { "@type": "ImageObject", url: "https://www.zhixinpaper.com/images/logo.png" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    about: { "@type": "Thing", name: caseStudy.industry },
    keywords: caseStudy.tags.join(", "),
  };

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <HeroBanner
          variant="media"
          eyebrow={`Anonymized project · ${caseStudy.industry}`}
          title={caseStudy.title}
          description={(
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" aria-hidden="true" />{caseStudy.client}</span>
              <span className="flex items-center gap-1.5"><Package className="h-4 w-4" aria-hidden="true" />{caseStudy.industry}</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="h-4 w-4" aria-hidden="true" />{caseStudy.region}</span>
            </div>
          )}
          breadcrumbs={[
            { label: "Case Studies", href: "/case-studies" },
            { label: caseStudy.title },
          ]}
          actions={[{ label: "Discuss a Similar Project", href: "/quote", kind: "primary" }]}
        />

        <section className="border-b border-amber-200 bg-amber-50 py-6">
          <div className="mx-auto max-w-4xl px-6 text-sm leading-6 text-amber-950">
            This overview omits customer identity and commercially sensitive details. It describes a qualification approach, not a guaranteed result. {caseStudy.verificationNote}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-4xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="space-y-10 md:col-span-2">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center bg-red-100 text-sm font-bold text-red-600">01</span>
                    The Challenge
                  </h2>
                  <p className="mt-4 leading-7 text-slate-600">{caseStudy.challenge}</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center bg-blue-100 text-sm font-bold text-blue-600">02</span>
                    Qualification Approach
                  </h2>
                  <p className="mt-4 leading-7 text-slate-600">{caseStudy.solution}</p>
                </div>
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                    <span className="flex h-8 w-8 items-center justify-center bg-green-100 text-sm font-bold text-green-700">03</span>
                    Documented Project Outputs
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {caseStudy.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3 leading-7 text-slate-600">
                        <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <aside className="space-y-6">
                <div className="border border-slate-200 bg-slate-50 p-6">
                  <h2 className="font-bold text-slate-900">Review Scope</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseStudy.tags.map((tag) => (
                      <span key={tag} className="bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="border border-blue-100 bg-blue-50 p-6">
                  <h2 className="font-bold text-slate-900">Related Products and Reviews</h2>
                  <div className="mt-4 grid gap-4">
                    {caseStudy.relatedProducts.map((product) => (
                      <Link key={product.href} href={product.href} className="group overflow-hidden border border-blue-100 bg-white transition hover:border-blue-300 hover:shadow-md">
                        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                          <SlotImage slotKey={product.slotKey} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 280px" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold leading-snug text-slate-900 group-hover:text-blue-700">{product.name}</h3>
                          <p className="mt-2 text-xs leading-5 text-slate-500">{product.copy}</p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700">Explore {product.name} <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="text-lg font-bold text-slate-900">More Project Case Studies</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {CASE_STUDIES.filter((item) => item.slug !== slug).slice(0, 3).map((item) => (
                <Link key={item.slug} href={`/case-studies/${item.slug}`} className="group border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-md">
                  <div className="text-xs font-semibold text-blue-700">{item.industry}</div>
                  <h3 className="mt-2 text-sm font-bold text-slate-900 group-hover:text-blue-700">{item.title}</h3>
                  <div className="mt-3 flex items-center gap-1 text-xs text-slate-500">Read project overview <ArrowRight className="h-3 w-3" aria-hidden="true" /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
