import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("product explorer keeps accessible filter and result states", () => {
  const explorer = read("src/components/products/ProductExplorer.tsx");
  assert.match(explorer, /aria-pressed=/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /<details/);
  assert.match(explorer, /No products match these filters\./);
  assert.match(explorer, /Clear filters/);
  assert.match(explorer, /Request a Quote/);
});

test("product explorer restores and publishes URL state", () => {
  const explorer = read("src/components/products/ProductExplorer.tsx");
  assert.match(explorer, /parseProductFilters\(window\.location\.search\)/);
  assert.match(explorer, /window\.history\.pushState/);
  assert.match(explorer, /addEventListener\("popstate"/);
  assert.match(explorer, /removeEventListener\("popstate"/);
});

test("products page keeps crawlable SEO entities", () => {
  const page = read("src/app/products/page.tsx");
  assert.match(page, /CollectionPage/);
  assert.match(page, /ItemList/);
  assert.match(page, /faqSchema/);
  assert.match(page, /alternates: \{ canonical:/);
});

test("products page supplies the complete catalog to the explorer", () => {
  const page = read("src/app/products/page.tsx");
  assert.match(page, /import ProductExplorer from "@\/components\/products\/ProductExplorer"/);
  assert.match(page, /createProductExplorerItems\(THERMAL_PAPER_ROLLS, THERMAL_LABELS\)/);
  assert.match(page, /<ProductExplorer items=\{productExplorerItems\}/);
  assert.doesNotMatch(page, /const bestSellingProducts =/);
  assert.doesNotMatch(page, /const compareRows =/);
  assert.doesNotMatch(page, /const productDirectory =/);
});
