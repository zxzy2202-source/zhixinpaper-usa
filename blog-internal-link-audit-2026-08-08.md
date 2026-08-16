# Blog Internal Link Audit

**Audit date:** 2026-08-08  
**Scope:** Next.js source code for `/blog`, `/blog/[slug]`, static blog data, built-in blog seeds, industry link registry, reference links, and sitemap generation.  
**Method:** Static source inspection plus slug/count checks and blog-specific tests.

## Executive Summary

The current blog internal-link foundation is functional and passes the existing blog validation tests.

- 12 static blog posts are registered in `src/lib/data.ts`.
- All 12 static posts have matching long-form content in `src/lib/blog-content.ts`.
- All 12 static posts have at least one configured industry-page link.
- All configured industry slugs resolve to entries in the shared `INDUSTRIES` data, so no broken industry target was found in the registry.
- Built-in seed generation adds industry links, CTAs, and, where configured, external reference sources.
- The sitemap includes both static blog posts and published database posts, with duplicate URL removal.
- Blog-specific tests and TypeScript validation passed.

Two structural opportunities remain:

1. **Product-owner links are missing from the static article body/link registry.** Articles link to industry pages and conversion pages, but they do not directly link readers to the relevant product category or product detail owner pages. This weakens the intended information-to-product path for commercial queries.
2. **Database-post related articles are incomplete.** The database branch of `BlogPostClient` calculates related articles from static `BLOG_POSTS` only. Published database articles therefore cannot recommend one another through the related-article module.

These are enhancement findings, not broken-link incidents.

## Coverage Results

| Check | Result | Evidence |
| --- | --- | --- |
| Static post registry | PASS | 12 entries in `src/lib/data.ts:984` |
| Static content match | PASS | 12/12 `BLOG_POSTS` slugs found in `BLOG_CONTENT` |
| Industry link coverage | PASS | 12/12 posts have at least one `BLOG_INDUSTRY_LINKS` entry |
| Industry target validity | PASS | Targets match shared `INDUSTRIES` slugs |
| Conversion links | PASS | Built-in seeds add `/samples`, `/quote`, and `/contact` |
| Blog index to detail links | PASS | `BlogListClient` links every card to `/blog/{slug}` |
| Breadcrumb links | PASS | Static and DB article branches link to `/` and `/blog` |
| Sitemap blog coverage | PASS | Static and published DB posts are included and deduplicated |
| Built-in blog validation | PASS | `tests/blog-built-in-seeds.test.ts` |
| TypeScript | PASS | `npm run typecheck` |

## Current Internal-Link Structure

### Static article branch

The static branch in `src/app/blog/[slug]/BlogPostClient.tsx` provides:

- Breadcrumb links to `/` and `/blog`.
- Related-article links to same-category static posts.
- A fallback list of other static posts when no same-category posts exist.
- Industry links from `BLOG_INDUSTRY_LINKS` to `/industries/{slug}`.
- Quick links to `/samples`, `/quote`, `/compliance/certificates`, `/faq`, and `/contact`.
- A shared `CTABanner` after the article.

Built-in database seeds also materialize the configured links into Markdown through `src/lib/blogBuiltInSeeds.ts`, so imported built-in posts retain the industry and CTA links.

### Database article branch

The DB article branch provides:

- Breadcrumb links to `/` and `/blog`.
- Related articles selected from static `BLOG_POSTS` by category.
- Quick links to conversion, compliance, FAQ, and contact pages.
- A shared `CTABanner`.

It does not currently use published DB posts as candidates for related articles.

## Findings

### F1 — Medium: Product-owner links are not part of article content

**Evidence:**

- `src/lib/blog-content.ts` contains article paragraphs without Markdown internal links.
- `src/lib/blog-industry-links.ts` maps articles to industry pages only.
- `src/lib/blogBuiltInSeeds.ts` adds industry links and conversion links, but no product-owner link registry.

**Impact:**

Readers can move from an article to an industry page or RFQ form, but the article-to-product path is indirect. This is most relevant for the following guides:

