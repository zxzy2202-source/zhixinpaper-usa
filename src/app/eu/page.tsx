import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { GEO_REGIONS, COMPLIANCE_ITEMS } from "@/lib/data";
import { ArrowRight, CheckCircle2, ShieldCheck, FileCheck, Award, Leaf, UtensilsCrossed, Shield, Truck, MapPin, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Supplier Europe — BPA-Free REACH Compliant Rolls & Labels",
  description:
    "ISO 9001 certified thermal paper supplier for European distributors. BPA-free (EU 2024/3190 compliant), REACH/RoHS certified. Germany, UK, France, Netherlands, Poland. DDP shipping available. Free samples.",
  keywords: "thermal paper supplier Europe, BPA free rolls EU, REACH compliant thermal paper, thermal labels EU wholesale, thermal paper Germany UK France Netherlands Poland",
};

const COMPLIANCE_ICONS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  FileCheck: <FileCheck className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
};

const euRegion = GEO_REGIONS.find((r) => r.slug === "eu")!;

export default function EUPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-5xl">🇪🇺</span>
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600">Europe</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Thermal Paper Supplier<br />for Europe
            </h1>
            <p className="text-slate-500 text-lg max-w-3xl mb-5">
              BPA-free thermal paper rolls and labels for European distributors and importers. Fully compliant with EU Commission Regulation (EU) 2024/3190 BPA ban (effective January 2025). REACH/RoHS certified, ISO 9001 factory, DDP delivery available.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["BPA-Free (EU 2024/3190)", "REACH Compliant", "RoHS Certified", "FSC Paper", "EU Food Contact", "ISO 9001:2015"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-xs tracking-wide uppercase text-slate-600 rounded-lg">
                  <CheckCircle2 className="w-3 h-3 text-blue-600" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm">Get EU Quote <ArrowRight className="w-4 h-4" /></Link>
              <Link href="/samples" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Free Samples</Link>
            </div>
          </div>
        </section>

        {/* EU BPA Regulation Alert */}
        <section className="py-5 bg-amber-50 border-b border-amber-200">
          <div className="container-site flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>EU BPA Ban Update:</strong> EU Commission Regulation (EU) 2024/3190 banned BPA in thermal paper effective January 20, 2025. All Zhixin Paper products are fully compliant — we provide SGS/Intertek BPA-free test reports with every order.{" "}
              <Link href="/compliance/bpa-free" className="underline font-semibold hover:text-amber-900">Learn more →</Link>
            </div>
          </div>
        </section>

        {/* Logistics Bar */}
        <section className="py-5 bg-blue-600 text-white">
          <div className="container-site flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-200" />
              <span className="font-semibold">FOB Qingdao → Hamburg / Rotterdam / Le Havre — 18–25 days sea freight</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-200" />
              <span>Main Ports: <strong>Hamburg (DE) · Rotterdam (NL) · Felixstowe (UK) · Le Havre (FR) · Gdańsk (PL)</strong></span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-blue-200 text-xs">DDP · FOB · CIF available</span>
            </div>
          </div>
        </section>

        {/* EU Countries */}
        <section className="py-20 bg-white">
          <div className="container-site">
            <SectionHeader
              label="EU Markets"
              title="Country-Specific Solutions"
              subtitle="Localized support for major European markets with country-specific compliance documentation, local language support, and port-direct logistics."
              className="mb-12"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {euRegion.countries?.map((country) => {
                const c = country as any;
                return (
                  <Link key={country.slug} href={`/eu/${country.slug}`} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h2 className="font-bold text-slate-900 text-xl group-hover:text-blue-600 transition-colors">{country.name}</h2>
                        <span className="text-xs tracking-widest uppercase text-slate-400">{country.lang} Market</span>
                      </div>
                    </div>
                    {c.description ? (
                      <p className="text-slate-500 text-sm mb-3 line-clamp-2">{c.description}</p>
                    ) : (
                      <p className="text-slate-500 text-sm mb-3">{country.keywords}</p>
                    )}
                    {c.port && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                        <MapPin className="w-3 h-3" />
                        <span>Port: {c.port} · {c.leadTime}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-wide group-hover:gap-3 transition-all">
                      View Details <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* EU Compliance */}
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="container-site">
            <SectionHeader label="EU Compliance" title="Meeting European Standards" subtitle="All products tested and certified to meet EU regulatory requirements. Full documentation provided with every order." className="mb-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {COMPLIANCE_ITEMS.map((item) => (
                <Link key={item.slug} href={`/compliance/${item.slug}`} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-6 group">
                  <div className="flex items-center gap-3 mb-3 text-blue-600">
                    {COMPLIANCE_ICONS[item.icon]}
                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner title="Ready to Source for the EU Market?" subtitle="Get a custom quote with EU compliance documentation included. BPA-free certified, DDP delivery available. Free samples for qualified distributors." />
      </main>
      <Footer />
    </>
  );
}
