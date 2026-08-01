import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Private Label Thermal Paper",
  description: "Private-label thermal paper rolls and labels with branded packaging, core options, artwork review, specification checks, samples, and export order planning.",
  keywords: "private label thermal paper, white label receipt rolls, OEM thermal paper manufacturer",
  alternates: { canonical: canonicalUrl("/oem-custom/private-label") },
};

const benefits = [
  { title: "Brand-Led Product Planning", desc: "We review the roll or label specification, brand identity, product codes, and market requirements before confirming a private-label production route." },
  { title: "Packaging Options", desc: "Shrink wrap, retail boxes, bulk cartons, and custom packing concepts can be reviewed against quantity, protection, labeling, and destination requirements." },
  { title: "Core and Product Identification", desc: "Core printing, product codes, and barcode options can be assessed according to the roll format, print method, and operational needs." },
  { title: "Document Scope Review", desc: "Available certificates, declarations, and test reports are confirmed for the selected material grade, intended application, destination, and current document validity." },
  { title: "Project-Based Order Quantity", desc: "Order quantity is quoted after reviewing product dimensions, material, printing, packing, artwork, and production setup rather than applying one figure to every project." },
  { title: "Reviewed Production Schedule", desc: "Artwork status, sampling, materials, production capacity, packing, and shipping requirements are reviewed before a project schedule is confirmed." },
];

export default function PrivateLabelPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Private-label project planning"
        title="Private Label Thermal Paper"
        description="Build a branded roll or label range through specification review, artwork approval, sampling, packaging planning, and project-specific documentation checks."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM & Custom", href: "/oem-custom" },
          { label: "Private Label" },
        ]}
        actions={[
          { label: "Request a Project Quote", href: "/quote", kind: "primary" },
          { label: "Plan Samples", href: "/samples", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Why Choose Our Private Label Service?</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Our private label program gives distributors and importers a complete branded product line without the capital investment of manufacturing.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="bg-white border border-slate-200  p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100  flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">{i + 1}</span>
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{b.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Private Label Process</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {["Submit Requirements", "Artwork & Approval", "Sample Production", "Mass Production", "Quality Check", "Shipment"].map((step, i) => (
              <div key={i} className="flex-1 text-center">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-sm">{i + 1}</div>
                <p className="text-sm font-medium text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Ready to review a private-label project?"
        subtitle="Share the product specification, expected quantity, artwork status, packing plan, destination, and sample requirements for review."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
