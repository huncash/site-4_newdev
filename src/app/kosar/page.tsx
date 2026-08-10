"use client";

import Link from "next/link";
import { useMemo } from "react";

import { getProduct } from "@/data/catalog";
import {
  clearCart,
  removeItem,
  setQty,
  useCartCount,
  useCartStore,
} from "@/lib/cart-store";

const VAT_RATE = 0.27;

function formatHuf(value: number): string {
  return `${value.toLocaleString("hu-HU").replace(/\u00A0/g, "\u202F")}\u202FFt`;
}

function unitNetFor(slug: string): number | null {
  const product = getProduct(slug);
  if (!product || product.offerType === "rental") return null;
  const fp = product.featuredPrice;
  if (!fp) return null;
  const sp = product.salePrice;
  if (sp && sp.netHuf > 0 && sp.netHuf < fp.netHuf) return sp.netHuf;
  return fp.netHuf;
}

export default function KosarPage() {
  const items = useCartStore();
  const count = useCartCount();

  const priced = useMemo(
    () =>
      items.map((it) => {
        const unitNet = unitNetFor(it.slug);
        const lineNet = unitNet != null ? unitNet * it.qty : null;
        return { it, unitNet, lineNet };
      }),
    [items]
  );

  const saleLines = priced.filter((r) => r.unitNet != null);
  const netTotal = saleLines.reduce((s, r) => s + (r.lineNet ?? 0), 0);
  const vatTotal = Math.round(netTotal * VAT_RATE);
  const grossTotal = netTotal + vatTotal;
  const hasRental = priced.some((r) => r.unitNet == null);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-xs font-medium tracking-[0.25em] text-brand">KOSÁR</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Kosár</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        A fix áras UV tartozékok és rendezvény kellékek webshop rendelése itt
        véglegesíthető. A bérelhető dekor ponyvákhoz továbbra is egyedi
        ajánlatkérés kell.
      </p>

      {items.length === 0 ? (
        <div className="mt-8 rounded-md border border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          A kosár jelenleg üres.
          <div className="mt-5">
            <Link
              href="/termekek"
              className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2 text-sm font-medium text-brand-foreground hover:bg-brand-dark"
            >
              Vissza a katalógushoz
            </Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-border rounded-md border border-border">
            {priced.map(({ it, unitNet, lineNet }) => (
              <li
                key={it.slug}
                className="flex flex-wrap items-center gap-3 px-4 py-3"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/termekek/${it.slug}`}
                    className="text-sm font-medium text-foreground hover:text-brand"
                  >
                    {it.name}
                  </Link>
                  <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                    Cikkszám: {it.sku}
                  </div>
                </div>

                <div className="inline-flex items-center rounded-md border border-border">
                  <button
                    type="button"
                    onClick={() => setQty(it.slug, it.qty - 1)}
                    aria-label="Csökkentés"
                    className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={it.qty}
                    onChange={(e) => setQty(it.slug, Number(e.target.value))}
                    aria-label={`${it.name} darabszám`}
                    className="h-8 w-12 border-x border-border bg-background text-center text-sm focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQty(it.slug, it.qty + 1)}
                    aria-label="Növelés"
                    className="inline-flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                  >
                    +
                  </button>
                </div>

                <div className="min-w-[9rem] text-right text-sm tabular-nums">
                  {unitNet != null ? (
                    <>
                      <div className="text-foreground">
                        Nettó: {formatHuf(unitNet)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Összesen:{" "}
                        <span className="font-medium text-foreground">
                          {formatHuf(lineNet!)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <span className="text-xs italic text-muted-foreground">
                      Egyedi árajánlat (bérlés)
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(it.slug)}
                  aria-label={`${it.name} eltávolítása`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="text-muted-foreground">
              Összesen <span className="font-medium text-foreground">{count}</span>{" "}
              darab,{" "}
              <span className="font-medium text-foreground">{items.length}</span>{" "}
              tétel.
            </div>
            <div className="text-right tabular-nums">
              Webshop nettó:{" "}
              <span className="font-semibold text-foreground">
                {formatHuf(netTotal)}
              </span>
            </div>
          </div>
          <div className="mt-1 text-right text-sm tabular-nums text-muted-foreground">
            27% ÁFA:{" "}
            <span className="font-medium text-foreground">{formatHuf(vatTotal)}</span>
          </div>
          <div className="mt-1 text-right text-sm tabular-nums">
            Bruttó:{" "}
            <span className="font-semibold text-foreground">
              {formatHuf(grossTotal)}
            </span>
          </div>

          {hasRental ? (
            <p className="mt-4 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-foreground/90">
              A kosárban van bérelhető ponyva is — ezekhez külön ajánlatkérés kell a{" "}
              <Link href="/kapcsolat" className="underline">
                Kapcsolat
              </Link>{" "}
              oldalon. A megrendelés gomb csak a fix áras tételekre vonatkozik.
            </p>
          ) : null}

          <div className="mt-4 text-right">
            <button
              type="button"
              onClick={() => clearCart()}
              className="text-xs text-muted-foreground underline-offset-4 hover:text-destructive hover:underline"
            >
              Kosár ürítése
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {saleLines.length > 0 ? (
              <Link
                href="/megrendeles"
                className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark"
              >
                Megrendelés véglegesítése
              </Link>
            ) : null}
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/40"
            >
              Ajánlatkérés ponyva bérlésre
            </Link>
            <Link
              href="/termekek"
              className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted/40"
            >
              Tovább a katalógusba
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
