import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenciák — dekor ponyva projektjeink képeken | Rendezvényárnyékolás",
  description:
    "Nappali árnyékolás, esti UV-látvány, telepítési pillanatok és természetközeli elhelyezések — saját munkáinkból.",
};

interface GallerySection {
  slug: string;
  label: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  wide?: boolean;
}

const GALLERY_SECTIONS: GallerySection[] = [
  {
    slug: "varosi-setalo",
    label: "Városban",
    title: "Városi sétálóutcai installációk",
    description:
      "A legerősebb referenciáink közé tartoznak a belvárosi, homlokzatok közé kifeszített felületek, ahol a dekor egyszerre ad árnyékot és markáns látványt.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/varosi-setalo.jpg",
    imageAlt: "Városi sétálóutcai dekor ponyva installáció",
    wide: true,
  },
  {
    slug: "alulnezet",
    label: "Perspektíva",
    title: "Alulnézetből ikonikus forma",
    description:
      "A kifeszített geometriák alulról nézve adják a legerősebb élményt; a minta és a feszesség ebből a perspektívából a legszembetűnőbb.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/alulnezet.jpg",
    imageAlt: "Dekor ponyva alulnézeti perspektívából",
  },
  {
    slug: "telepites",
    label: "Telepítés",
    title: "Telepítés valós helyszínen",
    description:
      "A kifeszítést mi végezzük; emelőkosaras munkáknál a megrendelő technikai csapatával dolgozunk együtt, a meglévő városi infrastruktúrához igazodva.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/telepites.jpg",
    imageAlt: "Helyszíni dekor ponyva telepítés emelőkosárral",
  },
  {
    slug: "tancter",
    label: "Belső tér",
    title: "Tánctér fölötti nagy fesztáv",
    description:
      "Nagyméretű, karakteres felületek tánctér- és programzónák fölé, ahol az árnyék és a vizuális fókusz egyszerre fontos.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/tancter.jpg",
    imageAlt: "Nagy fesztávú dekor ponyva tánctér fölé feszítve",
    wide: true,
  },
  {
    slug: "uv-nappal",
    label: "UV & nappal",
    title: "Esti UV és nappali nyílt tér",
    description:
      "Ugyanaz a műfaj nappal hasznos árnyékolás, este pedig külön látványréteg lehet — helyszíntől és fénytől függően.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/uv-nappal.jpg",
    imageAlt: "Dekor ponyva nappal és UV megvilágítással este",
  },
  {
    slug: "kulteri-arnyekolas",
    label: "Kültér",
    title: "Nyílt téri árnyékolás és előkészítés",
    description:
      "Nagyobb kültéri rendezvényeken a vizuális fókusz mellett az árnyékhatás és a precíz előkészítés is fontos része a munkának.",
    imageSrc: "https://rendezvenyarnyekolas.hu/images/referenciak/kulteri-arnyekolas.jpg",
    imageAlt: "Kültéri rendezvény dekor ponyva árnyékolás",
  },
];

export default function ReferencesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* Hero header */}
      <section className="border-b border-slate-800 px-4 py-16 md:py-24 bg-slate-900">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-sky-400">
            Referenciák
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
            Valós projektek képeken
          </h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Nappali árnyékolás, esti UV-látvány, telepítési pillanatok és természetközeli
            elhelyezések — a lenti képek saját munkáinkból mutatnak részleteket.
          </p>
        </div>
      </section>

      {/* Gallery sections */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col gap-20">
          {GALLERY_SECTIONS.map((section, i) => (
            <div
              key={section.slug}
              className={[
                "grid items-center gap-10",
                section.wide ? "md:grid-cols-1" : "md:grid-cols-2",
                !section.wide && i % 2 !== 0 ? "md:[&>*:first-child]:order-last" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Image */}
              <div
                className={[
                  "overflow-hidden rounded-lg border border-slate-800 bg-slate-900",
                  section.wide ? "aspect-[21/9]" : "aspect-[4/3]",
                ].join(" ")}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={section.imageSrc}
                  alt={section.imageAlt}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Text */}
              {!section.wide && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {section.label}
                  </p>
                  <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="text-slate-400">{section.description}</p>
                </div>
              )}

              {/* Wide: text below image */}
              {section.wide && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">
                    {section.label}
                  </p>
                  <h2 className="text-2xl font-bold leading-snug text-white md:text-3xl">
                    {section.title}
                  </h2>
                  <p className="max-w-2xl text-slate-400">{section.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800 bg-slate-900 px-4 py-16 text-center">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-3 text-2xl font-bold text-white">Hasonló rendezvényt szervez?</h2>
          <p className="mb-8 text-slate-400">
            Kérjen ajánlatot — helyszínhez és funkcióhoz illesztett felületet javaslunk.
          </p>
          <a
            href="/kapcsolat"
            className="inline-flex items-center rounded-lg bg-sky-400 px-8 py-3 text-sm font-bold text-slate-950 hover:bg-sky-300 transition-colors"
          >
            Ajánlatkérés
          </a>
        </div>
      </section>
    </main>
  );
}
