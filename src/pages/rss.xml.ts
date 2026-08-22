import rss from "@astrojs/rss";
import type { APIContext } from "astro";

import { getArticles } from "@/lib/articles";

export async function GET(context: APIContext) {
  if (!context.site) {
    throw new Error("Astro site is not configured");
  }

  const articles = await getArticles();

  return rss({
    title: "Kangetsu Blog",
    description: "Kangetsu Blogの更新情報",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/${article.id}/`,
    })),
    customData: "<language>ja</language>",
  });
}
