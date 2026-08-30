import { EUROPE_MEXICO_COMPLIANCE_P0_CAMPAIGN } from "@/content/blogCampaigns/europeMexicoComplianceP0";
import { EUROPE_MEXICO_COMPLIANCE_P1_CAMPAIGN } from "@/content/blogCampaigns/europeMexicoComplianceP1";
import { NORTH_AMERICA_THERMAL_PAPER_P0_CAMPAIGN } from "@/content/blogCampaigns/northAmericaThermalPaperP0";
import { NORTH_AMERICA_THERMAL_PAPER_P1_CAMPAIGN } from "@/content/blogCampaigns/northAmericaThermalPaperP1";

export const BLOG_CAMPAIGNS = [
  NORTH_AMERICA_THERMAL_PAPER_P0_CAMPAIGN,
  NORTH_AMERICA_THERMAL_PAPER_P1_CAMPAIGN,
  EUROPE_MEXICO_COMPLIANCE_P0_CAMPAIGN,
  EUROPE_MEXICO_COMPLIANCE_P1_CAMPAIGN,
];

export function getBlogCampaign(campaignId: string) {
  return BLOG_CAMPAIGNS.find((campaign) => campaign.id === campaignId);
}
