import { getTopicsByLocale } from "@/data/topics";
import type { TopicEntry } from "@/data/topics";
import type { Locale } from "@/lib/locales";

export interface SearchResult {
  readonly id: string;
  readonly locale: Locale;
  readonly area: TopicEntry["area"];
  readonly slug: string;
  readonly title: string;
  readonly summary: string;
}

function toSearchText(topic: TopicEntry): string {
  return [
    topic.title,
    topic.summary,
    topic.area,
    topic.slug,
    ...topic.keywords,
    ...topic.relatedTopicIds,
  ]
    .join(" ")
    .toLocaleLowerCase();
}

export function searchTopics(query: string, locale: Locale): SearchResult[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (normalizedQuery.length === 0) {
    return [];
  }

  return getTopicsByLocale(locale)
    .filter((topic) => toSearchText(topic).includes(normalizedQuery))
    .map((topic) => ({
      id: topic.id,
      locale: topic.locale,
      area: topic.area,
      slug: topic.slug,
      title: topic.title,
      summary: topic.summary,
    }));
}
