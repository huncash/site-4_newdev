"use client";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  title: string;
  price: number;
  currency?: string;
  imageUrl: string;
  imageAlt?: string;
  description?: string;
  badge?: string;
  actionLabel?: string;
  onAction?: () => void;
  editable?: boolean;
  onEdit?: () => void;
  className?: string;
}

export function ProductCard({
  title,
  price,
  currency = "HUF",
  imageUrl,
  imageAlt,
  description,
  badge,
  actionLabel,
  onAction,
  editable = false,
  onEdit,
  className,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);

  const showActions = Boolean(onAction || (editable && onEdit));

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg shadow-sm transition-colors hover:border-brand/40",
        className
      )}
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-secondary">
        {imageUrl && !imageUrl.includes("feltoltes-alatt") ? (
          <img
            src={imageUrl}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <p className="text-[10px] text-muted-foreground">Feltöltés alatt</p>
          </div>
        )}
        {badge ? (
          <Badge className="absolute left-1.5 top-1.5 px-1.5 py-0 text-[10px]" variant="secondary">
            {badge}
          </Badge>
        ) : null}
      </div>

      <CardHeader className="space-y-0.5 p-2 pb-1">
        <CardTitle className="line-clamp-2 text-xs font-semibold leading-snug text-card-foreground sm:text-sm">
          {title}
        </CardTitle>
        {description ? (
          <CardDescription className="line-clamp-1 text-[11px] leading-snug text-muted-foreground">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>

      <CardContent className="p-2 pb-1.5 pt-0">
        <p className="text-sm font-semibold text-brand">{formattedPrice}</p>
      </CardContent>

      {showActions ? (
        <CardFooter className="gap-1.5 p-2 pt-0">
          {onAction ? (
            <Button
              size="sm"
              className="h-7 w-full bg-brand px-2 text-[11px] font-bold text-brand-foreground hover:bg-brand-dark"
              onClick={onAction}
              type="button"
            >
              {actionLabel ?? "Kosárba"}
            </Button>
          ) : null}
          {editable ? (
            <Button size="sm" variant="outline" className="h-7 px-2 text-[11px]" onClick={onEdit} type="button">
              Szerkesztés
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
    </Card>
  );
}
