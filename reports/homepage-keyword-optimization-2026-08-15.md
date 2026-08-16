# Homepage Keyword Optimization Report

**Scope:** `src/app/page.tsx`, `src/app/layout.tsx`, `src/lib/seo.ts`, `src/lib/siteSettingsTypes.ts`, `src/lib/data.ts`

**Page:** `/`

**Audit type:** On-page keyword placement, semantic coverage, intent matching, internal linking, and homepage SEO implementation review.

## Executive conclusion

The homepage is clearly positioned for B2B thermal-paper and thermal-label sourcing. Its strongest signals are the product-line structure, application routes, RFQ workflow, image alt text, and links to product and factory pages.

The highest-impact issue is the homepage H1:

> `Verified thermal rolls and labels for import buyers.`

It communicates the buyer and product context, but it does not explicitly contain the primary commercial phrase `thermal paper rolls` or the manufacturer/supplier proposition used by the page metadata. This creates a weaker alignment between title, H1, and the first visible content block than necessary.

## Priority findings

### P1 — Align the H1 with the homepage's primary keyword intent

**Evidence:** `src/app/page.tsx:156-158`

Current H1:

> `Verified thermal rolls and labels for import buyers.`

Recommended direction:

> `Thermal Paper Rolls & Labels Manufacturer for Wholesale Buyers`

Alternative with a more procurement-oriented tone:

> `Wholesale Thermal Paper Rolls & Labels, Matched to Your Specification`

Use one version, then keep the supporting paragraph focused on printer fit, specifications, documents, samples, packing, and delivery. Do not repeat the exact phrase in every H2.

**Why:** The current title default is `Thermal Paper Rolls & Labels Manufacturer`, while the H1 shortens `thermal paper rolls` to `thermal rolls` and omits `manufacturer`. Aligning the H1 with the title improves the title/H1/intro topical chain for commercial and navigational queries.

### P1 — Remove the unused `buildMetadata` import

**Evidence:** `src/app/page.tsx:6`

`buildMetadata` is imported but not used. The page uses `buildSectionMetadata` instead. Remove the unused import to avoid a lint failure under the repository's `--max-warnings=0` configuration.

### P1 — Resolve the historical-year conflict in shared company data

**Evidence:** `src/lib/data.ts:13,18`; `src/lib/siteSettingsTypes.ts:23`; `src/lib/seo.ts:102,328`

The organization and manufacturer schemas correctly use `2009-08`, but shared site data still contains:

- `founded: "2008"`
- `Since 2008`
- `Company Est. 2009`

The current legal entity is registered in August 2009. The earlier operating history should be described separately from the current company's registration year. If `COMPANY` or `DEFAULT_HERO_HOME` is used by any visible page or component, this can create inconsistent entity facts for users and crawlers.

Recommended wording for visible copy:

- `Operating practice since 2008; Xi'an Zhi Xin Paper Co., Ltd. registered in August 2009.`
- Or, when space is limited, omit the year from generic badges and keep the legal registration date in the company facts page and Organization schema.

## Position audit

| Position | Status | Evidence and assessment |
|---|---:|---|
| Title tag | Good, verify runtime value | Default homepage title is `Thermal Paper Rolls & Labels Manufacturer`; layout appends `| Zhixin Paper`. Runtime values can be overridden by `seo.sections.home` in the database. |
| Meta description | Good | Default description identifies products, distributor/importer/private-label buyers, and RFQ inputs. It matches the commercial sourcing intent. |
| H1 | Needs adjustment | Contains `thermal rolls` and `labels`, but not the exact primary phrase `thermal paper rolls`; it also omits `manufacturer` or `supplier`. |
| URL | Good | Homepage root URL is appropriate for the broadest category and brand intent. |
| First 100 words | Acceptable | The H1 and intro establish thermal rolls, labels, import buyers, bulk production, and specification matching. Add the exact primary phrase once if the H1 is not changed. |
| H2 headings | Good with room to refine | `Thermal labels`, `thermal paper` concepts, applications, RFQ, and supply are represented. Avoid adding the exact primary phrase to every heading. |
| Image alt text | Good | Hero and product-card alts describe thermal paper rolls, thermal labels, applications, and manufacturing context. |
| Internal links | Good | Homepage links to `/products`, both product hubs, industry pages, `/quote`, `/samples`, and `/factory/overview`. |
| Structured data | Needs expansion | Global `Organization` and `WebSite` schemas exist. Homepage adds only a one-item `BreadcrumbList`; no homepage-specific `WebPage` or `CollectionPage` entity is emitted. This is not a critical error, but a stronger page/entity relationship would improve machine interpretation. |

