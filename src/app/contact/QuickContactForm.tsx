"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { COMPANY } from "@/lib/data";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  message: string;
};

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  company: "",
  message: "",
};

const fieldClass =
  "min-h-12 w-full rounded-lg border border-[#e5e9f0] bg-[#f4f6fa] px-4 py-3 text-sm text-[#001429] outline-none transition focus:border-[#006af6] focus:bg-white focus:ring-2 focus:ring-[#006af6]/15";

export default function QuickContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          subject: "General contact request",
          country: "",
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "We could not confirm your message was received.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
    } catch (submissionError) {
      setStatus("idle");
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not confirm your message was received."
      );
    }
  };

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center rounded-lg bg-[#f4f6fa] p-6 sm:p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#006af6] text-white">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-6 text-2xl font-bold text-[#001429]">Message received</h3>
        <p className="mt-3 max-w-md text-sm leading-7 text-[#52647a]">
          The sales team will review your question and respond according to the project scope. For a commercial specification, continue with the full RFQ instead.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 w-fit rounded-lg border border-[#006af6] px-5 py-3 text-sm font-bold text-[#006af6] transition hover:bg-[#006af6] hover:text-white"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} aria-label="Quick contact">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700" role="alert">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            {error} Email us directly at{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-bold underline">
              {COMPANY.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-first-name" className="mb-2 block text-xs font-bold text-[#52647a]">
            First name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            required
            autoComplete="given-name"
            value={form.firstName}
            onChange={(event) => update("firstName", event.target.value)}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="contact-last-name" className="mb-2 block text-xs font-bold text-[#52647a]">
            Last name <span aria-hidden="true">*</span>
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            required
            autoComplete="family-name"
            value={form.lastName}
            onChange={(event) => update("lastName", event.target.value)}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-xs font-bold text-[#52647a]">
          Business email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={(event) => update("email", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-2 block text-xs font-bold text-[#52647a]">
          Company
        </label>
        <input
          id="contact-company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-xs font-bold text-[#52647a]">
          Your question <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          placeholder="Tell us what you need help with. Use the RFQ page for specifications, volume, and freight terms."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#006af6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0057cc] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            Send message <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
