import { createClient } from "@libsql/client";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import {
  OPTIMIZATION_ACTION,
  OPTIMIZATION_ENTITY_TYPE,
  optimizationLogDuplicateKey,
  parseOptimizationLogDetails,
  validateOptimizationLogInput,
  type OptimizationLogRecord,
} from "../src/lib/optimizationLogTypes";

function getArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function loadEnvFile(path: string | undefined) {
  if (!path || !existsSync(path)) return;
  const raw = await readFile(path, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!match || match[1].startsWith("#")) continue;
    let value = match[2].trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!(match[1] in process.env)) process.env[match[1]] = value;
  }
}

async function main() {
  const inputPath = getArgument("--file");
  if (!inputPath) {
    console.error("Usage: npm run optimization:log -- --file <record.json> [--env-file <path>]");
    process.exitCode = 1;
    return;
  }

  await loadEnvFile(getArgument("--env-file"));
  await loadEnvFile(".env.local");
  await loadEnvFile(".env");

  const input = JSON.parse(await readFile(resolve(inputPath), "utf8"));
  const validation = validateOptimizationLogInput({ ...input, source: "cli" });
  if (!validation.data) {
    console.error(JSON.stringify({ status: "invalid", fields: validation.errors }, null, 2));
    process.exitCode = 1;
    return;
  }

  const url = process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db";
  const authToken = process.env.TURSO_AUTH_TOKEN;
  const client = createClient({ url, ...(authToken ? { authToken } : {}) });

  try {
  const before = await client.execute({
    sql: "SELECT id, admin_id, details, created_at FROM activity_log WHERE action = ? AND entity_type = ? ORDER BY created_at DESC, id DESC",
    args: [OPTIMIZATION_ACTION, OPTIMIZATION_ENTITY_TYPE],
  });

  const records = before.rows.flatMap((row) => {
    const details = parseOptimizationLogDetails(typeof row.details === "string" ? row.details : null);
    if (!details) return [];
    return [{
      ...details,
      id: Number(row.id),
      adminId: row.admin_id == null ? null : Number(row.admin_id),
      createdAt: String(row.created_at),
    } satisfies OptimizationLogRecord];
  });
  const duplicateKey = optimizationLogDuplicateKey(validation.data);
  const duplicate = records.find((record) => optimizationLogDuplicateKey(record) === duplicateKey);

  if (duplicate) {
    console.log(JSON.stringify({
      status: "already_exists",
      id: duplicate.id,
      title: duplicate.title,
      date: duplicate.date,
      category: duplicate.category,
      commit: duplicate.commit,
      count: records.length,
      uniqueMatches: 1,
    }, null, 2));
    return;
  }

  const details = JSON.stringify({ ...validation.data, version: 1 });
  const inserted = await client.execute({
    sql: "INSERT INTO activity_log (admin_id, action, entity_type, details) VALUES (NULL, ?, ?, ?)",
    args: [OPTIMIZATION_ACTION, OPTIMIZATION_ENTITY_TYPE, details],
  });
  const insertedId = Number(inserted.lastInsertRowid);

  const after = await client.execute({
    sql: "SELECT id, details, created_at FROM activity_log WHERE action = ? AND entity_type = ? ORDER BY created_at DESC, id DESC",
    args: [OPTIMIZATION_ACTION, OPTIMIZATION_ENTITY_TYPE],
  });
  const matching = after.rows.filter((row) => {
    const parsed = parseOptimizationLogDetails(typeof row.details === "string" ? row.details : null);
    return parsed ? optimizationLogDuplicateKey(parsed) === duplicateKey : false;
  });
  const freshRow = after.rows.find((row) => Number(row.id) === insertedId);
  const freshDetails = parseOptimizationLogDetails(typeof freshRow?.details === "string" ? freshRow.details : null);

  if (!freshRow || !freshDetails || matching.length !== 1 || after.rows.length !== before.rows.length + 1) {
    throw new Error("Optimization log readback verification failed");
  }

  console.log(JSON.stringify({
    status: "created",
    id: insertedId,
    title: freshDetails.title,
    date: freshDetails.date,
    category: freshDetails.category,
    commit: freshDetails.commit,
    countBefore: before.rows.length,
    countAfter: after.rows.length,
    uniqueMatches: matching.length,
    readback: "verified",
  }, null, 2));
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Optimization log publish failed");
  process.exitCode = 1;
});
