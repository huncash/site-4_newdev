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
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Termékkatalógus</h1>
        <p className="mt-2 text-slate-400">
          Bérelhető dekorfelületek és megvásárolható UV kellékek rendezvényekre.
        </p>
      </div>
      <Suspense fallback={<div className="text-slate-400">Katalógus betöltése...</div>}>
        <Catalog products={products} basePath="/termekek" />
      </Suspense>
    </main>
  );
}
