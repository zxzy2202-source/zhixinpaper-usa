import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

interface HeroLink {
  label: string;
  href?: string;
}

interface HeroAction extends HeroLink {
  kind?: "primary" | "secondary";
}

interface HeroBannerProps {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  breadcrumbs?: HeroLink[];
  actions?: HeroAction[];
  aside?: ReactNode;
  media?: ReactNode;
  variant?: "standard" | "media" | "overview";
  /** Overlay left/center/right opacity stops. Defaults to the existing dark overlay. */
  overlayStrength?: { left?: number; center?: number; right?: number };
  /** Mobile object-position for the first media child. Only applied when media is present. */
  mediaMobilePosition?: string;
  className?: string;
}

export default function HeroBanner({
  title,
  description,
  eyebrow,
  breadcrumbs = [],
  actions = [],
  aside,
  media,
  variant = "standard",
  overlayStrength,
  mediaMobilePosition,
  className = "",
}: HeroBannerProps) {
  const isDark = variant !== "standard";
  const visibleActions = actions.slice(0, 2);
  const sectionClass = isDark
    ? "paper-noise bg-[#101b19] text-white"
    : "border-b border-[#ded6c8] bg-[linear-gradient(135deg,#fbfaf6_0%,#f4f0e8_60%,#e7eee9_100%)] text-[#14211f]";
  const contentGrid = aside || media ? "lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.62fr)] lg:items-center" : "";

  const l = overlayStrength?.left ?? 0.78;
  const c = overlayStrength?.center ?? 0.56;
  const r = overlayStrength?.right ?? 0.18;

  return (
    <section
      data-component="hero-banner"
      data-variant={variant}
      className={`relative overflow-hidden ${sectionClass} ${className}`}
      style={{ paddingTop: "var(--site-header-offset)" }}
    >
      {media && <div className="absolute inset-0">{media}</div>}
      {media && (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg,rgba(8,20,18,${l})_0%,rgba(8,20,18,${c})_48%,rgba(8,20,18,${r})_100%)` }}
        />
      )}
      {isDark && !media && (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(185,130,47,0.14),transparent_28rem)]" />
      )}

      <div className="container-site relative z-10" style={{ paddingBlock: "var(--hero-space-y)" }}>
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={`mb-7 flex flex-wrap items-center gap-1.5 text-xs ${isDark ? "text-[#c7d0cb]" : "text-[#687772]"}`}>
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`} className="inline-flex items-center gap-1.5">
                {index > 0 && <ChevronRight className="h-3 w-3 opacity-60" aria-hidden="true" />}
                {item.href ? (
                  <Link href={item.href} className={`transition-colors ${isDark ? "hover:text-white" : "hover:text-[#0f5f5c]"}`}>
                    {item.label}
                  </Link>
                ) : (
                  <span aria-current="page" className={isDark ? "text-white" : "text-[#14211f]"}>{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className={`grid gap-10 ${contentGrid}`}>
          <div className="max-w-4xl min-w-0">
            {eyebrow && (
              <p className={`mb-4 text-[11px] font-bold uppercase tracking-[0.18em] ${isDark ? "text-[#d6b273]" : "text-[#0f5f5c]"}`}>
                {eyebrow}
              </p>
            )}
            <h1 className={`max-w-4xl break-words font-extrabold leading-[1.04] ${isDark ? "text-white" : "text-[#14211f]"}`} style={{ fontSize: "var(--hero-title-size)" }}>
              {title}
            </h1>
            {description && (
              <div className={`mt-6 max-w-3xl leading-8 ${isDark ? "text-[#d9dfda]" : "text-[#4f5f5a]"}`} style={{ fontSize: "var(--hero-copy-size)" }}>
                {description}
              </div>
            )}
            {visibleActions.length > 0 && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {visibleActions.map((action, index) => {
                  const primary = action.kind === "primary" || (!action.kind && index === 0);
                  return (
                    <Link
                      key={`${action.href}-${action.label}`}
                      href={action.href ?? "#"}
                      className={primary
                        ? "inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-7 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(20,33,31,0.22)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
                        : isDark
                          ? "inline-flex min-h-11 items-center justify-center gap-2 border border-white/28 bg-white/[0.06] px-7 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.12] active:translate-y-px"
                          : "inline-flex min-h-11 items-center justify-center gap-2 border border-[#0f5f5c]/35 bg-white/55 px-7 py-3 text-sm font-semibold text-[#0f5f5c] transition duration-200 hover:-translate-y-0.5 hover:border-[#0f5f5c] hover:bg-white active:translate-y-px"
                      }
                    >
                      {action.label}
                      {primary && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {(aside || (media && variant === "overview")) && aside}
        </div>
      </div>
    </section>
  );
}
