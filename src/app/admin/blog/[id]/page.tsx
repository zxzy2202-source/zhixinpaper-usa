import { db } from "@/lib/db";
import { blogPosts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const postRows = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, parseInt(id)));
  const post = postRows[0];

  if (!post) notFound();

  return (
    <BlogEditor
      initialData={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt || "",
        content: post.content,
        category: post.category || "",
        tags: post.tags || "",
        readTime: post.readTime || "",
        status: post.status as "draft" | "published" | "archived",
        seoTitle: post.seoTitle || "",
        seoDescription: post.seoDescription || "",
        seoKeywords: post.seoKeywords || "",
      }}
    />
  );
}
