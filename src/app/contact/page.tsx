import type { Metadata } from "next";
import { buildSectionMetadata, DEFAULT_SEO_SECTIONS } from "@/lib/siteSettings";
import ContactClient from "./ContactClient";

const contactSeoDefaults = DEFAULT_SEO_SECTIONS.contact;

export async function generateMetadata(): Promise<Metadata> {
  return buildSectionMetadata("contact", {
    fallbackTitle: contactSeoDefaults.siteTitle,
    fallbackDescription: contactSeoDefaults.siteDescription,
    path: "/contact",
    fallbackKeywords: contactSeoDefaults.keywords.split(",").map((item) => item.trim()),
  });
}

export default function ContactPage() {
  return <ContactClient />;
}
