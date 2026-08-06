import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const robotsPath = new URL("../src/app/robots.ts", import.meta.url);

const aiAgents = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "Bytespider",
  "cohere-ai",
  "Perplexity-User",
  "Claude-SearchBot",
  "Claude-User",
  "Claude-Web",
  "Amazonbot",
  "FacebookBot",
  "Meta-ExternalFetcher",
];

test("AI crawlers share the public-content access policy", async () => {
  const robotsSource = await readFile(robotsPath, "utf8");
  assert.match(robotsSource, /const AI_USER_AGENTS = \[/);
  assert.match(robotsSource, /allow: \["\/"\]/);
  assert.match(robotsSource, /disallow: PRIVATE_PATHS/);

  for (const agent of aiAgents) {
    assert.match(robotsSource, new RegExp(`"${agent}"`));
  }
});

test("private paths remain protected", async () => {
  const robotsSource = await readFile(robotsPath, "utf8");
  for (const path of ["/api/", "/admin/", "/login", "/data/"]) {
    assert.match(robotsSource, new RegExp(`"${path.replace("/", "\\/")}"`));
  }

  assert.doesNotMatch(robotsSource, /userAgent: "GPTBot", disallow: \["\/"\]/);
  assert.doesNotMatch(robotsSource, /userAgent: "Claude-Web", disallow: \["\/"\]/);
});
