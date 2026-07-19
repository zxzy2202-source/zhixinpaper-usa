"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY, THERMAL_PAPER_ROLLS, THERMAL_LABELS, INDUSTRIES } from "@/lib/data";
import {
  CheckCircle2, ChevronDown, Menu, X, Phone, Mail, ArrowRight,
  Globe, ShieldCheck, BookOpen, Users,
  Package, Tag, Settings, FileText, MapPin,
  Factory as FactoryIcon, Award, Cpu, BarChart2, Eye,
  Newspaper, Briefcase, HelpCircle, Info, MessageSquare, Printer, Ruler,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tag = "SEO" | "P1" | "New" | "GEO";

interface NavBadgeProps { tag?: Tag }
function NavBadge({ tag }: NavBadgeProps) {
  if (!tag) return null;
  const styles: Record<Tag, string> = {
    SEO: "bg-[#f3e6cf] text-[#9f6e25]",
    P1:  "bg-[#e7eee9] text-[#0f5f5c]",
    New: "bg-emerald-100 text-emerald-700",
    GEO: "bg-[#ebe5d9] text-[#695948]",
  };
  return (
    <span className={`ml-1.5 px-1.5 py-0.5 text-[9px] font-bold ${styles[tag]}`}>
      {tag}
    </span>
  );
}

// ─── Products Mega Menu ────────────────────────────────────────────────────────
const PRODUCT_MENU_SPECS = [
  "Size, core, OD, winding",
  "Material, adhesive, liner",
  "Compliance files",
  "Packing and pallet plan",
];

function ProductsMegaMenu() {
  const pathname = usePathname();
  const rolls = THERMAL_PAPER_ROLLS.slice(0, 5);
  const labels = THERMAL_LABELS.slice(0, 5);

  return (
    <div className="w-[min(94vw,1080px)] overflow-hidden border border-[#c8bcaa] bg-[#fbfaf6] shadow-[0_34px_90px_rgba(8,20,18,0.28)]">
      <div className="grid grid-cols-[1fr_auto] items-center gap-5 bg-[#101b19] px-6 py-5 text-white">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6b273]">Product navigator</p>
          <p className="mt-2 text-xl font-bold leading-tight">Choose the product path before sending an RFQ.</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c7d0cb]">
            Start from rolls or labels, then match size, material, compliance files, packing, and sample requirements.
          </p>
        </div>
        <Link
          href="/quote"
          className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-5 py-3 text-sm font-bold text-white shadow-[0_16px_34px_rgba(185,130,47,0.26)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
        >
          Request a Quote <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_1fr_300px]">
        <section className="border-r border-[#ded6c8] p-5">
          <Link
            href="/products/thermal-paper-rolls"
            className="group block border border-[#ded6c8] bg-white p-4 text-[#14211f] shadow-[0_10px_28px_rgba(20,33,31,0.06)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#0f5f5c]/40 hover:shadow-[0_18px_44px_rgba(20,33,31,0.12)]"
          >
            <span className="flex items-start justify-between gap-4">
              <span className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">
                  <Package className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#87918c]">Rolls route</span>
                  <span className="mt-1 block text-lg font-bold leading-6">Thermal paper rolls</span>
                  <span className="mt-2 block text-xs leading-5 text-[#687772]">POS, ATM, lottery, ticketing, kiosk, and OEM receipt programs.</span>
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 text-[#b9822f] transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="mt-4 space-y-1.5">
            {rolls.map((p) => (
              <Link
                key={p.slug}
                href={`/products/thermal-paper-rolls/${p.slug}`}
                className={`group flex min-h-[48px] items-start justify-between gap-3 border-l-2 px-3 py-2.5 text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/products/thermal-paper-rolls/${p.slug}`
                    ? "border-[#0f5f5c] bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                    : "border-transparent text-[#4f5f5a] hover:border-[#d6b273] hover:bg-white hover:text-[#14211f]"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-semibold leading-5">{p.name}</span>
                  <span className="block truncate text-xs font-normal text-[#87918c]">{p.sizes.slice(0, 3).join(" / ")}</span>
                </span>
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c8bcaa] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <Link href="/products/thermal-paper-rolls" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
            View all roll grades <ArrowRight className="h-3 w-3" />
          </Link>
        </section>

        <section className="border-r border-[#ded6c8] p-5">
          <Link
            href="/products/thermal-labels"
            className="group block border border-[#ded6c8] bg-white p-4 text-[#14211f] shadow-[0_10px_28px_rgba(20,33,31,0.06)] transition-[border-color,box-shadow,transform] hover:-translate-y-0.5 hover:border-[#b9822f]/50 hover:shadow-[0_18px_44px_rgba(20,33,31,0.12)]"
          >
            <span className="flex items-start justify-between gap-4">
              <span className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#f3e6cf] text-[#9f6e25]">
                  <Tag className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#87918c]">Labels route</span>
                  <span className="mt-1 block text-lg font-bold leading-6">Thermal labels</span>
                  <span className="mt-2 block text-xs leading-5 text-[#687772]">Shipping, barcode, cold-chain, retail, industrial, and specialty labels.</span>
                </span>
              </span>
              <ArrowRight className="mt-1 h-4 w-4 text-[#b9822f] transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <div className="mt-4 space-y-1.5">
            {labels.map((l) => (
              <Link
                key={l.slug}
                href={`/products/thermal-labels/${l.slug}`}
                className={`group flex min-h-[48px] items-start justify-between gap-3 border-l-2 px-3 py-2.5 text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/products/thermal-labels/${l.slug}`
                    ? "border-[#0f5f5c] bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                    : "border-transparent text-[#4f5f5a] hover:border-[#d6b273] hover:bg-white hover:text-[#14211f]"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-semibold leading-5">{l.name}</span>
                  <span className="block truncate text-xs font-normal text-[#87918c]">{l.applications.slice(0, 2).join(" / ")}</span>
                </span>
                <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c8bcaa] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
              </Link>
            ))}
          </div>

          <Link href="/products/thermal-labels" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
            View all label materials <ArrowRight className="h-3 w-3" />
          </Link>
        </section>

        <aside className="flex flex-col bg-[#14211f] p-5 text-white">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d6b273]">RFQ shortcuts</p>
            <p className="mt-2 text-lg font-bold leading-6">Send enough detail for an accurate quote.</p>
            <div className="mt-4 space-y-2">
              {PRODUCT_MENU_SPECS.map((spec) => (
                <div key={spec} className="flex items-start gap-2 text-xs leading-5 text-[#c7d0cb]">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d6b273]" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            <Link
              href="/quote"
              className="inline-flex min-h-10 items-center justify-center gap-2 bg-[#9c661d] px-4 py-2.5 text-xs font-bold text-white shadow-[0_12px_28px_rgba(185,130,47,0.20)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
            >
              Request a Quote <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/samples"
              className="inline-flex min-h-10 items-center justify-center gap-2 border border-white/20 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:border-[#d6b273]/50 hover:bg-white/[0.08]"
            >
              Request Samples
            </Link>
          </div>

          <div className="mt-auto border-t border-white/10 pt-4">
            <Link href="/oem-custom/private-label" className="flex items-center gap-2 py-1.5 text-xs font-semibold text-[#e9dfcf] hover:text-white">
              <Settings className="h-3.5 w-3.5 text-[#d6b273]" />
              Private label supply
            </Link>
            <Link href="/oem-custom/moq-guide" className="flex items-center gap-2 py-1.5 text-xs font-semibold text-[#e9dfcf] hover:text-white">
              <FileText className="h-3.5 w-3.5 text-[#d6b273]" />
              MOQ and packing guide
            </Link>
            <Link href="/products" className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#d6b273] hover:underline">
              All products <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>

      <div className="flex items-center justify-between border-t border-[#ded6c8] bg-[#f4f0e8] px-6 py-3">
        <span className="text-xs text-[#687772]">BPA-free / ISO 9001 / FSC / REACH documentation available by quoted grade.</span>
        <Link href="/compliance" className="inline-flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
          Compliance files <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
// ─── Industries Mega Menu ──────────────────────────────────────────────────────
function IndustriesMegaMenu() {
  const pathname = usePathname();

  const highValue = [
    { slug: "lottery-gaming",    name: "Lottery & Gaming",      tag: "SEO" as Tag, icon: "LOT" },
    { slug: "casino",            name: "Casino & Gaming Venues", tag: "SEO" as Tag, icon: "CAS" },
    { slug: "banking-finance",   name: "Banking & Finance",      tag: "SEO" as Tag, icon: "BNK" },
    { slug: "healthcare-pharma", name: "Healthcare & Pharma",    tag: "SEO" as Tag, icon: "MED" },
  ];

  const volume = [
    { slug: "retail-pos",            name: "Retail & POS",            tag: "P1" as Tag,  icon: "POS" },
    { slug: "logistics-warehouse",   name: "Logistics & Warehouse",   tag: "P1" as Tag,  icon: "LOG" },
    { slug: "food-cold-chain",       name: "Food & Cold Chain",       tag: "New" as Tag, icon: "CLD" },
    { slug: "transportation",        name: "Transportation",          tag: "New" as Tag, icon: "TRN" },
    { slug: "automotive-industrial", name: "Automotive & Industrial", tag: "New" as Tag, icon: "IND" },
    { slug: "events-hospitality",    name: "Events & Hospitality",    tag: "New" as Tag, icon: "EVT" },
    { slug: "government-legal",      name: "Government & Legal",      tag: "New" as Tag, icon: "GOV" },
    { slug: "cannabis-specialty",    name: "Cannabis & Specialty",    tag: "New" as Tag, icon: "CAN" },
  ];

  return (
    <div className="w-[min(92vw,620px)] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)] lg:w-[620px]">
      <div className="grid grid-cols-2 divide-x divide-[#ded6c8] p-5">
        {/* High-value verticals */}
        <div className="pr-5">
          <div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold text-[#87918c]">
            <span className="inline-block h-2 w-2 bg-[#9c661d]" />
            High-value verticals
          </div>
          <div className="space-y-0.5">
            {highValue.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className={`flex items-center justify-between px-2.5 py-2  text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/industries/${i.slug}`
                    ? "bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                    : "text-[#4f5f5a] hover:bg-white hover:text-[#14211f]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-8 text-center text-[10px] font-bold text-[#87918c]">{i.icon}</span>
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Volume verticals */}
        <div className="pl-5">
          <div className="mb-3 flex items-center gap-1.5 text-[10px] font-bold text-[#87918c]">
            <span className="inline-block h-2 w-2 bg-[#0f5f5c]" />
            Volume verticals
          </div>
          <div className="space-y-0.5">
            {volume.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className={`flex items-center justify-between px-2.5 py-2  text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/industries/${i.slug}`
                    ? "bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                    : "text-[#4f5f5a] hover:bg-white hover:text-[#14211f]"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-8 text-center text-[10px] font-bold text-[#87918c]">{i.icon}</span>
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#ded6c8] bg-[#f4f0e8] px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#87918c]">Serving 13+ industries worldwide</span>
          <Link href="/quote" className="flex items-center gap-1 bg-[#0f5f5c] px-2.5 py-1 text-xs font-semibold text-white transition-[background-color,border-color,color,box-shadow,transform] hover:bg-[#0a4745]">
            Request a Quote
          </Link>
        </div>
        <Link href="/industries" className="flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
          All industries <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Factory Dropdown ──────────────────────────────────────────────────────────
function FactoryDropdown() {
  const pathname = usePathname();
  const items = [
    { label: "Factory Overview",     href: "/factory/overview",       icon: FactoryIcon, desc: "Facilities & capabilities",  tag: "P1" as Tag },
    { label: "Equipment & Machines", href: "/factory/equipment",      icon: Cpu,         desc: "Production line details" },
    { label: "Production Capacity",  href: "/factory/capacity",       icon: BarChart2,   desc: "Output & lead times" },
    { label: "Quality Control",      href: "/factory/quality-control",icon: Award,       desc: "QC process & standards" },
    { label: "Virtual Factory Tour", href: "/factory/virtual-tour",   icon: Eye,         desc: "360° facility walkthrough" },
  ];
  return (
    <div className="w-[300px] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5  text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href
                  ? "bg-[#e7eee9] text-[#0f5f5c]"
                  : "text-[#33413e] hover:bg-white"
              }`}
            >
              <div className={`w-8 h-8  flex items-center justify-center shrink-0 ${
                pathname === item.href ? "bg-[#d8e6de]" : "bg-[#f4f0e8] group-hover:bg-[#e7eee9]"
              }`}>
                <Icon className={`w-4 h-4 ${pathname === item.href ? "text-[#0f5f5c]" : "text-[#87918c] group-hover:text-[#0f5f5c]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.desc && <div className="mt-0.5 text-xs text-[#87918c]">{item.desc}</div>}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-[#ded6c8] bg-[#f4f0e8] px-4 py-3">
        <Link href="/factory" className="flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
          Factory & OEM overview <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Compliance Dropdown ───────────────────────────────────────────────────────
function ComplianceDropdown() {
  const pathname = usePathname();
  const items = [
    { label: "Certificates",      href: "/compliance/certificates",  icon: FileText,    desc: "Download ISO, FSC, BPA-free docs", tag: "P1" as Tag },
    { label: "BPA / Phenol-Free", href: "/compliance/bpa-free",      icon: ShieldCheck, desc: "Grade terms and evidence scope",      tag: "SEO" as Tag },
    { label: "REACH & RoHS",      href: "/compliance/reach-rohs",    icon: ShieldCheck, desc: "EU chemical compliance",            tag: "SEO" as Tag },
    { label: "ISO 9001",          href: "/compliance/iso-9001",      icon: Award,       desc: "Quality management system" },
    { label: "FSC® Paper",        href: "/compliance/fsc-paper",     icon: BookOpen,    desc: "Sustainable forest sourcing" },
    { label: "EU Food Contact",   href: "/compliance/eu-food-contact",icon: ShieldCheck, desc: "Regulation (EC) No 1935/2004",     tag: "New" as Tag },
    { label: "FDA Compliant (US)",href: "/compliance/fda-us",        icon: ShieldCheck, desc: "US food contact compliance",        tag: "New" as Tag },
  ];
  return (
    <div className="w-[320px] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5  text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href
                  ? "bg-[#e7eee9] text-[#0f5f5c]"
                  : "text-[#33413e] hover:bg-white"
              }`}
            >
              <div className={`w-8 h-8  flex items-center justify-center shrink-0 ${
                pathname === item.href ? "bg-[#d8e6de]" : "bg-[#f4f0e8] group-hover:bg-[#e7eee9]"
              }`}>
                <Icon className={`w-4 h-4 ${pathname === item.href ? "text-[#0f5f5c]" : "text-[#87918c] group-hover:text-[#0f5f5c]"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.desc && <div className="mt-0.5 text-xs text-[#87918c]">{item.desc}</div>}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="border-t border-[#ded6c8] bg-[#f4f0e8] px-4 py-3">
        <Link href="/compliance" className="flex items-center gap-1 text-xs font-semibold text-[#0f5f5c] hover:underline">
          All certifications <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Resources Dropdown ────────────────────────────────────────────────────────
function ResourcesDropdown() {
  const pathname = usePathname();
  const items = [
    {
      label: "Roll Size Guide",
      href: "/blog/thermal-paper-roll-sizes-guide",
      icon: Ruler,
      desc: "Measure width, OD, core, length & winding",
      tag: "SEO" as Tag,
    },
    {
      label: "Printer Compatibility",
      href: "/blog/thermal-paper-printer-compatibility-guide",
      icon: Printer,
      desc: "Qualify POS, terminal, ATM & kiosk models",
      tag: "New" as Tag,
    },
    {
      label: "Blog",
      href: "/blog",
      icon: Newspaper,
      desc: "Industry insights, guides & compliance updates",
      tag: undefined as Tag | undefined,
    },
    {
      label: "Case Studies",
      href: "/case-studies",
      icon: Briefcase,
      desc: "Real-world distributor success stories",
      tag: "New" as Tag,
    },
    {
      label: "FAQ",
      href: "/faq",
      icon: HelpCircle,
      desc: "Common questions about thermal paper & labels",
      tag: "SEO" as Tag,
    },
  ];
  return (
    <div className="w-[300px] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3  text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-[#e7eee9] text-[#0f5f5c]"
                  : "text-[#33413e] hover:bg-white"
              }`}
            >
              <div className={`w-9 h-9  flex items-center justify-center shrink-0 ${
                pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-[#d8e6de]" : "bg-[#f4f0e8] group-hover:bg-[#e7eee9]"
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  pathname === item.href || pathname.startsWith(item.href + "/") ? "text-[#0f5f5c]" : "text-[#87918c] group-hover:text-[#0f5f5c]"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{item.label}</span>
                </div>
                <div className="mt-0.5 text-xs leading-snug text-[#87918c]">{item.desc}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

// ─── About Dropdown ────────────────────────────────────────────────────────────
function AboutDropdown() {
  const pathname = usePathname();
  return (
    <div className="w-[280px] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
      <div className="p-2">
        <Link
          href="/about"
          className={`flex items-center gap-3 px-3 py-3  text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
            pathname === "/about" ? "bg-[#e7eee9] text-[#0f5f5c]" : "text-[#33413e] hover:bg-white"
          }`}
        >
          <div className={`w-9 h-9  flex items-center justify-center shrink-0 ${
            pathname === "/about" ? "bg-[#d8e6de]" : "bg-[#f4f0e8] group-hover:bg-[#e7eee9]"
          }`}>
            <Info className={`w-4 h-4 ${pathname === "/about" ? "text-[#0f5f5c]" : "text-[#87918c] group-hover:text-[#0f5f5c]"}`} />
          </div>
          <div>
            <div className="font-semibold">About Us</div>
            <div className="mt-0.5 text-xs text-[#87918c]">Our story, team & mission</div>
          </div>
        </Link>

        <Link
          href="/contact"
          className={`flex items-center gap-3 px-3 py-3  text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
            pathname === "/contact" ? "bg-[#e7eee9] text-[#0f5f5c]" : "text-[#33413e] hover:bg-white"
          }`}
        >
          <div className={`w-9 h-9  flex items-center justify-center shrink-0 ${
            pathname === "/contact" ? "bg-[#d8e6de]" : "bg-[#f4f0e8] group-hover:bg-[#e7eee9]"
          }`}>
            <MessageSquare className={`w-4 h-4 ${pathname === "/contact" ? "text-[#0f5f5c]" : "text-[#87918c] group-hover:text-[#0f5f5c]"}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">Contact</span>
            </div>
            <div className="mt-0.5 text-xs text-[#87918c]">Get in touch with our team</div>
          </div>
        </Link>
      </div>

      {/* Contact info card */}
      <div className="mx-3 mb-3 border border-[#ded6c8] bg-[#f4f0e8] p-3">
        <div className="mb-2 text-[10px] font-bold text-[#87918c]">Quick Contact</div>
        <a href={`mailto:${COMPANY.email}`} className="mb-1.5 flex items-center gap-2 text-xs text-[#4f5f5a] transition-colors hover:text-[#0f5f5c]">
          <Mail className="w-3.5 h-3.5 text-[#87918c]" />
          {COMPANY.email}
        </a>
        <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-xs text-[#4f5f5a] transition-colors hover:text-[#0f5f5c]">
          <Phone className="w-3.5 h-3.5 text-[#87918c]" />
          {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}

// ─── Export Routes Dropdown ────────────────────────────────────────────────────
function MarketsDropdown() {
  const pathname = usePathname();

  return (
    <div className="w-[340px] overflow-hidden border border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
      <div className="p-4 space-y-0.5">
          <Link
            href="/eu"
            className={`flex items-center gap-2.5 px-2.5 py-2  text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] ${
              pathname.startsWith("/eu")
                ? "bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                : "text-[#33413e] hover:bg-white hover:text-[#14211f]"
            }`}
          >
            <Globe className="w-4 h-4 text-[#87918c]" />
            REACH / RoHS Route
          </Link>
          <Link
            href="/us"
            className={`flex items-center gap-2.5 px-2.5 py-2  text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] ${
              pathname.startsWith("/us")
                ? "bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                : "text-[#33413e] hover:bg-white hover:text-[#14211f]"
            }`}
          >
            <FileText className="w-4 h-4 text-[#87918c]" />
            FDA / Prop 65 Route
          </Link>
          <Link
            href="/ca"
            className={`flex items-center gap-2.5 px-2.5 py-2  text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] ${
              pathname.startsWith("/ca")
                ? "bg-[#e7eee9] text-[#0f5f5c] font-semibold"
                : "text-[#33413e] hover:bg-white hover:text-[#14211f]"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#87918c]" />
            Bilingual Document Route
          </Link>
      </div>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────
// Top-level nav labels
const NAV_LABELS = ["Home", "Products", "Industries", "Factory", "Compliance", "Resources", "About", "Export"] as const;
type NavLabel = typeof NAV_LABELS[number];

// Dropdown alignment: "center" | "left" | "right"
const NAV_ALIGN: Record<NavLabel, "center" | "left" | "right"> = {
  Home:       "left",
  Products:   "left",
  Industries: "left",
  Factory:    "center",
  Compliance: "center",
  Resources:  "center",
  About:      "right",
  Export:     "right",
};

// Mobile items
interface MobileItem { label: string; href: string; tag?: Tag; sub?: string }
const MOBILE_ITEMS: Record<NavLabel, MobileItem[]> = {
  Home: [],
  Products: [
    { label: "Thermal Paper Rolls ›", href: "/products/thermal-paper-rolls" },
    ...THERMAL_PAPER_ROLLS.slice(0, 4).map(p => ({ label: p.name, href: `/products/thermal-paper-rolls/${p.slug}` })),
    { label: "Thermal Labels ›", href: "/products/thermal-labels" },
    ...THERMAL_LABELS.slice(0, 4).map(l => ({ label: l.name, href: `/products/thermal-labels/${l.slug}` })),
    { label: "Request Samples", href: "/samples", tag: "P1" },
    { label: "Private Label Supply", href: "/oem-custom/private-label" },
    { label: "MOQ & Packing Guide", href: "/oem-custom/moq-guide" },
  ],
  Industries: [
    { label: "Lottery & Gaming",      href: "/industries/lottery-gaming" },
    { label: "Casino",                href: "/industries/casino" },
    { label: "Banking & Finance",     href: "/industries/banking-finance" },
    { label: "Healthcare & Pharma",   href: "/industries/healthcare-pharma" },
    { label: "Retail & POS",          href: "/industries/retail-pos" },
  ],
  Factory: [
    { label: "Factory Overview",      href: "/factory/overview",        tag: "P1" },
    { label: "Equipment & Machines",  href: "/factory/equipment" },
    { label: "Production Capacity",   href: "/factory/capacity" },
    { label: "Quality Control",       href: "/factory/quality-control" },
    { label: "Virtual Factory Tour",  href: "/factory/virtual-tour" },
  ],
  Compliance: [
    { label: "Certificates",          href: "/compliance/certificates",   tag: "P1" },
    { label: "BPA / Phenol-Free",     href: "/compliance/bpa-free",       tag: "SEO" },
    { label: "REACH & RoHS",          href: "/compliance/reach-rohs",     tag: "SEO" },
    { label: "ISO 9001",              href: "/compliance/iso-9001" },
    { label: "FSC® Paper",            href: "/compliance/fsc-paper" },
    { label: "EU Food Contact",       href: "/compliance/eu-food-contact",tag: "New" },
    { label: "FDA Compliant (US)",    href: "/compliance/fda-us",         tag: "New" },
  ],
  Resources: [
    { label: "Roll Size Guide", href: "/blog/thermal-paper-roll-sizes-guide", tag: "SEO" },
    { label: "Printer Compatibility", href: "/blog/thermal-paper-printer-compatibility-guide", tag: "New" },
    { label: "Blog",         href: "/blog" },
    { label: "Case Studies", href: "/case-studies", tag: "New" },
    { label: "FAQ",          href: "/faq",           tag: "SEO" },
  ],
  About: [
    { label: "About Us", href: "/about" },
    { label: "Contact",  href: "/contact", tag: "P1" },
  ],
  Export: [
    { label: "REACH / RoHS Route",        href: "/eu" },
    { label: "FDA / Prop 65 Route",       href: "/us" },
    { label: "Bilingual Document Route",  href: "/ca" },
  ],
};

// ─── Main Header ──────────────────────────────────────────────────────────────
export default function Header() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [activeMenu, setActiveMenu]         = useState<NavLabel | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<NavLabel | null>(null);
  const pathname = usePathname();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const openMenu  = (label: NavLabel) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setActiveMenu(null), 180);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/") || (href !== "/" && pathname.startsWith(href));
  const hasDropdown = (label: NavLabel) => label !== "Home";

  const navHref: Record<NavLabel, string> = {
    Home:       "/",
    Products:   "/products",
    Industries: "/industries",
    Factory:    "/factory",
    Compliance: "/compliance",
    Resources:  "/blog",
    About:      "/about",
    Export:     "/eu",
  };

  const renderDropdown = (label: NavLabel) => {
    switch (label) {
      case "Products":    return <ProductsMegaMenu />;
      case "Industries":  return <IndustriesMegaMenu />;
      case "Factory":     return <FactoryDropdown />;
      case "Compliance":  return <ComplianceDropdown />;
      case "Resources":   return <ResourcesDropdown />;
      case "About":       return <AboutDropdown />;
      case "Export":      return <MarketsDropdown />;
      default:            return null;
    }
  };

  // Compute dropdown position class based on alignment
  const getAlignClass = (label: NavLabel) => {
    if (label === "Products") return "-left-56";
    const align = NAV_ALIGN[label];
    if (align === "left")   return "left-0";
    if (align === "right")  return "right-0";
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-[#101b19]/98 shadow-[0_16px_38px_rgba(8,20,18,0.24)] backdrop-blur-md"
            : "border-b border-white/10 bg-[#101b19]"
        }`}
      >
        {/* Top info bar */}
        <div className="hidden bg-[#08110f] text-xs text-[#c7d0cb] md:block">
          <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between py-1.5">
            <div className="flex items-center gap-5">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                {COMPANY.phone}
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="w-3 h-3" />
                {COMPANY.email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              {COMPANY.certifications.slice(0, 5).map((cert) => (
                <span key={cert} className="inline-flex items-center gap-1 text-[9px] font-bold text-[#9faea8]">
                  <CheckCircle2 className="h-3 w-3 text-[#d6b273]" />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-2 2xl:mr-4" aria-label="Zhi Xin Paper - Home">
            <Image
              src="/images/logo.png"
              alt="Zhi Xin Paper"
              width={40}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="whitespace-nowrap text-base font-bold text-white">ZhixinPaper</span>
              <span className="whitespace-nowrap text-[10px] font-semibold text-[#d6b273] opacity-90">Thermal Solutions Since 2008</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LABELS.map((label) => {
              const href = navHref[label];
              const hasDrop = hasDropdown(label);
              const active = label === "Home"
                ? pathname === "/"
                : isActive(href) || (label === "Export" && (pathname.startsWith("/eu") || pathname.startsWith("/us") || pathname.startsWith("/ca")));

              return (
                <div
                  key={label}
                  className="relative"
                  onMouseEnter={() => hasDrop && openMenu(label)}
                  onMouseLeave={closeMenu}
                >
                  <Link
                    href={href}
                    aria-haspopup={hasDrop ? "true" : undefined}
                    aria-expanded={hasDrop && activeMenu === label ? "true" : undefined}
                    onFocus={() => hasDrop && openMenu(label)}
                    className={`flex items-center gap-1.5 px-2 py-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform]  2xl:px-3 ${
                      active
                        ? "bg-white/10 text-[#d6b273]"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                    {hasDrop && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeMenu === label ? "rotate-180 text-[#d6b273]" : "text-white/60"
                        }`}
                      />
                    )}
                  </Link>

                  {/* Dropdown with bridge padding to prevent gap-triggered close */}
                  {hasDrop && activeMenu === label && (
                    <div
                      className={`absolute top-full pt-2 ${getAlignClass(label)}`}
                      onMouseEnter={() => openMenu(label)}
                      onMouseLeave={closeMenu}
                    >
                      {renderDropdown(label)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop CTAs */}
            <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Link
              href="/samples"
              className="border border-white/20 px-3 py-2 text-sm font-semibold text-white/82 transition-[background-color,border-color,color,box-shadow,transform] hover:-translate-y-0.5 hover:border-white/40 hover:text-white active:translate-y-px 2xl:px-4"
            >
              Request Samples
            </Link>
            <Link
              href="/quote"
              className="flex items-center gap-1.5 bg-[#9c661d] px-4 py-2 text-sm font-bold text-white shadow-[0_12px_28px_rgba(185,130,47,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px 2xl:px-5"
            >
              Request a Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="p-2 text-white transition-colors hover:bg-white/10 xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            type="button"
          >
            {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div id="mobile-navigation" className="absolute left-0 right-0 top-[72px] max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain border-b border-[#ded6c8] bg-[#fbfaf6] shadow-[0_28px_70px_rgba(20,33,31,0.18)]">
            <div className="p-4 space-y-1">
              {NAV_LABELS.map((label) => {
                const href = navHref[label];
                const items = MOBILE_ITEMS[label];
                const hasDrop = items.length > 0;

                return (
                  <div key={label}>
                    {hasDrop ? (
                      <>
                        <button
                          className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-[#14211f] transition-colors hover:bg-white hover:text-[#0f5f5c]"
                          onClick={() => setMobileExpanded(mobileExpanded === label ? null : label)}
                          aria-expanded={mobileExpanded === label}
                          aria-controls={`mobile-submenu-${label.toLowerCase()}`}
                          type="button"
                        >
                          <span>{label}</span>
                          <ChevronDown
                            aria-hidden="true"
                            className={`w-4 h-4 transition-transform text-slate-400 ${
                              mobileExpanded === label ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileExpanded === label && (
                          <div id={`mobile-submenu-${label.toLowerCase()}`} className="ml-4 mt-1 space-y-0.5 pb-2">
                            {label === "Products" && (
                              <div className="mb-3 overflow-hidden border border-[#c8bcaa] bg-white shadow-[0_14px_34px_rgba(20,33,31,0.10)]">
                                <div className="bg-[#101b19] px-4 py-3 text-white">
                                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d6b273]">Product navigator</p>
                                  <p className="mt-1 text-sm font-bold">Choose rolls, labels, or send an RFQ.</p>
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-[#ded6c8] border-b border-[#ded6c8]">
                                  <Link
                                    href="/products/thermal-paper-rolls"
                                    onClick={() => setMobileOpen(false)}
                                    className="p-3 text-[#14211f]"
                                  >
                                    <Package className="mb-2 h-4 w-4 text-[#0f5f5c]" />
                                    <span className="block text-xs font-bold">Thermal rolls</span>
                                    <span className="mt-1 block text-[11px] leading-4 text-[#687772]">POS, ATM, tickets</span>
                                  </Link>
                                  <Link
                                    href="/products/thermal-labels"
                                    onClick={() => setMobileOpen(false)}
                                    className="p-3 text-[#14211f]"
                                  >
                                    <Tag className="mb-2 h-4 w-4 text-[#9f6e25]" />
                                    <span className="block text-xs font-bold">Thermal labels</span>
                                    <span className="mt-1 block text-[11px] leading-4 text-[#687772]">Shipping, barcode</span>
                                  </Link>
                                </div>
                                <Link
                                  href="/quote"
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-between bg-[#f4f0e8] px-4 py-3 text-xs font-bold text-[#0f5f5c]"
                                >
                                  Send product specs for quote
                                  <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                              </div>
                            )}
                            {items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between px-4 py-2.5  text-sm transition-colors ${
                                  item.label.endsWith("›")
                                    ? "text-[#87918c] font-bold text-xs hover:text-[#0f5f5c]"
                                    : "text-[#4f5f5a] hover:text-[#0f5f5c] hover:bg-white"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {!item.label.endsWith("›") && (
                                    <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                                  )}
                                  {item.label}
                                </span>

                              </Link>
                            ))}
                            <Link
                              href={href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#0f5f5c] hover:underline"
                            >
                              View all {label} <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-[#14211f] transition-colors hover:bg-white hover:text-[#0f5f5c]"
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Mobile secondary CTA — primary "Request a Quote" lives in the sticky bar below */}
              <div className="border-t border-[#ded6c8] pt-4">
                <Link
                  href="/samples"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full border border-[#c8bcaa] py-3 text-center text-sm font-semibold text-[#0f5f5c] transition-colors hover:bg-white"
                >
                  Request Samples
                </Link>
              </div>
              {/* Sticky bottom CTA — stays visible while the menu scrolls */}
              <div className="sticky bottom-0 mt-2 border-t border-[#ded6c8] bg-[#fbfaf6] pb-3 pt-2">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full bg-[#9c661d] py-3 text-center text-sm font-bold text-white shadow-[0_12px_28px_rgba(185,130,47,0.22)] transition-colors hover:bg-[#7d4f16]"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
