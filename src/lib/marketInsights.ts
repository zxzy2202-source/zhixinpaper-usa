export type HomepageBuyerProblem = {
  title: string;
  signal: string;
  response: string;
};

export type BuyingScenario = {
  title: string;
  subtitle: string;
  href: string;
  specs: string[];
};

export type RollScenario = {
  scenario: string;
  commonSpec: string;
  buyerRisk: string;
  recommendedProduct: string;
  href: string;
  askFor: string;
};

export type ProductBuyerCheck = {
  title: string;
  whyItMatters: string;
  whatToConfirm: string;
};

export type IndustryBuyerInsight = {
  buyerTypes: string[];
  purchaseMotives: string[];
  commonRisks: string[];
  quoteChecklist: string[];
};

export const HOMEPAGE_BUYER_PROBLEMS: HomepageBuyerProblem[] = [
  {
    title: "Compliance files before deposit",
    signal: "EU and North American buyers increasingly ask for BPA-free, REACH, RoHS, FDA, FSC, Prop 65, or phenol-free proof before they approve a new supplier.",
    response: "We prepare the document pack early so your procurement team can check the grade before the bulk order starts.",
  },
  {
    title: "Roll size and core accuracy",
    signal: "Small errors in width, outer diameter, core ID, or roll length can cause returns, printer jams, and poor marketplace reviews.",
    response: "We confirm the roll drawing, printer model, packing unit, and tolerance before sampling.",
  },
  {
    title: "Print and scan reliability",
    signal: "Receipt, payment terminal, lottery, casino, parking, and kitchen tickets all fail when barcodes fade, black out, or scan poorly.",
    response: "We match coating, image life, sensitivity, and top-coat needs to the actual use case.",
  },
  {
    title: "Packaging and landed-cost control",
    signal: "Damaged cartons, moisture, crushed rolls, and unclear pallet plans create avoidable cost for importers and FBA sellers.",
    response: "We quote carton, pallet, mixed-SKU, FOB, CIF, or DDP options with repeat-order packaging details.",
  },
];

export const BUYING_SCENARIOS: BuyingScenario[] = [
  {
    title: "POS receipt supply",
    subtitle: "For retail chains, distributors, restaurants, and FBA sellers.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    specs: ["80mm and 57mm widths", "BPA-free grades", "End-of-roll stripe", "Epson, Star, Bixolon fit"],
  },
  {
    title: "Payment terminal rolls",
    subtitle: "For merchant service providers, Clover, Square, PAX, and mobile terminals.",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    specs: ["57mm rolls", "Outer diameter control", "Core and winding direction", "Small-carton programs"],
  },
  {
    title: "Kitchen and order tickets",
    subtitle: "For QSR chains, restaurant groups, foodservice distributors, and POS integrators.",
    href: "/industries/retail-pos",
    specs: ["Top-coated options", "Heat and oil resistance", "Clear order text", "Kitchen humidity protection"],
  },
  {
    title: "Lottery, casino, and tickets",
    subtitle: "For gaming operators, ticketing systems, parking operators, and integrators.",
    href: "/industries/lottery-gaming",
    specs: ["Barcode density", "Black mark control", "UV or security print", "Audit-ready batches"],
  },
  {
    title: "Custom printed rolls",
    subtitle: "For branded receipts, QR campaigns, back-print ads, and private label programs.",
    href: "/products/thermal-paper-rolls/custom-printed-rolls",
    specs: ["Pantone matching", "PDF proof", "Front or back print", "Branded cartons"],
  },
  {
    title: "BPA-free and phenol-free",
    subtitle: "For EU distributors, US retailers, ESG programs, healthcare, and public buyers.",
    href: "/compliance/bpa-free",
    specs: ["BPA-free test report", "REACH and Prop 65 support", "FSC options", "Document pack"],
  },
];

