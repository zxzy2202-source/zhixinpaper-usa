import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "MOQ Guide | Thermal Paper Minimum Order Quantity",
  description: "Thermal paper MOQ from 5,000 rolls. Labels from 20,000 pieces. Custom OEM from 50,000 units. Flexible minimum orders for distributors at all stages of growth.",
  keywords: "thermal paper minimum order, MOQ labels wholesale, thermal paper MOQ guide",
  alternates: { canonical: canonicalUrl("/oem-custom/moq-guide") },
};

const moqTable = [
  { category: "Standard POS Rolls", moq: "10,000 rolls", unit: "Per size/width", notes: "Stock sizes available for immediate dispatch" },
  { category: "ATM / Banking Rolls", moq: "5,000 rolls", unit: "Per specification", notes: "Lower MOQ for specialized banking formats" },
  { category: "Lottery / Casino Rolls", moq: "10,000–20,000 rolls", unit: "Per specification", notes: "Higher MOQ due to specialized coating" },
  { category: "Medical / Transport Rolls", moq: "5,000 rolls", unit: "Per specification", notes: "Flexible for regulated industry customers" },
  { category: "Custom Printed Rolls", moq: "50,000 rolls", unit: "Per design", notes: "Includes artwork setup and print plates" },
  { category: "Direct Thermal Labels", moq: "50,000 labels", unit: "Per size/format", notes: "Roll or fanfold format" },
  { category: "Specialty Labels (HT/Cryo/PP)", moq: "20,000 labels", unit: "Per specification", notes: "Higher cost materials justify lower MOQ" },
  { category: "Tamper-Evident / Security Labels", moq: "20,000 labels", unit: "Per specification", notes: "Security features require minimum run" },
  { category: "Custom Printed Labels", moq: "50,000 labels", unit: "Per design", notes: "Includes artwork, plates, and die" },
  { category: "Private Label (OEM)", moq: "50,000 units", unit: "Per SKU", notes: "Includes custom packaging and documentation" },
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
              <p className="text-slate-500 text-sm mb-4">We offer reduced MOQ for first orders from new distributor accounts to help you test our products with your customers.</p>
              <Link href="/contact" className="text-blue-600 font-medium text-sm hover:text-blue-800">Talk to our sales team →</Link>
            </div>
            <div className="bg-blue-50  p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-2">Volume Discounts</h3>
              <p className="text-slate-500 text-sm mb-4">Orders above 5× MOQ qualify for volume pricing. Contact us for a tiered pricing schedule based on your annual volume.</p>
              <Link href="/quote" className="text-blue-600 font-medium text-sm hover:text-blue-800">Request volume pricing →</Link>
            </div>
            <div className="bg-blue-50  p-6 border border-blue-100">
              <h3 className="font-semibold text-slate-800 mb-2">Mixed Container Orders</h3>
              <p className="text-slate-500 text-sm mb-4">Combine multiple products in a single FCL container to meet MOQ requirements across your full product range.</p>
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
