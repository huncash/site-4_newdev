"use client";

import { AiContentLabel } from "@/components/legal/AiContentLabel";
import type { Post } from "@/lib/blog";
import { cn } from "@/lib/utils";

export interface BlogLayoutProps {
  post: Post;
  className?: string;
}

/** Split HTML so the featured image can sit after the opening paragraph. */
function splitAfterFirstParagraph(html: string): {
  leadHtml: string;
  restHtml: string;
} {
  const match = /<\/p>/i.exec(html);
  if (!match) {
    return { leadHtml: html, restHtml: "" };
  }
  const splitAt = match.index + match[0].length;
  return {
    leadHtml: html.slice(0, splitAt),
    restHtml: html.slice(splitAt),
  };
}

function resolveDisclosure(post: Post) {
  const kind = post.aiDisclosure ?? "none";
  // Art. 50(4): human review + editorial responsibility → no mandatory text label
  if (kind === "generated" && post.editorialReview) {
    return "assisted" as const;
  }
  if (kind === "none" || kind === "assisted") {
    return kind === "assisted" ? ("assisted" as const) : null;
  }
  return kind;
}

const proseClasses = cn(
  "max-w-none text-base leading-7 text-foreground sm:text-[17px] sm:leading-8",
  "[&>p]:my-5 sm:[&>p]:my-6",
  "[&>h2]:mt-10 [&>h2]:mb-3 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-foreground",
  "[&>h3]:mt-8 [&>h3]:mb-2 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:tracking-tight [&>h3]:text-foreground",
  "[&>h4]:mt-6 [&>h4]:mb-2 [&>h4]:text-lg [&>h4]:font-bold [&>h4]:tracking-tight [&>h4]:text-foreground",
  "[&>ul]:my-5 [&>ul]:pl-6 [&>ul]:list-disc [&>ul>li]:my-2",
  "[&>ol]:my-5 [&>ol]:pl-6 [&>ol]:list-decimal [&>ol>li]:my-2",
  "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-border [&>blockquote]:pl-4 [&>blockquote]:text-muted-foreground",
  "[&>a]:text-brand [&>a]:underline [&>a]:underline-offset-4 hover:[&>a]:text-brand-dark",
  "[&>code]:rounded [&>code]:bg-secondary [&>code]:px-1 [&>code]:py-0.5 [&>code]:text-[0.9em]",
  "[&>pre]:my-6 [&>pre]:overflow-x-auto [&>pre]:rounded-xl [&>pre]:bg-secondary [&>pre]:p-4",
  "[&>img]:my-6 [&>img]:rounded-xl [&>img]:shadow-sm",
  "[&>p:first-child]:mt-0"
);

export function BlogLayout({ post, className }: BlogLayoutProps) {
  const { leadHtml, restHtml } = splitAfterFirstParagraph(post.contentHtml);
  const disclosure = resolveDisclosure(post);
  // Deepfake / synthetic media: label on first exposure when image may look authentic
  const imageIsSynthetic =
    Boolean(post.image) &&
    (post.aiDisclosure === "modified" ||
      post.aiDisclosure === "generated" ||
      post.aiDisclosure === "assisted");

  return (
    <article
      className={cn(
        "mx-auto max-w-2xl px-4 pt-8 pb-12 sm:pt-10 sm:pb-14",
        className
      )}
      data-ai-disclosure={disclosure ?? "none"}
    >
      <header className="mb-6">
        <h1 className="mb-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        {post.description ? (
          <p className="mb-2 text-base text-muted-foreground sm:text-lg">
            {post.description}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {post.date ? <time dateTime={post.date}>{post.date}</time> : null}
          {post.author ? <span>{post.author}</span> : null}
        </div>
      </header>

      {disclosure === "generated" || disclosure === "modified" ? (
        <AiContentLabel kind={disclosure} />
      ) : null}
      {disclosure === "assisted" ? (
        <AiContentLabel kind="assisted" className="opacity-90" />
      ) : null}

      {leadHtml ? (
        <div
          className={proseClasses}
          dangerouslySetInnerHTML={{ __html: leadHtml }}
        />
      ) : null}

      {post.image ? (
        <figure className="my-8">
          <div className="relative">
            <img
              src={post.image}
              alt={post.imageAlt ?? post.title}
              className="aspect-[16/9] w-full max-h-[420px] rounded-xl object-cover shadow-sm"
            />
            {imageIsSynthetic ? (
              <div className="absolute bottom-3 left-3">
                <AiContentLabel kind="modified" variant="badge" showPolicyLink={false} />
              </div>
            ) : null}
          </div>
        </figure>
      ) : null}

      {restHtml ? (
        <div
          className={proseClasses}
          dangerouslySetInnerHTML={{ __html: restHtml }}
        />
      ) : null}
    </article>
  );
}
