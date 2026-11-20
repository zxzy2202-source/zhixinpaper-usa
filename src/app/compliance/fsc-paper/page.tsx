import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/ui/HeroBanner";
import CTABanner from "@/components/ui/CTABanner";
import { breadcrumbSchema, canonicalUrl } from "@/lib/seo";

const url = canonicalUrl("/compliance/fsc-paper");
const title = "FSC-Certified Raw Material Options";
const description = "Selected applicable raw materials are FSC-certified. Supplier certificates are available on request. This does not mean that Zhixin or its finished products are FSC-certified. Confirm the selected material, certificate holder, validity and scope for each request.";
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
      { name: title, url: "/compliance/fsc-paper" },
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
          <p className="mt-4 max-w-3xl leading-8 text-slate-600">A supplier certificate applies to the holder and scope stated on that certificate. Confirm whether the selected raw material is covered; it does not certify the converter or finished product.</p>
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
