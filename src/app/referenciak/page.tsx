import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Referenciák — dekor ponyva projektjeink képeken",
  description:
    "Valós referenciaképek kültéri és városi rendezvényekről: nappali árnyékolás, UV-aktív esti látvány és telepítési részletek dekor ponyváinkkal.",
};

const categories = [
  {
    title: "Városi sétálóutcai installációk",
    desc: "A legerősebb referenciáink közé tartoznak a belvárosi, homlokzatok közé kifeszített felületek, ahol a dekor egyszerre ad árnyékot és markáns látványt.",
    images: [
      {
        src: "/img/gallery/nappali-foutca.png",
        alt: "Printed lycra dekorponyva nappali telepítésben egy belvárosi sétálóutca fölött.",
      },
      {
        src: "/img/gallery/kozter-hangulatkep.png",
        alt: "Dekorponyva belvárosi közegben, esti hangulatképen, járókelőkkel a térben.",
      },
    ],
  },
  {
    title: "Alulnézetből ikonikus forma",
    desc: "A kifeszített geometriák alulról nézve adják a legerősebb élményt; a minta és a feszesség ebből a perspektívából a legszembetűnőbb.",
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
    title: "Telepítés valós helyszínen",
    desc: "A kifeszítést mi végezzük; emelőkosaras munkáknál a megrendelő technikai csapatával dolgozunk együtt.",
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
    title: "Tánctér fölötti nagy fesztáv",
    desc: "Nagyméretű, karakteres felületek tánctér- és programzónák fölé, ahol az árnyék és a vizuális fókusz egyszerre fontos.",
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
    title: "Esti UV és nappali nyílt tér",
    desc: "Ugyanaz a műfaj nappal hasznos árnyékolás, este pedig külön látványréteg lehet — helyszíntől és fénytől függően.",
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
    title: "Nyílt téri árnyékolás és előkészítés",
    desc: "Nagyobb kültéri rendezvényeken a vizuális fókusz mellett az árnyékhatás és a precíz előkészítés is fontos része a munkának.",
    images: [
      {
        src: "/img/gallery/day-field.png",
        alt: "Nappali kültéri rendezvényen kifeszített printed lycra dekorponyva nyílt tér fölött.",
      },
      {
        src: "/img/gallery/installation.png",
        alt: "A dekorponyva telepítés előtti állapotban a földön, természetes környezetben.",
      },
    ],
  },
];

export default function ReferenciakPage() {
  return (
    <>
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Referenciák
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Valós projektek képeken
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Nappali árnyékolás, esti UV-látvány, telepítési pillanatok — a lenti
            képek saját munkáinkból mutatnak részleteket.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-10 px-4">
          {categories.map((c) => (
            <article
              key={c.title}
              className="overflow-hidden rounded-md border border-border bg-card shadow-sm"
            >
              <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="p-6 lg:p-8">
                  <h2 className="text-2xl font-semibold">{c.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {c.desc}
                  </p>
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2">
                  {c.images.map((image) => (
                    <img
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      className="aspect-[4/3] w-full bg-card object-cover"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Hasonló rendezvényt szervez?
          </h2>
          <p className="mt-3 opacity-90">
            Kérjen ajánlatot — helyszínhez és funkcióhoz illesztett felületet javaslunk.
          </p>
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
