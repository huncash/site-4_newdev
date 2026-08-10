"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { PriceBadge } from "@/components/PriceBadge";
import {
  getCategory,
  type Product,
} from "@/data/catalog";
import { addItem, useCartStore } from "@/lib/cart-store";
import {
  getLightingRecommendation,
  tarpFitLabel,
  tarpFitTone,
} from "@/lib/lighting-recommendation";

type GalleryImage = { src: string; alt: string; caption?: string };

function buildGallery(product: Product): GalleryImage[] {
  const out: GalleryImage[] = [];
  if (product.coverImage) {
    out.push({
      src: product.coverImage,
      alt: product.coverImageAlt || product.name,
    });
  }
  if (product.uvActiveImage) {
    out.push({
      src: product.uvActiveImage,
      alt: product.uvActiveImageAlt || `${product.name} — UV megvilágítás alatt`,
      caption: "365 nm UV-A alatt",
    });
  }
  if (product.gallery) {
    for (const g of product.gallery) {
      if (out.some((x) => x.src === g.src)) continue;
      out.push(g);
    }
  }
  return out;
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const isRental = product.offerType === "rental";
  const rec = getLightingRecommendation(product);
  const gallery = buildGallery(product);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = gallery[activeIdx];
  const isUvShot = active?.caption === "365 nm UV-A alatt";

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <nav className="text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Főoldal
        </Link>
        <span className="mx-2">/</span>
        <Link href="/termekek" className="hover:text-foreground">
          Katalógus
        </Link>
        {category ? (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/termekek?cat=${encodeURIComponent(category.slug)}`}
              className="hover:text-foreground"
            >
              {category.shortName}
            </Link>
          </>
        ) : null}
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <figure className="m-0">
          {active ? (
            <>
              <div
                className={`flex aspect-square items-center justify-center overflow-hidden rounded border border-border ${
                  isUvShot ? "bg-black/90" : "bg-muted/40"
                }`}
              >
                <img
                  src={active.src}
                  alt={active.alt}
                  loading="eager"
                  decoding="async"
                  sizes="(min-width: 1024px) 640px, 100vw"
                  className="h-full w-full object-contain"
                />
              </div>
              {active.caption ? (
                <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
                  {active.caption}
                </div>
              ) : null}
              {gallery.length > 1 ? (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {gallery.map((g, i) => {
                    const isActive = i === activeIdx;
                    const thumbUv = g.caption === "365 nm UV-A alatt";
                    return (
                      <button
                        key={g.src}
                        type="button"
                        onClick={() => setActiveIdx(i)}
                        aria-label={`Kép ${i + 1} / ${gallery.length}`}
                        aria-pressed={isActive}
                        className={`flex aspect-square items-center justify-center overflow-hidden rounded border transition ${
                          thumbUv ? "bg-black/90" : "bg-muted/40"
                        } ${
                          isActive
                            ? "border-brand ring-1 ring-brand"
                            : "border-border hover:border-brand/60"
                        }`}
                      >
                        <img
                          src={g.src}
                          alt={g.alt}
                          loading="lazy"
                          decoding="async"
                          sizes="96px"
                          className="h-full w-full object-contain"
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded border border-border bg-muted/40 text-sm text-muted-foreground">
              {isRental ? "Dekor ponyva — illusztráció" : "Tartozék — illusztráció"}
            </div>
          )}
          <figcaption className="mt-2 text-[11px] italic leading-snug text-muted-foreground">
            A termékképek kizárólag illusztrációk — a gyártó (Steinigke / EUROLITE)
            katalógusából átvéve. A tényleges méret, minta és kivitel az
            adatlap és az ajánlat szerint értendő.
          </figcaption>
        </figure>

        <div>
          {category ? (
            <div className="text-xs font-medium tracking-[0.25em] text-brand">
              {category.tagline}
            </div>
          ) : null}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            {product.name}
          </h1>
          <div className="mt-2 text-sm text-muted-foreground">
            <span className="font-mono">Cikkszám: {product.sku}</span> ·{" "}
            {product.primaryAttribute} · {product.secondaryAttribute}
          </div>
          <p className="mt-4 text-foreground">{product.shortDescription}</p>

          {product.featuredPrice ? (
            <div className="mt-5">
              <PriceBadge product={product} variant="detail" />
            </div>
          ) : (
            <div className="mt-5 rounded-md border border-border bg-muted/40 p-4">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                Bérlés
              </div>
              <div className="mt-1 text-lg font-semibold text-foreground">
                Egyedi árajánlat időpontfoglalással
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A bérleti díj a rendezvény dátumától, helyszínétől, a kifeszítendő
                felülettől és a telepítési feltételektől függ. Új ügyfeleknek
                Számlázz.hu díjbekérővel, banki jóváírás után igazoljuk vissza.
              </p>
            </div>
          )}

          <ProductActions product={product} isRental={isRental} />
        </div>
      </div>

      <section className="mt-12 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Műszaki adatok</h2>
          <dl className="mt-4 border-t border-border">
            {Object.entries(product.specs).map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[180px_1fr] gap-4 border-b border-border py-3 text-sm"
              >
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="text-foreground">{String(v)}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight">
            Tipikus alkalmazás
          </h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {product.useCases.map((u) => (
              <li
                key={u}
                className="rounded border border-border bg-muted/30 px-3 py-2"
              >
                {u}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          Fluoreszkáló dekor ponyvához és egyéb rendezvény világítási feladatokhoz
        </h2>
        <div
          className={`mt-4 rounded-md border p-4 ${tarpFitTone(rec.tarpFit)}`}
        >
          <div className="text-[11px] uppercase tracking-wider opacity-80">
            Ajánlás fluoreszkáló (UV-aktív) dekor ponyva alá
          </div>
          <div className="mt-1 text-base font-semibold">
            {tarpFitLabel(rec.tarpFit)}
          </div>
          <p className="mt-2 text-sm leading-relaxed">{rec.tarpFitNote}</p>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-foreground">
              Milyen feladatra javasoljuk
            </h3>
            <ul className="mt-3 grid gap-2 text-sm">
              {rec.bestFor.map((b) => (
                <li
                  key={b}
                  className="rounded border border-border bg-muted/30 px-3 py-2"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {rec.notFor && rec.notFor.length > 0 ? (
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                Mire nem ideális
              </h3>
              <ul className="mt-3 grid gap-2 text-sm">
                {rec.notFor.map((n) => (
                  <li
                    key={n}
                    className="rounded border border-dashed border-border px-3 py-2 text-muted-foreground"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        {!isRental ? (
          <p className="mt-6 text-xs italic leading-relaxed text-muted-foreground">
            Az ajánlás a tétel műszaki adatlapja (teljesítmény, hullámhossz,
            vezérlés, IP védettség) alapján készül és tájékoztató jellegű.
          </p>
        ) : null}
      </section>
    </div>
  );
}

function ProductActions({
  product,
  isRental,
}: {
  product: Product;
  isRental: boolean;
}) {
  const items = useCartStore();
  const inCart = items.some((x) => x.slug === product.slug);
  const [justAdded, setJustAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const hasPrice = !!product.featuredPrice;

  useEffect(() => {
    if (!justAdded) return;
    const t = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(t);
  }, [justAdded]);

  const clampQty = (n: number) => {
    if (!Number.isFinite(n)) return 1;
    const i = Math.floor(n);
    if (i < 1) return 1;
    if (i > 99) return 99;
    return i;
  };

  const handleAdd = () => {
    if (isRental) return;
    addItem(
      { slug: product.slug, name: product.name, sku: product.sku },
      hasPrice ? qty : 1
    );
    setJustAdded(true);
  };

  if (isRental) {
    return (
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/kapcsolat?termek=${encodeURIComponent(product.slug)}`}
          className="rounded bg-brand px-5 py-2.5 font-medium text-brand-foreground hover:bg-brand-dark"
        >
          Időpontot foglalok / ajánlatot kérek
        </Link>
        <Link
          href="/termekek"
          className="rounded border border-border px-5 py-2.5 font-medium text-foreground hover:border-brand"
        >
          Vissza a katalógushoz
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div className="inline-flex items-stretch overflow-hidden rounded border border-border">
        <button
          type="button"
          aria-label="Mennyiség csökkentése"
          onClick={() => setQty((q) => clampQty(q - 1))}
          className="px-3 text-foreground hover:bg-muted disabled:opacity-40"
          disabled={qty <= 1}
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={99}
          step={1}
          value={qty}
          onChange={(e) => {
            const v = e.target.value;
            if (v === "") {
              setQty(1);
              return;
            }
            setQty(clampQty(parseInt(v, 10)));
          }}
          onBlur={(e) => setQty(clampQty(parseInt(e.target.value, 10) || 1))}
          className="w-14 border-x border-border bg-background py-2 text-center text-foreground outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          aria-label="Mennyiség"
        />
        <button
          type="button"
          aria-label="Mennyiség növelése"
          onClick={() => setQty((q) => clampQty(q + 1))}
          className="px-3 text-foreground hover:bg-muted disabled:opacity-40"
          disabled={qty >= 99}
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className={`inline-flex items-center gap-2 rounded border px-5 py-2.5 font-medium transition ${
          justAdded
            ? "border-brand bg-brand text-brand-foreground"
            : inCart
              ? "border-brand bg-brand/10 text-brand hover:bg-brand hover:text-brand-foreground"
              : "border-border text-foreground hover:border-brand hover:bg-brand hover:text-brand-foreground"
        }`}
      >
        {justAdded ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <PlusIcon className="h-4 w-4" />
        )}
        {justAdded
          ? "Hozzáadva"
          : inCart
            ? "Még egy darab a kosárba"
            : "Kosárba teszem"}
      </button>
      <Link
        href="/kosar"
        className="rounded border border-border px-5 py-2.5 font-medium text-foreground hover:border-brand"
      >
        Kosár megtekintése
      </Link>
    </div>
  );
}
