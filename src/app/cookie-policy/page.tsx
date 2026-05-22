import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Zhixin Paper cookie policy. How we use cookies on our website. GDPR compliant.",
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
              <p><strong className="text-slate-900">Last updated:</strong> January 2025</p>
              <p>Zhixin Paper uses cookies and similar tracking technologies to improve your browsing experience on our website.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">What Are Cookies</h2>
              <p>Cookies are small text files stored on your device when you visit a website. They help us remember your preferences and understand how you use our site.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Types of Cookies We Use</h2>
              <p><strong className="text-slate-900">Essential cookies:</strong> Required for the website to function properly. These cannot be disabled.</p>
              <p><strong className="text-slate-900">Analytics cookies:</strong> Help us understand how visitors interact with our website. We use anonymized data only.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Managing Cookies</h2>
              <p>You can control and delete cookies through your browser settings. Note that disabling cookies may affect website functionality.</p>
              <h2 className="font-bold text-slate-900 text-xl mt-8">Contact</h2>
              <p>For cookie-related inquiries, contact us at Sales@zxpapers.com.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
