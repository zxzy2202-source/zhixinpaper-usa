
# Product Hub Discovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Turn /products into a fast B2B product-discovery hub with product-line routing, use-case shortcuts, local filters, URL-restorable state, compact procurement cards, and preserved SEO/GEO output.

**Architecture:** Keep src/app/products/page.tsx as the server-rendered owner of metadata, JSON-LD, static product-line content, and catalog normalization. Add one pure TypeScript model for classification/filtering/query serialization and one focused client component for controls, local state, history synchronization, result rendering, and mobile behavior. The initial client render contains the full catalog so the server HTML remains crawlable.

**Tech Stack:** Next.js 16 App Router, React 18, TypeScript, Tailwind CSS 4, Lucide React, Node test runner with tsx, Playwright CLI.

---

## File Map

- Create: src/components/products/productExplorerModel.ts - shared types, filter options, catalog normalization, filtering, and query parsing/serialization.
- Create: src/components/products/ProductExplorer.tsx - interactive filter UI and compact product results.
- Modify: src/app/products/page.tsx - normalized explorer items, preserved JSON-LD, reduced duplicate catalog sections, and explorer placement.
- Create: tests/product-explorer.test.ts - model behavior tests.
- Create: tests/product-hub.contract.test.mjs - source contract for SEO and accessibility hooks.
- Modify: package.json - deterministic focused test commands only.

## Locked Interaction Rules

- Product line is single-select.
- Multiple application selections use OR semantics.
- Multiple procurement attributes use AND semantics.
- Unknown query values are ignored.
- Filter changes use history.pushState; popstate restores prior states.
- The initial server render shows all products; query filters apply after hydration.
- Mobile filters use an in-flow details panel, not an overlay.

### Task 1: Add The Tested Product Explorer Model

**Files:**
- Create: tests/product-explorer.test.ts
- Create: src/components/products/productExplorerModel.ts
- Modify: package.json

- [ ] **Step 1: Add focused test scripts**

Add these script entries to package.json:

~~~json
"test:product-explorer": "node --import tsx --test tests/product-explorer.test.ts",
"test:contracts": "node --test tests/thermal-paper-keyword-owners.contract.test.mjs tests/product-hub.contract.test.mjs"
~~~

- [ ] **Step 2: Write the failing model tests**

Create tests/product-explorer.test.ts. The tests must cover normalized records, line URLs, application classification, OR application matching, AND feature matching, empty filters, unknown query values, and stable serialization.

~~~ts
import assert from "node:assert/strict";
import test from "node:test";
import {
  EMPTY_PRODUCT_FILTERS,
  createProductExplorerItems,
  filterExplorerItems,
  parseProductFilters,
  serializeProductFilters,
  type ProductExplorerSource,
} from "../src/components/products/productExplorerModel.ts";

const rolls: ProductExplorerSource[] = [
  {
    slug: "standard-pos-rolls",
    name: "Standard POS Rolls",
    subtitle: "Receipt paper",
    applications: ["Retail POS", "Restaurants"],
    sizes: ["57x40mm", "80x80mm"],
    features: ["BPA-free", "OEM private-label carton printing"],
    moq: "10,000 rolls",
    specifications: { "Core Options": "12mm / 17mm / 25mm" },
  },
  {
    slug: "atm-banking-rolls",
    name: "ATM & Bank Receipt Rolls",
    subtitle: "Archival receipt paper",
    applications: ["ATM machines", "Bank teller terminals"],
    sizes: ["80x80mm"],
    features: ["Optional back-print", "BPA-free"],
    moq: "5,000 rolls",
    specifications: { "Image Life": "7 years" },
  },
];

