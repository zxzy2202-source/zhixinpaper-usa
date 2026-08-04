import test from "node:test";
import assert from "node:assert/strict";
import { getBuiltInBlogSeeds } from "@/lib/blogBuiltInSeeds";
import { validateBlogPost } from "@/lib/blogPostValidation";

test("built-in blog seeds pass blocking validation", () => {
  const failures = getBuiltInBlogSeeds()
    .map((seed) => ({
      slug: seed.slug,
      errors: validateBlogPost({
        title: seed.title,
        excerpt: seed.excerpt,
        content: seed.content,
        metaTitle: seed.seoTitle,
        metaDescription: seed.seoDescription,
      }).errors.map((issue) => issue.code),
    }))
    .filter((item) => item.errors.length > 0);

  assert.deepEqual(failures, []);
});
