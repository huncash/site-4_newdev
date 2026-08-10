import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Folyamat — megrendeléstől a bontásig",
  description:
    "Hat lépésben a megkereséstől a rendezvény utáni bontásig — előre rögzített időablakokkal, egy felelős kapcsolattartóval.",
};

const steps = [
  {
    n: "1.",
    t: "Megkeresés és helyszín-egyeztetés",
    d: "A megrendelő kitölti az ajánlatkérőt vagy e-mailt küld: helyszín, dátum, várható létszám, tematikai irány. 1 munkanapon belül visszajelzünk a vállalhatóságról és a következő lépésről.",
  },
  {
    n: "2.",
    t: "Látvány- és méretterv",
    d: "A helyszínről vagy átadott alaprajzból méreteket veszünk, és a megrendelő tematikájához igazított látványterv-vázlatot küldünk. A terv elfogadása után rögzítjük a végleges méreteket és festési specifikációt.",
  },
  {
    n: "3.",
    t: "Szerződés és időpontfoglalás",
    d: "Írásos megrendelő rögzíti a vállalási árat, a telepítési és bontási időablakot, valamint a helyszíni kapcsolattartókat. A foglalás akkor él, amikor a megrendelő jóváhagyja a szerződést.",
  },
  {
    n: "4.",
    t: "Festés a műhelyben",
    d: "A ponyva méretpontosan szabva, a látványterv szerint kifestve készül el. Munkafázis-fotó vagy minta-fotó kérhető a festés vége előtt — szín- vagy motívum-korrekcióra ez a pont a határidő.",
  },
  {
    n: "5.",
    t: "Helyszíni kifeszítés",
    d: "A megegyezett időablakban érkezünk, és kifeszítjük a felületet. Emelőkosaras munka, állványozás és a helyszíni technika koordinációja a megrendelő alvállalkozóival közösen történik.",
  },
  {
    n: "6.",
    t: "Rendezvény és bontás",
    d: "A rendezvény alatt a dekor a helyén; szükség esetén ügyeletet biztosítunk. Záráskor a megegyezett időablakban bontunk és elszállítunk.",
  },
];

export default function FolyamatPage() {
  return (
    <>
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Folyamat
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Megrendeléstől a bontásig
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Hat tisztán definiált lépés, előre rögzített időablakokkal és egy
            felelős kapcsolattartóval — a rendezvény napjára már csak a látvány
            marad.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-6 px-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-md border border-border bg-card p-6 shadow-sm"
            >
              <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                {s.n}
              </div>
              <h2 className="mt-2 text-xl font-semibold sm:text-2xl">{s.t}</h2>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Kezdjük az 1. lépéssel</h2>
          <p className="mt-3 opacity-90">Helyszín, dátum, tematika — egy ajánlatkérő elég.</p>
          <Link
            href="/kapcsolat"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
          >
            Ajánlatkérés
          </Link>
        </div>
      </section>
    </>
  );
}
