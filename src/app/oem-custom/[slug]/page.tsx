import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
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
    metaDesc: "Plan private-label thermal paper rolls and labels through specification, artwork, packaging, sample, document, quantity, and production review.",
    hero: "bg-gradient-to-br from-indigo-800 to-indigo-600",
    subtitle: "Private-label rolls and labels developed through project-specific specification and approval.",
    sections: [
      {
        heading: "What is Private Label Thermal Paper?",
        body: "Private label thermal paper is produced to an approved specification and sold under the buyer's brand. The quotation defines the material, dimensions, printing, packaging, quality records, logistics, and ownership of approved artwork.",
        items: [
          "Buyer-approved logo and brand colors on selected packaging components",
          "Custom product names and part numbers by approved artwork",
          "Branded carton and pallet labels by packing specification",
          "Batch or analysis records when included in the approved project scope",
          "Supplier-brand visibility confirmed in the artwork and packing approval",
        ],
      },
      {
        heading: "Private Label Process",
        body: "The project schedule is confirmed after the product specification, artwork, sample route, current capacity, packing, and destination are reviewed.",
        items: [
          "Step 1: Submit logo, brand guidelines, product specifications, quantity, and destination",
          "Step 2: Confirm artwork scope, proof method, revision process, and schedule",
          "Step 3: Review a production-intent sample when included in the quotation",
          "Step 4: Release production after specification, artwork, and sample approvals",
          "Step 5: Inspect, pack, and ship against the approved order and written delivery terms",
        ],
      },
      {
        heading: "Minimum Order Quantities",
        body: "MOQ is confirmed after material, dimensions, print setup, tooling, branded packaging, SKU mix, and quantity are reviewed.",
        items: [
          "Standard POS rolls: confirm size, grade, core print, packing, and quantity",
          "ATM and banking rolls: confirm terminal format, marks, packing, and quantity",
          "Direct thermal labels: confirm facestock, adhesive, format, tooling, and quantity",
          "Thermal transfer labels: confirm facestock, ribbon, adhesive, format, and quantity",
          "Branded cartons: confirm structure, print method, artwork, and order quantity",
        ],
      },
    ],
  },
  "custom-printing": {
    title: "Custom Printed Thermal Paper",
    metaTitle: "Custom Printed Thermal Paper | Logo Receipt Rolls | Custom Thermal Labels | Zhixin Paper",
    metaDesc: "Plan custom printed thermal paper rolls and labels through artwork, print-method, color, proof, sample, quantity, packing, and production review.",
    hero: "bg-gradient-to-br from-teal-800 to-teal-600",
    subtitle: "Custom print routes confirmed by material, artwork, equipment, proof, and production review.",
    sections: [
      {
        heading: "Custom Printing Capabilities",
        body: "Available print methods, ink systems, colors, registration, and security features depend on the selected material, artwork, equipment route, and approved sample.",
        items: [
          "Color count confirmed by artwork and selected print process",
          "Spot-color references reviewed against substrate and proof method",
          "Ink system selected by material, end use, and destination requirements",
          "Variable data feasibility reviewed from source data, numbering logic, and inspection plan",
          "Security features reviewed by design, equipment route, and verification method",
          "Registration tolerance defined in the approved production specification",
        ],
      },
      {
        heading: "Artwork Requirements",
        body: "Submit editable artwork, approved copy, color references, barcodes, and dimensions. Artwork support scope, fees, revisions, and deliverables are confirmed before work begins.",
        items: [
          "Vector files preferred: AI, EPS, or PDF with fonts outlined",
          "Raster files reviewed for size, resolution, and print method",
          "Color mode and spot-color references confirmed during proofing",
          "Bleed and safe area set from the approved die line or print template",
          "Barcode data and acceptance method supplied for verification",
        ],
      },
      {
        heading: "MOQ & Production Schedule",
        body: "Order quantity and schedule are confirmed after material, artwork, proof or sample, plate or tooling, current capacity, packing, and destination review.",
        items: [
          "Custom printed rolls: MOQ confirmed by paper, print setup, packing, and quantity",
          "Custom printed labels: MOQ confirmed by construction, tooling, print setup, and quantity",
          "Plate or tooling schedule confirmed after artwork approval",
          "Production schedule confirmed after all required approvals",
          "Expedited requests require a current capacity and logistics review",
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
        body: "MOQ is reviewed by product construction, dimensions, material, printing, tooling, packing, SKU mix, quantity, and current production setup.",
        items: [
          "Unit pricing is quoted against the approved specification and quantity",
          "Custom print and standard product quantities are reviewed independently",
          "Sample type, quantity, fee, and courier terms are confirmed before dispatch",
          "Volume pricing is included only when stated in the written quotation",
          "Mixed-SKU planning depends on production compatibility and packing efficiency",
        ],
      },
      {
        heading: "Standard Product MOQ",
        body: "Order quantities for standard products are confirmed against the exact SKU, current stock or production route, packing, and destination.",
        items: [
          "Standard POS rolls: confirm size, grade, core, packing, and quantity",
          "ATM paper rolls: confirm terminal format, marks, winding, and quantity",
          "Lottery or casino rolls: confirm coating, marks, packing, and quantity",
          "Direct thermal labels: confirm size, facestock, adhesive, format, and tooling",
          "Thermal transfer labels: confirm facestock, ribbon, adhesive, and format",
          "Specialty labels: confirm exposure, construction, tooling, and sample plan",
        ],
      },
      {
        heading: "Volume Discount Tiers",
        body: "Volume pricing is prepared from the approved specification, SKU mix, quantity, packing, forecast, delivery frequency, and written commercial scope.",
        items: [
          "Base quantity: quote against the approved SKU and packing",
          "Higher quantities: compare production and packing efficiency",
          "Mixed-SKU orders: review compatibility and container utilisation",
          "Container programs: confirm loading plan, route, duty, tax, and Incoterm",
          "Contract pricing: confirm forecast, validity, adjustment rules, and release schedule",
        ],
      },
    ],
  },
  "sample-process": {
    title: "Sample Request Process",
    metaTitle: "Thermal Paper Sample Request | Label Sample Process | Zhixin Paper",
    metaDesc: "Plan thermal paper and label samples by SKU, intended test, quantity, production method, fee, document scope, courier route, and destination.",
    hero: "bg-gradient-to-br from-rose-800 to-rose-600",
    subtitle: "Sample scope, fees, documents, dispatch method, and schedule confirmed by project.",
    sections: [
      {
        heading: "What's Included in a Sample Pack",
        body: "Sample contents are selected from the requested SKU, intended tests, available material, print method, quantity, and applicable document scope.",
        items: [
          "Requested roll or label construction and quantity confirmed before preparation",
          "Production-stock or production-intent sample route identified in the quotation",
          "Available batch or analysis records matched to the supplied sample when included",
          "Chemistry or material reports matched to the exact sampled grade and report scope",
          "Product specification sheet for the supplied sample when available",
          "Packing and courier method confirmed by destination",
        ],
      },
      {
        heading: "How to Request Samples",
        body: "Dispatch timing is confirmed after the sample specification, availability or production method, fee, quantity, documents, destination, and courier option are reviewed.",
        items: [
          "Step 1: Submit contact details, product specification, intended test, quantity, and destination",
          "Step 2: Confirm available sample route, fee, documents, and preparation schedule",
          "Step 3: Prepare or produce samples against the confirmed scope",
          "Step 4: Dispatch using the agreed courier and share tracking when available",
          "Step 5: Record test feedback before bulk specification approval",
        ],
      },
      {
        heading: "Sample Eligibility",
        body: "Sample availability and commercial terms depend on the product, intended evaluation, quantity, preparation method, documents, courier route, and destination.",
        items: [
          "Business and project details are reviewed before sample confirmation",
          "Sample quantity is limited to the agreed evaluation plan",
          "Sample and courier charges are stated in the quotation",
          "Additional or custom samples require a separate scope and cost review",
          "Destination and courier availability are confirmed before dispatch",
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
      <HeroBanner
        variant="media"
        eyebrow="OEM and custom supply"
        title={page.title}
        description={page.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "OEM & Custom", href: "/oem-custom" },
          { label: page.title },
        ]}
        actions={[
          { label: "Request a Quote", href: "/quote", kind: "primary" },
          { label: "Request Samples", href: "/samples", kind: "secondary" },
        ]}
      />

      {/* Sub-nav */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {allPages.map((p) => (
              <Link
                key={p.slug}
                href={`/oem-custom/${p.slug}`}
                className={`px-4 py-2 text-sm font-medium  whitespace-nowrap transition-colors ${
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
          <section key={section.heading} className="bg-white  border border-slate-200 p-8 shadow-sm">
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

    </main>
      <CTABanner
        title="Ready to review an OEM project?"
        subtitle="Share the product specification, artwork status, packing plan, destination, and sample requirements for project review."
        showTrust={false}
      />
      <Footer />
    </>
  );
}
