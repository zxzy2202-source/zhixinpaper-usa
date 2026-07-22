export const OPTIMIZATION_ACTION = "optimization.logged";
export const OPTIMIZATION_ENTITY_TYPE = "optimization";

export const OPTIMIZATION_CATEGORIES = [
  "seo",
  "content",
  "conversion",
  "ux",
  "performance",
  "technical",
  "maintenance",
] as const;

export type OptimizationCategory = (typeof OPTIMIZATION_CATEGORIES)[number];

export const OPTIMIZATION_CATEGORY_LABELS: Record<OptimizationCategory, string> = {
  seo: "SEO",
  content: "内容",
  conversion: "询盘转化",
  ux: "用户体验",
  performance: "性能",
  technical: "技术",
  maintenance: "维护",
};

export interface OptimizationLogInput {
  title: string;
  date: string;
  category: OptimizationCategory;
  goal: string;
  changes: string[];
  affectedRoutes: string[];
  affectedFiles: string[];
  commit: string;
  validation: string[];
  source?: "admin" | "cli";
  createdBy?: string;
}

export interface OptimizationLogDetails extends OptimizationLogInput {
  version: 1;
}

export interface OptimizationLogRecord extends OptimizationLogDetails {
  id: number;
  adminId: number | null;
  createdAt: string;
}

export interface OptimizationLogValidationResult {
  data?: OptimizationLogInput;
  errors: Record<string, string>;
}

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanList(value: unknown, maxItems: number, maxItemLength: number) {
  if (!Array.isArray(value)) return [];
  return [...new Set(
    value
      .map((item) => cleanText(item, maxItemLength))
      .filter(Boolean),
  )].slice(0, maxItems);
}

export function normalizeOptimizationLogInput(value: unknown): OptimizationLogInput {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const category = OPTIMIZATION_CATEGORIES.includes(raw.category as OptimizationCategory)
    ? raw.category as OptimizationCategory
    : "technical";
  const source = raw.source === "cli" ? "cli" : "admin";

  return {
    title: cleanText(raw.title, 120),
    date: cleanText(raw.date, 10),
    category,
    goal: cleanText(raw.goal, 1200),
    changes: cleanList(raw.changes, 24, 500),
    affectedRoutes: cleanList(raw.affectedRoutes, 40, 240),
    affectedFiles: cleanList(raw.affectedFiles, 60, 300),
    commit: cleanText(raw.commit, 40).toLowerCase(),
    validation: cleanList(raw.validation, 24, 500),
    source,
    createdBy: cleanText(raw.createdBy, 160) || undefined,
  };
}

export function validateOptimizationLogInput(value: unknown): OptimizationLogValidationResult {
  const data = normalizeOptimizationLogInput(value);
  const errors: Record<string, string> = {};

  if (data.title.length < 3) errors.title = "标题至少需要 3 个字符";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(`${data.date}T00:00:00Z`))) {
    errors.date = "日期格式必须为 YYYY-MM-DD";
  }
  if (data.goal.length < 10) errors.goal = "请写明本次优化要解决的问题或目标";
  if (data.changes.length === 0) errors.changes = "至少需要一项已完成的改动";
  if (data.validation.length === 0) errors.validation = "至少需要一项验证结果";
  if (data.commit && !/^[a-f0-9]{7,40}$/.test(data.commit)) {
    errors.commit = "Commit 应为 7 到 40 位十六进制哈希";
  }

  return Object.keys(errors).length ? { errors } : { data, errors };
}

export function parseOptimizationLogDetails(value: string | null): OptimizationLogDetails | null {
  if (!value) return null;
  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    const result = validateOptimizationLogInput(parsed);
    if (!result.data) return null;
    return { ...result.data, version: 1 };
  } catch {
    return null;
  }
}

export function optimizationLogDuplicateKey(input: Pick<OptimizationLogInput, "commit" | "date" | "title">) {
  if (input.commit) return `commit:${input.commit.toLowerCase()}`;
  return `entry:${input.date}:${input.title.trim().toLowerCase().replace(/\s+/g, " ")}`;
}
