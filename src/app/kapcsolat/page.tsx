"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState, type FormEvent } from "react";

import { getProduct } from "@/data/catalog";
import {
  cartToMessageBlock,
  clearCart,
  useCartStore,
} from "@/lib/cart-store";
import { SITE_CONFIG } from "@/config/site-config";

const inputCls =
  "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";

function ContactForm() {
  const searchParams = useSearchParams();
  const termekSlug = searchParams.get("termek") ?? "";
  const product = termekSlug ? getProduct(termekSlug) : undefined;
  const cart = useCartStore();
  const cartBlock = useMemo(() => cartToMessageBlock(cart), [cart]);

  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [website, setWebsite] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (website.trim()) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => String(fd.get(k) || "").trim();

    const parts = [
      get("message"),
      product
        ? `\nÉrdeklődés termék iránt: ${product.name} (${product.sku})`
        : "",
      cartBlock ? `\nKosár / kiválasztott tételek:\n${cartBlock}` : "",
      `\nRendezvény dátuma: ${get("event_date") || "—"}`,
      `Helyszín: ${get("location_city") || "—"} / ${get("location_venue") || "—"}`,
      `Számlázás: ${get("billing_name")} · adószám: ${get("billing_tax_id")}`,
      `Cím: ${get("billing_address")}`,
    ];

    const payload = {
      name: get("name"),
      email: get("email"),
      phone: get("phone"),
      message: parts.filter(Boolean).join("\n"),
      type: "quote",
      cart: cart.map((c) => ({
        slug: c.slug,
        name: c.name,
        sku: c.sku,
        qty: c.qty,
      })),
    };

    if (!payload.name || !payload.email || !get("message")) {
      setError("Kérjük, töltse ki a kötelező mezőket (név, e-mail, üzenet).");
      return;
    }
    if (!get("billing_name") || !get("billing_tax_id") || !get("billing_address")) {
      setError("A számlázási adatok megadása kötelező.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("fail");
      setDone(true);
      clearCart();
      form.reset();
    } catch {
      setError("Sajnos a beküldés most nem sikerült. Próbáld újra később.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <h2 className="text-xl font-semibold">Köszönjük az üzenetet!</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          1 munkanapon belül visszajelzünk.
        </p>
        <Link href="/" className="mt-6 inline-block text-brand hover:underline">
          Vissza a főoldalra
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-border bg-card p-6 shadow-sm">
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {product ? (
        <p className="rounded-md border border-brand/30 bg-brand/5 px-3 py-2 text-xs text-foreground">
          Érdeklődés: <strong>{product.name}</strong> ({product.sku}) — bérlés /
          időpontfoglalás
        </p>
      ) : null}

      {cart.length > 0 ? (
        <p className="rounded-md border border-border bg-muted/40 px-3 py-2 text-xs text-muted-foreground whitespace-pre-wrap">
          Kosár tételei az üzenethez csatolva ({cart.length} tétel).
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs sm:col-span-2">
          Név / kapcsolattartó *
          <input name="name" required className={inputCls} />
        </label>
        <label className="block text-xs">
          E-mail *
          <input name="email" type="email" required className={inputCls} />
        </label>
        <label className="block text-xs">
          Telefon
          <input name="phone" type="tel" className={inputCls} />
        </label>
        <label className="block text-xs">
          Rendezvény dátuma
          <input name="event_date" type="date" className={inputCls} />
        </label>
        <label className="block text-xs">
          Város
          <input name="location_city" className={inputCls} />
        </label>
        <label className="block text-xs sm:col-span-2">
          Helyszín / helyszín neve
          <input name="location_venue" className={inputCls} />
        </label>
        <label className="block text-xs sm:col-span-2">
          Üzenet / igények *
          <textarea name="message" required rows={5} className={inputCls} />
        </label>
        <label className="block text-xs sm:col-span-2">
          Számlázási név / cégnév *
          <input name="billing_name" required className={inputCls} />
        </label>
        <label className="block text-xs">
          Adószám *
          <input name="billing_tax_id" required className={inputCls} />
        </label>
        <label className="block text-xs">
          Számlázási cím *
          <input name="billing_address" required className={inputCls} />
        </label>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-brand-foreground hover:bg-brand-dark disabled:opacity-60"
      >
        {submitting ? "Küldés…" : "Ajánlatkérés elküldése"}
      </button>
    </form>
  );
}

export default function KapcsolatPage() {
  return (
    <>
      <section className="bg-section-dark py-16 text-section-dark-foreground">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <h1 className="text-3xl font-bold md:text-5xl">
            Ajánlatkérés és kapcsolatfelvétel
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Írja meg a helyszínt, a dátumot és a tematikai irányt — 1 munkanapon
            belül visszajelzünk. Fix áras UV tartozékokhoz használd a{" "}
            <Link href="/kosar" className="underline">
              kosarat
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-xl font-semibold">Hogyan dolgozunk</h2>
            <p className="mt-2 text-sm text-foreground/85">
              Az űrlap a ponyva bérléshez és egyedi gyártáshoz szükséges
              információkat gyűjti. A webshop tételeket a kosár → megrendelés
              útvonalon küldheted.
            </p>
            <h2 className="mt-8 text-xl font-semibold">Elérhetőség</h2>
            <a
              href={`mailto:${SITE_CONFIG.publicEmail}`}
              className="mt-2 inline-block text-brand hover:underline"
            >
              {SITE_CONFIG.publicEmail}
            </a>
          </div>
          <Suspense fallback={<p className="text-muted-foreground">Űrlap betöltése…</p>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
