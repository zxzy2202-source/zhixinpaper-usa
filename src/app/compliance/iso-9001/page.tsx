import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "ISO 9001 Quality Management Review",
  description: "Review the current ISO 9001 certificate holder, issuer, validity, scope, and quality-management evidence for thermal paper and label supplier qualification.",
  keywords: "ISO 9001 thermal paper supplier review, quality management thermal paper, QMS certificate review",
  alternates: { canonical: canonicalUrl("/compliance/iso-9001") },
};

export default function ISO9001Page() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Quality management"
        title="ISO 9001:2015 Quality Management"
        description="Review the documented quality-management scope, process controls, and available certificate material as part of supplier qualification."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Compliance", href: "/compliance" },
          { label: "ISO 9001" },
        ]}
        actions={[
          { label: "Request Certificate", href: "/compliance/certificates", kind: "primary" },
          { label: "View Quality Process", href: "/factory/quality-control", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">What ISO 9001:2015 Means for You</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                ISO 9001:2015 is a widely used quality-management standard. For a procurement review, confirm the current certificate holder, issuing body, validity, and certified scope against the product and supplying entity.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Quality-management evidence should be evaluated together with product specifications, inspection records, test methods, corrective-action controls, and order-specific acceptance criteria. A certificate alone does not establish product conformity or delivery performance.
              </p>
              <div className="bg-blue-50  p-6 border border-blue-100 mt-6">
                <h3 className="font-semibold text-slate-800 mb-3">Certificate Review Checklist</h3>
                <div className="space-y-2 text-sm">
                  {[
                    ["Standard", "Confirm the current standard and edition"],
                    ["Certificate Holder", "Match the legal entity supplying the order"],
                    ["Certification Body", "Confirm the issuer and accreditation route"],
                    ["Certified Scope", "Match the activities, site, and products under review"],
                    ["Validity", "Check issue, expiry, and current certificate status"],
                    ["Supporting Evidence", "Review procedures and records relevant to the order"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-3">
                      <span className="text-slate-500 w-36 flex-shrink-0">{k}:</span>
                      <span className="text-slate-800 font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">QMS Scope & Coverage</h2>
              <div className="space-y-4">
                {[
                  { title: "Product and Process Scope", desc: "Confirm which products, activities, and manufacturing sites are included in the current documented scope." },
                  { title: "Supplier Controls", desc: "Review qualification criteria and incoming-material records relevant to the quoted construction." },
                  { title: "Production Controls", desc: "Agree the work instructions, process checks, and acceptance criteria that apply to the order." },
                  { title: "Measurement and Testing", desc: "Confirm equipment status, methods, sampling plan, and report format for required inspections." },
                  { title: "Non-Conformance Handling", desc: "Review how affected material is identified, contained, investigated, and dispositioned." },
                  { title: "Order Evidence", desc: "Define which specification, inspection, batch, and corrective-action records the buyer needs." },
                ].map((item, i) => (
                  <div key={i} className="bg-white border border-slate-200  p-4 shadow-sm">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
      <CTABanner title="Review Quality-Management Evidence" subtitle="Request the current certificate, holder and scope details, relevant procedures, inspection records, and order-specific quality plan." primaryLabel="Request Current Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
