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
  return (
    <section
      className={cn(
        "py-20 border-y border-slate-800 bg-gradient-to-r from-sky-950/40 via-slate-900 to-sky-950/40",
        className
      )}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          {heading}
        </h2>

        {subheading ? (
          <p className="text-lg text-slate-300">{subheading}</p>
        ) : null}

        <Button
          asChild
          size="lg"
          className="bg-sky-400 text-slate-950 font-bold hover:bg-sky-300 px-10"
        >
          <a href={ctaHref}>{ctaLabel}</a>
        </Button>
      </div>
    </section>
  );
}
