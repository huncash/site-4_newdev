// Termékhez tartozó "Fluoreszkáló dekor ponyvához ajánlott?" és
// "Milyen rendezvény világítási feladatra javasoljuk?" összefoglaló.
//
// A logika szándékosan adat-vezérelt: a katalógus termék slug-ja,
// kategóriája és műszaki adatai alapján származtatott — így új tétel
// felvételénél automatikusan jól besorolódik, kézi felülbírálás nélkül.

import type { Product } from "@/data/catalog";

export type TarpFit = "ideal" | "good" | "limited" | "accessory" | "not-applicable";

export type LightingRecommendation = {
  /** Dekor ponyva (UV-aktív festett / printed lycra) megvilágítására való alkalmasság. */
  tarpFit: TarpFit;
  /** Egy mondat a fluoreszkáló ponyva alá ajánláshoz. */
  tarpFitNote: string;
  /** Tipikus rendezvény világítási feladatok, ahol a tétel jól teljesít. */
  bestFor: string[];
  /** Nem javasolt vagy korlátozott felhasználás. */
  notFor?: string[];
};

const TARP_FIT_LABEL: Record<TarpFit, string> = {
  ideal: "Kiválóan alkalmas",
  good: "Alkalmas",
  limited: "Korlátozottan alkalmas",
  accessory: "Kiegészítő — nem fényforrás",
  "not-applicable": "Nem értelmezhető",
};

const TARP_FIT_TONE: Record<TarpFit, string> = {
  ideal:
    "border-emerald-600/40 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200",
  good: "border-sky-600/40 bg-sky-500/10 text-sky-900 dark:text-sky-200",
  limited:
    "border-amber-600/40 bg-amber-500/10 text-amber-900 dark:text-amber-200",
  accessory:
    "border-violet-600/40 bg-violet-500/10 text-violet-900 dark:text-violet-200",
  "not-applicable": "border-border bg-muted/40 text-muted-foreground",
};

export function tarpFitLabel(fit: TarpFit): string {
  return TARP_FIT_LABEL[fit];
}

export function tarpFitTone(fit: TarpFit): string {
  return TARP_FIT_TONE[fit];
}

