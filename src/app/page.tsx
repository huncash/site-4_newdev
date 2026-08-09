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
  } = CONTENT;

  return (
    <>
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
        ctaLabel={hero.ctaPrimary.label}
        ctaHref={hero.ctaPrimary.href}
        imageUrl={hero.image}
      />

      <section className="bg-secondary py-12 sm:py-16 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-3">
          {gallery.items.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-md border border-border bg-card shadow-sm">
              <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FeatureGrid heading={services.heading} features={services.items} />

      <section className="bg-secondary py-12 text-foreground sm:py-16 border-y border-border">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold text-foreground">{useCases.heading}</h2>
          <FeatureGrid
            heading=""
            features={useCases.items}
            className="bg-transparent py-8"
          />
          <img
            src={useCases.image}
            alt="Belvárosi sétálóutca fölött telepített dekorponyva UV-fényben"
            className="mt-8 max-w-md rounded-md border border-border object-cover"
            loading="lazy"
          />
        </div>
      </section>

      <section className="border-b border-border bg-background py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{categories.heading}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {categories.items.map((cat) => (
              <article key={cat.slug} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{cat.tagline}</p>
                <h3 className="mt-2 font-semibold text-foreground">{cat.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{cat.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-14 border-b border-border">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-foreground">{rentalItems.heading}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{rentalItems.disclaimer}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rentalItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.priceNote}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-xl font-bold text-foreground">{saleItems.heading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {saleItems.items.map((item) => (
              <article key={item.slug} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                <h3 className="font-semibold text-foreground">{item.name}</h3>
                {item.priceNetHuf ? (
                  <p className="mt-2 text-lg font-bold text-brand">{formatHuf(item.priceNetHuf)}</p>
                ) : null}
                <p className="text-xs text-muted-foreground">nettó / db · áfás számla</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16 border-b border-border">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold text-foreground">{process.heading}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((s) => (
              <div key={s.step} className="rounded-md border border-border bg-card p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">{s.step}</p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a
              href={process.cta.href}
              className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground hover:border-brand hover:text-brand transition-colors"
            >
              {process.cta.label}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-secondary py-12 border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <article className="rounded-md border border-brand/30 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-brand">{info.usage.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground">
              {info.usage.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-md border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground">{info.notes.heading}</h2>
            {info.notes.paragraphs.map((p) => (
              <p key={p} className="mt-3 text-sm text-foreground">
                {p}
              </p>
            ))}
            <p className="mt-3 text-sm text-muted-foreground">{info.pricing}</p>
          </article>
        </div>
      </section>

      <CtaSection
        heading={cta.heading}
        subheading={cta.description}
        ctaLabel={cta.cta.label}
        ctaHref={cta.cta.href}
        variant="dark"
      />
    </>
  );
}
