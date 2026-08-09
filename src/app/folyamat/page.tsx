import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A megrendelés folyamata | Rendezvényárnyékolás",
  description: "Így zajlik a kivitelezés: az első egyeztetéstől a helyszíni telepítésen át a rendezvény utáni bontásig.",
};

const steps = [
  {
    num: "1",
    title: "Igényfelmérés & Egyeztetés",
    desc: "A megrendelő megadja a rendezvény dátumát, helyszínét, a rendelkezésre álló rögzítési pontokat és a kívánt látványi világot. Átbeszéljük, hogy árnyékolásra, fénydekorációra vagy beltéri térelemre van szükség."
  },
  {
    num: "2",
    title: "Felületválasztás & Tervezés",
    desc: "A katalógusunkból kiválasztjuk a leginkább illeszkedő kézzel festett vagy nyomtatott lycra elemeket. Szükség esetén helyszíni felmérést végzünk, hogy pontosan megállapítsuk a feszítési tartópontokat."
  },
  {
    num: "3",
    title: "Helyszíni Telepítés",
    desc: "Profi csapatunk a megadott időablakban megérkezik a helyszínre. Felszereljük, kifeszítjük és beállítjuk a dekorfelületeket. Szükség szerint beállítjuk az UV megvilágítást is."
  },
  {
    num: "4",
    title: "Bontás & Elszállítás",
    desc: "A rendezvény lezárultával hatékonyan, a helyszín épségét megóvva leszereljük a dekorációt, és elszállítjuk."
  }
];

export default function FolyamatPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Megvalósítás</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">A kivitelezés folyamata</h1>
        <p className="mt-3 text-muted-foreground">
          Gördülékeny lebonyolítás a tervezéstől a lebontásig.
        </p>
      </div>

      <div className="relative border-l border-border ml-4 md:ml-8 space-y-10 pl-6 md:pl-10">
        {steps.map((step) => (
          <div key={step.num} className="relative">
            <span className="absolute -left-[35px] md:-left-[51px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold text-sm">
              {step.num}
            </span>
            <h2 className="text-xl font-bold text-foreground">{step.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-lg border border-border bg-secondary p-8 text-center">
        <h3 className="text-xl font-bold text-foreground">Készen áll az egyeztetésre?</h3>
        <p className="mt-2 text-sm text-muted-foreground">Keressen minket bizalommal részletes ajánlatért!</p>
        <a
          href="/kapcsolat"
          className="mt-6 inline-block rounded-md bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground hover:bg-brand-dark transition-colors"
        >
          Ajánlatkérés
        </a>
      </div>
    </main>
  );
}
