import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

const postsDir = resolve(
  process.env.POSTS_DIR ?? join(process.cwd(), "private_data", "posts")
);

export function getPostSlugs(): string[] {
  if (!existsSync(postsDir)) {
    return [];
  }

  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
    .map((f) => basename(f, f.endsWith(".mdx") ? ".mdx" : ".md"));
}

export function getPostMeta(slug: string): PostMeta | null {
  for (const ext of [".md", ".mdx"]) {
    const fullPath = join(postsDir, `${slug}${ext}`);

    if (!existsSync(fullPath)) {
      continue;
    }

    const raw = readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);

    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      author: data.author as string | undefined,
      category: data.category as string | undefined,
      readingTime: data.readingTime as number | undefined,
    };
  }

  return null;
}

export async function getPost(slug: string): Promise<Post | null> {
  for (const ext of [".md", ".mdx"]) {
    const fullPath = join(postsDir, `${slug}${ext}`);

    if (!existsSync(fullPath)) {
      continue;
    }

    const raw = readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);
    const processed = await remark().use(remarkHtml).process(content);

    return {
      slug,
      title: (data.title as string) ?? slug,
      description: (data.description as string) ?? "",
      date: (data.date as string) ?? "",
      author: data.author as string | undefined,
      contentHtml: processed.toString(),
    };
  }

  return null;
}

export function getAllPostMeta(): PostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
