"use client";

import type { Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogLayoutProps {
  post: Post;
  className?: string;
}

export function BlogLayout({ post, className }: BlogLayoutProps) {
  return (
    <article className={cn("mx-auto max-w-2xl px-4 py-12", className)}>
      <header className="mb-8">
        <h1 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight text-white">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mb-3 text-lg text-slate-400">{post.description}</p>
        ) : null}
        <div className="flex gap-4 text-xs text-slate-500">
          {post.date ? <time dateTime={post.date}>{post.date}</time> : null}
          {post.author ? <span>{post.author}</span> : null}
        </div>
      </header>

      <div
        className={cn(
          "prose prose-invert prose-sm max-w-none",
          "prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white",
          "prose-a:text-sky-400 prose-a:underline",
          "prose-code:rounded prose-code:bg-slate-900 prose-code:px-1 prose-code:text-sm",
          "prose-img:rounded-xl prose-img:shadow"
        )}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
