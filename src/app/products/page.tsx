import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { THERMAL_PAPER_ROLLS, THERMAL_LABELS } from "@/lib/data";
import { ArrowRight, FileDown, Filter } from "lucide-react";
import TrustBadge from "@/components/ui/TrustBadge";

export const metadata: Metadata = {
  title: "Thermal Paper Products — Rolls & Labels Wholesale",
  description:
    "Complete range of thermal paper rolls and thermal labels for wholesale. POS rolls, ATM paper, direct thermal labels, freezer labels, and custom OEM. Request a quote today.",
  keywords: ["thermal paper rolls catalog", "thermal labels wholesale", "BPA free thermal paper rolls", "POS paper rolls supplier", "ATM paper rolls", "thermal labels manufacturer", "direct thermal labels", "thermal transfer labels"],
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Products</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Thermal Paper Products
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Complete range of thermal paper rolls and thermal labels for distributors, importers, and factories. All products available with custom OEM printing and private label options.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 mb-6">
              <TrustBadge variant="iso" />
              <TrustBadge variant="bpa" />
              <TrustBadge variant="fda" />
              <TrustBadge variant="fsc" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-sm transition-colors">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl text-sm hover:border-blue-400 hover:text-blue-600 transition-all">
                Request Free Samples
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Category Navigation + Downloads */}
        <section className="py-8 bg-white border-b border-slate-100">
          <div className="container-site">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5"><Filter className="w-3.5 h-3.5" aria-hidden="true" /> Browse by Use Case</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: "POS / Retail", href: "/products/thermal-paper-rolls/standard-pos-rolls" },
                    { name: "ATM / Banking", href: "/products/thermal-paper-rolls/atm-banking-rolls" },
                    { name: "Parking / Ticketing", href: "/products/thermal-paper-rolls/parking-ticketing-rolls" },
                    { name: "Medical", href: "/products/thermal-paper-rolls/medical-rolls" },
                    { name: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels" },
                    { name: "Freezer Labels", href: "/products/thermal-labels/freezer-cold-chain-labels" },
                  ].map((c) => (
                    <Link key={c.name} href={c.href} className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-all bg-slate-50 hover:bg-blue-50">
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all bg-white">
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" /> Request Product Catalog
                </a>
                <a href="/contact" className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-600 transition-all bg-white">
                  <FileDown className="w-3.5 h-3.5" aria-hidden="true" /> Size Chart PDF
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Thermal Paper Rolls */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="flex items-end justify-between mb-12">
              <SectionHeader
                label="Category 01"
                title="Thermal Paper Rolls"
                subtitle="POS, ATM, lottery, casino, parking, medical, and custom printed rolls."
              />
              <Link href="/products/thermal-paper-rolls" className="hidden md:flex items-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wide hover:gap-3 transition-all shrink-0">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_PAPER_ROLLS.map((roll) => (
                <Link
                  key={roll.slug}
                  href={`/products/thermal-paper-rolls/${roll.slug}`}
                  className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors">
                      {roll.name}
                    </h3>
                    {roll.tag === "New" && (
                      <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase border shrink-0 ml-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/25">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mb-4">{roll.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {roll.sizes.slice(0, 3).map((size) => (
                      <span key={size} className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] tracking-wide uppercase text-slate-500">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">MOQ: {roll.moq}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Thermal Labels */}
        <section className="py-20 bg-slate-50">
          <div className="container-site">
            <div className="flex items-end justify-between mb-12">
              <SectionHeader
                label="Category 02"
                title="Thermal Labels"
                subtitle="Direct thermal, transfer, freezer, high-temp, wristband, and custom labels."
              />
              <Link href="/products/thermal-labels" className="hidden md:flex items-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wide hover:gap-3 transition-all shrink-0">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_LABELS.map((label) => (
                <Link
                  key={label.slug}
                  href={`/products/thermal-labels/${label.slug}`}
                  className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors">
                      {label.name}
                    </h3>
                    {label.tag === "New" && (
                      <span className="px-2 py-0.5 text-[9px] tracking-widest uppercase border shrink-0 ml-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/25">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-sm mb-4">{label.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {label.sizes.slice(0, 3).map((size) => (
                      <span key={size} className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] tracking-wide uppercase text-slate-500">
                        {size}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs">MOQ: {label.moq}</span>
                    <ArrowRight className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
