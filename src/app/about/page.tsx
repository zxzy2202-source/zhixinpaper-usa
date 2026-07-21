import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CTABanner from "@/components/ui/CTABanner";
import SectionHeader from "@/components/ui/SectionHeader";
import SlotImage from "@/components/ui/SlotImage";
import { COMPANY, COMPLIANCE_ITEMS } from "@/lib/data";
import { buildMetadata, organizationSchema, breadcrumbSchema } from "@/lib/seo";
import {
  History, Users, Factory, Target, Award, ShieldCheck,
  CheckCircle2, ArrowRight, Globe, Zap, Users2, Trophy,
} from "lucide-react";

export const metadata: Metadata = buildMetadata({
  title: "About Our Thermal Paper Factory",
  description:
    "Learn about Zhixin Paper's thermal paper roll and label manufacturing, product scope, quality controls, export support, and document routes for distributors.",
  path: "/about",
});

export default function AboutPage() {
  const jsonLd = [
    organizationSchema(),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];

  return (
    <>
      <Header />
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <main className="pt-[88px]">
        {/* Hero Section */}
        <section className="py-20 bg-slate-50 border-b border-slate-200">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeader
                  as="h1"
                  label="Our Story"
                  title="A Legacy of Precision in Thermal Manufacturing"
                  subtitle={"Founded in " + COMPANY.founded + ", Zhixin Paper has grown from a local coating facility to a global leader in thermal paper consumables."}
                />
                <div className="mt-8 space-y-4 text-slate-600 leading-relaxed">
                  <p>
                    With over 15 years of industry expertise, we specialize in the complete production cycle of thermal paper—from advanced chemical coating to high-speed slitting and custom OEM printing.
                  </p>
                  <p>
                    Our ISO 9001:2015 certified facility in China operates 24/7 to ensure a stable, large-scale supply for our partners in the USA, Canada, and Europe. We understand that in the B2B world, reliability is as important as quality.
                  </p>
                </div>
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {COMPANY.stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-extrabold text-blue-600">{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SlotImage slotKey="about.banner" width={640} height={480} className="w-full object-cover  shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-white">
          <div className="container-site">
            <SectionHeader
              label="Our Values"
              title="What Drives Us Forward"
              subtitle="Our commitment to excellence is built on four core pillars that define every roll of paper we produce."
              className="mb-14"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: <ShieldCheck className="w-6 h-6" />, title: "Quality First", desc: "Rigorous ISO 9001 quality control at every stage, from coating thickness to slitting precision." },
                { icon: <Target className="w-6 h-6" />, title: "Global Compliance", desc: "Proactive testing for REACH, RoHS, FDA, and Prop 65 to ensure frictionless market entry." },
                { icon: <Users2 className="w-6 h-6" />, title: "Partner Centric", desc: "Dedicated support for importers and distributors with custom OEM and stable pallet pricing." },
                { icon: <Zap className="w-6 h-6" />, title: "Agile Production", desc: "Fast 15-day standard lead times and efficient logistics handling for US/EU/CA markets." },
              ].map((val, i) => (
                <div key={i} className="p-8  bg-slate-50 border border-slate-200 hover:border-blue-300 hover:shadow-xl transition-all group">
                  <div className="w-12 h-12 bg-blue-600  flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                    {val.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-3">{val.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline/Milestones */}
        <section className="py-24 bg-slate-50">
          <div className="container-site">
            <div className="max-w-4xl mx-auto">
              <SectionHeader
                label="Milestones"
                title="A Journey of Growth"
                subtitle="From a small coating workshop to an international manufacturing powerhouse."
                className="text-center mb-16"
              />
              <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                {[
                  { year: "2009", title: "Inception", desc: "Established our first thermal coating facility with a focus on local retail markets." },
                  { year: "2014", title: "ISO Certification", desc: "Achieved ISO 9001:2015 certification and expanded into high-speed slitting technology." },
                  { year: "2018", title: "International Expansion", desc: "Launched dedicated export division for the USA and European markets." },
                  { year: "2023", title: "Next-Gen Facility", desc: "Expanded automated BPA-free coating and converting capacity for international distribution." },
                ].map((m, i) => (
                  <div key={i} className={"relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group " + (i % 2 === 0 ? "is-active" : "")}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                      <History className="w-5 h-5" />
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6  bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-black text-blue-600 text-xl tracking-tight">{m.year}</div>
                      </div>
                      <div className="font-bold text-slate-900 mb-2">{m.title}</div>
                      <div className="text-slate-500 text-sm leading-relaxed">{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
