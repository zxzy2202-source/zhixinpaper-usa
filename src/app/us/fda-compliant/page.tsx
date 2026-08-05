import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle, FileText, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { SlotImage } from "@/components/ui/SlotImage";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/us/fda-compliant");

export const metadata: Metadata = {
  title: "FDA Thermal Paper & Labels",
  description:
    "Thermal paper rolls and labels for US food-contact sourcing. Confirm the quoted material grade, applicable 21 CFR scope, Prop 65 files, SDS, and samples.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const FDA_FEATURES = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "21 CFR Scope Review",
    desc: "Applicable paper, paperboard, or adhesive provisions are reviewed against the exact construction, contact conditions, and intended use.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Phenol Options by Grade",
    desc: "BPA-free, BPS-free, or phenol-free routes may be offered by selected grade and must be confirmed in the quotation and supporting documents.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Grade-Level Documents",
    desc: "Available declarations, safety data, and test reports are matched to the quoted material, supplier, report scope, and current validity.",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "California Review",
    desc: "California chemical and warning requirements are reviewed for the selected grade and intended use before approval.",
  },
];

const PRODUCTS = [
  { name: "Standard POS Rolls", href: "/products/thermal-paper-rolls/standard-pos-rolls", desc: "Receipt paper selected by quoted grade, intended use, current document scope, and printer fit.", slotKey: "products.card.standard-pos-rolls" },
  { name: "Medical Thermal Rolls", href: "/products/thermal-paper-rolls/medical-rolls", desc: "Thermal media reviewed by device, retention target, exposure, and applicable project documents.", slotKey: "products.card.medical-rolls" },
  { name: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels", desc: "Label constructions reviewed by surface, adhesive, intended use, and current material documentation.", slotKey: "products.card.direct-thermal-labels" },
  { name: "Freezer & Cold Chain Labels", href: "/products/thermal-labels/freezer-cold-chain-labels", desc: "Cold-chain labels qualified by application temperature, substrate, adhesive, handling, and sample tests.", slotKey: "products.card.freezer-cold-chain-labels" },
];

export default function FDACompliantPage() {
  return (

    <>
      <Header />
      <main>
      <HeroBanner
        variant="media"
        eyebrow="US compliance review"
        title="FDA Thermal Paper and Label Documentation for the USA"
        description="Confirm the quoted material grade, intended use, applicable 21 CFR scope, current declarations, and sample performance before approving a US food-contact or regulated-label program."
        breadcrumbs={[
          { label: "United States", href: "/us" },
          { label: "FDA Thermal Paper Documentation" },
        ]}
        actions={[
          { label: "Request Documentation", href: "/quote", kind: "primary" },
          { label: "Request Samples", href: "/samples", kind: "secondary" },
        ]}
      />

      {/* Compliance Features */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8 flex flex-wrap items-center gap-3 text-sm font-semibold text-blue-700">
            <Link href="/us" className="inline-flex items-center gap-1 hover:text-blue-900">
              <ArrowRight className="h-4 w-4 rotate-180" />
              Back to US thermal paper supplier page
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/compliance/fda-us" className="hover:text-blue-900">Compare compliance route</Link>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-10 text-center">US Food-Contact Review Framework</h2>
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
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Products for Scope Review</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {PRODUCTS.map((p) => (
              <Link key={p.href} href={p.href} className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-all hover:border-blue-300 hover:shadow-md">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <SlotImage
                    slotKey={p.slotKey}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="font-semibold text-slate-900 transition-colors group-hover:text-blue-600">{p.name}</div>
                  <div className="mt-2 flex-1 text-sm leading-6 text-slate-500">{p.desc}</div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600">
                    View product <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Planning a US Food-Contact Project?</h2>
          <p className="text-blue-100 mb-8">Request a project-specific quote identifying the material grade, intended use, document scope, samples, packing, and destination requirements.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/quote" className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3  hover:bg-blue-50 transition-colors">
              Get a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/compliance/certificates" className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">
              Review Available Documents
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
