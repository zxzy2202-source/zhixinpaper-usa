import type { BlogCampaign } from "@/content/blogCampaigns/types";

type DraftSection = { heading: string; body: string[] };
type DraftFaq = { question: string; answer: string };

function buildContent(intro: string, sections: DraftSection[], faqs: DraftFaq[]) {
  return [
    intro,
    "",
    ...sections.flatMap((section) => [
      `## ${section.heading}`,
      "",
      ...section.body,
      "",
    ]),
    "## Frequently Asked Questions",
    "",
    ...faqs.flatMap((faq) => [
      `### ${faq.question}`,
      faq.answer,
      "",
    ]),
    "## Buyer checklist before release",
    "",
    "Before a North America receipt roll or thermal label program moves from sample to reorder, the buyer should close the loop on the device model, the measured roll size, the paper grade, the carton rule, and the receiving destination. That prevents a quote from drifting into a different format after the first approval.",
    "",
    "- Confirm the exact printer or terminal model and keep one photo of the loaded media path with the sample record.",
    "- Match the width, outer diameter, core size, and winding direction to the live sample rather than to a catalog name.",
    "- Decide whether the order ships by store, by DC, or by a regional drop so the carton plan reflects real receiving work.",
    "- Record the approved item code, the sample date, and the lot format in one note that procurement can reuse later.",
    "- If the program uses 4 x 6 shipping labels, list the printer route, adhesive target, and scan expectation before final approval.",
    "- If the program uses receipt rolls, note the pack count, the reorder trigger, and whether mixed-SKU cartons are allowed.",
    "- Ask for a new sample whenever the paper grade, printer family, or handling surface changes after the original sign-off.",
    "- Keep the quote, sample, and reorder rule together so the next buy can be compared against the first approval in a few seconds instead of a few emails.",
    "",
    "That checklist is simple on purpose. Buyers usually need one clean record that helps sourcing, warehousing, and operations make the same decision without re-litigating the same spec on every shipment.",
    "",
    "## Next Step",
    "",
    "If you need a quote, sample plan, or packing review, move the project into the [quote form](/contact?mode=quote#contact-form) or [samples request](/contact?mode=samples#contact-form).",
  ].join("\n");
}

function draftPost(params: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string;
  readTime: string;
  intro: string;
  sections: DraftSection[];
  faqs: DraftFaq[];
}) {
  return {
    slug: params.slug,
    title: params.title,
    excerpt: params.excerpt,
    content: buildContent(params.intro, params.sections, params.faqs),
    category: params.category,
    tags: params.tags,
    readTime: params.readTime,
  };
}

