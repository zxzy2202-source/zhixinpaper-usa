export type BlogIndustryLink = {
  slug: string;
  label: string;
  description: string;
};

export const BLOG_INDUSTRY_LINKS: Record<string, BlogIndustryLink[]> = {
  "bpa-free-thermal-paper-europe": [
    { slug: "retail-pos", label: "Retail & POS", description: "Receipt-grade selection, handling policy, and destination-specific document review." },
    { slug: "events-hospitality", label: "Events & Hospitality", description: "Guest-facing receipt and ticket applications with grade-specific document needs." },
    { slug: "food-cold-chain", label: "Food & Cold Chain", description: "Separate receipt-paper chemistry review from food-label construction and contact conditions." },
  ],
  "what-is-thermal-paper": [
    { slug: "retail-pos", label: "Retail & POS", description: "Apply thermal-paper fundamentals to receipt rolls, payment terminals, and branded formats." },
    { slug: "transportation", label: "Transportation", description: "Translate material, sensing, and exposure fundamentals into ticket-system requirements." },
    { slug: "government-legal", label: "Government & Legal", description: "Define retention, storage, and document-control conditions before selecting record media." },
  ],
  "lottery-ticket-paper-specifications": [
    { slug: "lottery-gaming", label: "Lottery & Gaming", description: "Build terminal, ticket geometry, sensing, barcode, retention, and sample requirements." },
  ],
  "casino-receipt-paper-guide": [
    { slug: "casino", label: "Casino", description: "Qualify platform fit, sensing, barcode rules, validity, packing, and controlled trials." },
    { slug: "lottery-gaming", label: "Lottery & Gaming", description: "Compare adjacent ticketing requirements without assuming cross-platform approval." },
  ],
  "freezer-label-adhesive-guide": [
    { slug: "food-cold-chain", label: "Food & Cold Chain", description: "Match application temperature, service temperature, surface, moisture, and freeze-thaw exposure." },
    { slug: "logistics-warehouse", label: "Logistics & Warehouse", description: "Review cold-storage carton and pallet labeling conditions alongside printer workflow." },
  ],
  "reach-compliance-thermal-paper": [
    { slug: "retail-pos", label: "Retail & POS", description: "Review receipt-grade chemistry and destination scope for the quoted construction." },
    { slug: "logistics-warehouse", label: "Logistics & Warehouse", description: "Check facestock and adhesive substance scope separately from barcode performance." },
  ],
  "direct-vs-thermal-transfer": [
    { slug: "logistics-warehouse", label: "Logistics & Warehouse", description: "Choose a print route by journey, storage, abrasion, ribbon, and scanner requirements." },
    { slug: "healthcare-pharma", label: "Healthcare & Pharma", description: "Compare retention and exposure needs without treating the print method as application approval." },
    { slug: "automotive-industrial", label: "Automotive & Industrial", description: "Evaluate heat, abrasion, chemicals, ribbon, and service-life conditions." },
  ],
  "cannabis-label-requirements-usa": [
    { slug: "cannabis-specialty", label: "Cannabis & Specialty", description: "Use a jurisdiction-specific qualification workflow for materials, variable data, and approved artwork." },
  ],
  "how-to-print-logo-on-thermal-paper-rolls": [
    { slug: "retail-pos", label: "Retail & POS", description: "Plan branded receipts around print side, artwork, QR area, proof approval, and packing." },
    { slug: "events-hospitality", label: "Events & Hospitality", description: "Connect campaign artwork and sponsor content to venue printer and ticket requirements." },
    { slug: "banking-finance", label: "Banking & Finance", description: "Control disclosure or branded back print through device fit, revision, and proof approval." },
  ],
  "amazon-fba-thermal-labels-guide": [
    { slug: "ecommerce", label: "E-Commerce & Fulfillment", description: "Translate label size, barcode, adhesive, packing, and sample needs into a fulfillment specification." },
    { slug: "logistics-warehouse", label: "Logistics & Warehouse", description: "Connect parcel-label sourcing to printer, carrier, handling, and warehouse conditions." },
  ],
  "thermal-paper-printer-compatibility-guide": [
    { slug: "retail-pos", label: "Retail & POS", description: "Match receipt rolls to printer model, width, OD, core, winding, and sensitivity." },
    { slug: "banking-finance", label: "Banking & Finance", description: "Apply device-specific checks to ATM, teller, kiosk, and payment-terminal rolls." },
    { slug: "transportation", label: "Transportation", description: "Qualify paper path, sensor, cutter, validator, and ticket geometry together." },
  ],
  "thermal-paper-roll-sizes-guide": [
    { slug: "retail-pos", label: "Retail & POS", description: "Measure the full roll geometry before ordering receipt and payment-terminal media." },
    { slug: "banking-finance", label: "Banking & Finance", description: "Use device constraints to define ATM, teller, or kiosk roll dimensions." },
    { slug: "events-hospitality", label: "Events & Hospitality", description: "Confirm venue printer compartments, loading workflow, and campaign consumption." },
  ],
};
