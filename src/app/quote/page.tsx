"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileCheck,
  Loader2,
  LockKeyhole,
  Mail,
  MessageSquare,
  Package,
  Phone,
  Shield,
  Truck,
} from "lucide-react";

const COUNTRIES = [
  "Germany", "United Kingdom", "France", "Netherlands", "Poland", "Belgium",
  "Sweden", "Denmark", "Norway", "Finland", "Austria", "Switzerland", "Italy",
  "Spain", "Portugal", "Czech Republic", "Hungary", "Romania", "United States",
  "Canada", "Australia", "Japan", "South Korea", "Singapore", "Other",
];

const PRODUCTS = [
  { id: "pos-rolls", label: "Standard POS Rolls" },
  { id: "atm-rolls", label: "ATM / Banking Rolls" },
  { id: "lottery-rolls", label: "Lottery & Gaming Rolls" },
  { id: "casino-rolls", label: "Casino TITO Rolls" },
  { id: "parking-rolls", label: "Parking / Ticketing Rolls" },
  { id: "medical-rolls", label: "Medical Thermal Paper" },
  { id: "transport-rolls", label: "Transport Ticket Rolls" },
  { id: "kiosk-rolls", label: "Kiosk / Vending Rolls" },
  { id: "custom-rolls", label: "Custom Printed Rolls" },
  { id: "dt-labels", label: "Direct Thermal Labels" },
  { id: "tt-labels", label: "Thermal Transfer Labels" },
  { id: "hightemp-labels", label: "High Temperature Labels" },
  { id: "freezer-labels", label: "Freezer / Cold Chain Labels" },
  { id: "removable-labels", label: "Removable Labels" },
  { id: "synthetic-labels", label: "Synthetic PP Labels" },
  { id: "tamper-labels", label: "Tamper-Evident Labels" },
  { id: "chemical-labels", label: "Chemical Resistant Labels" },
  { id: "wristband-labels", label: "Wristband Labels" },
  { id: "fanfold-labels", label: "Fanfold Labels" },
  { id: "custom-labels", label: "Custom Printed Labels" },
  { id: "oem", label: "OEM / Private Label" },
];

const RFQ_ASSURANCE = [
  {
    icon: <LockKeyhole className="h-4 w-4" />,
    text: "Your buyer data stays confidential. NDA available on request.",
  },
  {
    icon: <Clock className="h-4 w-4" />,
    text: "Sales reply within 24 business hours, often the same day.",
  },
  {
    icon: <FileCheck className="h-4 w-4" />,
    text: "Samples and files are matched to the roll grade before production.",
  },
];

