"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "zhixin-cookie-consent";

type ConsentChoice = "accepted" | "essential";

declare global {
  interface Window {
    okkiConfigs?: unknown[];
    okkiAdd?: (...args: unknown[]) => void;
  }
}

function loadOkkiAnalytics() {
  if (document.querySelector('script[data-okki-analytics="true"]')) return;

  window.okkiConfigs = window.okkiConfigs || [];
  window.okkiAdd = (...args: unknown[]) => window.okkiConfigs?.push(args);
  window.okkiAdd("analytics", { siteId: "68611-18549", gId: "" });

  const script = document.createElement("script");
  script.src = "https://tfile.xiaoman.cn/okki/analyze.js?id=68611-18549-";
  script.async = true;
  script.dataset.okkiAnalytics = "true";
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(CONSENT_KEY);
    if (savedChoice === "accepted" || savedChoice === "essential") {
      setChoice(savedChoice);
      if (savedChoice === "accepted") loadOkkiAnalytics();
    }
    setReady(true);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_KEY, nextChoice);
    setChoice(nextChoice);
    if (nextChoice === "accepted") loadOkkiAnalytics();
  };

  if (!ready || choice) return null;

  return (
    <aside
      aria-label="Cookie preferences"
      className="fixed inset-x-4 bottom-4 z-[120] mx-auto max-w-3xl border border-[#c8bcaa] bg-[#fbfaf6] p-5 shadow-[0_20px_60px_rgba(20,33,31,0.22)] sm:p-6"
    >
      <h2 className="text-base font-bold text-[#14211f]">Your privacy choices</h2>
      <p className="mt-2 text-sm leading-6 text-[#4f5f5a]">
        Essential storage keeps your cookie choice. With your permission, we also use OKKI analytics to understand visits and support sales enquiries. Read our{" "}
        <Link href="/cookie-policy" className="font-semibold text-[#0f5f5c] underline underline-offset-2">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => saveChoice("essential")}
          className="min-h-11 border border-[#9d927f] bg-white px-5 py-2.5 text-sm font-semibold text-[#33413e] hover:border-[#0f5f5c] hover:text-[#0f5f5c]"
        >
          Essential only
        </button>
        <button
          type="button"
          onClick={() => saveChoice("accepted")}
          className="min-h-11 bg-[#0f5f5c] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a4745]"
        >
          Accept analytics
        </button>
      </div>
    </aside>
  );
}
