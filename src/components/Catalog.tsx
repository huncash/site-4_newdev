"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { ProductCard } from "@/components/ProductCard";
import { categories, type Product } from "@/data/catalog";
import { cn } from "@/lib/utils";

type SortKey = "name-asc" | "name-desc" | "price-asc" | "price-desc";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "name-asc", label: "Név (A–Z)" },
  { value: "name-desc", label: "Név (Z–A)" },
  { value: "price-asc", label: "Ár (növekvő)" },
  { value: "price-desc", label: "Ár (csökkenő)" },
];

function isSortKey(v: string | null): v is SortKey {
  return (
    v === "name-asc" ||
    v === "name-desc" ||
    v === "price-asc" ||
    v === "price-desc"
  );
}

export interface CatalogProps {
  products: Product[];
  className?: string;
}

export function Catalog({ products, className }: CatalogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q") ?? "";
  const cat = searchParams.get("cat") ?? "";
  const sort = isSortKey(searchParams.get("sort"))
    ? searchParams.get("sort")!
    : "name-asc";

  const setSearch = useCallback(
    (patch: Partial<{ q: string; cat: string; sort: SortKey }>) => {
      const next = new URLSearchParams(searchParams.toString());
      const merged = {
        q: patch.q ?? q,
        cat: patch.cat ?? cat,
        sort: patch.sort ?? sort,
      };
      if (merged.q) next.set("q", merged.q);
      else next.delete("q");
      if (merged.cat) next.set("cat", merged.cat);
      else next.delete("cat");
      if (merged.sort && merged.sort !== "name-asc") next.set("sort", merged.sort);
      else next.delete("sort");
      const qs = next.toString();
      router.replace(qs ? `/termekek?${qs}` : "/termekek", { scroll: false });
    },
    [searchParams, router, q, cat, sort]
  );

  const filtered = products.filter((p) => {
    if (cat && p.categorySlug !== cat) return false;
    if (q) {
      const n = q.toLowerCase();
      return (
        p.name.toLowerCase().includes(n) ||
        p.sku.toLowerCase().includes(n) ||
        p.shortDescription.toLowerCase().includes(n) ||
        p.primaryAttribute.toLowerCase().includes(n)
      );
    }
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "name-asc") return a.name.localeCompare(b.name, "hu");
    if (sort === "name-desc") return b.name.localeCompare(a.name, "hu");
    const pa = a.featuredPrice?.netHuf;
    const pb = b.featuredPrice?.netHuf;
    if (pa == null && pb == null) return a.name.localeCompare(b.name, "hu");
    if (pa == null) return 1;
    if (pb == null) return -1;
    return sort === "price-asc" ? pa - pb : pb - pa;
  });

  return (
    <div className={cn("mx-auto max-w-7xl px-4 pb-6 pt-4 sm:pb-8 sm:pt-6", className)}>
      <div className="mb-4">
        <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          Termékkatalógus
        </h1>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          Bérelhető dekorfelületek (egyedi ajánlat) és megvásárolható UV kellékek
          fix áron, készletről.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 rounded-lg border border-border bg-card p-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="min-w-[12rem] flex-1 text-xs">
          <span className="mb-1 block font-medium uppercase tracking-wider text-muted-foreground">
            Keresés
          </span>
          <input
            value={q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="Cikkszám, név…"
            className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium uppercase tracking-wider text-muted-foreground">
            Kategória
          </span>
          <select
            value={cat}
            onChange={(e) => setSearch({ cat: e.target.value })}
            className="h-9 rounded-md border border-border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option value="">Összes</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.shortName}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs">
          <span className="mb-1 block font-medium uppercase tracking-wider text-muted-foreground">
            Rendezés
          </span>
          <select
            value={sort}
            onChange={(e) => setSearch({ sort: e.target.value as SortKey })}
            className="h-9 rounded-md border border-border bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        {q || cat || sort !== "name-asc" ? (
          <Link
            href="/termekek"
            className="h-9 self-end text-xs font-medium text-brand hover:underline sm:pb-2"
          >
            Szűrők törlése
          </Link>
        ) : null}
      </div>

      <p className="mb-3 text-xs text-muted-foreground">{sorted.length} tétel</p>

      {sorted.length === 0 ? (
        <div className="rounded-lg border border-border p-10 text-center text-sm text-muted-foreground">
          Nincs találat.{" "}
          <Link href="/kapcsolat" className="text-brand hover:underline">
            Kérjen egyedi ajánlatot
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {sorted.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
