import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Thermal Paper Factory Equipment",
  description: "State-of-the-art thermal paper slitting machines, label die cutting equipment, and coating lines. Precision manufacturing for consistent quality at scale.",
  keywords: "thermal paper slitting machines, label die cutting equipment, thermal paper manufacturing equipment",
  alternates: { canonical: canonicalUrl("/factory/equipment") },
};

const equipment = [
  {
    category: "Thermal Coating Lines",
    items: [
      { name: "High-Speed Coating Machine", spec: "6 lines × 800 m/min", detail: "Applies proprietary thermal coating formulations with ±2 g/m² precision across full web width." },
      { name: "Backcoat Application System", spec: "Integrated inline", detail: "Applies protective backcoat and anti-stick layers in a single pass for premium product grades." },
    ],
  },
  {
    category: "Slitting & Rewinding",
    items: [
      { name: "Precision Slitting Lines", spec: "20+ lines, ±0.5mm tolerance", detail: "Servo-driven slitting with automatic tension control for consistent roll hardness and diameter." },
      { name: "Automatic Rewinding Machines", spec: "Up to 300mm/min", detail: "High-speed rewinding with automatic core loading and roll ejection for maximum throughput." },
      { name: "Jumbo Roll Slitter", spec: "Max width 1,600mm", detail: "Processes large-format base paper rolls into production-width reels for downstream conversion." },
    ],
  },
  {
    category: "Label Manufacturing",
    items: [
      { name: "Flexographic Printing Lines", spec: "8 lines, up to 8 colors", detail: "High-resolution flexo printing for custom label designs, logos, and variable data." },
      { name: "Die Cutting Stations", spec: "4 stations, any shape", detail: "Rotary die cutting for standard and custom label shapes with kiss-cut and through-cut capability." },
      { name: "Lamination Lines", spec: "3 lines", detail: "Thermal and pressure-sensitive lamination for multi-layer label constructions." },
    ],
  },
  {
    category: "Quality & Inspection",
    items: [
      { name: "100% Vision Inspection System", spec: "Inline, real-time", detail: "Camera-based defect detection identifies coating voids, print defects, and dimensional errors." },
      { name: "Environmental Test Chambers", spec: "−40°C to +150°C", detail: "Simulates extreme storage and use conditions for product qualification testing." },
      { name: "Adhesion & Peel Test Equipment", spec: "FINAT/PSTC standards", detail: "Measures adhesion strength, peel force, and tack across all label adhesive formulations." },
    ],
  },
];

export default function FactoryEquipmentPage() {
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
            <span className="text-white">Equipment</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Production Technology</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Manufacturing Equipment</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              From high-speed coating lines to precision slitting and label die cutting, our equipment portfolio enables consistent quality at volumes that meet the demands of global distributors.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-16">
          {equipment.map((cat) => (
            <div key={cat.category}>
              <h2 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-200">{cat.category}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.items.map((item) => (
                  <div key={item.name} className="bg-slate-50  p-6 border border-slate-200">
                    <h3 className="font-semibold text-slate-800 mb-2">{item.name}</h3>
                    <div className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1  mb-3">{item.spec}</div>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">See Our Equipment in Action</h2>
          <p className="text-blue-100 mb-8">Take a virtual tour of our facility or request a factory visit to see our production capabilities firsthand.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/factory/virtual-tour" className="bg-white text-blue-700 font-semibold px-8 py-3  hover:bg-blue-50 transition-colors">Virtual Tour</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Request Factory Audit</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner />
    <Footer />
    </>
  );
}
