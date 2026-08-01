import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "REACH & RoHS Compliance | SVHC Free Thermal Paper",
  description: "REACH SVHC compliant thermal paper and labels. RoHS compliant thermal labels for electronics. Full SVHC screening and compliance documentation available.",
  keywords: "REACH thermal paper, RoHS labels EU, SVHC free thermal paper",
  alternates: { canonical: canonicalUrl("/compliance/reach-rohs") },
};

export default function ReachRohsPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="EU chemical documentation"
        title="REACH and RoHS Documentation"
        description="Confirm the current declaration, tested material grade, restricted-substance scope, and intended application before approving a thermal-paper or label program."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/compliance" },
          { label: "REACH & RoHS" },
        ]}
        actions={[
          { label: "Request Documents", href: "/compliance/certificates", kind: "primary" },
          { label: "Contact Compliance Team", href: "/contact", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">REACH Compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) is the EU's comprehensive chemicals regulation. For thermal paper, the key requirements relate to the SVHC (Substances of Very High Concern) candidate list and specific restrictions on substances like BPA.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                We screen all raw materials and finished products against the current SVHC candidate list. Our products contain no SVHC substances above the 0.1% (w/w) threshold, and we maintain full documentation to support our customers' own REACH compliance obligations.
              </p>
              <div className="space-y-3">
                {[
                  "SVHC substances below 0.1% threshold in all products",
                  "BPA restriction (REACH Annex XVII) — fully compliant",
                  "Annual SVHC screening against updated candidate list",
                  "Full supply chain traceability for raw materials",
                  "REACH compliance statements available on request",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">RoHS Compliance</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                RoHS (Restriction of Hazardous Substances) Directive 2011/65/EU restricts the use of certain hazardous substances in electrical and electronic equipment. Our thermal labels used in electronics manufacturing and industrial applications are fully RoHS compliant.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                This is particularly relevant for our high-temperature labels, chemical-resistant labels, and wristband labels used in electronics manufacturing, automotive, and medical device applications.
              </p>
              <div className="space-y-3">
                {[
                  "Lead (Pb) — below threshold",
                  "Mercury (Hg) — not present",
                  "Cadmium (Cd) — not present",
                  "Hexavalent Chromium (Cr VI) — not present",
                  "Polybrominated Biphenyls (PBB) — not present",
                  "Polybrominated Diphenyl Ethers (PBDE) — not present",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
      <CTABanner title="Need REACH & RoHS Documentation?" subtitle="Request our SVHC declarations and RoHS test reports for EU market compliance." primaryLabel="Get Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
