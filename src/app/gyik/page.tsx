import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GYIK — elasztikus dekor ponyva bérlés rendezvényekre",
  description:
    "Gyakori kérdések a rendezvény-dekor ponyva bérlésről: időjárás-állóság, helyigény, telepítési idő, UV-világítás, árazás, határidők.",
};

type Faq = { q: string; a: string; linkTo?: string; linkLabel?: string };

const faqs: Faq[] = [
  {
    q: "Mekkora felületet tudtok lefedni egy rendezvényen?",
    a: "Kis háttér-paneltől (néhány négyzetméter) több száz négyzetméteres sátortér-plafonig vállalunk. A pontos vállalhatóságot a helyszín és a rendelkezésre álló tartószerkezet alapján szabjuk meg a felmérés során.",
  },
  {
    q: "Bel- vagy kültérre is jó az elasztikus ponyva?",
    a: "Mindkettőre. A textil-ponyva időjárás-tűrő, normál szél- és napsugárzás-terhelést bír. Vihar vagy szélsőséges időjárás esetén — a többi technikai elemhez hasonlóan — a kültéri telepítést a szervezővel közösen újraértékeljük.",
  },
  {
    q: "Esőálló a dekor ponyva? Mi van a hangtechnika fölött?",
    a: "A festett és printed dekor-ponyváink nem esőállóak — látvány- és árnyékoló funkcióra valók. Külön funkcionális készletünk van kamion-ponyva alapú, drótsodronnyal erősített elemekkel kifejezetten hangtechnika, FOH-pult és kábelutak fölé.",
    linkTo: "/esoallo-ponyva",
    linkLabel: "Funkcionális esőálló panelek",
  },
  {
    q: "Mennyi idő a helyszíni telepítés?",
    a: "Felülettől és helyszín-adottságoktól függ. Kisebb háttér néhány óra, közepes méretű sátortér fél nap, nagyobb komplex helyszín akár teljes nap vagy több műszak. A pontos időablakot a szerződésben rögzítjük.",
  },
  {
    q: "Kell áram a telepítéshez?",
    a: "Az árnyékolás-telepítéshez magához nem kötelező — kézi szerszámokkal dolgozunk. Ha UV-világítást is használtok, az áramellátást a megrendelő vagy a technikai partner biztosítja.",
  },
  {
    q: "Az UV-világítást ti hozzátok?",
    a: "Nem. A világítóeszközt a megrendelő biztosítja vagy a rendezvény technikai partnere. Mi a tervezés során javaslunk típust és optimális pozíciót. A katalógusban megvásárolható UV tartozékok is elérhetők.",
    linkTo: "/termekek?cat=tartozekok",
    linkLabel: "UV tartozékok a katalógusban",
  },
  {
    q: "Hogyan árazódik a szolgáltatás?",
    a: "Három fő tényezőből: a bérelt felület mérete és összetettsége, a helyszíni telepítés és bontás munkaóra-igénye, valamint a logisztika. Konkrét helyszínre tételes ajánlatot küldünk. A katalógus UV tartozékai fix nettó listaáron rendelhetők.",
  },
  {
    q: "Mennyi időre van szükségetek a megrendeléstől?",
    a: "Bérlésnél a meglévő készletből rövid határidővel is tudunk dolgozni — szabad kapacitás függvényében akár pár napos átfutással is. Egész évben előfoglalható. Egyedi gyártás esetén az átfutás több hét.",
  },
  {
    q: "Kérhető teljesen egyedi, helyre szabott dekor?",
    a: "Igen. A helyszínről 3D lézerszkennes felmérést készítünk, és a térre pontosan illesztett dekor készül belőle. Ez kapacitás-korlátos kategória, évente csak párat vállalunk.",
  },
  {
    q: "Mi történik, ha a rendezvény elmarad vagy időpontot kell módosítani?",
    a: "Az időpontváltoztatás és lemondás feltételeit a megrendelőben rögzítjük. Bérlés esetén jellemzően rugalmasan kezeljük; egyedi gyártásnál a már megkezdett előállítás költsége nem visszatéríthető — a részleteket az ÁSZF tartalmazza.",
  },
  {
    q: "Hogyan zajlik a fizetés új ügyfélnél?",
    a: "Új ügyfélnél az érvényes megrendelés feltétele a kibocsátott díjbekérő banki átutalással történő teljesítése. Szerződött partnereknek egyedi, utófizetéses fizetési határidőt biztosítunk.",
  },
  {
    q: "Hogyan tudok ajánlatot kérni?",
    a: "A Kapcsolat oldalon található űrlapon küldj egy rövid leírást a rendezvényről: helyszín, dátum, várható létszám, tematikai irány. 1 munkanapon belül visszajelzünk.",
  },
];

function buildFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export default function GyikPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema()) }}
      />
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            GYIK
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Gyakori kérdések
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Időjárás, helyigény, telepítési idő, UV-világítás, árazás, határidők —
            amit tipikusan kérdeznek tőlünk.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-md border border-border bg-card p-5 shadow-sm open:border-brand/60"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-foreground marker:hidden">
                <span className="mr-2 inline-block text-brand transition group-open:rotate-90">
                  ›
                </span>
                {f.q}
              </summary>
              <p className="mt-3 pl-6 text-sm text-foreground/85">{f.a}</p>
              {f.linkTo ? (
                <p className="mt-2 pl-6 text-sm">
                  <Link
                    href={f.linkTo}
                    className="text-brand underline underline-offset-4 hover:no-underline"
                  >
                    {f.linkLabel ?? "Részletek"} →
                  </Link>
                </p>
              ) : null}
            </details>
          ))}
        </div>
      </section>

      <section className="bg-background py-10 sm:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-sm uppercase tracking-wider text-brand">Folyamat</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Megrendeléstől a bontásig
          </h2>
          <Link
            href="/folyamat"
            className="mt-5 inline-flex items-center justify-center rounded-md border border-brand px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-brand hover:bg-brand hover:text-brand-foreground"
          >
            Folyamat részletesen
          </Link>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Nem találta a választ?</h2>
          <p className="mt-3 opacity-90">
            Írja meg a részleteket — 1 munkanapon belül személyre szabott ajánlattal
            válaszolunk.
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
