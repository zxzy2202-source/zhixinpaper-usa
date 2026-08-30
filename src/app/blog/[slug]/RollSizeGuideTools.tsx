import Link from "next/link";
import {
  ArrowRight,
  CircleDot,
  Layers3,
  PackageCheck,
  Printer,
  RotateCw,
  Ruler,
} from "lucide-react";

const SPEC_FIELDS = [
  [Ruler, "Roll width", "Measure across the flat face of the roll in millimeters."],
  [CircleDot, "Maximum OD or roll length", "Record the full-roll diameter or the required nominal length."],
  [CircleDot, "Core ID", "Measure the inner opening and note whether the device is coreless."],
  [RotateCw, "Winding", "Confirm the thermal side and unwind direction used by the mechanism."],
  [Layers3, "Paper grade", "State GSM or caliper, coating, retention, and document requirements."],
  [Printer, "Printer model", "Provide the exact manufacturer and model for compatibility review."],
] as const;

const COMMON_SIZES = [
  ["80 x 80 mm", "80 mm", "80 mm OD", "POS receipt family"],
  ["80 x 60 mm", "80 mm", "60 mm OD", "Compact POS family"],
  ["57 x 50 mm", "57 mm", "50 mm OD", "POS and payment family"],
  ["57 x 40 mm", "57 mm", "40 mm OD", "Compact terminal family"],
] as const;

export default function RollSizeGuideTools() {
  return (
    <section
      id="roll-size-quick-start"
      className="mb-14 border-y border-[#c8bcaa] bg-[#fbfaf6]"
      aria-labelledby="roll-size-quick-start-heading"
    >
      <div className="px-5 py-8 md:px-8 md:py-10">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#9c661d]">
          Size specification worksheet
        </p>
        <div className="mt-3 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <h2
            id="roll-size-quick-start-heading"
            className="text-3xl font-bold leading-tight text-[#14211f] md:text-4xl"
          >
            Start with six fields, not a size name.
          </h2>
          <p className="max-w-2xl text-base leading-7 text-[#4f5f5a] lg:justify-self-end">
            A name such as 80 x 80 mm is only a starting point. Printer fit also
            depends on the core, winding, paper construction, and the device&apos;s
            actual compartment limits.
          </p>
        </div>

        <div className="mt-8 grid border-t border-[#ded6c8] sm:grid-cols-2 lg:grid-cols-3">
          {SPEC_FIELDS.map(([Icon, label, description], index) => (
            <div
              key={label}
              className={`grid grid-cols-[40px_1fr] gap-3 py-5 sm:px-5 ${
                index >= 3 ? "lg:border-t lg:border-[#ded6c8]" : ""
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center bg-[#e7eee9] text-[#0f5f5c]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <strong className="block text-sm font-bold text-[#14211f]">{label}</strong>
                <span className="mt-1 block text-sm leading-6 text-[#687772]">{description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid border-t border-[#c8bcaa] lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 px-5 py-8 md:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f5f5c]">
                Common catalog sizes
              </p>
              <h3 className="mt-2 text-2xl font-bold text-[#14211f]">Use the name to begin the check.</h3>
            </div>
            <p className="text-xs leading-5 text-[#687772]">Never approve by size name alone.</p>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#c8bcaa] text-xs uppercase text-[#687772]">
                  <th className="px-3 py-3 font-semibold">Catalog name</th>
                  <th className="px-3 py-3 font-semibold">Width</th>
                  <th className="px-3 py-3 font-semibold">Second value</th>
                  <th className="px-3 py-3 font-semibold">Typical family</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ded6c8] text-[#14211f]">
                {COMMON_SIZES.map(([name, width, secondValue, family]) => (
                  <tr key={name}>
                    <th className="px-3 py-4 font-bold text-[#0f5f5c]">{name}</th>
                    <td className="px-3 py-4">{width}</td>
                    <td className="px-3 py-4">{secondValue}</td>
                    <td className="px-3 py-4 text-[#4f5f5a]">{family}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-t border-[#c8bcaa] bg-[#14211f] px-5 py-8 text-white md:px-8 lg:border-l lg:border-t-0">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#d6b273]">
            How names are written
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-bold">Metric size names</h3>
              <p className="mt-2 text-sm leading-6 text-[#c7d0cb]">
                Usually width x outer diameter, such as 80 x 80 mm.
              </p>
            </div>
            <div className="border-t border-white/15 pt-6">
              <h3 className="text-lg font-bold">Inch size names</h3>
              <p className="mt-2 text-sm leading-6 text-[#c7d0cb]">
                Often width x nominal length. Confirm what each value represents before comparing quotes.
              </p>
            </div>
          </div>
          <Link
            href="/samples?context=roll-size-guide&sourcePage=%2Fblog%2Fthermal-paper-roll-sizes-guide"
            className="mt-8 inline-flex min-h-11 items-center gap-2 bg-[#d6b273] px-5 text-sm font-bold text-[#14211f] transition hover:bg-[#e3c58f]"
          >
            Project qualification <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#c8bcaa] bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
        <div className="flex items-center gap-3 text-sm text-[#4f5f5a]">
          <PackageCheck className="h-5 w-5 shrink-0 text-[#0f5f5c]" aria-hidden="true" />
          <span>Already know the six fields? Continue to the matching roll range.</span>
        </div>
        <Link
          href="/products/thermal-paper-rolls"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#0f5f5c] hover:underline"
        >
          Compare thermal paper rolls <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
