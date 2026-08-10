import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Szolgáltatás — dekor ponyvák kézi festéssel vagy printed lycrával",
  description:
    "Kézzel festett és printed lycra dekor ponyvák: anyag, méret, telepítés, bontás, UV-használat és funkcionális határok egy helyen.",
};

const sections = [
  {
    h: "Pozicionálás — mit adunk és mit nem",
    p: [
      "A szolgáltatásunkat egy mondatban: textilréteget adunk a rendezvény terére. Nem sátrat, nem tartószerkezetet, és nem reklámbannert, hanem kifeszített dekorfelületet, amely képes árnyékot adni, hangulatot építeni és a helyszín fölött egységes vizuális mezőt létrehozni.",
      "A kivitelezés a fesztivál- és színpadi dekorvilágból érkezik, de B2B munkarenddel működik: előre egyeztetett időablakokkal, saját telepítő-bontó csapattal és a helyszín többi szereplőjéhez igazított koordinációval.",
    ],
  },
  {
    h: "Felületválaszték — kézzel festett és printed lycra",
    p: [
      "A kínálatban két fő irány van. Az egyik a kézzel festett dekor, ahol a felület műhelyben, egyedileg készül el organikus vagy tematizált motívumokkal. A másik a printed lycra, ahol digitális nyomással valósítjuk meg a grafikát — ez nagyobb ismétlési pontosságot és erős, tiszta vizuális rendszert ad.",
      "A két technológia nem egymás helyett, hanem egymás mellett működik: vannak projektek, ahol a kézműves karakter a fontosabb, és vannak, ahol a nagy felületi fegyelem vagy az ismétlődő motívumok miatt a nyomtatott megoldás az ideális.",
    ],
  },
  {
    h: "Az anyag viselkedése a térben",
    p: [
      "A készletünkben szereplő elasztikus dekorponyvák 15×15 m-es méretűek. Jól feszíthetők fák közé, állványzat közé, homlokzatok közé vagy sátor- és színpadtérbe. Emiatt nem csak dekorációként működnek, hanem a tér irányításában is részt vesznek: összefognak, terelnek, plafont képeznek, vagy finom átmenetet adnak nyitott és fedett zónák között.",
      "Fontos különbség: a dekorponyva nem esőálló. Árnyékot és vizuális jelenlétet ad, de az eső elleni funkcionális védelemhez külön kamionponyva elemek valók — ezt külön aloldalon mutatjuk be.",
    ],
  },
  {
    h: "Telepítés és bontás",
    p: [
      "A kifeszítést mi végezzük. Ez különösen akkor számít, amikor a rögzítési pontok csak a rendezvény építésének utolsó szakaszában válnak véglegessé, vagy amikor a felületet finoman kell a technikai környezethez igazítani.",
      "Bontás után az anyagot összeszedjük és elszállítjuk. A megrendelőnek nem kell külön dekoros és külön bontó csapatot szerveznie.",
    ],
  },
  {
    h: "UV és hangulatképzés",
    p: [
      "Bizonyos minták UV-fény alatt különösen erősen élnek. Ez nem kötelező eleme a projektnek, de esti városi rendezvényen vagy sötétített helyszínen nagyon más karaktert tud adni ugyanannak a felületnek.",
      "Az UV-világítás eszközeit a megrendelő vagy technikai partnere biztosítja, mi pedig segítünk abban, hogy a felület és a világítás kölcsönösen erősítse egymást.",
    ],
  },
  {
    h: "Bérlés és egyedi gyártás",
    p: [
      "A profilunk a meglévő, egyedi dekorponyva-készlet bérbeadása. A darabokra egész évben felvehető az előfoglalás — fesztiválokra, koncertekre, klubestekre, városi és kulturális rendezvényekre, gyereknapra, alapítványi és céges eseményekre egyaránt.",
      "Igény esetén egyedi gyártást is vállalunk: a helyszínről 3D lézerszkennes felmérést készítünk, és a térre tökéletesen illesztett dekor készül belőle. Ez több hét átfutási idő, és évente csak néhány ilyen projektet vállalunk be — bérlésnél jellemzően sokkal rövidebb a folyamat.",
    ],
  },
  {
    h: "Megrendelés és fizetés",
    p: [
      "Új ügyfél részére az érvényes megrendelés feltétele a kiállított díjbekérő banki átutalással történő teljesítése; a teljesítést a jóváírás visszaigazolása után indítjuk. Szerződött partnereinknek — előzetes egyeztetés és írásos megállapodás alapján — egyedi, utófizetéses fizetési határidőt biztosítunk.",
      "Ez a rend egységesen vonatkozik minden megrendelőre, függetlenül attól, hogy fesztivál, önkormányzati rendezvény, klub, koncert, gyereknap vagy céges esemény a felhasználás.",
    ],
  },
];

