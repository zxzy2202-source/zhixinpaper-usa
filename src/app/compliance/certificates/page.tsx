import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/compliance/certificates");

export const metadata: Metadata = {
  title: "Thermal Paper Documentation Requests",
  description: "Request current, product-specific thermal paper declarations, test reports, and management-system documents for project review.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

const certificates = [
  { name: "Quality Management Documentation", scope: "Available scope and current status confirmed during project review" },
  { name: "Bisphenol Declaration", scope: "Provided for the selected thermal paper or label grade when available" },
  { name: "REACH / SVHC Statement", scope: "Reviewed against the selected material and current supplier documentation" },
  { name: "RoHS Declaration", scope: "Provided when relevant to the product construction and intended application" },
  { name: "Responsible Fiber Documentation", scope: "Availability depends on the approved base paper and chain-of-custody scope" },
  { name: "Food-Contact Documentation", scope: "Requires review of material, intended contact, jurisdiction, and current evidence" },
  { name: "Safety Data or Technical Data", scope: "Supplied according to product type, document availability, and project need" },
  { name: "Batch or Product Test Report", scope: "Test items and acceptance criteria agreed before production where applicable" },
];

export default function CertificatesPage() {
  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-blue-100 text-sm mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/compliance" className="hover:text-white">Compliance</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Certificates</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block bg-blue-500/30 text-blue-200 text-sm font-medium px-3 py-1 rounded-full mb-4">Documentation Request Centre</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Product Documentation for Buyer Review</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Request the current documents relevant to your selected product, intended use, destination market, and approved specification. Availability and scope are confirmed during project review.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Documents Commonly Requested</h2>
          <p className="mb-8 max-w-3xl text-sm leading-6 text-slate-500">Documents are not universal across every grade. Send the product, application, destination, and required standard so the team can confirm the current document scope.</p>
          <div className="space-y-4">
            {certificates.map((cert, i) => (
              <div key={i} className="flex items-center justify-between bg-white border border-slate-200  p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100  flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{cert.name}</h3>
                    <p className="text-slate-500 text-sm">{cert.scope}</p>
                    <p className="text-slate-400 text-xs mt-1">Scope and current version confirmed for the reviewed project</p>
                  </div>
                </div>
                <Link href="/contact" className="flex-shrink-0 bg-blue-600 text-white text-sm font-medium px-4 py-2  hover:bg-blue-700 transition-colors">
                  Request Review
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-blue-50  p-6 border border-blue-100">
            <h3 className="font-semibold text-slate-800 mb-2">Need Additional Documentation?</h3>
            <p className="text-slate-500 text-sm mb-4">We can provide product-specific test reports, MSDS sheets, and custom compliance declarations for your specific market requirements. Contact our compliance team.</p>
            <Link href="/contact" className="text-blue-600 font-medium text-sm hover:text-blue-800">Contact Compliance Team →</Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Product-Specific Compliance Support?</h2>
          <p className="text-blue-100 mb-8">Our compliance team can provide tailored documentation packages for your specific market, product, and customer requirements.</p>
          <Link href="/contact" className="bg-white text-blue-700 font-semibold px-10 py-4  hover:bg-blue-50 transition-colors inline-block">Contact Compliance Team</Link>
        </div>
      </section>
    </main>

    <Footer />
    </>
  );
}
