import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Us — Get a Quote or Request Samples",
  description:
    "Contact Zhixin Paper about wholesale thermal paper rolls and labels. Request a specification review, sample, document pack, packing plan, or custom quote.",
  keywords: [
    "contact thermal paper manufacturer",
    "thermal paper wholesale inquiry",
    "thermal paper quote request",
    "Zhixin Paper contact",
    "thermal paper supplier contact China",
  ],
  alternates: { canonical: canonicalUrl("/contact") },
};

export default function ContactPage() {
  return <ContactClient />;
}
