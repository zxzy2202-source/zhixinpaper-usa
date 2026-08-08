import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";

const PAGE_URL = canonicalUrl("/privacy-policy");

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Zhixin Paper collects, uses, shares, and protects personal data submitted through this website.",
  alternates: {
    canonical: PAGE_URL,
    languages: {
      en: PAGE_URL,
      "x-default": PAGE_URL,
    },
  },
};

export default function PrivacyPolicyPage() {
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
            <h1 className="font-bold text-slate-900 text-4xl mb-8">Privacy Policy</h1>
            <div className="prose-industrial space-y-6 text-slate-500 text-sm leading-relaxed">
              <p><strong className="text-slate-900">Last updated:</strong> August 2, 2026</p>
              <p>Zhixin Paper (referred to as “we”, “us”, or “our”) uses personal data to respond to business enquiries, prepare quotations, assess sample requests, operate this website, and protect the reliability of our services.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Information We Collect</h2>
              <p>When you submit a contact, quotation, or sample form, we may collect your name, company, email address, phone number, country, shipping address, product requirements, message, and related project details. Our server may also record your IP address and technical request information for delivery diagnostics, security, and abuse prevention.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">How We Use Your Information</h2>
              <p>We use this information to record and route enquiries, communicate with you, assess product and documentation requirements, prepare quotations, review sample eligibility and logistics, maintain service security, and improve our website when you consent to analytics. We do not sell personal information.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Service Providers and Recipients</h2>
              <p>Enquiry details may be processed by our database, email delivery providers, internal sales notification channels, and OKKI customer relationship or analytics services. These providers process data on our behalf or as necessary to deliver the requested service. Data may be processed in countries outside your own, subject to the safeguards available for the relevant provider and transfer.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Cookies and Analytics</h2>
              <p>We store your cookie preference in your browser. OKKI analytics loads only after you select “Accept analytics”. You may decline analytics and continue using the website. See our Cookie Policy for more information.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Retention and Security</h2>
              <p>We retain enquiry records only for as long as reasonably needed to handle the request, maintain business records, resolve disputes, meet legal obligations, and prevent abuse. Retention periods may vary by project and applicable law. We use reasonable technical and organizational safeguards, but no internet transmission or storage system is completely secure.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Your Rights</h2>
              <p>Depending on your location, you may have rights to request access, correction, deletion, restriction, objection, portability, or withdrawal of consent. These rights may be subject to legal exceptions. To make a request, contact sales@zhixinpaper.com and identify the enquiry or email address concerned.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Contact</h2>
              <p>For privacy questions or requests, contact sales@zhixinpaper.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
