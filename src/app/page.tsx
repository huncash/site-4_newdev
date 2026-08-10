import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Egyedi festésű és printed lycra dekor ponyvák rendezvényekre",
  description:
    "Kézzel festett és printed lycra dekor ponyvák bérlése rendezvényekre, helyszíni kifeszítéssel és bontással. Városi rendezvények, kulturális események, céges projektek.",
};

const value = [
  {
    title: "Meglévő egyedi darabok bérlése",
    desc: "Kézzel festett és printed lycra dekorponyvák bérbeadása — egész évben, előfoglalással. Nem gyártás-orientált műhely vagyunk.",
  },
  {
    title: "Árnyék és hangulat",
    desc: "Kültéren árnyékot ad, beltérben karakteres vizuális réteget épít a tér fölé. Esővédelemre nem alkalmas — arra külön elemek vannak.",
  },
  {
    title: "Természetes és városi terekben",
    desc: "Fák közé, állványzatra, homlokzatok közé, sétálóutcák fölé vagy sátortérbe — a helyszín geometriájához igazítva.",
  },
  {
    title: "Telepítés és koordináció",
    desc: "A felület tervezését, kifeszítését és bontását mi végezzük. Emelőkosár, állvány, helyszíni technika esetén a megrendelő alvállalkozóival dolgozunk együtt.",
  },
];

const useCases = [
  {
    title: "Fesztiválok és koncertek",
    desc: "Színpadi háttér, sátorplafon, közönségtér fölé feszített dekorréteg fesztiválokra, klubestekre, koncertekre — kül- és beltérre egyaránt.",
  },
  {
    title: "Városi és kulturális rendezvények",
    desc: "Sétálóutcák, belvárosi események, alapítványi ünnepségek, gyereknapok, családi és közösségi programok árnyékolása és hangulati keretezése.",
  },
  {
    title: "Céges és ügynökségi projektek",
    desc: "Brand-aktivációkhoz, partnereseményekhez és céges rendezvényekhez a vizuális tematika szerint finomhangolt kivitelben.",
  },
];

const steps = [
  {
    n: "1.",
    t: "Egyeztetés",
    d: "Helyszín, funkció, dátum, vizuális irány és technikai környezet átbeszélése.",
  },
  {
    n: "2.",
    t: "Felület kiválasztása",
    d: "Kézzel festett vagy printed lycra megoldás, forma és méret szerint.",
  },
  {
    n: "3.",
    t: "Telepítés",
    d: "A felületet a helyszín adottságaihoz igazítva feszítjük ki.",
  },
  {
    n: "4.",
    t: "Bontás",
    d: "Rendezvény után bontás, összeszedés és elszállítás a megbeszélt időablakban.",
  },
];

