import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path: string) {
  return readFile(new URL(path, root), "utf8");
}

test("media upload rejects unknown slot keys and derives extension from MIME", async () => {
  const route = await source("src/app/api/admin/media/route.ts");

  assert.match(route, /if \(slotKey && !slot\)/);
  assert.match(route, /未知的图片槽位/);
  assert.match(route, /extensionForMime\(file\.type\)/);
});

test("legacy folder values are not treated as thumbnail URLs", async () => {
  const page = await source("src/app/admin/image-slots/page.tsx");

  assert.match(page, /f\.folder\?\.startsWith\("http"\) \? f\.folder : f\.url/);
});
