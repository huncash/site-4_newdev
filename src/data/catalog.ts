// Katalógus — bérelhető dekor ponyvák és rendezvény tartozékok.
// A struktúra a projektorlampacsere.hu mintából került átemelésre, hogy a
// kettős CTA (fix ár vs. egyedi ajánlatkérés) mindkét profil alatt egységes
// élményt adjon. A tartalom teljesen egyedi, és kézi szerkesztéssel bővül.

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  /** Rövid alcím, a kategória bal felső sarkában megjelenő technológiai/üzleti címke. */
  tagline: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Belső azonosító (cikkszám / készlet ID). Bérlésnél is hasznos referencia ajánlatban. */
  sku: string;
  categorySlug: string;
  /** Borítókép URL-je — CDN vagy statikus kép. */
  coverImage?: string;
  /** Kép alt szöveg. */
  coverImageAlt?: string;
  /** UV-megvilágítás alatti aktivált szín bemutató kép (fluoreszkáló termékeknél). */
  uvActiveImage?: string;
  /** UV-aktív kép alt szövege. */
  uvActiveImageAlt?: string;
  /** További termékképek (gyártói galéria, alkalmazási példák). A borítókép és UV-aktív kép automatikusan a galéria elejére kerül. */
  gallery?: { src: string; alt: string; caption?: string }[];

  /** A bérleti vagy értékesítési egység rövid leírása. */
  shortDescription: string;
  /** Fő paraméterek a termékkártyán: pl. "8 × 6 m", "54 W RGBW + UV". */
  primaryAttribute: string;
  /** Másodlagos paraméter: pl. „kézzel festett, organikus minta", „IP65, DMX". */
  secondaryAttribute: string;
  /** Tipikus alkalmazási területek listája. */
  useCases: string[];
  /** Részletes műszaki adatlap. */
  specs: Record<string, string>;
  /**
   * Bérlés vs. értékesítés:
   * - "rental": dekor ponyvák, funkcionális ponyvák — időpontfoglalással, egyedi árajánlattal.
   * - "sale": tartozékok (UV lámpák, spotok) — fix nettó listaárral, készletről.
   */
  offerType: "rental" | "sale";
  /**
   * Fix listaár nettó Ft-ban. Csak "sale" típusnál releváns.
   * Ha hiányzik, az egyedi ajánlatkérés CTA jelenik meg.
   */
  featuredPrice?: {
    netHuf: number;
    /** Egységcímke a kártyán: pl. "/ db", "/ alkalom". */
    unit?: string;
  };
  /**
   * Opcionális akciós nettó ár. Ha van, a `featuredPrice` mint „Katalógus ár”
   * halványítva jelenik meg, alatta kiemelve az akciós ár, és a megtakarítás
   * (Ft/db + %).
   */
  salePrice?: {
    netHuf: number;
    unit?: string;
  };

};

export const categories: Category[] = [
  {
    slug: "berelheto-ponyvak",
    name: "Bérelhető dekor és funkcionális ponyvák",
    shortName: "Ponyvák",
    tagline: "Rendezvényre, időpontfoglalással",
    description:
      "Kifeszíthető, egyedi festésű és nyomtatott lycra dekor ponyvák, valamint nehéz, kamion-ponyva alapú funkcionális (eső- és szélálló) elemek. Bérlés helyszíni telepítéssel és bontással, egyedi árajánlat alapján — a rendezvény dátumára előfoglalható.",
  },
  {
    slug: "tartozekok",
    name: "Rendezvény tartozékok és UV világítás",
    shortName: "Tartozékok",
    tagline: "Készletről, fix listaáron",
    description:
      "A dekor ponyvák megvilágításához ajánlott UV fényforrások: vezérelhető IP védettségű UV PAR spotok eseti hangulatváltáshoz, és olcsóbb, nem vezérelhető kültéri UV blacklight lámpák egyszerű, folyamatos megvilágításra. Készletről, áfás számlával.",
  },
];

