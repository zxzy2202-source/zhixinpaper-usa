export interface FaqLink {
  href: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  link?: FaqLink | null;
}

export interface FaqGroup {
  category: string;
  questions: readonly FaqItem[];
}

export function normalizeFaqItem(item: { question?: string; answer?: string; q?: string; a?: string; link?: FaqLink | null }): FaqItem {
  return {
    question: item.question ?? item.q ?? "",
    answer: item.answer ?? item.a ?? "",
    link: item.link,
  };
}

export function flattenFaqGroups(groups: readonly FaqGroup[]): FaqItem[] {
  return groups.flatMap((group) => group.questions.map(normalizeFaqItem));
}
