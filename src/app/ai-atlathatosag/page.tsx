import type { Metadata } from "next";
import Link from "next/link";

import { AiContentLabel } from "@/components/legal/AiContentLabel";
import { AI_ACT, AI_DISCLOSURE_COPY } from "@/config/ai-transparency";
import { SITE_CONFIG } from "@/config/site-config";

export const metadata: Metadata = {
  title: `AI átláthatóság (AI Act 50. cikk) | ${SITE_CONFIG.name}`,
  description:
    "Az EU AI Act 50. cikk szerinti átláthatósági tájékoztató — mesterséges intelligenciával készült vagy módosított tartalmak jelölése vállalkozói (üzembehelyezői) minőségben.",
  other: {
    "ai-act-article": AI_ACT.article,
    "ai-act-applicable-from": AI_ACT.applicableFrom,
  },
};

export default function AiAtlathatosagPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-sm leading-relaxed">
      <h1 className="mb-3 text-2xl font-bold tracking-tight md:text-3xl">
        AI átláthatósági tájékoztató
      </h1>
      <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
        EU AI Act ({AI_ACT.regulation}) · {AI_ACT.article}. cikk · hatály:{" "}
        {AI_ACT.applicableFrom}-től
      </p>
      <p className="mb-8 text-muted-foreground">
        A {SITE_CONFIG.name} vállalkozásként — szakmai tevékenység során — generatív
        MI-rendszerek <strong>üzembehelyezője</strong> (deployer) lehet, amikor MI-vel
        előállított vagy módosított tartalmat tesz közzé. Ez a tájékoztató
        összefoglalja, hogyan felelünk meg az átláthatósági kötelezettségeknek. Az
        üzemeltető teljes cégadatai az{" "}
        <Link href="/aszf" className="underline underline-offset-2">
          ÁSZF
        </Link>
        -ben találhatók.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">1. Miért vonatkozik ránk?</h2>
        <p className="mb-3 text-muted-foreground">
          Az AI Act 50. cikkének átláthatósági szabályai 2026. augusztus 2-től
          alkalmazandók. A kötelezettség a magáncélú használatot meghaladó,
          szakmai / üzleti közzétételre is kiterjed. A Bizottság 2026. júliusi
          iránymutatása és a mesterséges intelligencia által létrehozott tartalmak
          átláthatóságáról szóló gyakorlati kódex részletezi a jelölési elvárásokat.
        </p>
        <ul className="mb-3 list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <strong className="text-foreground">Deepfake / szintetikus média:</strong>{" "}
            MI-vel létrehozott vagy módosított kép, hang vagy videó, amely létező
            (vagy valószerűen létezhető) személyre, helyre, tárgyra vagy eseményre
            hasonlít, és hitelesnek tűnhet — első találkozáskor egyértelműen jelölendő.
          </li>
          <li>
            <strong className="text-foreground">Közérdekű szöveg:</strong> MI-vel
            készült vagy manipulált, a nyilvánosságot tájékoztató szöveg jelölendő,
            ha nem esett át érdemi emberi felülvizsgálaton és szerkesztői
            felelősségvállaláson.
          </li>
          <li>
            <strong className="text-foreground">Chatbot / közvetlen MI-interakció:</strong>{" "}
            ha a látogató közvetlenül MI-rendszerrel kommunikál, erről a kapcsolat
            kezdetén tájékoztatni kell. (A {SITE_CONFIG.name} jelenlegi nyilvános
            oldala nem üzemeltet ügyfélchatbotot.)
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">2. Mit nem kell kötelezően jelölni?</h2>
        <p className="mb-3 text-muted-foreground">
          A tisztán magáncélú tartalom, valamint az olyan marketing- / szakmai szöveg,
          amely <strong className="text-foreground">érdemi emberi felülvizsgálaton</strong>{" "}
          esett át és van szerkesztői felelősségvállalás, a szövegjelölési kötelezettség
          alól mentesülhet. A felületes helyesírás-ellenőrzés önmagában nem elég.
        </p>
        <p className="mb-3 text-muted-foreground">
          A {SITE_CONFIG.name} stratégiája: a közzétett üzleti szövegeket lehetőség
          szerint emberi szerkesztéssel véglegesítjük; ahol ez nem történt meg, vagy
          szintetikus média deepfake-kritériumoknak felel meg, látható jelölést
          alkalmazunk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">3. Jelöléseink a honlapon</h2>
        <p className="mb-4 text-muted-foreground">
          A tartalmak mellett az alábbi címkéket használjuk (embernek szóló, első
          találkozáskor látható tájékoztatás + géppel olvasható{" "}
          <code className="rounded bg-muted px-1">data-ai-disclosure</code> attribútum):
        </p>
        <div className="space-y-3">
          <AiContentLabel kind="generated" showPolicyLink={false} />
          <AiContentLabel kind="modified" showPolicyLink={false} />
          <AiContentLabel kind="assisted" showPolicyLink={false} />
        </div>
        <p className="mt-4 text-muted-foreground">
          Géppel olvasható értékek:{" "}
          {Object.values(AI_DISCLOSURE_COPY)
            .map((c) => c.machineValue)
            .join(", ")}
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">4. Blog és marketingtartalom</h2>
        <p className="mb-3 text-muted-foreground">
          A blogbejegyzések front matter mezőjében rögzítjük az{" "}
          <code className="rounded bg-muted px-1">aiDisclosure</code> értéket (
          <code className="rounded bg-muted px-1">none</code> /{" "}
          <code className="rounded bg-muted px-1">assisted</code> /{" "}
          <code className="rounded bg-muted px-1">generated</code> /{" "}
          <code className="rounded bg-muted px-1">modified</code>
          ). A <code className="rounded bg-muted px-1">generated</code> és{" "}
          <code className="rounded bg-muted px-1">modified</code> tartalmaknál a
          cikk tetején kötelező jellegű tájékoztató jelenik meg.
        </p>
        <p className="mb-3 text-muted-foreground">
          A főoldali szolgáltatás- és katalógusleírások célja emberi szerkesztésű /
          szakmai forrásanyag; ahol AI-vázlat maradt, azt emberi szerkesztői
          felelősség mellett <em>assisted</em> kategóriába soroljuk. A blog
          illusztrációinál, ha a kép szintetikus és hitelesnek tűnhet,{" "}
          <em>modified</em> jelölést alkalmazunk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">5. Hivatalos források</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <a
              href={AI_ACT.guidelinesUrl}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Bizottsági GYIK — AI Act 50. cikk
            </a>
          </li>
          <li>
            <a
              href={AI_ACT.codeOfPracticeUrl}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              Gyakorlati kódex a MI-tartalmak átláthatóságáról
            </a>
          </li>
          <li>
            <a
              href={AI_ACT.iconsUrl}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              EU jelölőikonok (opcionális)
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-semibold">6. Kapcsolat</h2>
        <p className="text-muted-foreground">
          Kérdés az AI-jelöléssel vagy tartalom eredetével kapcsolatban:{" "}
          <a
            href={`mailto:${SITE_CONFIG.publicEmail}`}
            className="underline underline-offset-2"
          >
            {SITE_CONFIG.publicEmail}
          </a>
          . Lásd még:{" "}
          <Link href="/adatvedelem" className="underline underline-offset-2">
            Adatvédelmi tájékoztató
          </Link>
          ,{" "}
          <Link href="/aszf" className="underline underline-offset-2">
            ÁSZF
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
