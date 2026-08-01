export const THERMAL_PAPER_TIERS = [
  {
    code: "T1",
    title: "Core volume",
    maturity: "M1",
    summary: "POS, payment-terminal, and common-size repeat orders.",
    buyerTask: "Lock the device, dimensions, tolerances, packing, annual volume, and replenishment plan.",
    href: "/products/thermal-paper-rolls#core-volume",
  },
  {
    code: "T2",
    title: "Compliance premium",
    maturity: "M2",
    summary: "BPA-free, BPS-free, phenol-free, and document-qualified options.",
    buyerTask: "Name the destination market, restricted chemistry, document type, SKU, and batch scope.",
    href: "/compliance/bpa-free",
  },
  {
    code: "T3",
    title: "Functional performance",
    maturity: "M3",
    summary: "Top-coated, water-resistant, three-proof, high-sensitivity, and long-life candidates.",
    buyerTask: "Translate the label into exposure conditions, test duration, and an acceptance standard.",
    href: "/products/thermal-paper-rolls#performance-grades",
  },
  {
    code: "T4",
    title: "Custom and value-added",
    maturity: "M2-M3",
    summary: "Logo, back print, QR, coupon, black mark, private-label, and retail-pack programs.",
    buyerTask: "Confirm artwork, print side, colors, repeat length, scan checks, packaging, and volume.",
    href: "/products/thermal-paper-rolls/custom-printed-rolls",
  },
  {
    code: "T5",
    title: "System-qualified projects",
    maturity: "M3-M4",
    summary: "ATM, parking, kiosk, gaming, medical, transit, and other approval-led programs.",
    buyerTask: "Qualify the device, media format, sensor or cutter, operating environment, and approver.",
    href: "/products/thermal-paper-rolls#system-projects",
  },
] as const;

export const THERMAL_PAPER_SKU_LAYERS = [
  { code: "L0", name: "Supply form", prompt: "Finished roll or capability-gated jumbo reel?" },
  { code: "L1", name: "Application", prompt: "Which printer, device, and operating scenario?" },
  { code: "L2", name: "Physical specification", prompt: "Width, OD or length, core ID, GSM, winding, and mark position?" },
  { code: "L3", name: "Base paper and imaging", prompt: "Sensitivity, print speed, density, background, and scan requirement?" },
  { code: "L4", name: "Protection and durability", prompt: "Which exposure, contact method, temperature, humidity, duration, and pass condition?" },
  { code: "L5", name: "Chemistry and compliance", prompt: "Which restricted chemistry and which document scope for the destination market?" },
  { code: "L6", name: "Converting and printing", prompt: "Plain, logo, back print, QR, black mark, colors, repeat length, and artwork?" },
  { code: "L7", name: "Packaging and supply program", prompt: "Neutral or private label, pack format, carton, mixed SKUs, destination, and replenishment?" },
] as const;

export const THERMAL_PAPER_GRADE_PATHS = [
  {
    name: "Standard and high-sensitivity",
    maturity: "M1-M2",
    use: "Match print-head energy, speed, optical density, background, and scanning needs.",
    evidence: "Confirm the quoted paper grade and sample result; width alone does not establish imaging performance.",
  },
  {
    name: "Top-coated and resistance candidates",
    maturity: "M2-M3",
    use: "For water, oil, abrasion, chemicals, plasticizers, heat, or humidity risks.",
    evidence: "Use water-resistant rather than waterproof unless a named medium, contact method, temperature, duration, and pass condition are verified.",
  },
  {
    name: "Long-life and archival candidates",
    maturity: "M3-M4",
    use: "For receipts or records with a defined post-print readability period.",
    evidence: "Separate raw-paper shelf life, printed-image life, and in-use durability; no fixed year claim without grade-specific evidence and storage conditions.",
  },
] as const;

export const THERMAL_PAPER_PRODUCT_GROUPS = [
  {
    id: "core-volume",
    eyebrow: "T1 / M1",
    title: "Core volume rolls",
    description: "The repeat-order starting point for distributors, POS consumable suppliers, importers, and managed service providers.",
    slugs: ["standard-pos-rolls", "credit-card-terminal-rolls"],
  },
  {
    id: "custom-value-added",
    eyebrow: "T4 / M2-M3",
    title: "Custom and value-added programs",
    description: "Printing and packaging choices are configured on top of a qualified roll specification, not sold as a substitute for it.",
    slugs: ["custom-printed-rolls", "back-print-thermal-rolls"],
  },
  {
    id: "system-projects",
    eyebrow: "T5 / M3-M4",
    title: "System-qualified projects",
    description: "Application routes that require device, media, operating-environment, sample, or approval-chain validation before commitment.",
    slugs: [
      "atm-banking-rolls",
      "lottery-gaming-rolls",
      "casino-tito-rolls",
      "parking-ticketing-rolls",
      "medical-rolls",
      "transport-ticket-rolls",
      "kiosk-vending-rolls",
    ],
  },
] as const;
