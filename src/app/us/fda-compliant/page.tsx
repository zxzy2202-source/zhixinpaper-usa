import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle, FileText, AlertCircle, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "FDA Thermal Paper & Labels",
  description:
    "Thermal paper rolls and labels for US food-contact sourcing. Confirm the quoted material grade, applicable 21 CFR scope, Prop 65 files, SDS, and samples.",
  keywords: [
    "FDA compliant thermal paper",
    "BPA free thermal paper USA",
    "food contact labels USA",
    "21 CFR thermal paper",
    "21 CFR 176.170 thermal paper",
    "Prop 65 compliant thermal paper",
    "California Proposition 65 receipt paper",
    "BPA free receipt paper United States",
    "food safe thermal labels USA",
    "FDA approved thermal paper manufacturer",
    "food contact thermal paper wholesale",
    "BPA BPS free thermal paper",
  ],
  alternates: { canonical: canonicalUrl("/us/fda-compliant") },
};

const FDA_FEATURES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "21 CFR Compliant",
    desc: "All food-contact thermal paper meets FDA 21 CFR 176.170 and 176.180 requirements for indirect food additives.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "BPA-Free Standard",
    desc: "100% BPA-free across our entire US product range. No bisphenol A, bisphenol S, or bisphenol F in any formulation.",
    },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Full Documentation",
    desc: "Certificate of Compliance, Safety Data Sheets, and test reports available for all FDA-compliant products.",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Prop 65 Aware",
    desc: "Products formulated with California Proposition 65 requirements in mind. Documentation available on request.",
  },
];

const PRODUCTS = [
  { name: "Standard POS Rolls (FDA)", href: "/products/thermal-paper-rolls/standard-pos-rolls", desc: "BPA-free receipt paper for US retail and food service POS systems." },
  { name: "Medical Thermal Rolls", href: "/products/thermal-paper-rolls/medical-rolls", desc: "FDA-grade thermal paper for pharmacy receipts and medical device output." },
  { name: "Food-Safe Labels", href: "/products/thermal-labels/direct-thermal-labels", desc: "Direct thermal labels compliant with FDA food contact regulations." },
  { name: "Freezer Labels (FDA)", href: "/products/thermal-labels/freezer-cold-chain-labels", desc: "Cold chain labels meeting FDA requirements for frozen food packaging." },
];

export default function FDACompliantPage() {
  return (

    <>
      <Header />
      <main className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
            <Link href="/us" className="hover:text-white transition-colors">United States</Link>
            <span>/</span>
            <span>FDA Compliant</span>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20  flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <span className="text-blue-200 font-semibold text-sm uppercase tracking-widest">US Compliance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            FDA Compliant Thermal Paper<br />
            <span className="text-blue-200">&amp; Labels for the US Market</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-3xl leading-relaxed mb-8">
            Every thermal product we supply to US distributors and importers meets FDA food contact regulations. BPA-free formulations, 21 CFR documentation, and full traceability — so you can sell with confidence.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3  hover:bg-blue-50 transition-colors">
              Request FDA Documentation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/samples" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3  hover:bg-white/10 transition-colors">
              Request Free Samples
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">Our FDA Compliance Framework</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {FDA_FEATURES.map((f) => (
              <div key={f.title} className="flex gap-4 p-6 bg-slate-50  border border-slate-100">
                <div className="w-12 h-12 bg-blue-100  flex items-center justify-center text-blue-600 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FDA Products */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">FDA-Compliant Products</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PRODUCTS.map((p) => (
              <Link key={p.href} href={p.href} className="flex items-start gap-4 p-5 bg-white  border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="w-10 h-10 bg-blue-50  flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Package className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{p.desc}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors ml-auto shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Source FDA-Compliant Thermal Products?</h2>
          <p className="text-blue-100 mb-8">Get a custom quote with full compliance documentation included.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3  hover:bg-blue-50 transition-colors">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/compliance/certificates" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">
              Download Certificates
            </Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