export const products: Product[] = [
  // ---- Bérelhető ponyvák ----
  {
    slug: "kezzel-festett-csillag-6m",
    name: "Csillag I. — kézzel festett dekor ponyva",
    sku: "PNY-HAND-STAR-6",
    categorySlug: "berelheto-ponyvak",
    coverImage: "/__l5e/assets-v1/9530f2eb-12e4-4b41-a594-0a545cf2a70e/rendezvenyarnyekolas-day-field.png",
    coverImageAlt: "Nappali dekor ponyva kifeszítve fák között rendezvény helyszínen",
    shortDescription:
      "Hatszögletű csillag formára kifeszíthető elasztikus dekor ponyva organikus motívumokkal. Fák, oszlopok vagy állványzat közé feszítve, alulnézetből látványos geometria.",
    primaryAttribute: "6 m átmérő",
    secondaryAttribute: "Kézzel festett, organikus minta",
    useCases: [
      "Fák közé feszített tánctér fölé",
      "Alapítványi és városi ünnepségek",
      "Kisebb klubrendezvények, koncertek",
    ],
    specs: {
      Anyag: "Elasztikus lycra, kézzel festett akrilfestékkel",
      "Kifeszített forma": "Csillag, 6–8 rögzítési ponttal",
      "Tipikus felület": "≈ 25–30 m²",
      "Eső állóság": "Nem esőálló — dekor és árnyékoló funkció",
      "UV reakció": "A festék részben UV-aktív",
      "Telepítési idő": "1–2 óra (saját csapat)",
    },
    offerType: "rental",
  },
  {
    slug: "printed-lycra-spiral-15x15",
    name: "Spiral M — printed lycra dekor ponyva",
    sku: "PNY-PRINT-SPIRAL-1515",
    categorySlug: "berelheto-ponyvak",
    coverImage: "/__l5e/assets-v1/9530f2eb-12e4-4b41-a594-0a545cf2a70e/rendezvenyarnyekolas-day-field.png",
    coverImageAlt: "Nappali dekor ponyva kifeszítve fák között rendezvény helyszínen",
    shortDescription:
      "Digitálisan nyomtatott lycra dekor ponyva spirál mintával. Nagy felületre is feszíthető, élénk színekkel hozza vissza a teret estére.",
    primaryAttribute: "15 × 15 m",
    secondaryAttribute: "Digitálisan nyomtatott, UV-aktív",
    useCases: [
      "Fesztivál és klubrendezvények tánctere fölé",
      "Sétáló utcák, homlokzatok közé feszítve",
      "Vállalati rendezvény hangulati elem",
    ],
    specs: {
      Anyag: "Stretch lycra, szublimált digitális nyomat",
      "Kifeszített forma": "Trapéz / négyszög, 6–8 rögzítési pont",
      "Tipikus felület": "≈ 225 m²",
      "Eső állóság": "Nem esőálló — dekor funkció",
      "UV reakció": "Erős, a teljes minta világít UV alatt",
      "Telepítési idő": "3–5 óra (saját csapat)",
    },
    offerType: "rental",
  },
  // ---- Tartozékok (értékesítés) ----
  // ---- (Korábbi generikus UV PAR és kültéri blacklight tételek eltávolítva
  //       — helyettük az alábbi konkrét Eurolite / Steinigke típusok szerepelnek.) ----

  {
    slug: "uv-floodlight-fl10-smd",
    name: "Eurolite LED IP FL-10 SMD UV reflektor",
    sku: "ACC-EUR-FL10-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl10-smd.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Kompakt, nem vezérelhető kültéri UV reflektor SMD LED-ekkel. Kis dekor ponyva vagy bejárati zóna folyamatos megvilágítására. IP65, halk passzív hűtés.",
    primaryAttribute: "10 W SMD UV-A",
    secondaryAttribute: "IP65, nem vezérelhető",
    useCases: [
      "Kis ponyva folyamatos UV megvilágítása",
      "Bejárati zóna, dekor sarok",
      "Belépő szintű upsell tartozék",
    ],
    specs: {
      Fényforrás: "10 W SMD UV-A LED (395 nm)",
      Védettség: "IP65 — tartós kültéri pozíció",
      Vezérlés: "Nincs, kapcsolós (külső időzítővel kombinálható)",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      "Nyaláb szög": "120° (széles)",
      Súly: "~ 0,9 kg",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 19700 },
  },
  {
    slug: "uv-floodlight-fl30-smd",
    name: "Eurolite LED IP FL-30 SMD UV reflektor",
    sku: "ACC-EUR-FL30-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl30-smd.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Közepes méretű, nem vezérelhető kültéri UV reflektor — szélesebb fényelosztással. Közepes dekor ponyva vagy fa csoport egyszerű, folyamatos megvilágítására.",
    primaryAttribute: "30 W SMD UV-A",
    secondaryAttribute: "IP65, nem vezérelhető",
    useCases: [
      "Közepes ponyva folyamatos megvilágítása",
      "Fa, oszlop, homlokzat kiemelése",
      "Hangulatfény fix telepítéssel",
    ],
    specs: {
      Fényforrás: "30 W SMD UV-A LED (395 nm)",
      Védettség: "IP65 — tartós kültéri pozíció",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      "Nyaláb szög": "120°",
      Súly: "~ 1,4 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 44300 },
  },
  {
    slug: "uv-floodlight-fl50-smd",
    name: "Eurolite LED IP FL-50 SMD UV reflektor",
    sku: "ACC-EUR-FL50-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl50-smd.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Nagy felület megvilágítására ajánlott, nem vezérelhető kültéri UV reflektor — alacsony költségen erős háttér UV-aktivitás.",
    primaryAttribute: "50 W SMD UV-A",
    secondaryAttribute: "IP65, nem vezérelhető",
    useCases: [
      "Nagy ponyva vagy több ponyva együtt",
      "Fesztivál főtánctere fix UV alappal",
      "Hosszabb rendezvénysorozat folyamatos világítása",
    ],
    specs: {
      Fényforrás: "50 W SMD UV-A LED (395 nm)",
      Védettség: "IP65",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      "Nyaláb szög": "120°",
      Súly: "~ 1,8 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 63500 },
  },
  {
    slug: "uv-floodlight-fl100-smd",
    name: "Eurolite LED IP FL-100 SMD UV reflektor",
    sku: "ACC-EUR-FL100-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl100-smd.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "A FL-SMD sorozat legerősebb tagja: koncert- és táncter méretű felületek folyamatos UV megvilágítására. Nem vezérelhető, kapcsolós indítás.",
    primaryAttribute: "100 W SMD UV-A",
    secondaryAttribute: "IP65, nem vezérelhető",
    useCases: [
      "Koncert / nagyrendezvény tánctere",
      "Több ponyva együttes UV bázis fénye",
      "Vezérelt UV PAR spotok mellé háttér megvilágítás",
    ],
    specs: {
      Fényforrás: "100 W SMD UV-A LED (395 nm)",
      Védettség: "IP65",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      "Nyaláb szög": "120°",
      Súly: "~ 2,8 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 93000 },
  },
  // ---- Eurolite LED IP FL-COB UV (kültéri COB UV reflektorok) ----
  {
    slug: "uv-floodlight-fl10-cob",
    name: "Eurolite LED IP FL-10 COB UV reflektor",
    sku: "ACC-EUR-FL10-COB-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl10-cob.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Wetterfest IP54 kültéri UV reflektor 10 W COB UV LED-del — koncentráltabb, mélyebb UV nyaláb, mint az SMD változatnál. Kis dekor ponyvához.",
    primaryAttribute: "10 W COB UV-A",
    secondaryAttribute: "IP54, nem vezérelhető",
    useCases: [
      "Kis ponyva intenzívebb UV megvilágítása",
      "Belépő, dekor sarok",
      "SMD reflektor melletti kontraszt fény",
    ],
    specs: {
      Fényforrás: "10 W COB UV-A LED (395 nm)",
      Védettség: "IP54",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Súly: "~ 0,9 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 24700 },
  },
  {
    slug: "uv-floodlight-fl30-cob",
    name: "Eurolite LED IP FL-30 COB UV reflektor",
    sku: "ACC-EUR-FL30-COB-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl30-cob.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "30 W COB UV LED-es kültéri reflektor IP54 védettséggel. Közepes felület mély UV megvilágítására, ha az SMD szórás kevés.",
    primaryAttribute: "30 W COB UV-A",
    secondaryAttribute: "IP54, nem vezérelhető",
    useCases: [
      "Közepes ponyva koncentrált UV alapfény",
      "Fa, oszlop kiemelése",
      "Vezérelt PAR spot mellé háttér",
    ],
    specs: {
      Fényforrás: "30 W COB UV-A LED (395 nm)",
      Védettség: "IP54",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Súly: "~ 1,4 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 58800 },
  },
  {
    slug: "uv-floodlight-fl50-cob",
    name: "Eurolite LED IP FL-50 COB UV reflektor",
    sku: "ACC-EUR-FL50-COB-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-floodlight-fl50-cob.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "50 W COB UV LED-es IP65 kültéri reflektor. Nagy felület mélyfény UV megvilágítására, tartós kültéri pozícióban.",
    primaryAttribute: "50 W COB UV-A",
    secondaryAttribute: "IP65, nem vezérelhető",
    useCases: [
      "Nagy ponyva intenzív UV alap",
      "Hosszabb rendezvénysorozat",
      "Színpad / tánctér háttér UV",
    ],
    specs: {
      Fényforrás: "50 W COB UV-A LED (395 nm)",
      Védettség: "IP65",
      Vezérlés: "Nincs, kapcsolós",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Súly: "~ 1,9 kg",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 88400 },
  },
  // ---- Vezérelhető UV PAR / Floor ----
  {
    slug: "uv-ip-par-9-365nm",
    name: "Eurolite LED IP PAR 9 UV Spot (365 nm, PRO)",
    sku: "ACC-EUR-IP-PAR-9-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-ip-par-9-365nm.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Professzionális, IP65 védettségű UV spot 9 db valódi 365 nm UV-A LED-del — a legtisztább, leglátványosabb fluoreszcencia. Fernbedienung tartozék.",
    primaryAttribute: "9 × UV-A LED (365 nm)",
    secondaryAttribute: "IP65, PRO, távirányító",
    useCases: [
      "Élesebb, mélyebb UV reakció printed / kézzel festett ponyván",
      "Kültéri tánctér, koncert",
      "Vezérelt fényképi minőségű hatás",
    ],
    specs: {
      Fényforrás: "9 × UV-A LED (365 nm — valódi PRO hullámhossz)",
      Védettség: "IP65",
      Vezérlés: "Beépített módok + IR távirányító",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 246500 },
  },
  {
    slug: "uv-sls-30-cob-floor",
    name: "Eurolite LED SLS-30 COB UV Floor (DMX)",
    sku: "ACC-EUR-SLS-30-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-sls-30-cob-floor.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Kompakt 30 W COB UV padlóreflektor DMX vezérléssel és IR távirányítóval. Beltéri rendezvényre, dekor ponyva alatti UV jelenetekhez.",
    primaryAttribute: "30 W COB UV-A",
    secondaryAttribute: "DMX-512 + IR távirányító, beltéri",
    useCases: [
      "Beltéri tánctér UV reflektor",
      "Vezérelt jelenetek fényhajóban",
      "Mobil DJ / klub szett",
    ],
    specs: {
      Fényforrás: "30 W COB UV-A LED (395 nm)",
      Védettség: "IP20 (beltér)",
      Vezérlés: "DMX-512, hang, auto, IR távirányító",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 48900 },
  },
  {
    slug: "uv-theatre-cob-100",
    name: "Eurolite LED Theatre COB 100 UV reflektor",
    sku: "ACC-EUR-THEATRE-100-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-theatre-cob-100.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "100 W COB UV-A színházi reflektor — nagy felületre vetített, lágy UV mező. Színpad és nagyobb dekor ponyva háttér megvilágítására.",
    primaryAttribute: "100 W COB UV-A",
    secondaryAttribute: "Színházi reflektor, beltéri",
    useCases: [
      "Színpad háttér UV mező",
      "Nagy ponyva belső térben",
      "Színházi / esemény világítás",
    ],
    specs: {
      Fényforrás: "100 W COB UV-A LED",
      Védettség: "IP20 (beltér)",
      Vezérlés: "DMX-512",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 113100 },
  },
  // ---- UV bar / trusslight ----
  {
    slug: "uv-bar-18-3w",
    name: "Eurolite LED BAR-18 UV (18 × 3 W) lichtleiste",
    sku: "ACC-EUR-BAR-18-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-bar-18-3w.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "UV LED-leiste 18 × 3 W UV LED-del, intenzív schwarzlicht-hatás. Lineáris dekor ponyva széle, vagy beltéri sín mentén feszített dekor világítása.",
    primaryAttribute: "18 × 3 W UV-A LED",
    secondaryAttribute: "Lineáris bar, DMX",
    useCases: [
      "Lineáris dekor él fény",
      "Tánctér oldalfény",
      "Mobile DJ szett UV bar",
    ],
    specs: {
      Fényforrás: "18 × 3 W UV-A LED",
      Védettség: "IP20",
      Vezérlés: "DMX-512, master/slave, hang",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 78500 },
  },
  {
    slug: "uv-tl4-qcl-rgb-uv",
    name: "Eurolite LED TL-4 QCL RGB+UV Trusslight",
    sku: "ACC-EUR-TL4-RGB-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-tl4-qcl-rgb-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Kompakt trusslight / uplight 4 × 8 W RGB+UV LED-del — egyszerre színes uplight és UV kiemelő. Ideális oszlop, fa vagy ponyva sarok kiemelésére.",
    primaryAttribute: "4 × 8 W RGB+UV LED",
    secondaryAttribute: "Trusslight / uplight, DMX",
    useCases: [
      "Oszlop, fa kiemelés színesen + UV",
      "Ponyva sarok / belépő dekor",
      "Eseti hangulat, többdarabos szett",
    ],
    specs: {
      Fényforrás: "4 × 8 W RGB+UV QCL LED",
      Védettség: "IP20",
      Vezérlés: "DMX-512, master/slave",
      Tápfeszültség: "100–240 V AC, 50/60 Hz",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 53800 },
  },
  // ---- Eurolite UV BAR / SLS / komplettset bővítés ----
  {
    slug: "uv-strahler-e27-5w",
    name: "Eurolite UV-Strahler E-27 foglalattal, 5W UV LED",
    sku: "ACC-EUR-E27-UV-5W",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-strahler-e27-5w.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Kompakt UV-spot szabványos E-27 foglalattal — házilag is cserélhető fényforrás kis dekor sarokba vagy bárpult fölé.",
    primaryAttribute: "5 W UV-A LED",
    secondaryAttribute: "E-27 foglalat, beltér",
    useCases: ["Kis dekor sarok", "Bárpult, fotófal", "Pop-up installáció"],
    specs: {
      Fényforrás: "5 W UV-A LED (395 nm)",
      Foglalat: "E-27",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20 — beltér",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 22100 },
  },
  {
    slug: "uv-leiste-48led-60cm",
    name: "Eurolite UV-léc komplett szett 48 LED, 60 cm slim",
    sku: "ACC-EUR-BAR-48-60",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-leiste-48led-60cm.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Vékony, 60 cm-es UV LED léc — szövethátterek, ponyva alsó éleinek finom megvilágítására. Komplett szett tápegységgel.",
    primaryAttribute: "48 × UV LED, 60 cm",
    secondaryAttribute: "Beltér, slim, plug-and-play",
    useCases: ["Háttérvilágítás", "Lépcső, korlát kiemelése", "Kis fotófal"],
    specs: {
      Fényforrás: "48 × UV-A LED (395 nm)",
      Hossz: "60 cm",
      Védettség: "IP20 — beltér",
      Tápfeszültség: "230 V AC, kapcsolós",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 14700 },
  },
  {
    slug: "uv-leiste-96led-120cm",
    name: "Eurolite UV-léc komplett szett 96 LED, 120 cm slim",
    sku: "ACC-EUR-BAR-96-120",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-leiste-96led-120cm.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "120 cm hosszú UV LED léc — egész szövetfelület egyenletes átmosására ideális beltéri rendezvényen.",
    primaryAttribute: "96 × UV LED, 120 cm",
    secondaryAttribute: "Beltér, slim, plug-and-play",
    useCases: ["Hosszú ponyva alsó éle", "Klub mennyezeti drapéria", "Színpadi háttér"],
    specs: {
      Fényforrás: "96 × UV-A LED (395 nm)",
      Hossz: "120 cm",
      Védettség: "IP20 — beltér",
      Tápfeszültség: "230 V AC, kapcsolós",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 19700 },
  },
  {
    slug: "uv-sls-12-floor",
    name: "Eurolite LED SLS-12 UV Floor",
    sku: "ACC-EUR-SLS-12-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-sls-12-floor.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "12 × 1 W-os UV padlóspot, IR távirányítóval. Belépő szintű, vezérlés nélküli megoldás kis ponyva alulról történő megvilágítására.",
    primaryAttribute: "12 × 1 W UV",
    secondaryAttribute: "Beltér, IR távirányító",
    useCases: ["Ponyva alulvilágítása", "Fotófal, dekor sarok", "Kisebb mobil installáció"],
    specs: {
      Fényforrás: "12 × 1 W UV-A LED (395 nm)",
      Vezérlés: "Auto / Sound / IR távirányító",
      Védettség: "IP20 — beltér",
      Tápfeszültség: "100–240 V AC",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 34400 },
  },
  {
    slug: "uv-party-bar-9",
    name: "Eurolite LED Party UV Bar-9",
    sku: "ACC-EUR-PARTY-BAR-9",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-party-bar-9.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "9 × 1 W-os UV léc partyhoz — egyszerű, vezérlés nélküli mennyezeti vagy állványos felszerelés.",
    primaryAttribute: "9 × 1 W UV",
    secondaryAttribute: "Beltér, plug-and-play",
    useCases: ["Magán parti / klub", "Kis ponyva háttérfénye", "Mobile DJ szett"],
    specs: {
      Fényforrás: "9 × 1 W UV-A LED",
      Védettség: "IP20",
      Tápfeszültség: "230 V AC",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 24600 },
  },
  {
    slug: "uv-party-bar-18",
    name: "Eurolite LED Party UV Bar-18",
    sku: "ACC-EUR-PARTY-BAR-18",
    categorySlug: "tartozekok",
    coverImage: "/product-images/uv-party-bar-18.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "18 × 1 W-os UV léc partyhoz — kétszeres fényerő a Party Bar-9-hez képest, hangvezérlés is opció.",
    primaryAttribute: "18 × 1 W UV",
    secondaryAttribute: "Beltér, hangvezérlés",
    useCases: ["Klub háttér", "Közepes ponyva belső megvilágítása", "Mobil rendezvény"],
    specs: {
      Fényforrás: "18 × 1 W UV-A LED",
      Vezérlés: "Auto / Sound",
      Védettség: "IP20",
      Tápfeszültség: "230 V AC",
      Forrás: "Eurolite / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 44300 },
  },
  // ---- Omnilux UV fényforrások (cserelámpák) ----
  {
    slug: "omnilux-e27-5w-uv",
    name: "Omnilux LED E-27 230 V 5 W SMD UV",
    sku: "ACC-OMN-E27-5W-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-e27-5w-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Olcsó, cserélhető UV LED izzó standard E-27 foglalatba — pótfényforrás meglévő armatúrákba.",
    primaryAttribute: "5 W UV-A",
    secondaryAttribute: "E-27, 230 V",
    useCases: ["Pótfényforrás", "Bárpult, fotófal", "Dekor sarok"],
    specs: {
      Fényforrás: "5 W SMD UV-A LED (395 nm)",
      Foglalat: "E-27",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 6400 },
  },
  {
    slug: "omnilux-e27-27w-uv",
    name: "Omnilux LED E-27 230 V 27 W SMD UV",
    sku: "ACC-OMN-E27-27W-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-e27-27w-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Nagyobb teljesítményű UV LED izzó E-27 foglalatba — meglévő armatúrából is hatékony UV mező.",
    primaryAttribute: "27 W UV-A",
    secondaryAttribute: "E-27, 230 V",
    useCases: ["Felújított armatúra UV-sítása", "Beltéri dekor megvilágítás", "Bár, lounge"],
    specs: {
      Fényforrás: "27 W SMD UV-A LED (395 nm)",
      Foglalat: "E-27",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 27100 },
  },
  {
    slug: "omnilux-e27-10w-a60-uv",
    name: "Omnilux LED E-27 230 V 10 W A60 UV",
    sku: "ACC-OMN-E27-10W-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-e27-10w-a60-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "A60 körte formátumú UV LED izzó — egyszerű cserefényforrás meglévő foglalatokba.",
    primaryAttribute: "10 W UV-A",
    secondaryAttribute: "E-27 A60",
    useCases: ["Pótfényforrás", "Bár, fotófal", "Otthoni teszt"],
    specs: {
      Fényforrás: "10 W UV-A LED (395 nm)",
      Foglalat: "E-27 (A60)",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2400 },
  },
  {
    slug: "omnilux-gu10-7w-uv",
    name: "Omnilux GU-10 230 V 7 W LED UV aktív",
    sku: "ACC-OMN-GU10-7W-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-gu10-7w-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "GU-10 spot foglalatba illő UV LED — meglévő spot armatúrák gyors UV-sítása.",
    primaryAttribute: "7 W UV-A",
    secondaryAttribute: "GU-10, 230 V",
    useCases: ["Mennyezeti spot csere", "Vitrin, dekor", "Pop-up store"],
    specs: {
      Fényforrás: "7 W UV-A LED (395 nm)",
      Foglalat: "GU-10",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2400 },
  },
  {
    slug: "omnilux-gu10-3w-uv",
    name: "Omnilux GU-10 230 V 1 × 3 W LED UV aktív",
    sku: "ACC-OMN-GU10-3W-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-gu10-3w-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Kompakt 3 W-os UV LED GU-10 foglalatba — pontszerű kiegészítés meglévő spot rendszerhez.",
    primaryAttribute: "3 W UV-A",
    secondaryAttribute: "GU-10, 230 V",
    useCases: ["Spot armatúra csere", "Pop-up dekor", "Kis dekor sarok"],
    specs: {
      Fényforrás: "1 × 3 W UV-A LED (395 nm)",
      Foglalat: "GU-10",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 5200 },
  },
  {
    slug: "omnilux-mr16-uv",
    name: "Omnilux MR-16 12 V G-5,3 8 LED UV",
    sku: "ACC-OMN-MR16-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-mr16-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "12 V-os MR-16 UV LED — galvanikusan leválasztott alacsonyfeszültségű spot rendszerekhez (trafó szükséges).",
    primaryAttribute: "8 × UV LED, 12 V",
    secondaryAttribute: "MR-16 / G-5,3",
    useCases: ["12 V dekor rendszer", "Vitrin, kirakat", "Sín alapú spot rendszer"],
    specs: {
      Fényforrás: "8 × UV-A LED (395 nm)",
      Foglalat: "MR-16 / G-5,3",
      Tápfeszültség: "12 V AC/DC (trafóról)",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 3400 },
  },
  {
    slug: "omnilux-par30-uv",
    name: "Omnilux PAR-30 230 V SMD 10 W E-27 62 LED UV",
    sku: "ACC-OMN-PAR30-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-par30-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "PAR-30 forma UV reflektor izzó E-27 foglalatba — irányított UV nyaláb sín- vagy mennyezeti spotokba.",
    primaryAttribute: "10 W UV-A, PAR-30",
    secondaryAttribute: "E-27, irányított",
    useCases: ["Irányított dekor UV", "Sín rendszer", "Kiállítás, vitrin"],
    specs: {
      Fényforrás: "62 × SMD UV-A LED (395 nm), 10 W",
      Foglalat: "E-27 (PAR-30)",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 5900 },
  },
  {
    slug: "omnilux-par38-uv",
    name: "Omnilux PAR-38 230 V SMD 18 W E-27 46 LED UV",
    sku: "ACC-OMN-PAR38-UV",
    categorySlug: "tartozekok",
    coverImage: "/product-images/omnilux-par38-uv.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Nagyobb, PAR-38 forma UV reflektor izzó — koncentráltabb nyaláb nagyobb dekor felületre.",
    primaryAttribute: "18 W UV-A, PAR-38",
    secondaryAttribute: "E-27, irányított",
    useCases: ["Nagyobb dekor felület", "Bejárati zóna", "Sín / spotrendszer"],
    specs: {
      Fényforrás: "46 × SMD UV-A LED (395 nm), 18 W",
      Foglalat: "E-27 (PAR-38)",
      Tápfeszültség: "230 V AC",
      Védettség: "IP20",
      Forrás: "Omnilux / Steinigke",
      Garancia: "12 hónap",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 9800 },
  },

  // ---- UV-aktív anyagok: jelölés, beléptetés, jegyrendszer, dekor jelzések ----
  // Forrás: Steinigke / EUROLITE — "UV active material" kategória.
  // Listaár képzés: nettó beszerzés (EUR gross / 1,19) → eladás EUR-ban
  // max(beszerzés + 1 €, beszerzés × 1,25) → HUF nettó (≈410 Ft/EUR), kerekítve.
  {
    slug: "gaffa-tape-19mm-uv-neon-pink",
    name: "Gaffa Tape 19 mm × 25 m, neon pink, UV-aktív",
    sku: "ACC-GAF-19-PINK",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-19mm-uv-neon-pink.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-19mm-uv-neon-pink-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Keskeny, UV fény alatt világító ragasztószalag — beléptetési zóna, lépcső, kábelek jelölésére.",
    primaryAttribute: "19 mm × 25 m, neon pink",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Beléptetés", "Kábeljelölés", "Lépcső / botlásveszély"],
    specs: {
      Méret: "19 mm × 25 m",
      Szín: "Neon pink (UV-aktív)",
      Cikkszám: "Steinigke 30005483",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2100, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-19mm-uv-neon-orange",
    name: "Gaffa Tape 19 mm × 25 m, neon orange, UV-aktív",
    sku: "ACC-GAF-19-ORG",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-19mm-uv-neon-orange.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-19mm-uv-neon-orange-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Keskeny UV-aktív ragasztószalag narancs színben — figyelemfelhívó jelölésekhez.",
    primaryAttribute: "19 mm × 25 m, neon orange",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Útvonal jelölés", "Vészkijárat", "Kábelvédő sáv"],
    specs: {
      Méret: "19 mm × 25 m",
      Szín: "Neon orange (UV-aktív)",
      Cikkszám: "Steinigke 30005484",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2100, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-19mm-uv-neon-yellow",
    name: "Gaffa Tape 19 mm × 25 m, neon yellow, UV-aktív",
    sku: "ACC-GAF-19-YEL",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-19mm-uv-neon-yellow.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-19mm-uv-neon-yellow-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Keskeny UV-aktív sárga ragasztószalag — színkódolt zónajelölésekhez rendezvényen.",
    primaryAttribute: "19 mm × 25 m, neon yellow",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Zónakód", "Tánctér széle", "Útvonal"],
    specs: {
      Méret: "19 mm × 25 m",
      Szín: "Neon yellow (UV-aktív)",
      Cikkszám: "Steinigke 30005481",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2100, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-19mm-uv-neon-green",
    name: "Gaffa Tape 19 mm × 25 m, neon green, UV-aktív",
    sku: "ACC-GAF-19-GRN",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-19mm-uv-neon-green.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-19mm-uv-neon-green-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Keskeny UV-aktív zöld ragasztószalag — színkódolt jelölésekhez, dekor kontúrokhoz.",
    primaryAttribute: "19 mm × 25 m, neon green",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Színkódolt jelölés", "Dekor kontúr", "Lépcső él"],
    specs: {
      Méret: "19 mm × 25 m",
      Szín: "Neon green (UV-aktív)",
      Cikkszám: "Steinigke 30005482",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 2100, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-50mm-uv-neon-pink",
    name: "Gaffa Tape 50 mm × 25 m, neon pink, UV-aktív",
    sku: "ACC-GAF-50-PINK",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-50mm-uv-neon-pink.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-50mm-uv-neon-pink-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Széles UV-aktív ragasztószalag — nagy felületű jelölésekhez, dekor sávokhoz, padlóra ragasztott útvonalakhoz.",
    primaryAttribute: "50 mm × 25 m, neon pink",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Padló útvonal", "Dekor sáv", "Tánctér él"],
    specs: {
      Méret: "50 mm × 25 m",
      Szín: "Neon pink (UV-aktív)",
      Cikkszám: "Steinigke 30005473",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-50mm-uv-neon-yellow",
    name: "Gaffa Tape 50 mm × 25 m, neon yellow, UV-aktív",
    sku: "ACC-GAF-50-YEL",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-50mm-uv-neon-yellow.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-50mm-uv-neon-yellow-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Széles UV-aktív sárga ragasztószalag — nagy figyelemfelhívó sávokhoz, biztonsági jelölésekhez.",
    primaryAttribute: "50 mm × 25 m, neon yellow",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Biztonsági sáv", "Útvonal", "Padlóra ragasztott jelzés"],
    specs: {
      Méret: "50 mm × 25 m",
      Szín: "Neon yellow (UV-aktív)",
      Cikkszám: "Steinigke 30005471",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-50mm-uv-neon-green",
    name: "Gaffa Tape 50 mm × 25 m, neon green, UV-aktív",
    sku: "ACC-GAF-50-GRN",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-50mm-uv-neon-green.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-50mm-uv-neon-green-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Széles UV-aktív zöld ragasztószalag — nagy felületű dekor és zónajelölésekhez.",
    primaryAttribute: "50 mm × 25 m, neon green",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Zónajelölés", "Dekor sáv", "Útvonal"],
    specs: {
      Méret: "50 mm × 25 m",
      Szín: "Neon green (UV-aktív)",
      Cikkszám: "Steinigke 30005472",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300, unit: "/ tekercs" },
  },
  {
    slug: "gaffa-tape-50mm-uv-neon-orange",
    name: "Gaffa Tape 50 mm × 25 m, neon orange, UV-aktív",
    sku: "ACC-GAF-50-ORG",
    categorySlug: "tartozekok",
    coverImage: "/product-images/gaffa-tape-50mm-uv-neon-orange.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/gaffa-tape-50mm-uv-neon-orange-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Széles UV-aktív narancs ragasztószalag — figyelemfelhívó sávokhoz, dekor kontrasztokhoz.",
    primaryAttribute: "50 mm × 25 m, neon orange",
    secondaryAttribute: "UV-aktív, fluoreszkáló",
    useCases: ["Figyelemfelhívás", "Dekor kontraszt", "Padló útvonal"],
    specs: {
      Méret: "50 mm × 25 m",
      Szín: "Neon orange (UV-aktív)",
      Cikkszám: "Steinigke 30005474",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300, unit: "/ tekercs" },
  },
  {
    slug: "eurolite-uv-stamp-ink-blue-50ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, kék transzparens, 50 ml",
    sku: "ACC-INK-BL-50",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-blue-50ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-blue-50ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "UV fény alatt világító, normál fényben szinte láthatatlan bélyegzőtinta — jegyrendszer, beléptetés, kézbélyegzés rendezvényen.",
    primaryAttribute: "50 ml, kék transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Beléptetés", "Jegyrendszer", "Visszaléptetés ellenőrzés"],
    specs: {
      Kiszerelés: "50 ml",
      Szín: "Kék transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51107995",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300 },
  },
  {
    slug: "eurolite-uv-stamp-ink-red-50ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, piros transzparens, 50 ml",
    sku: "ACC-INK-RD-50",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-red-50ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-red-50ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Piros UV-aktív bélyegzőtinta — színkódolt beléptetéshez, több zónás jegyrendszerhez.",
    primaryAttribute: "50 ml, piros transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Színkódolt beléptetés", "VIP zóna jelölés", "Több napos rendezvény"],
    specs: {
      Kiszerelés: "50 ml",
      Szín: "Piros transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51107994",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300 },
  },
  {
    slug: "eurolite-uv-stamp-ink-yellow-50ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, sárga transzparens, 50 ml",
    sku: "ACC-INK-YL-50",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-yellow-50ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-yellow-50ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Sárga UV-aktív bélyegzőtinta — világosabb bőrön is jól látszik UV lámpa alatt.",
    primaryAttribute: "50 ml, sárga transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Beléptetés", "Napi színkód", "Stáb jelölés"],
    specs: {
      Kiszerelés: "50 ml",
      Szín: "Sárga transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51107996",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 4300 },
  },
  {
    slug: "eurolite-uv-stamp-ink-blue-100ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, kék transzparens, 100 ml",
    sku: "ACC-INK-BL-100",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-blue-100ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-blue-100ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Nagyobb kiszerelés közepes méretű rendezvényre — egész napos beléptetéshez elegendő.",
    primaryAttribute: "100 ml, kék transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Egész napos rendezvény", "Beléptetés", "Jegyellenőrzés"],
    specs: {
      Kiszerelés: "100 ml",
      Szín: "Kék transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51107999",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 6900 },
  },
  {
    slug: "eurolite-uv-stamp-ink-red-100ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, piros transzparens, 100 ml",
    sku: "ACC-INK-RD-100",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-red-100ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-red-100ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Piros UV-aktív tinta 100 ml-es kiszerelésben — több zónás, hosszabb rendezvényre.",
    primaryAttribute: "100 ml, piros transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Több zónás beléptetés", "Több napos fesztivál", "VIP jelölés"],
    specs: {
      Kiszerelés: "100 ml",
      Szín: "Piros transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51107998",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 6900 },
  },
  {
    slug: "eurolite-uv-stamp-ink-yellow-100ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, sárga transzparens, 100 ml",
    sku: "ACC-INK-YL-100",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-yellow-100ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-yellow-100ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Sárga UV-aktív tinta 100 ml-es kiszerelésben — közepes és nagy rendezvényre.",
    primaryAttribute: "100 ml, sárga transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Napi színkód", "Stáb / artist jelölés", "Beléptetés"],
    specs: {
      Kiszerelés: "100 ml",
      Szín: "Sárga transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51108000",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 6900 },
  },
  {
    slug: "eurolite-uv-stamp-ink-blue-250ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, kék transzparens, 250 ml",
    sku: "ACC-INK-BL-250",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-blue-250ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-blue-250ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Nagy kiszerelés fesztiválra, több napos rendezvényre — több ezer beléptetéshez elegendő.",
    primaryAttribute: "250 ml, kék transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Fesztivál", "Nagy rendezvény", "Több napos beléptetés"],
    specs: {
      Kiszerelés: "250 ml",
      Szín: "Kék transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51108005",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 15000 },
  },
  {
    slug: "eurolite-uv-stamp-ink-red-250ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, piros transzparens, 250 ml",
    sku: "ACC-INK-RD-250",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-red-250ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-red-250ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Piros UV-aktív tinta nagy kiszerelésben — fesztivál szintű beléptetéshez, színkódolt zónákhoz.",
    primaryAttribute: "250 ml, piros transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Fesztivál", "Több zónás beléptetés", "VIP jelölés"],
    specs: {
      Kiszerelés: "250 ml",
      Szín: "Piros transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51108003",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 15000 },
  },
  {
    slug: "eurolite-uv-stamp-ink-yellow-250ml",
    name: "EUROLITE UV-aktív bélyegzőtinta, sárga transzparens, 250 ml",
    sku: "ACC-INK-YL-250",
    categorySlug: "tartozekok",
    coverImage: "/product-images/eurolite-uv-stamp-ink-yellow-250ml.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    uvActiveImage: "/product-images/eurolite-uv-stamp-ink-yellow-250ml-uv.jpg",
    uvActiveImageAlt: "Ugyanaz a termék 365 nm UV-A megvilágítás alatt — fluoreszkáló szín bemutatása",
    shortDescription:
      "Sárga UV-aktív tinta nagy kiszerelésben — több napos rendezvényre, színkódolt napi beléptetésre.",
    primaryAttribute: "250 ml, sárga transzparens",
    secondaryAttribute: "UV-aktív, normál fényben halvány",
    useCases: ["Több napos fesztivál", "Napi színkód", "Stáb jelölés"],
    specs: {
      Kiszerelés: "250 ml",
      Szín: "Sárga transzparens (UV-aktív)",
      Cikkszám: "Steinigke 51108006",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 15000 },
  },
  {
    slug: "ink-cushion-110x70",
    name: "Bélyegzőpárna tinta nélkül, 110 × 70 mm",
    sku: "ACC-INK-CUSHION",
    categorySlug: "tartozekok",
    coverImage: "/product-images/ink-cushion-110x70.jpg",
    coverImageAlt: "Termékkép a gyártó (Steinigke / EUROLITE) katalógusából",
    shortDescription:
      "Üres bélyegzőpárna — az UV-aktív bélyegzőtintához, beléptetési ponton kézi bélyegzéshez.",
    primaryAttribute: "110 × 70 mm, üres",
    secondaryAttribute: "UV-aktív tintával tölthető",
    useCases: ["Beléptetési pont", "Jegypénztár", "Visszaléptetés ellenőrzés"],
    specs: {
      Méret: "110 × 70 mm",
      Kiszerelés: "Tinta nélkül",
      Cikkszám: "Steinigke 51108010",
      Forrás: "EUROLITE / Steinigke",
    },
    offerType: "sale",
    featuredPrice: { netHuf: 1800 },
  },
];

// Helpers
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}
