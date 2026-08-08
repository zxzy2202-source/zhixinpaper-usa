import { BLOG_CONTENT } from "@/lib/blog-content";
import { BLOG_INDUSTRY_LINKS } from "@/lib/blog-industry-links";
import { BLOG_PRODUCT_LINKS } from "@/lib/blog-product-links";
import { BLOG_REFERENCE_LINKS } from "@/lib/blog-reference-links";
import { BLOG_POSTS } from "@/lib/data";

export interface BuiltInBlogSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  status: "published";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  publishedAt: string;
}

function normalizeReadTime(value: string) {
  return value.replace(/\s+read$/i, "").trim();
}

function toIsoDate(date: string) {
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}

function buildIndustryLinks(slug: string) {
  const links = BLOG_INDUSTRY_LINKS[slug] || [];
  if (links.length === 0) return "";

  return [
    "## Related Industry Pages",
    "",
    ...links.map((link) => `- [${link.label}](/industries/${link.slug}): ${link.description}`),
    "",
  ].join("\n");
}

function buildProductLinks(slug: string) {
  const links = BLOG_PRODUCT_LINKS[slug] || [];
  if (links.length === 0) return "";

  return [
    "## Related Products",
    "",
    ...links.map((link) => `- [${link.label}](${link.href}): ${link.description}`),
    "",
  ].join("\n");
}

function buildReferenceSources(slug: string) {
  const links = BLOG_REFERENCE_LINKS[slug] || [];
  if (links.length === 0) return "";

  return [
    "## Reference Sources",
    "",
    ...links.map((link) => `- [${link.label}](${link.url})`),
    "",
  ].join("\n");
}

function buildFaqSection(title: string, excerpt: string, category: string) {
  const normalizedTitle = title.toLowerCase().replace(/[?!.]+$/g, "");

  return [
    "## Frequently Asked Questions",
    "",
    `### What should buyers confirm before ordering ${normalizedTitle}?`,
    `Confirm the exact application, printer or terminal fit, destination market, required documents, and approval process before issuing the purchase order for this ${category.toLowerCase()} project.`,
    "",
    `### Is the article summary enough for supplier approval?`,
    `No. ${excerpt} Buyers should still request grade-specific documents, test evidence, and representative samples before approving bulk production.`,
    "",
    "### Which internal pages should I review next?",
    "Review the relevant industry page, compare product specifications, and use the contact or quote forms to align the final requirement set with the quoted material.",
    "",
  ].join("\n");
}

function buildCtaSection() {
  return [
    "## Next Step",
    "",
    "If you need support on specifications, documentation scope, or sample planning, continue with one of these internal pages:",
    "",
    "- [Request Samples](/samples) to validate material, dimensions, and printer fit.",
    "- [Get a Quote](/quote) to align the RFQ with width, OD, core, chemistry, packing, and destination requirements.",
    "- [Contact Us](/contact) for project-specific technical review.",
    "",
  ].join("\n");
}

function buildMarkdown(slug: string) {
  const content = BLOG_CONTENT.find((item) => item.slug === slug);
  if (!content) return "";

  return [
    content.intro,
    "",
    ...content.sections.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.body,
      "",
    ]),
    "## Conclusion",
    "",
    content.conclusion,
    "",
    "## Key Takeaways",
    "",
    ...content.keyTakeaways.map((point) => `- ${point}`),
    "",
  ].join("\n");
}

export function getBuiltInBlogSeeds(): BuiltInBlogSeed[] {
  return BLOG_POSTS.map((post) => {
    const body = buildMarkdown(post.slug);
    const references = buildReferenceSources(post.slug);
    const faq = buildFaqSection(post.title, post.excerpt, post.category);
    const industryLinks = buildIndustryLinks(post.slug);
    const productLinks = buildProductLinks(post.slug);
    const content = [body, references, productLinks, industryLinks, faq, buildCtaSection()].filter(Boolean).join("\n");
    const tagParts = [post.category, post.tag].filter(Boolean);
    const seoTitle = "seoTitle" in post && typeof post.seoTitle === "string"
      ? post.seoTitle
      : post.title;
    const seoDescription = "seoDescription" in post && typeof post.seoDescription === "string"
      ? post.seoDescription
      : post.excerpt;

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content,
      category: post.category,
      tags: tagParts.join(", "),
      readTime: normalizeReadTime(post.readTime),
      status: "published" as const,
      seoTitle,
      seoDescription,
      seoKeywords: [
        "thermal paper",
        post.category.toLowerCase(),
        ...post.title
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, " ")
          .split(/\s+/)
          .filter((word) => word.length >= 4)
          .slice(0, 5),
      ]
        .filter(Boolean)
        .join(", "),
      publishedAt: toIsoDate(post.date),
    };
  }).filter((post) => post.content.trim().length > 0);
}
