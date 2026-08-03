import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SlotImage from "@/components/ui/SlotImage";

export interface RegionHeroTheme {
  bgColor: string;
  overlayGradient: string;
  accentBarColor: string;
  accentTextColor: string;
  checkColor: string;
  primaryButtonColor: string;
  primaryButtonHoverColor: string;
  primaryButtonShadowColor: string;
}

export interface RegionHeroProps {
  slotKey: string;
  alt: string;
  flagEmoji: string;
  marketLabel: string;
  title: string;
  description: string;
  features: string[];
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  theme: RegionHeroTheme;
}

export default function RegionHero({
  slotKey,
  alt,
  flagEmoji,
  marketLabel,
  title,
  description,
  features,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  theme,
}: RegionHeroProps) {
  return (
    <section className={`relative isolate overflow-hidden ${theme.bgColor} text-white`}>
      <SlotImage
        slotKey={slotKey}
        alt={alt}
        fill
        fetchPriority="high"
        loading="eager"
        sizes="100vw"
        quality={65}
        className="-z-20 object-cover object-center"
      />
      <div className={`absolute inset-0 -z-10 ${theme.overlayGradient}`} />

      <div className="container-site py-16 md:py-20 lg:py-24">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-5xl drop-shadow-lg">{flagEmoji}</span>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-8 h-0.5 ${theme.accentBarColor} rounded-full`} />
              <span className={`text-xs font-bold tracking-widest uppercase ${theme.accentTextColor}`}>
                {marketLabel}
              </span>
            </div>
            <h1 className="font-bold text-white leading-[1.08] text-4xl sm:text-5xl md:text-6xl">
              {title}
            </h1>
          </div>
        </div>
        <p className="text-white/90 text-lg max-w-2xl mb-5 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {features.map((f) => (
            <span
              key={f}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-xs tracking-wide uppercase text-white shadow-sm"
            >
              <CheckCircle2 className={`w-3 h-3 ${theme.checkColor}`} />
              {f}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={ctaPrimaryHref}
            className={`inline-flex items-center gap-2 px-6 py-3 ${theme.primaryButtonColor} ${theme.primaryButtonHoverColor} text-white font-bold transition-all shadow-lg ${theme.primaryButtonShadowColor} text-sm`}
          >
            {ctaPrimaryLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/samples"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm text-sm"
          >
            Request Samples
          </Link>
        </div>
      </div>
    </section>
  );
}
