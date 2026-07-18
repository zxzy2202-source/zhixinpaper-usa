import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { COMPANY, COMPLIANCE_ITEMS } from "@/lib/data";
import {
  ArrowRight,
  Award,
  FileCheck,
  Globe2,
  Leaf,
  Mail,
  MapPin,
  Package,
  Phone,
  Send,
  Shield,
  ShieldCheck,
  UtensilsCrossed,
} from "lucide-react";

const ICONS: Record<string, ReactNode> = {
  ShieldCheck: <ShieldCheck className="h-3.5 w-3.5" />,
  FileCheck: <FileCheck className="h-3.5 w-3.5" />,
  Award: <Award className="h-3.5 w-3.5" />,
  Leaf: <Leaf className="h-3.5 w-3.5" />,
  UtensilsCrossed: <UtensilsCrossed className="h-3.5 w-3.5" />,
  Shield: <Shield className="h-3.5 w-3.5" />,
};

type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Products",
    links: [
      { label: "Thermal Paper Rolls", href: "/products/thermal-paper-rolls" },
      { label: "Thermal Labels", href: "/products/thermal-labels" },
      { label: "Standard POS Rolls", href: "/products/thermal-paper-rolls/standard-pos-rolls" },
      { label: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels" },
      { label: "Custom Printed Rolls", href: "/products/thermal-paper-rolls/custom-printed-rolls" },
      { label: "OEM / Private Label", href: "/oem-custom" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Retail & POS", href: "/industries/retail-pos" },
      { label: "Lottery & Gaming", href: "/industries/lottery-gaming" },
      { label: "Healthcare & Pharma", href: "/industries/healthcare-pharma" },
      { label: "Food & Cold Chain", href: "/industries/food-cold-chain" },
      { label: "Logistics & Warehouse", href: "/industries/logistics-warehouse" },
      { label: "Cannabis & Specialty", href: "/industries/cannabis-specialty" },
    ],
  },
  {
    title: "Compliance Routes",
    links: [
      { label: "REACH / RoHS Route", href: "/eu" },
      { label: "FDA / Prop 65 Route", href: "/us" },
      { label: "Bilingual Document Route", href: "/ca" },
      { label: "FDA Documents", href: "/us/fda-compliant" },
      { label: "Food Contact Files", href: "/compliance/eu-food-contact" },
      { label: "Specialty Labels", href: "/us/cannabis-labels" },
    ],
  },
  {
    title: "Factory",
    links: [
      { label: "Factory Overview", href: "/factory" },
      { label: "Quality Control", href: "/factory/quality-control" },
      { label: "Production Capacity", href: "/factory/capacity" },
      { label: "Equipment", href: "/factory/equipment" },
      { label: "Certificates", href: "/compliance/certificates" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Request Samples", href: "/samples" },
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "FAQ", href: "/faq" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
];

const FooterLinks = ({ links }: { links: FooterLink[] }) => (
  <ul className="space-y-2.5">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="group flex min-h-6 items-center gap-2 text-sm leading-6 text-slate-400 transition-colors hover:text-white"
        >
          <ArrowRight className="h-3 w-3 shrink-0 text-[#d6b273] opacity-50 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          <span>{link.label}</span>
        </Link>
      </li>
    ))}
  </ul>
);

const FooterSection = ({ title, links }: FooterSection) => (
  <div>
    <h4 className="mb-4 text-xs font-bold text-[#efe7d6]">
      {title}
    </h4>
    <FooterLinks links={links} />
  </div>
);

export default function Footer() {
  return (
    <footer className="paper-noise bg-[#101b19] text-[#c7d0cb]">
      <div className="border-b border-white/10 bg-[#08110f]/70">
        <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold text-[#d6b273]">
              Certified thermal paper supplier
            </p>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#aebbb5]">
              ISO-managed production, BPA-free materials, and export-ready documentation for distributors and importers.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {COMPLIANCE_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/compliance/${item.slug}`}
                className="inline-flex items-center gap-1.5 border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[11px] font-semibold text-[#c7d0cb] transition-colors hover:border-[#d6b273]/40 hover:text-white"
              >
                {ICONS[item.icon]}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container-site py-12 lg:py-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.8fr)]">
          <div className="max-w-xl lg:max-w-sm">
            <Link href="/" className="group mb-5 inline-flex items-center gap-2.5" aria-label="Zhi Xin Paper - Home">
              <Image
                src="/images/logo.png"
                alt="Zhi Xin Paper"
                width={40}
                height={40}
                className="h-10 w-auto object-contain"
              />
              <div>
                <div className="text-base font-bold leading-none text-white">ZhixinPaper</div>
                <div className="mt-1 text-[10px] font-semibold text-[#d6b273] opacity-90">
                  Thermal Solutions Since 2008
                </div>
              </div>
            </Link>

            <p className="text-sm leading-7 text-[#aebbb5]">
              Manufacturer of thermal paper rolls and thermal labels for distributors, importers, and private-label buyers. ISO 9001 certified since {COMPANY.founded}.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#aebbb5]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#d6b273]" />
                <span className="leading-6">{COMPANY.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-[#d6b273]" />
                <a href={`tel:${COMPANY.phone}`} className="transition-colors hover:text-white">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-[#d6b273]" />
                <a href={`mailto:${COMPANY.email}`} className="transition-colors hover:text-white">
                  {COMPANY.email}
                </a>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <Link
                href="/quote"
                className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-4 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
              >
                <Send className="h-4 w-4" />
                Request a Quote
              </Link>
              <Link
                href="/samples"
                className="inline-flex min-h-11 items-center justify-center gap-2 border border-white/14 px-4 py-2.5 text-sm font-semibold text-[#efe7d6] transition duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.06] active:translate-y-px"
              >
                <Package className="h-4 w-4" />
                Request Samples
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
            {FOOTER_SECTIONS.map((section) => (
              <FooterSection key={section.title} {...section} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-4 py-5 pb-24 text-xs text-[#7f8c86] md:flex-row md:items-center md:justify-between md:pb-5">
          <span>© {new Date().getFullYear()} Zhixin Paper. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/eu" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#efe7d6]">
              <Globe2 className="h-3.5 w-3.5" />
              REACH Route
            </Link>
            <Link href="/us" className="transition-colors hover:text-[#efe7d6]">FDA Route</Link>
            <Link href="/ca" className="transition-colors hover:text-[#efe7d6]">Bilingual Docs</Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-[#efe7d6]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
