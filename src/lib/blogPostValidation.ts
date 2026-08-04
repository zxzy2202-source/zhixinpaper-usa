export type BlogValidationLevel = "error" | "warning";
export type BlogValidationCategory = "format" | "seo" | "ai-style" | "evidence" | "buyer-value";
export type BlogAiStyleRisk = "low" | "medium" | "high";
export type BlogContentQualityLevel = "strong" | "needs-review" | "weak";

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
  groupedIssues: Record<BlogValidationCategory, BlogValidationIssue[]>;
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
    hasLeadParagraph: boolean;
    hasInternalLink: boolean;
    contentQualityScore: number;
    contentQualityLevel: BlogContentQualityLevel;
  };
}

const PLACEHOLDER_PATTERN = /\b(?:TBD|TODO|lorem ipsum|needs validation)\b|\[insert[^\]]*\]/i;
const INTERNAL_LINK_PATTERN = /\[[^\]]+\]\(\/(?:products|industries|factory|compliance|markets|contact|quote|samples|faq|oem-custom|blog)(?:\/[^)]*)?\)/i;
const EXTERNAL_LINK_PATTERN = /\[[^\]]+\]\(https?:\/\/[^)]+\)/gi;
const AI_CLICHE_PATTERN = /\b(?:in today'?s (?:fast-paced|digital|ever-changing) world|delve into|navigate the complexities|ever-evolving landscape|game[- ]changer|it is important to note|it is worth noting|when it comes to|plays? a crucial role|unlock(?:ing)? the (?:power|potential)|elevate your|whether you are|stands? out from the crowd)\b/gi;
const VAGUE_BUZZWORD_PATTERN = /\b(?:seamless(?:ly)?|robust|cutting-edge|innovative|best-in-class|revolutionary|transformative|holistic|comprehensive solution|optimi[sz]e your|streamline your)\b/gi;
const TRANSITION_PATTERN = /(?:^|[.!?]\s+|\n)(?:moreover|furthermore|additionally|in conclusion|ultimately|notably|in summary|consequently),?\s/gi;
const BUYER_ACTION_PATTERN = /\b(?:test|confirm|verify|request|compare|measure|record|approve|inspect|sample|quote|specify|check|ask|document|reject|store|pack|review|match|validate|trial)\w*\b/gi;
const SPECIFIC_DETAIL_PATTERN = /\b\d+(?:\.\d+)?\s*(?:mm|cm|m|gsm|g\/m2|microns?|deg c|°c|%|hours?|days?|months?|years?|rolls?|cartons?|pallets?|dpi|kg|lb|usd|eur|cad)\b|\b(?:core size|roll width|roll length|image density|qr code|printer model|storage temperature|inspection plan|scan distance|scan angle|decode rate|print contrast|sample size|acceptance criteria|test conditions?|heat exposure|humidity|lot number|batch number|carton label|label stock|adhesive type|fanfold|release liner|winding direction)\b/gi;
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
    if (opening) {
      openings.set(opening, (openings.get(opening) || 0) + 1);
    }
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

function createGroupedIssues(): Record<BlogValidationCategory, BlogValidationIssue[]> {
  return {
    format: [],
    seo: [],
    "ai-style": [],
    evidence: [],
    "buyer-value": [],
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

function clampScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
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
    (heading) => heading.level === 2 && /frequently asked questions|faq|常见问题/i.test(heading.text),
  );
  const firstMeaningfulLine = content.split("\n").map((line) => line.trim()).find(Boolean) || "";
  const hasLeadParagraph = Boolean(firstMeaningfulLine) && !/^#{1,6}\s/.test(firstMeaningfulLine);
  const hasInternalLink = INTERNAL_LINK_PATTERN.test(content);
  const longSentenceDensity = sentenceAudit.sentenceCount > 0
    ? sentenceAudit.longSentenceCount / sentenceAudit.sentenceCount
    : 0;

  if (!title) {
    push(issues, "error", "title-required", "文章标题不能为空。");
  }
  if (!content) {
    push(issues, "error", "content-required", "文章正文不能为空。");
  }

  if (headings.some((heading) => heading.level === 1)) {
    push(
      issues,
      "error",
      "duplicate-h1",
      "请删除 Markdown 里的 H1。页面会自动把文章标题渲染为 H1。",
    );
  }

  for (let index = 1; index < headings.length; index += 1) {
    if (headings[index].level > headings[index - 1].level + 1) {
      push(
        issues,
        "error",
        "heading-jump",
        `标题层级从 H${headings[index - 1].level} 跳到了 H${headings[index].level}，请按顺序组织标题。`,
      );
      break;
    }
  }

  if (PLACEHOLDER_PATTERN.test(content)) {
    push(issues, "error", "placeholder-copy", "发布前请删除占位词或待补内容。");
  }
  if (wordCount < 600) {
    push(issues, "error", "content-depth", `当前文章约 ${wordCount} 词，建议发布级内容至少达到 600 词。`);
  }
  if (h2Count < 3) {
    push(issues, "error", "section-structure", "请至少设置 3 个 H2 小节，方便读者快速扫读。");
  }
  if (!hasInternalLink) {
    push(issues, "error", "internal-link", "请至少加入 1 个站内链接，例如产品页、合规页、联系页或询盘页。");
  }

  if (clicheCount > 0) {
    push(
      issues,
      clicheCount >= 3 ? "error" : "warning",
      "ai-cliche-language",
      `检测到 ${clicheCount} 处较泛的 AI 套话，建议改成更具体的采购场景、规格差异或操作建议。`,
      "ai-style",
    );
  }
  if (vagueBuzzwordCount >= 3) {
    push(
      issues,
      "warning",
      "ai-vague-buzzwords",
      `检测到 ${vagueBuzzwordCount} 处空泛营销词，建议替换成可验证的规格、测试动作或交付条件。`,
      "ai-style",
    );
  }
  if (transitionCount >= 4 && transitionDensity >= 0.08) {
    push(
      issues,
      "warning",
      "ai-transition-density",
      "过渡词密度偏高，建议减少模板化衔接词，改成更直接的判断和结论。",
      "ai-style",
    );
  }
  if (sentenceAudit.repetitiveOpeningCount >= 3) {
    push(
      issues,
      "warning",
      "ai-repetitive-openings",
      "多句使用了重复开头，建议调整句式，避免明显的机器腔。",
      "ai-style",
    );
  }
  if (aiStyleRisk === "high") {
    push(
      issues,
      "error",
      "ai-style-high-risk",
      "AI 味风险较高，发布前请先做人工润色，补足真实买家问题和决策信息。",
      "ai-style",
    );
  } else if (aiStyleRisk === "medium") {
    push(
      issues,
      "warning",
      "ai-style-manual-review",
      "AI 味风险中等，建议发布前重点检查开头、句式重复和空泛总结。",
      "ai-style",
    );
  }

  if (regulatoryClaimCount >= 2 && externalSourceCount === 0) {
    push(
      issues,
      "warning",
      "evidence-gap",
      "文中出现了合规、法规或认证相关表述，但缺少外部依据。请补充来源或标注为待核实。",
      "evidence",
    );
  }
  if (absoluteClaimCount > 0) {
    push(
      issues,
      "warning",
      "absolute-claim-review",
      `检测到 ${absoluteClaimCount} 处绝对化或夸张表达，请补充限定条件，避免无证据承诺。`,
      "evidence",
    );
  }
  if (wordCount >= 600 && specificDetailCount < 4) {
    push(
      issues,
      "warning",
      "low-specificity",
      "文章里可量化规格或操作细节偏少，建议补充尺寸、材料、测试条件或验收标准。",
      "buyer-value",
    );
  }
  if (wordCount >= 600 && buyerActionCount < 5) {
    push(
      issues,
      "warning",
      "weak-buyer-actions",
      "建议增加更多买家可执行动作，例如打样、确认规格、匹配设备、审核文件或记录测试结果。",
      "buyer-value",
    );
  }
  if (
    sentenceAudit.sentenceCount >= 12 &&
    sentenceAudit.longSentenceCount >= 5 &&
    longSentenceDensity >= 0.25
  ) {
    push(
      issues,
      "warning",
      "long-sentence-density",
      "长句偏多，建议拆分部分句子，让采购、质量和产品读者更快抓到重点。",
      "buyer-value",
    );
  }

  if (title.length > 75) {
    push(issues, "warning", "long-title", "页面标题超过 75 个字符，建议压缩。", "seo");
  }
  if (!excerpt) {
    push(issues, "warning", "missing-excerpt", "请补充摘要，用于博客卡片和元信息兜底。", "seo");
  } else if (excerpt.length < 80 || excerpt.length > 220) {
    push(issues, "warning", "excerpt-length", "摘要建议控制在 80 到 220 个字符之间。", "seo");
  }
  if (metaTitle && metaTitle.length > 60) {
    push(issues, "warning", "meta-title-length", "SEO 标题建议不要超过 60 个字符。", "seo");
  }
  if (!metaDescription) {
    push(issues, "warning", "missing-meta-description", "请补充独立的 SEO 描述。", "seo");
  } else if (metaDescription.length < 120 || metaDescription.length > 165) {
    push(issues, "warning", "meta-description-length", "SEO 描述建议控制在 120 到 165 个字符之间。", "seo");
  }
  if (!hasFaq) {
    push(issues, "warning", "missing-faq", "如果主题适合，建议补一个 FAQ 小节，回答采购常见疑问。");
  }
  if (firstMeaningfulLine && /^#{2,6}\s/.test(firstMeaningfulLine)) {
    push(issues, "warning", "missing-lead", "建议在第一个标题前先写一段直接回答式导语。");
  }

  let contentQualityScore = 100;
  if (!title) {
    contentQualityScore -= 15;
  }
  if (!content) {
    contentQualityScore -= 40;
  }
  if (wordCount < 600) {
    contentQualityScore -= wordCount === 0 ? 35 : 20;
  }
  if (h2Count < 3) {
    contentQualityScore -= 12;
  }
  if (!hasInternalLink) {
    contentQualityScore -= 10;
  }
  if (!hasLeadParagraph) {
    contentQualityScore -= 6;
  }
  if (!hasFaq) {
    contentQualityScore -= 4;
  }
  if (buyerActionCount < 5) {
    contentQualityScore -= 10;
  }
  if (specificDetailCount < 4) {
    contentQualityScore -= 10;
  }
  if (sentenceAudit.longSentenceCount >= 5 && longSentenceDensity >= 0.25) {
    contentQualityScore -= 6;
  }
  if (regulatoryClaimCount >= 2 && externalSourceCount === 0) {
    contentQualityScore -= 8;
  }
  if (absoluteClaimCount > 0) {
    contentQualityScore -= 4;
  }
  if (aiStyleRisk === "medium") {
    contentQualityScore -= 8;
  }
  if (aiStyleRisk === "high") {
    contentQualityScore -= 18;
  }

  const groupedIssues = createGroupedIssues();
  for (const issue of issues) {
    groupedIssues[issue.category].push(issue);
  }

  const score = clampScore(contentQualityScore);
  const contentQualityLevel: BlogContentQualityLevel = score >= 80
    ? "strong"
    : score >= 55
      ? "needs-review"
      : "weak";

  return {
    issues,
    errors: issues.filter((issue) => issue.level === "error"),
    warnings: issues.filter((issue) => issue.level === "warning"),
    groupedIssues,
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
      hasLeadParagraph,
      hasInternalLink,
      contentQualityScore: score,
      contentQualityLevel,
    },
  };
}
