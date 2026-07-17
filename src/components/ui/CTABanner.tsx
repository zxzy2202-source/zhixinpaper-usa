import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Optional trust items shown below the CTA buttons */
  trustItems?: string[];
  /** Whether to show the default trust strip */
  showTrust?: boolean;
}

const DEFAULT_TRUST = [
  "ISO 9001:2015 Certified",
  "Quote within 24 h",
  "Free samples for qualified buyers",
  "DDP / FOB / CIF shipping",
];

export default function CTABanner({
  title = "Send us your roll or label specification.",
  subtitle = "We will review product fit, samples, documents, packing, lead time, and shipping terms for your destination.",
  primaryLabel = "Request a Quote",
  primaryHref = "/quote",
  secondaryLabel = "Request Samples",
  secondaryHref = "/samples",
  trustItems,
  showTrust = true,
}: CTABannerProps) {
  const items = trustItems ?? DEFAULT_TRUST;

  return (
    <section className="paper-noise relative overflow-hidden bg-[#101b19] py-16 text-white">
      <div className="container-site relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
              <h2 className="mb-2 text-2xl font-bold leading-tight text-white md:text-3xl">
                {title}
              </h2>
              <p className="max-w-xl text-base leading-7 text-[#c7d0cb]">{subtitle}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 bg-white px-6 py-3 text-sm font-bold text-[#14211f] shadow-[0_16px_42px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f0e8] active:translate-y-px whitespace-nowrap"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 border border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 active:translate-y-px whitespace-nowrap"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        {showTrust && items.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/16 pt-6">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-[#d9dfda]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d6b273] shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
