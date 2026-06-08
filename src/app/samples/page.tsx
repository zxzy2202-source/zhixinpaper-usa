import type { Metadata } from "next";
import SamplesClient from "./SamplesClient";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request Free Thermal Paper Samples",
  description:
    "Request free thermal paper roll and label samples from Zhixin Paper. Production-grade samples with compliance certificates. Available for qualified distributors and importers in Europe, USA, and Canada.",
  keywords: [
    "free thermal paper samples",
    "thermal paper sample request",
    "thermal label samples wholesale",
    "BPA-free thermal paper sample",
    "thermal paper distributor samples",
  ],
  alternates: { canonical: canonicalUrl("/samples") },
};

export default function SamplesPage() {
  return <SamplesClient />;
}
