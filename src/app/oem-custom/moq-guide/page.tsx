import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
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
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/oem-custom" className="hover:text-white">OEM & Custom</Link>
            <span className="mx-2">/</span>
            <span className="text-white">MOQ Guide</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Ordering Information</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Minimum Order Quantity Guide</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We work with distributors at all stages of growth. Our MOQ structure is designed to be accessible for new accounts while offering significant volume discounts for established partners.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/quote" className="px-8 py-3 bg-white text-blue-700 font-bold  hover:bg-blue-50 transition-colors shadow-sm">
                Discuss Your MOQ
              </Link>
              <Link href="/samples" className="px-8 py-3 bg-transparent text-white font-semibold  border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all">
                Request Free Samples
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Place Your First Order?</h2>
          <p className="text-blue-100 mb-8">Request a quote with your specific product requirements and we'll confirm MOQ, pricing, and lead time within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-blue-700 font-semibold px-8 py-3  hover:bg-blue-50 transition-colors">Request a Quote</Link>
            <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Order Free Samples First</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