## Primary keyword recommendation

**Recommended primary keyword:** `thermal paper rolls and labels manufacturer`

This phrase matches the page's actual offer and buyer intent. Use it as the strategic target, while maintaining natural variants:

- `thermal paper rolls manufacturer`
- `thermal labels manufacturer`
- `wholesale thermal paper rolls`
- `POS paper rolls supplier`
- `direct thermal labels supplier`
- `OEM thermal paper`
- `private label thermal paper`
- `BPA-free thermal paper`

The existing homepage keyword configuration already contains most of these variants in `DEFAULT_SEO_SECTIONS.home`. The remaining job is to make the visible H1 and opening copy reflect the same hierarchy.

## Semantic coverage

**Assessment:** Strong commercial coverage; moderate authority and proof coverage.

### Covered well

- Product categories: thermal paper rolls and thermal labels
- Applications: POS, payment terminals, ATM, lottery, parking, ticketing, shipping, barcode, warehouse, retail, food
- Procurement inputs: size, core, OD, winding, printer model, annual volume, destination, documents, packing, Incoterms
- Supply workflow: specification confirmation, samples/files, repeat orders
- Manufacturer evidence: printer-fit checks, packing control, document matching, factory process
- Commercial paths: quote request, product browsing, sample request

### Thin or missing

- Exact phrase `thermal paper rolls manufacturer` in the visible H1/opening copy
- Explicit `wholesale supplier` phrasing in the visible hero section
- A concise proof statement connecting the company entity, manufacturing capability, and legal business identity
- A homepage FAQ block answering high-intent questions such as roll-size selection, BPA/BPS-free documentation, private-label capability, and RFQ requirements

Do not add unsupported claims such as universal MOQ, fixed lead times, guaranteed certifications, or customer counts. Keep claims tied to the documented RFQ and qualification workflow.

## Intent match

**Detected intent:** Commercial investigation plus transactional B2B sourcing.

**Current content type:** B2B manufacturer/supplier homepage.

**Match:** Aligned.

The homepage leads users toward product discovery, specification review, samples, and quote submission. It should not be rewritten as a general educational article. The recommended optimization is clearer category/entity wording, not a large increase in text volume.

## Cannibalization considerations

A full cannibalization determination requires Search Console query-to-URL data or a live query inventory. From the source structure alone, the intended ownership appears reasonable:

- `/` owns the broad manufacturer/supplier proposition.
- `/products` owns the product collection.
- `/products/thermal-paper-rolls` owns the roll category.
- `/products/thermal-labels` owns the label category.
- Industry pages own application-specific intent.
- Blog pages own informational and specification questions.

Keep the homepage primary keyword broad. Do not retarget the homepage to a narrow term such as `80mm thermal paper rolls` or `4x6 shipping labels`; those belong to the relevant product/category pages.

## Recommended implementation order

1. **High impact:** Replace or revise the H1 so it contains `thermal paper rolls` and the manufacturer/wholesale proposition.
2. **High impact:** Remove the unused `buildMetadata` import and run lint.
3. **High impact:** Separate 2008 operating history from the current company's August 2009 registration year in shared data and any visible component using it.
4. **Medium impact:** Add one short, evidence-based proof paragraph near the factory/RFQ sections that states what is reviewed before quoting.
5. **Medium impact:** Add a compact homepage FAQ only if the answers are maintained as visible content and schema; otherwise keep FAQ intent on `/faq` and link to it.
6. **Medium impact:** Consider adding a homepage `WebPage` schema linked to the existing `Organization` and `WebSite` entities, without emitting unsupported `Product`, `Offer`, `Review`, or `AggregateRating` fields.

## Verification needed after changes

- Confirm rendered title and description from the production metadata path, including database overrides.
- Run the repository lint command because it treats warnings as failures.
- Check that the H1, title, first paragraph, and canonical URL remain aligned.
- Verify no visible copy describes 2008 as the current legal company's registration or founding year.
- Recheck the homepage in a rendered browser at desktop and mobile widths for hero text wrapping and CTA visibility.

**Data source:** Local source inspection only. Keyword volume, difficulty, CPC, and live SERP positions were not used in this audit.
