import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowLeft, CheckCircle, TrendingUp, Users, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";


type Props = { params: Promise<{ slug: string }> };

const CASE_STUDIES = [
  {
    slug: "european-lottery-operator",
    title: "European Lottery Operator Cuts Receipt Failures by 94%",
    client: "Major European Lottery Operator",
    industry: "Lottery & Gaming",
    region: "Europe",
    challenge: "A leading European lottery operator was experiencing frequent thermal paper jams and faded ticket prints across 12,000 TITO terminals, resulting in costly downtime and customer complaints. Their existing supplier could not meet the strict 150°C print head temperature requirements of their high-speed terminals.",
    solution: "Zhixin Paper engineered a custom high-sensitivity thermal paper with a 160°C-rated coating, optimized for their specific terminal models. We supplied 80mm × 80mm rolls in a custom coreless format to eliminate core-related jams, with a 6-month stock buffer program to guarantee zero supply interruptions.",
    results: [
      { metric: "94%", label: "Reduction in paper-related terminal failures" },
      { metric: "€2.1M", label: "Annual savings from reduced downtime" },
      { metric: "12,000", label: "Terminals migrated within 8 weeks" },
      { metric: "100%", label: "REACH/RoHS compliance maintained" },
    ],
    quote: "Zhixin Paper understood our technical requirements from day one. The custom specification and reliable supply program transformed our operations.",
    quoteAuthor: "Head of Operations, European Lottery Operator",
    tags: ["Lottery", "Custom Specification", "Europe", "High Volume"],
    relatedProducts: [
      { name: "Lottery & Gaming Rolls", href: "/products/thermal-paper-rolls/lottery-gaming-rolls" },
      { name: "Casino TITO Rolls", href: "/products/thermal-paper-rolls/casino-tito-rolls" },
    ],
  },
  {
    slug: "us-pharmacy-chain",
    title: "US Pharmacy Chain Achieves FDA Compliance Across 800 Locations",
    client: "Regional US Pharmacy Chain",
    industry: "Healthcare & Pharma",
    region: "United States",
    challenge: "A fast-growing US pharmacy chain needed to transition all 800 locations to FDA 21 CFR-compliant, BPA-free thermal paper ahead of new state regulations. They required a single supplier capable of delivering consistent quality at scale, with full documentation for regulatory audits.",
    solution: "Zhixin Paper supplied BPA-free, FDA 21 CFR 176.170-compliant thermal paper rolls in standard pharmacy formats (57mm × 40m). We provided a complete compliance documentation package including Certificates of Conformance, Safety Data Sheets, and third-party test reports. A dedicated account manager coordinated the 8-week nationwide rollout.",
    results: [
      { metric: "800", label: "Locations transitioned in 8 weeks" },
      { metric: "100%", label: "FDA compliance achieved across all sites" },
      { metric: "Zero", label: "Regulatory audit findings related to paper" },
      { metric: "15%", label: "Cost reduction vs. previous supplier" },
    ],
    quote: "The compliance documentation package Zhixin Paper provided was exactly what our regulatory team needed. Seamless transition, zero issues.",
    quoteAuthor: "VP Procurement, US Pharmacy Chain",
    tags: ["Healthcare", "FDA Compliance", "BPA-Free", "USA"],
    relatedProducts: [
      { name: "Medical Paper Rolls", href: "/products/thermal-paper-rolls/medical-rolls" },
      { name: "FDA Compliant Paper", href: "/us/fda-compliant" },
    ],
  },
  {
    slug: "german-logistics-provider",
    title: "German 3PL Reduces Label Waste by 40% with Custom Fanfold Solution",
    client: "Leading German Third-Party Logistics Provider",
    industry: "Logistics & Warehouse",
    region: "Germany",
    challenge: "A major German 3PL was experiencing 12% label waste rates due to misfeeds and jamming in their high-throughput warehouse label printers. Their standard roll labels were causing frequent printer downtime during peak periods, impacting SLA performance.",
    solution: "Zhixin Paper developed a custom fanfold label solution with precision-folded 100mm × 150mm labels, optimized for their Zebra ZT600 series printers. The custom fold depth and perforation placement eliminated misfeeds entirely. We also implemented a vendor-managed inventory program with 4-week safety stock held in our European warehouse.",
    results: [
      { metric: "40%", label: "Reduction in label waste" },
      { metric: "Zero", label: "Printer jams recorded in first 6 months" },
      { metric: "99.8%", label: "Label read rate in automated scanning" },
      { metric: "3 days", label: "Lead time from European warehouse" },
    ],
    quote: "The custom fanfold specification and European stock program gave us the reliability we needed for our peak season operations.",
    quoteAuthor: "Warehouse Operations Director, German 3PL",
    tags: ["Logistics", "Fanfold Labels", "Germany", "Custom Specification"],
    relatedProducts: [
      { name: "Fanfold Labels", href: "/products/thermal-labels/fanfold-labels" },
      { name: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels" },
    ],
  },
  {
    slug: "canadian-cannabis-dispensary",
    title: "Canadian Cannabis Retailer Achieves Health Canada Compliance at Scale",
    client: "Multi-Province Canadian Cannabis Retailer",
    industry: "Cannabis & Specialty",
    region: "Canada",
    challenge: "A rapidly expanding Canadian cannabis retailer needed compliant thermal labels for product packaging across 45 dispensary locations in three provinces. Health Canada regulations required specific durability, adhesion, and print quality standards, while the retailer also needed variable data printing for lot numbers and expiry dates.",
    solution: "Zhixin Paper supplied synthetic PP thermal labels with permanent adhesive, rated for cannabis packaging environments including humidity and cold storage. We implemented a variable data printing program with serialised lot numbers and QR codes. All labels were supplied with Health Canada compliance documentation.",
    results: [
      { metric: "45", label: "Dispensary locations supplied" },
      { metric: "100%", label: "Health Canada compliance across all SKUs" },
      { metric: "99.9%", label: "QR code scan success rate" },
      { metric: "2 weeks", label: "Lead time for custom variable data labels" },
    ],
    quote: "Zhixin Paper navigated the Health Canada requirements expertly and delivered a labeling solution that scaled with our expansion.",
    quoteAuthor: "Compliance Manager, Canadian Cannabis Retailer",
    tags: ["Cannabis", "Health Canada", "Variable Data", "Canada"],
    relatedProducts: [
      { name: "Canada Cannabis Labels", href: "/ca/cannabis-labels" },
      { name: "Synthetic PP Labels", href: "/products/thermal-labels/synthetic-paper-labels" },
    ],
  },
];

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) return { title: "Case Study Not Found" };
  return {
    title: `${cs.title} | Case Studies`,
    description: cs.challenge.slice(0, 160),
    alternates: { canonical: canonicalUrl(`/case-studies/${slug}`) },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const cs = CASE_STUDIES.find((c) => c.slug === slug);
  if (!cs) notFound();

  return (

    <>
      <Header />
      <main className="pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Case Studies
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {cs.tags.map((tag) => (
              <span key={tag} className="text-xs font-semibold bg-white/10 text-slate-300 px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">{cs.title}</h1>
          <div className="flex flex-wrap gap-6 text-slate-400 text-sm">
            <span className="flex items-center gap-1.5"><Users className="w-4 h-4" />{cs.client}</span>
            <span className="flex items-center gap-1.5"><Package className="w-4 h-4" />{cs.industry}</span>
            <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4" />{cs.region}</span>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-blue-200 mb-6">Key Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cs.results.map((r) => (
              <div key={r.label} className="text-center">
                <div className="text-3xl font-extrabold text-white mb-1">{r.metric}</div>
                <div className="text-blue-200 text-sm">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-10">
              {/* Challenge */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center text-red-600 text-sm font-bold">01</span>
                  The Challenge
                </h2>
                <p className="text-slate-600 leading-relaxed">{cs.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-sm font-bold">02</span>
                  Our Solution
                </h2>
                <p className="text-slate-600 leading-relaxed">{cs.solution}</p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-blue-500 pl-6 py-2">
                <p className="text-slate-700 italic text-lg leading-relaxed mb-3">"{cs.quote}"</p>
                <cite className="text-slate-500 text-sm font-semibold not-italic">— {cs.quoteAuthor}</cite>
              </blockquote>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Results detail */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4">Results Summary</h3>
                <div className="space-y-3">
                  {cs.results.map((r) => (
                    <div key={r.label} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-900">{r.metric}</span>
                        <span className="text-slate-500 text-sm ml-1">{r.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Products */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-slate-900 mb-4">Products Used</h3>
                <div className="space-y-2">
                  {cs.relatedProducts.map((p) => (
                    <Link key={p.href} href={p.href} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium group">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-slate-900 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Similar Challenge?</h3>
                <p className="text-slate-400 text-sm mb-4">Tell us your requirements and we'll engineer a solution.</p>
                <Link href="/quote" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                  Get a Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other case studies */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-lg font-bold text-slate-900 mb-6">More Case Studies</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {CASE_STUDIES.filter((c) => c.slug !== slug).slice(0, 3).map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="text-xs font-semibold text-blue-600 mb-2">{c.industry}</div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">{c.title}</h3>
                <div className="flex items-center gap-1 text-xs text-slate-400 mt-3">
                  Read case study <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
