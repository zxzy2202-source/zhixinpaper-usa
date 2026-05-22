/**
 * 独立 JWT Session 认证
 * 完全自托管，不依赖任何外部服务或特定域名
 * 使用 jose 库（支持 Edge Runtime 和 Node.js）
 */
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const SESSION_COOKIE = "zhixin_admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 小时（秒）

export interface AdminSession {
  id: number;
  email: string;
  name: string;
  role: string;
}

/** 获取 JWT 签名密钥（从环境变量读取，回退到内置密钥） */
function getSecretKey(): Uint8Array {
  const secret =
    process.env.ADMIN_SESSION_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "zhixinpaper-admin-secret-2025-please-change-in-production";
  return new TextEncoder().encode(secret);
}

/** 签发 JWT 并写入 HttpOnly Cookie */
export async function createSession(user: AdminSession): Promise<void> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecretKey());

  const cookieStore = await cookies();
  // SameSite=lax works for same-origin; use 'none' only if behind a cross-origin proxy
  // For self-hosted deployments, 'lax' is the safest default
  const isProduction = process.env.NODE_ENV === "production";
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "lax" : "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

/** 销毁 Session（清除 Cookie） */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/** 从 Cookie 中验证并解析 Session（用于 Server Components 和 API Routes） */
export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: payload.id as number,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}

/** 从 NextRequest 中验证 Session（用于 Edge Middleware） */
export async function getSessionFromRequest(
  req: NextRequest
): Promise<AdminSession | null> {
  try {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    return {
      id: payload.id as number,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
    };
  } catch {
    return null;
  }
}
