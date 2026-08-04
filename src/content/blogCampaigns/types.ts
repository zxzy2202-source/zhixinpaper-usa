export interface BlogCampaignDraft {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string;
  readTime?: string;
}

export interface BlogCampaign {
  id: string;
  name: string;
  cadenceDays: number;
  description?: string;
  posts: BlogCampaignDraft[];
}
