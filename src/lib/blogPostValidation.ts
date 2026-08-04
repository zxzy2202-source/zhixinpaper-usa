export type BlogValidationLevel = "error" | "warning";
export type BlogValidationCategory = "format" | "seo" | "ai-style" | "evidence" | "buyer-value";
export type BlogAiStyleRisk = "low" | "medium" | "high";

export interface BlogValidationIssue {
  code: string;
  level: BlogValidationLevel;
  category: BlogValidationCategory;
  message: string;
}

export interface BlogValidationInput {
  title?: string;
  excerpt?: string;
  content?: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogValidationResult {
  issues: BlogValidationIssue[];
  errors: BlogValidationIssue[];
  warnings: BlogValidationIssue[];
  wordCount: number;
  h2Count: number;
  hasFaq: boolean;
  qualityAudit: {
    aiStyleRisk: BlogAiStyleRisk;
    aiStyleScore: number;
    clicheCount: number;
    vagueBuzzwordCount: number;
    transitionCount: number;
    repetitiveOpeningCount: number;
    externalSourceCount: number;
    buyerActionCount: number;
    specificDetailCount: number;
    longSentenceCount: number;
  };
}

const PLACEHOLDER_PATTERN = /\b(?:TBD|TODO|lorem ipsum|needs validation)\b|\[insert[^\]]*\]/i;
const INTERNAL_LINK_PATTERN = /\[[^\]]+\]\(\/(?:products|industries|factory|compliance|markets|contact|quote|samples|faq|oem-custom|blog)(?:\/[^)]*)?\)/i;
const EXTERNAL_LINK_PATTERN = /\[[^\]]+\]\(https?:\/\/[^)]+\)/gi;
const AI_CLICHE_PATTERN = /\b(?:in today'?s (?:fast-paced|digital|ever-changing) world|delve into|navigate the complexities|ever-evolving landscape|game[- ]changer|it is important to note|it is worth noting|when it comes to|plays? a crucial role|unlock(?:ing)? the (?:power|potential)|elevate your|whether you are|stands? out from the crowd)\b/gi;
const VAGUE_BUZZWORD_PATTERN = /\b(?:seamless(?:ly)?|robust|cutting-edge|innovative|best-in-class|revolutionary|transformative|holistic|comprehensive solution|optimi[sz]e your|streamline your)\b/gi;
const TRANSITION_PATTERN = /(?:^|[.!?]\s+|\n)(?:moreover|furthermore|additionally|in conclusion|ultimately|notably|in summary|consequently),?\s/gi;
const BUYER_ACTION_PATTERN = /\b(?:test|confirm|verify|request|compare|measure|record|approve|inspect|sample|quote|specify|check|ask|document|reject|store|pack)\w*\b/gi;
const SPECIFIC_DETAIL_PATTERN = /\b\d+(?:\.\d+)?\s*(?:mm|cm|m|gsm|g\/m2|microns?|°c|%|hours?|days?|months?|years?|rolls?|cartons?|pallets?|dpi|kg|lb|usd|eur|cad)\b|\b(?:core size|roll width|roll length|image density|qr code|printer model|storage temperature|inspection plan|scan distance|scan angle|decode rate|print contrast|sample size|acceptance criteria|test conditions?|heat exposure|humidity|lot number|batch number|carton label)\b/gi;
const REGULATORY_CLAIM_PATTERN = /\b(?:reach|rohs|fda|regulation|regulatory|compliance|compliant|mandatory|certif(?:ied|ication)|iso\s?\d*|fsc|bpa[- ]free|bps[- ]free|food contact)\b/gi;
const ABSOLUTE_CLAIM_PATTERN = /\b(?:guarantee(?:d|s)?|100%|the best|perfect(?:ly)?|eliminate[sd]?|will always|will never)\b/gi;

function countWords(content: string): number {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]+\)/g, " ")
    .replace(/[#>*_|`-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function countMatches(content: string, pattern: RegExp): number {
  return [...content.matchAll(pattern)].length;
}

function plainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[>*_|`]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentenceMetrics(content: string): {
  sentenceCount: number;
  longSentenceCount: number;
  repetitiveOpeningCount: number;
} {
  const sentences = plainText(content)
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.split(/\s+/).length >= 4);
  const openings = new Map<string, number>();

  for (const sentence of sentences) {
    const opening = sentence
      .toLowerCase()
      .replace(/[^a-z0-9\s'-]/g, "")
      .split(/\s+/)
      .slice(0, 2)
      .join(" ");
    if (opening) openings.set(opening, (openings.get(opening) || 0) + 1);
  }

  return {
    sentenceCount: sentences.length,
    longSentenceCount: sentences.filter((sentence) => sentence.split(/\s+/).length > 34).length,
    repetitiveOpeningCount: [...openings.values()].reduce(
      (total, count) => total + (count >= 3 ? count - 2 : 0),
      0,
    ),
  };
}

function push(
  issues: BlogValidationIssue[],
  level: BlogValidationLevel,
  code: string,
  message: string,
  category: BlogValidationCategory = "format",
) {
  issues.push({ level, code, category, message });
}

export function validateBlogPost(input: BlogValidationInput): BlogValidationResult {
  const title = input.title?.trim() || "";
  const excerpt = input.excerpt?.trim() || "";
  const content = input.content?.replace(/\r\n/g, "\n").trim() || "";
  const metaTitle = input.metaTitle?.trim() || "";
  const metaDescription = input.metaDescription?.trim() || "";
  const issues: BlogValidationIssue[] = [];
  const headings = [...content.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
  }));
  const h2Count = headings.filter((heading) => heading.level === 2).length;
  const wordCount = countWords(content);
  const sentenceAudit = sentenceMetrics(content);
  const clicheCount = countMatches(content, AI_CLICHE_PATTERN);
  const vagueBuzzwordCount = countMatches(content, VAGUE_BUZZWORD_PATTERN);
  const transitionCount = countMatches(content, TRANSITION_PATTERN);
  const buyerActionCount = countMatches(content, BUYER_ACTION_PATTERN);
  const specificDetailCount = countMatches(content, SPECIFIC_DETAIL_PATTERN);
  const externalSourceCount = countMatches(content, EXTERNAL_LINK_PATTERN);
  const regulatoryClaimCount = countMatches(content, REGULATORY_CLAIM_PATTERN);
  const absoluteClaimCount = countMatches(content, ABSOLUTE_CLAIM_PATTERN);
  const transitionDensity = sentenceAudit.sentenceCount > 0
    ? transitionCount / sentenceAudit.sentenceCount
    : 0;
  const aiStyleScore = Math.min(
    10,
    Math.min(clicheCount * 2, 6) +
      (vagueBuzzwordCount >= 3 ? 2 : vagueBuzzwordCount >= 1 ? 1 : 0) +
      (transitionCount >= 4 && transitionDensity >= 0.08 ? 2 : 0) +
      (sentenceAudit.repetitiveOpeningCount >= 3 ? 2 : 0),
  );
  const aiStyleRisk: BlogAiStyleRisk = aiStyleScore >= 7
    ? "high"
    : aiStyleScore >= 3
      ? "medium"
      : "low";
  const hasFaq = headings.some(
    (heading) => heading.level === 2 && /frequently asked questions|faq/i.test(heading.text),
  );

  if (!title) push(issues, "error", "title-required", "Article title is required.");
  if (!content) push(issues, "error", "content-required", "Article content is required.");

  if (headings.some((heading) => heading.level === 1)) {
    push(
      issues,
      "error",
      "duplicate-h1",
      "Remove the Markdown H1. The article title is already rendered as the page H1.",
    );
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) {
      push(
        issues,
        "error",
        "heading-jump",
        `Heading level jumps from H${headings[index - 1].level} to H${headings[index].level}.`,
      );
      break;
    }
  }

  if (PLACEHOLDER_PATTERN.test(content)) {
    push(issues, "error", "placeholder-copy", "Remove drafting placeholders before approval or publication.");
  }
  if (wordCount < 600) {
    push(issues, "error", "content-depth", `The article has ${wordCount} words; publishable guides need at least 600.`);
  }
  if (h2Count < 3) {
    push(issues, "error", "section-structure", "Use at least three H2 sections to make the guide scannable.");
  }
  if (!INTERNAL_LINK_PATTERN.test(content)) {
    push(issues, "error", "internal-link", "Add at least one internal product, industry, compliance, contact, or quote link.");
  }

  if (clicheCount > 0) {
    push(
      issues,
      clicheCount >= 3 ? "error" : "warning",
      "ai-cliche-language",
      `Found ${clicheCount} generic AI-style phrase${clicheCount === 1 ? "" : "s"}. Replace them with buyer-specific facts or actions.`,
      "ai-style",
    );
  }
  if (vagueBuzzwordCount >= 3) {
    push(
      issues,
      "warning",
      "ai-vague-buzzwords",
      `Found ${vagueBuzzwordCount} vague marketing terms. Explain the measurable buyer outcome instead.`,
      "ai-style",
    );
  }
  if (transitionCount >= 4 && transitionDensity >= 0.08) {
    push(
      issues,
      "warning",
      "ai-transition-density",
      "Formulaic transition words are unusually dense. Vary the flow and remove transitions that add no meaning.",
      "ai-style",
    );
  }
  if (sentenceAudit.repetitiveOpeningCount >= 3) {
    push(
      issues,
      "warning",
      "ai-repetitive-openings",
      "Several sentences repeat the same opening pattern. Vary sentence structure where it improves clarity.",
      "ai-style",
    );
  }
  if (aiStyleRisk === "high") {
    push(
      issues,
      "error",
      "ai-style-high-risk",
      "AI-style writing risk is high. Complete a human line edit before approval or publication.",
      "ai-style",
    );
  } else if (aiStyleRisk === "medium") {
    push(
      issues,
      "warning",
      "ai-style-manual-review",
      "AI-style writing risk is medium. Review the highlighted patterns before approval.",
      "ai-style",
    );
  }

  if (regulatoryClaimCount >= 2 && externalSourceCount === 0) {
    push(
      issues,
      "warning",
      "evidence-gap",
      "Regulatory or certification claims appear without an external source. Add one or mark the claim for verification.",
      "evidence",
    );
  }
  if (absoluteClaimCount > 0) {
    push(
      issues,
      "warning",
      "absolute-claim-review",
      `Review ${absoluteClaimCount} absolute or superlative claim${absoluteClaimCount === 1 ? "" : "s"} for proof and qualification.`,
      "evidence",
    );
  }
  if (wordCount >= 600 && specificDetailCount < 4) {
    push(
      issues,
      "warning",
      "low-specificity",
      "The guide has few measurable specifications or operating details. Add concrete buyer decision criteria.",
      "buyer-value",
    );
  }
  if (wordCount >= 600 && buyerActionCount < 5) {
    push(
      issues,
      "warning",
      "weak-buyer-actions",
      "Add more actions a buyer can take, such as testing samples, confirming specifications, or documenting acceptance criteria.",
      "buyer-value",
    );
  }
  if (
    sentenceAudit.sentenceCount >= 12 &&
    sentenceAudit.longSentenceCount >= 5 &&
    sentenceAudit.longSentenceCount / sentenceAudit.sentenceCount >= 0.25
  ) {
    push(
      issues,
      "warning",
      "long-sentence-density",
      "Long sentences are dense. Split selected sentences so procurement readers can scan requirements faster.",
      "buyer-value",
    );
  }

  if (title.length > 75) push(issues, "warning", "long-title", "The on-page title is longer than 75 characters.", "seo");
  if (!excerpt) {
    push(issues, "warning", "missing-excerpt", "Add a concise excerpt for Blog cards and fallback metadata.", "seo");
  } else if (excerpt.length < 80 || excerpt.length > 220) {
    push(issues, "warning", "excerpt-length", "Keep the excerpt between 80 and 220 characters.", "seo");
  }
  if (metaTitle && metaTitle.length > 60) {
    push(issues, "warning", "meta-title-length", "Keep the SEO title at 60 characters or fewer.", "seo");
  }
  if (!metaDescription) {
    push(issues, "warning", "missing-meta-description", "Add a dedicated SEO description.", "seo");
  } else if (metaDescription.length < 120 || metaDescription.length > 165) {
    push(issues, "warning", "meta-description-length", "Keep the SEO description between 120 and 165 characters.", "seo");
  }
  if (!hasFaq) {
    push(issues, "warning", "missing-faq", "Add a Frequently Asked Questions section when the topic supports it.");
  }
  if (/^#{2,6}\s/m.test(content.split("\n").find((line) => line.trim()) || "")) {
    push(issues, "warning", "missing-lead", "Open with a direct-answer paragraph before the first heading.");
  }

  return {
    issues,
    errors: issues.filter((issue) => issue.level === "error"),
    warnings: issues.filter((issue) => issue.level === "warning"),
    wordCount,
    h2Count,
    hasFaq,
    qualityAudit: {
      aiStyleRisk,
      aiStyleScore,
      clicheCount,
      vagueBuzzwordCount,
      transitionCount,
      repetitiveOpeningCount: sentenceAudit.repetitiveOpeningCount,
      externalSourceCount,
      buyerActionCount,
      specificDetailCount,
      longSentenceCount: sentenceAudit.longSentenceCount,
    },
  };
}
