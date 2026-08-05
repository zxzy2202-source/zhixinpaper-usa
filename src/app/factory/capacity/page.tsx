import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/factory/capacity");

export const metadata: Metadata = {
  title: "Thermal Paper Capacity, MOQ & Lead Times",
  description: "Review capacity planning, indicative MOQ and lead-time ranges for thermal paper rolls, labels, specialty materials, custom printing, packing, and export orders.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const capacityData = [
  { product: "Standard POS Rolls", availability: "Reviewed by SKU", leadTime: "Confirmed after stock and packing review", moq: "Confirmed by size, grade, packing, and quantity" },
  { product: "ATM Paper Rolls", availability: "Scheduled by SKU", leadTime: "Confirmed after specification and capacity review", moq: "Confirmed by terminal format, packing, and quantity" },
  { product: "Lottery / Casino Rolls", availability: "Scheduled by SKU", leadTime: "Confirmed after specification and capacity review", moq: "Confirmed by format, marks, packing, and quantity" },
  { product: "Custom Printed Rolls", availability: "Made to order", leadTime: "Confirmed after artwork, proof, and capacity review", moq: "Confirmed by print setup, packing, and quantity" },
  { product: "Direct Thermal Labels", availability: "Reviewed by construction", leadTime: "Confirmed after material, tooling, and capacity review", moq: "Confirmed by size, adhesive, format, and quantity" },
  { product: "Specialty Labels (HT/Cryo/PP)", availability: "Made to order", leadTime: "Confirmed after material and sample review", moq: "Confirmed by construction, tooling, and quantity" },
  { product: "Custom Printed Labels", availability: "Made to order", leadTime: "Confirmed after artwork, tooling, and sample review", moq: "Confirmed by construction, print setup, and quantity" },
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
              <p className="text-slate-500 text-sm">Buffer inventory and dispatch timing are confirmed by SKU, forecast, allocation, packing, and current stock records.</p>
            </div>
            <div className="bg-blue-50  p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Flexible MOQ</h3>
              <p className="text-slate-500 text-sm">Minimum order quantity is confirmed from the product construction, dimensions, printing, tooling, packing, order mix, and current production setup.</p>
            </div>
            <div className="bg-blue-50  p-6">
              <h3 className="font-semibold text-slate-800 mb-2">Dedicated Account Management</h3>
              <p className="text-slate-500 text-sm">Sales and production contacts coordinate forecasts, specification approvals, capacity checks, packing, and delivery planning for each program.</p>
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
