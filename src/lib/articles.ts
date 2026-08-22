import { type CollectionEntry, getCollection } from "astro:content";

export type Article = CollectionEntry<"article">;

export function getArticleSortDate(article: Article): Date {
  return article.data.updatedAt ?? article.data.publishedAt;
}

export function sortArticles(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => getArticleSortDate(b).getTime() - getArticleSortDate(a).getTime(),
  );
}

export async function getArticles(): Promise<Article[]> {
  return sortArticles(await getCollection("article"));
}
