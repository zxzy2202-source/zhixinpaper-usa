"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState } from "react";

// FAQ Schema is injected via server component wrapper below
const FAQ_ITEMS = [
  {
    category: "Products",
    questions: [
      {
        q: "What is the difference between direct thermal and thermal transfer?",
        a: "Direct thermal paper has a heat-sensitive coating that darkens when exposed to heat — no ribbon needed. Thermal transfer requires a ribbon and produces more durable, longer-lasting prints. Direct thermal is ideal for short-term labels and receipts; thermal transfer is better for long-term product labels.",
        link: { href: "/products/thermal-labels/direct-thermal-labels", text: "View Direct Thermal Labels" },
      },
      {
        q: "Do you offer BPA-free thermal paper?",
        a: "Yes. All our standard products are available in BPA-free versions. BPA-free thermal paper uses alternative developers (such as Vitamin C or BPS-free formulations) and is required for EU market compliance under REACH regulations. We provide full test reports from accredited EU laboratories.",
        link: { href: "/compliance/bpa-free", text: "BPA-Free Compliance Details" },
      },
      {
        q: "What sizes are available for thermal paper rolls?",
        a: "We offer a full range of standard sizes including 57×40mm, 57×50mm, 80×70mm, 80×80mm, 82×70mm, and custom sizes. ATM rolls, wide-format rolls, and specialty sizes are also available. All sizes can be produced in BPA-free formulations.",
        link: { href: "/products/thermal-paper-rolls", text: "Browse All Paper Roll Sizes" },
      },
      {
        q: "Can you produce custom-sized thermal labels?",
        a: "Yes. We can produce custom label sizes from 25×15mm to 200×300mm. Custom die-cutting is available for non-standard shapes. Minimum order quantities apply for custom sizes. Contact us for a custom quote.",
        link: { href: "/products/thermal-labels", text: "Browse Thermal Labels" },
      },
    ],
  },
  {
    category: "Ordering & MOQ",
    questions: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "MOQ varies by product: standard thermal rolls from 50,000 rolls, thermal labels from 100,000 labels, custom printed products from 50,000 units. Sample orders are available before bulk commitment. See our MOQ guide for full details.",
        link: { href: "/oem-custom/moq-guide", text: "View MOQ Guide" },
      },
      {
        q: "How do I request a quote?",
        a: "Use our online quote form, email us at sales@zhixinpaper.com, or contact via WhatsApp (+86 187 9277 1927). Include product type, size, quantity, and target market. We respond within 24 business hours.",
        link: { href: "/quote", text: "Get a Quote Now" },
      },
      {
        q: "What is the lead time for production?",
        a: "Standard products: 10–15 business days. Custom printed or OEM products: 15–20 business days. Rush orders may be available for standard products. All orders ship FOB Qingdao.",
        link: null,
      },
      {
        q: "Can I request free samples before placing a bulk order?",
        a: "Yes. We offer free samples for qualified distributors and importers. Sample delivery takes 3–7 business days via DHL or FedEx. Use our sample request form to get started.",
        link: { href: "/samples", text: "Request Free Samples" },
      },
    ],
  },
  {
    category: "Compliance & Certifications",
    questions: [
      {
        q: "Are your products REACH compliant?",
        a: "Yes. All products are tested for REACH SVHC (Substances of Very High Concern) compliance. We provide full SVHC declarations and test reports from accredited EU laboratories. This is required for all products sold in the European Union.",
        link: { href: "/compliance/reach-rohs", text: "REACH & RoHS Details" },
      },
      {
        q: "Do you have ISO 9001 certification?",
        a: "Yes. Our factory is ISO 9001:2015 certified since 2012. Annual third-party surveillance audits ensure continuous compliance. Certificates are available for download from our compliance page.",
        link: { href: "/compliance/iso-9001", text: "ISO 9001 Certificate" },
      },
      {
        q: "Can you provide FDA compliance documentation for the US market?",
        a: "Yes. We provide FDA compliance documentation for food contact applications. Our BPA-free products meet FDA 21 CFR requirements for food contact materials. This is particularly important for grocery and food service applications.",
        link: { href: "/compliance/fda-us", text: "FDA Compliance Details" },
      },
      {
        q: "Do you have FSC certification?",
        a: "Yes. We offer FSC Chain of Custody certified paper for customers who require sustainable sourcing documentation. FSC logo can be printed on products and packaging upon request.",
        link: { href: "/compliance/fsc-paper", text: "FSC Certification Details" },
      },
    ],
  },
  {
    category: "OEM & Private Label",
    questions: [
      {
        q: "Can you produce thermal paper with our brand?",
        a: "Yes. We offer full private label and OEM services including custom packaging design, brand name printing, and logo on rolls. MOQ for private label starts from 50,000 units. We have served 200+ private label customers globally.",
        link: { href: "/oem-custom/private-label", text: "Private Label Services" },
      },
      {
        q: "Can you print custom logos or text on thermal paper rolls?",
        a: "Yes. We can print logos, text, and graphics directly on thermal paper rolls using flexographic printing. This is popular for branded receipts, promotional paper, and custom ticket paper. Pantone color matching is available.",
        link: { href: "/oem-custom/custom-printing", text: "Custom Printing Options" },
      },
    ],
  },
  {
    category: "Shipping & Logistics",
    questions: [
      {
        q: "What shipping methods do you use?",
        a: "We ship via sea freight (FCL/LCL) for large orders and air freight or express (DHL/FedEx) for smaller orders. All sea freight shipments are FOB Qingdao. We work with major freight forwarders and can arrange door-to-door delivery.",
        link: null,
      },
      {
        q: "Do you ship to Europe, USA, and Canada?",
        a: "Yes. We regularly ship to all major European countries (Germany, UK, France, Netherlands, Poland), the United States, and Canada. We provide all necessary export documentation including commercial invoices, packing lists, and certificates of origin.",
        link: { href: "/eu", text: "Europe Market Details" },
      },
    ],
  },
];

