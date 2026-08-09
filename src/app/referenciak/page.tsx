import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenciák — dekor ponyva projektjeink képeken | Rendezvényárnyékolás",
  description:
    "Nappali árnyékolás, esti UV-látvány, telepítési pillanatok és természetközeli elhelyezések — saját munkáinkból.",
};

interface GalleryImage {
  src: string;
  alt: string;
}

interface GallerySection {
  slug: string;
  label: string;
  title: string;
  description: string;
  images: GalleryImage[];
  wide?: boolean;
}

const GALLERY_SECTIONS: GallerySection[] = [
  {
    slug: "varosi-setalo",
    label: "Városban",
    title: "Városi sétálóutcai installációk",
    description:
      "A legerősebb referenciáink közé tartoznak a belvárosi, homlokzatok közé kifeszített felületek, ahol a dekor egyszerre ad árnyékot és markáns látványt.",
    wide: true,
    images: [
      {
        src: "/img/gallery/nappali-foutca.png",
        alt: "Nyomtatott lycra dekorponyva nappali telepítésben egy belvárosi sétálóutca fölött.",
      },
      {
        src: "/img/gallery/kozter-hangulatkep.png",
        alt: "Dekorponyva belvárosi közegben, esti hangulatképen, járókelőkkel a térben.",
      },
    ],
  },
  {
    slug: "alulnezet",
    label: "Perspektíva",
    title: "Alulnézetből ikonikus forma",
    description:
      "A kifeszített geometriák alulról nézve adják a legerősebb élményt; a minta és a feszesség ebből a perspektívából a legszembetűnőbb.",
    images: [
      {
        src: "/img/gallery/nappali-alulnezet.png",
        alt: "Radiális dekorponyva alulnézetből nappali fényben, belvárosi homlokzatok között.",
      },
      {
        src: "/img/gallery/csillag-dekor-alulnezet.png",
        alt: "Csillag alakú dekorponyva alulnézetből, kifeszítve városi homlokzatok között.",
      },
    ],
  },
  {
    slug: "telepites",
    label: "Telepítés",
    title: "Telepítés valós helyszínen",
    description:
      "A kifeszítést mi végezzük; emelőkosaras munkáknál a megrendelő technikai csapatával dolgozunk együtt, a meglévő városi infrastruktúrához igazodva.",
    images: [
      {
        src: "/img/gallery/setaloutca-telepites.png",
        alt: "Dekorponyva telepítése emelőkosárral belvárosi sétálóutcában.",
      },
      {
        src: "/img/gallery/setaloutca-daruval.png",
        alt: "Kifeszített dekorponyva emelőkosaras jármű fölött, városi telepítési helyzetben.",
      },
    ],
  },
  {
    slug: "tancter",
    label: "Belső tér",
    title: "Tánctér fölötti nagy fesztáv",
    description:
      "Nagyméretű, karakteres felületek tánctér- és programzónák fölé, ahol az árnyék és a vizuális fókusz egyszerre fontos.",
    wide: true,
    images: [
      {
        src: "/img/gallery/stage-canopy.png",
        alt: "Nagyméretű dekorponyva tánctér fölé kifeszítve, erős napsütésben.",
      },
      {
        src: "/img/gallery/shadow-field.png",
        alt: "Nagyméretű dekorponyva árnyéka a burkolaton, kültéri rendezvénytéren.",
      },
    ],
  },
  {
    slug: "uv-nappal",
    label: "UV & nappal",
    title: "Esti UV és nappali nyílt tér",
    description:
      "Ugyanaz a műfaj nappal hasznos árnyékolás, este pedig külön látványréteg lehet — helyszíntől és fénytől függően.",
    images: [
      {
        src: "/img/gallery/hero-night.png",
        alt: "Belvárosi sétálóutca fölé kifeszített dekorponyva éjszaka, UV-fénnyel megvilágítva.",
      },
      {
        src: "/img/gallery/uv-close.png",
        alt: "UV-aktív dekorponyva közeli nézete esti megvilágításban, geometrikus mintázattal.",
      },
    ],
  },
  {
    slug: "kulteri-arnyekolas",
    label: "Kültér",
    title: "Nyílt téri árnyékolás és előkészítés",
    description:
      "Nagyobb kültéri rendezvényeken a vizuális fókusz mellett az árnyékhatás és a precíz előkészítés is fontos része a munkának.",
    images: [
      {
        src: "/img/gallery/day-field.png",
        alt: "Nappali kültéri rendezvényen kifeszített nyomtatott lycra dekorponyva nyílt tér fölött.",
      },
      {
        src: "/img/gallery/installation.png",
        alt: "A dekorponyva telepítés előtti állapotban a földön, természetes környezetben.",
      },
    ],
  },
];

export default function ReferencesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border bg-secondary px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand">
            Referenciák
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Valós projektek képeken
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Nappali árnyékolás, esti UV-látvány, telepítési pillanatok és természetközeli
            elhelyezések — a lenti képek saját munkáinkból mutatnak részleteket.
          </p>
        </div>
      </section>

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
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div
                  className={
                    section.images.length > 1
                      ? "grid gap-px bg-border sm:grid-cols-2"
                      : undefined
                  }
                >
                  {section.images.map((image) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className={
                        section.wide && section.images.length === 1
                          ? "aspect-[21/9] w-full object-cover"
                          : "aspect-[4/3] w-full bg-card object-cover"
                      }
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                  {section.label}
                </p>
                <h2 className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
                  {section.title}
                </h2>
                <p className={section.wide ? "max-w-2xl text-muted-foreground" : "text-muted-foreground"}>
                  {section.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-section-dark px-4 py-16 text-center text-section-dark-foreground">
        <div className="mx-auto max-w-xl">
          <h2 className="mb-3 text-2xl font-bold text-section-dark-foreground">
            Hasonló rendezvényt szervez?
          </h2>
          <p className="mb-8 text-section-dark-foreground/85">
            Kérjen ajánlatot — helyszínhez és funkcióhoz illesztett felületet javaslunk.
          </p>
          <a
            href="/kapcsolat"
            className="inline-flex items-center rounded-lg bg-brand px-8 py-3 text-sm font-bold text-brand-foreground hover:bg-brand-dark transition-colors"
          >
            Ajánlatkérés
          </a>
        </div>
      </section>
    </main>
  );
}
