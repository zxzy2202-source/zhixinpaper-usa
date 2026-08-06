import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, FileText, Globe2, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import { breadcrumbSchema, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Thermal Paper Export Markets and Buyer Routes",
  description:
    "Compare Zhixin Paper supply routes for Europe, the United States, Canada, and Mexico, including product, document, packing, and destination review points.",
  path: "/markets",
});

const markets = [
  {
    name: "Europe",
    href: "/eu",
    icon: Globe2,
    summary: "Review product construction, REACH and RoHS document routes, food-contact scope, packing, and destination-specific requirements.",
    linkLabel: "Explore Europe route",
  },
  {
    name: "United States",
    href: "/us",
    icon: FileText,
    summary: "Review application, printer fit, FDA or food-contact scope where relevant, California disclosure needs, packing, and delivery terms.",
    linkLabel: "Explore US route",
  },
  {
    name: "Canada",
    href: "/ca",
    icon: BookOpen,
    summary: "Review product fit, bilingual artwork or documentation needs, application conditions, packing, and importer requirements.",
    linkLabel: "Explore Canada route",
  },
  {
    name: "Mexico",
    href: "/mx",
    icon: MapPin,
    summary: "Review specification, export documents, customs coordination inputs, packing, Incoterm, and destination details before shipment planning.",
    linkLabel: "Explore Mexico route",
  },
];

export default function MarketsPage() {
  const jsonLd = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Export Markets", url: "/markets" },
  ]);

  return (
    <>
      <Header />
      <main id="main-content" className="min-h-screen bg-[#fbfaf6]">
        <HeroBanner
          variant="overview"
          eyebrow="Export markets"
          title="Choose the Buyer Route for Your Destination"
          description="Start with the destination market, then confirm the product specification, application, required documents, packing, Incoterm, and current project scope before approval."
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Export Markets" }]}
          actions={[
            { label: "Request a Quote", href: "/quote", kind: "primary" },
            { label: "Review Compliance", href: "/compliance", kind: "secondary" },
          ]}
        />

        <section className="container-site py-14 lg:py-20">
          <div className="mb-9 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0f5f5c]">Market routes</p>
            <h2 className="mt-3 text-3xl font-bold text-[#14211f]">Compare destination-specific review paths</h2>
            <p className="mt-4 leading-7 text-[#5f6d68]">
              These pages organize buyer questions by market. Final material suitability, documents, declarations, packing, and logistics are confirmed against the quoted product and destination.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {markets.map((market) => {
              const Icon = market.icon;
              return (
                <article key={market.href} className="border border-[#ded6c8] bg-white p-6 shadow-[0_12px_30px_rgba(20,33,31,0.06)]">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-[#14211f]">{market.name}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#5f6d68]">{market.summary}</p>
                  <Link href={market.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0f5f5c] hover:text-[#0b4846]">
                    {market.linkLabel}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </main>
      <Footer />
    </>
  );
}
