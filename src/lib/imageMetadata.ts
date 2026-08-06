const BRAND_NAME = "Zhixin Paper";

function normalizeWords(value: string, stripExtension = false): string[] {
  const normalized = stripExtension ? value.replace(/\.[^.]+$/, "") : value;
  return normalized
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[._\-]+/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toSentence(words: string[]): string {
  if (words.length === 0) return "Website image";
  const text = words.join(" ").toLowerCase();
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function toSlug(words: string[]): string {
  return words
    .map((word) => word.toLowerCase().replace(/[^a-z0-9]/g, ""))
    .filter(Boolean)
    .join("-");
}

export function extensionForMime(mimeType: string): string {
  const extensions: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
  };
  return extensions[mimeType] ?? "bin";
}

function isGenericCameraName(words: string[]): boolean {
  return words.length > 0 && /^(img|image|photo|dsc|pxl)$/i.test(words[0]);
}

export interface ImageMetadataInput {
  originalName: string;
  requestedAlt?: string;
  slotAlt?: string;
  slotKey?: string;
}

export interface GeneratedImageMetadata {
  alt: string;
  filenameBase: string;
  geoContext: string;
  source: "manual" | "slot" | "filename";
}

export function generateImageMetadata({
  originalName,
  requestedAlt,
  slotAlt,
  slotKey,
}: ImageMetadataInput): GeneratedImageMetadata {
  const requested = requestedAlt?.trim();
  const registered = slotAlt?.trim();
  const filenameWords = normalizeWords(originalName, true);
  const slotWords = slotKey ? normalizeWords(slotKey) : [];
  const descriptiveFilenameWords = isGenericCameraName(filenameWords) ? [] : filenameWords;
  const fallbackWords = descriptiveFilenameWords.length > 0 ? descriptiveFilenameWords : slotWords;

  const source = requested ? "manual" : registered ? "slot" : "filename";
  const alt = requested || registered || `${toSentence(fallbackWords)} by ${BRAND_NAME}`;
  const filenameBase =
    toSlug(slotWords.length > 0 ? slotWords : descriptiveFilenameWords) || "zhixin-paper-image";

  return {
    alt,
    filenameBase,
    geoContext: slotKey
      ? `Image assigned to the ${slotKey} content slot for ${BRAND_NAME}.`
      : `Website media for ${BRAND_NAME}: ${alt}.`,
    source,
  };
}
