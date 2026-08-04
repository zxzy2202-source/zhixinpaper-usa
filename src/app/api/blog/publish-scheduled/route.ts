import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { publishDueScheduledBlogPosts } from "@/lib/blogPublishing";
import { getSessionFromRequest } from "@/lib/session";

export const dynamic = "force-dynamic";

function isAuthorized(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  const providedSecret = request.headers.get("x-cron-secret");

  if (cronSecret && providedSecret && cronSecret === providedSecret) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  const session = await getSessionFromRequest(request);
  if (!isAuthorized(request) && !session?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await publishDueScheduledBlogPosts();

  if (result.published.length > 0) {
    revalidatePath("/admin");
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/sitemap.xml");
    for (const post of result.published) {
      revalidatePath(`/blog/${post.slug}`);
    }
  }

  return NextResponse.json({
    success: true,
    published: result.published,
    rejected: result.rejected,
  });
}
