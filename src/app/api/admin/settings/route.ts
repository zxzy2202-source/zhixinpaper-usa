import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import {
  setSetting,
  getHeroHome,
  getSeoGlobal,
  SETTING_KEYS,
  type HeroConfig,
  type SeoConfig,
} from "@/lib/siteSettings";

/**
 * GET /api/admin/settings?key=hero.home | seo.global
 * 返回该 key 当前值（带默认值合并）
 */
export async function GET(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  const url = new URL(req.url);
  const key = url.searchParams.get("key");

  try {
    if (key === SETTING_KEYS.HERO_HOME) {
      const data = await getHeroHome();
      return NextResponse.json({ key, data });
    }
    if (key === SETTING_KEYS.SEO_GLOBAL) {
      const data = await getSeoGlobal();
      return NextResponse.json({ key, data });
    }
    return NextResponse.json({ error: "未知 key" }, { status: 400 });
  } catch (e) {
    console.error("[settings] GET failed:", e);
    return NextResponse.json({ error: "查询失败" }, { status: 500 });
  }
}

/**
 * PUT /api/admin/settings
 * body: { key: string, data: object }
 */
export async function PUT(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "未授权" }, { status: 401 });

  let body: { key?: string; data?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "请求体非法" }, { status: 400 });
  }

  const { key, data } = body;
  if (!key || typeof key !== "string") {
    return NextResponse.json({ error: "缺少 key" }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "data 必须是对象" }, { status: 400 });
  }

  try {
    if (key === SETTING_KEYS.HERO_HOME) {
      await setSetting<HeroConfig>(key, "hero", data as HeroConfig, session.id);
      return NextResponse.json({ ok: true });
    }
    if (key === SETTING_KEYS.SEO_GLOBAL) {
      await setSetting<SeoConfig>(key, "seo", data as SeoConfig, session.id);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: `未知 key: ${key}` }, { status: 400 });
  } catch (e) {
    console.error("[settings] PUT failed:", e);
    return NextResponse.json({ error: "保存失败" }, { status: 500 });
  }
}
