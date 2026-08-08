import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/cookie-policy");

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Zhixin Paper uses essential browser storage and optional analytics technologies.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-white">
          <div className="container-site max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">Legal</span>
            </div>
            <h1 className="font-bold text-slate-900 text-4xl mb-8">Cookie Policy</h1>
            <div className="space-y-6 text-slate-500 text-sm leading-relaxed">
              <p><strong className="text-slate-900">Last updated:</strong> August 2, 2026</p>
              <p>Zhixin Paper uses essential browser storage and, with your permission, analytics technologies to operate and improve this website.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Essential Storage</h2>
              <p>We store your cookie preference in your browser under the key <code>zhixin-cookie-consent</code>. This is necessary to remember whether you accepted optional analytics and does not require an advertising profile.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Optional Analytics</h2>
              <p>If you select “Accept analytics”, the website loads OKKI analytics. It may process visit information such as pages viewed, referring page, device or browser information, IP-derived network or location information, and interactions used to understand website performance and support sales enquiries. OKKI does not load when you choose “Essential only”.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Your Choice</h2>
              <p>You may decline optional analytics and continue using the website. To change a saved choice, clear this site&apos;s local storage or site data in your browser and reload the page; the preference prompt will appear again.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Retention</h2>
              <p>Your browser keeps the saved preference until you clear it. Analytics retention is governed by our service configuration and applicable provider terms; we review retained data according to business need and legal requirements.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Contact</h2>
              <p>For cookie or privacy questions, contact sales@zhixinpaper.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
