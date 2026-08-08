export type BlogProductLink = {
  href: string;
  label: string;
  description: string;
};

export const BLOG_PRODUCT_LINKS: Record<string, BlogProductLink[]> = {
  "lottery-ticket-paper-specifications": [
    {
      href: "/products/thermal-paper-rolls/lottery-gaming-rolls",
      label: "Lottery & Gaming Thermal Paper",
      description: "Review terminal paper construction, ticket geometry, sensing, and sample requirements.",
    },
  ],
  "casino-receipt-paper-guide": [
    {
      href: "/products/thermal-paper-rolls/casino-tito-rolls",
      label: "Casino TITO Thermal Paper",
      description: "Compare casino ticket-roll fit, barcode performance, retention, and controlled trial requirements.",
    },
  ],
  "freezer-label-adhesive-guide": [
    {
      href: "/products/thermal-labels/freezer-cold-chain-labels",
      label: "Freezer & Cold-Chain Labels",
      description: "Match adhesive, facestock, temperature, moisture, and freeze-thaw conditions to the application.",
    },
  ],
  "direct-vs-thermal-transfer": [
    {
      href: "/products/thermal-labels",
      label: "Thermal Label Catalog",
      description: "Compare direct thermal, thermal transfer, freezer, synthetic, and specialty label constructions.",
    },
  ],
  "how-to-print-logo-on-thermal-paper-rolls": [
    {
      href: "/products/thermal-paper-rolls/custom-printed-rolls",
      label: "Custom Printed Thermal Rolls",
      description: "Review branded back-printing, artwork proofing, QR areas, packing, and project specifications.",
    },
  ],
  "amazon-fba-thermal-labels-guide": [
    {
      href: "/products/thermal-labels/direct-thermal-labels",
      label: "Direct Thermal Labels",
      description: "Specify 4x6 label size, facestock, adhesive, printer fit, barcode quality, and packing requirements.",
    },
  ],
  "thermal-paper-printer-compatibility-guide": [
    {
      href: "/products/thermal-paper-rolls",
      label: "Thermal Paper Rolls",
      description: "Match roll width, outer diameter, core, winding, sensitivity, and printer model before ordering.",
    },
  ],
  "thermal-paper-roll-sizes-guide": [
    {
      href: "/products/thermal-paper-rolls",
      label: "Thermal Paper Roll Catalog",
      description: "Compare POS, payment-terminal, ATM, kiosk, ticket, and custom roll formats by measured geometry.",
    },
  ],
};
