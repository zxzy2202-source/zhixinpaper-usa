import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";



export const metadata: Metadata = {
  title: "EU Food-Contact Thermal Paper",
  description: "Thermal paper and label materials for EU food-contact sourcing. Confirm the quoted construction, contact type, migration-test scope, declaration, and end use.",
  keywords: "EU food contact thermal paper, food safe labels Europe, food contact labels EU",
  alternates: { canonical: canonicalUrl("/compliance/eu-food-contact") },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">EU Food Contact Compliant Thermal Paper</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Our food-contact grade thermal paper and labels meet the requirements of EU Framework Regulation (EC) No 1935/2004 and Plastics Regulation (EU) No 10/2011, ensuring safe use in food packaging and labeling applications.
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
                EU Regulation (EC) No 1935/2004 establishes the general framework for all food contact materials in the European Union. It requires that materials do not transfer substances to food in quantities that could endanger human health or cause unacceptable changes in the composition of the food.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                For thermal paper specifically, the key requirements relate to the thermal coating chemicals and adhesive systems used in label products. Our food-contact grades use only approved substances within permitted migration limits.
              </p>
              <div className="space-y-3 mt-6">
                {[
                  "EU Framework Regulation (EC) No 1935/2004",
                  "EU Plastics Regulation (EU) No 10/2011",
                  "BPA restriction under REACH (EU) 2016/2235",
                  "French Grenelle II food contact requirements",
                  "German BfR Recommendation XXXVI",
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
          <p className="text-teal-100 mb-8">Our food contact declarations and test reports are available for all food-safe product grades.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/compliance/certificates" className="bg-white text-teal-700 font-semibold px-8 py-3  hover:bg-teal-50 transition-colors">Download Certificates</Link>
            <Link href="/contact" className="border-2 border-white text-white font-semibold px-8 py-3  hover:bg-white/10 transition-colors">Contact Compliance Team</Link>
          </div>
        </div>
      </section>
    </main>
      <CTABanner title="Need EU Food Contact Documentation?" subtitle="Request our EU food contact compliance declarations and test reports for your market." primaryLabel="Get Documents" secondaryLabel="Request a Quote" />
    <Footer />
    </>
  );
}
