import Link from "next/link";

const manufactured = [
  ["Product & Packaging Labels", "Custom printed labels and stickers for products and packaging.", "/products/thermal-labels/custom-printed-labels"],
  ["Direct Thermal Labels", "Direct thermal labels for product identification and shipping applications.", "/products/thermal-labels/direct-thermal-labels"],
  ["Thermal Transfer Labels", "Labels reviewed against the required material, ribbon and application.", "/products/thermal-labels/thermal-transfer-labels"],
  ["Thermal Paper Rolls", "Thermal paper rolls slit in-house for receipt and ticket applications.", "/products/thermal-paper-rolls"],
  ["NCR Carbonless Forms", "Carbonless forms for printed business documents.", "/contact?mode=quote#contact-form"],
] as const;
const materials = [
  ["Thermal Paper", "Sourced thermal paper, including jumbo rolls and base paper."],
  ["Self-Adhesive Labelstock", "Sourced label materials, including jumbo rolls and blank labelstock."],
  ["NCR Carbonless Paper", "Sourced carbonless paper, including rolls and sheets."],
  ["Woodfree Offset Paper", "Sourced woodfree offset paper."],
  ["Thermal Transfer Ribbons", "Sourced thermal transfer ribbons."],
] as const;

export default function CatalogCategories() {
  return (
    <section id="catalog-categories" className="bg-[#fbfaf6] py-16">
      <div className="container-site space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-[#14211f]">Five manufactured product categories</h2>
          <p className="mt-3 text-[#4f5f5a]">Finished products made by Zhixin using sourced materials.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {manufactured.map(([name, description, href]) => (
              <Link key={name} href={href} className="border border-[#ded6c8] bg-white p-5">
                <h3 className="font-bold text-[#0f5f5c]">{name}</h3>
                <p className="mt-2 text-sm text-[#4f5f5a]">{description}</p>
              </Link>
            ))}
          </div>
        </div>
        <div id="material-supply">
          <h2 className="text-3xl font-bold text-[#14211f]">Material Supply</h2>
          <p className="mt-3 text-[#4f5f5a]">Traded materials sourced for customers; Zhixin does not manufacture these materials. Jumbo rolls and blank labelstock are supplied through consolidated sourcing.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {materials.map(([name, description]) => (
              <div key={name} className="border border-[#ded6c8] bg-white p-5">
                <h3 className="font-bold text-[#14211f]">{name}</h3>
                <p className="mt-2 text-sm text-[#4f5f5a]">{description}</p>
              </div>
            ))}
          </div>
          <Link className="mt-6 inline-block font-bold text-[#0f5f5c]" href="/contact?mode=quote#contact-form">
            Ask About Material Supply →
          </Link>
        </div>
      </div>
    </section>
  );
}