export const THERMAL_ROLL_SCENARIOS: RollScenario[] = [
  {
    scenario: "Retail POS and grocery checkout",
    commonSpec: "80 x 80mm, 57 x 40mm, 57 x 50mm",
    buyerRisk: "Faded receipts, short roll length, printer dust, damaged cartons.",
    recommendedProduct: "Standard POS Rolls",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    askFor: "Width, roll length or OD, core ID, BPA-free requirement, carton pack.",
  },
  {
    scenario: "Payment and credit card terminals",
    commonSpec: "57mm width, compact OD for mobile terminals",
    buyerRisk: "Outer diameter mismatch, core mismatch, wrong winding direction.",
    recommendedProduct: "Standard POS Rolls",
    href: "/products/thermal-paper-rolls/standard-pos-rolls",
    askFor: "Terminal model, width, OD, core ID, roll orientation, quantity per box.",
  },
  {
    scenario: "Kitchen order tickets",
    commonSpec: "Top-coated thermal paper, 55-80gsm",
    buyerRisk: "Heat lamp blackout, oil exposure, wet hands, unreadable orders.",
    recommendedProduct: "Kitchen-grade / POS Rolls",
    href: "/industries/retail-pos",
    askFor: "Kitchen environment, heat exposure, printer model, image life, roll size.",
  },
  {
    scenario: "Lottery, casino, and gaming",
    commonSpec: "57mm or 80mm rolls with high-density barcode coating",
    buyerRisk: "Poor barcode scan, terminal rejection, weak ticket validity, security concerns.",
    recommendedProduct: "Lottery & Gaming Rolls",
    href: "/products/thermal-paper-rolls/lottery-gaming-rolls",
    askFor: "Terminal platform, barcode density, ticket validity period, security print needs.",
  },
  {
    scenario: "Parking, transit, and event tickets",
    commonSpec: "Weather-resistant or ticket-grade thermal stock",
    buyerRisk: "Jams in outdoor machines, UV fading, weak audit trail, ticket damage.",
    recommendedProduct: "Parking & Ticketing Rolls",
    href: "/products/thermal-paper-rolls/parking-ticketing-rolls",
    askFor: "Outdoor exposure, ticket format, black mark, image life, system integrator spec.",
  },
  {
    scenario: "Brand and media rolls",
    commonSpec: "Front print, back print, QR, coupon, or private label rolls",
    buyerRisk: "Wrong Pantone color, slow proofing, weak QR contrast, unclear packaging.",
    recommendedProduct: "Custom Printed Rolls",
    href: "/products/thermal-paper-rolls/custom-printed-rolls",
    askFor: "Artwork file, color count, print side, QR size, pack format, launch date.",
  },
];

export const PRODUCT_BUYER_CHECKS: Record<string, ProductBuyerCheck[]> = {
  "standard-pos-rolls": [
    {
      title: "Measured roll length",
      whyItMatters: "Short rolls create marketplace complaints and make distributors look unreliable.",
      whatToConfirm: "Confirm length, outer diameter, grammage, and carton count before sampling.",
    },
    {
      title: "Terminal fit",
      whyItMatters: "Payment terminals can reject rolls when core ID, OD, or winding direction is off.",
      whatToConfirm: "Share Epson, Star, Clover, Square, PAX, or other printer models with the inquiry.",
    },
    {
      title: "BPA-free handling",
      whyItMatters: "Retail, restaurant, and EU buyers often need safe-handling proof for staff and customers.",
      whatToConfirm: "Ask for BPA-free, REACH, Prop 65, FSC, or phenol-free options where required.",
    },
    {
      title: "Carton and pallet protection",
      whyItMatters: "Crushed or humid cartons can damage roll edges and cause printer jams.",
      whatToConfirm: "Confirm shrink wrap, carton strength, pallet marks, and DDP or CIF routing.",
    },
  ],
  "lottery-gaming-rolls": [
    {
      title: "Barcode density",
      whyItMatters: "Lottery and gaming tickets must scan quickly under heavy transaction volume.",
      whatToConfirm: "Confirm scanner requirement, ticket validity period, coating sensitivity, and sample testing.",
    },
    {
      title: "Security print options",
      whyItMatters: "Gaming buyers often need audit trails, UV response, void patterns, or controlled artwork.",
      whatToConfirm: "Share UV, black mark, numbering, or security background requirements early.",
    },
    {
      title: "Terminal compatibility",
      whyItMatters: "A small spec mismatch can stop a terminal from feeding or reading tickets.",
      whatToConfirm: "Send the terminal brand, roll path, core, OD, and any black mark specification.",
    },
  ],
  "casino-tito-rolls": [
    {
      title: "Scan reliability",
      whyItMatters: "TITO tickets carry cash value, so weak barcodes create operational and audit risk.",
      whatToConfirm: "Confirm barcode density, image life, humidity exposure, and scanner test method.",
    },
    {
      title: "Platform fit",
      whyItMatters: "Casino floors often run mixed IGT, Aristocrat, Konami, and other systems.",
      whatToConfirm: "Provide slot platform details, width, OD, core ID, and storage conditions.",
    },
    {
      title: "Humidity-safe packing",
      whyItMatters: "Casino storage and long shifts require stable rolls with clean edges.",
      whatToConfirm: "Confirm wrap, carton, pallet, and batch traceability before the bulk run.",
    },
  ],
  "parking-ticketing-rolls": [
    {
      title: "Outdoor durability",
      whyItMatters: "Parking tickets face UV, heat, rain, cold, and handling before they are checked.",
      whatToConfirm: "Confirm image life, UV exposure, moisture resistance, and ticket retention needs.",
    },
    {
      title: "Machine uptime",
      whyItMatters: "Ticket machine jams can create service calls, lost revenue, and public complaints.",
      whatToConfirm: "Share printer mechanism, paper path, black mark, thickness, and roll tension requirements.",
    },
    {
      title: "System integrator spec",
      whyItMatters: "Many parking and transit buyers follow OEM or integrator media requirements.",
      whatToConfirm: "Send any Flowbird, SKIDATA, Boca, or transit system media specification.",
    },
  ],
  "transport-ticket-rolls": [
    {
      title: "Validator readability",
      whyItMatters: "Transit tickets must survive handling and still scan at the gate or validator.",
      whatToConfirm: "Confirm barcode, QR, black mark, ticket validity, and coating density.",
    },
    {
      title: "Audit and retention",
      whyItMatters: "Public operators often need printed tickets or records as a backup system.",
      whatToConfirm: "Ask for batch records, carton marks, and document pack before ordering.",
    },
  ],
  "custom-printed-rolls": [
    {
      title: "Artwork proof",
      whyItMatters: "A custom roll is judged by brand color, line clarity, and QR readability.",
      whatToConfirm: "Send AI, EPS, or PDF artwork, Pantone codes, QR size, and proof approval flow.",
    },
    {
      title: "Front or back print",
      whyItMatters: "Front print supports brand identity; back print can carry coupons, ads, or legal copy.",
      whatToConfirm: "Confirm print side, color count, copy area, thermal face performance, and MOQ.",
    },
    {
      title: "Launch schedule",
      whyItMatters: "Campaign rolls often need samples, plate making, production, and shipping before a fixed launch.",
      whatToConfirm: "Share campaign date, sample deadline, volume by SKU, and destination country.",
    },
  ],
  "back-print-thermal-rolls": [
    {
      title: "Back-side media value",
      whyItMatters: "Back print turns receipt stock into coupon, ad, QR, disclosure, or loyalty media.",
      whatToConfirm: "Confirm message layout, QR contrast, color count, and merchant pack format.",
    },
    {
      title: "Thermal face protection",
      whyItMatters: "Back printing should not weaken front-side print sensitivity or image life.",
      whatToConfirm: "Ask for front-side print testing after back print and rewinding.",
    },
    {
      title: "Repeatable color",
      whyItMatters: "Retail and hospitality buyers need brand consistency across repeat orders.",
      whatToConfirm: "Provide Pantone or CMYK target, proofing process, and batch approval rules.",
    },
  ],
};

