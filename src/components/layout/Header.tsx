"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { COMPANY, THERMAL_PAPER_ROLLS, THERMAL_LABELS, INDUSTRIES, GEO_REGIONS } from "@/lib/data";
import {
  ChevronDown, Menu, X, Phone, Mail, ArrowRight,
  Globe, ShieldCheck, BookOpen, Users,
  Package, Tag, Settings, FileText, MapPin,
  Factory as FactoryIcon, Award, Cpu, BarChart2, Eye,
  Newspaper, Briefcase, HelpCircle, Info, MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tag = "SEO" | "P1" | "New" | "GEO";

interface NavBadgeProps { tag?: Tag }
function NavBadge({ tag }: NavBadgeProps) {
  if (!tag) return null;
  const styles: Record<Tag, string> = {
    SEO: "bg-orange-100 text-orange-600",
    P1:  "bg-blue-100 text-blue-600",
    New: "bg-emerald-100 text-emerald-600",
    GEO: "bg-purple-100 text-purple-600",
  };
  return (
    <span className={`ml-1.5 text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded ${styles[tag]}`}>
      {tag}
    </span>
  );
}

// ─── Products Mega Menu ────────────────────────────────────────────────────────
function ProductsMegaMenu() {
  const pathname = usePathname();
  const rolls = THERMAL_PAPER_ROLLS;
  const labels = THERMAL_LABELS;

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[min(92vw,840px)] lg:w-[840px]">
      <div className="grid grid-cols-2 divide-x divide-slate-100">
        {/* Col 1: Thermal Paper Rolls */}
        <div className="p-5">
          <Link
            href="/products/thermal-paper-rolls"
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 hover:text-blue-600 transition-colors"
          >
            <Package className="w-3.5 h-3.5" />
            Thermal Paper Rolls
          </Link>
          <div className="space-y-0.5">
            {rolls.map((p) => (
              <Link
                key={p.slug}
                href={`/products/thermal-paper-rolls/${p.slug}`}
                className={`flex items-center justify-between px-2.5 py-2.5 rounded-lg text-sm transition-[background-color,border-color,color,box-shadow,transform] group min-h-[40px] ${
                  pathname === `/products/thermal-paper-rolls/${p.slug}`
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                  {p.name}
                </span>

              </Link>
            ))}
          </div>
        </div>

        {/* Col 2: Thermal Labels + OEM CTA */}
        <div className="p-5 flex flex-col">
          <Link
            href="/products/thermal-labels"
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 hover:text-blue-600 transition-colors"
          >
            <Tag className="w-3.5 h-3.5" />
            Thermal Labels
          </Link>
          <div className="space-y-0.5 flex-1">
            {labels.map((l) => (
              <Link
                key={l.slug}
                href={`/products/thermal-labels/${l.slug}`}
                className={`flex items-center justify-between px-2.5 py-2.5 rounded-lg text-sm transition-[background-color,border-color,color,box-shadow,transform] group min-h-[40px] ${
                  pathname === `/products/thermal-labels/${l.slug}`
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                  {l.name}
                </span>

              </Link>
            ))}
          </div>

          {/* OEM & Custom CTA */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">OEM &amp; Custom</div>
            <div className="flex gap-2 mb-2">
              <Link
                href="/oem-custom/private-label"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Settings className="w-3 h-3" />
                Private Label
              </Link>
              <Link
                href="/samples"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:border-blue-300 hover:text-blue-600 transition-[background-color,border-color,color,box-shadow,transform]"
              >
                Free Samples →
              </Link>
            </div>
            <div className="flex gap-2">
              <Link
                href="/oem-custom/moq-guide"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 transition-[background-color,border-color,color,box-shadow,transform]"
              >
                MOQ Guide
              </Link>
              <Link
                href="/oem-custom/sample-process"
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 transition-[background-color,border-color,color,box-shadow,transform]"
              >
                How Sampling Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">BPA-free · ISO 9001 · FSC®</span>
          <Link href="/samples" className="flex items-center gap-1 text-xs font-semibold text-slate-700 border border-slate-200 px-2.5 py-1 rounded hover:border-blue-300 hover:text-blue-600 transition-[background-color,border-color,color,box-shadow,transform]">
            Free Samples
          </Link>
        </div>
        <Link href="/products" className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
          View all products <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ─── Industries Mega Menu ──────────────────────────────────────────────────────
function IndustriesMegaMenu() {
  const pathname = usePathname();

  const highValue = [
    { slug: "lottery-gaming",    name: "Lottery & Gaming",      tag: "SEO" as Tag, icon: "🎰" },
    { slug: "casino",            name: "Casino & Gaming Venues", tag: "SEO" as Tag, icon: "🃏" },
    { slug: "banking-finance",   name: "Banking & Finance",      tag: "SEO" as Tag, icon: "🏦" },
    { slug: "healthcare-pharma", name: "Healthcare & Pharma",    tag: "SEO" as Tag, icon: "🏥" },
  ];

  const volume = [
    { slug: "retail-pos",            name: "Retail & POS",            tag: "P1" as Tag,  icon: "🛒" },
    { slug: "logistics-warehouse",   name: "Logistics & Warehouse",   tag: "P1" as Tag,  icon: "📦" },
    { slug: "food-cold-chain",       name: "Food & Cold Chain",       tag: "New" as Tag, icon: "🌡️" },
    { slug: "transportation",        name: "Transportation",          tag: "New" as Tag, icon: "🚌" },
    { slug: "automotive-industrial", name: "Automotive & Industrial", tag: "New" as Tag, icon: "🔧" },
    { slug: "events-hospitality",    name: "Events & Hospitality",    tag: "New" as Tag, icon: "🎪" },
    { slug: "government-legal",      name: "Government & Legal",      tag: "New" as Tag, icon: "⚖️" },
    { slug: "cannabis-specialty",    name: "Cannabis & Specialty",    tag: "New" as Tag, icon: "🌿" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[min(92vw,620px)] lg:w-[620px]">
      <div className="grid grid-cols-2 divide-x divide-slate-100 p-5">
        {/* High-value verticals */}
        <div className="pr-5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block" />
            High-value verticals
          </div>
          <div className="space-y-0.5">
            {highValue.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/industries/${i.slug}`
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none w-5 text-center">{i.icon}</span>
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Volume verticals */}
        <div className="pl-5">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            Volume verticals
          </div>
          <div className="space-y-0.5">
            {volume.map((i) => (
              <Link
                key={i.slug}
                href={`/industries/${i.slug}`}
                className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/industries/${i.slug}`
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="text-base leading-none w-5 text-center">{i.icon}</span>
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Serving 13+ industries worldwide</span>
          <Link href="/quote" className="flex items-center gap-1 text-xs font-semibold text-white bg-blue-600 px-2.5 py-1 rounded hover:bg-blue-700 transition-[background-color,border-color,color,box-shadow,transform]">
            Get a Quote
          </Link>
        </div>
        <Link href="/industries" className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
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
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[300px]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                pathname === item.href ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
              }`}>
                <Icon className={`w-4 h-4 ${pathname === item.href ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.desc && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <Link href="/factory" className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
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
    { label: "BPA-Free Statement",href: "/compliance/bpa-free",      icon: ShieldCheck, desc: "Phenol-free thermal coating",       tag: "SEO" as Tag },
    { label: "REACH & RoHS",      href: "/compliance/reach-rohs",    icon: ShieldCheck, desc: "EU chemical compliance",            tag: "SEO" as Tag },
    { label: "ISO 9001",          href: "/compliance/iso-9001",      icon: Award,       desc: "Quality management system" },
    { label: "FSC® Paper",        href: "/compliance/fsc-paper",     icon: BookOpen,    desc: "Sustainable forest sourcing" },
    { label: "EU Food Contact",   href: "/compliance/eu-food-contact",icon: ShieldCheck, desc: "Regulation (EC) No 1935/2004",     tag: "New" as Tag },
    { label: "FDA Compliant (US)",href: "/compliance/fda-us",        icon: ShieldCheck, desc: "US food contact compliance",        tag: "New" as Tag },
  ];
  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[320px]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                pathname === item.href ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
              }`}>
                <Icon className={`w-4 h-4 ${pathname === item.href ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.desc && <div className="text-xs text-slate-400 mt-0.5">{item.desc}</div>}
              </div>
            </Link>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <Link href="/compliance" className="flex items-center gap-1 text-xs text-blue-600 font-semibold hover:underline">
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
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[300px]">
      <div className="p-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                pathname === item.href || pathname.startsWith(item.href + "/") ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
              }`}>
                <Icon className={`w-4.5 h-4.5 ${
                  pathname === item.href || pathname.startsWith(item.href + "/") ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold">{item.label}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5 leading-snug">{item.desc}</div>
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
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[280px]">
      <div className="p-2">
        <Link
          href="/about"
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
            pathname === "/about" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            pathname === "/about" ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
          }`}>
            <Info className={`w-4 h-4 ${pathname === "/about" ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}`} />
          </div>
          <div>
            <div className="font-semibold">About Us</div>
            <div className="text-xs text-slate-400 mt-0.5">Our story, team & mission</div>
          </div>
        </Link>

        <Link
          href="/contact"
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-[background-color,border-color,color,box-shadow,transform] group ${
            pathname === "/contact" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
          }`}
        >
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
            pathname === "/contact" ? "bg-blue-100" : "bg-slate-100 group-hover:bg-blue-100"
          }`}>
            <MessageSquare className={`w-4 h-4 ${pathname === "/contact" ? "text-blue-600" : "text-slate-500 group-hover:text-blue-600"}`} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold">Contact</span>
            </div>
            <div className="text-xs text-slate-400 mt-0.5">Get in touch with our team</div>
          </div>
        </Link>
      </div>

      {/* Contact info card */}
      <div className="mx-3 mb-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Contact</div>
        <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors mb-1.5">
          <Mail className="w-3.5 h-3.5 text-slate-400" />
          {COMPANY.email}
        </a>
        <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 transition-colors">
          <Phone className="w-3.5 h-3.5 text-slate-400" />
          {COMPANY.phone}
        </a>
      </div>
    </div>
  );
}

// ─── Markets GEO Dropdown ──────────────────────────────────────────────────────
function MarketsDropdown() {
  const pathname = usePathname();
  const eu = GEO_REGIONS.find(r => r.slug === "eu");

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden w-[340px]">
      <div className="p-4">
        {/* Europe */}
        <div className="mb-3">
          <Link
            href="/eu"
            className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 hover:text-blue-600 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Europe (EU)

          </Link>
          <div className="pl-2 space-y-0.5">
            {eu?.countries?.map((c) => (
              <Link
                key={c.slug}
                href={`/eu/${c.slug}`}
                className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-[background-color,border-color,color,box-shadow,transform] ${
                  pathname === `/eu/${c.slug}`
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="text-base leading-none">{c.flag}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        {/* US & Canada */}
        <div className="pt-3 border-t border-slate-100 space-y-0.5">
          <Link
            href="/us"
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] ${
              pathname.startsWith("/us")
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-base leading-none">🇺🇸</span>
            United States (US)

          </Link>
          <Link
            href="/ca"
            className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-[background-color,border-color,color,box-shadow,transform] ${
              pathname.startsWith("/ca")
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span className="text-base leading-none">🇨🇦</span>
            Canada (CA)

          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Nav config ───────────────────────────────────────────────────────────────
// Top-level nav labels
const NAV_LABELS = ["Home", "Products", "Industries", "Factory", "Compliance", "Resources", "About", "Markets"] as const;
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
  Markets:    "right",
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
    { label: "BPA-Free Statement",    href: "/compliance/bpa-free",       tag: "SEO" },
    { label: "REACH & RoHS",          href: "/compliance/reach-rohs",     tag: "SEO" },
    { label: "ISO 9001",              href: "/compliance/iso-9001" },
    { label: "FSC® Paper",            href: "/compliance/fsc-paper" },
    { label: "EU Food Contact",       href: "/compliance/eu-food-contact",tag: "New" },
    { label: "FDA Compliant (US)",    href: "/compliance/fda-us",         tag: "New" },
  ],
  Resources: [
    { label: "Blog",         href: "/blog" },
    { label: "Case Studies", href: "/case-studies", tag: "New" },
    { label: "FAQ",          href: "/faq",           tag: "SEO" },
  ],
  About: [
    { label: "About Us", href: "/about" },
    { label: "Contact",  href: "/contact", tag: "P1" },
  ],
  Markets: [
    { label: "🇪🇺 Europe (EU)",        href: "/eu" },
    { label: "🇺🇸 United States (US)", href: "/us" },
    { label: "🇨🇦 Canada (CA)",        href: "/ca" },
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
    Markets:    "/eu",
  };

  const renderDropdown = (label: NavLabel) => {
    switch (label) {
      case "Products":    return <ProductsMegaMenu />;
      case "Industries":  return <IndustriesMegaMenu />;
      case "Factory":     return <FactoryDropdown />;
      case "Compliance":  return <ComplianceDropdown />;
      case "Resources":   return <ResourcesDropdown />;
      case "About":       return <AboutDropdown />;
      case "Markets":     return <MarketsDropdown />;
      default:            return null;
    }
  };

  // Compute dropdown position class based on alignment
  const getAlignClass = (label: NavLabel) => {
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
            ? "bg-[#0F2B5B]/98 backdrop-blur-md shadow-sm border-b border-[#1a3a6e]"
            : "bg-[#0F2B5B] border-b border-[#1a3a6e]"
        }`}
      >
        {/* Top info bar */}
        <div className="bg-[#0a1f44] text-slate-300 text-xs hidden md:block">
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
                <span key={cert} className="text-[9px] tracking-widest uppercase text-slate-400 font-bold">
                  ✓ {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 mr-4" aria-label="Zhi Xin Paper - Home">
            <Image
              src="/images/logo.png"
              alt="Zhi Xin Paper"
              width={40}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
            <div className="flex flex-col leading-tight">
              <span className="text-white font-bold text-base tracking-wide whitespace-nowrap">ZhixinPaper</span>
              <span className="text-amber-300 text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap opacity-90">Thermal Solutions Since 2008</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LABELS.map((label) => {
              const href = navHref[label];
              const hasDrop = hasDropdown(label);
              const active = label === "Home"
                ? pathname === "/"
                : isActive(href) || (label === "Markets" && (pathname.startsWith("/eu") || pathname.startsWith("/us") || pathname.startsWith("/ca")));

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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] ${
                      active
                        ? "text-amber-400 bg-white/10"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {label}
                    {hasDrop && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeMenu === label ? "rotate-180 text-amber-400" : "text-white/60"
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
              className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white border border-white/20 rounded-lg hover:border-white/40 transition-[background-color,border-color,color,box-shadow,transform]"
            >
              Free Samples
            </Link>
            <Link
              href="/quote"
              className="flex items-center gap-1.5 px-5 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
            >
              Get a Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="xl:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
          <div id="mobile-navigation" className="absolute top-[72px] left-0 right-0 bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100vh-72px)] overflow-y-auto overscroll-contain">
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
                          className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
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
                          <div id={`mobile-submenu-${label.toLowerCase()}`} className="ml-4 mt-1 pb-2 space-y-0.5">
                            {items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-colors ${
                                  item.label.endsWith("›")
                                    ? "text-slate-500 font-bold text-xs uppercase tracking-wider hover:text-blue-600"
                                    : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
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
                              className="flex items-center gap-1.5 px-4 py-2 text-xs text-blue-600 font-semibold hover:underline"
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
                        className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </div>
                );
              })}

              {/* Mobile CTAs */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <Link
                  href="/samples"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 border border-blue-200 text-blue-600 font-semibold rounded-xl text-sm hover:bg-blue-50 transition-colors"
                >
                  Request Free Samples
                </Link>
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors"
                >
                  Get a Quote →
                </Link>
              </div>
              {/* Sticky bottom CTA for long scroll */}
              <div className="sticky bottom-0 bg-white pt-2 pb-3 border-t border-slate-100 mt-2">
                <Link
                  href="/quote"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Get a Quote →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
