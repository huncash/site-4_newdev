"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imageUrl?: string;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  ctaLabel = "Termékek megtekintése",
  ctaHref = "/termekek",
  secondaryLabel,
  secondaryHref,
  imageUrl,
  className,
}: HeroSectionProps) {
  const showSecondary = Boolean(secondaryLabel && secondaryHref);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background border-b border-border",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
              {title}
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">{subtitle}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-brand text-brand-foreground font-bold hover:bg-brand-dark">
                <a href={ctaHref}>{ctaLabel}</a>
              </Button>
              {showSecondary ? (
                <Button asChild size="lg" variant="outline">
                  <a href={secondaryHref}>{secondaryLabel}</a>
                </Button>
              ) : null}
            </div>
          </div>

          {imageUrl ? (
            <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={imageUrl}
                alt={title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto flex aspect-[4/3] w-full max-w-md items-center justify-center rounded-2xl border border-border bg-secondary text-muted-foreground">
              <span className="text-sm">Kép nem elérhető</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
