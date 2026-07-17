"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import {
  CheckCircle2,
  Package,
  Truck,
  Star,
  Loader2,
  AlertCircle,
} from "lucide-react";

const SAMPLE_PRODUCTS = [
  "Standard POS Rolls (80×80mm)",
  "BPA-Free Thermal Rolls",
  "Direct Thermal Labels",
  "Freezer / Cold Chain Labels",
  "High Temperature Labels",
  "Custom Printed Sample",
];

export default function SamplesClient() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleProduct = (item: string) => {
    setSelectedProducts((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, products: selectedProducts }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
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
              Sample request confirmed
            </h1>
            <p className="text-[#4f5f5a] mb-2">
              Thank you, <strong>{form.firstName}</strong>! Our team will prepare
              your sample kit within <strong>2–3 business days</strong>.
            </p>
            <p className="text-[#4f5f5a] text-sm mb-8">
              A confirmation email has been sent to <strong>{form.email}</strong>.
              We will contact you with shipping details once dispatched.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="bg-[#b9822f] text-white font-semibold px-6 py-3  hover:bg-[#9f6e25] transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/quote"
                className="border border-[#ded6c8] text-[#33413e] font-semibold px-6 py-3  hover:bg-[#f4f0e8] transition-colors"
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
        <section className="paper-noise border-b border-[#ded6c8] bg-[#fbfaf6] pt-32 pb-16">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-0.5 w-8 bg-[#b9822f]" />
              <span className="text-xs font-bold text-[#0f5f5c]">
                Free Samples
              </span>
            </div>
            <h1 className="font-bold text-[#14211f] text-5xl md:text-6xl mb-4">
              Request production samples before bulk order
            </h1>
            <p className="text-[#4f5f5a] text-lg max-w-2xl">
              Test our thermal paper rolls and labels before placing a bulk
              order. Free samples available for qualified distributors and
              importers in Europe, USA, and Canada.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#fbfaf6]">
          <div className="container-site">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-[#fbfaf6] border border-[#ded6c8] p-5 sm:p-8">
                  <h2 className="font-bold text-[#14211f] text-2xl mb-6">
                    Sample Request Form
                  </h2>

                  {submitError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200  mb-6">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-red-700 text-sm font-medium">
                          Submission failed
                        </p>
                        <p className="text-red-600 text-sm mt-1">{submitError}</p>
                        <p className="text-red-500 text-xs mt-2">
                          Please email us directly at{" "}
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

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sample-first-name" className="block text-xs font-semibold text-[#87918c] mb-2">
                          First Name *
                        </label>
                        <input id="sample-first-name"
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="sample-last-name" className="block text-xs font-semibold text-[#87918c] mb-2">
                          Last Name *
                        </label>
                        <input id="sample-last-name"
                          type="text"
                          name="lastName"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sample-company" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Company *
                      </label>
                      <input id="sample-company"
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="sample-email" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Business Email *
                      </label>
                      <input id="sample-email"
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="sample-phone" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Phone
                      </label>
                      <input id="sample-phone"
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors"
                        placeholder="+49 30 1234 5678"
                      />
                    </div>
                    <div>
                      <label htmlFor="sample-country" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Country *
                      </label>
                      <select id="sample-country"
                        name="country"
                        required
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
                      <label htmlFor="sample-address" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Shipping Address *
                      </label>
                      <textarea id="sample-address"
                        name="address"
                        rows={3}
                        required
                        value={form.address}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors resize-none"
                        placeholder="Full shipping address including country"
                      />
                    </div>
                    <div>
                      <div className="block text-xs font-semibold text-[#87918c] mb-2">
                        Sample Products Requested
                      </div>
                      <div className="space-y-2">
                        {SAMPLE_PRODUCTS.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(item)}
                              onChange={() => toggleProduct(item)}
                              className="w-4 h-4 accent-[#0f5f5c]"
                            />
                            <span className="text-[#4f5f5a] text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label htmlFor="sample-notes" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Additional Notes
                      </label>
                      <textarea id="sample-notes"
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors resize-none"
                        placeholder="Specific sizes, certifications needed, or other requirements..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#b9822f] hover:bg-[#9f6e25] disabled:bg-[#b9822f]/45 text-white font-bold transition duration-200 hover:-translate-y-0.5 active:translate-y-px text-sm w-full justify-center"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Request Free Samples"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div>
                <div className="bg-[#fbfaf6] border border-[#ded6c8] p-6 mb-5">
                  <h3 className="font-bold text-[#14211f] text-lg mb-4">
                    Sample Policy
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Package className="w-4 h-4" />,
                        title: "Free Samples",
                        desc: "No charge for standard samples for qualified buyers",
                      },
                      {
                        icon: <Truck className="w-4 h-4" />,
                        title: "Shipping",
                        desc: "DHL/FedEx express, 3-5 business days worldwide",
                      },
                      {
                        icon: <Star className="w-4 h-4" />,
                        title: "Quality",
                        desc: "Production-grade samples from actual production runs",
                      },
                      {
                        icon: <CheckCircle2 className="w-4 h-4" />,
                        title: "Certificates",
                        desc: "Compliance certificates included with samples",
                      },
                    ].map((item) => (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="text-[#0f5f5c] mt-0.5">{item.icon}</div>
                        <div>
                          <div className="font-bold text-[#14211f] text-sm">
                            {item.title}
                          </div>
                          <div className="text-[#87918c] text-xs">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
