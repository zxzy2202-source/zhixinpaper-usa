"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  MessageCircle,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

// LinkedIn icon (lucide-react version doesn't include it)
const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    country: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or contact us directly."
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center bg-[#f4f0e8] px-6 py-20">
          <div className="w-full max-w-lg border border-[#ded6c8] bg-[#fbfaf6] p-10 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-[#0f5f5c]/25 bg-[#0f5f5c]/10">
              <CheckCircle2 className="h-8 w-8 text-[#0f5f5c]" />
            </div>
            <h1 className="text-2xl font-bold text-[#33413e] mb-3">
              Message sent successfully
            </h1>
            <p className="text-[#4f5f5a] mb-2">
              Thank you for reaching out. Our sales team will respond within{" "}
              <strong>24 business hours</strong>.
            </p>
            <p className="text-[#4f5f5a] text-sm mb-8">
              A confirmation email has been sent to{" "}
              <strong>{form.email}</strong>. Please check your spam folder if
              you don&apos;t see it within 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="bg-[#9c661d] px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] active:translate-y-px"
              >
                Browse Products
              </Link>
              <Link
                href="/quote"
                className="border border-[#ded6c8] px-6 py-3 font-semibold text-[#33413e] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f0e8] active:translate-y-px"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#9c661d]" />
              <span className="text-xs font-bold text-[#0f5f5c]">
                Contact
              </span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Talk to a paper specialist
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl mb-6">
              Contact our sales team for quotes, samples, compliance
              documentation, or technical support. We respond within 24 hours.
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-[#4f5f5a]">
              {[
                "ISO 9001:2015 Certified",
                "Quote within 24 h",
                "Free samples for qualified buyers",
                "NDA available on request",
              ].map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0f5f5c]" aria-hidden="true" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div>
                <h2 className="font-bold text-[#14211f] text-3xl mb-8">
                  Contact Information
                </h2>
                <div className="space-y-5 mb-10">
                  {[
                    {
                      icon: <Phone className="w-5 h-5" />,
                      label: "Phone",
                      value: COMPANY.phone,
                      href: `tel:${COMPANY.phone}`,
                    },
                    {
                      icon: <Mail className="w-5 h-5" />,
                      label: "Email",
                      value: COMPANY.email,
                      href: `mailto:${COMPANY.email}`,
                    },
                    {
                      icon: <MessageCircle className="w-5 h-5" />,
                      label: "WhatsApp",
                      value: COMPANY.whatsapp,
                      href: `https://wa.me/${COMPANY.whatsapp.replace(/\D/g, "")}`,
                    },
                    {
                      icon: <MapPin className="w-5 h-5" />,
                      label: "Address",
                      value: COMPANY.address,
                      href: null,
                    },
                    {
                      icon: <Clock className="w-5 h-5" />,
                      label: "Business Hours",
                      value: "Mon–Fri 9:00–18:00 (GMT+8)",
                      href: null,
                    },
                    {
                      icon: <Globe className="w-5 h-5" />,
                      label: "Response Time",
                      value: "Within 24 hours",
                      href: null,
                    },
                    {
                      icon: <LinkedinIcon />,
                      label: "LinkedIn",
                      value: "Zhixin Paper Co., Ltd.",
                      href: "https://www.linkedin.com/company/zhixin-paper",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-4 p-4 bg-[#fbfaf6] border border-[#ded6c8]"
                    >
                      <div className="w-10 h-10 bg-[#9c661d]/15 border border-[#0f5f5c]/25 flex items-center justify-center shrink-0 text-[#0f5f5c]">
                        {item.icon}
                      </div>
                      <div>
                        <div className="mb-1 text-xs font-bold text-[#0f5f5c]">
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[#4f5f5a] hover:text-[#14211f] transition-colors text-sm"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span className="text-[#4f5f5a] text-sm">
                            {item.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact form */}
              <div className="bg-[#fbfaf6] border border-[#ded6c8] p-5 sm:p-8">
                <h2 className="font-bold text-[#14211f] text-2xl mb-6">
                  Send a Message
                </h2>

                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200  mb-6">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm font-medium">
                        Failed to send message
                      </p>
                      <p className="text-red-600 text-sm mt-1">{error}</p>
                      <p className="text-red-500 text-xs mt-2">
                        Alternatively, email us directly at{" "}
                        <a
                          href={`mailto:${COMPANY.email}`}
                          className="underline"
                        >
                          {COMPANY.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-first-name" className="block text-xs font-semibold text-[#87918c] mb-2">
                        First Name *
                      </label>
                      <input id="contact-first-name"
                        type="text"
                        name="firstName"
                        required
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-last-name" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Last Name *
                      </label>
                      <input id="contact-last-name"
                        type="text"
                        name="lastName"
                        required
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-xs font-semibold text-[#87918c] mb-2">
                      Company *
                    </label>
                    <input id="contact-company"
                      type="text"
                      name="company"
                      required
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-semibold text-[#87918c] mb-2">
                      Email *
                    </label>
                    <input id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-country" className="block text-xs font-semibold text-[#87918c] mb-2">
                      Country
                    </label>
                    <select id="contact-country"
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                    >
                      <option value="">Select Country</option>
                      <option>Germany</option>
                      <option>United Kingdom</option>
                      <option>France</option>
                      <option>Netherlands</option>
                      <option>Poland</option>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#87918c] mb-2">
                      Subject
                    </label>
                    <input id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                      placeholder="e.g. Thermal paper rolls inquiry"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-[#87918c] mb-2">
                      Message *
                    </label>
                    <textarea id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors resize-none"
                      placeholder="Tell us about your requirements..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#9c661d] hover:bg-[#7d4f16] disabled:bg-[#9c661d]/45 text-white font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-px text-sm w-full justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
