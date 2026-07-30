"use client";

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

export function Catalog({ products, basePath = "/product", className }: CatalogProps) {
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

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
        <input
          type="search"
          value={q}
          onChange={(e) => setParam("q", e.target.value)}
          placeholder="Keresés..."
          className="h-9 flex-1 min-w-[160px] rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        />

        {categories.length > 0 ? (
          <select
            value={cat}
            onChange={(e) => setParam("cat", e.target.value)}
            className="h-9 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          >
            <option value="">Összes kategória</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        ) : null}

        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="h-9 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        <span className="ml-auto text-xs text-slate-400">
          {result.length} termék
        </span>
      </div>

      {result.length === 0 ? (
        <p className="text-sm text-slate-400">Nincs találat.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((product) => (
            <a key={product.id} href={`${basePath}/${product.id}`} className="block">
              <ProductCard
                title={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                description={product.description}
                badge={product.badge}
                editable={product.editable}
              />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
