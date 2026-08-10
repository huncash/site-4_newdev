"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";

import { getPublicProduct } from "@/lib/catalog-public";
import { clearCart, useCartStore } from "@/lib/cart-store";

const VAT_RATE = 0.27;

function formatHuf(value: number): string {
  return `${value.toLocaleString("hu-HU").replace(/\u00A0/g, "\u202F")}\u202FFt`;
}

function unitNetFor(slug: string): number | null {
  const product = getPublicProduct(slug);
  if (!product || product.offerType === "rental") return null;
  const fp = product.featuredPrice;
  if (!fp) return null;
  const sp = product.salePrice;
  if (sp && sp.netHuf > 0 && sp.netHuf < fp.netHuf) return sp.netHuf;
  return fp.netHuf;
}

const inputCls =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

export default function MegrendelesPage() {
  const items = useCartStore();
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [company, setCompany] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [shippingSame, setShippingSame] = useState(true);
  const [shippingAddress, setShippingAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saleItems = useMemo(
    () =>
      items
        .map((it) => {
          const unitNet = unitNetFor(it.slug);
          const lineNet = unitNet != null ? unitNet * it.qty : null;
          return { it, unitNet, lineNet };
        })
        .filter((r) => r.unitNet != null),
    [items]
  );

  const netTotal = saleItems.reduce((s, r) => s + (r.lineNet ?? 0), 0);
  const vatTotal = Math.round(netTotal * VAT_RATE);
  const grossTotal = netTotal + vatTotal;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting || saleItems.length === 0) return;
    if (website.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      const lines = saleItems.map(
        ({ it, unitNet, lineNet }) =>
          `- ${it.qty} × ${it.name} (${it.sku}) — nettó ${formatHuf(unitNet!)} / sor ${formatHuf(lineNet!)}`
      );
      const message = [
        "WEBSHOP MEGRENDELÉS",
        "",
        ...lines,
        "",
        `Nettó: ${formatHuf(netTotal)}`,
        `ÁFA 27%: ${formatHuf(vatTotal)}`,
        `Bruttó: ${formatHuf(grossTotal)}`,
        "",
        `Számlázási cím: ${billingAddress}`,
        shippingSame
          ? "Szállítás: megegyezik a számlázási címmel"
          : `Szállítási cím: ${shippingAddress}`,
        company ? `Cég: ${company}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${lastName} ${firstName}`.trim(),
          email,
          phone,
          message,
          type: "order",
          cart: saleItems.map(({ it, unitNet, lineNet }) => ({
            slug: it.slug,
            name: it.name,
            sku: it.sku,
            qty: it.qty,
            unit_net_huf: unitNet,
            line_net_huf: lineNet,
          })),
          net_total_huf: netTotal,
          vat_total_huf: vatTotal,
          gross_total_huf: grossTotal,
          billing_address: billingAddress,
          shipping_address: shippingSame ? billingAddress : shippingAddress,
          company_name: company,
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      clearCart();
      setDone(true);
    } catch {
      setError(
        "A megrendelés elküldése nem sikerült. Próbáld újra, vagy írj nekünk e-mailt."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <div className="text-xs font-medium tracking-[0.25em] text-brand">
          MEGRENDELÉS ELKÜLDVE
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Köszönjük a megrendelésedet!
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Megrendelésedet megkaptuk. A megadott e-mail címre hamarosan
          visszaigazolunk a további lépésekről.
        </p>
        <Link
          href="/termekek"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark"
        >
          Vissza a katalógushoz
        </Link>
      </div>
    );
  }

  if (saleItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Nincs megrendelhető tétel
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A webshop megrendeléshez fix áras (eladó) tételek kellenek a kosárban.
          Bérelhető ponyvához használd az ajánlatkérőt.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/termekek?cat=tartozekok"
            className="inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground"
          >
            UV tartozékok
          </Link>
          <Link
            href="/kapcsolat"
            className="inline-flex rounded-md border border-border px-5 py-2.5 text-sm font-medium"
          >
            Ponyva ajánlatkérés
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="text-xs font-medium tracking-[0.25em] text-brand">
        MEGRENDELÉS
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        Megrendelés véglegesítése
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Fix áras katalógustételek webshop rendelése. Add meg a számlázási és
        szállítási adatokat.
      </p>

      <section className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Kosár tartalma
        </h2>
        <ul className="mt-3 divide-y divide-border rounded-md border border-border">
          {saleItems.map(({ it, unitNet, lineNet }) => (
            <li
              key={it.slug}
              className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm"
            >
              <div className="min-w-0 flex-1">
                <div className="font-medium">{it.name}</div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {it.sku} · {it.qty} db
                </div>
              </div>
              <div className="text-right tabular-nums">
                <div className="text-xs text-muted-foreground">
                  Egységár: {formatHuf(unitNet!)}
                </div>
                <div className="font-medium">{formatHuf(lineNet!)}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-3 space-y-1 text-right text-sm tabular-nums">
          <div>
            Nettó: <span className="font-medium">{formatHuf(netTotal)}</span>
          </div>
          <div>
            ÁFA: <span className="font-medium">{formatHuf(vatTotal)}</span>
          </div>
          <div className="text-base">
            Bruttó:{" "}
            <span className="font-semibold">{formatHuf(grossTotal)}</span>
          </div>
        </div>
      </section>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Megrendelő adatai
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className="block text-xs">
              <span className="mb-1 block text-muted-foreground">Vezetéknév *</span>
              <input
                required
                className={inputCls}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
              />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block text-muted-foreground">Keresztnév *</span>
              <input
                required
                className={inputCls}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
              />
            </label>
            <label className="block text-xs sm:col-span-2">
              <span className="mb-1 block text-muted-foreground">Cégnév</span>
              <input
                className={inputCls}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
              />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block text-muted-foreground">Telefon *</span>
              <input
                required
                type="tel"
                className={inputCls}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />
            </label>
            <label className="block text-xs">
              <span className="mb-1 block text-muted-foreground">E-mail *</span>
              <input
                required
                type="email"
                className={inputCls}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Számlázás és szállítás
          </h2>
          <div className="mt-3 space-y-4">
            <label className="block text-xs">
              <span className="mb-1 block text-muted-foreground">
                Számlázási cím *
              </span>
              <input
                required
                className={inputCls}
                value={billingAddress}
                onChange={(e) => setBillingAddress(e.target.value)}
                placeholder="pl. 1111 Budapest, Példa utca 1."
              />
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shippingSame}
                onChange={(e) => setShippingSame(e.target.checked)}
                className="h-4 w-4"
              />
              A szállítási cím megegyezik a számlázási címmel
            </label>
            {!shippingSame ? (
              <label className="block text-xs">
                <span className="mb-1 block text-muted-foreground">
                  Szállítási cím *
                </span>
                <input
                  required
                  className={inputCls}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                />
              </label>
            ) : null}
          </div>
        </section>

        {error ? (
          <div className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/kosar" className="text-sm text-muted-foreground hover:underline">
            ← Vissza a kosárhoz
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
          >
            {submitting ? "Küldés…" : "Megrendelés elküldése"}
          </button>
        </div>
      </form>
    </div>
  );
}
