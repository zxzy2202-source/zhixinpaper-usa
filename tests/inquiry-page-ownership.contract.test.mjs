import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const contact = await readFile(new URL("../src/app/contact/ContactClient.tsx", import.meta.url), "utf8");
const quickContact = await readFile(new URL("../src/app/contact/QuickContactForm.tsx", import.meta.url), "utf8").catch(() => "");
const quotePage = await readFile(new URL("../src/app/quote/page.tsx", import.meta.url), "utf8");
const quoteForm = await readFile(new URL("../src/app/quote/QuoteForm.tsx", import.meta.url), "utf8");
const quoteApi = await readFile(new URL("../src/app/api/quote/route.ts", import.meta.url), "utf8");
const contactApi = await readFile(new URL("../src/app/api/contact/route.ts", import.meta.url), "utf8");
const samples = await readFile(new URL("../src/app/samples/SamplesClient.tsx", import.meta.url), "utf8");
const samplesPage = await readFile(new URL("../src/app/samples/page.tsx", import.meta.url), "utf8");
const header = await readFile(new URL("../src/components/layout/Header.tsx", import.meta.url), "utf8");
const footer = await readFile(new URL("../src/components/layout/Footer.tsx", import.meta.url), "utf8");

test("Contact is the single public inquiry entry point", () => {
  assert.match(contact, /Contact Zhixin Paper/);
  assert.match(contact, /Get support from Zhixin Paper/);
  assert.match(contact, /Contact information/);
  assert.match(contact, /Why buyers use direct support/);
  assert.match(contact, /Speak to sales directly/);
  assert.match(contact, /Zhixin Paper support network/);
  assert.match(contact, /#006af6/);
  assert.match(contact, /\/images\/contact\/contact-hero\.jpg/);
  assert.match(contact, /href="\/contact\?mode=quote/);
  assert.match(contact, /href="\/contact\?mode=samples/);
  assert.match(contact, /Choose the right request route/);
  for (const key of ["custom-private-label", "own-brand-distribution", "tender-supply", "peer-semi-finished", "peer-overflow-manufacturing"]) {
    assert.match(contact, new RegExp(key));
  }
  assert.match(contact, /Customer path/);
  assert.doesNotMatch(contact, /[\u4e00-\u9fff]/);
  assert.match(contact, /context/);
  assert.match(quoteForm, /customerPath/);
  assert.match(quoteApi, /Customer path/);
  assert.doesNotMatch(contact, /import QuoteForm from "\.\.\/quote\/QuoteForm"/);
  assert.doesNotMatch(contact, /<QuoteForm/);
  assert.match(contact, /<QuickContactForm/);
  assert.match(contact, /customerPath/);
  assert.match(contact, /const href = `\/contact\?context=\$\{path\.key\}#contact-form`/);
  assert.match(contact, /https:\/\/wa\.me\//);
  assert.match(contact, /mailto:/);
  assert.doesNotMatch(contact, /<form/);
  assert.match(quickContact, /<form/);
  assert.equal((quickContact.match(/<form/g) || []).length, 1);
  assert.match(quickContact, /fetch\("\/api\/contact"/);
  assert.match(quickContact, /name="firstName"/);
  assert.match(quickContact, /name="lastName"/);
  assert.match(quickContact, /name="email"/);
  assert.match(quickContact, /name="whatsapp"/);
  assert.match(quickContact, /name="message"/);
  assert.match(quickContact, /type="file"/);
  assert.match(quickContact, /new FormData\(\)/);
  assert.match(quickContact, /customerPath/);
  assert.match(contactApi, /formData\(\)/);
  assert.match(contactApi, /attachments/);
  assert.match(contactApi, /whatsapp/);
  assert.match(contactApi, /"WhatsApp"/);
});

test("Shared navigation routes inquiry CTAs through Contact Us", () => {
  assert.match(header, /href="\/contact"/);
  assert.doesNotMatch(header, /href="\/quote"/);
  assert.doesNotMatch(header, /href="\/samples"/);
  assert.match(footer, /href="\/contact"/);
  assert.doesNotMatch(footer, /href="\/quote"/);
  assert.doesNotMatch(footer, /href="\/samples"/);
});

test("Quote owns the detailed commercial RFQ", () => {
  assert.match(quotePage, /Commercial RFQ/);
  assert.match(quotePage, /Pricing and supply plan/);
  assert.match(quotePage, /href="\/contact"/);
  assert.match(quoteForm, /fetch\("\/api\/quote"/);
  assert.match(quoteForm, /Product interest/);
  assert.match(quoteForm, /Order details/);
});

test("Samples owns product evaluation and shipping qualification", () => {
  assert.match(samples, /Product evaluation request/);
  assert.match(samples, /Sample availability, charges, and courier terms/);
  assert.match(samples, /fetch\("\/api\/samples"/);
  assert.match(samples, /Shipping Address/);
  assert.match(samples, /selectedProducts\.length === 0/);
  assert.match(samplesPage, /Request Thermal Paper Samples for Product Evaluation/);
  assert.doesNotMatch(samplesPage, /Request Free Thermal Paper Samples/);
  assert.match(samples, /href="\/contact\?mode=quote#contact-form"/);
  assert.match(samples, /href="\/contact"/);
});
