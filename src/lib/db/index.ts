import { createClient } from "@libsql/client";
import { drizzle as drizzleLibsql } from "drizzle-orm/libsql";
import * as schema from "./schema";

// 统一使用 libsql 驱动（支持 Turso 云数据库和本地 SQLite 文件）
// 生产环境：TURSO_DATABASE_URL=libsql://xxx.turso.io + TURSO_AUTH_TOKEN
// 开发环境：TURSO_DATABASE_URL=file:./data/zhixinpaper.db（无需 token）

const url = process.env.TURSO_DATABASE_URL ?? "file:./data/zhixinpaper.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
  url,
  ...(authToken ? { authToken } : {}),
});

export const db = drizzleLibsql(client, { schema });

export type DB = typeof db;
