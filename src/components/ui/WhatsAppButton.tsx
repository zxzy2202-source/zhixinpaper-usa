"use client";

import { useState, useEffect } from "react";
import { COMPANY } from "@/lib/data";

// Strip non-digit characters from the WhatsApp number
const waNumber = COMPANY.whatsapp.replace(/\D/g, "");
const waMessage = encodeURIComponent(
  "Hello, I'm interested in your thermal paper products. Could you please provide more information?"
);
const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [pulse, setPulse] = useState(true);

  // Show button after a short delay, hide pulse after 6s
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 800);
    const pulseTimer = setTimeout(() => setPulse(false), 6000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(pulseTimer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3 transition-[opacity,transform] duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      {/* Tooltip bubble */}
      <div
        aria-live="polite"
        className={`transition-[opacity,transform] duration-300 ${
          showTooltip
            ? "opacity-100 translate-x-0 pointer-events-auto"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-100 px-4 py-3 max-w-[220px]">
          {/* Arrow pointing right */}
          <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-white" />
          <p className="text-slate-800 text-sm font-semibold leading-tight">
            Chat with us on WhatsApp
          </p>
          <p className="text-slate-500 text-xs mt-0.5">
            Typically replies within minutes
          </p>
          {/* Online indicator */}
          <div className="flex items-center gap-1.5 mt-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-600 text-xs font-medium">Online now</span>
          </div>
        </div>
      </div>

      {/* Main FAB button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg shadow-green-500/40 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 transition-[background-color,box-shadow,transform] duration-200 hover:shadow-green-500/60 hover:shadow-xl"
      >
        {/* Pulse ring */}
        {pulse && (
          <>
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
            <span className="absolute inset-[-6px] rounded-full border-2 border-[#25D366]/40 animate-pulse" />
          </>
        )}

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-7 h-7 fill-white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.637 4.637 1.847 6.637L2.667 29.333l6.88-1.813A13.267 13.267 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24c-2.12 0-4.197-.573-6.003-1.653l-.43-.257-4.083 1.077 1.09-3.977-.28-.447A10.603 10.603 0 0 1 5.333 16c0-5.88 4.787-10.667 10.67-10.667S26.667 10.12 26.667 16 21.883 26.667 16.003 26.667zm5.847-7.987c-.32-.16-1.893-.933-2.187-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.013 1.333.293.107 1.893.933 2.187 1.04.293.107.507.16.72-.16.213-.32.827-1.04.013-1.333zm-5.847-9.347c-3.693 0-6.667 2.973-6.667 6.667 0 1.227.333 2.4.947 3.413l.147.24-1.04 3.787 3.893-1.013.227.133a6.613 6.613 0 0 0 2.493.493c3.693 0 6.667-2.973 6.667-6.667s-2.974-6.053-6.667-6.053z" />
        </svg>
      </a>
    </div>
  );
}
