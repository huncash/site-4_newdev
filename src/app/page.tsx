import { Suspense } from "react";

import { authProvider } from "@/auth/auth-provider";
import { getProducts } from "@/lib/data-provider";
import { Catalog } from "@/components/Catalog";
import { CtaSection } from "@/components/landing/CtaSection";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { HeroSection } from "@/components/landing/HeroSection";
import { CONTENT } from "../data/content";

function formatHuf(amount: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function HomePage() {
  const products = getProducts().map((p) => ({
    ...p,
    editable: authProvider.isAdmin(),
  }));

  const {
    hero,
    gallery,
    services,
    useCases,
    categories,
    rentalItems,
    saleItems,
    process,
    info,
    cta,
    catalog,
  } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        secondaryLabel={hero.ctaSecondary.label}
        secondaryHref={hero.ctaSecondary.href}
        imageUrl={hero.image}
      />

      <section className="bg-slate-950 py-12 sm:py-16 border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {gallery.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-md border border-slate-800 bg-slate-900 shadow-sm">
              <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-400">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FeatureGrid heading={services.heading} features={services.items} />

      <section className="bg-slate-900 py-12 text-slate-100 sm:py-16 border-y border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-sky-400">{useCases.heading}</h2>
          <FeatureGrid
            heading=""
            features={useCases.items}
            className="bg-transparent py-8"
          />
          <img
            src={useCases.image}
            alt="Belvárosi sétálóutca fölött telepített dekorponyva UV-fényben"
            className="mt-8 max-w-md rounded-md border border-slate-800 object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-950 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-white">{categories.heading}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {categories.items.map((cat) => (
              <article key={cat.slug} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">{cat.tagline}</p>
                <h3 className="mt-2 font-semibold text-white">{cat.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{cat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-14 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-white">{rentalItems.heading}</h2>
          <p className="mt-2 text-sm text-slate-400">{rentalItems.disclaimer}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rentalItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-slate-800 bg-slate-900 p-5">
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{item.priceNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-900 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-white">{saleItems.heading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saleItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-slate-800 bg-slate-950 p-5">
                <h3 className="font-semibold text-white">{item.name}</h3>
                {item.priceNetHuf ? (
                  <p className="mt-2 text-lg font-bold text-sky-400">{formatHuf(item.priceNetHuf)}</p>
                ) : null}
                <p className="text-xs text-slate-500">nettó / db · áfás számla</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 sm:py-16 border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-white">{process.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s) => (
              <div key={s.step} className="rounded-md border border-slate-800 bg-slate-900 p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-sky-400">{s.step}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 py-12 border-b border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <article className="rounded-md border border-sky-500/30 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-sky-400">{info.usage.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              {info.usage.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-md border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-white">{info.notes.heading}</h2>
            {info.notes.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-sm text-slate-300">
                {p}
              </p>
            ))}
            <p className="mt-3 text-sm text-slate-400">{info.pricing}</p>
          </article>
        </div>
      </section>

      <CtaSection
        heading={cta.heading}
        subheading={cta.description}
        ctaLabel={cta.cta.label}
        ctaHref={cta.cta.href}
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6 text-xl font-bold text-white">{catalog.heading}</h2>
        <Suspense>
          <Catalog products={products} />
        </Suspense>
      </section>
    </>
  );
}
