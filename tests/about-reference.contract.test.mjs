import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/app/about/page.tsx", import.meta.url), "utf8");
const headerSource = await readFile(new URL("../src/components/layout/Header.tsx", import.meta.url), "utf8");
const footerSource = await readFile(new URL("../src/components/layout/Footer.tsx", import.meta.url), "utf8");

test("About page follows the reference company-profile section contract", () => {
  for (const label of [
    "Company Profile",
    "Vision",
    "Mission",
    "Why Choose Us",
    "Company History",
    "Production Equipment",
    "Resource Center",
    "Our Team",
    "Send Your Inquiry Now",
  ]) {
    assert.match(source, new RegExp(label));
  }
  assert.match(source, /href=\"\/quote\"/);
  assert.match(source, /href=\"\/factory\"/);
  assert.match(source, /\/factory\/quality-control/);
  assert.doesNotMatch(source, /Lorem ipsum/i);
  assert.doesNotMatch(source, /200\+.*Skilled Employee/i);
});

test("About page keeps evidence-led history and buyer language", () => {
  assert.match(source, /Zhixin Paper began on June 1, 2006/);
  assert.match(source, /2006/);
  assert.match(source, /June 1, 2006/);
  assert.match(source, /November 2009/);
  assert.match(source, /Why it matters to buyers/);
  assert.match(source, /Specification-led review/);
  assert.match(source, /about-company-video/);
  assert.match(source, /manufacturing path was built in stages/);
  assert.match(source, /long-term cooperation/);
  assert.match(source, /NCR forms/);
  assert.match(source, /Contact us/);
  assert.match(source, /Quick Quote/);
});

test("About page reflects the verified brand-story timeline", () => {
  for (const fact of [
    "June 1, 2006",
    "November 2009",
    "600 mm",
    "2009–2010",
    "1,800㎡",
    "2011–2017",
    "2022–2025",
    "2026",
    "stable long-term supply",
  ]) {
    assert.match(source, new RegExp(fact));
  }
  assert.doesNotMatch(source, /30\+ tons?\s*\/\s*day/i);
  assert.doesNotMatch(source, /65\s+(?:skilled )?employees?/i);
  assert.doesNotMatch(source, /RMB\s*17\s*million/i);
});

test("About page presents the supplied company culture asset with accessible values", () => {
  assert.match(source, /Company Culture/);
  assert.match(source, /\/images\/about\/company-culture\.png/);
  assert.match(source, /Build confidence in every order/);
  for (const value of [
    "Clear communication",
    "Consistent quality",
    "Reliable delivery",
    "Long-term partnership",
  ]) {
    assert.match(source, new RegExp(value));
  }
});

test("shared brand labels do not contradict the 2006 company story", () => {
  assert.match(headerSource, /Since 2006/);
  assert.match(footerSource, /Since 2006/);
  assert.doesNotMatch(headerSource, /Company Established 2009/);
  assert.doesNotMatch(footerSource, /Company Established 2009/);
});

test("About page uses a fluid full-width shell", () => {
  assert.match(source, /about-shell/);
  assert.doesNotMatch(source, /container-site/);
});

test("About page keeps the reference visual rhythm and media modules", () => {
  assert.match(source, /about-reference\/about-banner\.jpg/);
  assert.match(source, /src="\/images\/logo\.png"/);
  assert.doesNotMatch(source, /about-reference\/brand-strip\.jpg/);
  assert.match(source, /min-h-\[380px\]/);
  assert.match(source, /Vision and Mission/);
  assert.match(source, /Process stories/);
  assert.match(source, /about-reference\/catalog\.jpg/);
  assert.match(source, /Specification-led inquiry/);
  assert.match(source, /type="file"/);
});

test("About page does not carry unsupported reference metrics", () => {
  assert.doesNotMatch(source, /25\+\s*Years Experience/i);
  assert.doesNotMatch(source, /200\+\s*Skilled Employee/i);
  assert.doesNotMatch(source, /20000\+\s*Square Meters/i);
  assert.doesNotMatch(source, /10\+\s*Automatic Manufacturing Line/i);
});

test("About page uses the shared site navigation", () => {
  assert.match(source, /import Header from ["']@\/components\/layout\/Header["']/);
  assert.match(source, /<Header \/>/);
  assert.doesNotMatch(source, /AboutReferenceHeader/);
});
