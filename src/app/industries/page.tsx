import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { INDUSTRIES } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Industry Solutions — Label Solutions by Industry",
  description:
    "Specialized thermal paper rolls and labels for retail POS, lottery & gaming, healthcare, food cold chain, logistics, transportation, cannabis, and more. Industry-specific solutions.",
};

export default function IndustriesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Industries</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Industry Solutions
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Specialized thermal consumables for 13+ industries. Each sector has unique requirements — we deliver tailored products, compliance documentation, and technical support.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors">
                Discuss Industry Solutions <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl text-sm hover:border-blue-400 hover:text-blue-600 transition-all">
                Request a Quote
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {INDUSTRIES.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/industries/${industry.slug}`}
                  className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-5 sm:p-8 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-bold text-slate-900 text-2xl group-hover:text-blue-600 transition-colors">
                      {industry.name}
                    </h2>
                    {industry.tag && (
                      <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border shrink-0 ml-2 ${industry.tag === "New" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-blue-500/10 text-blue-400 border-blue-500/25"}`}>
                        {industry.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {industry.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {industry.products.map((p) => (
                      <span key={p} className="px-2 py-1 bg-white border border-slate-200 text-[10px] tracking-wide uppercase text-slate-500">
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                    View Solutions <ArrowRight className="w-3.5 h-3.5" />
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
