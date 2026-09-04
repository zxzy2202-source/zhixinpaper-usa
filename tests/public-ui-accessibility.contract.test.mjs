import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("mobile navigation behaves like an accessible modal", async () => {
  const header = await source("src/components/layout/Header.tsx");

  assert.match(header, /event\.key === "Escape"/);
  assert.match(header, /document\.body\.style\.overflow = "hidden"/);
  assert.match(header, /role="dialog"/);
  assert.match(header, /aria-modal="true"/);
  assert.match(header, /mobileCloseRef\.current\?\.focus\(\)/);
  assert.match(header, /button:not\(\[disabled\]\):not\(\[tabindex="-1"\]\)/);
});

test("navigation exposes current state and valid submenu ids", async () => {
  const header = await source("src/components/layout/Header.tsx");

  assert.match(header, /aria-current=\{active \? "page" : undefined\}/);
  assert.match(header, /mobileExpanded === label \? getMobileSubmenuId\(label\) : undefined/);
  assert.doesNotMatch(header, /mobile-submenu-\$\{label\.toLowerCase\(\)\}/);
});

test("mobile navigation and footer links meet touch target guidance", async () => {
  const header = await source("src/components/layout/Header.tsx");
  const footer = await source("src/components/layout/Footer.tsx");

  assert.match(header, /min-h-11 min-w-11/);
  assert.match(footer, /min-h-11/);
  assert.match(footer, /href=\{`tel:\$\{COMPANY\.phone\}`\} className="inline-flex min-h-11/);
  assert.match(footer, /href=\{`mailto:\$\{COMPANY\.email\}`\} className="inline-flex min-h-11/);
  assert.match(footer, /<h2 className=/);
  assert.doesNotMatch(footer, /<h4 className=/);
});

test("audited helper text uses accessible contrast colors", async () => {
  const productPage = await source("src/app/products/thermal-paper-rolls/page.tsx");
  const contactPage = await source("src/app/contact/ContactClient.tsx");
  const contactForm = await source("src/app/contact/QuickContactForm.tsx");

  assert.doesNotMatch(productPage, /text-\[#87918c\] text-xs/);
  assert.doesNotMatch(productPage, /text-\[#128C7E\]/);
  assert.doesNotMatch(contactPage, /text-\[#91a0b2\]/);
  assert.doesNotMatch(contactPage, /text-\[#7a8ba0\]/);
  assert.doesNotMatch(contactForm, /text-\[#91a0b2\]/);
  assert.doesNotMatch(contactForm, /text-\[#7a8ba0\]/);
});

test("contact page keeps customer paths compact on mobile", async () => {
  const contactPage = await source("src/app/contact/ContactClient.tsx");

  assert.match(contactPage, /mx-auto flex max-w-\[1320px\] flex-col/);
  assert.match(contactPage, /<section className="order-4 mt-14[^\"]*lg:order-3"/);
  assert.match(contactPage, /id="contact-form" className="order-3[^\"]*lg:order-4[^\"]*"/);
  assert.match(contactPage, /snap-x snap-mandatory/);
  assert.match(contactPage, /Swipe or tab to compare customer paths/);
  assert.match(contactPage, /min-w-\[85%\] snap-start/);
});

test("contact submission status is announced and motion-safe", async () => {
  const contactForm = await source("src/app/contact/QuickContactForm.tsx");

  assert.match(contactForm, /aria-live="polite"/);
  assert.match(contactForm, /motion-reduce:animate-none/);
  assert.match(contactForm, /Sending…/);
  assert.match(contactForm, /Company <span className="font-normal/);
});
