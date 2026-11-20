import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import CTABanner from "@/components/ui/CTABanner";
import { breadcrumbSchema, canonicalUrl } from "@/lib/seo";

const url = canonicalUrl("/compliance/certificates");
const title = "Product Documents for Scope Review";
const description = "Available technical documents and test reports are reviewed for the selected material and intended use. Report availability, sample identity, test items, date and scope require confirmation. A report for one sample does not establish compliance for every product or grade. Selected applicable raw materials have supplier FSC certificates available on request; this does not certify Zhixin or its finished products.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url, languages: { en: url, "x-default": url } },
};

export default function DocumentScopePage() {
  const schema = [
    { "@context": "https://schema.org", "@type": "WebPage", name: title, url, description },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Compliance", url: "/compliance" },
      { name: title, url: "/compliance/certificates" },
    ]),
  ];

  return (
    <>
      <Header />
      {schema.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
      <main id="main-content">
        <HeroBanner
          variant="media"
          eyebrow="Document scope"
          title={title}
          description={description}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Compliance", href: "/compliance" },
            { label: title },
          ]}
          actions={[{ label: "Ask About Document Availability", href: "/contact?mode=quote#contact-form", kind: "primary" }]}
        />
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-bold">Review the material and intended use</h2>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">A report describes the sample and tests identified in it; it does not establish the same result for every grade. Check the date, test items and sample identity before relying on it.</p>
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">
            Share the material, application and destination when requesting available documents. Review the identity and scope of each document against the selected order.
          </p>
          <Link className="mt-6 inline-block font-bold text-[#0f5f5c]" href="/compliance">
            Explore other document review topics →
          </Link>
        </section>
      </main>
      <CTABanner
        title="Discuss your document request"
        subtitle="Share the selected material, intended use and destination so availability and scope can be reviewed."
        primaryLabel="Request a Quote"
        secondaryLabel="Request Samples"
      />
      <Footer />
    </>
  );
}
