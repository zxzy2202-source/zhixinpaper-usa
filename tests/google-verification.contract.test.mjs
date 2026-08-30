import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

test("root metadata exposes the supplied Google Search Console verification token", () => {
  assert.match(layout, /googleSiteVerification/);
  assert.match(layout, /vJ-hX1ihko5z3r2LZp6BMcQR1D_NbbIRtddWMERk1z4/);
});
