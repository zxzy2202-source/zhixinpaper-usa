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
    "## Approval checklist before release",
    "",
    "For Europe and Mexico programs, the buyer should close the approval file before the first reorder leaves the desk. That means the product name, sample ID, declaration scope, lot format, and destination market all point to the same approved grade instead of to a loosely related family name.",
    "",
    "- Match the quoted grade name to the declaration, sample label, and internal item code.",
    "- Record whether the evidence supports BPA-free, phenol-free, or another narrower claim and avoid treating the terms as interchangeable.",
    "- Keep the document issue date, sample ID, and reviewer note together so the next purchase can reuse the same reference quickly.",
    "- For traceability programs, print the item code, lot number, and destination code on cartons or roll packaging where the receiving team can see them.",
    "- If the order serves more than one country, note which part of the file applies to the EU and which part applies to Mexico.",
    "- If the label or paper will touch a food pack, a chilled carton, or a warehouse surface, write down the actual contact condition before approval.",
    "- Re-open the file whenever the printer route, label surface, adhesive, or paper construction changes after sample sign-off.",
    "- Keep one short approval note that procurement, quality, and the supplier can all read without translation or interpretation work.",
    "",
    "That is the practical control point. The buyer is not trying to build a legal archive. The goal is to keep the commercial item, the sample, and the evidence aligned so the next PO can move faster and with less confusion.",
    "",
    "## Next Step",
    "",
    "If the project is ready for sampling or quotation, move it through the [samples request](/contact?mode=samples#contact-form) or the [quote form](/contact?mode=quote#contact-form).",
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

