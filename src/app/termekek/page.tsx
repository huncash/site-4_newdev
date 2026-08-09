import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/data-provider";
import { Catalog } from "@/components/Catalog";

export const metadata: Metadata = {
  title: "Termékkatalógus | Rendezvényárnyékolás",
  description: "Lycra dekorponyvák, árnyékoló elemek és UV kiegészítők katalógusa.",
};

export default function TermekekPage() {
  const products = getProducts();

  return (
    <main className="mx-auto max-w-7xl px-4 pb-6 pt-4 sm:pb-8 sm:pt-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          Termékkatalógus
        </h1>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          Bérelhető dekorfelületek és megvásárolható UV kellékek rendezvényekre.
        </p>
      </div>
      <Suspense fallback={<div className="text-muted-foreground">Katalógus betöltése...</div>}>
        <Catalog products={products} basePath="/termekek" />
      </Suspense>
    </main>
  );
}
