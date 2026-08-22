import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import blogIndustryLinksModule from "../src/lib/blog-industry-links.ts";
import dataModule from "../src/lib/data.ts";
import caseStudiesModule from "../src/lib/case-studies.ts";
import marketInsightsModule from "../src/lib/marketInsights.ts";

const { BLOG_INDUSTRY_LINKS } = blogIndustryLinksModule;
const { BLOG_POSTS, COMPLIANCE_ITEMS, INDUSTRIES } = dataModule;
const { CASE_STUDIES } = caseStudiesModule;
const {
  buildIndustryEvidenceAnswers,
  INDUSTRY_RESOURCES,
  INDUSTRY_SOLUTION_COMPARISONS,
} = marketInsightsModule;

const read = (path) => readFileSync(path, "utf8");

test("product explorer keeps accessible filter and result states", () => {
  const explorer = read("src/components/products/ProductExplorer.tsx");
  assert.match(explorer, /aria-pressed=/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /<details/);
  assert.match(explorer, /No products match these filters\./);
  assert.match(explorer, /Clear filters/);
  assert.match(explorer, /Request a Quote/);
});

test("product explorer restores and publishes URL state", () => {
  const explorer = read("src/components/products/ProductExplorer.tsx");
  assert.match(explorer, /parseProductFilters\(window\.location\.search\)/);
  assert.match(explorer, /window\.history\.pushState/);
  assert.match(explorer, /addEventListener\("popstate"/);
  assert.match(explorer, /removeEventListener\("popstate"/);
});

test("products page keeps crawlable SEO entities", () => {
  const page = read("src/app/products/page.tsx");
  assert.match(page, /CollectionPage/);
  assert.match(page, /ItemList/);
  assert.match(page, /faqSchema/);
  assert.match(page, /build(?:Section)?Metadata\(/);
  assert.match(page, /path: "\/products"/);
});

test("products page supplies the complete catalog to the explorer", () => {
  const page = read("src/app/products/page.tsx");
  assert.match(page, /import ProductExplorer from "@\/components\/products\/ProductExplorer"/);
  assert.match(page, /createProductExplorerItems\(THERMAL_PAPER_ROLLS, THERMAL_LABELS\)/);
  assert.match(page, /<ProductExplorer items=\{productExplorerItems\}/);
  assert.doesNotMatch(page, /const bestSellingProducts =/);
  assert.doesNotMatch(page, /const compareRows =/);
  assert.doesNotMatch(page, /const productDirectory =/);
});

test("industry pages provide responsive, conditional solution comparisons", () => {
  const page = read("src/app/industries/[slug]/page.tsx");
  const industrySlugs = INDUSTRIES.map((industry) => industry.slug).sort();
  const configuredSlugs = Object.keys(INDUSTRY_SOLUTION_COMPARISONS).sort();

  assert.deepEqual(configuredSlugs, industrySlugs, "comparison configurations must match the industry directory");
  for (const slug of industrySlugs) {
    const comparisons = INDUSTRY_SOLUTION_COMPARISONS[slug];
    assert.ok(comparisons.length >= 3, `${slug} must have at least three comparison rows for evidence answers`);
    for (const comparison of comparisons) {
      assert.ok(comparison.decision.trim(), `${slug} comparison decision must not be empty`);
      assert.ok(comparison.optionA.trim(), `${slug} comparison option A must not be empty`);
      assert.ok(comparison.optionB.trim(), `${slug} comparison option B must not be empty`);
      assert.ok(comparison.chooseBy.trim(), `${slug} comparison criteria must not be empty`);
    }
  }
  assert.match(page, /solutionComparisons\.length > 0/);
  assert.match(page, /<table/);
  assert.match(page, /hidden overflow-x-auto[^\n]+md:block/);
  assert.match(page, /md:hidden/);
  assert.match(page, /These are decision paths, not fixed performance claims\./);
});

test("industry resource links cover every industry and resolve to published content", () => {
  const page = read("src/app/industries/[slug]/page.tsx");
  const industrySlugs = INDUSTRIES.map((industry) => industry.slug).sort();
  const configuredSlugs = Object.keys(INDUSTRY_RESOURCES).sort();
  const blogHrefs = new Set(BLOG_POSTS.map((post) => `/blog/${post.slug}`));
  const complianceHrefs = new Set(COMPLIANCE_ITEMS.map((item) => `/compliance/${item.slug}`));
  const caseStudyHrefs = new Set(CASE_STUDIES.map((item) => `/case-studies/${item.slug}`));

  assert.deepEqual(configuredSlugs, industrySlugs, "resource configurations must match the industry directory");
  for (const slug of industrySlugs) {
    const resources = INDUSTRY_RESOURCES[slug];
    assert.ok(blogHrefs.has(resources.technicalGuide.href), `${slug} technical guide must reference a published blog post`);
    assert.ok(complianceHrefs.has(resources.compliance.href), `${slug} compliance link must reference a configured page`);
    assert.ok(
      resources.caseStudy.href === "/case-studies" || caseStudyHrefs.has(resources.caseStudy.href),
      `${slug} case-study link must reference the directory or an existing anonymized case study`
    );
    for (const resource of Object.values(resources)) {
      assert.ok(resource.label.trim(), `${slug} resource label must not be empty`);
      assert.ok(resource.description.trim(), `${slug} resource description must not be empty`);
    }
  }
  assert.equal(
    INDUSTRY_RESOURCES["cannabis-specialty"].compliance.href,
    "/compliance/reach-rohs",
    "cannabis labels must use material-scope review rather than medical-device labeling guidance"
  );
  assert.match(page, /resources &&/);
  assert.match(page, /aria-labelledby="industry-resources-heading"/);
  assert.match(page, /md:grid-cols-3/);
  assert.match(page, /Project pages describe anonymized review workflows, not universal outcomes\./);
  assert.match(page, /<IndustryResourceCard eyebrow="Project evidence"/);
  assert.match(page, /<IndustryResourceCard eyebrow="Technical guide"/);
  assert.match(page, /<IndustryResourceCard eyebrow="Compliance review"/);
});

test("industry pages render three conditional evidence answers with verified routes", () => {
  const page = read("src/app/industries/[slug]/page.tsx");

  for (const industry of INDUSTRIES) {
    const resources = INDUSTRY_RESOURCES[industry.slug];
    const answers = buildIndustryEvidenceAnswers(INDUSTRY_SOLUTION_COMPARISONS[industry.slug], resources);
    const questions = new Set(answers.map((answer) => answer.question));

    assert.equal(answers.length, 3, `${industry.slug} must render exactly three evidence answers`);
    assert.equal(questions.size, 3, `${industry.slug} evidence questions must be unique`);
    for (const answer of answers) {
      assert.ok(answer.condition.trim(), `${industry.slug} evidence condition must not be empty`);
      assert.match(answer.answer, /Neither option is universally preferable/);
      assert.match(answer.answer, /document review confirms only its stated scope/);
      assert.deepEqual(
        answer.evidence.map((evidence) => evidence.href),
        [resources.technicalGuide.href, resources.compliance.href, "/samples"],
        `${industry.slug} answers must expose technical, document-scope, and application-proof paths`
      );
    }
  }
  assert.match(page, /buildIndustryEvidenceAnswers\(solutionComparisons, resources\)/);
  assert.match(page, /Verification paths/);
  assert.match(page, /item\.evidence\.map/);
  assert.match(page, /Verify against: \{item\.condition\}/);
  assert.match(page, /aria-labelledby="evidence-answers-heading"/);
  assert.match(page, /lg:grid-cols-3/);
  assert.match(page, /It does not replace the named/);
});

test("every static blog links back to verified industry applications", () => {
  const client = read("src/app/blog/[slug]/BlogPostClient.tsx");
  const blogSlugs = BLOG_POSTS.map((post) => post.slug).sort();
  const configuredBlogSlugs = Object.keys(BLOG_INDUSTRY_LINKS).sort();
  const industriesBySlug = new Map(INDUSTRIES.map((industry) => [industry.slug, industry]));
  const expectedLinks = {
    "bpa-free-thermal-paper-europe": ["retail-pos", "events-hospitality", "food-cold-chain"],
    "what-is-thermal-paper": ["retail-pos", "transportation", "government-legal"],
    "lottery-ticket-paper-specifications": ["lottery-gaming"],
    "casino-receipt-paper-guide": ["casino", "lottery-gaming"],
    "freezer-label-adhesive-guide": ["food-cold-chain", "logistics-warehouse"],
    "reach-compliance-thermal-paper": ["retail-pos", "logistics-warehouse"],
    "direct-vs-thermal-transfer": ["logistics-warehouse", "healthcare-pharma", "automotive-industrial"],
    "cannabis-label-requirements-usa": ["cannabis-specialty"],
    "how-to-print-logo-on-thermal-paper-rolls": ["retail-pos", "events-hospitality", "banking-finance"],
    "amazon-fba-thermal-labels-guide": ["ecommerce", "logistics-warehouse"],
    "thermal-paper-printer-compatibility-guide": ["retail-pos", "banking-finance", "transportation"],
    "thermal-paper-roll-sizes-guide": ["retail-pos", "banking-finance", "events-hospitality"],
  };

  assert.deepEqual(configuredBlogSlugs, blogSlugs, "industry-link mappings must match all static blog posts");
  assert.deepEqual(Object.keys(expectedLinks).sort(), blogSlugs, "reviewed blog-link allowlist must cover every static post");
  for (const blogSlug of blogSlugs) {
    const links = BLOG_INDUSTRY_LINKS[blogSlug];
    const linkedSlugs = links.map((link) => link.slug);

    assert.deepEqual(linkedSlugs, expectedLinks[blogSlug], `${blogSlug} must keep its reviewed industry mapping`);
    assert.ok(links.length >= 1 && links.length <= 3, `${blogSlug} must link to one through three industries`);
    assert.equal(new Set(linkedSlugs).size, linkedSlugs.length, `${blogSlug} must not repeat an industry link`);
    for (const link of links) {
      const industry = industriesBySlug.get(link.slug);
      assert.ok(industry, `${blogSlug} must reference a configured industry: ${link.slug}`);
      assert.equal(link.label, industry.name, `${blogSlug} must use the configured industry name for ${link.slug}`);
      assert.ok(link.description.trim(), `${blogSlug} industry description must not be empty`);
    }
  }

  const componentBody = client.split("export default function BlogPostClient", 2)[1];
  const [databaseBranch, staticBranch] = componentBody.split("// Static data fallback", 2);
  assert.ok(databaseBranch && staticBranch, "blog client must retain separate database and static branches");
  assert.doesNotMatch(databaseBranch, /BLOG_INDUSTRY_LINKS\[slug\]/);
  assert.match(databaseBranch, /industryLinks=\{\[\]\}/);
  assert.match(staticBranch, /const industryLinks = BLOG_INDUSTRY_LINKS\[slug\] \|\| \[\]/);
  assert.match(staticBranch, /industryLinks=\{industryLinks\}/);
  assert.match(client, /if \(links\.length === 0\) return null/);
  assert.match(client, /href=\{`\/industries\/\$\{industry\.slug\}`\}/);
  assert.match(client, /aria-labelledby="related-industries-heading"/);
  assert.match(client, /They do not replace device qualification, document-scope review, or representative sample testing\./);
});
