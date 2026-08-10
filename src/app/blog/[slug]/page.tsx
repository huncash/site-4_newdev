import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogLayout } from "@/components/BlogLayout";
import { getPost, getPostSlugs } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {};
  }

  const disclosure = post.aiDisclosure ?? "none";
  return {
    title: post.title,
    description: post.description,
    other:
      disclosure !== "none"
        ? {
            "ai-disclosure": disclosure,
            "ai-act-article": "50",
          }
        : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogLayout post={post} />;
}
