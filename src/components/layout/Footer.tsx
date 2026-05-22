import Link from "next/link";
import { COMPANY, COMPLIANCE_ITEMS } from "@/lib/data";
import { Phone, Mail, MapPin, ArrowRight, ShieldCheck, FileCheck, Award, Leaf, UtensilsCrossed, Shield, Package } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-3.5 h-3.5" />,
  FileCheck: <FileCheck className="w-3.5 h-3.5" />,
  Award: <Award className="w-3.5 h-3.5" />,
  Leaf: <Leaf className="w-3.5 h-3.5" />,
  UtensilsCrossed: <UtensilsCrossed className="w-3.5 h-3.5" />,
  Shield: <Shield className="w-3.5 h-3.5" />,
};

const FooterLinks = ({ links }: { links: { label: string; href: string }[] }) => (
  <ul className="space-y-2.5">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1.5 group"
        >
          <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Compliance strip */}
      <div className="border-b border-slate-700/50 py-4">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {COMPLIANCE_ITEMS.map((item) => (
              <Link
                key={item.slug}
                href={`/compliance/${item.slug}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 text-slate-400 text-[11px] font-semibold tracking-widest uppercase hover:border-blue-500 hover:text-blue-400 transition-all bg-slate-800/50"
              >
                {ICONS[item.icon]}
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-site py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-blue-500 transition-colors">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-lg leading-none">Zhixin Paper</div>
                <div className="text-blue-400 text-[9px] tracking-[0.25em] uppercase font-semibold mt-0.5">Thermal Paper</div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Professional thermal paper rolls and labels manufacturer. Serving distributors and importers in Europe, USA & Canada. ISO 9001 certified since {COMPANY.founded}.
            </p>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400/70" />
                <span>{COMPANY.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0 text-blue-400/70" />
                <a href={`tel:${COMPANY.phone}`} className="hover:text-blue-400 transition-colors">
                  {COMPANY.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0 text-blue-400/70" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-blue-400 transition-colors">
                  {COMPANY.email}
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Products</h4>
            <FooterLinks links={[
              { label: "Thermal Paper Rolls",  href: "/products/thermal-paper-rolls" },
              { label: "Thermal Labels",        href: "/products/thermal-labels" },
              { label: "Standard POS Rolls",    href: "/products/thermal-paper-rolls/standard-pos-rolls" },
              { label: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels" },
              { label: "Custom Printed Rolls",  href: "/products/thermal-paper-rolls/custom-printed-rolls" },
              { label: "OEM / Private Label",   href: "/oem-custom" },
              { label: "Free Samples",          href: "/samples" },
            ]} />
          </div>

          {/* Industries + Markets */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Industries</h4>
            <FooterLinks links={[
              { label: "Retail & POS",         href: "/industries/retail-pos" },
              { label: "Lottery & Gaming",      href: "/industries/lottery-gaming" },
              { label: "Healthcare & Pharma",   href: "/industries/healthcare-pharma" },
              { label: "Food & Cold Chain",     href: "/industries/food-cold-chain" },
              { label: "Logistics & Warehouse", href: "/industries/logistics-warehouse" },
              { label: "Cannabis & Specialty",  href: "/industries/cannabis-specialty" },
              { label: "All Industries",        href: "/industries" },
            ]} />

            <h4 className="font-bold text-white text-sm uppercase tracking-widest mt-7 mb-3">Markets</h4>
            <FooterLinks links={[
              { label: "🇪🇺 Europe (EU)",  href: "/eu" },
              { label: "🇺🇸 United States", href: "/us" },
              { label: "🇨🇦 Canada",        href: "/ca" },
            ]} />

            <h4 className="font-bold text-white text-sm uppercase tracking-widest mt-7 mb-3">Regional Compliance</h4>
            <FooterLinks links={[
              { label: "🇺🇸 FDA Compliant (US)",     href: "/us/fda-compliant" },
              { label: "🇺🇸 Cannabis Labels (US)",   href: "/us/cannabis-labels" },
              { label: "🇨🇦 Cannabis Labels (CA)",   href: "/ca/cannabis-labels" },
              { label: "🇪🇺 EU Food Contact",        href: "/compliance/eu-food-contact" },
            ]} />
          </div>

          {/* Company + Resources */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">Company</h4>
            <FooterLinks links={[
              { label: "About Us",       href: "/about" },
              { label: "Factory",        href: "/factory" },
              { label: "Compliance",     href: "/compliance" },
              { label: "Contact",        href: "/contact" },
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Cookie Policy",  href: "/cookie-policy" },
            ]} />

            <h4 className="font-bold text-white text-sm uppercase tracking-widest mt-7 mb-3">Resources</h4>
            <FooterLinks links={[
              { label: "Blog",         href: "/blog" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "FAQ",          href: "/faq" },
            ]} />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-700/50 py-4 pb-24 md:pb-4">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} Zhixin Paper. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/eu" className="hover:text-slate-300 transition-colors">🇪🇺 Europe</Link>
            <Link href="/us" className="hover:text-slate-300 transition-colors">🇺🇸 USA</Link>
            <Link href="/ca" className="hover:text-slate-300 transition-colors">🇨🇦 Canada</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
