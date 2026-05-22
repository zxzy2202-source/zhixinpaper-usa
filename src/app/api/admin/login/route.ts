import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "邮箱和密码不能为空" },
        { status: 400 }
      );
    }

    // 查询用户
    const userRows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email.trim().toLowerCase()));
    const user = userRows[0];

    if (!user) {
      // 防止时序攻击：即使用户不存在也执行 bcrypt
      await bcrypt.compare(password, "$2b$12$invalidhashfortimingattackprevention");
      return NextResponse.json(
        { error: "邮箱或密码错误" },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json(
        { error: "邮箱或密码错误" },
        { status: 401 }
      );
    }

    // 更新最后登录时间
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date().toISOString() })
      .where(eq(adminUsers.id, user.id));

    // 签发 Session Cookie
    await createSession({
      id: user.id,
      email: user.email,
      name: user.name || "管理员",
      role: user.role || "admin",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Login API] Error:", err);
    return NextResponse.json(
      { error: "服务器错误，请稍后重试" },
      { status: 500 }
    );
  }
}
