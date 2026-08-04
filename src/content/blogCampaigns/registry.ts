import { EUROPE_MEXICO_COMPLIANCE_P0_CAMPAIGN } from "@/content/blogCampaigns/europeMexicoComplianceP0";
import { NORTH_AMERICA_THERMAL_PAPER_P0_CAMPAIGN } from "@/content/blogCampaigns/northAmericaThermalPaperP0";

export const BLOG_CAMPAIGNS = [
  NORTH_AMERICA_THERMAL_PAPER_P0_CAMPAIGN,
  EUROPE_MEXICO_COMPLIANCE_P0_CAMPAIGN,
];

export function getBlogCampaign(campaignId: string) {
  return BLOG_CAMPAIGNS.find((campaign) => campaign.id === campaignId);
}
