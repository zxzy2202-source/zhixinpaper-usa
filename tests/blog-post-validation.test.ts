import test from "node:test";
import assert from "node:assert/strict";
import { validateBlogPost } from "@/lib/blogPostValidation";

test("validation groups AI-style issues and marks weak content", () => {
  const result = validateBlogPost({
    title: "AI blog draft",
    excerpt: "This draft needs more substance before publication.",
    content: [
      "## Overview",
      "In today's fast-paced world, it is important to note that this revolutionary solution is a game-changer.",
      "Moreover, this comprehensive solution helps you streamline your process.",
      "Furthermore, it stands out from the crowd and elevates your workflow.",
      "In conclusion, this article explains why it matters.",
    ].join("\n\n"),
    metaTitle: "AI blog draft",
    metaDescription: "Short draft.",
  });

  assert.equal(result.qualityAudit.aiStyleRisk, "high");
  assert.equal(result.qualityAudit.contentQualityLevel, "weak");
  assert.ok(result.groupedIssues["ai-style"].length > 0);
  assert.ok(result.errors.some((issue) => issue.code === "ai-style-high-risk"));
});

test("validation exposes structured quality signals for strong drafts", () => {
  const section = [
    "If you are approving a 4 x 6 warehouse label project, start by confirming printer model, core size, label width, adhesive type, and scan distance before you ask for a quote.",
    "Record the current label size, liner format, print speed, and barcode grade target so the supplier can match the construction and test conditions.",
    "Request a sample roll, compare print contrast at the target DPI, and document the acceptance criteria for cold storage, abrasion, and carton labeling.",
  ].join(" ");
  const content = [
    section,
    "## Confirm the printer and format",
    `${section} ${section} ${section} ${section}`,
    "## Review the material and adhesive",
    `${section} ${section} ${section} ${section}`,
    "## Run a receiving and scan test",
    `${section} ${section} ${section} ${section}`,
    "## FAQ",
    "### What should buyers send before sampling?",
    "Share the printer model, label size, winding direction, barcode type, and storage conditions.",
    "### Where should this article send the buyer next?",
    "Link the reader to [thermal shipping labels](/products/thermal-shipping-labels) and your RFQ page.",
  ].join("\n\n");

  const result = validateBlogPost({
    title: "How warehouse buyers approve 4 x 6 thermal labels",
    excerpt: "A practical checklist for printer matching, adhesive review, and scan testing before bulk orders.",
    content,
    metaTitle: "How warehouse buyers approve 4 x 6 thermal labels",
    metaDescription: "Use this checklist to confirm printer fit, adhesive performance, and scan tests before ordering 4 x 6 thermal labels.",
  });

  assert.equal(result.errors.length, 0);
  assert.equal(result.qualityAudit.hasInternalLink, true);
  assert.equal(result.qualityAudit.hasLeadParagraph, true);
  assert.notEqual(result.qualityAudit.contentQualityLevel, "weak");
});
