"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Filter, RotateCcw, X } from "lucide-react";
import {
  APPLICATION_OPTIONS,
  EMPTY_PRODUCT_FILTERS,
  FEATURE_OPTIONS,
  PRODUCT_LINE_OPTIONS,
  filterExplorerItems,
  parseProductFilters,
  serializeProductFilters,
  type ApplicationFilter,
  type FeatureFilter,
  type ProductExplorerItem,
  type ProductFilters,
  type ProductLineFilter,
} from "./productExplorerModel";

type ProductExplorerProps = {
  items: ProductExplorerItem[];
};

type FilterOption<T extends string> = {
  value: T;
  label: string;
};

const QUICK_APPLICATIONS: ApplicationFilter[] = ["pos", "shipping", "banking", "cold-chain"];

const FILTER_LABELS = new Map<string, string>(
  [...PRODUCT_LINE_OPTIONS, ...APPLICATION_OPTIONS, ...FEATURE_OPTIONS]
    .map((option) => [option.value, option.label]),
);

function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((entry) => entry !== value)
    : [...values, value];
}

function FilterGroup<T extends string>({
  legend,
  options,
  selected,
  onToggle,
}: {
  legend: string;
  options: readonly FilterOption<T>[];
  selected: readonly T[];
  onToggle: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="text-xs font-bold text-[#4f5f5a]">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              aria-controls="product-results"
              onClick={() => onToggle(option.value)}
              className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 text-left text-sm font-semibold transition ${
                active
                  ? "border-[#0f5f5c] bg-[#0f5f5c] text-white"
                  : "border-[#d8d0c3] bg-white text-[#33413e] hover:border-[#0f5f5c]/55 hover:bg-[#f7f5ef]"
              }`}
            >
              {active ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function FilterControls({
  filters,
  onLineChange,
  onApplicationToggle,
  onFeatureToggle,
  onClear,
}: {
  filters: ProductFilters;
  onLineChange: (line: ProductLineFilter | null) => void;
  onApplicationToggle: (value: ApplicationFilter) => void;
  onFeatureToggle: (value: FeatureFilter) => void;
  onClear: () => void;
}) {
  return (
    <div className="grid gap-7">
      <FilterGroup
        legend="Product line"
        options={PRODUCT_LINE_OPTIONS}
        selected={filters.line ? [filters.line] : []}
        onToggle={(line) => onLineChange(filters.line === line ? null : line)}
      />
      <FilterGroup
        legend="Application"
        options={APPLICATION_OPTIONS}
        selected={filters.applications}
        onToggle={onApplicationToggle}
      />
      <FilterGroup
        legend="Procurement attributes"
        options={FEATURE_OPTIONS}
        selected={filters.features}
        onToggle={onFeatureToggle}
      />
      <button
        type="button"
        onClick={onClear}
        className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#c8bcaa] px-4 text-sm font-bold text-[#33413e] transition hover:border-[#0f5f5c] hover:text-[#0f5f5c]"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Clear all
      </button>
    </div>
  );
}

function labelFor(value: string): string {
  return FILTER_LABELS.get(value) ?? value;
}

export default function ProductExplorer({ items }: ProductExplorerProps) {
  const [filters, setFilters] = useState<ProductFilters>(EMPTY_PRODUCT_FILTERS);

  useEffect(() => {
    const syncFromLocation = () => setFilters(parseProductFilters(window.location.search));

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const filteredItems = useMemo(
    () => filterExplorerItems(items, filters),
    [items, filters],
  );

  const activeValues = [
    ...(filters.line ? [filters.line] : []),
    ...filters.applications,
    ...filters.features,
  ];

  function commitFilters(next: ProductFilters) {
    setFilters(next);
    const query = serializeProductFilters(next);
    const url = `${window.location.pathname}${query ? `?${query}` : ""}#product-explorer`;
    window.history.pushState(null, "", url);
  }

  function clearFilters() {
    commitFilters(EMPTY_PRODUCT_FILTERS);
  }

  function removeActive(value: string) {
    commitFilters({
      line: filters.line === value ? null : filters.line,
      applications: filters.applications.filter((entry) => entry !== value),
      features: filters.features.filter((entry) => entry !== value),
    });
  }

  const controls = (
    <FilterControls
      filters={filters}
      onLineChange={(line) => commitFilters({ ...filters, line })}
      onApplicationToggle={(value) => commitFilters({
        ...filters,
        applications: toggleValue(filters.applications, value),
      })}
      onFeatureToggle={(value) => commitFilters({
        ...filters,
        features: toggleValue(filters.features, value),
      })}
      onClear={clearFilters}
    />
  );

  return (
    <section
      id="product-explorer"
      aria-labelledby="product-explorer-heading"
      className="bg-[#f4f0e8] py-18 md:py-24"
    >
      <div className="container-site">
        <div className="max-w-3xl">
          <p className="section-label">Product finder</p>
          <h2
            id="product-explorer-heading"
            className="mt-3 text-4xl font-bold text-[#14211f] md:text-5xl"
          >
            Find the product by use case or buying requirement.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4f5f5a] md:text-base">
            Start with the environment your customer operates in, or narrow the catalog by product line and procurement attributes.
          </p>
        </div>

        <div className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_APPLICATIONS.map((value) => (
            <button
              key={value}
              type="button"
              aria-controls="product-results"
              onClick={() => commitFilters({ ...EMPTY_PRODUCT_FILTERS, applications: [value] })}
              className="group flex min-h-14 items-center justify-between border border-[#d8d0c3] bg-[#fbfaf6] px-4 text-left text-sm font-bold text-[#14211f] transition hover:border-[#0f5f5c] hover:text-[#0f5f5c]"
            >
              {labelFor(value)}
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
          ))}
        </div>

        <details className="mt-8 border border-[#d8d0c3] bg-[#fbfaf6] lg:hidden">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-4 text-sm font-bold text-[#14211f]">
            <span className="inline-flex items-center gap-2">
              <Filter className="h-4 w-4" aria-hidden="true" />
              Filter products
            </span>
            <span>{activeValues.length} active</span>
          </summary>
          <div className="border-t border-[#d8d0c3] p-4">{controls}</div>
        </details>

        <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start">
          <aside
            aria-label="Product filters"
            className="sticky top-24 hidden border border-[#d8d0c3] bg-[#fbfaf6] p-5 lg:block"
          >
            {controls}
          </aside>

          <div className="min-w-0">
            <div className="border border-[#c8bcaa] bg-[#101b19] px-4 py-4 text-white md:flex md:items-center md:justify-between md:gap-5">
              <div>
                <p aria-live="polite" className="text-sm font-bold">
                  {filteredItems.length} {filteredItems.length === 1 ? "product" : "products"}
                </p>
                <p className="mt-1 text-xs leading-5 text-[#c7d0cb]">
                  Applications combine broadly; procurement attributes must all match.
                </p>
              </div>
              <Link
                href="/quote"
                className="mt-3 inline-flex min-h-11 items-center gap-2 bg-[#9c661d] px-4 text-sm font-bold text-white transition hover:bg-[#7d4f16] md:mt-0"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            {activeValues.length > 0 ? (
              <div
                aria-label="Active filters"
                className="flex flex-wrap gap-2 border-x border-b border-[#d8d0c3] bg-[#fbfaf6] p-3"
              >
                {activeValues.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => removeActive(value)}
                    aria-label={`Remove ${labelFor(value)} filter`}
                    className="inline-flex min-h-11 items-center gap-2 border border-[#a9c3b8] bg-[#eef5ef] px-3 text-sm font-semibold text-[#0f5f5c]"
                  >
                    {labelFor(value)}
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-11 px-3 text-sm font-bold text-[#4f5f5a] underline-offset-4 hover:underline"
                >
                  Clear all
                </button>
              </div>
            ) : null}

            <div id="product-results">
              {filteredItems.length > 0 ? (
                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {filteredItems.map((item) => (
                    <article
                      key={item.href}
                      className="flex min-h-full flex-col border border-[#ded6c8] bg-[#fbfaf6] p-5"
                    >
                      <p className="text-xs font-bold text-[#0f5f5c]">
                        {item.line === "rolls" ? "Paper rolls" : "Thermal labels"}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-[#14211f]">{item.name}</h3>
                      <p className="mt-3 text-sm leading-6 text-[#4f5f5a]">
                        {item.applications.join(" / ")}
                      </p>
                      <dl className="mt-5 grid gap-3 border-t border-[#e4ddcf] pt-4 text-xs leading-5">
                        <div>
                          <dt className="font-bold text-[#33413e]">Common specifications</dt>
                          <dd className="mt-1 text-[#687772]">
                            {item.specifications.join(" / ")}
                          </dd>
                        </div>
                        <div>
                          <dt className="font-bold text-[#33413e]">MOQ</dt>
                          <dd className="mt-1 text-[#687772]">{item.moq}</dd>
                        </div>
                      </dl>
                      <Link
                        href={item.href}
                        prefetch={false}
                        className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 text-sm font-bold text-[#0f5f5c] hover:text-[#0a4745] hover:underline"
                      >
                        View product
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="mt-4 border border-[#d8d0c3] bg-[#fbfaf6] p-7 md:p-10">
                  <h3 className="text-2xl font-bold text-[#14211f]">
                    No products match these filters.
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-[#4f5f5a]">
                    Clear one or more filters, or send the required size, use case, and destination for a custom recommendation.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#0f5f5c] px-5 text-sm font-bold text-white hover:bg-[#0a4745]"
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      Clear filters
                    </button>
                    <Link
                      href="/quote"
                      className="inline-flex min-h-11 items-center justify-center gap-2 border border-[#0f5f5c] px-5 text-sm font-bold text-[#0f5f5c]"
                    >
                      Request a Quote
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