export const NORTH_AMERICA_THERMAL_PAPER_P1_CAMPAIGN: BlogCampaign = {
  id: "north-america-thermal-paper-p1-2026",
  name: "North America Thermal Paper P1",
  cadenceDays: 7,
  description:
    "Second batch of North America buyer drafts for receipt rolls, 4 x 6 shipping labels, and rollout control topics.",
  posts: [
    draftPost({
      slug: "receipt-roll-rfq-template-usa-canada",
      title: "Receipt Roll RFQ Template for US and Canada Buyers",
      excerpt:
        "A buyer-ready RFQ template for receipt roll programs, covering printer fit, carton labels, sampling, and replenishment data.",
      category: "Product Guide",
      tags: "receipt rolls, RFQ template, USA, Canada",
      readTime: "7 min",
      intro:
        "A one-line request for \"POS paper\" usually creates back-and-forth. A better RFQ turns the printer, the store, and the delivery plan into one brief that a supplier can quote without guessing. This template is built for US and Canada buyers who want faster pricing and fewer hidden fit problems.",
      sections: [
        {
          heading: "Start with the device, not the marketing name",
          body: [
            "The first line in the RFQ should identify the exact printer or terminal model, not only the chain or brand. Width, outer diameter, core ID, winding direction, and paper exit path all matter.",
            "If the site uses more than one device family, list each one on its own line. A combined total quantity hides the real spec and usually slows the quote.",
            "Useful fields include width, OD, core, printable side, carton count, and the destination region that will receive the order.",
          ],
        },
        {
          heading: "Add commercial details that change the quote",
          body: [
            "Receipt roll programs are often priced by packing and replenishment, not only by paper grade. State the estimated monthly usage, pallet preferences, and whether mixed-SKU cartons are allowed.",
            "If the order needs a private label or warning print, say so before the supplier quotes the paper. That keeps the artwork and material discussion separate from the base roll price.",
            "For multi-store programs, include a simple store or DC split so the supplier can see whether the order needs a standard pallet, a mixed pallet, or a region-specific pack plan.",
          ],
        },
        {
          heading: "Protect the approval record",
          body: [
            "A good RFQ should end with a sample and approval step. Ask for the first sample against the exact size and device family, then record the approved grade name and packing format.",
            "Once the sample is approved, use one short item code for repeat orders. That code should tie together size, grade, core, winding, and carton mark.",
            "That simple control step is the easiest way to avoid quiet spec drift on later replenishment.",
          ],
        },
      ],
      faqs: [
        {
          question: "What if the buyer only has a used roll sample?",
          answer:
            "Measure width, OD, and core ID from the sample, then ask the site team for photos of the printer label and paper path. That is enough to start a controlled quote.",
        },
        {
          question: "Should one RFQ combine multiple sizes?",
          answer:
            "Only if each size is shown as a separate line with its own volume and packing rule. Do not hide different device groups inside one number.",
        },
        {
          question: "When should samples be requested?",
          answer:
            "Request samples before final pricing if the device family is not confirmed, if there are multiple store formats, or if the buyer is changing paper grade or packing.",
        },
      ],
    }),
    draftPost({
      slug: "receipt-roll-packing-and-reorder-guide",
      title: "Receipt Roll Packing and Reorder Guide for Multi-Store Programs",
      excerpt:
        "How to set carton counts, pallet logic, and reorder rules for repeated receipt roll supply.",
      category: "Market Insights",
      tags: "receipt rolls, packing, reorder planning",
      readTime: "6 min",
      intro:
        "A receipt roll can fit the printer and still fail the program if the packing plan is weak. Multi-store supply depends on carton counts, pallet labels, receiving codes, and a reorder rule that keeps the DC from running out before the next shipment arrives.",
      sections: [
        {
          heading: "Choose carton logic before you compare price",
          body: [
            "Carton count should match the way stores actually consume the rolls. A high-volume lane often needs one pack pattern, while a small retail chain needs another.",
            "State whether the supplier should pack by store, by DC, or by full mixed pallet. If the order serves more than one region, keep the regions separate in the brief.",
            "The price difference between two carton patterns is often smaller than the labor difference at receiving. That is why packing belongs in the RFQ.",
          ],
        },
        {
          heading: "Print the fields the warehouse needs",
          body: [
            "Receiving teams need more than a SKU name. Ask for carton labels that show roll size, carton count, lot number, PO number, and destination code.",
            "If the project uses more than one paper grade or core size, make the carton label visually different so the DC can sort the pallets quickly.",
            "A clear outer label saves time when the same supplier ships to stores, DCs, and direct-to-branch locations.",
          ],
        },
        {
          heading: "Set a simple reorder trigger",
          body: [
            "The reorder rule should be written before the first shipment ships. For example, a chain might reorder when four weeks of stock remain, or when the DC falls below a set pallet count.",
            "Put the approved item code and the packing rule in the reorder note. That makes it easier to compare the next quotation with the original sample approval.",
            "If a future reorder changes carton count or pallet mix, ask for a new sample check instead of assuming the old approval still applies.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is mixed-SKU packing a good idea?",
          answer:
            "Only when the receiving team can separate the SKUs easily and the carton labels are very clear. For most programs, single-SKU cartons are safer.",
        },
        {
          question: "What should go on the pallet label?",
          answer:
            "At minimum, show SKU, size, quantity, destination, and lot number. If the order is tied to a branch or DC, include that code too.",
        },
        {
          question: "Why does packing affect repeat orders?",
          answer:
            "Because the warehouse process becomes part of the spec. If the pack changes later, the buyer should re-check the order rather than assume nothing has changed.",
        },
      ],
    }),
    draftPost({
      slug: "thermal-label-sample-approval-north-america",
      title: "Thermal Label Sample Approval Checklist for North America",
      excerpt:
        "A sample approval workflow for direct thermal and thermal transfer labels used in US and Canada warehouses.",
      category: "Technical Tips",
      tags: "thermal labels, sample approval, barcode",
      readTime: "7 min",
      intro:
        "A label is only approved when it prints and scans in the real workflow. For North America buyers, sample approval should check the printer, the adhesive, the barcode, and the receiving process together, not in isolation.",
      sections: [
        {
          heading: "Collect the printer data first",
          body: [
            "Ask for the exact printer model, resolution, sensing method, label size, and maximum roll diameter. If the site uses thermal transfer, include ribbon width and ribbon grade.",
            "A photo of the printer label and loaded media path is often enough to prevent a bad first sample. Brand names alone are not enough.",
            "If the buyer cannot provide the model, measure the current stock and keep the sample request tied to that live example.",
          ],
        },
        {
          heading: "Define the pass and fail criteria",
          body: [
            "Do not approve a label only because it prints. Decide the scan target first, then test print darkness, scanner distance, and durability under normal handling.",
            "For warehouse labels, check whether the barcode stays readable after abrasion, stacking, and short-term storage. For shipping labels, check fast print speed and clear contrast.",
            "Write down the number of labels scanned, the printer setting used, and any edge lift or smudge issue before you accept the sample.",
          ],
        },
        {
          heading: "Keep the approval note short and exact",
          body: [
            "The approval record should list the final label code, the printer model, the adhesive type, the core, and the winding direction. That note protects repeat orders later.",
            "If the site has more than one warehouse, test each distinct printer family before you release a single SKU across the whole network.",
            "That is better than discovering after launch that one site uses a different sensing method or label path.",
          ],
        },
      ],
      faqs: [
        {
          question: "Should paper and film samples both be tested?",
          answer:
            "Request both when the labels face moisture, abrasion, freezer storage, or long handling time. The unit cost gap is easy to compare, but rework is not.",
        },
        {
          question: "How many samples are enough?",
          answer:
            "Usually at least a few rolls from the proposed spec, tested on more than one printer if the rollout will cover several stations.",
        },
        {
          question: "What is the most common approval mistake?",
          answer:
            "Buyers often confirm width and length but forget sensing method, core, or winding direction. Those small details create avoidable rollout problems.",
        },
      ],
    }),
    draftPost({
      slug: "4x6-shipping-label-warehouse-guide",
      title: "4 x 6 Shipping Label Guide for Warehouse Buyers",
      excerpt:
        "How to match printer model, adhesive, and label format to the real warehouse workflow before production.",
      category: "Product Guide",
      tags: "4x6 shipping labels, warehouse labels, direct thermal",
      readTime: "7 min",
      intro:
        "The phrase \"4 x 6 shipping label\" sounds simple, but warehouse buyers still need to confirm the printer, the sensing method, the adhesive, and the handling environment. Otherwise the label can look correct on paper and still create scan or peel problems in the DC.",
      sections: [
        {
          heading: "Start with the printer route",
          body: [
            "A warehouse label brief should say whether the site uses direct thermal or thermal transfer, plus the exact printer model and resolution.",
            "If the program uses fanfold stock instead of rolls, say that early. A supplier can price and pack the order differently when the feed path changes.",
            "The size alone is not enough. The hardware and feed method decide whether the stock will perform in the real workflow.",
          ],
        },
        {
          heading: "Match adhesive to the surface",
          body: [
            "A carton label, a stretch-wrap label, and a freezer label do not need the same adhesive. Buyers should specify the real surface before asking for a price.",
            "If the order must survive cold storage, condensation, or long handling, say that in the RFQ and request a sample test on the exact surface.",
            "That keeps the conversation focused on performance, not just on label size.",
          ],
        },
        {
          heading: "Plan the rollout across DCs",
          body: [
            "If more than one DC will use the label, test each site with its own printer settings before the SKU goes live. One set of settings rarely fits every station.",
            "Put the approved barcode rule, carton label, and reorder trigger into the rollout note so receiving teams know what to expect.",
            "Then route the final buy through the [thermal labels page](/products/thermal-labels) and the [quote form](/contact?mode=quote#contact-form) if the order is ready.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do all 4 x 6 labels behave the same?",
          answer:
            "No. Face stock, coating, adhesive, and sensing method can change how the label prints, scans, and survives handling.",
        },
        {
          question: "When should a buyer ask for fanfold instead of rolls?",
          answer:
            "When the printer path, storage layout, or loading routine makes fanfold easier for the warehouse team.",
        },
        {
          question: "What should be in the approval record?",
          answer:
            "Keep the printer model, label size, adhesive, stock type, barcode rule, and approved sample result in one place.",
        },
      ],
    }),
  ],
};
