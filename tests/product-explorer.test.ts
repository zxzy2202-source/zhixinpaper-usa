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
