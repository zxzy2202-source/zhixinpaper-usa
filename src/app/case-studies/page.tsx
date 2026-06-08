import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Customer Case Studies | Thermal Paper & Label Solutions",
  description: "Real-world case studies from Zhixin Paper customers across Europe, USA, and Canada. See how distributors and manufacturers solve thermal paper challenges.",
  keywords: "thermal paper case studies, thermal label customer stories, distributor case study",
  alternates: { canonical: canonicalUrl("/case-studies") },
};

const caseStudies = [
  {
    id: "eu-lottery-operator",
    client: "Major European Lottery Operator",
    country: "Germany",
    flag: "🇩🇪",
    industry: "Lottery & Gaming",
    challenge: "Inconsistent barcode scan rates across 12,000 lottery terminals causing player complaints and revenue loss.",
    solution: "Switched to Zhixin Paper premium lottery paper with ±2% coating uniformity guarantee. Implemented batch-specific QC certificates for every delivery.",
    results: [
      "Scan failure rate reduced from 0.8% to 0.02%",
      "Player complaints eliminated within 30 days",
      "Annual consumable cost reduced by 12% through consolidated supply",
    ],
    volume: "8 million rolls/year",
    tag: "Gaming",
  },
  {
    id: "uk-retail-chain",
    client: "UK National Supermarket Chain",
    country: "United Kingdom",
    flag: "🇬🇧",
    industry: "Retail POS",
    challenge: "Transitioning 2,400 stores to BPA-free thermal paper ahead of EU REACH deadline while maintaining supply continuity.",
    solution: "Phased transition program over 6 months. Full REACH compliance documentation provided for all stores. Dedicated account manager for supply chain coordination.",
    results: [
      "100% REACH compliant across all stores before deadline",
      "Zero supply disruptions during transition",
      "Single-source supply reduced procurement complexity by 60%",
    ],
    volume: "15 million rolls/year",
    tag: "Retail",
  },
  {
    id: "us-cold-chain-distributor",
    client: "US Cold Chain Logistics Provider",
    country: "United States",
    flag: "🇺🇸",
    industry: "Cold Chain & Logistics",
    challenge: "Labels falling off frozen food packaging at -25°C storage, causing traceability failures and regulatory non-compliance.",
    solution: "Specified Zhixin Paper freezer-grade labels with all-temperature adhesive (-40°C to +80°C). Conducted on-site application testing before full rollout.",
    results: [
      "Zero label failures in 18 months of operation",
      "FDA 21 CFR food contact compliance maintained",
      "Traceability audit pass rate improved from 94% to 100%",
    ],
    volume: "2 million labels/month",
    tag: "Cold Chain",
  },
  {
    id: "canadian-cannabis-dispensary",
    client: "Multi-State Cannabis Dispensary Group",
    country: "Canada",
    flag: "🇨🇦",
    industry: "Cannabis Specialty",
    challenge: "Compliance with varying cannabis label requirements across 5 US states and 2 Canadian provinces simultaneously.",
    solution: "Custom label program with state-specific templates. Thermal transfer labels for inventory, direct thermal for point-of-sale. Full compliance review for each jurisdiction.",
    results: [
      "100% compliance across all 7 jurisdictions",
      "Label design time reduced by 70% through template system",
      "Regulatory inspection pass rate maintained at 100%",
    ],
    volume: "500,000 labels/month",
    tag: "Cannabis",
  },
  {
    id: "french-hospital-network",
    client: "French Hospital Network",
    country: "France",
    flag: "🇫🇷",
    industry: "Healthcare",
    challenge: "Patient wristband labels failing in high-humidity environments and during patient bathing, causing re-labeling and patient safety risks.",
    solution: "Specified Zhixin Paper synthetic wristband labels with moisture-resistant adhesive. BPA-free, skin-safe formulation meeting French healthcare standards.",
    results: [
      "Wristband failure rate reduced from 15% to 0.3%",
      "Re-labeling incidents eliminated",
      "Patient safety audit compliance achieved",
    ],
    volume: "300,000 wristbands/month",
    tag: "Healthcare",
  },
  {
    id: "dutch-transport-operator",
    client: "Dutch Public Transport Operator",
    country: "Netherlands",
    flag: "🇳🇱",
    industry: "Transportation",
    challenge: "Outdoor transport tickets fading within 24 hours in wet weather conditions, causing passenger disputes and validator failures.",
    solution: "Upgraded to Zhixin Paper top-coated transport ticket paper with UV-stabilised coating and moisture-resistant topcoat.",
    results: [
      "Ticket legibility maintained for full 30-day validity period",
      "Passenger disputes reduced by 85%",
      "Validator scan failure rate reduced from 2.1% to 0.05%",
    ],
    volume: "5 million tickets/month",
    tag: "Transport",
  },
];

const tagColors: Record<string, string> = {
  Gaming: "bg-purple-100 text-purple-700",
  Retail: "bg-blue-100 text-blue-700",
  "Cold Chain": "bg-cyan-100 text-cyan-700",
  Cannabis: "bg-green-100 text-green-700",
  Healthcare: "bg-red-100 text-red-700",
  Transport: "bg-orange-100 text-orange-700",
};

export default function CaseStudiesPage() {
  return (
    <>
    <Header />
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Case Studies</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Customer Success</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Real Results from Real Customers</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              See how distributors, operators, and manufacturers across Europe, USA, and Canada have solved their thermal paper and label challenges with Zhixin Paper.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl">
            {[
              { value: "500+", label: "Customers Served" },
              { value: "80+", label: "Countries" },
              { value: "99.8%", label: "On-Time Delivery" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-blue-200 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {caseStudies.map((cs) => (
              <div key={cs.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cs.flag}</span>
                      <div>
                        <div className="font-bold text-slate-800 text-sm">{cs.client}</div>
                        <div className="text-slate-400 text-xs">{cs.country}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${tagColors[cs.tag] || "bg-slate-100 text-slate-600"}`}>{cs.tag}</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Challenge</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{cs.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Solution</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{cs.solution}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Results</h3>
                      <ul className="space-y-1">
                        {cs.results.map((result, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                            </span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Volume: <span className="font-semibold text-slate-600">{cs.volume}</span></span>
                    <Link href="/contact" className="text-blue-600 text-xs font-semibold hover:text-blue-800 flex items-center gap-1">
                      Similar requirement? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Covered */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Industries We Serve</h2>
          <p className="text-slate-500 mb-8">From lottery operators to cold chain logistics, we have deep expertise across all major thermal paper and label applications.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {["Retail POS", "Lottery & Gaming", "Casino", "Banking & Finance", "Healthcare", "Cold Chain", "Logistics", "Transportation", "Automotive", "Events", "Government", "Cannabis"].map((ind) => (
              <Link key={ind} href="/industries" className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm">
                {ind}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Become Our Next Success Story?</h2>
          <p className="text-blue-100 mb-8">Tell us about your challenge. Our technical team will recommend the right product and provide a competitive quote within 24 hours.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-lg hover:bg-blue-50 transition-colors">Get a Quote</Link>
            <Link href="/samples" className="border-2 border-white text-white font-semibold px-10 py-4 rounded-lg hover:bg-white/10 transition-colors">Request Samples</Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
