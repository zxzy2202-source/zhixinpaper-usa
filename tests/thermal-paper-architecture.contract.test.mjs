import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

const architecture = read("src/config/thermalPaperArchitecture.ts");
const hub = read("src/app/products/thermal-paper-rolls/page.tsx");
const header = read("src/components/layout/Header.tsx");

const productSlugs = [
  "standard-pos-rolls",
  "credit-card-terminal-rolls",
  "atm-banking-rolls",
  "lottery-gaming-rolls",
  "casino-tito-rolls",
  "parking-ticketing-rolls",
  "medical-rolls",
  "transport-ticket-rolls",
  "kiosk-vending-rolls",
  "custom-printed-rolls",
  "back-print-thermal-rolls",
];

test("thermal paper architecture exposes five buying paths and eight SKU layers", () => {
  for (const code of ["T1", "T2", "T3", "T4", "T5"]) {
    assert.match(architecture, new RegExp(`code: "${code}"`));
  }
  for (const code of ["L0", "L1", "L2", "L3", "L4", "L5", "L6", "L7"]) {
    assert.match(architecture, new RegExp(`code: "${code}"`));
  }
});

test("every existing roll page belongs to exactly one portfolio group", () => {
  for (const slug of productSlugs) {
    const matches = architecture.match(new RegExp(`"${slug}"`, "g")) ?? [];
    assert.equal(matches.length, 1, `${slug} should appear in exactly one group`);
  }
});

test("performance terms stay evidence-aware modules instead of new URLs", () => {
  assert.match(architecture, /water-resistant/);
  assert.match(architecture, /three-proof/);
  assert.match(architecture, /Long-life and archival candidates/);
  assert.doesNotMatch(architecture, /href: "[^\"]*(water-resistant|three-proof|long-life)/);
  assert.match(architecture, /named medium, contact method, temperature, duration, and pass condition/);
  assert.match(architecture, /no fixed year claim/i);
});

test("thermal paper hub renders products, performance, production, and quote paths", () => {
  assert.match(hub, /THERMAL_PAPER_ROLLS\.map/);
  assert.match(hub, /id="performance-grades"/);
  assert.match(hub, /THERMAL_PAPER_GRADE_PATHS\.map/);
  assert.match(hub, /Production line/);
  assert.match(hub, /Request a Roll Quote/);
  assert.match(hub, /<h1[^>]*>[\s\S]*Thermal Paper Rolls[\s\S]*<\/h1>/);
  assert.doesNotMatch(hub, /<h1[^>]*>[\s\S]*(Europe|USA|Canada|Mexico|North America)[\s\S]*<\/h1>/);
});

test("products mega menu routes rolls by commercial tier", () => {
  assert.match(header, /THERMAL_PAPER_TIERS\.map/);
  assert.match(header, /Compare all thermal paper paths/);
  assert.doesNotMatch(header, /THERMAL_PAPER_ROLLS\.slice\(0, 5\)/);
});
