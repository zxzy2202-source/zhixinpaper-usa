import test from "node:test";
import assert from "node:assert/strict";
import { BLOG_CAMPAIGNS } from "@/content/blogCampaigns/registry";

test("blog campaigns use unique ids and unique slugs", () => {
  const campaignIds = new Set<string>();
  const postSlugs = new Set<string>();

  for (const campaign of BLOG_CAMPAIGNS) {
    assert.ok(campaign.id, "campaign id is required");
    assert.ok(!campaignIds.has(campaign.id), `duplicate campaign id: ${campaign.id}`);
    campaignIds.add(campaign.id);

    for (const post of campaign.posts) {
      assert.ok(post.slug, `missing slug in campaign ${campaign.id}`);
      assert.ok(post.title, `missing title for ${post.slug}`);
      assert.ok(post.excerpt, `missing excerpt for ${post.slug}`);
      assert.ok(post.content, `missing content for ${post.slug}`);
      assert.ok(post.category, `missing category for ${post.slug}`);
      assert.ok(!postSlugs.has(post.slug), `duplicate post slug across campaigns: ${post.slug}`);
      postSlugs.add(post.slug);
    }
  }
});
