import Link from "next/link";

const FACTORY_LINKS = [
  { href: "/factory/overview", label: "Overview" },
  { href: "/factory/equipment", label: "Equipment" },
  { href: "/factory/capacity", label: "Capacity" },
  { href: "/factory/quality-control", label: "Quality Control" },
  { href: "/factory/virtual-tour", label: "Virtual Tour" },
] as const;

export default function FactorySubnav({ current }: { current: string }) {
  return (
    <nav aria-label="Factory sections" className="border-b border-slate-200 bg-white">
      <div className="container-site flex gap-1 overflow-x-auto py-2 text-sm">
        {FACTORY_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current === link.href ? "page" : undefined}
            className={`whitespace-nowrap px-3 py-2 transition-colors ${
              current === link.href
                ? "bg-slate-900 font-semibold text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
