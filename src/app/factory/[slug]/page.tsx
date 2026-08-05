import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import HeroBanner from "@/components/ui/HeroBanner";
import { canonicalUrl } from "@/lib/seo";


const FACTORY_PAGES: Record<string, {
  title: string;
  metaTitle: string;
  metaDesc: string;
  hero: string;
  subtitle: string;
  content: React.ReactNode;
}> = {
  overview: {
    title: "Factory Overview",
    metaTitle: "Thermal Paper Manufacturing Facility Review | Zhixin Paper",
    metaDesc: "Review Zhixin Paper manufacturing scope, converting routes, quality controls, and the documents buyers should verify during supplier qualification.",
    hero: "bg-gradient-to-br from-slate-800 to-slate-600",
    subtitle: "Manufacturing Scope and Supplier-Qualification Review",
    content: (
      <div className="space-y-12">
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">About Our Manufacturing Facility</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Established in 2008, our manufacturing facility in Xi&apos;an, Shaanxi, China includes thermal paper converting and production equipment. Current floor area, line configuration, and output capacity should be confirmed during supplier qualification.
            </p>
            <p className="text-slate-600 leading-relaxed">
              The applicable manufacturing site, quality controls, traceability records, inspection plan, and release documents are confirmed for the quoted product and current project scope.
            </p>
          </div>
          <div className="bg-slate-50  p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Facility at a Glance</h3>
            <div className="space-y-3">
              {[
                ["Floor Area", "Confirmed by site review"],
                ["Established", "2008"],
                ["Coating Route", "Confirmed by quoted grade"],
                ["Converting Lines", "Confirmed by site and SKU"],
                ["Annual Capacity", "Confirmed by RFQ and schedule"],
                ["Workforce", "Confirmed by function and site"],
                ["Documents", "Reviewed by holder, scope, and validity"],
                ["Export Routes", "Confirmed by destination and Incoterm"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-slate-200 last:border-0">
                  <span className="text-slate-500 text-sm">{label}</span>
                  <span className="font-semibold text-slate-800 text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Production Capabilities</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "🏭", title: "Thermal Paper Coating", desc: "Coating route, source mill, chemistry, basis weight, and applicable quality records are confirmed for the quoted grade." },
              { icon: "✂️", title: "Precision Slitting", desc: "Slitting route, dimensions, core, winding, tolerance, and inspection method are confirmed from the approved specification." },
              { icon: "🏷️", title: "Label Die-Cutting", desc: "Tooling, shape, perforation, liner, roll or fanfold format, and dimensional acceptance criteria are confirmed by project." },
              { icon: "🖨️", title: "Custom Printing", desc: "Artwork, ink system, color target, registration criteria, approved sample, and inspection plan are confirmed before production." },
            ].map((item) => (
              <div key={item.title} className="bg-white  p-5 border border-slate-200 shadow-sm">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
  },
  equipment: {
    title: "Equipment & Technology",
    metaTitle: "Thermal Paper Slitting Machines & Label Die Cutting Equipment | Zhixin Paper",
    metaDesc: "Review thermal paper coating, slitting, die-cutting, and printing routes. Equipment identity, operating range, tolerance, and current availability are confirmed during project review.",
    hero: "bg-gradient-to-br from-blue-800 to-blue-600",
    subtitle: "Advanced Production Technology for Precision Output",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Core Manufacturing Equipment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Thermal Coating Route",
                specs: ["Web width: confirmed by selected line", "Speed: confirmed by grade and run", "Coating weight: confirmed by specification", "Controls: reviewed during qualification"],
                desc: "Confirm the source mill or coating site, selected line, chemistry, control plan, and records that apply to the quoted thermal grade.",
              },
              {
                name: "Precision Slitting Route",
                specs: ["Slit width: confirmed by SKU", "Run speed: confirmed by material", "Tension control: reviewed by line", "Tolerance: agreed in the specification"],
                desc: "Confirm the selected converting line, core, winding, OD, dimensional tolerance, edge criteria, and inspection records for the order.",
              },
              {
                name: "Rotary Die-Cutting Route",
                specs: ["Label size: confirmed by tooling review", "Run speed: confirmed by construction", "Die tolerance: agreed in the drawing", "Roll and fanfold options reviewed"],
                desc: "Confirm tooling, gap, liner, perforation, matrix removal, roll or fanfold format, and measurable dimensional acceptance criteria.",
              },
              {
                name: "Flexographic Printing Route",
                specs: ["Color count: confirmed from artwork", "Registration: agreed in the print standard", "Run speed: confirmed by construction", "Ink system: reviewed by application"],
                desc: "Confirm artwork, ink, color target, registration criteria, approved sample, and inspection method for the printed construction.",
              },
            ].map((eq) => (
              <div key={eq.name} className="bg-white  p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-3">{eq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{eq.desc}</p>
                <div className="bg-slate-50  p-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Key Specifications</div>
                  <ul className="space-y-1">
                    {eq.specs.map((s) => (
                      <li key={s} className="text-sm text-slate-700 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    ),
  },
  capacity: {
    title: "Production Capacity",
    metaTitle: "Thermal Paper Production Planning | Capacity Review | Zhixin Paper",
    metaDesc: "Plan thermal paper and label supply by SKU, material, quantity, tooling, packing, samples, current capacity, and required schedule.",
    hero: "bg-gradient-to-br from-green-800 to-green-600",
    subtitle: "Capacity, MOQ, Inventory, and Schedule Confirmed by RFQ",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Annual Production Capacity</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { value: "By RFQ", label: "Output Plan", sub: "SKU and schedule review" },
              { value: "By Line", label: "Converting Route", sub: "Selected for the construction" },
              { value: "By SKU", label: "Inventory Plan", sub: "Confirmed before quotation" },
              { value: "By Order", label: "Production Schedule", sub: "Confirmed in writing" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white  p-6 border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{stat.label}</div>
                <div className="text-slate-400 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50  p-6 border border-blue-100">
            <h3 className="font-bold text-slate-800 mb-3">Inventory and Schedule Review</h3>
            <p className="text-slate-600 leading-relaxed">
              Stock, reserved material, production slots, and dispatch timing vary by SKU and current demand. The quotation or order confirmation should record the approved specification, quantity, packing plan, capacity allocation, and project schedule.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Minimum Order Quantities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-3 ">Product Type</th>
                  <th className="text-left p-3">Standard MOQ</th>
                  <th className="text-left p-3">Custom Print MOQ</th>
                  <th className="text-left p-3 ">Sample</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Standard POS Rolls", "Confirmed by size and packing", "Confirmed by artwork and setup", "Terms confirmed after review"],
                  ["ATM / Banking Rolls", "Confirmed by specification", "Confirmed by artwork and setup", "Terms confirmed after review"],
                  ["Lottery / Casino Rolls", "Confirmed by device and specification", "Confirmed by artwork and setup", "Terms confirmed after review"],
                  ["Direct Thermal Labels", "Confirmed by construction", "Confirmed by printing and tooling", "Terms confirmed after review"],
                  ["Thermal Transfer Labels", "Confirmed by construction", "Confirmed by printing and tooling", "Terms confirmed after review"],
                  ["Specialty Labels (Freezer/High-Temp)", "Confirmed by material and test plan", "Confirmed by printing and tooling", "Terms confirmed after review"],
                ].map(([type, moq, custom, sample], i) => (
                  <tr key={type} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="p-3 font-medium text-slate-800 border-b border-slate-100">{type}</td>
                    <td className="p-3 text-slate-600 border-b border-slate-100">{moq}</td>
                    <td className="p-3 text-slate-600 border-b border-slate-100">{custom}</td>
                    <td className="p-3 text-green-600 font-medium border-b border-slate-100">{sample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    ),
  },
  "quality-control": {
    title: "Quality Control",
    metaTitle: "Thermal Paper Quality Control Review | Zhixin Paper",
    metaDesc: "Review quality controls, traceability, inspection methods, acceptance criteria, and the current documents applicable to a quoted thermal paper or label project.",
    hero: "bg-gradient-to-br from-purple-800 to-purple-600",
    subtitle: "Quality Controls, Traceability, and Documents Reviewed by Project",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Quality Management System</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            The applicable quality-system documents, material controls, lot identification, inspection plan, test methods, release records, and traceability scope are reviewed against the quoted manufacturing entity and product.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Incoming Inspection", desc: "Agree which base-paper, coating, adhesive, liner, ink, and packaging properties require incoming evidence or inspection." },
              { step: "02", title: "In-Process Control", desc: "Define measurable checks and frequencies for dimensions, winding, coating or print quality, and other critical characteristics." },
              { step: "03", title: "Chemical Documents", desc: "Confirm the material, substance scope, test method, report date, and destination requirements before relying on a declaration or report." },
              { step: "04", title: "Print and Scan Testing", desc: "Confirm density, contrast, barcode method, scanner or printer, sample conditioning, and acceptance threshold for the application." },
              { step: "05", title: "Image Stability Review", desc: "Match the selected material, storage environment, test profile, and required retention period; avoid converting accelerated tests into unconditional life claims." },
              { step: "06", title: "Final Release", desc: "Agree final inspection, release authority, retained records, and the certificate or report package required for the shipment." },
            ].map((item) => (
              <div key={item.step} className="bg-white  p-5 border border-slate-200 shadow-sm">
                <div className="text-blue-600 font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-slate-50  p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Certifications & Test Reports</h2>
          <p className="text-slate-600 mb-6">Request the current holder, issuer, scope, validity period, report method, product grade, and destination applicability before relying on any certificate, declaration, or test report.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Quality-System Documents", issuer: "Current holder and scope", href: "/compliance/iso-9001" },
              { name: "Phenol / Material Documents", issuer: "Quoted grade and report scope", href: "/compliance/bpa-free" },
              { name: "REACH/RoHS Review", issuer: "Selected material and destination", href: "/compliance/reach-rohs" },
              { name: "Chain-of-Custody Review", issuer: "Current certificate route and claim", href: "/compliance/fsc-paper" },
            ].map((cert) => (
              <Link key={cert.name} href={cert.href} className="bg-white  p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-bold text-slate-800 text-sm group-hover:text-blue-600">{cert.name}</div>
                <div className="text-slate-400 text-xs mt-1">{cert.issuer}</div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    ),
  },
  "virtual-tour": {
    title: "Virtual Factory Tour",
    metaTitle: "Virtual Thermal Paper Factory Tour | Manufacturing Facility Video | Zhixin Paper",
    metaDesc: "Take a virtual tour of our thermal paper manufacturing facility. See our coating lines, slitting machines, quality control lab, and warehouse.",
    hero: "bg-gradient-to-br from-orange-800 to-orange-600",
    subtitle: "See Our Manufacturing Facility From Anywhere in the World",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tour Our Facility</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Can&apos;t visit in person? Our virtual factory tour provides a view of selected manufacturing, quality-control, and warehouse areas. Schedule a live video review with our team or browse the available facility highlights below.
          </p>
          <div className="bg-slate-800  aspect-video flex items-center justify-center mb-8">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶</div>
              <div className="text-xl font-bold mb-2">Factory Tour Video</div>
              <p className="text-slate-400 text-sm">Contact us to schedule a live video tour</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: "Coating Hall", desc: "Review the selected coating route, applicable line, material controls, and records for the quoted grade." },
              { area: "Slitting Room", desc: "Review converting equipment, dimensions, winding, tolerance, inspection, and line availability for the SKU." },
              { area: "Label Production", desc: "Review tooling, printing, die-cutting, liner, roll or fanfold format, and approved acceptance criteria." },
              { area: "QC Laboratory", desc: "Review available methods, calibrated equipment, sample conditioning, limits, and external-laboratory needs." },
              { area: "Finished Goods Warehouse", desc: "Review storage conditions, lot identification, stock status, packing, and release controls for the order." },
              { area: "Shipping & Logistics", desc: "Confirm loading site, Incoterm, export documents, customs responsibilities, and destination delivery scope." },
            ].map((area) => (
              <div key={area.area} className="bg-white  p-5 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2">{area.area}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-blue-50  p-8 border border-blue-100 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Schedule a Live Video Tour</h2>
          <p className="text-slate-600 mb-6">Our team can arrange a live video walkthrough of the facility via Zoom or Teams. Available Monday–Friday, 9:00–17:00 CST.</p>
          <Link href="/contact" className="inline-block bg-blue-600 text-white font-bold px-8 py-3  hover:bg-blue-700 transition-colors">
            Request a Video Tour
          </Link>
        </section>
      </div>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(FACTORY_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = FACTORY_PAGES[slug];
  if (!page) return { title: "Not Found" };
  return {
    title: page.metaTitle,
    description: page.metaDesc,
    alternates: {
      canonical: canonicalUrl(`/factory/${slug}`),
      languages: {
        en: canonicalUrl(`/factory/${slug}`),
        "x-default": canonicalUrl(`/factory/${slug}`),
      },
    },
  };
}

export default async function FactorySlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = FACTORY_PAGES[slug];
  if (!page) notFound();

  const allPages = [
    { slug: "overview", label: "Overview" },
    { slug: "equipment", label: "Equipment" },
    { slug: "capacity", label: "Capacity" },
    { slug: "quality-control", label: "Quality Control" },
    { slug: "virtual-tour", label: "Virtual Tour" },
  ];

  return (

    <>
      <Header />
      <main className="min-h-screen bg-white">
      <HeroBanner
        variant="media"
        eyebrow="Factory capability"
        title={page.title}
        description={page.subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Factory", href: "/factory" },
          { label: page.title },
        ]}
        actions={[
          { label: "Contact Our Team", href: "/contact", kind: "primary" },
          { label: "OEM Services", href: "/oem-custom", kind: "secondary" },
        ]}
      />

      {/* Sub-navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {allPages.map((p) => (
              <Link
                key={p.slug}
                href={`/factory/${p.slug}`}
                className={`px-4 py-2 text-sm font-medium  whitespace-nowrap transition-colors ${
                  p.slug === slug
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {p.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {page.content}
      </div>

    </main>
      <CTABanner
        title="Ready to review factory fit?"
        subtitle="Arrange a factory discussion, request available verification material, or review the OEM path with our team."
        primaryLabel="Contact Our Team"
        primaryHref="/contact"
        secondaryLabel="OEM Services"
        secondaryHref="/oem-custom"
        showTrust={false}
      />
      <Footer />
    </>
  );
}