const labels: ProductExplorerSource[] = [
  {
    slug: "direct-thermal-labels",
    name: "Direct Thermal Labels",
    subtitle: "Shipping and logistics",
    applications: ["Amazon FBA fulfillment", "3PL warehouse operations"],
    sizes: ["4x6 inch", "100x150mm"],
    features: ["Roll and fanfold", "Permanent and removable adhesive"],
    moq: "50,000 labels",
    specifications: { "Label Format": "Roll / Fanfold" },
  },
  {
    slug: "freezer-cold-chain-labels",
    name: "Freezer & Cold Chain Labels",
    subtitle: "Freeze labels",
    applications: ["Frozen food", "Pharmaceutical cold chain"],
    sizes: ["100x50mm"],
    features: ["Low-temperature adhesive", "Moisture resistant"],
    moq: "25,000 labels",
    specifications: { "Min. Temperature": "-40 C" },
  },
];

const items = createProductExplorerItems(rolls, labels);

test("normalizes records and classifies applications", () => {
  assert.equal(items.length, 4);
  assert.equal(items[0].href, "/products/thermal-paper-rolls/standard-pos-rolls");
  assert.equal(items[2].href, "/products/thermal-labels/direct-thermal-labels");
  assert.ok(items[0].applicationTags.includes("pos"));
  assert.ok(items[1].applicationTags.includes("banking"));
  assert.ok(items[2].applicationTags.includes("shipping"));
  assert.ok(items[3].applicationTags.includes("cold-chain"));
});

test("uses OR for applications and AND for attributes", () => {
  const result = filterExplorerItems(items, {
    line: "labels",
    applications: ["shipping", "cold-chain"],
    features: ["roll-fanfold"],
  });
  assert.deepEqual(result.map((item) => item.name), ["Direct Thermal Labels"]);
});

test("returns the full catalog for empty filters", () => {
  assert.equal(filterExplorerItems(items, EMPTY_PRODUCT_FILTERS).length, 4);
});

test("ignores unsupported query values", () => {
  assert.deepEqual(
    parseProductFilters("?line=labels&use=shipping&use=unknown&feature=freezer-grade"),
    { line: "labels", applications: ["shipping"], features: ["freezer-grade"] },
  );
});

test("serializes filters in stable option order", () => {
  assert.equal(
    serializeProductFilters({
      line: "rolls",
      applications: ["banking", "pos"],
      features: ["bpa-free", "custom-print"],
    }),
    "line=rolls&use=pos&use=banking&feature=bpa-free&feature=custom-print",
  );
});
~~~

- [ ] **Step 3: Run the test and confirm the missing-module failure**

~~~powershell
npm.cmd run test:product-explorer
~~~

Expected: FAIL because productExplorerModel.ts does not exist.

- [ ] **Step 4: Implement the pure model**

Create src/components/products/productExplorerModel.ts. Export PRODUCT_LINE_OPTIONS, APPLICATION_OPTIONS, FEATURE_OPTIONS, ProductFilters, ProductExplorerSource, ProductExplorerItem, EMPTY_PRODUCT_FILTERS, createProductExplorerItems, filterExplorerItems, parseProductFilters, and serializeProductFilters.

Use these exact option and type definitions:

~~~ts
export const PRODUCT_LINE_OPTIONS = [
  { value: "rolls", label: "Paper rolls" },
  { value: "labels", label: "Thermal labels" },
] as const;

export const APPLICATION_OPTIONS = [
  { value: "pos", label: "POS & receipts" },
  { value: "shipping", label: "Shipping & warehouse" },
  { value: "banking", label: "ATM & banking" },
  { value: "ticketing", label: "Ticketing & gaming" },
  { value: "cold-chain", label: "Cold chain & food" },
  { value: "healthcare", label: "Healthcare & labs" },
  { value: "industrial", label: "Industrial" },
  { value: "retail", label: "Retail labeling" },
] as const;

export const FEATURE_OPTIONS = [
  { value: "bpa-free", label: "BPA-free route" },
  { value: "freezer-grade", label: "Freezer grade" },
  { value: "permanent", label: "Permanent adhesive" },
  { value: "removable", label: "Removable adhesive" },
  { value: "roll-fanfold", label: "Roll / fanfold" },
  { value: "custom-print", label: "Custom print / OEM" },
] as const;

