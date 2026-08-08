import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import FaqSection from "@/components/ui/FaqSection";
import { normalizeFaqItem } from "@/lib/faq";
import { faqSchema } from "@/lib/seo";


const FAQ_ITEMS = [
  {
    category: "Products",
    questions: [
      {
        q: "What is the difference between direct thermal and thermal transfer?",
        a: "Direct thermal paper has a heat-sensitive coating that darkens when exposed to heat and does not need a ribbon. Thermal transfer uses a matched ribbon to create the image on the label or paper surface. Direct thermal is commonly considered for applications with a defined service and storage period, while thermal transfer may be considered when the project requires higher resistance or longer image retention. The right choice depends on the complete material and ribbon construction, printer settings, exposure conditions, and representative testing.",
        link: { href: "/products/thermal-labels/direct-thermal-labels", text: "View Direct Thermal Labels" },
      },
      {
        q: "Do you offer BPA-free thermal paper?",
        a: "BPA-free formulations are available for selected grades. The correct developer chemistry and supporting test documents should be confirmed against the product specification, destination market, and intended application before ordering.",
        link: { href: "/compliance/bpa-free", text: "BPA-Free Compliance Details" },
      },
      {
        q: "What sizes are available for thermal paper rolls?",
        a: "Common roll sizes include 57×40mm, 57×50mm, 80×70mm, 80×80mm, and 82×70mm. ATM rolls, wide-format rolls, and specialty sizes can be reviewed by product family. BPA-free options may be available for selected grades and sizes; confirm the quoted grade and supporting documents before treating the claim as applicable to a specific SKU.",
        link: { href: "/products/thermal-paper-rolls", text: "Browse All Paper Roll Sizes" },
      },
      {
        q: "Can you produce custom-sized thermal labels?",
        a: "Custom label dimensions and die-cut shapes can be reviewed according to the facestock, adhesive, printer format, tooling, packing, and project quantity. Share the target dimensions, liner, core, artwork, and application conditions so feasibility, sample options, MOQ, and lead time can be confirmed in the quotation.",
        link: { href: "/products/thermal-labels", text: "Browse Thermal Labels" },
      },
    ],
  },
  {
    category: "Ordering & MOQ",
    questions: [
      {
        q: "What is the minimum order quantity (MOQ)?",
        a: "MOQ depends on paper grade, dimensions, packing, printing, and production setup. Share the product specification and forecast volume so sales can confirm the current project minimum and available sample path.",
        link: { href: "/oem-custom/moq-guide", text: "View MOQ Guide" },
      },
      {
        q: "How do I request a quote?",
        a: "Use our online quote form, email us at sales@zhixinpaper.com, or contact via WhatsApp (+86 187 9277 1927). Include product type, size, quantity, destination, and target market so the team can qualify the request and confirm the next step.",
        link: { href: "/quote", text: "Get a Quote Now" },
      },
      {
        q: "What is the lead time for production?",
        a: "Production lead time is confirmed after the grade, dimensions, printing, packing, quantity, artwork approval, and current capacity are reviewed. The quotation or order confirmation should be treated as the project-specific schedule.",
        link: null,
      },
      {
        q: "Can I request samples before placing a bulk order?",
        a: "Yes. Sample availability, charges, courier method, and delivery estimate are confirmed after the product specification, testing purpose, and destination are reviewed. Use our sample request form to provide those details.",
        link: { href: "/samples", text: "Request Samples" },
      },
    ],
  },
  {
    category: "Compliance & Certifications",
    questions: [
      {
        q: "Are your products REACH compliant?",
        a: "REACH and SVHC documentation must be reviewed for the selected material, grade, intended use, and current regulatory scope. Request the applicable declaration or test evidence for your project before approval.",
        link: { href: "/compliance/reach-rohs", text: "REACH & RoHS Details" },
      },
      {
        q: "Do you have ISO 9001 certification?",
        a: "A quality management certificate can be reviewed on request. Buyers should verify the current certificate holder, issuer, validity period, and scope against the manufacturing entity and products covered by their order.",
        link: { href: "/compliance/iso-9001", text: "ISO 9001 Certificate" },
      },
      {
        q: "Can you provide FDA compliance documentation for the US market?",
        a: "For US food-service or food-contact projects, request a grade- and application-specific document review. Suitability depends on the paper formulation, printed or unprinted use, contact conditions, and the current evidence applicable to the intended use.",
        link: { href: "/compliance/fda-us", text: "FDA Compliance Details" },
      },
      {
        q: "Do you have FSC certification?",
        a: "FSC-related sourcing options may be available for selected paper and supply chains. Any FSC claim or logo use requires verification of the current certificate holder, scope, product claim, and trademark approval before printing.",
        link: { href: "/compliance/fsc-paper", text: "FSC Certification Details" },
      },
    ],
  },
  {
    category: "OEM & Private Label",
    questions: [
      {
        q: "Can you produce thermal paper with our brand?",
        a: "Private-label and OEM options can include packaging design, brand printing, and roll marking. Feasibility and MOQ are confirmed after the material, dimensions, artwork, printing process, packing, and forecast volume are reviewed.",
        link: { href: "/oem-custom/private-label", text: "Private Label Services" },
      },
      {
        q: "Can you print custom logos or text on thermal paper rolls?",
        a: "Custom printing can be reviewed for logos, text, graphics, back-print content, branded receipts, promotional paper, or ticket paper. Feasibility depends on the paper grade, print side, artwork, color count, print area, tooling, packing, and project quantity. Approve the artwork and a production-intent sample before bulk release.",
        link: { href: "/oem-custom/custom-printing", text: "Custom Printing Options" },
      },
    ],
  },
  {
    category: "Shipping & Logistics",
    questions: [
      {
        q: "What shipping methods do you use?",
        a: "Sea, air, express, and door-delivery options can be reviewed according to shipment size and destination. The quotation should confirm the selected carrier or forwarder, Incoterm, customs responsibilities, and delivery scope.",
        link: null,
      },
      {
        q: "Do you ship to Europe, USA, and Canada?",
        a: "We review enquiries for Europe, the United States, and Canada. Export documents, product evidence, shipping terms, and destination requirements are confirmed for each order before acceptance.",
        link: { href: "/eu", text: "Europe Market Details" },
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = FAQ_ITEMS.flatMap((section) => section.questions.map(normalizeFaqItem));
  const faqJsonLd = faqSchema(allFaqs);

  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main>
        <section className="border-b border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 pb-16 pt-32">
          <div className="container-site">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">FAQ</span>
            </div>
            <h1 className="mb-4 text-5xl font-bold text-slate-900 md:text-6xl">Frequently Asked Questions</h1>
            <p className="max-w-2xl text-lg text-slate-500">
              Answers to common questions from distributors, importers, and buyers about our thermal paper products, compliance, OEM services, and ordering process.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {FAQ_ITEMS.map((section) => (
                <span key={section.category} className="border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600">
                  {section.category}
                </span>
              ))}
            </div>
          </div>
        </section>
        <div className="bg-white py-20">
          <FaqSection
            faqs={allFaqs}
            title="Buyer questions, answered clearly"
            intro="Review product, compliance, ordering, and logistics details before requesting samples or a project-specific quote."
            eyebrow="Buyer FAQ"
            tone="light"
          />
        </div>
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
