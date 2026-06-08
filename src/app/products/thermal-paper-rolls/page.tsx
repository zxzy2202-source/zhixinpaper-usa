import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { THERMAL_PAPER_ROLLS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Rolls — POS, ATM, Lottery, Casino, Medical | Wholesale",
  description:
    "Wholesale thermal paper rolls: POS receipt rolls, ATM paper, lottery ticket paper, casino TITO rolls, parking tickets, medical paper, and custom OEM rolls. ISO 9001 certified, BPA-free, FDA-compliant manufacturer. Factory-direct pricing with pallet and container load options.",
  keywords: [
    "thermal paper rolls wholesale",
    "POS receipt paper rolls",
    "ATM paper rolls supplier",
    "lottery ticket thermal paper",
    "casino TITO paper rolls",
    "medical thermal paper rolls",
    "parking ticket paper",
    "custom printed thermal rolls",
    "BPA free thermal paper rolls",
    "thermal paper rolls manufacturer China",
    "bulk thermal paper rolls USA",
  ],
  alternates: { canonical: canonicalUrl("/products/thermal-paper-rolls") },
};

export default function ThermalPaperRollsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
              <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              <span>/</span>
              <span className="text-slate-500">Thermal Paper Rolls</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Thermal Paper Rolls</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Thermal Paper Rolls
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-6">
              Complete range of thermal paper rolls for POS, ATM, lottery, casino, parking, medical, and custom applications. All sizes, BPA-free options, custom OEM printing available.
            </p>
            <div className="flex flex-wrap gap-3">
              {["BPA-Free Available", "ISO 9001 Certified", "Custom Sizes", "OEM Printing", "Low MOQ"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 text-[10px] tracking-widest uppercase text-slate-600">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_PAPER_ROLLS.map((roll) => (
                <Link key={roll.slug} href={`/products/thermal-paper-rolls/${roll.slug}`} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors">{roll.name}</h2>
                    {roll.tag && (
                      <span className={`px-2 py-0.5 text-[9px] tracking-widest uppercase border shrink-0 ml-2 ${roll.tag === "New" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-blue-500/10 text-blue-400 border-blue-500/25"}`}>{roll.tag}</span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mb-4">{roll.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    {roll.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-blue-600/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="divider pt-4 flex items-center justify-between">
                    <span className="text-slate-400 text-xs">MOQ: {roll.moq}</span>
                    <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold uppercase tracking-wide">
                      Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
