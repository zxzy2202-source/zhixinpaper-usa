"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";

const links = [
  ["HOME", "/"],
  ["PRODUCTS CATEGORY", "/products"],
  ["PRODUCT DETAILS", "/products/thermal-paper-rolls"],
  ["ABOUT US", "/about"],
  ["BLOG", "/blog"],
  ["CONTACT US", "/quote"],
] as const;

export default function AboutReferenceHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-[0_4px_20px_rgba(15,27,48,0.06)] backdrop-blur">
      <div className="about-shell flex h-[76px] items-center justify-between gap-8">
        <Link href="/" className="shrink-0" aria-label="Zhixin Paper home">
          <Image src="/images/logo.png" alt="Zhixin Paper" width={154} height={46} className="h-10 w-auto object-contain" priority />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="About navigation">
          {links.map(([label, href]) => <Link key={label} href={href} className={`text-[11px] font-bold tracking-[0.08em] transition hover:text-[#1677ff] ${label === "ABOUT US" ? "text-[#1677ff]" : "text-[#25324a]"}`}>{label}</Link>)}
          <button type="button" aria-label="Search" className="text-[#25324a] transition hover:text-[#1677ff]"><Search className="h-5 w-5" aria-hidden="true" /></button>
        </nav>
        <button type="button" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-[#25324a] lg:hidden" aria-expanded={open} aria-controls="about-mobile-nav" onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />} Menu
        </button>
      </div>
      {open && <nav id="about-mobile-nav" className="border-t border-slate-200 bg-white py-4 lg:hidden" aria-label="Mobile about navigation"><div className="about-shell grid gap-1">{links.map(([label, href]) => <Link key={label} href={href} onClick={() => setOpen(false)} className="border-b border-slate-100 py-3 text-xs font-bold tracking-[0.1em] text-[#25324a] last:border-0">{label}</Link>)}</div></nav>}
    </header>
  );
}
