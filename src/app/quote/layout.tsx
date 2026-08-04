import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildSectionMetadata, DEFAULT_SEO_SECTIONS } from "@/lib/siteSettings";

const quoteSeoDefaults = DEFAULT_SEO_SECTIONS.quote;

export async function generateMetadata(): Promise<Metadata> {
  return buildSectionMetadata("quote", {
    fallbackTitle: quoteSeoDefaults.siteTitle,
    fallbackDescription: quoteSeoDefaults.siteDescription,
    path: "/quote",
    fallbackKeywords: quoteSeoDefaults.keywords.split(",").map((item) => item.trim()),
  });
}

export default function QuoteLayout({ children }: { children: ReactNode }) {
  return children;
}
