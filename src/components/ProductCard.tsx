"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/data/catalog";
import { addItem, useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

function formatNetHuf(value: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(value);
}

function activeUnitPrice(product: Product): number | null {
  const fp = product.featuredPrice;
  if (!fp) return null;
  const sp = product.salePrice;
  if (sp && sp.netHuf > 0 && sp.netHuf < fp.netHuf) return sp.netHuf;
  return fp.netHuf;
}

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const isRental = product.offerType === "rental";
  const items = useCartStore();
  const inCart = items.some((x) => x.slug === product.slug);
  const [justAdded, setJustAdded] = useState(false);
  const unitNet = activeUnitPrice(product);
  const imageUrl = product.coverImage ?? "";
  const hasImage = Boolean(imageUrl) && !imageUrl.includes("feltoltes-alatt");

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isRental) return;
    addItem({ slug: product.slug, name: product.name, sku: product.sku });
    setJustAdded(true);
  };

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-lg shadow-sm transition-colors hover:border-brand/40",
        className
      )}
    >
      <Link href={`/termekek/${product.slug}`} className="block">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-secondary">
          {hasImage ? (
            <img
              src={imageUrl}
              alt={product.coverImageAlt ?? product.name}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-[10px] text-muted-foreground">
                {isRental ? "Dekor ponyva — bérlés" : "Feltöltés alatt"}
              </p>
            </div>
          )}
          <Badge
            className="absolute left-1.5 top-1.5 px-1.5 py-0 text-[10px]"
            variant="secondary"
          >
            {isRental ? "Bérlés" : "Készletről"}
          </Badge>
        </div>

        <CardHeader className="space-y-0.5 p-2 pb-1">
          <CardTitle className="line-clamp-2 text-xs font-semibold leading-snug text-card-foreground sm:text-sm">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-1 text-[11px] leading-snug text-muted-foreground">
            {product.primaryAttribute}
            {product.secondaryAttribute
              ? ` · ${product.secondaryAttribute}`
              : ""}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-2 pb-1.5 pt-0">
          {isRental || unitNet == null ? (
            <p className="text-sm font-semibold text-brand">Egyedi árajánlat</p>
          ) : (
            <p className="text-sm font-semibold text-brand">
              {formatNetHuf(unitNet)}
              <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                + ÁFA
              </span>
            </p>
          )}
        </CardContent>
      </Link>

      <CardFooter className="gap-1.5 p-2 pt-0">
        {isRental ? (
          <Button
            asChild
            size="sm"
            className="h-7 w-full bg-brand px-2 text-[11px] font-bold text-brand-foreground hover:bg-brand-dark"
          >
            <Link href={`/kapcsolat?termek=${encodeURIComponent(product.slug)}`}>
              Ajánlatot kérek
            </Link>
          </Button>
        ) : (
          <Button
            size="sm"
            type="button"
            onClick={handleAdd}
            className="h-7 w-full bg-brand px-2 text-[11px] font-bold text-brand-foreground hover:bg-brand-dark"
          >
            {justAdded ? "Hozzáadva" : inCart ? "Még egy a kosárba" : "Kosárba"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
