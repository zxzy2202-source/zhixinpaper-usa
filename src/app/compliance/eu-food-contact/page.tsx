import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/compliance/eu-food-contact");

export const metadata: Metadata = {
  title: "EU Food-Contact Thermal Paper",
  description: "Thermal paper and label materials for EU food-contact sourcing. Confirm the quoted construction, contact type, migration-test scope, declaration, and end use.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

export default function EUFoodContactPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-teal-800 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-300 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">EU Food Contact</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-teal-500/30 text-teal-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Food Safety</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">EU Food-Contact Material Review</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Thermal paper and label constructions for EU food-related applications must be reviewed against the intended contact type, food category, temperature and duration, migration-test scope, declaration chain, and destination requirements before approval.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Regulatory Framework</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                EU food-contact review starts with the material&apos;s intended use and whether direct or indirect contact is expected. The buyer and qualified advisers should identify the current legislation, guidance, test conditions, declaration chain, and documentation required for the final package.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For a thermal label construction, review may include the facestock, thermal coating, adhesive, liner, inks, varnishes, migration pathway, food category, contact time, and temperature. Applicability cannot be established from a generic product-family statement alone.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  "Identify direct, indirect, or no-food-contact use",
                  "Confirm the complete quoted material construction",
                  "Define food type, contact time, and temperature",
                  "Review current test methods and migration conditions",
                  "Check declarations, report scope, dates, and legal entities",
                ].map((reg, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-teal-500 rounded-full flex-shrink-0" />
                    {reg}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Food Contact Applications</h2>
              <div className="space-y-4">
                {[
                  { app: "Bakery & Deli Labels", desc: "Price labels, ingredient labels, and best-before labels for bakery and deli counter products." },
                  { app: "Fresh Produce Labels", desc: "Fruit and vegetable labels, PLU stickers, and traceability labels for fresh produce." },
                  { app: "Cold Chain Labels", desc: "Temperature-resistant labels for refrigerated and frozen food products." },
                  { app: "Receipt Paper (Food Service)", desc: "POS receipt paper for restaurants, cafes, and food service operations." },
                  { app: "Packaging Labels", desc: "Labels applied to food packaging materials including plastic, glass, and metal containers." },
                ].map((item, i) => (
                  <div key={i} className="bg-teal-50  p-4 border border-teal-100">
                    <h3 className="font-semibold text-slate-800 text-sm mb-1">{item.app}</h3>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-teal-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Request Food Contact Documentation</h2>
          <p className="text-teal-100 mb-8">Share the quoted construction, intended food-contact scenario, destination, test conditions, and buyer documentation checklist. We will confirm which current declarations or reports can be supplied for review.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-teal-700 font-semibold px-8 py-3  hover:bg-teal-50 transition-colors">Review Document Process</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Contact Compliance Team</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need EU Food-Contact Documentation?" subtitle="Send the intended use, material construction, contact conditions, destination, and required document scope for project-specific review." primaryLabel="Request Document Review" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
