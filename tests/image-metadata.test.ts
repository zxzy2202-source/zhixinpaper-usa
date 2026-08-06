import assert from "node:assert/strict";
import test from "node:test";
import { extensionForMime, generateImageMetadata } from "../src/lib/imageMetadata";

test("preserves a reviewed manual alt", () => {
  const result = generateImageMetadata({
    originalName: "IMG_20260806.png",
    requestedAlt: "Thermal paper rolls prepared for export packing",
    slotAlt: "Default slot description",
    slotKey: "home.hero",
  });

  assert.equal(result.alt, "Thermal paper rolls prepared for export packing");
  assert.equal(result.source, "manual");
  assert.equal(result.filenameBase, "home-hero");
});

test("uses the registered slot alt when no manual alt is provided", () => {
  const result = generateImageMetadata({
    originalName: "企业文化_车间门口.png",
    slotAlt: "Inside Zhixin Paper thermal paper manufacturing line",
    slotKey: "factory.banner",
  });

  assert.equal(result.alt, "Inside Zhixin Paper thermal paper manufacturing line");
  assert.equal(result.source, "slot");
  assert.equal(result.filenameBase, "factory-banner");
  assert.match(result.geoContext, /factory\.banner/);
});

test("creates conservative metadata from an ordinary media filename", () => {
  const result = generateImageMetadata({
    originalName: "thermal-label-production-line-02.png",
  });

  assert.equal(result.alt, "Thermal label production line 02 by Zhixin Paper");
  assert.equal(result.source, "filename");
  assert.equal(result.filenameBase, "thermal-label-production-line-02");
  assert.doesNotMatch(result.alt, /certified|capacity|guaranteed/i);
});

test("retains readable Chinese context without using it in the URL slug", () => {
  const result = generateImageMetadata({ originalName: "企业文化_车间门口.png" });

  assert.equal(result.alt, "企业文化 车间门口 by Zhixin Paper");
  assert.equal(result.filenameBase, "zhixin-paper-image");
});

test("does not turn camera filenames into low-quality alt text", () => {
  const result = generateImageMetadata({ originalName: "IMG_20260806.png" });

  assert.equal(result.alt, "Website image by Zhixin Paper");
  assert.equal(result.filenameBase, "zhixin-paper-image");
});

test("maps object extensions from the actual MIME type", () => {
  assert.equal(extensionForMime("image/jpeg"), "jpg");
  assert.equal(extensionForMime("image/png"), "png");
  assert.equal(extensionForMime("image/webp"), "webp");
  assert.equal(extensionForMime("image/gif"), "gif");
  assert.equal(extensionForMime("image/svg+xml"), "svg");
});
