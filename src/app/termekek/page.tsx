import { Suspense } from "react";
import type { Metadata } from "next";

import { Catalog } from "@/components/Catalog";
import { getPublicProducts } from "@/lib/catalog-public";

export const metadata: Metadata = {
  title:
    "Katalógus — dekor ponyvák bérlése és UV tartozékok | rendezvenyarnyekolas.hu",
  description:
    "Bérelhető kézzel festett és nyomtatott lycra dekor ponyvák, valamint UV PAR spotok és kültéri UV blacklight lámpák rendezvényekre. Cikkszám, kategória és ár szerint kereshető katalógus.",
};

export default function TermekekPage() {
  const products = getPublicProducts();
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-6 py-12 text-muted-foreground">
          Katalógus betöltése…
        </div>
      }
    >
      <Catalog products={products} />
    </Suspense>
  );
}
