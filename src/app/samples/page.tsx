import type { Metadata } from "next";
import { buildSectionMetadata, DEFAULT_SEO_SECTIONS } from "@/lib/siteSettings";
import SamplesClient from "./SamplesClient";

const samplesSeoDefaults = DEFAULT_SEO_SECTIONS.samples;

export async function generateMetadata(): Promise<Metadata> {
  return buildSectionMetadata("samples", {
    fallbackTitle: samplesSeoDefaults.siteTitle,
    fallbackDescription: samplesSeoDefaults.siteDescription,
    path: "/samples",
    fallbackKeywords: samplesSeoDefaults.keywords.split(",").map((item) => item.trim()),
  });
}

export default function SamplesPage() {
  return <SamplesClient />;
}
