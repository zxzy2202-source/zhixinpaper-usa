import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Production Capacity | Thermal Paper Lead Times & MOQ",
  description: "500M+ rolls annual capacity, 15-day standard lead time, 30-day custom OEM. Flexible MOQ from 5,000 rolls. Reliable supply chain for European and North American distributors.",
  keywords: "thermal paper production capacity, lead time thermal paper, MOQ thermal labels",
  alternates: { canonical: canonicalUrl("/factory/capacity") },
};

const capacityData = [
  { product: "Standard POS Rolls", availability: "Stock programme", leadTime: "10–15 days", moq: "10,000 rolls" },
  { product: "ATM Paper Rolls", availability: "Scheduled by SKU", leadTime: "10–15 days", moq: "5,000 rolls" },
  { product: "Lottery / Casino Rolls", availability: "Scheduled by SKU", leadTime: "15–20 days", moq: "10,000 rolls" },
  { product: "Custom Printed Rolls", availability: "Made to order", leadTime: "20–30 days", moq: "50,000 rolls" },
  { product: "Direct Thermal Labels", availability: "Stock programme", leadTime: "10–15 days", moq: "50,000 labels" },
  { product: "Specialty Labels (HT/Cryo/PP)", availability: "Made to order", leadTime: "15–25 days", moq: "20,000 labels" },
  { product: "Custom Printed Labels", availability: "Made to order", leadTime: "20–30 days", moq: "50,000 labels" },
];

export default function FactoryCapacityPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Capacity</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Supply Reliability</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Production Capacity & Lead Times</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              With 500M+ rolls annual production capacity and dedicated inventory for key SKUs, we deliver consistent, on-time supply to distributors and importers worldwide.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/quote" className="px-8 py-3 bg-white text-blue-700 font-bold  hover:bg-blue-50 transition-colors shadow-sm">
                Request a Quote
              </Link>
              <Link href="/contact" className="px-8 py-3 bg-transparent text-white font-semibold  border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Capacity by Product Category</h2>
          <div className="overflow-x-auto  border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-6 py-4">Product</th>
                  <th className="text-left px-6 py-4">Availability</th>
                  <th className="text-left px-6 py-4">Standard Lead Time</th>
                  <th className="text-left px-6 py-4">MOQ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {capacityData.map((row, i) => (
                  <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{row.product}</td>
                    <td className="px-6 py-4 text-[#0f5f5c] font-semibold">{row.availability}</td>
                    <td className="px-6 py-4 text-slate-600">{row.leadTime}</td>
                    <td className="px-6 py-4 text-slate-600">{row.moq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50  p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Buffer Stock Programme</h3>
              <p className="text-slate-500 text-sm">We maintain 30-day buffer stock for top-selling SKUs, enabling same-week dispatch for urgent orders from established distributors.</p>
            </div>
            <div className="bg-blue-50  p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Flexible MOQ</h3>
              <p className="text-slate-500 text-sm">Standard products from 5,000 rolls. Custom OEM from 50,000 rolls. We work with distributors at all stages of growth.</p>
            </div>
            <div className="bg-blue-50  p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Dedicated Account Management</h3>
              <p className="text-slate-500 text-sm">Each distributor account is assigned a dedicated production planner to coordinate forecasts, rush orders, and seasonal demand peaks.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Discuss Your Volume Requirements</h2>
          <p className="text-blue-100 mb-8">Our sales team will provide a customised supply proposal based on your volume, frequency, and delivery requirements.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-blue-700 font-semibold px-8 py-3  hover:bg-blue-50 transition-colors">Request a Quote</Link>
            <Link href="/oem-custom/moq-guide" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">View MOQ Guide</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
