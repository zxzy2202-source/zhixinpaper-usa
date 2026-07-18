import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { THERMAL_LABELS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Labels — Direct Thermal, Freezer, High-Temp, Custom Labels Wholesale",
  description:
    "Wholesale thermal labels: direct thermal, thermal transfer, freezer labels, high-temperature labels, wristbands, tamper-evident, synthetic PP, and custom OEM labels. ISO 9001 certified.",
  alternates: { canonical: canonicalUrl("/products/thermal-labels") },
};

export default function ThermalLabelsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#87918c]">
              <Link href="/products" className="transition-colors hover:text-[#0f5f5c]">Products</Link>
              <span>/</span>
              <span className="text-[#4f5f5a]">Thermal Labels</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#9c661d]" />
              <span className="text-xs font-bold text-[#0f5f5c]">Thermal Labels</span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Thermal Labels
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Complete range of thermal labels for shipping, logistics, healthcare, cold chain, industrial, and specialty applications. Direct thermal and thermal transfer options available.
            </p>
            <div className="flex flex-wrap gap-3">
              {["Direct Thermal", "Thermal Transfer", "Freezer Grade", "High Temperature", "Custom OEM", "Waterproof"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 border border-[#ded6c8] bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-[#4f5f5a]">
                  <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_LABELS.map((label) => (
                <Link key={label.slug} href={`/products/thermal-labels/${label.slug}`} className="group border border-[#ded6c8] bg-[#fbfaf6] p-6 transition-all hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8]">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="font-bold text-[#14211f] text-xl transition-colors group-hover:text-[#0f5f5c]">{label.name}</h2>
                    {label.tag && (
                      <span className={`ml-2 shrink-0 border px-2 py-0.5 text-[10px] font-bold ${label.tag === "New" ? "border-[#0f5f5c]/25 bg-[#0f5f5c]/10 text-[#0f5f5c]" : "bg-[#e7eee9] text-[#0f5f5c] border-[#0f5f5c]/25"}`}>{label.tag}</span>
                    )}
                  </div>
                  <p className="text-[#4f5f5a] text-sm mb-4">{label.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    {label.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#4f5f5a]">
                        <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between border-t border-[#ded6c8] pt-4">
                    <span className="text-[#87918c] text-xs">MOQ: {label.moq}</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f5f5c]">
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