const gallery = [
  {
    src: "/img/gallery/nappali-foutca.png",
    alt: "Printed lycra dekorponyva nappali telepítésben egy belvárosi sétálóutca fölött.",
    title: "Sétálóutca nappal",
    desc: "Városi közegben is megáll a látvány.",
  },
  {
    src: "/img/gallery/nappali-alulnezet.png",
    alt: "A dekorponyva alsó nézete nappali fényben, markáns radiális mintázattal.",
    title: "Alulnézet",
    desc: "A forma a járókelő szemszögéből is működik.",
  },
  {
    src: "/img/gallery/setaloutca-telepites.png",
    alt: "Dekorponyva telepítése emelőkosárral belvárosi helyszínen.",
    title: "Helyszíni telepítés",
    desc: "Emelőkosaras munkáknál a megrendelő technikai csapatával együtt dolgozunk.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-section-dark text-section-dark-foreground">
        <div className="absolute inset-0">
          <picture>
            <source
              type="image/avif"
              srcSet="/img/hero/hero-640.avif 640w, /img/hero/hero-1024.avif 1024w, /img/hero/hero-1600.avif 1600w, /img/hero/hero-1920.avif 1920w"
              sizes="100vw"
            />
            <source
              type="image/webp"
              srcSet="/img/hero/hero-640.webp 640w, /img/hero/hero-1024.webp 1024w, /img/hero/hero-1600.webp 1600w, /img/hero/hero-1920.webp 1920w"
              sizes="100vw"
            />
            <img
              src="/img/hero/hero-1600.jpg"
              srcSet="/img/hero/hero-640.jpg 640w, /img/hero/hero-1024.jpg 1024w, /img/hero/hero-1600.jpg 1600w, /img/hero/hero-1920.jpg 1920w"
              sizes="100vw"
              alt="UV-fénnyel megvilágított dekorponyva belvárosi rendezvény fölött éjszaka."
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
              width={1600}
              height={1199}
            />
          </picture>
          <div className="absolute inset-0 bg-section-dark/65" />
        </div>

        <div className="relative mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[82svh] sm:py-24 md:py-28">
          <span className="mb-3 inline-block w-fit rounded-full border border-brand/60 bg-background/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand backdrop-blur-sm">
            Rendezvény-dekor és árnyékolás
          </span>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Kézzel festett és printed lycra dekor ponyvák rendezvényekre
          </h1>
          <p className="mt-4 max-w-2xl text-base opacity-95 sm:text-lg md:text-xl">
            Bérelhető dekorfelületek kültérre és beltérre — városi rendezvényekhez,
            fesztiválokhoz, kulturális és céges eseményekhez. A helyszín geometriájához
            igazítva feszítjük ki.
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/kapcsolat"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Ajánlatkérés
            </Link>
            <Link
              href="/referenciak"
              className="inline-flex items-center justify-center rounded-md border border-section-dark-foreground/50 bg-background/10 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-section-dark-foreground backdrop-blur-sm hover:bg-background/20"
            >
              Fotós referenciák
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {gallery.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-md border border-border bg-card shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                <div className="p-5">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-semibold sm:text-3xl">
            Mit adunk a rendezvényhez
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {value.map((v) => (
              <article
                key={v.title}
                className="flex flex-col rounded-md border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-xl font-semibold text-brand sm:text-2xl md:text-3xl">
                Kinek ajánljuk
              </h2>
              <div className="mt-4 h-px w-24 bg-brand/60" />
              <div className="mt-8 grid gap-5 sm:grid-cols-3 md:grid-cols-1">
                {useCases.map((u) => (
                  <article
                    key={u.title}
                    className="rounded-md border border-section-dark-foreground/15 bg-background/5 p-5"
                  >
                    <h3 className="text-lg font-semibold">{u.title}</h3>
                    <p className="mt-2 text-sm opacity-90">{u.desc}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="overflow-hidden rounded-md border border-section-dark-foreground/15 bg-background/5">
              <img
                src="/img/gallery/hero-night.png"
                alt="Belvárosi sétálóutca fölé telepített dekorponyva UV-fényben, esti rendezvényen."
                className="aspect-[4/5] w-full object-cover"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </article>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/referenciak"
              className="text-sm font-semibold uppercase tracking-wider text-brand hover:underline"
            >
              Referenciáink →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-xl font-semibold sm:text-2xl md:text-3xl">
            Megrendeléstől a bontásig — négy lépés
          </h2>
          <div className="mx-auto mt-4 h-px w-24 bg-brand/60" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-md border border-border bg-card p-6 shadow-sm"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {s.n}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/folyamat"
              className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold uppercase tracking-wider text-brand-foreground hover:bg-brand-dark"
            >
              Részletes folyamat
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
          <article className="rounded-md border border-brand/40 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Hol használják a dekorjainkat</h2>
            <ul className="mt-3 space-y-2 text-sm text-foreground/85">
              <li>• Fesztiválok, koncertek, klubestek</li>
              <li>• Városi rendezvények, sétálóutcai programok, alapítványi ünnepségek</li>
              <li>• Gyereknapok, családi és közösségi események</li>
              <li>• Céges és ügynökségi rendezvények, brand-aktivációk</li>
            </ul>
          </article>
          <article className="rounded-md border border-border bg-secondary/50 p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Amit fontos előre tudni</h2>
            <p className="mt-3 text-sm text-foreground/85">
              Bérbeadással foglalkozunk — a meglévő egyedi darabokra{" "}
              <strong>egész évben előfoglalás</strong> vehető fel. Egyedi gyártást
              kérésre, 3D lézerszkennes felméréssel is vállalunk a helyre
              tökéletesen illesztett kivitelben, de annak több hét az átfutása, és
              évente csak néhány projektet vállalunk be.
            </p>
            <p className="mt-3 text-sm text-foreground/85">
              A dekorponyva árnyékolásra és térformálásra való,{" "}
              <strong>nem esőálló</strong>. Ha a technika fölé funkcionális
              esővédelem is kell, ahhoz külön kamionponyva elemeket adunk.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Tervez rendezvényt?</h2>
          <p className="mt-3 opacity-90">
            Írja meg a helyszínt, dátumot és a tematikát — ajánlattal és
            látványterv-iránnyal válaszolunk.
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