- `thermal-paper-roll-sizes-guide` → `/products/thermal-paper-rolls`
- `thermal-paper-printer-compatibility-guide` → `/products/thermal-paper-rolls`
- `direct-vs-thermal-transfer` → `/products/thermal-labels`
- `freezer-label-adhesive-guide` → `/products/thermal-labels/freezer-cold-chain-labels`
- `lottery-ticket-paper-specifications` → `/products/thermal-paper-rolls/lottery-gaming-rolls`
- `casino-receipt-paper-guide` → `/products/thermal-paper-rolls/casino-tito-rolls`
- `amazon-fba-thermal-labels-guide` → `/products/thermal-labels/direct-thermal-labels`
- `how-to-print-logo-on-thermal-paper-rolls` → `/oem-custom/custom-printing` or `/products/thermal-paper-rolls/custom-printed-rolls`

**Recommendation:** Add a small, reviewed `BLOG_PRODUCT_LINKS` registry and render a short “Related product specifications” section after the article body. Keep one or two canonical product links per article to avoid over-linking and preserve the page ledger ownership model.

### F2 — Medium: DB posts cannot recommend other DB posts

**Evidence:** `src/app/blog/[slug]/BlogPostClient.tsx:60-62` calculates DB-post related content with `BLOG_POSTS.filter(...)`. The static branch uses the same static source at `:172-173`.

**Impact:**

When an admin publishes multiple database articles in the same category, those posts are absent from the related-article candidates. The article still has valid navigation and CTA links, but the internal-link graph does not grow with the database content.

**Recommendation:** Pass a normalized list of published DB post summaries from the server page to the client, or move related-post selection to the server page. Exclude the current slug, prefer the same category, then fill remaining slots with recent published posts. Preserve the static fallback when the database is unavailable.

### F3 — Low: Static article content is not directly contextualized to product pages

**Evidence:** The structured article content in `src/lib/blog-content.ts` is rendered as plain paragraphs at `src/app/blog/[slug]/BlogPostClient.tsx:200-215`; no automatic contextual-link transformation is applied.

**Impact:**

Important commercial terms such as thermal paper rolls, direct thermal labels, and custom printing remain unlinked in the main reading flow. The sidebar and end-of-article modules compensate partially, but contextual links are more useful for readers who reach a decision point inside the article.

**Recommendation:** Prefer explicit editorial links in the generated seed section or the proposed `BLOG_PRODUCT_LINKS` module. Avoid global keyword auto-linking, which can create ambiguous or repetitive anchors across articles.

### F4 — Low: No dedicated automated contract checks the blog link graph

**Evidence:** Existing blog tests validate seed quality, campaign uniqueness, and post-quality signals, but do not assert:

- every `BLOG_INDUSTRY_LINKS` slug exists in `INDUSTRIES`;
- every built-in post has at least one expected conversion link;
- every configured product link resolves to a registered product or page owner;
- DB related-post selection includes published DB posts.

**Recommendation:** Add a focused contract test if the product-link registry or DB related-post behavior is implemented. This should be a small test alongside the existing blog tests rather than a full crawler.

## No Issues Found

- No missing static content was found for registered blog slugs.
- No broken industry slug was found in `BLOG_INDUSTRY_LINKS`.
- No duplicate static blog slug was observed in the registry.
- No evidence of `/blog` cards pointing to a wrong path.
- No evidence that static blog URLs are missing from `sitemap.ts`.
- Existing blog validation does detect the absence of any internal Markdown link in a newly created DB post through `INTERNAL_LINK_PATTERN` in `src/lib/blogPostValidation.ts:48-49`.

## Verification Commands

```text
npm run typecheck
node --import tsx --test tests/blog-built-in-seeds.test.ts tests/blog-campaigns.test.ts tests/blog-post-validation.test.ts
```

Both checks passed on 2026-08-08.

## Prioritized Action List

1. Add a reviewed product-link registry for the highest-intent guides and render one compact product-context block per article.
2. Extend DB related-article selection to include published DB posts while preserving static fallback behavior.
3. Add contract tests for industry/product link target validity and related-post source coverage.
4. Re-run the blog route/link audit after implementation, then run the full repository quality gates before publishing.
