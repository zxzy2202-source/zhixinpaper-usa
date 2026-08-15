import { SITE_URL } from "@/lib/seo";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const MAX_URLS_PER_REQUEST = 10_000;

function getIndexNowKey() {
  const key = process.env.INDEXNOW_KEY?.trim() || "52f9f5221a5151e43ee5c4969119b508";
  return key;
}

function normalizeUrl(value: string) {
  const url = new URL(value, SITE_URL);
  if (url.origin !== new URL(SITE_URL).origin) {
    throw new Error(`IndexNow only accepts URLs from ${SITE_URL}`);
  }
  return url.toString();
}

export async function submitIndexNow(urls: string[]) {
  const key = getIndexNowKey();
  const urlList = Array.from(new Set(urls.map(normalizeUrl))).slice(0, MAX_URLS_PER_REQUEST);

  if (urlList.length === 0) {
    return { submitted: 0, status: 204 };
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: new URL(SITE_URL).host,
      key,
      keyLocation: `${SITE_URL}/${key}.txt`,
      urlList,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`IndexNow returned HTTP ${response.status}`);
  }

  return { submitted: urlList.length, status: response.status };
}
