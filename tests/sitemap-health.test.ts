import assert from "node:assert/strict";
import test from "node:test";
import { isCronAuthorized } from "../src/lib/sitemap-health-alert";
import {
  checkSitemapHealth,
  toPublicSitemapHealth,
  type SitemapHealthSnapshot,
} from "../src/lib/sitemap-health";

const sitemapUrl = "https://preview.example.com/sitemap.xml";
const canonicalBaseUrl = "https://www.zhixinpaper.com";

function sitemapResponse(slugs: string[], status = 200) {
  const body = slugs
    .map((slug) => `<url><loc>${canonicalBaseUrl}/blog/${slug}</loc></url>`)
    .join("");
  return new Response(`<urlset>${body}</urlset>`, { status });
}

test("cron authorization fails closed when the secret or bearer token is missing", () => {
  assert.equal(isCronAuthorized(null, undefined), false);
  assert.equal(isCronAuthorized("Bearer configured-secret", undefined), false);
  assert.equal(isCronAuthorized(null, "configured-secret"), false);
  assert.equal(isCronAuthorized("configured-secret", "configured-secret"), false);
});

test("cron authorization rejects incorrect bearer tokens", () => {
  assert.equal(isCronAuthorized("Bearer wrong", "configured-secret"), false);
  assert.equal(isCronAuthorized("Bearer configured-secret-extra", "configured-secret"), false);
});

test("cron authorization accepts the exact bearer secret", () => {
  assert.equal(isCronAuthorized("Bearer configured-secret", "configured-secret"), true);
});

test("reports complete when every published database post is in the sitemap", async () => {
  let requestedUrl = "";
  const snapshot = await checkSitemapHealth(sitemapUrl, canonicalBaseUrl, {
    getPublishedSlugs: async () => ["first-post", "second-post"],
    fetchSitemap: async (input) => {
      requestedUrl = String(input);
      return sitemapResponse(["first-post", "second-post"]);
    },
  });

  assert.equal(requestedUrl, sitemapUrl);
  assert.equal(snapshot.ok, true);
  assert.equal(snapshot.database, "reachable");
  assert.equal(snapshot.sitemap, "complete");
  assert.equal(snapshot.publishedDatabasePosts, 2);
  assert.equal(snapshot.missingDatabasePosts, 0);
});

test("reports incomplete when a published database post is absent", async () => {
  const snapshot = await checkSitemapHealth(sitemapUrl, canonicalBaseUrl, {
    getPublishedSlugs: async () => ["first-post", "missing-post"],
    fetchSitemap: async () => sitemapResponse(["first-post"]),
  });

  assert.equal(snapshot.ok, false);
  assert.equal(snapshot.database, "reachable");
  assert.equal(snapshot.sitemap, "incomplete");
  assert.equal(snapshot.publishedDatabasePosts, 2);
  assert.equal(snapshot.missingDatabasePosts, 1);
});

test("reports sitemap unavailable when the sitemap returns an HTTP error", async () => {
  const snapshot = await checkSitemapHealth(sitemapUrl, canonicalBaseUrl, {
    getPublishedSlugs: async () => ["first-post"],
    fetchSitemap: async () => sitemapResponse([], 502),
  });

  assert.equal(snapshot.ok, false);
  assert.equal(snapshot.database, "reachable");
  assert.equal(snapshot.sitemap, "unavailable");
  assert.equal(snapshot.publishedDatabasePosts, 1);
  assert.equal(snapshot.missingDatabasePosts, null);
});

test("reports sitemap unavailable when fetching the sitemap fails", async () => {
  const snapshot = await checkSitemapHealth(sitemapUrl, canonicalBaseUrl, {
    getPublishedSlugs: async () => ["first-post"],
    fetchSitemap: async () => {
      throw new Error("private network detail");
    },
  });

  assert.equal(snapshot.ok, false);
  assert.equal(snapshot.database, "reachable");
  assert.equal(snapshot.sitemap, "unavailable");
  assert.equal(snapshot.missingDatabasePosts, null);
});

test("leaves sitemap unchecked when the database query fails", async () => {
  let sitemapFetched = false;
  const snapshot = await checkSitemapHealth(sitemapUrl, canonicalBaseUrl, {
    getPublishedSlugs: async () => {
      throw new Error("private database connection detail");
    },
    fetchSitemap: async () => {
      sitemapFetched = true;
      return sitemapResponse([]);
    },
  });

  assert.equal(sitemapFetched, false);
  assert.equal(snapshot.ok, false);
  assert.equal(snapshot.database, "unavailable");
  assert.equal(snapshot.sitemap, "unchecked");
  assert.equal(snapshot.publishedDatabasePosts, null);
  assert.equal(snapshot.missingDatabasePosts, null);
});

test("public sitemap health responses do not expose private error details", () => {
  const snapshot: SitemapHealthSnapshot = {
    ok: false,
    database: "unavailable",
    sitemap: "unchecked",
    publishedDatabasePosts: null,
    missingDatabasePosts: null,
    staticPosts: 12,
    checkedAt: "2026-08-02T00:00:00.000Z",
    error: "private database connection details",
  };

  assert.deepEqual(toPublicSitemapHealth(snapshot), {
    ok: false,
    database: "unavailable",
    sitemap: "unchecked",
    publishedDatabasePosts: null,
    missingDatabasePosts: null,
    staticPosts: 12,
    checkedAt: "2026-08-02T00:00:00.000Z",
  });
});
