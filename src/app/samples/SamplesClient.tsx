"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
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
  const [autoReplySent, setAutoReplySent] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);

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
    setProductError(null);
    setSelectedProducts((prev) =>
      prev.includes(item) ? prev.filter((p) => p !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setProductError(null);

    if (selectedProducts.length === 0) {
      setProductError("Select at least one product construction to evaluate.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/samples", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, products: selectedProducts }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setAutoReplySent(Boolean(data.autoReplySent));
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
              Thank you, <strong>{form.firstName}</strong>. Our team has received your request and will review product availability, shipping details, and qualification requirements.
            </p>
            <p className="text-[#4f5f5a] text-sm mb-8">
              {autoReplySent ? (
                <>A confirmation email was sent to <strong>{form.email}</strong>. We will contact you after the sample plan has been reviewed.</>
              ) : (
                <>Your request is recorded, but we could not confirm delivery of an automatic email. Contact us directly if the request is urgent.</>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="bg-[#9c661d] text-white font-semibold px-6 py-3  hover:bg-[#7d4f16] transition-colors"
              >
                Browse Products
              </Link>
              <Link
                href="/contact?mode=quote#contact-form"
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
        <PageHeader
          eyebrow="Product evaluation request"
          title="Qualify a sample before bulk approval"
          description="Use this page only for printer-fit, material, adhesive, print, or packing evaluation. Sample availability, charges, and courier terms are confirmed after reviewing the requested construction and destination."
        />

        <div className="border-b border-[#ded6c8] bg-[#101b19]">
          <div className="container-site flex flex-col gap-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-6 text-[#c7d0cb]">
              Need bulk pricing, compliance documents, freight, or tender support instead?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact?mode=quote#contact-form" className="font-bold text-[#d6b273] hover:text-white">Start a commercial RFQ</Link>
              <Link href="/contact" className="font-semibold text-white hover:text-[#d6b273]">Contact sales</Link>
            </div>
          </div>
        </div>

        <section className="bg-[#f4f0e8] py-20">
          <div className="container-site">
            <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="bg-[#fbfaf6] border border-[#ded6c8] p-5 sm:p-8">
                  <h2 className="font-bold text-[#14211f] text-2xl mb-6">
                    Evaluation and shipping details
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
                        Product construction to evaluate *
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
                      {productError && (
                        <p className="mt-3 flex items-center gap-2 text-sm font-medium text-red-700" role="alert">
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          {productError}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="sample-notes" className="block text-xs font-semibold text-[#87918c] mb-2">
                        Evaluation Context
                      </label>
                      <textarea id="sample-notes"
                        name="notes"
                        rows={3}
                        value={form.notes}
                        onChange={handleChange}
                        className="w-full bg-[#f4f0e8] border border-[#ded6c8] px-4 py-3 text-[#14211f] text-sm focus:border-[#0f5f5c] focus:outline-none transition-colors resize-none"
                        placeholder="Printer model, current material, issue to solve, target size, adhesive or coating, and what the sample must prove..."
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
                          Submitting...
                        </>
                      ) : (
                        "Submit Sample Request"
                      )}
                    </button>
                  </form>
                </div>
              </div>

              <div>
                <div className="bg-[#fbfaf6] border border-[#ded6c8] p-6 mb-5">
                  <h3 className="font-bold text-[#14211f] text-lg mb-4">
                    Sample availability, charges, and courier terms
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        icon: <Package className="w-4 h-4" />,
                        title: "Sample Terms",
                        desc: "Availability and charges confirmed after product and destination review",
                      },
                      {
                        icon: <Truck className="w-4 h-4" />,
                        title: "Shipping",
                        desc: "Courier method and delivery estimate confirmed by destination",
                      },
                      {
                        icon: <Star className="w-4 h-4" />,
                        title: "Quality",
                        desc: "Production-intent construction confirmed for the evaluation plan",
                      },
                      {
                        icon: <CheckCircle2 className="w-4 h-4" />,
                        title: "Certificates",
                        desc: "Applicable documents confirmed by grade, use, and current scope",
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
                <div className="border border-[#ded6c8] bg-[#fbfaf6] p-6">
                  <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-[#0f5f5c]">Use the correct route</h3>
                  <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">
                    A sample request does not replace a commercial quotation. Use the RFQ when price, volume, Incoterms, compliance scope, or supply timing is the decision.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 text-sm font-bold">
                    <Link href="/contact?mode=quote#contact-form" className="text-[#9c661d] hover:text-[#7d4f16]">Go to commercial RFQ →</Link>
                    <Link href="/contact" className="text-[#0f5f5c] hover:text-[#14211f]">Ask a general question →</Link>
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
