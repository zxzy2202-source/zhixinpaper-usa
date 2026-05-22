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
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-3">
              Sample Request Confirmed!
            </h1>
            <p className="text-slate-600 mb-2">
              Thank you, <strong>{form.firstName}</strong>! Our team will prepare
              your sample kit within <strong>2–3 business days</strong>.
            </p>
            <p className="text-slate-500 text-sm mb-8">
              A confirmation email has been sent to <strong>{form.email}</strong>.
              We will contact you with shipping details once dispatched.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/quote"
                className="border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
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
        <section className="pt-32 pb-16 bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border-b border-slate-200">
          <div className="container-site">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-0.5 bg-blue-600 rounded-full" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600">
                Free Samples
              </span>
            </div>
            <h1 className="font-bold text-slate-900 text-5xl md:text-6xl mb-4">
              Request Free Samples
            </h1>
            <p className="text-slate-500 text-lg max-w-2xl">
              Test our thermal paper rolls and labels before placing a bulk
              order. Free samples available for qualified distributors and
              importers in Europe, USA, and Canada.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container-site">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-white border border-slate-200 p-5 sm:p-8">
                  <h2 className="font-bold text-slate-900 text-2xl mb-6">
                    Sample Request Form
                  </h2>

                  {submitError && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
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
                        <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Company *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
                        placeholder="+49 30 1234 5678"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        required
                        value={form.country}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors"
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
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Shipping Address *
                      </label>
                      <textarea
                        name="address"
                        rows={3}
                        required
                        value={form.address}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        placeholder="Full shipping address including country"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Sample Products Requested
                      </label>
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
                              className="w-4 h-4 accent-blue-600"
                            />
                            <span className="text-slate-500 text-sm">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-widest uppercase text-slate-400 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-slate-900 text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                        placeholder="Specific sizes, certifications needed, or other requirements..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold rounded-xl transition-colors shadow-sm text-sm w-full justify-center"
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
                <div className="bg-white border border-slate-200 p-6 mb-5">
                  <h3 className="font-bold text-slate-900 text-lg mb-4">
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
                        <div className="text-blue-600 mt-0.5">{item.icon}</div>
                        <div>
                          <div className="font-bold text-slate-900 text-sm">
                            {item.title}
                          </div>
                          <div className="text-slate-400 text-xs">{item.desc}</div>
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
