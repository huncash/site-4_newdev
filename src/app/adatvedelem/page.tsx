import type { Metadata } from "next";
import Link from "next/link";

import { SITE_CONFIG } from "@/config/site-config";

export const metadata: Metadata = {
  title: `Adatvédelmi tájékoztató | ${SITE_CONFIG.name}`,
  description:
    "A Rendezvényárnyékolás adatkezelési tájékoztatója — GDPR szerinti tájékoztatás a kapcsolatfelvételhez és elektronikus ügymenetéhez szükséges adatokról.",
};

const SECTIONS = [
  {
    title: "1. Adatkezelő",
    body: [
      "Az adatkezelő / üzemeltető teljes cégadatai az Általános Szerződési Feltételekben (ÁSZF) szerepelnek.",
      `Kapcsolat: ${SITE_CONFIG.publicEmail}`,
    ],
  },
  {
    title: "2. Az adatkezelés célja",
    body: [
      "Kapcsolatfelvétel, ajánlatkérés és -adás, megrendelés / szolgáltatás teljesítése, ügyintézés.",
      "Hatékony, lehetőség szerint teljes egészében elektronikus kommunikáció és ügymenet (e-mail, online űrlap, elektronikus dokumentumok).",
      "A weboldal alapműködéséhez szükséges technikai (pl. munkamenet-, biztonsági, beleegyezés-tároló) cookie-k kezelése.",
    ],
  },
  {
    title: "3. Kezelt adatok köre — csak a legszükségesebb",
    body: [
      "Kapcsolatfelvételkor: név, e-mail-cím, telefonszám (ha megadja), cégnév / szervezet (ha releváns), üzenet tartalma, valamint a kérés teljesítéséhez elengedhetetlen egyéb adat.",
      "Nem gyűjtünk marketingprofilozáshoz vagy harmadik félnek történő értékesítéshez személyes adatokat.",
      "Nem használunk jelenleg analitikai vagy reklám cookie-kat; ha ez a jövőben változna, előzetes, külön hozzájárulást kérünk.",
    ],
  },
  {
    title: "4. Jogalap (GDPR)",
    body: [
      "Kapcsolatfelvétel / ajánlatkérés: az érintett hozzájárulása (GDPR 6. cikk (1) a)), illetve a szerződés megkötését megelőző lépések (6. cikk (1) b)).",
      "Szerződés teljesítése, számlázás, jogi kötelezettségek: GDPR 6. cikk (1) b) és c).",
      "Weboldal működéséhez szükséges cookie-k és a beleegyezés tárolása: jogos érdek / hozzájárulás rögzítése (6. cikk (1) f) / a)).",
    ],
  },
  {
    title: "5. Adatmegőrzés",
    body: [
      "Kapcsolatfelvételi üzenetek: a megkeresés lezárásáig, illetve legfeljebb 24 hónapig — hacsak a szerződéses vagy számviteli kötelezettség hosszabb megőrzést nem ír elő.",
      "Szerződéses és számlázási adatok: a vonatkozó jogszabályok szerinti megőrzési ideig.",
      "Beleegyezési nyilatkozat (böngésző localStorage): a felhasználó törléséig vagy a beleegyezés visszavonásáig.",
    ],
  },
  {
    title: "6. Adattovábbítás",
    body: [
      "Az adatokat csak a szolgáltatás teljesítéséhez szükséges mértékben, megbízható adatfeldolgozóknak (pl. tárhely, e-mail, számlázás) továbbítjuk, szerződéses garanciák mellett.",
      "Harmadik országba csak megfelelő garanciák mellett kerülhet sor adattovábbításra.",
    ],
  },
  {
    title: "7. Cookie-k és a beleegyező sáv",
    body: [
      "A weboldal első megnyitásakor alsó sávban kérünk beleegyezést. A „Elfogadom” gombbal Ön tudomásul veszi a tájékoztatást, és hozzájárul a szükséges adatkezeléshez / cookie-khoz.",
      "A beleegyezést a böngésző localStorage-jában tároljuk (rendezvenyarnyekolas-gdpr-consent), hogy ne kelljen minden alkalommal újra megjeleníteni a sávot.",
      "A partner belépéshez szükséges munkamenet-cookie-k a szolgáltatás működéséhez kellenek.",
      "Marketing- vagy analitikai cookie-kat csak előzetes hozzájárulással indítunk, ha egyáltalán.",
    ],
  },
  {
    title: "8. Érintetti jogok",
    body: [
      "Hozzáférés, helyesbítés, törlés, korlátozás, adathordozhatóság, tiltakozás, valamint a hozzájárulás bármikori visszavonása (a visszavonás nem érinti a korábbi jogszerű adatkezelést).",
      `Joggyakorlás: ${SITE_CONFIG.publicEmail}`,
      "Panasz: Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) — https://www.naih.hu",
    ],
  },
  {
    title: "9. Biztonság",
    body: [
      "Az adatokat a technika mindenkori állásának megfelelő, ésszerű technikai és szervezési intézkedésekkel védjük a jogosulatlan hozzáférés, elvesztés vagy megváltoztatás ellen.",
    ],
  },
  {
    title: "10. Mesterséges intelligencia (EU AI Act 50. cikk)",
    body: [
      "Ha mesterséges intelligenciával állítunk elő vagy módosítunk nyilvános tartalmat vállalkozói minőségben, az EU AI Act (2024/1689) 50. cikkének átláthatósági szabályait alkalmazzuk (2026. augusztus 2-től).",
      "A részletes jelölési gyakorlatot, a deepfake / közérdekű szöveg szabályokat és a blog front matter mezőket az AI átláthatósági tájékoztató tartalmazza.",
    ],
  },
] as const;

export default function AdatvedelemPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
      <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
        Adatvédelmi tájékoztató
      </h1>
      <p className="mb-8 text-muted-foreground">
        Hatályos: 2026. A {SITE_CONFIG.name} a GDPR (2016/679/EU) és a vonatkozó magyar
        jogszabályok szerint tájékoztatja az érintetteket. Kapcsolódó dokumentumok:{" "}
        <Link href="/aszf" className="underline underline-offset-2">
          ÁSZF
        </Link>
        ,{" "}
        <Link href="/ai-atlathatosag" className="underline underline-offset-2">
          AI átláthatóság
        </Link>
        .
      </p>

      {SECTIONS.map((section) => (
        <section key={section.title} className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="mb-3 text-muted-foreground">
              {paragraph}
            </p>
          ))}
          {section.title === "1. Adatkezelő" ? (
            <p className="mb-3 text-muted-foreground">
              <Link href="/aszf" className="underline underline-offset-2">
                ÁSZF — üzemeltetői adatok →
              </Link>
            </p>
          ) : null}
          {section.title.startsWith("10.") ? (
            <p className="mb-3 text-muted-foreground">
              <Link href="/ai-atlathatosag" className="underline underline-offset-2">
                AI átláthatósági tájékoztató megnyitása →
              </Link>
            </p>
          ) : null}
        </section>
      ))}
    </article>
  );
}
