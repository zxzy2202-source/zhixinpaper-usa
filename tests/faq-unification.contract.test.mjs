import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const sharedFaqPages = [
  "src/app/faq/page.tsx",
  "src/app/us/page.tsx",
  "src/app/ca/page.tsx",
  "src/app/eu/page.tsx",
  "src/app/eu/[country]/page.tsx",
  "src/app/mx/page.tsx",
  "src/app/products/page.tsx",
  "src/app/products/thermal-paper-rolls/page.tsx",
  "src/app/products/thermal-labels/page.tsx",
  "src/app/compliance/bpa-free/page.tsx",
  "src/app/industries/[slug]/page.tsx",
  "src/components/products/StandardPosRollPage.tsx",
  "src/components/products/AtmBankingRollPage.tsx",
  "src/components/products/PaymentTerminalRollPage.tsx",
];

test("public FAQ surfaces use the shared accessible template", () => {
  const component = read("src/components/ui/FaqSection.tsx");
  assert.match(component, /<details/);
  assert.match(component, /<summary/);
  assert.match(component, /group-open:rotate-90/);
  assert.match(component, /id=\{id\}/);

  for (const path of sharedFaqPages) {
    const source = read(path);
    assert.match(source, /FaqSection/, `${path} must use FaqSection`);
  }
});

test("FAQ schema is sourced from the visible FAQ data on migrated pages", () => {
  const schemaPages = [
    ["src/app/faq/page.tsx", "faqSchema(allFaqs)"],
    ["src/app/us/page.tsx", "faqSchema(faqs)"],
    ["src/app/ca/page.tsx", "faqSchema(faqs)"],
    ["src/app/eu/page.tsx", "faqSchema(faqs)"],
    ["src/app/eu/[country]/page.tsx", "faqSchema(faqs)"],
    ["src/app/mx/page.tsx", "faqSchema(FAQS)"],
    ["src/app/compliance/bpa-free/page.tsx", "faqSchema(FAQS)"],
    ["src/app/products/page.tsx", "faqSchema(productFaqs"],
    ["src/app/products/thermal-paper-rolls/page.tsx", "faqSchema(THERMAL_ROLL_FAQS"],
    ["src/app/products/thermal-labels/page.tsx", "faqSchema(THERMAL_LABEL_FAQS"],
  ];

  for (const [path, schemaCall] of schemaPages) {
    const source = read(path);
    assert.match(source, new RegExp(schemaCall.replace(/[()[\]]/g, "\\$&")), `${path} must keep FAQ schema`);
    assert.match(source, /<FaqSection[\s\S]*faqs=\{/ , `${path} must render the FAQ data visibly`);
  }

  const industry = read("src/app/industries/[slug]/page.tsx");
  assert.match(industry, /const faqs = buildIndustryFaqs/);
  assert.match(industry, /mainEntity: faqs\.map/);
  assert.match(industry, /<FaqSection[\s\S]*faqs=\{faqs\}/);
});

test("EU country FAQ keeps country-specific fallback and product routes avoid duplicate POS FAQ", () => {
  const country = read("src/app/eu/[country]/page.tsx");
  assert.match(country, /COUNTRY_FAQ\[country\] \|\| COUNTRY_FAQ\["default"\]/);
  assert.match(country, /const faqs = faq\.map\(normalizeFaqItem\)/);

  const product = read("src/app/products/thermal-paper-rolls/[slug]/page.tsx");
  assert.doesNotMatch(product, /STANDARD_POS_PAGE\.faqs\.map\(\(faq\) =>/);
  assert.match(read("src/components/products/StandardPosRollPage.tsx"), /<FaqSection/);
});
