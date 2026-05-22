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
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Supplier Europe | REACH & RoHS Compliant Rolls",
  description:
    "Leading thermal paper manufacturer serving the EU market. REACH compliant, RoHS tested, BPA-free thermal rolls and labels. DDP shipping to European ports, factory direct wholesale.",
  path: "/eu",
});

export default function EUPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Europe", url: "/eu" },
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
        <section className="relative pt-32 pb-16 bg-blue-800 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <SlotImage slotKey="geo.eu.hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-800 via-blue-800/40 to-transparent" />
          </div>

          <div className="container-site relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-lg">🇪🇺</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-blue-300 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-100">European Union Market</span>
                </div>
                <h1 className="font-bold text-white text-5xl md:text-6xl tracking-tight">
                  Thermal Paper Supplier Europe
                </h1>
              </div>
            </div>
            <p className="text-blue-50 text-lg max-w-3xl mb-5 leading-relaxed">
              REACH & RoHS compliant thermal paper rolls and labels for European distributors. ISO 9001 certified manufacturing with full BPA-free and BPS-free formulations. DDP shipping available to most EU countries.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["REACH Compliant", "RoHS Tested", "BPA-Free / BPS-Free", "ISO 9001", "DDP Europe", "Euro Pallet Shipping", "FSC Certified"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white rounded-lg shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-blue-300" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/30 text-sm">
                Get Europe Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
                Free Samples
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
