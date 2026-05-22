import Link from "next/link";
import { ArrowRight, Package, ShieldCheck, Clock, Star, Truck } from "lucide-react";

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
  title = "Ready to Source Thermal Consumables?",
  subtitle = "Get a custom quote within 24 hours. Free samples available for qualified distributors and importers worldwide.",
  primaryLabel = "Request a Quote",
  primaryHref = "/quote",
  secondaryLabel = "Request Free Samples",
  secondaryHref = "/samples",
  trustItems,
  showTrust = true,
}: CTABannerProps) {
  const items = trustItems ?? DEFAULT_TRUST;

  return (
    <section className="py-16 bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="container-site relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0 backdrop-blur-sm">
              <Package className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                {title}
              </h2>
              <p className="text-blue-100 text-base max-w-xl">{subtitle}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href={primaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl text-sm whitespace-nowrap"
            >
              {primaryLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent text-white font-semibold rounded-xl border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all text-sm whitespace-nowrap"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>

        {/* Trust strip */}
        {showTrust && items.length > 0 && (
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2">
            {items.map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-blue-100">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-200 shrink-0" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
