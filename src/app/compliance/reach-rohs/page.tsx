import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "REACH & RoHS Documentation Review",
  description: "Review REACH and RoHS documentation for the selected thermal paper or label construction, restricted-substance scope, application, and destination.",
  keywords: "REACH thermal paper, RoHS labels EU, SVHC thermal paper documentation",
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
                REACH (Registration, Evaluation, Authorisation and Restriction of Chemicals) is the EU&apos;s chemicals regulation. Thermal paper review commonly considers the current SVHC candidate list and applicable substance restrictions, including restrictions concerning BPA.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Material and finished-product statements should be checked against the selected grade, current supplier evidence, test method, and the buyer&apos;s intended use. Request the current project-specific documentation before approval.
              </p>
              <div className="space-y-3">
                {[
                  "Selected grade and complete material construction",
                  "Candidate-list or restriction reference date",
                  "Declaration issuer, legal entity, and supply-chain scope",
                  "Test method, laboratory, sample identity, and report date",
                  "Destination and buyer-specific documentation requirements",
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
              <h2 className="text-2xl font-bold text-slate-800 mb-6">RoHS Scope Review</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                RoHS Directive 2011/65/EU concerns restricted substances in electrical and electronic equipment. Whether it applies to a label project, and which evidence is appropriate, depends on the finished equipment, label function, complete material construction, supply chain, destination, and buyer requirements.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                For electronics, automotive, or medical-device workflows, request current documentation tied to the exact facestock, coating, adhesive, liner, inks, and finishing included in the quotation. Final applicability and acceptance remain with the buyer and qualified advisers.
              </p>
              <div className="space-y-3">
                {[
                  "Confirm whether RoHS applies to the finished equipment",
                  "Identify the exact quoted label construction and supplier scope",
                  "Review restricted-substance list and applicable exemptions",
                  "Check test or declaration dates and sample identification",
                  "Record buyer approval before production",
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
      <CTABanner title="Need REACH or RoHS Documentation?" subtitle="Share the selected grade, complete construction, intended application, destination, and required evidence so the available document scope can be reviewed." primaryLabel="Request Document Review" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
