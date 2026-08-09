"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";
import { cn } from "@/lib/utils";

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Név (A–Z)" },
  { value: "name-desc", label: "Név (Z–A)" },
  { value: "price-asc", label: "Ár (növekvő)" },
  { value: "price-desc", label: "Ár (csökkenő)" },
];

function applySort(products: Product[], sort: SortKey): Product[] {
  const copy = [...products];
  switch (sort) {
    case "name-asc":  return copy.sort((a, b) => a.name.localeCompare(b.name, "hu"));
    case "name-desc": return copy.sort((a, b) => b.name.localeCompare(a.name, "hu"));
    case "price-asc": return copy.sort((a, b) => a.price - b.price);
    case "price-desc":return copy.sort((a, b) => b.price - a.price);
  }
}

function applyFilters(products: Product[], q: string, cat: string): Product[] {
  let result = products;

  if (cat) {
    result = result.filter((p) => p.category === cat);
  }

  if (q) {
    const lq = q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lq) ||
        (p.description ?? "").toLowerCase().includes(lq)
    );
  }

  return result;
}

export interface CatalogProps {
  products: Product[];
  basePath?: string;
  className?: string;
}

export function Catalog({ products, basePath = "/termekek", className }: CatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q    = searchParams.get("q") ?? "";
  const cat  = searchParams.get("cat") ?? "";
  const sort = (searchParams.get("sort") ?? "name-asc") as SortKey;

  const setParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean) as string[])
  ).sort();

  const result = applySort(applyFilters(products, q, cat), sort);

  const listPath = basePath;

  const catalogHref = (() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (sort && sort !== "name-asc") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `${listPath}?${qs}` : listPath;
  })();

  const categoryFilterHref = (category: string) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (category) params.set("cat", category);
    if (sort && sort !== "name-asc") params.set("sort", sort);
    const qs = params.toString();
    return qs ? `${listPath}?${qs}` : listPath;
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card p-2.5 shadow-sm">
        <input
          type="search"
          value={q}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Keresés..."
          aria-label="Keresés termékek között"
          className="h-8 flex-1 min-w-[160px] rounded-md border border-border bg-background px-2.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        />

        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          aria-label="Rendezés"
          className="h-8 rounded-md border border-border bg-background px-2.5 text-xs text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span className="ml-auto text-[11px] tabular-nums text-muted-foreground">
          {result.length} termék
        </span>
      </div>

      {categories.length > 0 ? (
        <div
          className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="navigation"
          aria-label="Kategóriák"
        >
          <Link
            href={catalogHref}
            className={cn(
              "shrink-0 rounded-md border px-2 py-1 text-xs transition-colors",
              !cat
                ? "border-brand bg-brand/10 text-brand"
                : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
            )}
          >
            Összes
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={categoryFilterHref(c)}
              className={cn(
                "shrink-0 rounded-md border px-2 py-1 text-xs transition-colors",
                cat === c
                  ? "border-brand bg-brand/10 text-brand"
                  : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground"
              )}
            >
              {c}
            </Link>
          ))}
        </div>
      ) : null}

      {result.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nincs találat.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {result.map((product) => (
            <Link
              key={product.id}
              href={`${basePath}/${product.id}`}
              className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label={`${product.name} – részletek`}
            >
              <ProductCard
                title={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                badge={product.badge}
                editable={product.editable}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
