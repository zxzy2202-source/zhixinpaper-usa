import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../src/app/about/page.tsx", import.meta.url), "utf8");
const headerSource = await readFile(new URL("../src/components/layout/Header.tsx", import.meta.url), "utf8");
const aboutHeaderSource = await readFile(new URL("../src/components/layout/AboutReferenceHeader.tsx", import.meta.url), "utf8");
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
  assert.match(source, /Xi['’]an Zhi Xin Paper Co/);
  assert.match(source, /2006/);
  assert.match(source, /June 1, 2006/);
  assert.match(source, /November 2008/);
  assert.match(source, /Why it matters to buyers/);
  assert.match(source, /Specification-led review/);
  assert.match(source, /about-company-video/);
  assert.match(source, /Years of supply development/);
  assert.match(source, /Contact us/);
  assert.match(source, /Quick Quote/);
});

test("About page reflects the verified brand-story timeline", () => {
  for (const fact of [
    "June 1, 2006",
    "November 2008",
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

test("shared brand labels do not contradict the 2006 company story", () => {
  assert.match(headerSource, /Since 2006/);
  assert.match(footerSource, /Since 2006/);
  assert.doesNotMatch(headerSource, /Company Established 2009/);
  assert.doesNotMatch(footerSource, /Company Established 2009/);
});

test("About page uses a fluid full-width shell", () => {
  assert.match(source, /about-shell/);
  assert.match(aboutHeaderSource, /about-shell/);
  assert.doesNotMatch(source, /container-site/);
  assert.doesNotMatch(aboutHeaderSource, /container-site/);
});
