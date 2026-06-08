import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import SlotImage from "@/components/ui/SlotImage";
import { COMPANY } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Award, Settings, BarChart3, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Factory China | ISO 9001 Certified Manufacturing",
  description:
    "ISO 9001:2015 certified thermal paper factory in China. Advanced slitting machines, die-cutting equipment, 500M+ rolls annual capacity. Full OEM and private label capabilities.",
  keywords: ["thermal paper factory China", "ISO certified thermal paper manufacturer", "thermal paper manufacturing facility", "OEM thermal paper China", "thermal paper factory tour"],
  alternates: { canonical: canonicalUrl("/factory") },
};

export default function FactoryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Factory</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Manufacturing Facility
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-6">
              ISO 9001:2015 certified thermal paper manufacturing facility in Xi'an, Shaanxi, China. Advanced equipment, rigorous quality control, and 500M+ rolls annual production capacity.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">Get a Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/factory/virtual-tour" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Virtual Tour</Link>
            </div>
          </div>
        </section>

        {/* Factory overview image */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <SectionHeader label="Factory Overview" title="World-Class Manufacturing" subtitle="Our facility combines advanced machinery with rigorous quality processes to deliver consistent, high-quality thermal consumables." />
                <div className="mt-8 space-y-4">
                  {[
                    { icon: <Award className="w-5 h-5" />, title: "ISO 9001:2015 Certified", desc: "Full quality management system with documented processes and annual third-party audits." },
                    { icon: <Settings className="w-5 h-5" />, title: "Advanced Equipment", desc: "High-speed slitting machines, precision die-cutting, and automated coating lines." },
                    { icon: <BarChart3 className="w-5 h-5" />, title: "500M+ Annual Capacity", desc: "Large-scale production capacity ensures stable supply even for high-volume orders." },
                    { icon: <Eye className="w-5 h-5" />, title: "Full Quality Control", desc: "In-line quality monitoring, finished goods testing, and third-party lab verification." },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white border border-slate-200 hover:border-blue-500/30 transition-colors">
                      <div className="w-10 h-10 bg-blue-600/15 border border-blue-500/30 flex items-center justify-center shrink-0 text-blue-600">{item.icon}</div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base mb-1">{item.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Image src="/images/factory-overview.jpg" alt="ISO 9001 certified thermal paper manufacturing facility with BPA-free paper rolls and workers operating machines" width={640} height={480} className="w-full object-cover" />
              </div>
            </div>

            {/* Factory sub-pages */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { href: "/factory/overview", title: "Factory Overview", desc: "Complete tour of our manufacturing plant, equipment, and production processes." },
                { href: "/factory/equipment", title: "Equipment & Capacity", desc: "Slitting machines, die-cutting equipment, coating lines, and production capacity." },
                { href: "/factory/quality-control", title: "Quality Control", desc: "ISO 9001 quality management, testing procedures, and certification documentation." },
                { href: "/factory/virtual-tour", title: "Virtual Tour", desc: "360° virtual tour of our manufacturing facility and quality control lab." },
              ].map((page) => (
                <Link key={page.href} href={page.href} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{page.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">{page.desc}</p>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
