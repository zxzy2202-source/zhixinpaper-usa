import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper Capacity, MOQ & Lead Times",
  description: "Review capacity planning, indicative MOQ and lead-time ranges for thermal paper rolls, labels, specialty materials, custom printing, packing, and export orders.",
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
      <HeroBanner
        variant="media"
        eyebrow="Supply planning"
        title="Production Capacity and Lead-Time Review"
        description="Capacity, order quantity, and schedule are reviewed by product construction, dimensions, materials, printing, packing, order mix, current loading, and shipping plan."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: "Capacity" },
        ]}
        actions={[
          { label: "Request a Project Review", href: "/quote", kind: "primary" },
          { label: "Discuss Supply Planning", href: "/contact", kind: "secondary" },
        ]}
      />

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

    </main>
      <CTABanner
        title="Ready to review supply requirements?"
        subtitle="Share the product mix, target quantity, delivery frequency, packing, destination, and timing constraints for a current capacity review."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