function FAQAccordion({ items }: { items: typeof FAQ_ITEMS }) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="max-w-4xl">
      {items.map((section) => (
        <div key={section.category} className="mb-12">
          <h2 className="font-bold text-blue-600 text-xs tracking-widest uppercase mb-6 flex items-center gap-3">
            <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
            {section.category}
          </h2>
          <div className="space-y-3">
            {section.questions.map((item, i) => {
              const key = `${section.category}-${i}`;
              const isOpen = openItems.has(key);
              return (
                <div
                  key={i}
                  className={`bg-white border transition-colors rounded-xl overflow-hidden ${isOpen ? "border-blue-300 shadow-sm" : "border-slate-200 hover:border-blue-200"}`}
                >
                  <button
                    className="flex items-center justify-between w-full p-6 text-left"
                    onClick={() => toggle(key)}
                    aria-expanded={isOpen}
                  >
                    <h3 className={`font-semibold text-base pr-4 transition-colors ${isOpen ? "text-blue-600" : "text-slate-900"}`}>{item.q}</h3>
                    <ChevronDown
                      className={`w-5 h-5 text-blue-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                      <p>{item.a}</p>
                      {item.link && (
                        <Link
                          href={item.link.href}
                          className="inline-flex items-center gap-1.5 mt-3 text-blue-600 hover:text-blue-700 font-semibold text-xs"
                        >
                          {item.link.text} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 rounded-2xl p-8 mt-8">
        <h3 className="font-bold text-slate-900 text-xl mb-3">Still have questions?</h3>
        <p className="text-slate-500 text-sm mb-5">
          Our technical team is ready to help with specific product questions, compliance requirements, or custom solutions.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm text-sm"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm"
          >
            Get a Quote
          </Link>
          <Link
            href="/samples"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm"
          >
            Request Samples
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  // Build FAQ schema for JSON-LD
  const allFaqs = FAQ_ITEMS.flatMap(s => s.questions.map(q => ({ question: q.q, answer: q.a })));
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-xs font-bold tracking-widest uppercase text-blue-600">FAQ</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Answers to common questions from distributors, importers, and buyers about our thermal paper products, compliance, OEM services, and ordering process.
            </p>
            {/* Quick nav */}
            <div className="flex flex-wrap gap-2 mt-6">
              {FAQ_ITEMS.map(s => (
                <span key={s.category} className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-600">
                  {s.category}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <FAQAccordion items={FAQ_ITEMS} />
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
