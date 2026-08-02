export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  region: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  verificationNote: string;
  tags: string[];
  relatedProducts: Array<{
    name: string;
    href: string;
    slotKey: string;
    copy: string;
  }>;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "european-lottery-operator",
    title: "Lottery Ticket Media Qualification for European Terminals",
    client: "Anonymized lottery operations project",
    industry: "Lottery & Gaming",
    region: "Europe",
    challenge: "The project required ticket stock to be assessed against terminal geometry, print sensitivity, barcode readability, sensing, and retention requirements across an installed equipment fleet.",
    solution: "The qualification plan matched roll construction and coating response to the named terminal models, then used sample runs and batch documentation to review print, scan, feed, and storage performance before commercial approval.",
    outcomes: [
      "A device-specific paper specification was established for buyer review",
      "Samples and batch criteria were defined before production approval",
      "Supply planning was linked to forecast, packaging, and continuity needs",
    ],
    verificationNote: "Project outcomes depend on terminal condition, print settings, ticket design, environment, test method, and approved production specification.",
    tags: ["Lottery", "Device Qualification", "Europe", "Custom Specification"],
    relatedProducts: [
      { name: "Lottery & Gaming Rolls", href: "/products/thermal-paper-rolls/lottery-gaming-rolls", slotKey: "products.card.lottery-gaming-rolls", copy: "Ticket media configured by terminal, sensing, barcode, and retention requirements." },
      { name: "Casino TITO Rolls", href: "/products/thermal-paper-rolls/casino-tito-rolls", slotKey: "products.card.casino-tito-rolls", copy: "TITO stock qualified by platform, ticket geometry, scanner, and operating environment." },
    ],
  },
  {
    slug: "us-pharmacy-chain",
    title: "Thermal Receipt Documentation Review for a US Pharmacy Project",
    client: "Anonymized pharmacy procurement project",
    industry: "Healthcare & Pharma",
    region: "United States",
    challenge: "The buyer needed BPA-free receipt media, device compatibility evidence, and product documentation suitable for internal material and regulatory review across multiple locations.",
    solution: "The project workflow separated printer qualification, material declaration review, sample testing, and rollout planning. Documentation scope was checked against the selected paper grade and intended use rather than treated as a universal compliance claim.",
    outcomes: [
      "The buyer received a grade-specific documentation checklist",
      "Printer and sample acceptance criteria were agreed before rollout",
      "Supply planning was organized around approved specifications and destinations",
    ],
    verificationNote: "Regulatory suitability must be reviewed for the specific material, intended use, jurisdiction, and current supporting documents.",
    tags: ["Healthcare", "Document Review", "BPA-Free", "USA"],
    relatedProducts: [
      { name: "Medical Paper Rolls", href: "/products/thermal-paper-rolls/medical-rolls", slotKey: "products.card.medical-rolls", copy: "Receipt and record media selected by device, retention, exposure, and document needs." },
      { name: "US Food-Contact Document Review", href: "/us/fda-compliant", slotKey: "products.card.standard-pos-rolls", copy: "Review material grade, intended contact, current document scope, and samples for US projects." },
    ],
  },
  {
    slug: "german-logistics-provider",
    title: "Fanfold Label Qualification for a German Logistics Workflow",
    client: "Anonymized third-party logistics project",
    industry: "Logistics & Warehouse",
    region: "Germany",
    challenge: "The warehouse needed a fanfold label construction matched to printer path, fold pitch, sensing method, barcode workflow, surface, and operating conditions.",
    solution: "The review defined label dimensions, fold and perforation geometry, adhesive, facestock, sensing marks, packaging, and printer test conditions. Pilot stacks were evaluated before the commercial specification was released.",
    outcomes: [
      "Printer-path and fold requirements were captured in one specification",
      "Pilot testing was included before volume approval",
      "Packaging and replenishment planning were reviewed with the buyer",
    ],
    verificationNote: "Feed reliability and barcode performance depend on printer maintenance, settings, label design, materials, environment, and the approved test protocol.",
    tags: ["Logistics", "Fanfold Labels", "Germany", "Printer Qualification"],
    relatedProducts: [
      { name: "Fanfold Labels", href: "/products/thermal-labels/fanfold-labels", slotKey: "products.card.fanfold-labels", copy: "Stacked label formats matched to printer path, fold pitch, sensing, and barcode workflow." },
      { name: "Direct Thermal Labels", href: "/products/thermal-labels/direct-thermal-labels", slotKey: "products.card.direct-thermal-labels", copy: "Direct thermal constructions reviewed by printer, surface, adhesive, and retention target." },
    ],
  },
  {
    slug: "canadian-cannabis-dispensary",
    title: "Variable-Data Label Review for Canadian Cannabis Retail",
    client: "Anonymized cannabis retail project",
    industry: "Cannabis & Specialty",
    region: "Canada",
    challenge: "The project required durable labels for variable product data while accounting for bilingual copy, packaging surface, print method, storage conditions, and current jurisdiction-specific requirements.",
    solution: "Material selection and print testing were separated from regulatory copy approval. The buyer reviewed label construction, adhesive, variable-data workflow, artwork responsibility, and current documentation before approving a production route.",
    outcomes: [
      "Material and print routes were narrowed through sample testing",
      "Artwork and regulatory review responsibilities were documented",
      "Production approval was tied to the final SKU and packaging specification",
    ],
    verificationNote: "The buyer remains responsible for current label content and regulatory approval; material performance must be validated on the actual packaging and process.",
    tags: ["Cannabis", "Variable Data", "Canada", "Material Review"],
    relatedProducts: [
      { name: "Canada Cannabis Label Review", href: "/ca/cannabis-labels", slotKey: "products.card.thermal-transfer-labels", copy: "Material and print routes reviewed against current bilingual copy and packaging requirements." },
      { name: "Synthetic PP Labels", href: "/products/thermal-labels/synthetic-paper-labels", slotKey: "products.card.synthetic-paper-labels", copy: "Synthetic constructions selected by surface, moisture exposure, ribbon, and adhesive needs." },
    ],
  },
];
