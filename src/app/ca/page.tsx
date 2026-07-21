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
  title: "Canada Thermal Paper Supplier",
  description:
    "Thermal paper rolls and labels for Canadian distributors serving retail, foodservice, lottery, logistics, and specialty channels. Request samples and files.",
  path: "/ca",
});

export default function CanadaPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Canada", url: "/ca" },
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
        <section className="relative pt-32 pb-16 bg-red-900 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0 z-0 opacity-40">
            <SlotImage slotKey="geo.ca.hero" fill className="object-cover" fetchPriority="high" loading="eager" sizes="100vw" quality={76} />
            <div className="absolute inset-0 bg-gradient-to-t from-red-900 via-red-900/40 to-transparent" />
          </div>

          <div className="container-site relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl drop-shadow-lg">🇨🇦</span>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-0.5 bg-red-400 rounded-full" />
                  <span className="text-xs font-bold tracking-widest uppercase text-red-200">Canada Market</span>
                </div>
                <h1 className="font-bold text-white text-5xl md:text-6xl tracking-tight">
                  Thermal Paper Supplier Canada
                </h1>
              </div>
            </div>
            <p className="text-red-100 text-lg max-w-3xl mb-5 leading-relaxed">
              BPA-free thermal paper rolls and labels for Canadian distributors and importers. ISO 9001 certified manufacturing, specialized for retail, POS, lottery, and gaming industries across Canada.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {["BPA-Free", "ISO 9001", "FSC Paper", "Direct Factory", "POS Paper Rolls", "Courier Labels", "Gaming Tickets"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white  shadow-sm">
                  <CheckCircle2 className="w-3 h-3 text-red-400" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold  transition-all shadow-lg shadow-red-600/30 text-sm">
                Get Canada Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold  border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm">
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
