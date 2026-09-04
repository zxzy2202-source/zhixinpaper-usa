"use client";

import { FormEvent, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send, Upload, X } from "lucide-react";
import { COMPANY } from "@/lib/data";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  company: string;
  message: string;
};

type QuickContactFormProps = {
  customerPath?: string;
};

const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
const MAX_ATTACHMENTS = 3;
const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const EMPTY_FORM: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  company: "",
  message: "",
};

const fieldClass =
  "min-h-12 w-full rounded-lg border border-[#e5e9f0] bg-[#f4f6fa] px-4 py-3 text-sm text-[#001429] outline-none transition focus:border-[#006af6] focus:bg-white focus:ring-2 focus:ring-[#006af6]/15";

export default function QuickContactForm({ customerPath }: QuickContactFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleAttachments = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);
    const invalidType = incoming.find((file) => !ALLOWED_ATTACHMENT_TYPES.includes(file.type));
    if (invalidType) {
      setError("Please upload PDF, Word, Excel, CSV, JPG, PNG, or WebP files only.");
      return;
    }
    const oversized = incoming.find((file) => file.size > MAX_ATTACHMENT_SIZE);
    if (oversized) {
      setError("Each attachment must be 10 MB or smaller.");
      return;
    }
    if (attachments.length + incoming.length > MAX_ATTACHMENTS) {
      setError(`Please attach no more than ${MAX_ATTACHMENTS} files.`);
      return;
    }
    setError(null);
    setAttachments((current) => [...current, ...incoming]);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setStatus("submitting");

    try {
      const payload = new FormData();
      Object.entries(form).forEach(([key, value]) => payload.append(key, value));
      payload.append("subject", customerPath ? "Customer path contact request" : "General contact request");
      payload.append("country", "");
      if (customerPath) payload.append("customerPath", customerPath);
      attachments.forEach((file) => payload.append("attachments", file));

      const response = await fetch("/api/contact", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "We could not confirm your message was received.");
      }

      setStatus("success");
      setForm(EMPTY_FORM);
      setAttachments([]);
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
          The sales team will review your question and respond according to the project scope. For detailed pricing, volume, and freight requirements, choose Commercial RFQ above.
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
        <label htmlFor="contact-attachments" className="mb-2 block text-xs font-bold text-[#52647a]">
          Project files <span className="font-normal text-[#52647a]">(optional)</span>
        </label>
        <label
          htmlFor="contact-attachments"
          className="flex min-h-12 cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#b8c5d6] bg-[#f8fafc] px-4 py-3 text-sm text-[#52647a] transition hover:border-[#006af6] hover:bg-white"
        >
          <Upload className="h-4 w-4 shrink-0 text-[#006af6]" />
          <span>Upload specifications, artwork, or tender documents</span>
          <input
            id="contact-attachments"
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            onChange={(event) => {
              handleAttachments(event.target.files);
              event.target.value = "";
            }}
          />
        </label>
        <p className="mt-2 text-xs leading-5 text-[#52647a]">Up to 3 files, 10 MB each.</p>
        {attachments.length > 0 && (
          <ul className="mt-3 space-y-2" aria-label="Attached files">
            {attachments.map((file, index) => (
              <li key={`${file.name}-${file.lastModified}-${index}`} className="flex items-center justify-between gap-3 rounded-md bg-[#eef5ff] px-3 py-2 text-xs text-[#26384f]">
                <span className="min-w-0 truncate">{file.name}</span>
                <button
                  type="button"
                  className="shrink-0 text-[#52647a] transition hover:text-[#006af6]"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => setAttachments((current) => current.filter((_, fileIndex) => fileIndex !== index))}
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label htmlFor="contact-whatsapp" className="mb-2 block text-xs font-bold text-[#52647a]">
          WhatsApp <span className="font-normal text-[#52647a]">(optional)</span>
        </label>
        <input
          id="contact-whatsapp"
          type="tel"
          name="whatsapp"
          autoComplete="tel"
          inputMode="tel"
          placeholder="Country code + number"
          value={form.whatsapp}
          onChange={(event) => update("whatsapp", event.target.value)}
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="contact-company" className="mb-2 block text-xs font-bold text-[#52647a]">
          Company <span className="font-normal text-[#52647a]">(optional)</span>
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
          placeholder="Tell us what you need help with. For specifications, volume, and freight terms, choose Commercial RFQ above."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        aria-live="polite"
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#006af6] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0057cc] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" /> Sending…
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
