import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2, ShieldCheck, Play } from "lucide-react";

export const metadata: Metadata = {
  title: "OEM Thermal Paper & Private Label",
  description:
    "OEM thermal paper rolls and labels with custom printing, branded packaging, core options, specification checks, samples, document routes, and export packing.",
  alternates: { canonical: canonicalUrl("/oem-custom") },
};

export default function OEMPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">OEM & Custom</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              OEM & Custom Printing
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-6">
              Private label, custom printing, and OEM capabilities for distributors who want their own branded thermal consumables. Low MOQ, fast samples, full packaging customization.
            </p>
            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm">Start OEM Project <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/oem-custom/sample-process" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Sample Process</Link>
            </div>
            {/* Trust strip */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              {[
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, text: "ISO 9001:2015 Certified" },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, text: "FSC Chain of Custody" },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, text: "REACH SVHC Compliant" },
                { icon: <ShieldCheck className="w-4 h-4 text-green-500" aria-hidden="true" />, text: "NDA available on request" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5">{item.icon}<span>{item.text}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <SectionHeader label="OEM Services" title="Your Brand, Our Manufacturing" className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  href: "/oem-custom/private-label",
                  num: "01",
                  title: "Private Label",
                  desc: "Your brand on our premium thermal paper rolls and labels. Full packaging customization including box design, roll wrapping, and brand colors.",
                  features: ["Custom brand name", "Logo printing", "Custom packaging", "MOQ from 50,000 rolls (custom print)"],
                  note: "Artwork proof in 24–48h · Samples 7–10 days · Production 12–15 days",
                },
                {
                  href: "/oem-custom/custom-printing",
                  num: "02",
                  title: "Custom Printing",
                  desc: "Logo, text, and color printing directly on thermal paper rolls. Ideal for promotional receipts, branded tickets, and custom labels.",
                  features: ["Full-color printing", "Variable data", "Logo on rolls", "MOQ from 50,000 rolls (custom print)"],
                  note: "1–4 color flexo · PMS references · Inside/back-side print available",
                },
                {
                  href: "/oem-custom/moq-guide",
                  num: "03",
                  title: "MOQ Guide",
                  desc: "Flexible minimum order quantities for different product types. From 10,000 units for standard products to 50,000 for custom printed items.",
                  features: ["Standard POS from 10,000 rolls", "Custom print from 50,000 rolls", "Trial run for first PO", "Mix SKUs under one PO"],
                  note: "LCL available · FCL freight-optimized MOQs available",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className=" border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-8 group">
                  <div className="font-bold text-blue-600 text-xs tracking-widest mb-4">{item.num}</div>
                  <h3 className="font-bold text-slate-900 text-2xl mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.desc}</p>
                  <div className="space-y-2 mb-4">
                    {item.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-blue-600/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  {item.note && <p className="text-xs text-blue-600/70 italic mb-4">{item.note}</p>}
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Factory video placeholder */}
            <div className="mt-16 mb-16">
              <SectionHeader label="Factory" title="See Our Production Capabilities" className="mb-8" />
              <div className="relative  overflow-hidden bg-slate-900 aspect-video max-w-3xl mx-auto flex items-center justify-center border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/80" />
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto mb-4 hover:bg-white/20 transition-colors cursor-pointer">
                    <Play className="w-7 h-7 text-white ml-1" aria-hidden="true" />
                  </div>
                  <p className="text-white font-semibold text-lg">Factory Tour Video</p>
                  <p className="text-slate-400 text-sm mt-1">Watch our production line in action</p>
                  <Link href="/factory/virtual-tour" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm  border border-white/20 transition-colors">
                    View Virtual Tour <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Process steps */}
            <div className="mt-4">
              <SectionHeader label="Process" title="How OEM Works" className="mb-10" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "01", title: "Inquiry", desc: "Send us your requirements: product type, sizes, quantities, and branding needs." },
                  { step: "02", title: "Quotation", desc: "Receive a detailed quote within 24 hours with pricing, MOQ, and lead time." },
                  { step: "03", title: "Samples", desc: "Free production samples within 5-7 business days for your approval." },
                  { step: "04", title: "Production", desc: "Bulk production starts after sample approval. 15-day standard lead time." },
                ].map((s) => (
                  <div key={s.step} className="bg-white border border-slate-200 p-6">
                    <div className="font-bold text-blue-600 text-3xl mb-3">{s.step}</div>
                    <h4 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABanner title="Start Your OEM Project" subtitle="Get a custom OEM quote within 24 hours. Free samples for all new OEM inquiries." />
      </main>
      <Footer />
    </>
  );
}
