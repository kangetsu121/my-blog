import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const article = defineCollection({
  loader: glob({
    base: "./src/content/article",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => entry.replace(/[\\/]index\.(?:md|mdx)$/i, ""),
  }),
  schema: ({ image }) =>
    z
      .object({
        title: z.string().min(1),
        description: z.string().min(1),
        publishedAt: z.coerce.date(),
        updatedAt: z.coerce.date().optional(),
        tags: z.array(z.string().min(1)).default([]),
        thumbnail: image().optional(),
        thumbnailAlt: z.string().optional(),
      })
      .refine(({ thumbnail, thumbnailAlt }) => !thumbnail || !!thumbnailAlt, {
        message: "thumbnailAlt is required when thumbnail is specified",
      })
      .refine(
        ({ publishedAt, updatedAt }) =>
          !updatedAt || updatedAt.getTime() >= publishedAt.getTime(),
        {
          message: "updatedAt must not be earlier than publishedAt",
        },
      ),
});

const document = defineCollection({
  loader: glob({
    base: "./src/content/document",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

export const collections = {
  article,
  document,
};