export default function QuotePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", company: "", email: "", phone: "",
    country: "", quantity: "", incoterms: "", specifications: "",
    customPrinting: "", notes: "", source: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      setSubmitError("Please select at least one product so we can route the RFQ to the right sales team.");
      return;
    }
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          products: selectedProducts.map(id => PRODUCTS.find(p => p.id === id)?.label || id),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-[#f4f0e8] px-6 py-24">
          <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-stretch">
            <div className="border border-[#ded6c8] bg-white p-8 shadow-[0_18px_44px_rgba(20,33,31,0.08)] sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h1 className="max-w-2xl text-3xl font-bold text-[#14211f] md:text-4xl">
                Quote request received
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#4f5f5a]">
                Our sales team will review the roll spec, destination, compliance needs, and sample plan before replying within 24 business hours.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#0f5f5c] px-6 py-3 text-sm font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-[#0a4745] active:translate-y-px"
                >
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/samples"
                  className="inline-flex min-h-12 items-center justify-center border border-[#c8bcaa] bg-white px-6 py-3 text-sm font-semibold text-[#14211f] transition duration-200 hover:-translate-y-0.5 hover:border-[#0f5f5c] hover:text-[#0f5f5c] active:translate-y-px"
                >
                  Request Samples
                </Link>
              </div>
            </div>

            <aside className="border border-[#ded6c8] bg-white p-8 shadow-[0_18px_44px_rgba(20,33,31,0.06)]">
              <h2 className="text-lg font-bold text-[#14211f]">What happens next</h2>
              <div className="mt-5 grid gap-4">
                {[
                  "Confirm size, core, coating, carton count, and printer fit.",
                  "Match compliance files such as BPA-free, REACH, Prop 65, FDA, FSC, or ISO.",
                  "Reply with sample plan, lead time, packing notes, and freight option.",
                ].map((item) => (
                  <div key={item} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 text-sm leading-6 text-[#4f5f5a]">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-[#ded6c8] pt-5 text-sm leading-6 text-[#4f5f5a]">
                Need to add drawings or artwork? Email files to{" "}
                <a href={`mailto:${COMPANY.email}`} className="font-semibold text-[#0f5f5c] hover:underline">
                  {COMPANY.email}
                </a>
                .
              </p>
            </aside>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#f4f0e8]">
        {/* Hero */}
        <section className="paper-noise bg-[#101b19] pb-12 pt-28 text-white">
          <div className="mx-auto max-w-6xl px-6">
            <nav className="mb-5 flex items-center gap-2 text-sm text-slate-400">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Request a Quote</span>
            </nav>
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold text-[#d6b273]">
                RFQ intake
              </p>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                Request a quote with the details buyers actually check
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#c7d0cb] md:text-lg">
                Share product, destination, volume, and compliance needs. We will match roll spec, files, samples, and freight terms.
              </p>
            </div>
            <div className="mt-7 grid gap-px bg-white/12 sm:grid-cols-2 lg:grid-cols-4">
              {["24-hour reply", "Samples available", "ISO 9001 system", "BPA-free options"].map((item) => (
                <div key={item} className="flex items-center gap-3 bg-[#08110f]/70 px-4 py-4 text-sm font-semibold text-[#d9dfda]">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#d6b273]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[#ded6c8] bg-[#fbfaf6]">
          <div className="mx-auto grid max-w-6xl gap-px bg-[#ded6c8] px-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Product", text: "Rolls, labels, OEM, or mixed program" },
              { label: "Fit", text: "Width, OD, core, printer model, coating" },
              { label: "Files", text: "REACH, FDA, Prop 65, FSC, ISO, BPA-free" },
              { label: "Route", text: "FOB, CIF, DDP, pallet, or container terms" },
            ].map((item) => (
              <div key={item.label} className="bg-[#fbfaf6] px-5 py-5">
                <div className="text-sm font-bold text-[#14211f]">{item.label}</div>
                <p className="mt-2 text-sm leading-6 text-[#4f5f5a]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col-reverse gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_340px]">
            {/* Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Contact */}
                <div className="border border-[#ded6c8] bg-white p-6 shadow-sm sm:p-7">
                  <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#14211f]">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#0f5f5c] text-xs font-bold text-white">1</span>
                    Contact details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-first-name" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Full Name <span className="text-red-500">*</span></label>
                      <input id="quote-first-name" type="text" name="firstName" required autoComplete="given-name" placeholder="Maria Keller" value={formData.firstName} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div>
                      <label htmlFor="quote-company" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Company Name <span className="text-red-500">*</span></label>
                      <input id="quote-company" type="text" name="company" required autoComplete="organization" placeholder="Nordline Distributors GmbH" value={formData.company} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div>
                      <label htmlFor="quote-email" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Business Email <span className="text-red-500">*</span></label>
                      <input id="quote-email" type="email" name="email" required autoComplete="email" placeholder="maria@company.com" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div>
                      <label htmlFor="quote-phone" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Phone Number</label>
                      <input id="quote-phone" type="tel" name="phone" autoComplete="tel" placeholder="+49 30 1234 5678" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="quote-country" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Country <span className="text-red-500">*</span></label>
                      <select id="quote-country" name="country" required value={formData.country} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]">
                        <option value="">Select your country...</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Products */}
                <div className="border border-[#ded6c8] bg-white p-6 shadow-sm sm:p-7">
                  <h2 className="mb-2 flex items-center gap-3 text-lg font-bold text-[#14211f]">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#0f5f5c] text-xs font-bold text-white">2</span>
                    Product interest <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-slate-500 text-sm mb-5">Select all products you are interested in sourcing.</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {PRODUCTS.map((product) => (
                      <label
                        key={product.id}
                        className={`flex cursor-pointer items-center gap-3 border p-3 transition ${
                          selectedProducts.includes(product.id)
                            ? "border-[#0f5f5c] bg-[#e7eee9] text-[#0f5f5c]"
                            : "border-[#ded6c8] text-[#4f5f5a] hover:border-[#0f5f5c]/40 hover:bg-[#fbfaf6]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          className="h-4 w-4 accent-[#0f5f5c]"
                        />
                        <span className="text-sm font-medium">{product.label}</span>
                      </label>
                    ))}
                  </div>
                  {submitError && selectedProducts.length === 0 && (
                    <p className="mt-3 text-sm font-medium text-red-600">
                      Please select at least one product before submitting.
                    </p>
                  )}
                </div>

                {/* Step 3: Order Details */}
                <div className="border border-[#ded6c8] bg-white p-6 shadow-sm sm:p-7">
                  <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#14211f]">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#0f5f5c] text-xs font-bold text-white">3</span>
                    Order details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="quote-quantity" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Annual Volume</label>
                      <select id="quote-quantity" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]">
                        <option value="">Select volume range...</option>
                        <option value="1-5-pallets">1-5 pallets / year (trial)</option>
                        <option value="6-20-pallets">6-20 pallets / year</option>
                        <option value="1x20-container">1 x 20&apos; container / year</option>
                        <option value="1x40-container">1 x 40&apos; container / year</option>
                        <option value="multi-container">Multiple containers / year</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quote-incoterms" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Preferred Incoterm</label>
                      <select id="quote-incoterms" name="incoterms" value={formData.incoterms} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]">
                        <option value="">Select incoterm...</option>
                        <option value="ddp">DDP - Delivered Duty Paid (USA/EU/CA)</option>
                        <option value="fob">FOB Qingdao</option>
                        <option value="cif">CIF Destination Port</option>
                        <option value="exw">EXW Factory</option>
                        <option value="unsure">Not sure - please advise</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="quote-specifications" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Specifications <span className="font-normal normal-case text-slate-400">(width × diameter, core, gsm)</span></label>
                      <input id="quote-specifications" type="text" name="specifications" value={formData.specifications} onChange={handleChange} placeholder="80 x 80mm, 12mm core, BPA-free, 55gsm" className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div>
                      <label htmlFor="quote-custom-printing" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Custom Printing / OEM?</label>
                      <select id="quote-custom-printing" name="customPrinting" value={formData.customPrinting} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]">
                        <option value="no">No - standard product</option>
                        <option value="logo">Yes - logo / brand printing</option>
                        <option value="private-label">Yes - private label / OEM</option>
                        <option value="variable">Yes - variable data printing</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="quote-notes" className="mb-1.5 block text-xs font-semibold uppercase text-slate-600">Additional Requirements</label>
                      <textarea id="quote-notes" name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder="Certificates needed, printer brand, storage conditions, carton marks, pallet plan, target price" className="w-full resize-none border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]" />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center gap-3 border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                        <Package className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span>Have spec sheets or artwork files? Email them to <a href={`mailto:${COMPANY.email}`} className="font-medium text-[#0f5f5c] hover:underline">{COMPANY.email}</a> and reference your company name.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Attribution */}
                <div className="border border-[#ded6c8] bg-white p-6 shadow-sm sm:p-7">
                  <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-[#14211f]">
                    <span className="flex h-8 w-8 items-center justify-center bg-[#0f5f5c] text-xs font-bold text-white">4</span>
                    Source
                  </h2>
                  <label htmlFor="quote-source" className="sr-only">How did you hear about us?</label>
                  <select id="quote-source" name="source" value={formData.source} onChange={handleChange} className="w-full border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-[#0f5f5c] focus:outline-none focus:ring-2 focus:ring-[#d8e6de]">
                    <option value="">Select an option...</option>
                    <option value="google">Google Search</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="trade-show">Trade Show / Exhibition</option>
                    <option value="referral">Referral from a colleague</option>
                    <option value="alibaba">Alibaba / Global Sources</option>
                    <option value="industry-publication">Industry Publication</option>
                    <option value="social-media">Social Media</option>
                    <option value="existing-customer">Existing Zhixin Paper customer</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Submit */}
                {submitError && selectedProducts.length > 0 && (
                  <div className="flex items-start gap-3 border border-red-200 bg-red-50 p-4">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm font-medium">Submission failed</p>
                      <p className="text-red-600 text-sm mt-1">{submitError}</p>
                      <p className="text-red-500 text-xs mt-2">Please email us directly at <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a></p>
                    </div>
                  </div>
                )}
                {/* Trust assurance before submit */}
                <div className="grid gap-3 text-xs text-slate-600 sm:grid-cols-3">
                  {RFQ_ASSURANCE.map((item) => (
                    <div key={item.text} className="flex items-start gap-2 border border-[#ded6c8] bg-white p-3">
                      <span className="mt-0.5 text-[#0f5f5c]">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#9c661d] px-8 py-4 text-sm font-bold text-white shadow-[0_16px_38px_rgba(185,130,47,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7d4f16] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit quote request
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                  <div className="space-y-1">
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="text-[#0f5f5c] hover:underline">Privacy Policy</Link>. We never share your information.
                    </p>
                    <p className="text-slate-400 text-xs">Prefer direct contact? <a href={`mailto:${COMPANY.email}`} className="text-[#0f5f5c] hover:underline">{COMPANY.email}</a> or WhatsApp {COMPANY.whatsapp}</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="border border-[#ded6c8] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-[#14211f]">What to expect</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Clock className="w-4 h-4" />, title: "24-hour response", desc: "Quote within one business day" },
                    { icon: <Package className="w-4 h-4" />, title: "Sample plan", desc: "For qualified distributors" },
                    { icon: <Truck className="w-4 h-4" />, title: "Freight options", desc: "FOB, CIF, DDP, pallet, or container" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, title: "Document pack", desc: "Compliance files matched to grade" },
                    { icon: <Shield className="w-4 h-4" />, title: "Confidential", desc: "NDA available on request" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="mt-0.5 text-[#0f5f5c]">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
                        <div className="text-slate-400 text-xs">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#ded6c8] bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-base font-bold text-[#14211f]">Direct contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="h-4 w-4 text-[#0f5f5c]" />
                    <a href={`mailto:${COMPANY.email}`} className="text-[#0f5f5c] hover:underline">{COMPANY.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="h-4 w-4 text-[#0f5f5c]" />
                    <span>{COMPANY.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MessageSquare className="h-4 w-4 text-[#0f5f5c]" />
                    <span>WhatsApp: {COMPANY.whatsapp}</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#c8bcaa] bg-[#f4f0e8] p-6">
                <h3 className="mb-2 text-base font-bold text-[#14211f]">Need samples first?</h3>
                <p className="text-slate-600 text-sm mb-4">Test our quality before placing a bulk order. Free sample packs for qualified distributors.</p>
                <Link href="/samples" className="block border border-[#c8bcaa] bg-white px-4 py-3 text-center text-sm font-semibold text-[#0f5f5c] transition duration-200 hover:-translate-y-0.5 hover:border-[#0f5f5c] hover:bg-[#fbfaf6] active:translate-y-px">
                  Request Samples
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
