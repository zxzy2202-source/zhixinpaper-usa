import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoots = ["src/app", "src/components", "src/lib", "src/content"];
const ignoredParts = [
  "src/app/quote/",
  "src/app/api/",
  "src/app/admin/",
  "src/app/sitemap.ts",
  "src/lib/siteSettingsTypes.ts",
];
const sourceExtensions = new Set([".ts", ".tsx", ".mjs"]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(absolute)));
    else if (sourceExtensions.has(path.extname(entry.name))) files.push(absolute);
  }
  return files;
}

test("public commercial RFQ CTAs use the unified Contact Us route", async () => {
  const files = (await Promise.all(publicRoots.map((rootPath) => collectFiles(path.join(root, rootPath))))).flat().filter((file) => {
    const relative = path.relative(root, file).replaceAll(path.sep, "/");
    return !ignoredParts.some((part) => relative.startsWith(part));
  });

  const legacyLinks = [];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    if (/\/quote(?:[?#\"'`)]|$)/.test(source)) legacyLinks.push(path.relative(root, file));
  }

  assert.deepEqual(legacyLinks, [], `Legacy public quote links remain in: ${legacyLinks.join(", ")}`);

  const blogClient = await readFile(path.join(root, "src/app/blog/[slug]/BlogPostClient.tsx"), "utf8");
  assert.match(blogClient, /normalizePublicInquiryLinks/);
  assert.match(blogClient, /mode=quote&/);
});
