import "server-only";

import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { activityLog } from "@/lib/db/schema";
import {
  OPTIMIZATION_ACTION,
  OPTIMIZATION_ENTITY_TYPE,
  optimizationLogDuplicateKey,
  parseOptimizationLogDetails,
  validateOptimizationLogInput,
  type OptimizationLogInput,
  type OptimizationLogRecord,
} from "@/lib/optimizationLogTypes";

function toRecord(row: typeof activityLog.$inferSelect): OptimizationLogRecord | null {
  const details = parseOptimizationLogDetails(row.details);
  if (!details) return null;
  return {
    ...details,
    id: row.id,
    adminId: row.adminId,
    createdAt: row.createdAt,
  };
}

export async function listOptimizationLogs(): Promise<OptimizationLogRecord[]> {
  const rows = await db
    .select()
    .from(activityLog)
    .where(and(
      eq(activityLog.action, OPTIMIZATION_ACTION),
      eq(activityLog.entityType, OPTIMIZATION_ENTITY_TYPE),
    ))
    .orderBy(desc(activityLog.createdAt), desc(activityLog.id));

  return rows.map(toRecord).filter((row): row is OptimizationLogRecord => Boolean(row));
}

export async function getOptimizationLog(id: number): Promise<OptimizationLogRecord | null> {
  if (!Number.isInteger(id) || id < 1) return null;
  const rows = await db
    .select()
    .from(activityLog)
    .where(and(
      eq(activityLog.id, id),
      eq(activityLog.action, OPTIMIZATION_ACTION),
      eq(activityLog.entityType, OPTIMIZATION_ENTITY_TYPE),
    ));
  return rows[0] ? toRecord(rows[0]) : null;
}

export async function createOptimizationLog(
  value: unknown,
  adminId: number | null,
): Promise<{ record: OptimizationLogRecord; created: boolean }> {
  const validation = validateOptimizationLogInput(value);
  if (!validation.data) {
    const error = new Error("优化记录字段校验失败") as Error & { fields?: Record<string, string> };
    error.fields = validation.errors;
    throw error;
  }

  const input: OptimizationLogInput = validation.data;
  const duplicateKey = optimizationLogDuplicateKey(input);
  const existing = await listOptimizationLogs();
  const duplicate = existing.find((record) => optimizationLogDuplicateKey(record) === duplicateKey);
  if (duplicate) return { record: duplicate, created: false };

  const details = JSON.stringify({ ...input, version: 1 });
  const inserted = await db.insert(activityLog).values({
    adminId,
    action: OPTIMIZATION_ACTION,
    entityType: OPTIMIZATION_ENTITY_TYPE,
    details,
  }).returning();

  const record = inserted[0] ? toRecord(inserted[0]) : null;
  if (!record) throw new Error("优化记录写入后无法解析");
  return { record, created: true };
}
