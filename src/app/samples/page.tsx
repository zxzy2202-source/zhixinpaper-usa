import type { Metadata } from "next";
import SamplesClient from "./SamplesClient";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request Free Thermal Paper Samples",
  description:
    "Request thermal paper roll and label samples for specification, printer-fit, material, print-quality, adhesive, and document checks before a wholesale order.",
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
