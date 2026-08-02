import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "US Food-Contact Thermal Paper Document Review",
  description: "Review thermal paper and label constructions for US food-contact projects by intended use, applicable 21 CFR scope, supporting documents, and sample validation.",
  keywords: "FDA compliant thermal paper, US food contact labels, FDA 21 CFR thermal paper",
  alternates: { canonical: canonicalUrl("/compliance/fda-us") },
};

export default function FDAUSPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="US market compliance"
        title="FDA Documentation for Thermal Paper and Labels"
        description="Review the applicable 21 CFR sections, intended food-contact conditions, and grade-specific declarations before approving material for a US program."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/compliance" },
          { label: "FDA US" },
        ]}
        actions={[
          { label: "Request Documents", href: "/compliance/certificates", kind: "primary" },
          { label: "US Market Overview", href: "/us", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
               <h2 className="text-2xl font-bold text-slate-800 mb-6">FDA 21 CFR Scope Review</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                The US Food and Drug Administration (FDA) regulates food contact materials under 21 CFR (Code of Federal Regulations). For thermal paper and labels, the relevant sections cover paper and paperboard components (21 CFR 176) and adhesive components (21 CFR 175).
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                 Candidate grades are reviewed against the complete construction, intended conditions of use, and the applicable provisions. Any declaration or test must identify the covered material, conditions, method, and current report scope; availability does not establish universal approval for every food-contact application.
              </p>
              <div className="bg-blue-50  p-6 border border-blue-100 mt-6">
                <h3 className="font-semibold text-slate-800 mb-3">Applicable Regulations</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  {[
                    "FDA 21 CFR 176.170 — Components of paper and paperboard",
                    "FDA 21 CFR 176.180 — Components of paper and paperboard (aqueous contact)",
                    "FDA 21 CFR 175.105 — Adhesives",
                    "FDA 21 CFR 175.125 — Pressure-sensitive adhesives",
                     "California Proposition 65 — Review selected grade and warning scope",
                  ].map((reg, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      <span>{reg}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">US Market Applications</h2>
              <div className="space-y-4">
                {[
                  { app: "Grocery & Supermarket", desc: "Deli counter labels, fresh produce stickers, and POS receipt paper for US grocery chains." },
                  { app: "Food Service & Restaurants", desc: "Receipt paper and order labels for US restaurants, cafes, and quick-service operations." },
                  { app: "Food Manufacturing", desc: "Production labels, batch labels, and traceability labels for US food manufacturers." },
                  { app: "Cold Chain & Distribution", desc: "Shipping labels and temperature-indicator labels for US cold chain logistics." },
                  { app: "Cannabis Dispensary Labels", desc: "Compliant labels for cannabis products in US states with food contact requirements." },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200  p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.app}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
       <CTABanner title="Need US Food-Contact Documents?" subtitle="Request a review of the exact material grade, intended use, applicable 21 CFR scope, current reports, and sample plan." primaryLabel="Request Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
