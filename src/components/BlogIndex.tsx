"use client";

import type { PostMeta } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogIndexProps {
  posts: PostMeta[];
  title?: string;
  subtitle?: string;
  basePath?: string;
  className?: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogIndex({
  posts,
  title = "Blog",
  subtitle,
  basePath = "/blog",
  className,
}: BlogIndexProps) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 py-16", className)}>
      <header className="mb-12 border-b border-slate-800 pb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
          Blog
        </p>
        <h1 className="mb-3 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-xl text-slate-400">{subtitle}</p>
        ) : null}
      </header>

      {posts.length === 0 ? (
        <p className="text-slate-500">Nincs elérhető bejegyzés.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-slate-800">
          {posts.map((post) => (
            <li key={post.slug} className="py-8">
              <article>
                {post.category ? (
                  <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {post.category}
                  </p>
                ) : null}

                <h2 className="mb-2 text-xl font-bold leading-snug md:text-2xl text-white">
                  <a
                    href={`${basePath}/${post.slug}`}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {post.title}
                  </a>
                </h2>

                {post.description ? (
                  <p className="mb-4 text-slate-400">{post.description}</p>
                ) : null}

                <div className="flex items-center justify-between gap-4">
                  <div className="flex gap-3 text-xs text-slate-500">
                    {post.date ? (
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    ) : null}
                    {post.readingTime ? (
                      <span>{post.readingTime} perc</span>
                    ) : null}
                    {post.author ? (
                      <span>{post.author}</span>
                    ) : null}
                  </div>

                  <a
                    href={`${basePath}/${post.slug}`}
                    className="text-xs font-medium text-sky-400 hover:underline shrink-0"
                  >
                    Olvasom →
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
