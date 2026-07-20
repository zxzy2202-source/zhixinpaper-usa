export const PRODUCT_LINE_OPTIONS = [
  { value: "rolls", label: "Paper rolls" },
  { value: "labels", label: "Thermal labels" },
] as const;

export const APPLICATION_OPTIONS = [
  { value: "pos", label: "POS & receipts" },
  { value: "shipping", label: "Shipping & warehouse" },
  { value: "banking", label: "ATM & banking" },
  { value: "ticketing", label: "Ticketing & gaming" },
  { value: "cold-chain", label: "Cold chain & food" },
  { value: "healthcare", label: "Healthcare & labs" },
  { value: "industrial", label: "Industrial" },
  { value: "retail", label: "Retail labeling" },
] as const;

export const FEATURE_OPTIONS = [
  { value: "bpa-free", label: "BPA-free route" },
  { value: "freezer-grade", label: "Freezer grade" },
  { value: "permanent", label: "Permanent adhesive" },
  { value: "removable", label: "Removable adhesive" },
  { value: "roll-fanfold", label: "Roll / fanfold" },
  { value: "custom-print", label: "Custom print / OEM" },
] as const;

export type ProductLineFilter = (typeof PRODUCT_LINE_OPTIONS)[number]["value"];
export type ApplicationFilter = (typeof APPLICATION_OPTIONS)[number]["value"];
export type FeatureFilter = (typeof FEATURE_OPTIONS)[number]["value"];

export type ProductFilters = {
  line: ProductLineFilter | null;
  applications: ApplicationFilter[];
  features: FeatureFilter[];
};

export type ProductExplorerSource = {
  slug: string;
  name: string;
  subtitle: string;
  applications: string[];
  sizes: string[];
  features: string[];
  moq: string;
  specifications: Record<string, string | undefined>;
};

export type ProductExplorerItem = {
  name: string;
  href: string;
  line: ProductLineFilter;
  applications: string[];
  specifications: string[];
  moq: string;
  applicationTags: ApplicationFilter[];
  featureTags: FeatureFilter[];
};

export const EMPTY_PRODUCT_FILTERS: ProductFilters = {
  line: null,
  applications: [],
  features: [],
};

const APPLICATION_MATCHERS: Record<ApplicationFilter, RegExp> = {
  pos: /\bpos\b|cash register|supermarket|restaurant/i,
  shipping: /shipping|warehouse|logistics|fulfillment|\bfba\b|pallet|carrier/i,
  banking: /\batm\b|bank|payment terminal|\bedc\b|eftpos|financial/i,
  ticketing: /lottery|gaming|casino|ticket|parking|transport|transit|bus|rail/i,
  "cold-chain": /freezer|cold chain|frozen|food contact/i,
  healthcare: /medical|hospital|pharmacy|pharma|laborator|specimen|wristband/i,
  industrial: /industrial|chemical|automotive|electronics|outdoor|high temperature|asset/i,
  retail: /retail|price tag|shelf|reusable packaging/i,
};

const FEATURE_MATCHERS: Record<FeatureFilter, RegExp> = {
  "bpa-free": /bpa-free|bps-free|phenol-free/i,
  "freezer-grade": /freezer|cold chain|low-temperature|-40/i,
  permanent: /permanent adhesive|permanent acrylic/i,
  removable: /removable|clean peel|low-tack/i,
  "roll-fanfold": /fanfold|roll \/ fanfold/i,
  "custom-print": /custom print|back-print|back print|private label|\boem\b|artwork|brand carton/i,
};

const lineValues = new Set<ProductLineFilter>(PRODUCT_LINE_OPTIONS.map((option) => option.value));
const applicationValues = new Set<ApplicationFilter>(APPLICATION_OPTIONS.map((option) => option.value));
const featureValues = new Set<FeatureFilter>(FEATURE_OPTIONS.map((option) => option.value));

function uniqueSupported<T extends string>(values: string[], supported: Set<T>): T[] {
  return [...new Set(values.filter((value): value is T => supported.has(value as T)))];
}

function classify<T extends string>(text: string, matchers: Record<T, RegExp>): T[] {
  return (Object.entries(matchers) as [T, RegExp][])
    .filter(([, matcher]) => matcher.test(text))
    .map(([value]) => value);
}

function normalizeProduct(
  source: ProductExplorerSource,
  line: ProductLineFilter,
): ProductExplorerItem {
  const searchableText = [
    source.name,
    source.subtitle,
    ...source.applications,
    ...source.features,
    ...Object.values(source.specifications).filter((value): value is string => Boolean(value)),
  ].join(" ");

  return {
    name: source.name,
    href: line === "rolls"
      ? `/products/thermal-paper-rolls/${source.slug}`
      : `/products/thermal-labels/${source.slug}`,
    line,
    applications: source.applications.slice(0, 3),
    specifications: source.sizes.slice(0, 4),
    moq: source.moq,
    applicationTags: classify(searchableText, APPLICATION_MATCHERS),
    featureTags: classify(searchableText, FEATURE_MATCHERS),
  };
}

export function createProductExplorerItems(
  rolls: ProductExplorerSource[],
  labels: ProductExplorerSource[],
): ProductExplorerItem[] {
  return [
    ...rolls.map((product) => normalizeProduct(product, "rolls")),
    ...labels.map((product) => normalizeProduct(product, "labels")),
  ];
}

export function filterExplorerItems(
  items: ProductExplorerItem[],
  filters: ProductFilters,
): ProductExplorerItem[] {
  return items.filter((item) => {
    const lineMatches = filters.line === null || item.line === filters.line;
    const applicationMatches = filters.applications.length === 0
      || filters.applications.some((value) => item.applicationTags.includes(value));
    const featuresMatch = filters.features.every((value) => item.featureTags.includes(value));

    return lineMatches && applicationMatches && featuresMatch;
  });
}

export function parseProductFilters(search: string): ProductFilters {
  const params = new URLSearchParams(search);
  const lineValue = params.get("line");

  return {
    line: lineValue && lineValues.has(lineValue as ProductLineFilter)
      ? lineValue as ProductLineFilter
      : null,
    applications: uniqueSupported(params.getAll("use"), applicationValues),
    features: uniqueSupported(params.getAll("feature"), featureValues),
  };
}

export function serializeProductFilters(filters: ProductFilters): string {
  const params = new URLSearchParams();

  if (filters.line) params.set("line", filters.line);
  APPLICATION_OPTIONS.forEach(({ value }) => {
    if (filters.applications.includes(value)) params.append("use", value);
  });
  FEATURE_OPTIONS.forEach(({ value }) => {
    if (filters.features.includes(value)) params.append("feature", value);
  });

  return params.toString();
}
