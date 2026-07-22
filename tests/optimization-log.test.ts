import test from "node:test";
import assert from "node:assert/strict";
import {
  optimizationLogDuplicateKey,
  parseOptimizationLogDetails,
  validateOptimizationLogInput,
} from "../src/lib/optimizationLogTypes";

const validEntry = {
  title: "Improve international SEO",
  date: "2026-07-21",
  category: "seo",
  goal: "Increase qualified organic visibility in priority export markets.",
  changes: ["Added Mexico market page"],
  affectedRoutes: ["/mx"],
  affectedFiles: ["src/app/mx/page.tsx"],
  commit: "298b02430d3d8483e38a18bb2635c845363e046f",
  validation: ["Production build passed"],
  source: "cli",
};

test("validates and normalizes a complete optimization entry", () => {
  const result = validateOptimizationLogInput(validEntry);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data?.category, "seo");
  assert.equal(result.data?.commit, validEntry.commit);
});

test("rejects records without changes or validation evidence", () => {
  const result = validateOptimizationLogInput({ ...validEntry, changes: [], validation: [] });
  assert.equal(result.errors.changes, "至少需要一项已完成的改动");
  assert.equal(result.errors.validation, "至少需要一项验证结果");
});

test("uses commit as the strongest duplicate key", () => {
  const first = optimizationLogDuplicateKey(validEntry);
  const second = optimizationLogDuplicateKey({
    ...validEntry,
    title: "A different title",
    date: "2026-07-22",
  });
  assert.equal(first, second);
});

test("parses versioned JSON details", () => {
  const parsed = parseOptimizationLogDetails(JSON.stringify({ ...validEntry, version: 1 }));
  assert.equal(parsed?.title, validEntry.title);
  assert.equal(parsed?.version, 1);
});
