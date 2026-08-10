import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, basename } from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import type { AiDisclosureKind } from "@/config/ai-transparency";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  image?: string;
  imageAlt?: string;
  /** EU AI Act Art. 50 disclosure for professional publication. */
  aiDisclosure?: AiDisclosureKind;
  /** Substantive human editorial review / responsibility (Art. 50(4) exemption). */
  editorialReview?: boolean;
}

export interface Post extends PostMeta {
  contentHtml: string;
}

function parseAiDisclosure(value: unknown): AiDisclosureKind | undefined {
  if (
    value === "none" ||
    value === "assisted" ||
    value === "generated" ||
    value === "modified"
  ) {
    return value;
  }
  return undefined;
}

/** gray-matter may parse bare YAML dates as Date objects. */
function formatPostDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") return value;
  if (typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  return "";
}

const privatePostsDir = join(process.cwd(), "private_data", "posts");
const dataPostsDir = join(process.cwd(), "data", "posts");

const postsDir = resolve(
  process.env.POSTS_DIR ??
    (existsSync(privatePostsDir) ? privatePostsDir : dataPostsDir)
);

export function getPostSlugs(): string[] {
  if (!existsSync(postsDir)) {
    return [];
  }

  return readdirSync(postsDir)
    .filter(
      (f) =>
        (f.endsWith(".md") || f.endsWith(".mdx")) && !f.startsWith("_")
    )
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
      date: formatPostDate(data.date),
      author: data.author as string | undefined,
      category: (data.category as string | undefined) ?? (data.tag as string | undefined),
      readingTime: data.readingTime as number | undefined,
      image: (data.image as string | undefined) || undefined,
      imageAlt: (data.imageAlt as string | undefined) || undefined,
      aiDisclosure: parseAiDisclosure(data.aiDisclosure),
      editorialReview: Boolean(data.editorialReview),
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
      date: formatPostDate(data.date),
      author: data.author as string | undefined,
      category: (data.category as string | undefined) ?? (data.tag as string | undefined),
      readingTime: data.readingTime as number | undefined,
      image: (data.image as string | undefined) || undefined,
      imageAlt: (data.imageAlt as string | undefined) || undefined,
      aiDisclosure: parseAiDisclosure(data.aiDisclosure),
      editorialReview: Boolean(data.editorialReview),
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
