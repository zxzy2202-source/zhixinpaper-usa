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

export type IndustrySolutionComparison = {
  decision: string;
  optionA: string;
  optionB: string;
  chooseBy: string;
};

export type IndustryResourceLink = {
  label: string;
  href: string;
  description: string;
};

export type IndustryResourceSet = {
  caseStudy: IndustryResourceLink;
  technicalGuide: IndustryResourceLink;
  compliance: IndustryResourceLink;
};

export type IndustryEvidenceAnswer = {
  question: string;
  answer: string;
  condition: string;
  evidence: Pick<IndustryResourceLink, "label" | "href">[];
};

export const HOMEPAGE_BUYER_PROBLEMS: HomepageBuyerProblem[] = [
  {
    title: "Compliance files before deposit",
    signal: "Importers and regulated-use buyers often need BPA-free, REACH, RoHS, FDA, FSC, Prop 65, or phenol-free files before they approve a new thermal paper supplier.",
    response: "We send the document pack early, so your procurement team can check the grade before the bulk order starts.",
  },
  {
    title: "Roll size and core accuracy",
    signal: "Small errors in width, outer diameter, core ID, or roll length can cause returns, printer jams, and poor marketplace reviews.",
    response: "We confirm the roll drawing, printer model, packing unit, and tolerance before samples are made.",
  },
  {
    title: "Print and scan reliability",
    signal: "Receipt, payment terminal, lottery, casino, parking, and kitchen tickets lose value when barcodes fade, black out, or scan poorly.",
    response: "We match coating, image life, sensitivity, and top-coat needs to the printer and use case.",
  },
  {
    title: "Packaging and landed-cost control",
    signal: "Damaged cartons, moisture, crushed rolls, and unclear pallet plans raise claims and freight costs for importers and FBA sellers.",
    response: "We quote carton, pallet, mixed-SKU, FOB, CIF, or DDP options with packaging details for repeat orders.",
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
    href: "/products/thermal-paper-rolls/credit-card-terminal-rolls",
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
    recommendedProduct: "Credit Card Terminal Rolls",
    href: "/products/thermal-paper-rolls/credit-card-terminal-rolls",
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
  "food-cold-chain": {
    buyerTypes: ["Food manufacturers and processors", "Cold storage and 3PL operators", "Supermarket and deli chains", "Pharmaceutical cold chain logistics"],
    purchaseMotives: ["Stable adhesion through freeze-thaw cycles", "Food-contact documentation for the target market", "GS1 traceability barcode readability", "Audit-ready material and batch records"],
    commonRisks: ["Label detachment during temperature changes", "Barcode smearing from condensation or moisture", "Wrong adhesive for the packaging surface", "Missing documents for the buyer's audit"],
    quoteChecklist: ["Temperature range and exposure time", "Surface type such as PE bag, carton, or glass", "Label size and roll or fanfold format", "Printer model and DT or TT method", "Required compliance documents", "Monthly volume and pallet plan"],
  },
  "healthcare-pharma": {
    buyerTypes: ["Hospitals and clinic groups", "Pharmacy chains", "Clinical laboratories", "Medical consumables distributors"],
    purchaseMotives: ["Readable patient and specimen information", "Documented material compliance", "Resistance to handling and cleaning", "Stable repeat-order specifications"],
    commonRisks: ["Image loss during the required retention period", "Label lift on small or cold surfaces", "Chemical exposure affecting print", "Unverified material claims"],
    quoteChecklist: ["Application and contact surface", "Printer model", "Retention period", "Temperature and chemical exposure", "Required documents", "Pack and traceability needs"],
  },
  "logistics-warehouse": {
    buyerTypes: ["3PL operators", "Distribution centers", "Warehouse system integrators", "Shipping-label distributors"],
    purchaseMotives: ["Reliable barcode scanning", "Fast print-and-apply throughput", "Correct carton or bin adhesion", "Predictable roll and fanfold supply"],
    commonRisks: ["Barcode grading below the scanner requirement", "Labels lifting from dusty or recycled cartons", "Wrong core or fanfold stack dimensions", "Printhead dust and label jams"],
    quoteChecklist: ["Printer and applicator model", "Label size and format", "Surface material", "Barcode symbology and grade", "Storage conditions", "Monthly consumption"],
  },
  ecommerce: {
    buyerTypes: ["Marketplace sellers", "DTC brands", "Fulfillment centers", "Shipping-supply distributors"],
    purchaseMotives: ["Carrier-compatible label formats", "Reliable scans through fulfillment", "Simple desktop-printer loading", "Cost control at growing volumes"],
    commonRisks: ["Incorrect label dimensions", "Adhesion failure on poly mailers", "Poor scans after abrasion", "Format mismatch with the printer"],
    quoteChecklist: ["Marketplace or carrier workflow", "Printer model", "Label dimensions", "Carton or mailer surface", "Roll or fanfold format", "Pack count and forecast volume"],
  },
  "automotive-industrial": {
    buyerTypes: ["Automotive suppliers", "Industrial manufacturers", "Parts distributors", "Factory automation integrators"],
    purchaseMotives: ["Durable parts identification", "Readable barcodes after handling", "Adhesion to difficult surfaces", "Controlled material and batch records"],
    commonRisks: ["Facestock or adhesive chosen without exposure testing", "Chemical or abrasion damage", "Label lift on textured parts", "Barcode failure after production processes"],
    quoteChecklist: ["Substrate and surface texture", "Temperature range", "Chemical and abrasion exposure", "Barcode requirement", "Application method", "Validation sample quantity"],
  },
  "government-legal": {
    buyerTypes: ["Public service counters", "Municipal agencies", "Court and legal service offices", "Document-system integrators"],
    purchaseMotives: ["Legible transaction records", "Controlled back-print content", "Defined retention requirements", "Documented batch consistency"],
    commonRisks: ["Thermal media selected for an unsuitable archive period", "Disclosure copy errors", "Printer mismatch", "Unclear chain of document approval"],
    quoteChecklist: ["Record type and retention target", "Printer model", "Roll dimensions", "Back-print or security needs", "Required material declarations", "Approval and delivery schedule"],
  },
  "cannabis-specialty": {
    buyerTypes: ["Regulated specialty retailers", "Packaging converters", "Dispensary operators", "Compliance-label distributors"],
    purchaseMotives: ["Market-specific label configuration", "Readable variable data and barcodes", "Tamper-evident options", "Controlled artwork revisions"],
    commonRisks: ["Using one label format across different jurisdictions", "Missing variable fields", "Adhesive mismatch with the container", "Uncontrolled compliance artwork changes"],
    quoteChecklist: ["Destination market", "Container material and size", "Required variable fields", "Tamper-evident need", "Printer and applicator model", "Artwork approval process"],
  },
};

export const INDUSTRY_SOLUTION_COMPARISONS: Record<string, IndustrySolutionComparison[]> = {
  "lottery-gaming": [
    { decision: "Ticket media", optionA: "Standard thermal stock for controlled indoor use", optionB: "Top-coated stock for longer validity or heavier handling", chooseBy: "Validity period, handling, storage, and terminal qualification" },
    { decision: "Sensing", optionA: "Continuous roll with terminal-controlled cut", optionB: "Black-mark or pre-defined ticket format", chooseBy: "Terminal sensor, ticket length, and system specification" },
    { decision: "Security", optionA: "Plain or branded print", optionB: "Numbering, UV response, or controlled security artwork", chooseBy: "Operator audit process and approved security requirements" },
  ],
  casino: [
    { decision: "Media grade", optionA: "Standard ticket-grade thermal media", optionB: "Top-coated media for extended handling or storage", chooseBy: "TITO platform validation, image life, humidity, and retention" },
    { decision: "Format", optionA: "Roll media for compatible ticket mechanisms", optionB: "Fanfold or pre-cut stock where the platform specifies it", chooseBy: "OEM media path, sensor, stack, core, and cutter configuration" },
    { decision: "Packing", optionA: "Standard sealed inner packs", optionB: "Enhanced moisture-control and batch-separated packing", chooseBy: "Storage humidity, floor consumption, and traceability plan" },
  ],
  "retail-pos": [
    { decision: "Roll size", optionA: "57mm compact rolls for payment terminals", optionB: "80mm rolls for receipt and kitchen printers", chooseBy: "Printer model, paper path, core ID, and maximum outer diameter" },
    { decision: "Paper grade", optionA: "Standard BPA-free receipt grade", optionB: "Top-coated or phenol-free grade", chooseBy: "Heat, oil, moisture, handling, destination, and buyer policy" },
    { decision: "Print format", optionA: "Plain thermal roll", optionB: "Front or back printed branded roll", chooseBy: "Campaign artwork, QR readability, proof approval, and repeat volume" },
  ],
  "banking-finance": [
    { decision: "Image retention", optionA: "Standard transaction receipt grade", optionB: "Longer-life top-coated grade", chooseBy: "Required retention period, storage, light, heat, and handling" },
    { decision: "Roll construction", optionA: "Standard core and winding", optionB: "OEM-specific core, OD, or low-static construction", chooseBy: "ATM or kiosk model and approved media specification" },
    { decision: "Printed content", optionA: "Plain transaction roll", optionB: "Controlled back print for disclosures or branding", chooseBy: "Legal copy approval, destination rules, revision control, and proof sign-off" },
  ],
  transportation: [
    { decision: "Exposure", optionA: "Indoor ticket-grade thermal stock", optionB: "Top-coated stock for outdoor or prolonged handling", chooseBy: "UV, moisture, temperature, ticket validity, and storage conditions" },
    { decision: "Sensor format", optionA: "Continuous roll", optionB: "Black-mark, gap, or fixed-length ticket stock", chooseBy: "Machine sensor, cutter, validator, and integrator specification" },
    { decision: "Identification", optionA: "Direct thermal barcode or QR", optionB: "Custom print with numbering or security features", chooseBy: "Validation method, audit requirements, artwork control, and scan testing" },
  ],
  "events-hospitality": [
    { decision: "Use period", optionA: "Short-duration receipt or ticket grade", optionB: "Top-coated stock for multi-day use or keepsakes", chooseBy: "Event duration, handling, moisture, heat, and image-life need" },
    { decision: "Brand treatment", optionA: "Plain stock with variable print", optionB: "Preprinted colors, sponsors, QR, or promotional copy", chooseBy: "Artwork deadline, proof cycle, scan area, and campaign volume" },
    { decision: "Supply format", optionA: "Rolls for fixed POS or ticket printers", optionB: "Fanfold or pre-cut stock for specified systems", chooseBy: "Printer path, loading speed, sensor, and venue workflow" },
  ],
  "food-cold-chain": [
    { decision: "Print method", optionA: "Direct thermal for controlled short-life workflows", optionB: "Thermal transfer for tougher handling or longer identification", chooseBy: "Required life, moisture, abrasion, ribbon, and printer setup" },
    { decision: "Adhesive", optionA: "Chill adhesive for refrigerated application", optionB: "Freezer-grade adhesive for low-temperature application", chooseBy: "Application temperature, service temperature, surface, and freeze-thaw cycle" },
    { decision: "Supply format", optionA: "Roll labels for automated or desktop printing", optionB: "Fanfold labels for high-volume batch workflows", chooseBy: "Printer, applicator, label size, core, stack, and line speed" },
  ],
  "healthcare-pharma": [
    { decision: "Print method", optionA: "Direct thermal for short-duration identification", optionB: "Thermal transfer for longer retention or chemical exposure", chooseBy: "Retention, cleaning agents, abrasion, printer, and approved material" },
    { decision: "Adhesive", optionA: "General permanent adhesive", optionB: "Specialty adhesive for cold, curved, or small surfaces", chooseBy: "Container substrate, diameter, application temperature, and handling" },
    { decision: "Verification", optionA: "Material declaration and application sample", optionB: "Project-specific test pack and controlled approval", chooseBy: "Intended use, destination rules, buyer quality system, and risk classification" },
  ],
  "logistics-warehouse": [
    { decision: "Print method", optionA: "Direct thermal for shipping and short-cycle labels", optionB: "Thermal transfer for storage, abrasion, or longer tracking", chooseBy: "Journey length, handling, environment, ribbon, and scanner requirement" },
    { decision: "Format", optionA: "Roll labels for print-and-apply or desktop printers", optionB: "Fanfold labels for batch desks and reduced roll changes", chooseBy: "Printer, applicator, throughput, core, stack, and workspace" },
    { decision: "Adhesive", optionA: "Permanent carton adhesive", optionB: "Specialty adhesive for recycled, dusty, cold, or plastic surfaces", chooseBy: "Substrate, surface condition, application temperature, and dwell time" },
  ],
  ecommerce: [
    { decision: "Format", optionA: "Roll labels for thermal desktop printers", optionB: "Fanfold labels for batch fulfillment stations", chooseBy: "Printer model, daily volume, loading preference, and available space" },
    { decision: "Label construction", optionA: "Standard shipping label for clean cartons", optionB: "Higher-tack label for poly mailers or difficult surfaces", chooseBy: "Package substrate, surface energy, temperature, and transit handling" },
    { decision: "Print method", optionA: "Direct thermal for standard parcel journeys", optionB: "Thermal transfer for extended storage or severe abrasion", chooseBy: "Carrier journey, storage duration, exposure, and printer capability" },
  ],
  "automotive-industrial": [
    { decision: "Facestock", optionA: "Coated paper for controlled indoor identification", optionB: "Synthetic film for moisture, abrasion, or chemicals", chooseBy: "Service environment, durability target, printer, and validation test" },
    { decision: "Adhesive", optionA: "Permanent adhesive for clean smooth surfaces", optionB: "Specialty adhesive for textured, curved, oily, or low-energy surfaces", chooseBy: "Substrate, preparation, application temperature, and service exposure" },
    { decision: "Print method", optionA: "Direct thermal for short-process labels", optionB: "Thermal transfer for durable parts and asset identification", chooseBy: "Retention, ribbon compatibility, abrasion, heat, and chemical exposure" },
  ],
  "government-legal": [
    { decision: "Retention", optionA: "Standard thermal media for short-term transaction records", optionB: "Longer-life media or another approved record medium", chooseBy: "Document retention policy, storage, handling, and legal review" },
    { decision: "Printed content", optionA: "Plain roll with variable transaction data", optionB: "Controlled back print or security artwork", chooseBy: "Disclosure text, revision authority, audit process, and proof approval" },
    { decision: "Supply control", optionA: "Standard commercial packing", optionB: "Batch-separated packing with controlled carton identification", chooseBy: "Tender specification, receiving controls, traceability, and distribution plan" },
  ],
  "cannabis-specialty": [
    { decision: "Print method", optionA: "Direct thermal for short-life variable data", optionB: "Thermal transfer for longer handling or tougher exposure", chooseBy: "Jurisdictional workflow, retention, printer, container, and environment" },
    { decision: "Closure", optionA: "Standard permanent label", optionB: "Tamper-evident construction where the approved package requires it", chooseBy: "Container geometry, opening method, destination rules, and packaging review" },
    { decision: "Artwork control", optionA: "Common master design with controlled variable fields", optionB: "Market-specific versions by jurisdiction or product", chooseBy: "Required statements, variable data, approval owner, and revision history" },
  ],
};

const caseStudyDirectory: IndustryResourceLink = {
  label: "Browse relevant project reviews",
  href: "/case-studies",
  description: "See the available anonymized qualification projects without implying an industry-specific customer result.",
};

export const INDUSTRY_RESOURCES: Record<string, IndustryResourceSet> = {
  "lottery-gaming": {
    caseStudy: { label: "European lottery terminal qualification", href: "/case-studies/european-lottery-operator", description: "An anonymized review of terminal fit, sensing, barcode readability, retention, and sample approval." },
    technicalGuide: { label: "Lottery ticket paper specifications", href: "/blog/lottery-ticket-paper-specifications", description: "Prepare terminal, ticket geometry, sensing, barcode, retention, and security-print requirements." },
    compliance: { label: "Quality-system document review", href: "/compliance/iso-9001", description: "Check certificate scope, production-site coverage, inspection records, and project-specific acceptance criteria." },
  },
  casino: {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Casino TITO paper qualification guide", href: "/blog/casino-receipt-paper-guide", description: "Review platform fit, barcode rules, ticket validity, environment, packing, and trial requirements." },
    compliance: { label: "Quality-system document review", href: "/compliance/iso-9001", description: "Separate quality-system evidence from ticket performance and platform-specific approval." },
  },
  "retail-pos": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Thermal printer compatibility guide", href: "/blog/thermal-paper-printer-compatibility-guide", description: "Match width, OD, core, winding, sensitivity, sensing, and compartment geometry to the named printer." },
    compliance: { label: "BPA-free grade review", href: "/compliance/bpa-free", description: "Confirm the quoted grade, named chemical scope, destination needs, and current supporting file." },
  },
  "banking-finance": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Thermal roll size guide", href: "/blog/thermal-paper-roll-sizes-guide", description: "Build an ATM, teller, or kiosk roll specification from measured dimensions and device constraints." },
    compliance: { label: "BPA-free grade review", href: "/compliance/bpa-free", description: "Review handling policy and chemical documentation for the exact transaction-paper grade." },
  },
  transportation: {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Thermal printer compatibility guide", href: "/blog/thermal-paper-printer-compatibility-guide", description: "Qualify printer path, dimensions, sensing, cutting, environment, and sample acceptance." },
    compliance: { label: "Quality-system document review", href: "/compliance/iso-9001", description: "Review production scope and batch controls separately from system-integrator approval." },
  },
  "events-hospitality": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Custom printed roll artwork guide", href: "/blog/how-to-print-logo-on-thermal-paper-rolls", description: "Plan print side, artwork, colors, QR area, proof approval, packing, and campaign timing." },
    compliance: { label: "BPA-free grade review", href: "/compliance/bpa-free", description: "Confirm the selected grade and document scope for staff and guest handling requirements." },
  },
  "food-cold-chain": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Freezer label adhesive guide", href: "/blog/freezer-label-adhesive-guide", description: "Compare application temperature, service temperature, surface, moisture, and freeze-thaw exposure." },
    compliance: { label: "Food-contact construction review", href: "/compliance/eu-food-contact", description: "Review the complete construction, intended food, contact type, time, temperature, and destination." },
  },
  "healthcare-pharma": {
    caseStudy: { label: "US pharmacy documentation review", href: "/case-studies/us-pharmacy-chain", description: "An anonymized workflow covering printer qualification, grade-specific documents, samples, and rollout planning." },
    technicalGuide: { label: "Direct thermal vs thermal transfer", href: "/blog/direct-vs-thermal-transfer", description: "Choose a print route by retention, handling, abrasion, chemicals, printer, and ribbon requirements." },
    compliance: { label: "Medical label applicability review", href: "/compliance/iso-15223", description: "Review material, symbols, substrate, exposure, retention, print system, and buyer-approved artwork." },
  },
  "logistics-warehouse": {
    caseStudy: { label: "German fanfold label qualification", href: "/case-studies/german-logistics-provider", description: "An anonymized review of printer path, fold pitch, sensing, barcode workflow, adhesive, and pilot stacks." },
    technicalGuide: { label: "Direct thermal vs thermal transfer", href: "/blog/direct-vs-thermal-transfer", description: "Compare short-cycle shipping labels with more durable warehouse identification routes." },
    compliance: { label: "REACH and RoHS scope review", href: "/compliance/reach-rohs", description: "Check relevance against the exact facestock, adhesive, intended use, destination, and current documents." },
  },
  ecommerce: {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "FBA thermal label sourcing guide", href: "/blog/amazon-fba-thermal-labels-guide", description: "Prepare size, printer, barcode, facestock, adhesive, packing, sample, and volume requirements." },
    compliance: { label: "REACH and RoHS scope review", href: "/compliance/reach-rohs", description: "Review destination and material-document needs for the selected shipping-label construction." },
  },
  "automotive-industrial": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Direct thermal vs thermal transfer", href: "/blog/direct-vs-thermal-transfer", description: "Select the print method by retention, heat, abrasion, chemicals, ribbon, and service environment." },
    compliance: { label: "REACH and RoHS scope review", href: "/compliance/reach-rohs", description: "Confirm substance scope and any electrical-product relevance for the exact construction and use." },
  },
  "government-legal": {
    caseStudy: caseStudyDirectory,
    technicalGuide: { label: "Thermal paper technical guide", href: "/blog/what-is-thermal-paper", description: "Review material types, image formation, storage, handling, and specification fundamentals." },
    compliance: { label: "Quality-system document review", href: "/compliance/iso-9001", description: "Check certificate holder, site, activities, validity, inspection records, and tender-specific controls." },
  },
  "cannabis-specialty": {
    caseStudy: { label: "Canadian variable-data label review", href: "/case-studies/canadian-cannabis-dispensary", description: "An anonymized workflow separating material testing, artwork responsibility, and jurisdictional review." },
    technicalGuide: { label: "US cannabis label qualification guide", href: "/blog/cannabis-label-requirements-usa", description: "Use a state-specific qualification framework without treating it as legal or artwork approval." },
    compliance: { label: "Material substance-scope review", href: "/compliance/reach-rohs", description: "Review the exact facestock, adhesive, ink, intended use, destination, and current substance documentation separately from cannabis artwork approval." },
  },
};

export function buildIndustryEvidenceAnswers(
  comparisons: IndustrySolutionComparison[],
  resources: IndustryResourceSet
): IndustryEvidenceAnswer[] {
  const evidenceRoutes = [
    {
      label: `Technical context: ${resources.technicalGuide.label}`,
      href: resources.technicalGuide.href,
    },
    {
      label: `Document scope: ${resources.compliance.label}`,
      href: resources.compliance.href,
    },
    {
      label: "Application proof: sample validation",
      href: "/samples",
    },
  ];

  return comparisons.slice(0, 3).map((comparison) => ({
    question: `How should buyers decide on ${comparison.decision.toLowerCase()}?`,
    answer: `Compare ${comparison.optionA} with ${comparison.optionB}. Neither option is universally preferable; the purchasing specification should record the project conditions and the approved construction. Technical guidance supports specification planning, document review confirms only its stated scope, and application suitability requires representative sample testing.`,
    condition: comparison.chooseBy,
    evidence: evidenceRoutes,
  }));
}
