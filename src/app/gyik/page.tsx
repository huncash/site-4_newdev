import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GYIK — Gyakori Kérdések | Rendezvényárnyékolás",
  description: "Gyakori kérdések és válaszok a rendezvénydekorációról, lycra ponyvák bérléséről, telepítésről és feltételekről.",
};

const faqs = [
  {
    q: "Hogyan működik a rendezvénydekoráció bérlése?",
    a: "Előzetes egyeztetés alapján kiválasztjuk a rendezvényhez illő dekoratív vagy árnyékoló elemeket. Csapatunk vállalja a helyszíni telepítést, majd az esemény végeztével a bontást is."
  },
  {
    q: "Esőállók-e a lycra dekorponyvák?",
    a: "A lycra hálós dekorponyvák elsősorban árnyékolásra, vizuális élménykeltésre és térformálásra szolgálnak, nem esőállók. Amennyiben vízhatlan lefedésre van szükség, ahhoz külön kérésre vízhatlan ponyvaelemeket vagy sátormegoldásokat biztosítunk."
  },
  {
    q: "Milyen helyszínekre telepíthetők a ponyvák?",
    a: "Gyakorlatilag bármilyen kültéri és beltéri helyszínre: fák közé, épülethomlokzatok közé, fesztiválszínpadok fölé, belvárosi sétálóutcákba, vagy zárt rendezvénytermekbe."
  },
  {
    q: "Mennyivel a rendezvény előtt érdemes ajánlatot kérni?",
    a: "A nyári fesztiválszezonra érdemes legalább 2-4 héttel előre lefoglalni az elemeket. Egyedi gyártási vagy tervezési igény esetén még több átfutási idő javasolt."
  },
  {
    q: "Miből tevődik össze a bérleti díj?",
    a: "A díj a bérelt felület méretétől és típusától, a helyszíni telepítés/bontás munkaóra-igényétől, valamint a szállítási távolságtól függ. Minden esetben egyedi árajánlatot adunk."
  }
];

export default function GyikPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Tudnivalók</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Gyakori Kérdések (GYIK)</h1>
        <p className="mt-3 text-slate-400">
          Minden, amit a rendezvénydekorációs és árnyékolási szolgáltatásainkról tudni érdemes.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, idx) => (
          <article key={idx} className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-white">{faq.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{faq.a}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-lg border border-sky-500/30 bg-slate-900 p-8 text-center">
        <h3 className="text-xl font-bold text-white">Nem találta meg a választ a kérdésére?</h3>
        <p className="mt-2 text-sm text-slate-400">Írjon nekünk közvetlenül, és 24 órán belül válaszolunk.</p>
        <a
          href="/kapcsolat"
          className="mt-6 inline-block rounded-md bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-sky-300 transition-colors"
        >
          Kapcsolatfelvétel
        </a>
      </div>
    </main>
  );
}
