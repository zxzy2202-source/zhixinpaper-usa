import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "@/lib/data";
import { ArrowRight, Mail, Phone, Send } from "lucide-react";

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
      { label: "OEM & Custom", href: "/oem-custom" },
      { label: "Paper Roll Size Guide", href: "/blog/thermal-paper-roll-sizes-guide" },
    ],
  },
  {
    title: "Capabilities",
    links: [
      { label: "Industries", href: "/industries" },
      { label: "Factory", href: "/factory" },
      { label: "Quality Control", href: "/factory/quality-control" },
      { label: "Compliance", href: "/compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Printer Compatibility Guide", href: "/blog/thermal-paper-printer-compatibility-guide" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Markets & Resources",
    links: [
      { label: "All Export Markets", href: "/markets" },
      { label: "Europe", href: "/eu" },
      { label: "United States", href: "/us" },
      { label: "Canada", href: "/ca" },
      { label: "Mexico", href: "/mx" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
      { label: "Request Samples", href: "/samples" },
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
      <div className="container-site py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(280px,1fr)_minmax(0,1.2fr)]">
          <div className="max-w-xl lg:max-w-md">
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
              Since 2006
                </div>
              </div>
            </Link>

            <p className="text-sm leading-7 text-[#aebbb5]">
              Thermal paper rolls, labels, and private-label supply for distributors and importers.
            </p>

            <div className="mt-5 space-y-3 text-sm text-[#aebbb5]">
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

            <Link
              href="/quote"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-[#9c661d] px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
            >
              <Send className="h-4 w-4" />
              Request a Quote
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-4">
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
            <Link href="/privacy-policy" className="transition-colors hover:text-[#efe7d6]">Privacy</Link>
            <Link href="/cookie-policy" className="transition-colors hover:text-[#efe7d6]">Cookies</Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-[#efe7d6]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