export const INDUSTRY_BUYER_INSIGHTS: Record<string, IndustryBuyerInsight> = {
  "lottery-gaming": {
    buyerTypes: ["Lottery operators", "Gaming machine OEMs", "Betting shop distributors", "Ticket system integrators"],
    purchaseMotives: ["Reliable barcode scanning", "Ticket validity over time", "Security print and audit control", "Stable supply for high-volume terminals"],
    commonRisks: ["Barcode fade or weak density", "Terminal paper-path rejection", "Security artwork not controlled", "Batch traceability gaps"],
    quoteChecklist: ["Terminal model", "Ticket width and OD", "Barcode or black mark spec", "Validity period", "Security print needs", "Destination and volume"],
  },
  casino: {
    buyerTypes: ["Casino operators", "Slot machine distributors", "Gaming floor maintenance teams", "TITO consumables buyers"],
    purchaseMotives: ["Cash-value ticket reliability", "Fast scan-through rate", "Humidity-safe storage", "Mixed platform compatibility"],
    commonRisks: ["Unreadable TITO barcodes", "Roll jams during peak floor hours", "Paper curl or edge damage", "Inconsistent carton labeling"],
    quoteChecklist: ["Slot platform", "Roll width and core", "Barcode density", "Image life", "Packing method", "Monthly consumption"],
  },
  "retail-pos": {
    buyerTypes: ["Retail chains", "Restaurant groups", "FBA private-label sellers", "Regional paper distributors"],
    purchaseMotives: ["Clean receipt printing", "Lower unit cost at volume", "BPA-free documents", "Reliable carton and pallet supply"],
    commonRisks: ["Short roll complaints", "Printer dust", "Moisture damage", "Incorrect core or OD for terminals"],
    quoteChecklist: ["Width and length", "Core ID", "Printer model", "Pack count", "BPA-free or phenol-free need", "Shipping term"],
  },
  "banking-finance": {
    buyerTypes: ["Banks", "ATM service firms", "Payment networks", "Financial kiosk operators"],
    purchaseMotives: ["Archival image life", "Anti-static performance", "Regulatory back print", "Compatibility with ATM mechanisms"],
    commonRisks: ["Static-related jams", "Weak long-term image stability", "Disclosure text errors", "Platform mismatch"],
    quoteChecklist: ["ATM brand", "Width and OD", "Image life target", "Back-print copy", "Core ID", "Document requirements"],
  },
  transportation: {
    buyerTypes: ["Parking operators", "Transit authorities", "Ticket machine OEMs", "Smart-city integrators"],
    purchaseMotives: ["Outdoor durability", "Audit-ready tickets", "Machine uptime", "System media compliance"],
    commonRisks: ["UV fading", "Rain or humidity damage", "Machine jams", "Black mark sensor errors"],
    quoteChecklist: ["Machine model", "Ticket format", "Black mark spec", "Weather exposure", "Retention period", "Pallet plan"],
  },
  "events-hospitality": {
    buyerTypes: ["Venue operators", "Event ticketing companies", "Hospitality chains", "Promotion agencies"],
    purchaseMotives: ["Brand impression", "QR or barcode scan quality", "Fast campaign turnaround", "Seasonal custom print"],
    commonRisks: ["Color mismatch", "QR contrast failure", "Late proof approval", "Wrong ticket stock thickness"],
    quoteChecklist: ["Artwork file", "Pantone colors", "Ticket or roll size", "QR size", "Launch date", "Pack format"],
  },
};
