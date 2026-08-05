import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/oem-custom/moq-guide");

export const metadata: Metadata = {
  title: "MOQ Guide | Thermal Paper Minimum Order Quantity",
  description: "Plan thermal paper and label order quantities by product construction, dimensions, material, printing, tooling, packing, SKU mix, and current production review.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const moqTable = [
  { category: "Standard POS Rolls", moq: "Confirmed by RFQ", unit: "Per size and grade", notes: "Review stock, paper grade, core, packing, and quantity" },
  { category: "ATM / Banking Rolls", moq: "Confirmed by RFQ", unit: "Per terminal specification", notes: "Review dimensions, marks, winding, packing, and quantity" },
  { category: "Lottery / Casino Rolls", moq: "Confirmed by RFQ", unit: "Per approved specification", notes: "Review coating, marks, security fields, packing, and quantity" },
  { category: "Medical / Transport Rolls", moq: "Confirmed by RFQ", unit: "Per device and use", notes: "Review device fit, retention, exposure, packing, and quantity" },
  { category: "Custom Printed Rolls", moq: "Confirmed by RFQ", unit: "Per artwork and SKU", notes: "Includes paper, print setup, proof, packing, and quantity review" },
  { category: "Direct Thermal Labels", moq: "Confirmed by RFQ", unit: "Per construction", notes: "Review size, facestock, adhesive, roll or fanfold format, and tooling" },
  { category: "Specialty Labels (HT/Cryo/PP)", moq: "Confirmed by RFQ", unit: "Per construction", notes: "Review substrate, adhesive, exposure, tooling, and sample plan" },
  { category: "Tamper-Evident / Security Labels", moq: "Confirmed by RFQ", unit: "Per security design", notes: "Review security feature, tooling, print, packing, and quantity" },
  { category: "Custom Printed Labels", moq: "Confirmed by RFQ", unit: "Per artwork and die", notes: "Includes material, artwork, plates, die, packing, and quantity review" },
  { category: "Private Label (OEM)", moq: "Confirmed by RFQ", unit: "Per SKU program", notes: "Review product mix, branded packaging, documents, and forecast" },
];

export default function MOQGuidePage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Order planning"
        title="Minimum Order Quantity Guide"
        description="Use the category ranges below as planning references only. Final order quantity depends on the product specification, materials, printing, packaging, order mix, and current production setup."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM & Custom", href: "/oem-custom" },
          { label: "MOQ Guide" },
        ]}
        actions={[
          { label: "Discuss Project Quantity", href: "/quote", kind: "primary" },
          { label: "Plan Sample Evaluation", href: "/samples", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">MOQ by Product Category</h2>
          <div className="overflow-x-auto  border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Product Category</th>
                  <th className="text-left px-6 py-4">Minimum Order</th>
                  <th className="text-left px-6 py-4">Unit</th>
                  <th className="text-left px-6 py-4">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {moqTable.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{row.category}</td>
                    <td className="px-6 py-4 text-blue-600 font-semibold">{row.moq}</td>
                    <td className="px-6 py-4 text-slate-500">{row.unit}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50  p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-2">New Distributor?</h3>
              <p className="text-slate-500 text-sm mb-4">First-order quantity, sample scope, and SKU mix are reviewed against the selected construction, production setup, packing, and commercial terms.</p>
              <Link href="/contact" className="text-blue-600 font-medium text-sm hover:text-blue-800">Talk to our sales team →</Link>
            </div>
            <div className="bg-blue-50  p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-2">Volume Discounts</h3>
              <p className="text-slate-500 text-sm mb-4">Tiered pricing is quoted from the approved specification, order quantity, SKU mix, packing, forecast, and delivery plan.</p>
              <Link href="/quote" className="text-blue-600 font-medium text-sm hover:text-blue-800">Request volume pricing →</Link>
            </div>
            <div className="bg-blue-50  p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-2">Mixed Container Orders</h3>
              <p className="text-slate-500 text-sm mb-4">Mixed-SKU loading is reviewed by production compatibility, carton and pallet plan, quantity per SKU, container utilisation, and destination requirements.</p>
              <Link href="/contact" className="text-blue-600 font-medium text-sm hover:text-blue-800">Ask about mixed orders →</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Need a project-specific quantity review?"
        subtitle="Share the SKU mix, dimensions, materials, printing, packaging, destination, and target volume so MOQ, pricing, and timing can be confirmed together."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