export const EUROPE_MEXICO_COMPLIANCE_P1_CAMPAIGN: BlogCampaign = {
  id: "europe-mexico-compliance-p1-2026",
  name: "Europe and Mexico Compliance P1",
  cadenceDays: 10,
  description:
    "Second batch of Europe and Mexico drafts focused on document review, traceability, and RFQ control.",
  posts: [
    draftPost({
      slug: "eu-bpa-free-thermal-paper-review-checklist",
      title: "EU BPA-Free Thermal Paper Review Checklist",
      excerpt:
        "A document-first review workflow for EU buyers verifying grade, declaration scope, and traceability.",
      category: "Compliance",
      tags: "BPA-free thermal paper, EU review, document control",
      readTime: "7 min",
      intro:
        "EU buyers do not need more paperwork. They need the right paperwork tied to the quoted paper grade. The review should connect the declaration, the test file, the sample identity, and the shipment label before anyone approves the order.",
      sections: [
        {
          heading: "Start with the exact grade",
          body: [
            "The document request should name the exact grade, not only the product family. A declaration that says \"thermal paper series\" is too broad to support a purchasing decision.",
            "Ask the supplier to show the grade name, the sample ID, the issue date, and the issuing party. If those details do not line up with the quote, ask for a corrected version.",
            "That keeps the approval focused on the real SKU instead of a generic statement.",
          ],
        },
        {
          heading: "Match documents to the quoted construction",
          body: [
            "When the supplier offers more than one chemistry option, do not assume the terms are interchangeable. Check which option applies to the quoted grade and whether the file covers that exact construction.",
            "It helps to keep a short matrix in the approval file: grade name, basis weight, sample ID, report date, and lot format.",
            "If the product label and the report use different names, ask the supplier to align them before release.",
          ],
        },
        {
          heading: "Hold approval when traceability is weak",
          body: [
            "A clean PDF is not enough if the traceability chain is weak. Buyers should check whether the batch format, the carton mark, and the sample record all point to the same product.",
            "If the report is old, do not reject it automatically. Ask whether the grade changed and whether a continuity statement is available.",
            "Use the site's [compliance page](/compliance) as the anchor and route any open questions through the [contact page](/contact).",
          ],
        },
      ],
      faqs: [
        {
          question: "Is a supplier declaration enough on its own?",
          answer:
            "Sometimes it helps, but the declaration should still match the quoted grade clearly. Buyers usually want the declaration plus a supporting report or traceable file.",
        },
        {
          question: "When should an older report be re-requested?",
          answer:
            "Re-request it when it cannot be tied to the current grade, when the issue date is too old for your approval cycle, or when the supplier cannot explain continuity.",
        },
        {
          question: "What should be stored in the approval file?",
          answer:
            "Keep the quote, declaration, report reference, reviewer note, and lot format in one place so repeat orders can be checked quickly.",
        },
      ],
    }),
    draftPost({
      slug: "eu-thermal-paper-traceability-checklist",
      title: "Thermal Paper Traceability Checklist for European Buyers",
      excerpt:
        "How to align lot numbers, sample IDs, and shipping labels with an approved thermal paper grade.",
      category: "Compliance",
      tags: "traceability, thermal paper, European buyers",
      readTime: "6 min",
      intro:
        "Traceability becomes important the moment a buyer approves one grade and then needs to reorder it six months later. The safest process is to record a short set of product identity fields and keep them attached to the sample, the quote, and the cartons.",
      sections: [
        {
          heading: "Record the identity fields that actually matter",
          body: [
            "At minimum, keep the grade name, sample ID, report date, carton mark, and lot format. Those five fields usually tell the buyer whether the next shipment is the same approved construction.",
            "If the supplier uses internal codes, ask them to map those codes to the commercial name used on the PO.",
            "The goal is not to build a huge file. The goal is to make the next reorder easy to compare.",
          ],
        },
        {
          heading: "Tie traceability to the receiving flow",
          body: [
            "Traceability is weak when the carton label does not match the approval note. Ask the supplier to print the size, quantity, and lot number on the outside pack.",
            "If the program uses more than one warehouse, keep the destination code visible so the receiving team can sort the pallets quickly.",
            "That reduces the chance that a right product is treated like the wrong one because the outer label was vague.",
          ],
        },
        {
          heading: "Keep the approval note short",
          body: [
            "The buyer's approval note should say what was tested, what was accepted, and what must not change. That is enough for procurement, QA, and the supplier to stay aligned.",
            "If the next quote uses a different grade name, re-check the sample instead of assuming it is a naming issue only.",
            "For open document requests, keep the conversation tied to the [compliance page](/compliance) and the [quote form](/contact?mode=quote#contact-form).",
          ],
        },
      ],
      faqs: [
        {
          question: "Why is the carton label part of traceability?",
          answer:
            "Because the warehouse sees the carton label first. If it does not match the approval note, the receiving team may store the wrong SKU in the wrong place.",
        },
        {
          question: "Do lot numbers need to be long and complex?",
          answer:
            "No. The lot format only needs to let the buyer and supplier identify the approved batch consistently.",
        },
        {
          question: "Should every reorder get a new sample?",
          answer:
            "Not always, but any change in grade name, carton rule, or traceability format should trigger a re-check.",
        },
      ],
    }),
    draftPost({
      slug: "mexico-thermal-paper-rfq-guide",
      title: "Mexico Thermal Paper RFQ Guide for Retail and Payment Teams",
      excerpt:
        "A practical RFQ guide for Mexico buyers specifying receipt roll size, device data, and pallet planning.",
      category: "Market Insights",
      tags: "Mexico thermal paper, RFQ guide, retail",
      readTime: "7 min",
      intro:
        "Mexico thermal paper RFQs get much cleaner when the buyer names the device, the roll geometry, and the receiving plan. A vague request creates a vague quote, which usually means more follow-up and more risk at rollout.",
      sections: [
        {
          heading: "Separate the device groups first",
          body: [
            "Retail stores, payment terminals, kiosks, and back-office devices often need different roll families. Do not merge them into one line item just because they all use thermal paper.",
            "For each group, record the model, width, outer diameter, core size, and printable side. If the buyer only has a live sample, measure the sample before asking for price.",
            "That gives the supplier enough information to quote the right family from the start.",
          ],
        },
        {
          heading: "Describe the replenishment pattern",
          body: [
            "A roll that fits is not necessarily the right commercial choice. The buyer should tell the supplier how many rolls move per store, how many cartons are needed, and whether mixed pallets are allowed.",
            "If the chain has peak-season demand, include that uplift in the RFQ so the quote does not assume normal months only.",
            "Packing and replenishment affect landed cost, receiving time, and repeat-order control.",
          ],
        },
        {
          heading: "Use the RFQ to protect the reorder",
          body: [
            "The approval note should carry the final item code, carton rule, and destination code. That makes the next reorder much easier to check.",
            "If the next shipment changes size, winding, or pallet mix, ask for a new sample review before approval.",
            "For project follow-up, move the buyer into the [thermal paper rolls page](/products/thermal-paper-rolls) or the [quote form](/contact?mode=quote#contact-form).",
          ],
        },
      ],
      faqs: [
        {
          question: "Should one RFQ combine all store devices?",
          answer:
            "Only if each device family is broken out as its own line with its own volume and packing rule.",
        },
        {
          question: "What if the printer model is unknown?",
          answer:
            "Measure the live roll and ask for photos of the printer label and the paper path. That usually gives enough data for a first quote.",
        },
        {
          question: "Why does packing matter so much?",
          answer:
            "Because the warehouse and store teams receive the pack before they see the technical spec. Clear packing rules reduce mistakes and speed receiving.",
        },
      ],
    }),
    draftPost({
      slug: "mexico-thermal-label-approval-checklist",
      title: "Thermal Label Approval Checklist for Mexico Warehouses",
      excerpt:
        "How Mexican warehouse teams can approve thermal labels with fit, barcode, and receiving criteria.",
      category: "Product Guide",
      tags: "Mexico labels, thermal label approval, warehouse",
      readTime: "7 min",
      intro:
        "Mexico warehouse label programs work better when the approval process is written before the first sample arrives. The buyer should decide the printer route, the barcode rule, the adhesive, and the receiving control together.",
      sections: [
        {
          heading: "Gather the printer details and label size",
          body: [
            "Start with the exact printer model, printhead resolution, sensing method, and label size. If the project uses thermal transfer, include ribbon width and ribbon grade.",
            "If the buyer cannot get the full spec, ask for the printer label, the current label next to a ruler, and a photo of the loaded media path.",
            "That avoids a sample based on guesswork.",
          ],
        },
        {
          heading: "Set the barcode and handling criteria",
          body: [
            "A label is approved when it scans in the real workflow. Decide the scan target, the print darkness, and the handling condition before the sample test begins.",
            "If the label will face cold rooms, moisture, or abrasion, say that in the brief so the supplier can choose the right stock and adhesive.",
            "Then test the label on the actual scanner type used in the warehouse.",
          ],
        },
        {
          heading: "Write down the approval record",
          body: [
            "The approval note should list the printer model, label code, adhesive, core, and winding direction. That gives the next reorder a clean reference point.",
            "If more than one DC uses the label, test the distinct printer families separately before you roll out a single SKU.",
            "If the sample sits in a warehouse before release, note the storage condition and the approval owner so the handoff stays clear.",
            "For final pricing, the buyer can move from the [thermal labels page](/products/thermal-labels) to the [samples page](/contact?mode=samples#contact-form) and then to [quote](/contact?mode=quote#contact-form).",
          ],
        },
      ],
      faqs: [
        {
          question: "Do all warehouses need the same label setting?",
          answer:
            "Not always. Different printer families and different scanner habits can require separate tests before one SKU goes live.",
        },
        {
          question: "When should a buyer request film labels instead of paper?",
          answer:
            "When the label needs more abrasion resistance, moisture hold, or long-term handling stability.",
        },
        {
          question: "What is the most common approval mistake?",
          answer:
            "Buyers often forget sensing method, core, or winding direction and then discover the mismatch during rollout.",
        },
      ],
    }),
  ],
};