const visuals = [
  {
    src: "/img/gallery/nappali-foutca.png",
    alt: "Printed lycra dekorponyva nappali telepítésben egy belvárosi sétálóutca fölött.",
    title: "Nappali városi installáció",
  },
  {
    src: "/img/gallery/nappali-alulnezet.png",
    alt: "Radiális dekorponyva alulnézetből nappali fényben, belvárosi homlokzatok között.",
    title: "Printed lycra alulnézetből",
  },
  {
    src: "/img/gallery/szabadteri-esti-alulnezet.png",
    alt: "Dekorponyva esti alulnézete emelőkosaras telepítési környezetben.",
    title: "Esti karakter a tér fölött",
  },
  {
    src: "/img/gallery/stage-canopy.png",
    alt: "Nagyméretű dekorponyva tánctér fölé kifeszítve, erős napsütésben.",
    title: "Nagy fesztáv tánctér fölé",
  },
  {
    src: "/img/gallery/setaloutca-daruval.png",
    alt: "Dekorponyva telepítése emelőkosárral sétálóutcai helyszínen.",
    title: "Saját telepítés helyszínen",
  },
  {
    src: "/img/gallery/uv-close.png",
    alt: "UV-aktív mintázatú dekorponyva közeli esti felvételen.",
    title: "Esti UV-karakter",
  },
  {
    src: "/img/gallery/day-field.png",
    alt: "Printed lycra dekorponyva nagy kültéri fesztávban, nappali rendezvénytéren.",
    title: "Nagy térre is működik",
  },
  {
    src: "/img/gallery/installation.png",
    alt: "A dekorponyva telepítési folyamat közben, még a kifeszítés előtt.",
    title: "Saját telepítés és bontás",
  },
];

export default function SzolgaltatasPage() {
  return (
    <>
      <section className="bg-section-dark py-14 text-section-dark-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <span className="inline-block rounded-full border border-brand/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand">
            Szolgáltatás
          </span>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Dekor ponyvák kézi festéssel vagy printed lycrával
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base opacity-90 sm:text-lg">
            Anyag, forma, térbeli működés, telepítés, bontás és UV-használat — a
            lényeg egy oldalon, valós képekkel kiegészítve.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {visuals.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-md border border-border bg-card shadow-sm"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h2 className="text-base font-semibold">{item.title}</h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-12 px-4">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-semibold sm:text-3xl">{s.h}</h2>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-foreground/85">
                {s.p.map((par) => (
                  <p key={par.slice(0, 40)}>{par}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Funkcionális esővédelem a technika fölé:{" "}
            <Link href="/esoallo-ponyva" className="text-brand underline underline-offset-4">
              esőálló ponyva elemek
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-section-dark py-12 text-section-dark-foreground sm:py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Konkrét helyszínre kérnél ajánlatot?
          </h2>
          <p className="mt-3 opacity-90">Helyszín, dátum, tematika — egy üzenet elég.</p>
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
