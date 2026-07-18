import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "Manufacturing Plant Overview | ISO Certified Thermal Paper Factory",
  description: "Tour our ISO 9001:2015 certified thermal paper manufacturing facility in Xi'an, Shaanxi, China. 50,000 sqm production floor, 20+ slitting lines, 500M+ rolls annual capacity.",
  keywords: "thermal paper manufacturing plant, ISO certified factory, thermal paper factory China",
  alternates: { canonical: canonicalUrl("/factory/overview") },
};

export default function FactoryOverviewPage() {
  const stats = [
    { value: "50,000 m²", label: "Production Floor Area" },
    { value: "20+", label: "Slitting Production Lines" },
    { value: "500M+", label: "Rolls Annual Capacity" },
    { value: "ISO 9001:2015", label: "Quality Certification" },
    { value: "15+", label: "Years in Operation" },
    { value: "200+", label: "Skilled Employees" },
  ];

  const sections = [
    {
      title: "Coating & Base Paper Division",
      desc: "Our coating division houses 6 high-speed thermal coating lines, each capable of processing base paper at speeds up to 800 m/min. We apply proprietary thermal coating formulations developed in-house, ensuring consistent sensitivity, image density, and archival performance across every batch.",
    },
    {
      title: "Slitting & Converting Division",
      desc: "With 20+ precision slitting lines, we convert large-format thermal paper rolls into finished product specifications with tolerances of ±0.5mm. Our automated tension control systems ensure consistent roll hardness and diameter across all standard and custom sizes.",
    },
    {
      title: "Label Manufacturing Division",
      desc: "Our dedicated label division features 8 flexographic printing lines, 4 die-cutting stations, and full lamination capability. We produce direct thermal, thermal transfer, and specialty labels on paper, PP, polyester, and polyimide facestocks.",
    },
    {
      title: "Quality Control Laboratory",
      desc: "Every production batch is tested in our on-site laboratory equipped with image density analyzers, adhesion testers, environmental chambers, and chemical analysis equipment. We maintain full traceability from raw material to finished goods.",
    },
  ];

  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      {/* Hero */}
      <section className="brand-hero bg-[#101b19] text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Overview</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Manufacturing Excellence</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              World-Class Thermal Paper<br />Manufacturing Facility
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our ISO 9001:2015 certified production facility in Xi'an, Shaanxi, China spans 50,000 m² and operates 24/7 to supply thermal paper rolls and labels to distributors across 80+ countries.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-blue-700">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Production Divisions</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">Our facility is organized into specialized production divisions, each equipped with dedicated machinery and staffed by experienced technicians.</p>
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200  p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-blue-100  flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-lg">{i + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit Our Factory?</h2>
          <p className="text-blue-100 mb-8 text-lg">We welcome distributor visits and factory audits. Contact our team to arrange an in-person or virtual tour.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/factory/virtual-tour" className="bg-white text-blue-700 font-semibold px-8 py-3  hover:bg-blue-50 transition-colors">
              Take Virtual Tour
            </Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">
              Schedule Factory Visit
            </Link>
          </div>
        </div>
      </section>
    </main>
    <CTABanner />
    <Footer />
    </>
  );
}