export type ProductLineFilter = (typeof PRODUCT_LINE_OPTIONS)[number]["value"];
export type ApplicationFilter = (typeof APPLICATION_OPTIONS)[number]["value"];
export type FeatureFilter = (typeof FEATURE_OPTIONS)[number]["value"];

export type ProductFilters = {
  line: ProductLineFilter | null;
  applications: ApplicationFilter[];
  features: FeatureFilter[];
};

export type ProductExplorerSource = {
  slug: string;
  name: string;
  subtitle: string;
  applications: string[];
  sizes: string[];
  features: string[];
  moq: string;
  specifications: Record<string, string>;
};

export type ProductExplorerItem = {
  name: string;
  href: string;
  line: ProductLineFilter;
  applications: string[];
  specifications: string[];
  moq: string;
  applicationTags: ApplicationFilter[];
  featureTags: FeatureFilter[];
};
~~~

Normalization requirements:

- Output roll URLs under /products/thermal-paper-rolls/ and label URLs under /products/thermal-labels/.
- Keep at most three applications and four sizes per item.
- Classify against the concatenation of name, subtitle, applications, features, and specification values.
- Application matchers: POS/cash register/supermarket/restaurant; shipping/warehouse/logistics/FBA; ATM/bank/payment/EDC/EFTPOS; lottery/gaming/casino/ticket/parking/transport; freezer/cold chain/frozen/food; medical/hospital/pharmacy/lab/specimen/wristband; industrial/chemical/automotive/electronics/outdoor/high temperature; retail/price tag/shelf.
- Feature matchers: BPA/BPS/phenol-free; freezer/low-temperature; permanent; removable/clean peel/low-tack; fanfold; custom print/back-print/private label/OEM/artwork.
- Application filters match with some; feature filters match with every.
- URLSearchParams uses repeated use and feature keys, removes duplicates, rejects unsupported values, and serializes in option declaration order.

- [ ] **Step 5: Run the model tests**

~~~powershell
npm.cmd run test:product-explorer
~~~

Expected: 5 tests PASS.

- [ ] **Step 6: Commit the model**

~~~powershell
git add package.json tests/product-explorer.test.ts src/components/products/productExplorerModel.ts
git commit -m "feat: add product explorer filter model"
~~~

### Task 2: Build The Accessible Product Explorer

**Files:**
- Create: src/components/products/ProductExplorer.tsx
- Create: tests/product-hub.contract.test.mjs

- [ ] **Step 1: Write the failing component contract**

Create tests/product-hub.contract.test.mjs:

~~~js
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
~~~

- [ ] **Step 2: Run the contract and confirm the missing-file failure**

~~~powershell
node --test tests/product-hub.contract.test.mjs
~~~

Expected: FAIL because ProductExplorer.tsx does not exist.

- [ ] **Step 3: Implement ProductExplorer.tsx**

Use "use client" and accept items: ProductExplorerItem[]. Define toggleValue, FilterGroup, FilterControls, and labelFor outside the component.

Required implementation behavior:

1. useState starts with EMPTY_PRODUCT_FILTERS, so the server render contains every product.
2. One useEffect reads parseProductFilters(window.location.search), registers popstate, and removes it in cleanup.
3. useMemo calls filterExplorerItems(items, filters).
4. commitFilters updates state, serializes filters, and calls window.history.pushState(null, "", pathname + query + "#product-explorer").
5. Four shortcut buttons set one application: pos, shipping, banking, or cold-chain.
6. Desktop renders a sticky aside; mobile renders an in-flow details/summary panel labeled Filter products.
7. Both layouts reuse FilterControls.
8. FilterGroup uses fieldset, legend, 44px buttons, and aria-pressed.
9. A dark result rail has aria-live="polite", result count, the combination rule, and Request a Quote.
10. Active chips remove individual values and include Clear all.
11. Cards show line, name, up to three applications, up to four sizes, MOQ, and View product.
12. The empty state says No products match these filters. and exposes Clear filters and Request a Quote.
13. There are no API requests, fixed filter overlays, or new dependencies.

