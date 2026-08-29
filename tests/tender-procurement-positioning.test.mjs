import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage speaks to international tender and project procurement teams", () => {
  const page = read("src/app/page.tsx");
  assert.match(page, /international contractors, tendering companies, and project procurement teams/i);
  assert.match(page, /bid specification/i);
  assert.match(page, /project procurement/i);
  assert.match(page, /href="\/quote"/);
});

test("quote flow captures tender stage and required-by timing", () => {
  const page = read("src/app/quote/page.tsx");
  const form = read("src/app/quote/QuoteForm.tsx");
  assert.match(page, /project RFQ/i);
  assert.match(form, /projectStage/);
  assert.match(form, /requiredBy/);
  assert.match(form, /Tender stage/i);
  assert.match(form, /Required by/i);
});

test("quote API forwards project qualification details", () => {
  const route = read("src/app/api/quote/route.ts");
  assert.match(route, /projectStage/);
  assert.match(route, /requiredBy/);
  assert.match(route, /Project stage/);
  assert.match(route, /Required by/);
});
