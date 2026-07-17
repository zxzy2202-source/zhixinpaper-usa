import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-sans)"],
        body: ["var(--font-sans)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        brand: {
          blue: "#1d4ed8",
          "blue-dark": "#1e40af",
          "blue-light": "#3b82f6",
          accent: "#0ea5e9",
          "accent-light": "#38bdf8",
        },
        surface: {
          base: "#ffffff",
          soft: "#f8fafc",
          muted: "#f1f5f9",
          border: "#e2e8f0",
          "border-strong": "#cbd5e1",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#94a3b8",
          blue: "#1d4ed8",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)",
        "blue-soft": "linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 30px rgba(29,78,216,0.1)",
        "blue-glow": "0 6px 20px rgba(29,78,216,0.35)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "slide-in-left": "slideInLeft 0.5s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#475569",
            "--tw-prose-headings": "#0f172a",
            "--tw-prose-links": "#1d4ed8",
            "--tw-prose-bold": "#0f172a",
            "--tw-prose-counters": "#475569",
            "--tw-prose-bullets": "#94a3b8",
            "--tw-prose-hr": "#e2e8f0",
            "--tw-prose-quotes": "#475569",
            "--tw-prose-code": "#0f172a",
            "--tw-prose-pre-bg": "#f8fafc",
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
