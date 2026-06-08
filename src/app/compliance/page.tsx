import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPLIANCE_ITEMS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, ShieldCheck, FileCheck, Award, Leaf, UtensilsCrossed, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Compliance — BPA-Free, REACH, ISO 9001, FDA Certifications",
  description:
    "Zhixin Paper compliance certifications: BPA-free, REACH/RoHS, ISO 9001:2015, FSC, EU food contact, FDA compliant. Download certificates and compliance documentation.",
  alternates: { canonical: canonicalUrl("/compliance") },
};

const ICONS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-8 h-8" />,
  FileCheck: <FileCheck className="w-8 h-8" />,
  Award: <Award className="w-8 h-8" />,
  Leaf: <Leaf className="w-8 h-8" />,
  UtensilsCrossed: <UtensilsCrossed className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
};

export default function CompliancePage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Compliance</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Certifications & Compliance
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Zhixin Paper maintains comprehensive certifications to meet the strictest requirements in Europe, USA, and Canada. All compliance documentation available on request.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPLIANCE_ITEMS.map((item) => (
                <Link key={item.slug} href={`/compliance/${item.slug}`} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-8 group">
                  <div className="text-blue-600 mb-5">{ICONS[item.icon]}</div>
                  <h2 className="font-bold text-slate-900 text-2xl mb-3 group-hover:text-blue-600 transition-colors">{item.name}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{item.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                    View Details <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner title="Need Compliance Documentation?" subtitle="Request compliance certificates, test reports, and regulatory documentation for your market." primaryLabel="Request Documents" />
      </main>
      <Footer />
    </>
  );
}
