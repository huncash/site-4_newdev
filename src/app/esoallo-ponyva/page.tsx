import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Esőálló ponyvák — hangtechnika és érzékeny eszközök fölé",
  description:
    "3,5 m oldalú egyenlőoldalú háromszögekből álló esőálló ponyva-elemek drótsodrony erősítéssel hangtechnika, vezérlőpult és érzékeny eszközök fölé. Funkcionális védelem, nem dekor.",
};

const elements = [
  {
    h: "Rombusz alakú elemek",
    p: "3,5 m-es egyenlőoldalú háromszögekből álló rombusz formák — drótsodronnyal erősített, nehéz kamionponyva-anyagból. Két tartópont közé ferde kifeszítéssel húzhatók, például színpad széle és állvány közé, vagy keverőpult fölé átlós ernyőként.",
  },
  {
    h: "Trapéz alakú elem",
    p: "Ugyancsak 3,5 m-es egyenlőoldalú háromszögekből összeállított trapéz forma — szintén drótsodrony-erősítéssel. Nagyobb hangtechnikai blokk (FOH pult, rack, monitorrendszer) fölé feszíthető, ahol nagyobb védett felület kell.",
  },
];

export default function EsoAlloPage() {
  return (
    <>
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Funkcionális kiegészítő
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Esőálló ponyvák hangtechnika fölé
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            3,5 m-es egyenlőoldalú háromszögekből álló, drótsodronnyal erősített
            ponyva-elemek váratlan esőnél is megvédik a keverőpultot, a rackeket és
            az érzékeny elektronikát. Funkcionális védelem, nem dekor.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-10 px-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Mire való és mire nem</h2>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85">
              <p>
                Ezek az elemek <strong>nem dekor-ponyvák</strong>: nem festettek,
                nem váltják ki az elasztikus dekor-textilt. Cserébe viszont valódi
                vízállóságot adnak — egy nem várt zápor mellett a hangtechnika
                fölött aranyat érnek, miközben a dekorponyva pont ezt nem tudná
                teljesíteni.
              </p>
              <p>
                Tipikus felhasználás: szabadtéri rendezvényen a FOH-pult (front of
                house), a színpadi monitorkeverő, kábel-átkötések, lokális
                rack-szekrények vagy fényvezérlő-asztal időjárás-védelme.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Készletünk</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {elements.map((e) => (
                <div key={e.h} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold">{e.h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{e.p}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground/70">
              Skiccet és tájékoztató méreteket ajánlatkérésre küldünk — a végleges
              kifeszítési pontokat a helyszín szerkezete határozza meg.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">
              Kombinálható a dekor ponyvával
            </h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">
              Egy megrendelésben kérhető együtt a látvány-réteg (festett vagy
              nyomtatott elasztikus dekor) és a funkcionális esővédelem — egy
              csapat telepíti és bontja. Lásd a{" "}
              <Link href="/szolgaltatas" className="text-brand underline underline-offset-4">
                szolgáltatás
              </Link>{" "}
              oldalt.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Esővédelem kell a technika fölé?
          </h2>
          <p className="mt-3 opacity-90">
            Írja le a helyszínt, a technikai felállást és a dátumot — visszajelzünk.
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
