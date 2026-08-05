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
  return COMPLIANCE_ITEMS.filter((c) => c.slug !== "bpa-free").map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = COMPLIANCE_ITEMS.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.name} Documentation`,
    description: `Review ${item.name} requirements and available document routes for thermal paper rolls and labels. Confirm the exact grade, test scope, market, and use.`,
    alternates: {
      canonical: canonicalUrl(`/compliance/${slug}`),
      languages: {
        en: canonicalUrl(`/compliance/${slug}`),
        "x-default": canonicalUrl(`/compliance/${slug}`),
      },
    },
  };
}

const COMPLIANCE_DETAILS: Record<string, { title: string; details: string[]; markets: string[]; products: string[] }> = {
  "bpa-free": {
    title: "BPA-Free Thermal Paper Review",
    details: [
      "BPA-free, BPS-free, and phenol-free are distinct material routes and should be named in the quotation",
      "Chemistry claims must be matched to the exact grade, supplier, report scope, and current validity",
      "Destination rules and buyer standards are reviewed against the intended use",
      "Batch or shipment documents are supplied only when included in the approved project scope",
    ],
    markets: ["European Union", "United States", "Canada", "Other markets by review"],
    products: ["Selected thermal paper rolls", "Selected thermal labels", "Custom printed constructions"],
  },
  "reach-rohs": {
    title: "REACH & RoHS Document Review",
    details: [
      "REACH scope is reviewed against the exact material, substance declaration, destination, and intended use",
      "RoHS relevance is assessed for the finished application rather than assumed for every paper product",
      "Available declarations or reports are checked for supplier, sample, method, date, and covered substances",
      "The quotation records which documents are included for the selected SKU",
    ],
    markets: ["European Union", "United Kingdom by separate scope review"],
    products: ["Quoted thermal paper grades", "Quoted label constructions"],
  },
  "iso-9001": {
    title: "Quality-System Document Review",
    details: [
      "Available quality-system documents are reviewed for holder, site, scope, issuer, and validity",
      "Product inspection and batch records are defined separately from management-system documents",
      "Raw-material, in-process, and finished-goods controls are agreed by project specification",
      "Requested quality records should be listed in the quotation before order approval",
    ],
    markets: ["Markets covered by the document scope"],
    products: ["Products manufactured within the verified site and scope"],
  },
  "fsc-paper": {
    title: "Chain-of-Custody Paper Options",
    details: [
      "Chain-of-custody availability depends on the selected paper, supplier route, production site, and order scope",
      "Logo or claim use requires project-specific approval and applicable trademark rules",
      "The quotation should identify the exact claim, evidence, and transaction-document requirements",
      "Do not infer chain-of-custody status from a generic paper description",
    ],
    markets: ["Markets accepted by the verified chain-of-custody route"],
    products: ["Selected standard rolls", "Selected custom printed rolls"],
  },
  "eu-food-contact": {
    title: "EU Food-Contact Scope Review",
    details: [
      "Applicable requirements depend on the complete construction, intended food, contact type, time, and temperature",
      "Paper, coating, adhesive, ink, and plastic components may require different regulatory assessments",
      "Available migration or declaration documents are matched to the tested sample and conditions",
      "The buyer should approve the intended use and required evidence before production",
    ],
    markets: ["European destinations by applicable scope"],
    products: ["Selected paper rolls", "Selected direct thermal label constructions"],
  },
  "fda-us": {
    title: "US Food-Contact Document Review",
    details: [
      "Applicable 21 CFR provisions are identified from the complete construction and intended conditions of use",
      "Paper, paperboard, adhesive, coating, and ink components are reviewed separately where relevant",
      "Available declarations or tests are matched to the exact quoted grade and report scope",
      "California chemical and warning requirements are reviewed separately for the selected material",
    ],
    markets: ["United States by intended-use review"],
    products: ["Selected thermal paper grades", "Selected label constructions", "Food-label projects by scope"],
  },
  "phenol-free": {
    title: "Phenol-Free Thermal Paper Review",
    details: [
      "The quotation must define whether the selected route is BPA-free, BPS-free, or phenol-free",
      "Available chemistry reports are matched to the exact grade and tested substance list",
      "Retailer specifications and destination requirements are reviewed as separate project inputs",
      "Size, supply plan, MOQ, and lead time are confirmed for the selected material rather than assumed",
    ],
    markets: ["European and other markets by requirement review"],
    products: ["Selected POS rolls", "Selected custom printed rolls", "Selected back-print rolls"],
  },
  "iso-15223": {
    title: "Medical-Label Symbol and Material Review",
    details: [
      "The buyer supplies and approves the applicable device-label symbols, language, and regulatory artwork",
      "Material selection is based on substrate, temperature, chemicals, sterilization exposure, and retention target",
      "Resistance and readability claims require tests using the actual print system and intended process",
      "Finished-label regulatory approval remains with the device manufacturer and its qualified advisers",
    ],
    markets: ["Healthcare projects by jurisdiction and device scope"],
    products: ["Medical rolls", "Wristband labels", "Cold-chain label constructions"],
  },
};

export default async function ComplianceDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = COMPLIANCE_ITEMS.find((c) => c.slug === slug);
  if (!item) notFound();

  const details = COMPLIANCE_DETAILS[slug] || {
    title: item.name,
    details: [item.description],
    markets: ["Markets confirmed by project review"],
    products: ["Products covered by the quoted grade and document scope"],
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
               <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Document Review</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">{details.title}</h1>
            <p className="text-slate-500 text-lg max-w-2xl mb-6">{item.description}</p>
            <div className="flex flex-wrap gap-3">
               <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm">Request Documents <Download className="w-4 h-4" /></Link>
               <Link href="/quote" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold  hover:border-blue-400 hover:text-blue-600 transition-all text-sm">Request Product Review</Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                 <h2 className="font-bold text-slate-900 text-3xl mb-6">Review Details</h2>
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
                   <p className="text-slate-500 text-sm mb-4">Share the exact product, intended use, destination, and required document list. Availability and scope will be confirmed for the quoted SKU.</p>
                  <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold  transition-colors shadow-sm text-sm w-full justify-center text-sm">
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white border border-slate-200 p-6">
                   <h3 className="font-bold text-slate-900 text-lg mb-4">Other Document Topics</h3>
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

         <CTABanner title="Need Project Documentation?" subtitle="Request documents matched to the exact material, intended use, destination, and report scope." primaryLabel="Request Documents" />
      </main>
      <Footer />
    </>
  );
}
