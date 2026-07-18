import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { COMPLIANCE_ITEMS } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2, Download } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return COMPLIANCE_ITEMS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPLIANCE_ITEMS.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} Thermal Paper — Certified & Compliant`,
    description: `${item.description} Zhixin Paper ${item.name} certified thermal paper rolls and labels for distributors in Europe, USA, and Canada.`,
    alternates: { canonical: canonicalUrl(`/compliance/${slug}`) },
  };
}

const COMPLIANCE_DETAILS: Record<string, { title: string; details: string[]; markets: string[]; products: string[] }> = {
  "bpa-free": {
    title: "BPA-Free Thermal Paper",
    details: [
      "All BPA-free products use alternative developers that do not contain Bisphenol A",
      "Tested and certified by accredited third-party laboratories",
      "Compliant with EU REACH regulation restricting BPA in thermal paper",
      "Available for all standard thermal paper roll sizes and thermal labels",
      "Certificate of Analysis (CoA) available for each production batch",
    ],
    markets: ["European Union", "United States", "Canada", "Global"],
    products: ["All thermal paper rolls", "All thermal labels", "Custom printed rolls"],
  },
  "reach-rohs": {
    title: "REACH & RoHS Compliance",
    details: [
      "REACH SVHC (Substances of Very High Concern) tested and compliant",
      "RoHS compliant for thermal labels used in electronic equipment",
      "Annual REACH testing by accredited EU laboratories",
      "Full SVHC declaration available on request",
      "Compliant with EU Regulation EC No 1907/2006 (REACH)",
    ],
    markets: ["European Union", "United Kingdom"],
    products: ["All thermal paper rolls", "All thermal labels"],
  },
  "iso-9001": {
    title: "ISO 9001:2015 Quality Management",
    details: [
      "ISO 9001:2015 certified since 2012, continuously maintained",
      "Annual third-party surveillance audits by accredited certification body",
      "Full quality management system covering all production processes",
      "Documented procedures for raw material inspection, in-process control, and finished goods testing",
      "Customer complaint handling and corrective action procedures",
    ],
    markets: ["Global"],
    products: ["All products"],
  },
  "fsc-paper": {
    title: "FSC Certified Paper",
    details: [
      "FSC Chain of Custody certified for responsible forest management",
      "Paper sourced from FSC-certified forests and controlled sources",
      "Annual FSC audit by accredited certification body",
      "FSC logo available on products and packaging on request",
      "Supports sustainable forestry and biodiversity conservation",
    ],
    markets: ["Global"],
    products: ["Standard thermal paper rolls", "Custom printed rolls"],
  },
  "eu-food-contact": {
    title: "EU Food Contact Compliance",
    details: [
      "Compliant with EU Regulation No 10/2011 on plastic materials for food contact",
      "Suitable for direct and indirect food contact applications",
      "Migration testing performed by accredited laboratories",
      "Declaration of Compliance (DoC) available for each product",
      "Suitable for food packaging labels, receipt paper in food service",
    ],
    markets: ["European Union"],
    products: ["BPA-free thermal paper rolls", "Direct thermal labels"],
  },
  "fda-us": {
    title: "FDA Compliant Thermal Paper",
    details: [
      "Compliant with FDA 21 CFR regulations for food contact materials",
      "BPA-free formulation meeting FDA food contact requirements",
      "Suitable for food packaging labels and food service receipts",
      "Testing documentation available for US market entry",
      "Compliant with US food safety regulations",
    ],
    markets: ["United States"],
    products: ["BPA-free thermal paper rolls", "Direct thermal labels", "Food contact labels"],
  },
  "phenol-free": {
    title: "Phenol-Free Thermal Paper",
    details: [
      "Formulated without BPA, BPS, BPF, or any bisphenol compounds whatsoever",
      "Exceeds EU Commission Regulation 2024/3190 BPA ban — the most stringent phenol-free standard available",
      "Required by major European retail chains (Rewe, Edeka, Aldi, Lidl) for Blauer Engel eco-label compliance",
      "Test reports from SGS and Intertek accredited European laboratories available on request",
      "Suitable for retailers with corporate chemical reduction and sustainability commitments",
      "Available for all standard 80mm and 57mm POS receipt paper sizes with no lead time premium",
    ],
    markets: ["European Union", "Germany", "United Kingdom", "Nordic Countries", "Switzerland"],
    products: ["Standard POS Rolls", "Custom Printed Rolls", "Back Print Thermal Rolls"],
  },
  "iso-15223": {
    title: "ISO 15223 Medical Device Labeling",
    details: [
      "Labeling symbols compliant with ISO 15223-1:2021 medical device symbol standards",
      "Required for CE-marked medical device packaging under EU MDR (EU 2017/745)",
      "Wristband labels and specimen tube labels manufactured to medical labeling standards",
      "Cryogenic grades available for biobank and laboratory specimen storage (down to -80\u00b0C)",
      "Chemical-resistant surface withstands IPA, quaternary ammonium, and hospital disinfectants",
      "Archival coating preserves patient data for up to 10 years per EU MDR record-keeping requirements",
    ],
    markets: ["European Union", "United States", "Canada", "Global Healthcare"],
    products: ["Medical Rolls", "Wristband Labels", "Freezer Cold Chain Labels"],
  },
};

export default async function ComplianceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = COMPLIANCE_ITEMS.find((c) => c.slug === slug);
  if (!item) notFound();

  const details = COMPLIANCE_DETAILS[slug] || {
    title: item.name,
    details: [item.description],
    markets: ["Global"],
    products: ["All thermal paper products"],
  };

  const related = COMPLIANCE_ITEMS.filter((c) => c.slug !== slug);

  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6 uppercase tracking-wide">
              <Link href="/compliance" className="hover:text-blue-600 transition-colors">Compliance</Link>
              <span>/</span>
              <span className="text-slate-500">{item.name}</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Certification</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">{details.title}</h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-6">{item.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm">Request Certificate <Download className="w-4 h-4" /></Link>
              <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Get Compliant Products</Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="font-bold text-slate-900 text-3xl mb-6">Certification Details</h2>
                <div className="space-y-3 mb-10">
                  {details.details.map((d, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-slate-500 text-base leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 text-2xl mb-4">Applicable Products</h3>
                <div className="flex flex-wrap gap-2 mb-10">
                  {details.products.map((p) => (
                    <span key={p} className="px-3 py-1.5 bg-blue-600/10 border border-blue-500/20 text-xs text-blue-600 uppercase tracking-wide">{p}</span>
                  ))}
                </div>

                <h3 className="font-bold text-slate-900 text-2xl mb-4">Markets</h3>
                <div className="flex flex-wrap gap-2">
                  {details.markets.map((m) => (
                    <span key={m} className="px-3 py-1.5 bg-white border border-slate-200 text-xs text-slate-500 uppercase tracking-wide">{m}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="bg-white border border-slate-200 p-6 mb-5">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Request Documentation</h3>
                  <p className="text-slate-500 text-sm mb-4">Certificates, test reports, and declarations available for qualified distributors.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm w-full justify-center text-sm">
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">Other Certifications</h3>
                  <div className="space-y-2">
                    {related.map((r) => (
                      <Link key={r.slug} href={`/compliance/${r.slug}`} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 text-sm transition-colors">
                        <ArrowRight className="w-3 h-3 text-blue-600/50 shrink-0" />
                        {r.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CTABanner title="Need Compliance Documentation?" subtitle="Request certificates and test reports for your market. Available within 24 hours." primaryLabel="Request Documents" />
      </main>
      <Footer />
    </>
  );
}
