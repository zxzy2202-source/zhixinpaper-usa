import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";


const OEM_PAGES: Record<string, {
  title: string;
  metaTitle: string;
  metaDesc: string;
  hero: string;
  subtitle: string;
  sections: { heading: string; body: string; items?: string[] }[];
}> = {
  "private-label": {
    title: "Private Label Thermal Paper",
    metaTitle: "Private Label Thermal Paper Rolls | White Label Receipt Rolls | Zhixin Paper",
    metaDesc: "Launch your own brand of thermal paper rolls and labels. Private label manufacturing with your logo, brand colors, and custom packaging. MOQ from 5,000 rolls.",
    hero: "bg-gradient-to-br from-indigo-800 to-indigo-600",
    subtitle: "Your Brand. Our Manufacturing. Complete Private Label Solutions.",
    sections: [
      {
        heading: "What is Private Label Thermal Paper?",
        body: "Private label thermal paper means we manufacture the product to your specifications, and you sell it under your own brand name. You control the brand identity, pricing, and customer relationships — we handle all manufacturing, quality control, and logistics.",
        items: [
          "Your logo and brand colors on every roll core and outer packaging",
          "Custom product names and part numbers",
          "Branded carton boxes and pallet labels",
          "Certificate of Analysis issued under your brand",
          "No Zhixin Paper branding on any customer-facing materials",
        ],
      },
      {
        heading: "Private Label Process",
        body: "Our streamlined private label process takes your brand from concept to shelf-ready product in as little as 21 days.",
        items: [
          "Step 1: Submit your logo, brand guidelines, and product specifications",
          "Step 2: We produce artwork proofs for your approval (3–5 business days)",
          "Step 3: Pre-production sample produced and shipped for approval",
          "Step 4: Full production run begins upon sample approval",
          "Step 5: Finished goods inspected, packed under your brand, and shipped",
        ],
      },
      {
        heading: "Minimum Order Quantities",
        body: "We offer competitive MOQs to help distributors and resellers launch private label programs without excessive upfront investment.",
        items: [
          "Standard POS Rolls: MOQ 5,000 rolls (custom core printing)",
          "ATM / Banking Rolls: MOQ 2,000 rolls",
          "Thermal Labels (direct thermal): MOQ 10,000 labels",
          "Thermal Labels (thermal transfer): MOQ 10,000 labels",
          "Custom packaging (branded cartons): MOQ 500 cartons",
        ],
      },
    ],
  },
  "custom-printing": {
    title: "Custom Printed Thermal Paper",
    metaTitle: "Custom Printed Thermal Paper | Logo Receipt Rolls | Custom Thermal Labels | Zhixin Paper",
    metaDesc: "Custom printed thermal paper rolls and labels with your logo, barcode, or design. 1–4 color flexographic printing. MOQ 5,000 rolls. ISO 9001 certified.",
    hero: "bg-gradient-to-br from-teal-800 to-teal-600",
    subtitle: "1–4 Color Flexographic Printing on Thermal Paper Rolls & Labels",
    sections: [
      {
        heading: "Custom Printing Capabilities",
        body: "Our flexographic printing lines can apply 1–4 process colors to thermal paper rolls and labels. We support UV and water-based inks, with Pantone color matching available for brand-critical applications.",
        items: [
          "1–4 color flexographic printing",
          "Pantone color matching (±ΔE 2.0)",
          "UV and water-based ink systems",
          "Variable data printing (sequential numbering, barcodes)",
          "Security features: UV-visible inks, void patterns",
          "Print registration accuracy: ±0.1mm",
        ],
      },
      {
        heading: "Artwork Requirements",
        body: "To ensure the highest print quality, please submit artwork in the following formats. Our design team can assist with artwork preparation at no additional charge.",
        items: [
          "Vector files preferred: AI, EPS, PDF (with fonts outlined)",
          "Raster files accepted: TIFF, PNG at 300 DPI minimum",
          "Color mode: CMYK (we will convert Pantone references)",
          "Include 3mm bleed on all edges",
          "Barcode artwork: provide human-readable data for verification",
        ],
      },
      {
        heading: "MOQ & Lead Times",
        body: "Custom printing requires additional setup time for plate preparation and color matching. Standard lead time for custom printed orders is 21 days from artwork approval.",
        items: [
          "Custom printed rolls: MOQ 5,000 rolls",
          "Custom printed labels: MOQ 50,000 labels",
          "Plate preparation: 5–7 business days",
          "Production lead time: 14 days after plate approval",
          "Rush orders available (7-day production) with surcharge",
        ],
      },
    ],
  },
  "moq-guide": {
    title: "MOQ Guide",
    metaTitle: "Minimum Order Quantity Guide | Thermal Paper MOQ Wholesale | Zhixin Paper",
    metaDesc: "Complete guide to minimum order quantities for thermal paper rolls and labels. Standard MOQ, custom print MOQ, and volume discount tiers explained.",
    hero: "bg-gradient-to-br from-amber-800 to-amber-600",
    subtitle: "Understanding Minimum Order Quantities for Thermal Paper & Labels",
    sections: [
      {
        heading: "Why MOQ Matters for Distributors",
        body: "Minimum order quantities exist to ensure economic production runs that maintain quality and competitive pricing. Understanding our MOQ structure helps you plan inventory and negotiate the best pricing for your business.",
        items: [
          "Lower MOQ = higher unit cost (more flexibility)",
          "Higher MOQ = lower unit cost (better margins)",
          "Custom print MOQ is always higher than standard MOQ",
          "Sample orders are available free of charge before committing to MOQ",
          "Volume discounts apply automatically above threshold quantities",
        ],
      },
      {
        heading: "Standard Product MOQ",
        body: "These quantities apply to standard (non-custom) products from our existing product range.",
        items: [
          "Standard POS Rolls (57×40mm, 80×80mm): 5,000 rolls",
          "ATM Paper Rolls: 2,000 rolls",
          "Lottery / Casino TITO Rolls: 1,000 rolls",
          "Direct Thermal Labels (standard sizes): 10,000 labels",
          "Thermal Transfer Labels: 10,000 labels",
          "Specialty Labels (freezer, high-temp, synthetic): 5,000 labels",
        ],
      },
      {
        heading: "Volume Discount Tiers",
        body: "Volume discounts are applied automatically to your quote based on order quantity. Contact us for exact pricing at your target volume.",
        items: [
          "Tier 1 (MOQ): Standard pricing",
          "Tier 2 (5× MOQ): 5–8% discount",
          "Tier 3 (10× MOQ): 10–15% discount",
          "Tier 4 (Container load): 18–25% discount",
          "Annual contract pricing available for regular buyers",
        ],
      },
    ],
  },
  "sample-process": {
    title: "Sample Request Process",
    metaTitle: "Free Thermal Paper Sample Request | Label Sample Process | Zhixin Paper",
    metaDesc: "Request free thermal paper and label samples. Our sample process explained: what's included, how to request, and what to expect. Qualified distributors only.",
    hero: "bg-gradient-to-br from-rose-800 to-rose-600",
    subtitle: "Free Samples for Qualified Distributors and Importers",
    sections: [
      {
        heading: "What's Included in a Sample Pack",
        body: "Our standard sample pack is designed to give you a comprehensive overview of our product quality and range. All samples are production-quality — not specially prepared showcase items.",
        items: [
          "3–5 rolls of your requested thermal paper specification",
          "1 roll each of direct thermal and thermal transfer labels (standard size)",
          "Certificate of Analysis for each product",
          "BPA-free test report",
          "Product specification sheets",
          "Company profile and capability brochure",
        ],
      },
      {
        heading: "How to Request Samples",
        body: "The sample request process is straightforward. We aim to dispatch samples within 3 business days of receiving your request.",
        items: [
          "Step 1: Complete the sample request form with your contact details and product requirements",
          "Step 2: Our team reviews your request and confirms eligibility (B2B only)",
          "Step 3: Samples are prepared and dispatched via DHL/FedEx express",
          "Step 4: You receive tracking information by email",
          "Step 5: Our team follows up 5 days after delivery to answer questions",
        ],
      },
      {
        heading: "Sample Eligibility",
        body: "Free samples are available to qualified business buyers. We reserve the right to decline sample requests from individuals or businesses that do not meet our criteria.",
        items: [
          "Registered businesses only (distributors, importers, retailers, manufacturers)",
          "Minimum annual purchasing potential of $10,000 USD",
          "One free sample pack per company",
          "Additional samples available at cost price after initial free pack",
          "Samples shipped to EU, USA, Canada, and most international destinations",
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(OEM_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = OEM_PAGES[slug];
  if (!page) return { title: "Not Found" };
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: { canonical: canonicalUrl(`/oem-custom/${slug}`) },
  };
}

export default async function OEMSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = OEM_PAGES[slug];
  if (!page) notFound();

  const allPages = [
    { slug: "private-label", label: "Private Label" },
    { slug: "custom-printing", label: "Custom Printing" },
    { slug: "moq-guide", label: "MOQ Guide" },
    { slug: "sample-process", label: "Sample Process" },
  ];

  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <section className={`${page.hero} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-white/60 text-sm mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/oem-custom" className="hover:text-white">OEM & Custom</Link>
            <span>/</span>
            <span className="text-white">{page.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{page.title}</h1>
          <p className="text-white/80 text-lg">{page.subtitle}</p>
        </div>
      </section>

      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {allPages.map((p) => (
              <Link
                key={p.slug}
                href={`/oem-custom/${p.slug}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                  p.slug === slug ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {page.sections.map((section) => (
          <section key={section.heading} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.heading}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{section.body}</p>
            {section.items && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-700 text-sm">
                    <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your OEM Project?</h2>
          <p className="text-blue-100 mb-8">Get a custom quote within 24 hours. Free samples available for qualified distributors.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/quote" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Get a Quote</Link>
            <Link href="/samples" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">Request Samples</Link>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