Use existing design tokens and Tailwind classes: ink #101b19, paper #fbfaf6/#f4f0e8, teal #0f5f5c, gold #9c661d, border #ded6c8. Use one card column on mobile, two at md, three at xl. Every interactive control gets min-h-11. The explorer section id is product-explorer and its H2 is Find the product by use case or buying requirement.

- [ ] **Step 4: Run lint for new files**

~~~powershell
npx.cmd eslint src/components/products/ProductExplorer.tsx src/components/products/productExplorerModel.ts
~~~

Expected: PASS with no errors.

- [ ] **Step 5: Commit the client component**

~~~powershell
git add src/components/products/ProductExplorer.tsx tests/product-hub.contract.test.mjs
git commit -m "feat: build accessible product explorer"
~~~

### Task 3: Integrate The Explorer Into The Server Product Hub

**Files:**
- Modify: src/app/products/page.tsx
- Test: tests/product-hub.contract.test.mjs

- [ ] **Step 1: Extend the contract before integration**

Append:

~~~js
test("products page supplies the complete catalog to the explorer", () => {
  const page = read("src/app/products/page.tsx");
  assert.match(page, /import ProductExplorer from "@\/components\/products\/ProductExplorer"/);
  assert.match(page, /createProductExplorerItems\(THERMAL_PAPER_ROLLS, THERMAL_LABELS\)/);
  assert.match(page, /<ProductExplorer items=\{productExplorerItems\}/);
  assert.doesNotMatch(page, /const bestSellingProducts =/);
  assert.doesNotMatch(page, /const compareRows =/);
  assert.doesNotMatch(page, /const productDirectory =/);
});
~~~

- [ ] **Step 2: Run the contract and confirm integration assertions fail**

~~~powershell
node --test tests/product-hub.contract.test.mjs
~~~

Expected: SEO assertions PASS and the integration assertion FAILS.

- [ ] **Step 3: Add server normalization and preserve JSON-LD**

Import ProductExplorer and createProductExplorerItems. Inside ProductsPage, create:

~~~tsx
const productExplorerItems = createProductExplorerItems(
  THERMAL_PAPER_ROLLS,
  THERMAL_LABELS,
);
~~~

Replace the old directory flattening in ItemList JSON-LD:

~~~tsx
itemListElement: productExplorerItems.map((item, index) => ({
  "@type": "ListItem",
  position: index + 1,
  name: item.name,
  url: canonicalUrl(item.href),
})),
~~~

Keep CollectionPage, BreadcrumbList, FAQPage, metadata, and canonical configuration unchanged.

- [ ] **Step 4: Remove duplicate catalog content**

Delete bestSellingProducts, compareRows, and productDirectory constants. Delete the JSX sections that map those arrays and the section whose aria-labelledby is complete-product-directory. Keep productFaqs, quoteFields, buyingChecks, sourcingSummary, sourcingProof, and all JSON-LD data.

- [ ] **Step 5: Put discovery immediately after product-line routing**

Move the existing product-sourcing-summary section below product-lines. Immediately after section id="product-lines", render:

~~~tsx
<ProductExplorer items={productExplorerItems} />
~~~

Required section order: Hero, Product lines, ProductExplorer, product sourcing summary, buying and quote guidance, FAQ, CTA/Footer.

- [ ] **Step 6: Lint and remove only imports made unused**

~~~powershell
npx.cmd eslint src/app/products/page.tsx
~~~

Do not alter unrelated shared components or product records.

- [ ] **Step 7: Run focused tests and commit**

~~~powershell
npm.cmd run test:product-explorer
npm.cmd run test:contracts
git add src/app/products/page.tsx tests/product-hub.contract.test.mjs
git commit -m "feat: integrate product finder into product hub"
~~~

Expected: all focused tests PASS.

### Task 4: Verify SEO, Build, And Static Output

**Files:**
- Modify only if verification exposes a product-hub regression.

