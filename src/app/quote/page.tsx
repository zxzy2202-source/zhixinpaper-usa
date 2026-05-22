"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { COMPANY } from "@/lib/data";
import { CheckCircle2, Clock, Package, Truck, Shield, Loader2, AlertCircle } from "lucide-react";

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
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-10 max-w-lg w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-3">Quote Request Received!</h1>
            <p className="text-slate-600 mb-2">
              Thank you for your enquiry. Our sales team will review your requirements and respond within{" "}
              <strong>24 hours</strong> (business days).
            </p>
            <p className="text-slate-500 text-sm mb-8">
              A confirmation email has been sent. Please check your spam folder if you don&apos;t see it within 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products" className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Browse Products
              </Link>
              <Link href="/samples" className="border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors">
                Request Samples
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
      <main className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-800 to-blue-600 text-white pt-32 pb-14">
          <div className="max-w-5xl mx-auto px-6">
            <nav className="text-blue-300 text-sm mb-5 flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <span className="text-white">Request a Quote</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Request a Custom Quote</h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Fill in your requirements below and receive a detailed quote within 24 hours. Free samples available for qualified distributors.
            </p>
            <div className="flex flex-wrap gap-5 mt-6 text-sm">
              {["Response within 24h", "Free samples available", "ISO 9001 certified", "BPA-free options"].map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-blue-200">
                  <span className="text-green-400">✓</span> {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Form + Sidebar */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Contact */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                  <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                    Contact Information
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name <span className="text-red-500">*</span></label>
                      <input type="text" name="firstName" required autoComplete="given-name" placeholder="John Smith" value={formData.firstName} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Company Name <span className="text-red-500">*</span></label>
                      <input type="text" name="company" required autoComplete="organization" placeholder="Acme Distribution GmbH" value={formData.company} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Business Email <span className="text-red-500">*</span></label>
                      <input type="email" name="email" required autoComplete="email" placeholder="john@company.com" value={formData.email} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Phone Number</label>
                      <input type="tel" name="phone" autoComplete="tel" placeholder="+49 30 1234 5678" value={formData.phone} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Country <span className="text-red-500">*</span></label>
                      <select name="country" required value={formData.country} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all">
                        <option value="">Select your country...</option>
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Step 2: Products */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                  <h2 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    Product Interest <span className="text-red-500">*</span>
                  </h2>
                  <p className="text-slate-500 text-sm mb-5">Select all products you are interested in sourcing.</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {PRODUCTS.map((product) => (
                      <label
                        key={product.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          selectedProducts.includes(product.id)
                            ? "border-blue-500 bg-blue-50 text-blue-800"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                          className="w-4 h-4 text-blue-600 rounded accent-blue-600"
                        />
                        <span className="text-sm font-medium">{product.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Step 3: Order Details */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                  <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                    Order Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Annual Volume</label>
                      <select name="quantity" value={formData.quantity} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all">
                        <option value="">Select volume range...</option>
                        <option value="1-5-pallets">1–5 pallets / year (trial)</option>
                        <option value="6-20-pallets">6–20 pallets / year</option>
                        <option value="1x20-container">1 × 20&apos; container / year</option>
                        <option value="1x40-container">1 × 40&apos; container / year</option>
                        <option value="multi-container">Multiple containers / year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Preferred Incoterm</label>
                      <select name="incoterms" value={formData.incoterms} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all">
                        <option value="">Select incoterm...</option>
                        <option value="ddp">DDP — Delivered Duty Paid (USA/EU/CA)</option>
                        <option value="fob">FOB Qingdao</option>
                        <option value="cif">CIF Destination Port</option>
                        <option value="exw">EXW Factory</option>
                        <option value="unsure">Not sure — please advise</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Specifications <span className="text-slate-400 font-normal normal-case">(width × diameter, core, gsm)</span></label>
                      <input type="text" name="specifications" value={formData.specifications} onChange={handleChange} placeholder="e.g. 80×80mm, 12mm core, BPA-free, 55g/m²" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Custom Printing / OEM?</label>
                      <select name="customPrinting" value={formData.customPrinting} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all">
                        <option value="no">No — standard product</option>
                        <option value="logo">Yes — logo / brand printing</option>
                        <option value="private-label">Yes — private label / OEM</option>
                        <option value="variable">Yes — variable data printing</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Additional Requirements</label>
                      <textarea name="notes" rows={4} value={formData.notes} onChange={handleChange} placeholder="Certifications needed (BPA-free, REACH, FDA, Prop 65), printer brand/model, temperature range, packaging requirements, target price..." className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all resize-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <div className="flex items-center gap-3 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-lg text-sm text-slate-500">
                        <Package className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span>Have spec sheets or artwork files? Email them to <a href={`mailto:${COMPANY.email}`} className="text-blue-600 hover:underline font-medium">{COMPANY.email}</a> — reference your company name in the subject line.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4: Attribution */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-7">
                  <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                    <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    How Did You Find Us?
                  </h2>
                  <select name="source" value={formData.source} onChange={handleChange} className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-slate-50 transition-all">
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
                {submitError && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-700 text-sm font-medium">Submission failed</p>
                      <p className="text-red-600 text-sm mt-1">{submitError}</p>
                      <p className="text-red-500 text-xs mt-2">Please email us directly at <a href={`mailto:${COMPANY.email}`} className="underline">{COMPANY.email}</a></p>
                    </div>
                  </div>
                )}
                {/* Trust assurance before submit */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs text-slate-500">
                  {[
                    { icon: "🔒", text: "Your data is confidential. NDA available on request." },
                    { icon: "⚡", text: "Response within 24 business hours, often same day." },
                    { icon: "📦", text: "Free samples dispatched within 24h for qualified buyers." },
                  ].map((item) => (
                    <div key={item.text} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <span className="text-base leading-none">{item.icon}</span>
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-700 disabled:opacity-60 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin w-4 h-4" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Quote Request →"
                    )}
                  </button>
                  <div className="space-y-1">
                    <p className="text-slate-400 text-xs leading-relaxed max-w-xs">
                      By submitting, you agree to our{" "}
                      <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>. We never share your information.
                    </p>
                    <p className="text-slate-400 text-xs">Prefer direct contact? <a href={`mailto:${COMPANY.email}`} className="text-blue-500 hover:underline">{COMPANY.email}</a> or WhatsApp {COMPANY.whatsapp}</p>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 text-base mb-4">What to Expect</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Clock className="w-4 h-4" />, title: "24-Hour Response", desc: "Quote within one business day" },
                    { icon: <Package className="w-4 h-4" />, title: "Free Samples", desc: "For qualified distributors" },
                    { icon: <Truck className="w-4 h-4" />, title: "15-Day Lead Time", desc: "Standard production" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, title: "Full Documentation", desc: "Compliance certificates included" },
                    { icon: <Shield className="w-4 h-4" />, title: "Confidential", desc: "NDA available on request" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="text-blue-600 mt-0.5">{item.icon}</div>
                      <div>
                        <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
                        <div className="text-slate-400 text-xs">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 text-base mb-4">Direct Contact</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <span>📧</span>
                    <a href={`mailto:${COMPANY.email}`} className="text-blue-600 hover:underline">{COMPANY.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span>📞</span>
                    <span>{COMPANY.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <span>💬</span>
                    <span>WhatsApp: {COMPANY.whatsapp}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
                <h3 className="font-bold text-slate-800 text-base mb-2">Need Samples First?</h3>
                <p className="text-slate-600 text-sm mb-4">Test our quality before placing a bulk order. Free sample packs for qualified distributors.</p>
                <Link href="/samples" className="block text-center bg-white border border-blue-300 text-blue-700 font-semibold px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm">
                  Request Free Samples →
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
