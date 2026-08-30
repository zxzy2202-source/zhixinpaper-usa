import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("production builds initialize the database before Next.js", async () => {
  const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

  assert.match(packageJson.scripts.prebuild, /npm run db:init/);
});

test("server database fallbacks resolve from the application root", async () => {
  const dbSource = await readFile(path.join(root, "src/lib/db/index.ts"), "utf8");
  const schemaSource = await readFile(
    path.join(root, "src/lib/db/ensureBlogPostSchema.ts"),
    "utf8",
  );

  assert.doesNotMatch(dbSource, /const url = process\.env\.TURSO_DATABASE_URL \?\? "file:/);
  assert.doesNotMatch(schemaSource, /url: process\.env\.TURSO_DATABASE_URL \?\? "file:/);
  assert.match(dbSource, /resolve\(process\.cwd\(\)/);
  assert.match(schemaSource, /resolve\(process\.cwd\(\)/);
});
