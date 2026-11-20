import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
const read = (path) => readFileSync(path, "utf8");
test("manufactured categories and traded materials remain distinct", () => {
  const catalog = read("src/components/products/CatalogCategories.tsx");
  for (const name of ["Product & Packaging Labels", "Direct Thermal Labels", "Thermal Transfer Labels", "Thermal Paper Rolls", "NCR Carbonless Forms", "Thermal Paper", "Self-Adhesive Labelstock", "NCR Carbonless Paper", "Woodfree Offset Paper", "Thermal Transfer Ribbons"]) assert.ok(catalog.includes(name), name);
  assert.match(catalog, /Zhixin does not manufacture these materials/);
  for (const path of ["src/app/page.tsx", "src/app/products/page.tsx"]) assert.match(read(path), /<CatalogCategories \/>/);
});
test("legacy document pages retain limited scope", () => {
  assert.match(read("src/app/compliance/fsc-paper/page.tsx"), /does not mean that Zhixin or its finished products are FSC-certified/);
  assert.match(read("src/app/compliance/iso-9001/page.tsx"), /do not claim that Zhixin holds a current ISO certificate/);
  assert.match(read("src/app/compliance/reach-rohs/page.tsx"), /does not establish compliance for every product or grade/);
});
test("North American roll restrictions and dates are consistent", () => {
  for (const path of ["src/app/us/page.tsx", "src/app/ca/page.tsx"]) {
    const page = read(path);
    assert.match(page, /FOB or EXW only/);
    assert.match(page, /Label delivery terms are reviewed separately/);
  }
  assert.doesNotMatch(read("src/app/about/page.tsx"), /November 2009|600 mm/);
  assert.doesNotMatch(read("src/app/company-facts/page.tsx"), /converting practice began in 2008/);
  for (const path of ["src/app/factory/overview/page.tsx", "src/app/factory/equipment/page.tsx", "src/app/factory/virtual-tour/page.tsx"]) assert.doesNotMatch(read(path), /Thermal Coating Area|Coating & Base Paper Division|category: "Thermal Coating"/);
});

test("Spanish catalog distinguishes all five finished categories and traded materials", () => {
  const page = read("src/app/mx/page.tsx");
  for (const name of ["Etiquetas para productos y empaques", "Etiquetas térmicas directas", "Etiquetas de transferencia térmica", "Rollos de papel térmico", "Formularios autocopiantes NCR", "Papel térmico", "Material autoadherible para etiquetas", "Papel autocopiante NCR", "Papel offset libre de madera", "Cintas de transferencia térmica"]) assert.ok(page.includes(name), name);
  assert.match(page, /Materiales comercializados, no fabricados por Zhixin/);
});

test("document pages retain canonical language alternates and WebPage schema", () => {
  for (const slug of ["certificates", "fsc-paper", "iso-9001", "reach-rohs"]) {
    const page = read(`src/app/compliance/${slug}/page.tsx`);
    assert.ok(page.includes(`canonicalUrl("/compliance/${slug}")`));
    assert.match(page, /canonical: url, languages: \{ en: url, "x-default": url \}/);
    assert.match(page, /"@type": "WebPage", name: title, url, description/);
    assert.match(page, /breadcrumbSchema/);
  }
});

test("public shared copy avoids legacy certification and navigation claims", () => {
  for (const path of ["src/components/ui/TrustBadge.tsx", "src/components/layout/Header.tsx", "src/lib/data.ts", "src/app/eu/page.tsx", "src/app/eu/[country]/page.tsx"]) {
    assert.doesNotMatch(read(path), /chain.of.custody/i, path);
  }
  for (const path of ["src/lib/imageSlots.ts", "src/app/products/thermal-paper-rolls/page.tsx"]) assert.doesNotMatch(read(path), /REACH.compliant/i, path);
  assert.doesNotMatch(read("src/app/products/page.tsx"), /Product line 0[12]|Choose the product line first/);
  assert.match(read("src/components/products/ProductExplorer.tsx"), /roll and label detail pages[\s\S]*category overview above for the full manufactured range/);
  assert.doesNotMatch(read("src/components/products/CatalogCategories.tsx"), /\/products\/[^" ]*ncr/i);
});

test("duty restriction identifies rolls, importer and separately reviewed labels", () => {
  for (const path of ["src/app/us/page.tsx", "src/app/ca/page.tsx"]) {
    const page = read(path);
    assert.match(page, /thermal paper rolls within the applicable anti-dumping/i);
    assert.match(page, /importer is responsible for applicable duties/i);
    assert.match(page, /customs broker/i);
    assert.match(page, /Label delivery terms are reviewed separately/i);
  }
});
