import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { canonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Zhixin Paper privacy policy. How we collect, use, and protect your personal data. GDPR compliant.",
  alternates: { canonical: canonicalUrl("/privacy-policy") },
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
              <p><strong className="text-slate-900">Last updated:</strong> January 2025</p>
              <p>Zhixin Paper ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you fill out a contact form, request a quote, or request samples. This may include your name, company name, email address, phone number, and shipping address.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">How We Use Your Information</h2>
              <p>We use the information we collect to respond to your inquiries, process quote requests, send product samples, and provide customer support. We do not sell your personal information to third parties.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">GDPR Rights</h2>
              <p>If you are located in the European Union, you have certain rights under the General Data Protection Regulation (GDPR), including the right to access, correct, or delete your personal data. To exercise these rights, please contact us at sales@zhixinpaper.com.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Contact</h2>
              <p>For privacy-related inquiries, contact us at sales@zhixinpaper.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
