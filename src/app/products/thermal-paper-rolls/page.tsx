import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { THERMAL_PAPER_ROLLS } from "@/lib/data";
import { THERMAL_ROLL_SCENARIOS } from "@/lib/marketInsights";
import { canonicalUrl } from "@/lib/seo";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Thermal Paper Rolls — POS, ATM, Lottery, Casino, Medical | Wholesale",
  description:
    "Wholesale thermal paper rolls: POS receipt rolls, ATM paper, lottery ticket paper, casino TITO rolls, parking tickets, medical paper, and custom OEM rolls. ISO 9001 certified, BPA-free, FDA-compliant manufacturer. Factory-direct pricing with pallet and container load options.",
  keywords: [
    "thermal paper rolls wholesale",
    "POS receipt paper rolls",
    "ATM paper rolls supplier",
    "lottery ticket thermal paper",
    "casino TITO paper rolls",
    "medical thermal paper rolls",
    "parking ticket paper",
    "custom printed thermal rolls",
    "BPA free thermal paper rolls",
    "thermal paper rolls manufacturer China",
    "bulk thermal paper rolls USA",
  ],
  alternates: { canonical: canonicalUrl("/products/thermal-paper-rolls") },
};

export default function ThermalPaperRollsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-[#87918c]">
              <Link href="/products" className="hover:text-[#0f5f5c] transition-colors">Products</Link>
              <span>/</span>
              <span className="text-[#4f5f5a]">Thermal Paper Rolls</span>
            </nav>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#b9822f]" />
              <span className="text-xs font-bold text-[#0f5f5c]">Thermal Paper Rolls</span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Thermal Paper Rolls
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Choose thermal paper rolls by the buying scenario: POS receipts, payment terminals, kitchen tickets, lottery and casino tickets, parking tickets, or custom printed campaigns. We help distributors confirm size, coating, documents, packaging, and landed cost before bulk orders.
            </p>
            <div className="flex flex-wrap gap-3">
              {["BPA-Free Documents", "Roll Size Control", "Scan Reliability", "OEM Printing", "Pallet & DDP Options"].map((f) => (
                <span key={f} className="flex items-center gap-1.5 border border-[#ded6c8] bg-[#f4f0e8] px-3 py-1.5 text-xs font-semibold text-[#4f5f5a]">
                  <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]" />
                  {f}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6] py-16">
          <div className="container-site">
            <div className="mb-8 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="section-label">Buying scenarios</p>
                <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                  Match the roll to the risk your buyer is trying to avoid.
                </h2>
              </div>
              <p className="text-sm leading-7 text-[#4f5f5a]">
                The same paper width can behave very differently in a supermarket POS, a mobile payment terminal,
                a lottery machine, or an outdoor parking kiosk. Start with the use case, then confirm the spec.
              </p>
            </div>

            <div className="overflow-x-auto border border-[#ded6c8]">
              <table className="min-w-[980px] w-full text-left">
                <thead className="bg-[#101b19] text-white">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold">Scenario</th>
                    <th className="px-5 py-4 text-xs font-bold">Common spec</th>
                    <th className="px-5 py-4 text-xs font-bold">Buyer risk</th>
                    <th className="px-5 py-4 text-xs font-bold">Recommended path</th>
                    <th className="px-5 py-4 text-xs font-bold">Ask for</th>
                  </tr>
                </thead>
                <tbody>
                  {THERMAL_ROLL_SCENARIOS.map((scenario, index) => (
                    <tr key={scenario.scenario} className={index % 2 === 0 ? "bg-[#fbfaf6]" : "bg-[#f4f0e8]"}>
                      <td className="px-5 py-5 align-top text-sm font-bold text-[#14211f]">{scenario.scenario}</td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.commonSpec}</td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.buyerRisk}</td>
                      <td className="px-5 py-5 align-top">
                        <Link href={scenario.href} className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745]">
                          {scenario.recommendedProduct}
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </td>
                      <td className="px-5 py-5 align-top text-sm text-[#4f5f5a]">{scenario.askFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Product line</p>
                <h2 className="mt-3 text-3xl font-bold text-[#14211f] md:text-4xl">
                  Roll options for repeat orders.
                </h2>
              </div>
              <Link href="/quote" className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745]">
                Send a roll spec
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THERMAL_PAPER_ROLLS.map((roll) => (
                <Link key={roll.slug} href={`/products/thermal-paper-rolls/${roll.slug}`} className="border border-[#ded6c8] bg-[#fbfaf6] hover:border-[#0f5f5c]/40 hover:bg-[#f4f0e8] transition-all p-6 group">
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="font-bold text-[#14211f] text-xl group-hover:text-[#0f5f5c] transition-colors">{roll.name}</h2>
                    {roll.tag && (
                      <span className={`ml-2 shrink-0 border px-2 py-0.5 text-[10px] font-bold ${roll.tag === "New" ? "border-[#0f5f5c]/25 bg-[#0f5f5c]/10 text-[#0f5f5c]" : "bg-[#e7eee9] text-[#0f5f5c] border-[#0f5f5c]/25"}`}>{roll.tag}</span>
                    )}
                  </div>
                  <p className="text-[#4f5f5a] text-sm mb-4">{roll.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    {roll.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-[#4f5f5a]">
                        <CheckCircle2 className="w-3 h-3 text-[#0f5f5c]/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="divider pt-4 flex items-center justify-between">
                    <span className="text-[#87918c] text-xs">MOQ: {roll.moq}</span>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0f5f5c]">
                      Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
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
