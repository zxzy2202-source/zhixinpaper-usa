import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import { COMPANY, COMPLIANCE_ITEMS } from "@/lib/data";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Thermal Paper Manufacturer Since 2008",
  description:
    "Zhixin Paper is an ISO 9001:2015 certified thermal paper manufacturer since 2008. Serving distributors in Europe, USA, and Canada with premium thermal paper rolls and labels.",
  keywords: ["Zhixin Paper manufacturer", "thermal paper company China", "thermal paper manufacturer since 2008", "ISO 9001 thermal paper factory"],
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">About Us</span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              About Zhixin Paper
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              ISO 9001:2015 certified thermal paper manufacturer since {COMPANY.founded}. Serving distributors, importers, and factories in Europe, USA, and Canada with premium thermal consumables.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20">
              <div>
                <SectionHeader label="Our Story" title="15+ Years of Thermal Excellence" subtitle="Founded in 2008, Zhixin Paper has grown from a regional manufacturer to a global supplier serving 80+ countries." />
                <div className="mt-8 space-y-4">
                  {[
                    "ISO 9001:2015 certified manufacturing facility in Xi'an, Shaanxi, China",
                    "500M+ thermal paper rolls produced annually",
                    "Serving 80+ countries across Europe, Americas, and Asia-Pacific",
                    "Full BPA-free product range for EU and US market compliance",
                    "Custom OEM and private label capabilities for distributors",
                    "Dedicated technical support for compliance documentation",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-slate-500 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SlotImage slotKey="about.banner" width={640} height={480} className="w-full object-cover rounded-2xl shadow-xl" />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {COMPANY.stats.map((stat) => (
                <div key={stat.label} className="bg-white border border-slate-200 p-6 text-center rounded-xl hover:shadow-md transition-shadow">
                  <div className="font-bold text-blue-600 text-4xl mb-2">{stat.value}</div>
                  <div className="text-xs tracking-widest uppercase text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <SectionHeader label="Certifications" title="Our Compliance Credentials" className="mb-10" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {COMPLIANCE_ITEMS.map((item) => (
                <Link key={item.slug} href={`/compliance/${item.slug}`} className="rounded-xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all p-5 group">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
      </Link>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
