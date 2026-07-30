export interface ContentLink {
  label: string;
  href: string;
}

export interface ContentGalleryItem {
  image: string;
  alt: string;
  title: string;
  description: string;
}

export interface ContentRentalItem {
  slug: string;
  name: string;
  type: "rental" | "sale";
  priceNetHuf?: number;
  priceNote?: string;
}

export interface ContentCategory {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export const CONTENT = {
  hero: {
    badge: "Rendezvény-dekor és árnyékolás",
    title: "Kézzel festett és printed lycra dekor ponyvák rendezvényekre",
    subtitle:
      "Bérelhető dekorfelületek kültérre és beltérre — városi rendezvényekhez, fesztiválokhoz, kulturális és céges eseményekhez. A helyszín geometriájához igazítva feszítjük ki.",
    image: "/img/hero/hero-1600.jpg",
    ctaPrimary: { label: "Ajánlatkérés", href: "/kapcsolat" },
    ctaSecondary: { label: "Fotós referenciák", href: "/referenciak" },
  },

  gallery: {
    items: [
      {
        image: "/img/gallery/nappali-foutca-1200.jpg",
        alt: "Printed lycra dekorponyva nappali telepítésben egy belvárosi sétálóutca fölött.",
        title: "Sétálóutca nappal",
        description: "Városi közegben is megáll a látvány.",
      },
      {
        image: "/img/gallery/nappali-alulnezet-800.jpg",
        alt: "A dekorponyva alsó nézete nappali fényben, markáns radiális mintázattal.",
        title: "Alulnézet",
        description: "A forma a járókelő szemszögéből is működik.",
      },
      {
        image: "/img/gallery/setaloutca-telepites-800.jpg",
        alt: "Dekorponyva telepítése emelőkosárral belvárosi helyszínen.",
        title: "Helyszíni telepítés",
        description: "Emelőkosaras munkáknál a megrendelő technikai csapatával együtt dolgozunk.",
      },
    ] satisfies ContentGalleryItem[],
  },

  services: {
    heading: "Mit adunk a rendezvényhez",
    items: [
      {
        icon: "🎨",
        title: "Meglévő egyedi darabok bérlése",
        description:
          "Kézzel festett és printed lycra dekorponyvák bérbeadása — egész évben, előfoglalással. Nem gyártás-orientált műhely vagyunk.",
      },
      {
        icon: "☀️",
        title: "Árnyék és hangulat",
        description:
          "Kültéren árnyékot ad, beltérben karakteres vizuális réteget épít a tér fölé. Esővédelemre nem alkalmas — arra külön elemek vannak.",
      },
      {
        icon: "🌳",
        title: "Természetes és városi terekben",
        description:
          "Fák közé, állványzatra, homlokzatok közé, sétálóutcák fölé vagy sátortérbe — a helyszín geometriájához igazítva.",
      },
      {
        icon: "🔧",
        title: "Telepítés és koordináció",
        description:
          "A felület tervezését, kifeszítését és bontását mi végezzük. Emelőkosár, állvány, helyszíni technika esetén a megrendelő alvállalkozóival dolgozunk együtt.",
      },
    ],
  },

  useCases: {
    heading: "Kinek ajánljuk",
    image: "/img/gallery/hero-night-1600.jpg",
    items: [
      {
        icon: "🎵",
        title: "Fesztiválok és koncertek",
        description:
          "Színpadi háttér, sátorplafon, közönségtér fölé feszített dekorréteg fesztiválokra, klubestekre, koncertekre — kül- és beltérre egyaránt.",
      },
      {
        icon: "🏙️",
        title: "Városi és kulturális rendezvények",
        description:
          "Sétálóutcák, belvárosi események, alapítványi ünnepségek, gyereknapok, családi és közösségi programok árnyékolása és hangulati keretezése.",
      },
      {
        icon: "🏢",
        title: "Céges és ügynökségi projektek",
        description:
          "Brand-aktivációkhoz, partnereseményekhez és céges rendezvényekhez a vizuális tematika szerint finomhangolt kivitelben.",
      },
    ],
  },