export function getLightingRecommendation(p: Product): LightingRecommendation {
  const slug = p.slug;
  const name = p.name.toLowerCase();
  const specsBlob = Object.values(p.specs).join(" ").toLowerCase();
  const isRental = p.offerType === "rental";

  // 1) Bérelhető ponyvák — maga a megvilágítandó felület.
  if (isRental) {
    return {
      tarpFit: "not-applicable",
      tarpFitNote:
        "Ez maga a dekor ponyva — a fluoreszkálását a katalógusban szereplő UV fényforrásokkal lehet előhívni. A festék / nyomat 365–395 nm UV-A tartományban reagál.",
      bestFor: [
        "Tánctér, klub, koncert hangulati dekor felülete",
        "Fesztivál, alapítványi ünnepség látványeleme",
        "Beltéri / kültéri tér karakteres lezárása",
      ],
    };
  }

  // 2) Gaffa tape és bélyegzőtinta — nem fényforrás, hanem UV-aktív jelölő.
  if (slug.startsWith("gaffa-tape-") || slug.startsWith("eurolite-uv-stamp-ink-")) {
    const isTape = slug.startsWith("gaffa-tape-");
    return {
      tarpFit: "accessory",
      tarpFitNote: isTape
        ? "Nem fényforrás — a dekor ponyva UV megvilágításában fluoreszkál a neon szín. Vendégút, kábelrögzítés, biztonsági jelölés látványos kiemelésére."
        : "Nem fényforrás — UV-aktív tinta, ami csak UV fényben világít. A dekor ponyva alatti UV jelenetben láthatóvá válik a vendég kézfején / karszalagján.",
      bestFor: isTape
        ? [
            "Beléptetési útvonal, lépcső, kábel jelölése",
            "Színpad/tánctér perem kiemelése",
            "Backstage és technikai zóna jelölése",
          ]
        : [
            "Beléptetés, karszalag-mentes vendég jelölés",
            "Re-entry pecsételés fesztiválon, klubban",
            "VIP / zóna szintű hozzáférés diszkrét jelzése",
          ],
      notFor: ["Felület megvilágítása — ehhez UV reflektor szükséges"],
    };
  }

  // 3) UV fényforrások — teljesítmény és vezérelhetőség alapján sorolva.
  const watts = extractWatts(name, specsBlob);
  const isTrue365 = /365\s?nm/.test(name) || /365\s?nm/.test(specsBlob);
  const isDmx = /dmx/.test(specsBlob);
  const isIp65 = /ip\s?65/.test(specsBlob);
  const isOutdoor = isIp65 || /ip\s?54/.test(specsBlob);
  const isBar = /bar|leiste|léc|trusslight|tl-?\d/.test(name);
  const isBulb = /e-?27|gu-?10|mr-?16|par-?\d+|strahler/.test(name) &&
    !/ip\s?par/.test(name);
  const isFloor = /sls|floor|padló/.test(name);

  // 3a) Valódi 365 nm PRO — referencia minőség.
  if (isTrue365) {
    return {
      tarpFit: "ideal",
      tarpFitNote:
        "365 nm-es valódi UV-A — ez adja a leglátványosabb, legtisztább fluoreszcenciát kézzel festett és printed lycra ponyván. Lila/kék mellékfény minimális.",
      bestFor: [
        "Kiemelt jelenet kézzel festett ponyva alatt",
        "Fotózásra szánt UV beállás, kampányfotó",
        "Premium klub és koncert tánctér",
      ],
      notFor: [
        "Olcsó upsell pozíció — ez prémium kategória",
      ],
    };
  }

  // 3b) Nagyobb teljesítményű, vezérelt vagy IP65 reflektorok.
  if ((watts ?? 0) >= 50 || (isDmx && (watts ?? 0) >= 30)) {
    return {
      tarpFit: "ideal",
      tarpFitNote:
        "Nagy felületű (több m²-es) ponyvához is elegendő UV-A teljesítmény. 395 nm-es LED — a fluoreszkáló festék jól reagál rá, némi kék mellékfénnyel.",
      bestFor: [
        "Több m²-es ponyva folyamatos / vezérelt UV alapfénye",
        "Fesztivál tánctere, koncert háttér",
        isOutdoor ? "Kültéri telepítés, esős helyszín" : "Beltéri nagyrendezvény",
        isDmx ? "Fénypultból szinkronizált jelenetek" : "Egyszerű, kapcsolós üzem",
      ],
    };
  }

  // 3c) Sávszerű világítás (bar / léc / trusslight) — perem és kontúr.
  if (isBar) {
    return {
      tarpFit: "good",
      tarpFitNote:
        "Sávszerű UV fényforrás — kifeszített ponyva alsó vagy felső éle mentén futtatva kontúrfényt ad, nem teljes felület megvilágítást.",
      bestFor: [
        "Ponyva, színpadi keret, truss kontúr UV megvilágítása",
        "Beléptető folyosó, fotófal háttér",
        "Több sáv szinkronban, lineáris jelenet",
      ],
      notFor: ["Nagy felület egyenletes megvilágítása — ehhez reflektor kell"],
    };
  }

  // 3d) Padló-spotok / SLS — alulról, lokálisan.
  if (isFloor) {
    return {
      tarpFit: "good",
      tarpFitNote:
        "Padlóról fölfelé világító UV spot — kifeszített ponyva alatt lokális jelenetet hoz létre, de teljes felület megvilágítására több egységre van szükség.",
      bestFor: [
        "Klub / mobil DJ szett",
        "Tánctér helyi UV jelenet",
        "Vezérelt fluoreszkáló pillanatok",
      ],
      notFor: ["Kültéri állandó használat", "Nagy ponyva távoli megvilágítása"],
    };
  }

  // 3e) Hagyományos foglalatú égők és kis 5–10 W reflektorok.
  if (isBulb || (watts !== null && watts <= 10)) {
    return {
      tarpFit: "limited",
      tarpFitNote:
        "Kis teljesítményű UV fényforrás — hangulati kiegészítőként jó, nagy ponyva felületre önmagában kevés. Több darab elosztva, közeli pozícióban használjuk.",
      bestFor: [
        "Bárpult, beléptető, fotósarok UV-aktív kiegészítője",
        "Meglévő lámpatestbe (E27 / GU10 / MR16) becserélt UV izzó",
        "Költségkeretes belépő szintű upsell",
      ],
      notFor: [
        "Önálló főfény dekor ponyva alá",
        "Kültéri, esős környezet (ha nem IP-besorolt)",
      ],
    };
  }

  // 3f) Általános közepes UV reflektor (~10–30 W, nem vezérelt).
  return {
    tarpFit: "good",
    tarpFitNote:
      "Közepes teljesítményű 395 nm-es UV reflektor — kis és közepes ponyvához önállóan, nagyobb felülethez 2–3 darab kombinálva ajánlott.",
    bestFor: [
      "Közepes dekor ponyva folyamatos UV alapfénye",
      "Bejárati zóna, dekor sarok, homlokzat kiemelés",
      isOutdoor ? "Kültéri, fedett vagy permetnek kitett pozíció" : "Beltéri állandó telepítés",
    ],
    notFor: ["Vezérelt, jelenetekre bontott fénykép — ahhoz DMX-es PAR"],
  };
}

function extractWatts(name: string, specs: string): number | null {
  const m = `${name} ${specs}`.match(/(\d{1,3})\s?w(?!h)/i);
  return m ? Number(m[1]) : null;
}
