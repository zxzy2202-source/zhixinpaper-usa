import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";


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
    metaTitle: "Thermal Paper Manufacturing Plant | ISO Certified Factory | Zhixin Paper",
    metaDesc: "Tour our ISO 9001:2015 certified thermal paper manufacturing facility in China. 30 tonnes/day capacity, 200,000 rolls/day output, serving 80+ countries.",
    hero: "bg-gradient-to-br from-slate-800 to-slate-600",
    subtitle: "ISO 9001:2015 Certified Manufacturing Excellence",
    content: (
      <div className="space-y-12">
        <section className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">About Our Manufacturing Facility</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Established in 2008, our manufacturing facility in Xi'an, Shaanxi, China spans 25,000 m² and houses state-of-the-art thermal paper production equipment. We operate 4 paper coating lines and 15 precision slitting machines, producing 30 tonnes of thermal paper and 200,000 rolls per day.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our facility is ISO 9001:2015 certified, with full traceability from raw material receipt to finished goods dispatch. Every batch is tested against our internal quality standards before shipment.
            </p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Facility at a Glance</h3>
            <div className="space-y-3">
              {[
                ["Floor Area", "25,000 m²"],
                ["Established", "2008"],
                ["Coating Lines", "4 production lines"],
                ["Slitting Machines", "15 precision slitters"],
                ["Daily Output", "30T paper / 200K rolls"],
                ["Employees", "320+ staff"],
                ["Certifications", "ISO 9001:2015, FSC, BPA-Free"],
                ["Export Markets", "80+ countries"],
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
              { icon: "🏭", title: "Thermal Paper Coating", desc: "High-speed coating lines applying thermal-sensitive chemistry to base paper at controlled temperatures." },
              { icon: "✂️", title: "Precision Slitting", desc: "15 slitting machines cutting parent rolls to exact customer specifications from 25mm to 210mm width." },
              { icon: "🏷️", title: "Label Die-Cutting", desc: "Rotary die-cutting equipment for custom label shapes, perforations, and fanfold configurations." },
              { icon: "🖨️", title: "Custom Printing", desc: "1–4 color flexographic printing for logos, barcodes, and custom designs on rolls and labels." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
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
    metaDesc: "Advanced thermal paper manufacturing equipment: 4 coating lines, 15 slitting machines, rotary die-cutting. See our production technology.",
    hero: "bg-gradient-to-br from-blue-800 to-blue-600",
    subtitle: "Advanced Production Technology for Precision Output",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Core Manufacturing Equipment</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: "Thermal Coating Lines (×4)",
                specs: ["Width: up to 1,600mm", "Speed: 300m/min", "Coating weight: 3–8 g/m²", "Temperature control: ±0.5°C"],
                desc: "High-speed coating machines apply thermal-sensitive chemistry to base paper. Precise temperature and speed control ensures consistent coating weight and sensitivity across every roll.",
              },
              {
                name: "Precision Slitting Machines (×15)",
                specs: ["Slit width: 25–210mm", "Speed: 600m/min", "Tension control: servo-driven", "Edge quality: <0.1mm tolerance"],
                desc: "Servo-driven slitting machines cut parent rolls to exact customer specifications. Automatic tension control prevents telescoping and ensures tight, uniform roll winding.",
              },
              {
                name: "Rotary Die-Cutting (×6)",
                specs: ["Label size: 10×10mm to 200×300mm", "Speed: 150m/min", "Die tolerance: ±0.05mm", "Fanfold & roll configurations"],
                desc: "Rotary die-cutting lines produce labels in any shape or size. Compatible with fanfold, roll, and sheet configurations for all thermal printer types.",
              },
              {
                name: "Flexographic Printing (×3)",
                specs: ["Colors: 1–4 process colors", "Registration: ±0.1mm", "Speed: 200m/min", "UV & water-based inks"],
                desc: "Flexographic printing lines apply logos, barcodes, and custom designs. UV and water-based inks available, with Pantone color matching for brand consistency.",
              },
            ].map((eq) => (
              <div key={eq.name} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 text-lg mb-3">{eq.name}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{eq.desc}</p>
                <div className="bg-slate-50 rounded-lg p-3">
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
    metaTitle: "Thermal Paper Production Capacity | 30T/Day | 200,000 Rolls/Day | Zhixin Paper",
    metaDesc: "Zhixin Paper produces 30 tonnes of thermal paper and 200,000 rolls per day. Large inventory buffer ensures stable supply for distributors worldwide.",
    hero: "bg-gradient-to-br from-green-800 to-green-600",
    subtitle: "30 Tonnes/Day · 200,000 Rolls/Day · 15-Day Lead Time",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Annual Production Capacity</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { value: "30T", label: "Thermal Paper / Day", sub: "10,950 tonnes/year" },
              { value: "200K", label: "Rolls / Day", sub: "73M rolls/year" },
              { value: "500M+", label: "Labels / Year", sub: "All formats combined" },
              { value: "15 Days", label: "Standard Lead Time", sub: "Ex-factory, FOB Qingdao" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{stat.label}</div>
                <div className="text-slate-400 text-xs">{stat.sub}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
            <h3 className="font-bold text-slate-800 mb-3">Inventory Buffer Policy</h3>
            <p className="text-slate-600 leading-relaxed">
              We maintain a 30-day finished goods inventory buffer for our top-selling SKUs, ensuring immediate availability for urgent orders. For custom specifications, we recommend placing orders 21 days in advance to guarantee on-time delivery.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Minimum Order Quantities</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-800 text-white">
                  <th className="text-left p-3 rounded-tl-lg">Product Type</th>
                  <th className="text-left p-3">Standard MOQ</th>
                  <th className="text-left p-3">Custom Print MOQ</th>
                  <th className="text-left p-3 rounded-tr-lg">Sample</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Standard POS Rolls", "5,000 rolls", "10,000 rolls", "Free (5 rolls)"],
                  ["ATM / Banking Rolls", "2,000 rolls", "5,000 rolls", "Free (3 rolls)"],
                  ["Lottery / Casino Rolls", "1,000 rolls", "5,000 rolls", "Free (3 rolls)"],
                  ["Direct Thermal Labels", "10,000 labels", "50,000 labels", "Free (1 roll)"],
                  ["Thermal Transfer Labels", "10,000 labels", "50,000 labels", "Free (1 roll)"],
                  ["Specialty Labels (Freezer/High-Temp)", "5,000 labels", "20,000 labels", "Free (1 roll)"],
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
    metaTitle: "ISO 9001 Quality Management | Thermal Paper Quality Testing | Zhixin Paper",
    metaDesc: "ISO 9001:2015 certified quality management system. Full traceability from raw material to finished goods. BPA testing, sensitivity testing, and archival life verification.",
    hero: "bg-gradient-to-br from-purple-800 to-purple-600",
    subtitle: "ISO 9001:2015 Certified · Full Traceability · Zero-Defect Target",
    content: (
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Quality Management System</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            Our ISO 9001:2015 certified quality management system covers every stage of production, from incoming raw material inspection to final goods release. Every batch is assigned a unique lot number enabling full traceability throughout the supply chain.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { step: "01", title: "Incoming Inspection", desc: "Base paper, thermal coating chemicals, and adhesives tested against specification before entering production." },
              { step: "02", title: "In-Process Control", desc: "Coating weight, sensitivity, and dimensional checks performed every 30 minutes during production runs." },
              { step: "03", title: "BPA/Chemical Testing", desc: "Batch testing for BPA, BPS, and REACH SVHC substances. Third-party lab verification available on request." },
              { step: "04", title: "Print Quality Test", desc: "Sensitivity, contrast, and barcode readability verified against ISO 15416 barcode quality standards." },
              { step: "05", title: "Archival Life Test", desc: "Accelerated ageing tests verify image stability at 60°C/50% RH for 72 hours, equivalent to 5+ years storage." },
              { step: "06", title: "Final Release", desc: "QC manager sign-off required before goods are released. Certificate of Analysis available for every shipment." },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <div className="text-blue-600 font-bold text-sm mb-2">STEP {item.step}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Certifications & Test Reports</h2>
          <p className="text-slate-600 mb-6">All certificates are available for download. Third-party test reports from SGS, Intertek, and Bureau Veritas available on request.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "ISO 9001:2015", issuer: "Bureau Veritas", href: "/compliance/iso-9001" },
              { name: "BPA-Free", issuer: "SGS", href: "/compliance/bpa-free" },
              { name: "REACH/RoHS", issuer: "Intertek", href: "/compliance/reach-rohs" },
              { name: "FSC Chain of Custody", issuer: "FSC International", href: "/compliance/fsc-paper" },
            ].map((cert) => (
              <Link key={cert.name} href={cert.href} className="bg-white rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all text-center group">
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
            Can't visit in person? Our virtual factory tour gives you a comprehensive view of our manufacturing capabilities, quality control processes, and warehouse operations. Schedule a live video tour with our team, or browse the facility highlights below.
          </p>
          <div className="bg-slate-800 rounded-2xl aspect-video flex items-center justify-center mb-8">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">▶</div>
              <div className="text-xl font-bold mb-2">Factory Tour Video</div>
              <p className="text-slate-400 text-sm">Contact us to schedule a live video tour</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { area: "Coating Hall", desc: "4 high-speed thermal coating lines producing 30 tonnes of coated paper per day." },
              { area: "Slitting Room", desc: "15 precision slitting machines converting parent rolls to customer specifications." },
              { area: "Label Production", desc: "Rotary die-cutting and flexographic printing lines for thermal labels." },
              { area: "QC Laboratory", desc: "In-house testing lab for sensitivity, BPA, archival life, and barcode quality." },
              { area: "Finished Goods Warehouse", desc: "Temperature-controlled warehouse with 30-day buffer stock for key SKUs." },
              { area: "Shipping & Logistics", desc: "Daily container loading for EU, US, and CA markets. FOB Qingdao." },
            ].map((area) => (
              <div key={area.area} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-2">{area.area}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{area.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-blue-50 rounded-2xl p-8 border border-blue-100 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Schedule a Live Video Tour</h2>
          <p className="text-slate-600 mb-6">Our team can arrange a live video walkthrough of the facility via Zoom or Teams. Available Monday–Friday, 9:00–17:00 CST.</p>
          <Link href="/contact" className="inline-block bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
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
      {/* Hero */}
      <section className={`${page.hero} text-white py-16`}>
        <div className="max-w-6xl mx-auto px-6">
          <nav className="text-white/60 text-sm mb-6 flex items-center gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/factory" className="hover:text-white">Factory</Link>
            <span>/</span>
            <span className="text-white">{page.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">{page.title}</h1>
          <p className="text-white/80 text-lg">{page.subtitle}</p>
        </div>
      </section>

      {/* Sub-navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {allPages.map((p) => (
              <Link
                key={p.slug}
                href={`/factory/${p.slug}`}
                className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
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

      {/* CTA */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Visit or Partner With Us?</h2>
          <p className="text-blue-100 mb-8">Contact our team to arrange a factory visit, request a video tour, or discuss OEM partnership opportunities.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">Contact Us</Link>
            <Link href="/oem-custom" className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition-colors">OEM Services</Link>
          </div>
        </div>
      </section>
    </main>
      <Footer />
    </>
  );
}
