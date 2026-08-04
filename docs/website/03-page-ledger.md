# Page Ledger

## Domain ownership

| Domain | Product scope | Market scope |
| --- | --- | --- |
| `zhixinpaper.com` | Thermal paper and thermal labels | Europe, US, Canada, Mexico |
| `zxpapers.com` | Broader paper and label portfolio | Other global markets |

The same product may be described on both domains only when market ownership, language, buyer task, and internal-link context are distinct. Do not duplicate region paragraphs around the same canonical intent.

## Thermal paper architecture

| Path | Canonical owner | Lifecycle | Role |
| --- | --- | --- | --- |
| T1 Core volume | `/products/thermal-paper-rolls` | Launch | Category and decision hub |
| T1 POS | `/products/thermal-paper-rolls/standard-pos-rolls` | Launch | POS receipt task |
| T1 Terminal | `/products/thermal-paper-rolls/credit-card-terminal-rolls` | Launch | Payment-terminal/model task |
| T2 Compliance | `/compliance/bpa-free` | Launch | BPA-, BPS-, and phenol-free terminology and evidence route |
| T3 Performance | `/products/thermal-paper-rolls#performance-grades` | Module | Resistance and life requirements; no new canonical yet |
| T4 Custom | `/products/thermal-paper-rolls/custom-printed-rolls` | Launch | Custom-print program owner |
| T5 Projects | `/products/thermal-paper-rolls#system-projects` | Directory | Existing application pages, qualification-led |
| Sizes guide | `/blog/thermal-paper-roll-sizes-guide` | Launch | Size naming and measurement task |
| Compatibility guide | `/blog/thermal-paper-printer-compatibility-guide` | Launch | Device/specification matching task |

## Thermal label architecture

| Path | Canonical owner | Lifecycle | Role |
| --- | --- | --- | --- |
| T1 Label category | `/products/thermal-labels` | Launch | Thermal label category, wholesale, manufacturer, and route-selection hub |
| T1 Direct thermal | `/products/thermal-labels/direct-thermal-labels` | Launch | Direct thermal, 4x6 shipping, barcode, printer, and fulfillment task |
| T1 Thermal transfer | `/products/thermal-labels/thermal-transfer-labels` | Launch | Thermal transfer, ribbon, industrial, outdoor, and durability task |
| T2 Fanfold | `/products/thermal-labels/fanfold-labels` | Launch | Z-fold, stack-feed, high-volume shipping, and warehouse task |
| T2 Cold chain | `/products/thermal-labels/freezer-cold-chain-labels` | Launch | Freezer, cold-chain, adhesive, and temperature task |
| Direct vs transfer guide | `/blog/direct-vs-thermal-transfer` | Launch | Informational comparison and print-method selection task |

## Regional SEO ownership

| Path | Owns | Must link to |
| --- | --- | --- |
| `/us` | US thermal paper and label procurement, California review, import, packing, and RFQ intent | Product category and exact product owners |
| `/ca` | Canadian thermal paper and label procurement, bilingual artwork, provincial review, import, packing, and RFQ intent | Product category and exact product owners |

Regional pages may mention product formats as buying context, but product-specific size, printer, barcode, and material queries remain owned by the product or guide page listed above.


- Header Products menu routes thermal rolls through T1-T5.
- The hub links T2 to the compliance owner, T4 to the custom owner, and T1/T3/T5 to stable hub anchors.
- Product pages link to size and compatibility guides where the buyer needs measurement or model qualification.
- Market pages may link to product owners but must not replace them or repeat their complete product copy.

## URL guardrails

- Do not create separate pages for every size, coating name, `waterproof`, `three-proof`, or `long-life` variation.
- A new URL requires a distinct customer task, non-duplicative content, evidence, internal links, conversion action, and registry approval.
- Preserve the current 11 thermal paper product URLs. No redirects are introduced by this change.
