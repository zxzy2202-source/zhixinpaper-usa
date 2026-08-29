import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const contact = await readFile(new URL("../src/app/contact/ContactClient.tsx", import.meta.url), "utf8");
const quickContact = await readFile(new URL("../src/app/contact/QuickContactForm.tsx", import.meta.url), "utf8").catch(() => "");
const quotePage = await readFile(new URL("../src/app/quote/page.tsx", import.meta.url), "utf8");
const quoteForm = await readFile(new URL("../src/app/quote/QuoteForm.tsx", import.meta.url), "utf8");
const samples = await readFile(new URL("../src/app/samples/SamplesClient.tsx", import.meta.url), "utf8");
const samplesPage = await readFile(new URL("../src/app/samples/page.tsx", import.meta.url), "utf8");

test("Contact adapts the supplied support-page structure without duplicating the RFQ", () => {
  assert.match(contact, /Contact Zhixin Paper/);
  assert.match(contact, /Get support from Zhixin Paper/);
  assert.match(contact, /Contact information/);
  assert.match(contact, /Why buyers use direct support/);
  assert.match(contact, /Speak to sales directly/);
  assert.match(contact, /Zhixin Paper support network/);
  assert.match(contact, /#006af6/);
  assert.match(contact, /\/images\/contact\/contact-hero\.jpg/);
  assert.match(contact, /href="\/quote"/);
  assert.match(contact, /href="\/samples"/);
  assert.match(contact, /https:\/\/wa\.me\//);
  assert.match(contact, /mailto:/);
  assert.doesNotMatch(contact, /<form/);
  assert.match(quickContact, /<form/);
  assert.equal((quickContact.match(/<form/g) || []).length, 1);
  assert.match(quickContact, /fetch\("\/api\/contact"/);
  assert.match(quickContact, /name="firstName"/);
  assert.match(quickContact, /name="lastName"/);
  assert.match(quickContact, /name="email"/);
  assert.match(quickContact, /name="message"/);
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
  assert.match(samples, /href="\/quote"/);
  assert.match(samples, /href="\/contact"/);
});
