import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const data = read("src/lib/data.ts");
const dynamicRollPage = read("src/app/products/thermal-paper-rolls/[slug]/page.tsx");
const paymentPage = read("src/components/products/PaymentTerminalRollPage.tsx");
const posPage = read("src/components/products/StandardPosRollPage.tsx");
const compliancePage = read("src/app/compliance/bpa-free/page.tsx");
const nextConfig = read("next.config.mjs");
const blogPage = read("src/app/blog/[slug]/page.tsx");
const blogContent = read("src/lib/blog-content.ts");
const header = read("src/components/layout/Header.tsx");
const footer = read("src/components/layout/Footer.tsx");
const llms = read("public/llms.txt");

test("POS receipt page keeps a product H1 and links buyer tools", () => {
  assert.match(posPage, />\s*POS receipt paper rolls built for repeat wholesale orders\.\s*</);
  assert.doesNotMatch(posPage, /<h1[^>]*>[\s\S]*Europe, USA and Canada[\s\S]*<\/h1>/);
  assert.match(posPage, /thermal-paper-roll-sizes-guide/);
  assert.match(posPage, /thermal-paper-printer-compatibility-guide/);
  assert.match(posPage, /credit-card-terminal-rolls/);
});

test("credit card terminal cluster has one model-qualified product owner", () => {
  assert.match(data, /slug: "credit-card-terminal-rolls"/);
  assert.match(dynamicRollPage, /Credit Card Terminal Paper Rolls & Sizes/);
  assert.match(dynamicRollPage, /DefinedTermSet/);
  assert.match(dynamicRollPage, /PAYMENT_TERMINAL_FAQS/);
  assert.match(dynamicRollPage, /PaymentTerminalRollPage/);
  assert.match(paymentPage, /<h1[^>]*>[\s\S]*Credit Card Terminal Paper Rolls[\s\S]*<\/h1>/);
  for (const term of ["Payment terminal rolls", "EDC rolls", "EFTPOS rolls", "Terminal brand and exact model"]) {
    assert.match(paymentPage, new RegExp(term));
  }
});

test("BPA BPS and phenol-free terms share one evidence-aware owner", () => {
  assert.match(compliancePage, /aria-label="BPA-Free, BPS-Free and Phenol-Free Thermal Paper"/);
  for (const line of ["BPA-Free & BPS-Free", "Phenol-Free", "Thermal Paper"]) {
    assert.ok(compliancePage.includes(line));
  }
  assert.match(compliancePage, /DefinedTermSet/);
  assert.match(compliancePage, /FAQPage|faqSchema/);
  assert.doesNotMatch(compliancePage, /100% BPA-free|All Zhixin Paper thermal paper products are manufactured without/);
  assert.doesNotMatch(data, /slug: "phenol-free"/);
  assert.match(nextConfig, /source: "\/compliance\/phenol-free"[\s\S]*destination: "\/compliance\/bpa-free"[\s\S]*statusCode: 301/);
});

test("size and compatibility guides keep distinct keyword owners", () => {
  for (const slug of ["thermal-paper-roll-sizes-guide", "thermal-paper-printer-compatibility-guide"]) {
    assert.match(data, new RegExp(`slug: "${slug}"`));
    assert.match(blogContent, new RegExp(`slug: "${slug}"`));
    assert.match(blogPage, new RegExp(`"${slug}"`));
    assert.match(header, new RegExp(slug));
    assert.match(footer, new RegExp(slug));
    assert.match(llms, new RegExp(slug));
  }
  assert.match(blogContent, /exact printer or terminal model/i);
  assert.match(blogContent, /width, length or OD, core ID, winding/i);
});

test("llms publishes unique cluster-to-page ownership", () => {
  assert.match(llms, /## Keyword and page ownership/);
  assert.match(llms, /credit card terminal paper rolls.*Credit Card Terminal Paper Rolls page/is);
  assert.match(llms, /BPA free thermal paper.*compliance terminology page/is);
  assert.match(llms, /thermal printer paper.*printer compatibility guide/is);
});
