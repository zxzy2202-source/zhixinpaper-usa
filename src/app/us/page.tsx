import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import SlotImage from "@/components/ui/SlotImage";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import {
  ArrowRight, CheckCircle2, Truck, MapPin, ShieldCheck, Package,
  Zap, Globe, BadgeCheck, Download,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Supplier USA | BPA-Free Rolls & Labels Wholesale",
  description:
    "Leading thermal paper manufacturer serving the US market. FDA-compliant, Prop 65 compliant thermal rolls and labels. DDP shipping to USA ports, Amazon FBA ready, pallet pricing for distributors.",
  path: "/us",
});

export default function USPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "United States", url: "/us" },
    ]),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <main className="pt-[88px]">
        {/* ── HERO ── */}
        <section className="relative pt-32 pb-16 bg-blue-900 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <SlotImage slotKey="geo.us.hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-900/40 to-transparent" />
          </div>

          <div className="container-site relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-lg">🇺🇸</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-400 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-200">United States Market</span>
                </div>
                <h1 className="font-bold text-white text-5xl md:text-6xl tracking-tight">
                  Thermal Paper Supplier USA
                </h1>
              </div>
            </div>
            <p className="text-blue-100 text-lg max-w-3xl mb-5 leading-relaxed">
              FDA-compliant, Prop 65 compliant thermal paper rolls and labels for US distributors, importers, and e-commerce sellers. BPA-free, ISO 9001 certified, DDP shipping to any US port.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["FDA 21 CFR", "Prop 65 Compliant", "BPA-Free", "ISO 9001", "DDP USA", "Amazon FBA Validated", "Cannabis Labels"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white  shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold  transition-all shadow-lg shadow-blue-500/30 text-sm">
                Get US Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold  border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                Free Samples
              </Link>
            </div>
          </div>
        </section>

        {/* ── CONTENT SECTIONS ── */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <SectionHeader 
                  label="Market Overview" 
                  title="High-Performance Thermal Solutions for the US Market" 
                  subtitle="Meeting the strict regulatory requirements and high-volume demands of American retail, logistics, and healthcare."
                />
                <div className="mt-8 prose prose-slate max-w-none text-slate-600">
                  <p>
                    Zhixin Paper provides a comprehensive range of thermal paper rolls and labels designed specifically for the unique needs of the United States market. From standard 3 1/8" POS rolls for national retail chains to 4x6 shipping labels for e-commerce giants, our products are engineered for reliability and precision.
                  </p>
                  <p>
                    We understand that compliance is non-negotiable in the USA. That's why our paper is rigorously tested for Prop 65 compliance and is fully BPA-free. For the medical and cannabis sectors, we offer specialized FDA-compliant substrates that ensure long-term image stability and adhesive integrity.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50  border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-600" /> Shipping & Logistics
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    Full container (FCL) or pallet-load (LTL) shipping with DDP options to major US ports including Long Beach, New York/New Jersey, and Savannah.
                  </p>
                  <ul className="text-xs space-y-2 text-slate-600">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> DDP / CIF / FOB terms</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Amazon FBA labeling ready</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-green-500" /> Stable 15-day production lead time</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
