"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToHash() {
  const pathname = usePathname();
  const lastHandled = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToTarget = () => {
      const hash = window.location.hash;
      if (!hash || hash.length <= 1) return;

      // Avoid re-scrolling for the same hash+path combo in strict mode
      const key = `${pathname}${hash}`;
      if (lastHandled.current === key) return;
      lastHandled.current = key;

      // Let the browser finish paint before scrolling
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const id = decodeURIComponent(hash.slice(1));
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    };

    // Handle initial load with hash
    scrollToTarget();

    // Also handle in-page hash changes (e.g., clicking same-page anchor links)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash || hash.length <= 1) return;
      const key = `${pathname}${hash}`;
      if (lastHandled.current === key) return;
      lastHandled.current = key;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const id = decodeURIComponent(hash.slice(1));
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        });
      });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [pathname]);

  return null;
}
