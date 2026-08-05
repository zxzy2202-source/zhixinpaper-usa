import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/oem-custom/custom-printing");

export const metadata: Metadata = {
  title: "Custom Printed Thermal Paper | Logo Printed Receipt Rolls",
  description: "Custom printed thermal paper rolls and labels developed through artwork, print-method, color, sample, quantity, packing, and production review.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const printOptions = [
  { name: "Logo & Branding", desc: "Print your company logo, brand colors, and tagline on every roll. Ideal for retail chains and hospitality businesses." },
  { name: "Promotional Messaging", desc: "Add promotional offers, loyalty program information, or seasonal campaigns directly to your receipt paper." },
  { name: "QR Codes & URLs", desc: "Drive digital engagement with printed QR codes linking to your website, app, or loyalty program." },
  { name: "Legal & Compliance Text", desc: "Pre-print required legal text, return policies, or compliance statements to save time at the point of sale." },
  { name: "Custom Back Printing", desc: "Utilise the reverse side of receipt paper for advertising, maps, or additional brand messaging." },
  { name: "Variable Data Printing", desc: "Serialised numbering, unique codes, or batch identifiers for traceability and anti-counterfeiting applications." },
];

export default function CustomPrintingPage() {
  return (

    <>
      <Header />
      <main id="main-content" className="legacy-brand-page min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Custom print planning"
        title="Custom Printed Thermal Paper"
        description="Develop branded rolls or labels through artwork review, print-method selection, color and registration checks, sampling, and project-specific production planning."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM & Custom", href: "/oem-custom" },
          { label: "Custom Printing" },
        ]}
        actions={[
          { label: "Request a Printing Review", href: "/quote", kind: "primary" },
          { label: "Plan Print Samples", href: "/samples", kind: "secondary" },
        ]}
      />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Custom Printing Options</h2>
          <p className="text-slate-500 mb-12 max-w-2xl">We offer a full range of custom printing options for thermal paper rolls and labels, from simple logo printing to complex multi-color designs.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {printOptions.map((opt, i) => (
              <div key={i} className="bg-white border border-slate-200  p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-slate-800 mb-2">{opt.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">Technical Specifications</h2>
          <div className="overflow-x-auto  border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Printing Method", "Flexographic (water-based inks)"],
                  ["Colors", "Up to 4 colors per side (front and/or back)"],
                  ["Color Matching", "Pantone color matching available"],
                  ["Minimum Print Area", "10mm × 10mm"],
                  ["Registration Accuracy", "±0.5mm"],
                  ["Minimum Order Quantity", "Confirmed by material, artwork, print setup, tooling, packing, and quantity"],
                  ["Production Schedule", "Confirmed after artwork, proof or sample, capacity, and packing review"],
                  ["Artwork Format", "AI, EPS, PDF (vector preferred)"],
                ].map(([key, val]) => (
                  <tr key={key} className="hover:bg-blue-50/30">
                    <td className="px-6 py-4 font-medium text-slate-700 w-1/2 md:w-1/3">{key}</td>
                    <td className="px-6 py-4 text-slate-500">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </main>
      <CTABanner
        title="Ready to review custom printing?"
        subtitle="Share the product dimensions, material, artwork, colors, quantity, packing, and destination so the print route and schedule can be assessed."
        showTrust={false}
      />
    <Footer />
    </>
  );
}
