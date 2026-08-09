"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface CtaSectionProps {
  heading: string;
  subheading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "default" | "dark";
  className?: string;
}

export function CtaSection({
  heading,
  subheading,
  ctaLabel = "Megnézem a kínálatot",
  ctaHref = "/termekek",
  variant = "default",
  className,
}: CtaSectionProps) {
  const isDark = variant === "dark";
  return (
    <section
      className={cn(
        isDark
          ? "py-20 border-y border-section-dark-foreground/15 bg-section-dark text-section-dark-foreground"
          : "py-20 border-y border-border bg-secondary text-foreground",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2 className={cn("text-3xl font-extrabold tracking-tight md:text-4xl", isDark ? "text-section-dark-foreground" : "text-foreground")}>
          {heading}
        </h2>

        {subheading ? (
          <p className={cn("text-lg", isDark ? "text-section-dark-foreground/85" : "text-muted-foreground")}>
            {subheading}
          </p>
        ) : null}

        <Button
          asChild
          size="lg"
          className="bg-brand text-brand-foreground font-bold hover:bg-brand-dark px-10"
        >
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
    </section>
  );
}