- [ ] **Step 1: Run focused tests and project lint**

~~~powershell
npm.cmd run test:product-explorer
npm.cmd run test:contracts
npm.cmd run lint
~~~

Expected: focused tests PASS and no new product-hub lint errors.

- [ ] **Step 2: Run a production build**

~~~powershell
npm.cmd run build
~~~

Expected: build succeeds and /products appears in route output.

- [ ] **Step 3: Verify server HTML retains catalog and SEO**

Confirm port 3010 is free, then start the built app:

~~~powershell
Start-Process -FilePath "npm.cmd" -ArgumentList @("run", "start", "--", "--port", "3010") -WorkingDirectory (Get-Location).Path -WindowStyle Hidden
~~~

Run:

~~~powershell
$html = (Invoke-WebRequest -UseBasicParsing http://127.0.0.1:3010/products).Content
$html -match "Standard POS Rolls"
$html -match "Direct Thermal Labels"
$html -match '"@type":"ItemList"'
$html -match 'rel="canonical"'
~~~

Expected: all four expressions return True.

- [ ] **Step 4: Check whitespace and status**

~~~powershell
git diff --check
git status --short --branch
~~~

Expected: no whitespace errors and only intentional implementation changes.

### Task 5: Browser-Test Desktop And Mobile Discovery

**Files:**
- Artifacts: output/playwright/product-hub-desktop.png
- Artifacts: output/playwright/product-hub-mobile.png
- Artifacts: output/playwright/product-hub-mobile-filters.png

- [ ] **Step 1: Confirm Playwright prerequisite**

~~~powershell
npx.cmd --version
~~~

Expected: version output.

- [ ] **Step 2: Open and snapshot desktop**

~~~powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub open http://127.0.0.1:3010/products --headed
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub resize 1440 1000
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub snapshot
~~~

Expected: Product finder, Paper rolls, Thermal labels, and full result count.

- [ ] **Step 3: Verify desktop filters and URL**

Use fresh snapshot refs to click Thermal labels and Shipping & warehouse, re-snapshot after each click, then capture:

~~~powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub screenshot --filename output/playwright/product-hub-desktop.png --full-page
~~~

Expected: URL includes line=labels and use=shipping; results match shipping labels; active chips and count update; Request a Quote remains visible.

- [ ] **Step 4: Verify refresh, history, and empty state**

Reload and confirm filters remain. Use go-back and confirm prior state. Select Paper rolls plus Freezer grade plus Roll / fanfold and confirm No products match these filters., Clear filters, and Request a Quote.

- [ ] **Step 5: Verify mobile layout and filters**

~~~powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub-mobile open http://127.0.0.1:3010/products --device "iPhone 15"
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub-mobile snapshot
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub-mobile screenshot --filename output/playwright/product-hub-mobile.png
~~~

Use the fresh Filter products ref, re-snapshot, and capture product-hub-mobile-filters.png.

Expected: one-column cards, no horizontal overflow, in-flow filter panel below the header, 44px controls, and no WhatsApp overlap.

- [ ] **Step 6: Check browser console**

~~~powershell
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub console warning
npx.cmd --yes --package @playwright/cli playwright-cli -s=product-hub-mobile console warning
~~~

Expected: no new errors or warnings attributable to ProductExplorer.

## Final Acceptance Checklist

- [ ] Full catalog is visible before filters.
- [ ] Filter groups use the locked OR/AND semantics.
- [ ] Active chips, result count, individual removal, clear-all, and empty state work.
- [ ] Query parameters restore after refresh and browser back/forward.
- [ ] Server HTML contains all product entities and JSON-LD.
- [ ] H1, canonical metadata, FAQ schema, and ItemList schema remain.
- [ ] Desktop and mobile have no horizontal overflow.
- [ ] Mobile controls avoid the header and WhatsApp button.
- [ ] No new dependency is introduced.
- [ ] Focused tests, lint, and production build pass.

