import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { INDUSTRIES, THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Thermal Paper Solutions`,
    description: `${industry.description} ${industry.keywords}. Specialized thermal paper rolls and labels for the ${industry.name} industry.`,
    keywords: industry.keywords,
  };
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = INDUSTRIES.find((i) => i.slug === slug);
  if (!industry) notFound();

  const relatedProducts = [
    ...THERMAL_PAPER_ROLLS.filter((r) =>
      industry.products.some((p) => r.name.toLowerCase().includes(p.toLowerCase().split(" ")[0]))
    ).slice(0, 3),
    ...THERMAL_LABELS.filter((l) =>
      industry.products.some((p) => l.name.toLowerCase().includes(p.toLowerCase().split(" ")[0]))
    ).slice(0, 3),
  ].slice(0, 4);

  const otherIndustries = INDUSTRIES.filter((i) => i.slug !== slug).slice(0, 5);

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
              <Link href="/industries" className="hover:text-blue-600 transition-colors">Industries</Link>
              <span>/</span>
              <span className="text-slate-500">{industry.name}</span>
            </nav>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Industry Solutions</span>
                  {industry.tag && (
                    <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border ${industry.tag === "New" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-blue-500/10 text-blue-400 border-blue-500/25"}`}>{industry.tag}</span>
                  )}
                </div>
                <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
                  {industry.name}
                </h1>
                <p className="text-slate-500 text-lg leading-relaxed mb-6">
                  {industry.description}
                </p>
                <p className="text-slate-500 text-base leading-relaxed mb-8">
                  Zhixin Paper provides specialized thermal consumables tailored to the {industry.name} industry. Our products meet the specific compliance, durability, and performance requirements of this sector, with full documentation and certification support.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">Get Industry Quote <ArrowRight className="w-4 h-4" /></Link>
                  <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Request Samples</Link>
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-lg mb-4">Key Products</h3>
                <div className="space-y-3 mb-6">
                  {industry.products.map((p) => (
                    <div key={p} className="flex items-center gap-2.5 text-slate-500 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      {p}
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-bold text-slate-900 text-lg mb-3">Other Industries</h3>
                  <div className="space-y-2">
                    {otherIndustries.map((i) => (
                      <Link key={i.slug} href={`/industries/${i.slug}`} className="flex items-center gap-2 py-2 text-slate-400 hover:text-blue-600 text-sm transition-colors">
                        <ArrowRight className="w-3 h-3 shrink-0" />
                        {i.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container-site">
              <h2 className="font-bold text-slate-900 text-3xl mb-8">Recommended Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedProducts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${"moq" in p && p.moq ? (p.slug.includes("label") ? "thermal-labels" : "thermal-paper-rolls") : "thermal-paper-rolls"}/${p.slug}`}
                    className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-5 group"
                  >
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                    <p className="text-slate-400 text-xs">{p.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
