import type { BlogCampaign } from "@/content/blogCampaigns/types";

export const NORTH_AMERICA_THERMAL_PAPER_P0_CAMPAIGN: BlogCampaign = {
  id: "north-america-thermal-paper-p0-2026",
  name: "North America Thermal Paper P0",
  cadenceDays: 7,
  description:
    "Working-draft briefs for US and Canada buyers. Import them into the backend, enrich the evidence, then approve only the versions that are ready for publication.",
  posts: [
    {
      slug: "receipt-roll-rfq-checklist-usa-canada",
      title: "Receipt Roll RFQ Checklist for USA and Canada Buyers",
      excerpt:
        "A draft brief for building a cleaner RFQ around width, OD, core, winding, chemistry scope, carton packing, and delivery expectations.",
      category: "Product Guide",
      tags: "receipt roll, RFQ checklist, USA, Canada",
      readTime: "7 min",
      content: `Direct-answer summary: use this draft to turn a broad receipt-roll enquiry into a specification-based RFQ before you ask suppliers for pricing.

## Buyer objective

This draft is intended for a procurement-facing article focused on North American distributors, importers, and multi-location retail operators. Expand it into a final guide that helps buyers define roll width, outer diameter, core ID, winding direction, image chemistry scope, carton label requirements, and destination details before quoting.

## Draft outline

- Explain the difference between printer-fit measurements and commercial order quantities.
- Add one section for device verification: printer model, paper path, compartment limits, sensing, and sample approval.
- Add one section for material review: BPA-free, BPS-free, top coat, archive target, and storage conditions.
- Add one section for logistics: pallet pattern, mixed-SKU rules, customs documents, and delivery terms.

## Evidence to add before publication

- Insert a width and OD example table for 80x80, 80x70, 57x40, and one ATM or kiosk format.
- Add internal links to [/products/thermal-paper-rolls](/products/thermal-paper-rolls), [/blog/thermal-paper-roll-sizes-guide](/blog/thermal-paper-roll-sizes-guide), and [/quote](/quote).
- Add one FAQ on how buyers should handle unknown printer models.

## Writer notes

Do not publish this draft until the article has measurable examples, FAQ coverage, and a clear CTA for sample approval or RFQ submission.`,
    },
    {
      slug: "thermal-label-printer-approval-checklist-usa-canada",
      title: "Thermal Label Printer Approval Checklist for USA and Canada Projects",
      excerpt:
        "A draft checklist article covering printer path fit, label size approval, ribbon or direct-thermal choice, barcode verification, and warehouse trials.",
      category: "Technical Tips",
      tags: "thermal labels, printer approval, barcode verification",
      readTime: "8 min",
      content: `Direct-answer summary: this draft frames the approval steps buyers should complete before releasing a warehouse or retail thermal-label order.

## Buyer objective

Turn this into a scannable article for operations managers and sourcing teams that need to qualify label construction against the named printer, software output, barcode requirements, and storage conditions.

## Draft outline

- Cover media dimensions, gap or black mark sensing, roll direction, core, and maximum outer diameter.
- Compare direct thermal and thermal transfer when retention, abrasion, heat, or chemical exposure changes the print route.
- Add a section for barcode quality checks including scanner type, sample size, and acceptance criteria.
- Add a final section for warehouse rollout planning, carton labels, and re-order controls.

## Evidence to add before publication

- Link to [/products/thermal-labels](/products/thermal-labels), [/blog/direct-vs-thermal-transfer](/blog/direct-vs-thermal-transfer), and [/samples](/samples).
- Add one table comparing shipping labels, freezer labels, and warehouse shelf labels.
- Add a short FAQ section on when a buyer should request both paper and film samples.

## Writer notes

Keep the final article procurement-oriented. Avoid generic label-printing explanations unless they help a buyer approve a real SKU faster.`,
    },
    {
      slug: "private-label-receipt-roll-artwork-proof-checklist",
      title: "Private Label Receipt Roll Artwork and Proof Checklist",
      excerpt:
        "A draft workflow for branded receipt rolls covering print side, color limits, QR placement, approval records, and carton-marking controls.",
      category: "Education",
      tags: "private label, artwork proof, branded receipt rolls",
      readTime: "6 min",
      content: `Direct-answer summary: this draft should become a practical guide for private-label buyers who need to control artwork approval before bulk production.

## Buyer objective

The final article should help distributors and brand owners avoid avoidable proofing delays on custom-printed receipt rolls. Focus on what the buyer must confirm before first production and before repeat orders.

## Draft outline

- Explain what needs to be fixed in the RFQ: roll size, print side, number of colors, repeat length, and carton marking.
- Add a proof-approval section that covers revision tracking, QR readability, coupon zone limits, and sign-off responsibilities.
- Add a packaging section on inner labels, carton labels, pallet labels, and market-specific language requirements.

## Evidence to add before publication

- Link to [/oem-custom/private-label](/oem-custom/private-label), [/contact](/contact), and [/blog/how-to-print-logo-on-thermal-paper-rolls](/blog/how-to-print-logo-on-thermal-paper-rolls).
- Add a sample approval checklist in bullet or table form.
- Add FAQ coverage on whether repeat orders can reuse previous artwork files without a fresh approval cycle.

## Writer notes

Keep the final version tightly commercial. The goal is to reduce proofing friction and shorten the buyer approval cycle, not to explain design theory.`,
    },
    {
      slug: "cold-chain-label-material-review-checklist",
      title: "Cold Chain Label Material Review Checklist for North American Buyers",
      excerpt:
        "A draft checklist for refrigerated and freezer label projects covering application temperature, service temperature, moisture, facestock, adhesive, and printer approval.",
      category: "Product Guide",
      tags: "cold chain labels, freezer label checklist, adhesive review",
      readTime: "8 min",
      content: `Direct-answer summary: use this draft to structure a stronger cold-chain label review before quoting or approving production.

## Buyer objective

Build the final article for food, cold-storage, and fulfilment buyers who need to qualify label materials under moisture, condensation, freezer storage, and barcode scanning conditions.

## Draft outline

- Distinguish application temperature from service temperature and thaw-freeze cycling.
- Add a section on surfaces: corrugated, PE bags, PP packs, and reusable totes.
- Add a section for print route selection, barcode testing, and storage simulation.
- Add a section on documentation: adhesive scope, food-contact review, and sample retention notes.

## Evidence to add before publication

- Link to [/industries/food-cold-chain](/industries/food-cold-chain), [/products/thermal-labels/freezer-labels](/products/thermal-labels/freezer-labels), and [/blog/freezer-label-adhesive-guide](/blog/freezer-label-adhesive-guide).
- Add one table comparing chilled, freezer, and ambient transition cases.
- Add FAQ coverage on when buyers should request field trials on actual product surfaces.

## Writer notes

Do not publish this draft until it includes measurable buyer decision criteria and at least one internal CTA for samples or specification review.`,
    },
  ],
};