  categories: {
    heading: "Katalógus kategóriák",
    items: [
      {
        slug: "berelheto-ponyvak",
        name: "Bérelhető ponyvák",
        tagline: "Egyedi árajánlattal",
        description:
          "Kifeszíthető, egyedi festésű és nyomtatott lycra dekor ponyvák, valamint nehéz, kamion-ponyva alapú funkcionális elemek. Bérlés helyszíni telepítéssel és bontással.",
      },
      {
        slug: "tartozekok",
        name: "Tartozékok",
        tagline: "Készletről, fix listaáron",
        description:
          "UV lámpák, reflektorok és kiegészítők — fix nettó listaárral, készletről. A dekorponyvák megvilágításához.",
      },
    ] satisfies ContentCategory[],
  },

  rentalItems: {
    heading: "Bérelhető dekorfelületek",
    disclaimer: "Bérlési árak helyszín, méret és időpont alapján — egyedi ajánlatkérés szükséges.",
    items: [
      {
        slug: "kezzel-festett-csillag-6m",
        name: "Kézzel festett csillag (6 m)",
        type: "rental",
        priceNote: "Egyedi ajánlat / alkalom",
      },
      {
        slug: "printed-lycra-spiral-15x15",
        name: "Printed lycra spirál (15×15 m)",
        type: "rental",
        priceNote: "Egyedi ajánlat / alkalom",
      },
    ] satisfies ContentRentalItem[],
  },

  saleItems: {
    heading: "Kiemelt tartozékok — fix nettó ár",
    items: [
      { slug: "uv-floodlight-fl10-smd", name: "UV reflektor FL10 SMD", type: "sale", priceNetHuf: 19700 },
      { slug: "uv-floodlight-fl30-smd", name: "UV reflektor FL30 SMD", type: "sale", priceNetHuf: 44300 },
      { slug: "uv-floodlight-fl50-smd", name: "UV reflektor FL50 SMD", type: "sale", priceNetHuf: 63500 },
      { slug: "uv-floodlight-fl100-smd", name: "UV reflektor FL100 SMD", type: "sale", priceNetHuf: 93000 },
      { slug: "uv-ip-par-9-365nm", name: "UV IP PAR 9 (365 nm)", type: "sale", priceNetHuf: 246500 },
    ] satisfies ContentRentalItem[],
  },

  process: {
    heading: "Megrendeléstől a bontásig — négy lépés",
    steps: [
      { step: "1.", title: "Egyeztetés", description: "Helyszín, funkció, dátum, vizuális irány és technikai környezet átbeszélése." },
      { step: "2.", title: "Felület kiválasztása", description: "Kézzel festett vagy printed lycra megoldás, forma és méret szerint." },
      { step: "3.", title: "Telepítés", description: "A felületet a helyszín adottságaihoz igazítva feszítjük ki." },
      { step: "4.", title: "Bontás", description: "Rendezvény után bontás, összeszedés és elszállítás a megbeszélt időablakban." },
    ],
    cta: { label: "Részletes folyamat", href: "/folyamat" },
  },

  info: {
    usage: {
      heading: "Hol használjuk a dekorjainkat",
      items: [
        "Fesztiválok, koncertek, klubestek",
        "Városi rendezvények, sétálóutcai programok, alapítványi ünnepségek",
        "Gyereknapok, családi és közösségi események",
        "Céges és ügynökségi rendezvények, brand-aktivációk",
      ],
    },
    notes: {
      heading: "Amit fontos előre tudni",
      paragraphs: [
        "Bérbeadással foglalkozunk — a meglévő egyedi darabokra egész évben előfoglalás vehető fel. Egyedi gyártást kérésre, 3D lézerszkennes felméréssel is vállalunk, de annak több hét az átfutása.",
        "A dekorponyva árnyékolásra és térformálásra való, nem esőálló. Ha a technika fölé funkcionális esővédelem is kell, ahhoz külön kamionponyva elemeket adunk.",
      ],
    },
    pricing:
      "Három fő tényezőből: a bérelt felület mérete és összetettsége, a helyszíni telepítés és bontás munkaóra-igénye, valamint a logisztika. Konkrét helyszínre tételes ajánlatot küldünk.",
  },

  cta: {
    heading: "Tervez rendezvényt?",
    description:
      "Írja meg a helyszínt, dátumot és a tematikát — ajánlattal és látványterv-iránnyal válaszolunk.",
    cta: { label: "Ajánlatkérés", href: "/kapcsolat" },
  },

  catalog: {
    heading: "Termékkatalógus",
  },
} as const;
