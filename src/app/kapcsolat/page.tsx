import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site-config";
import { COMPANY_INFO } from "@/config/company-data";

export const metadata: Metadata = {
  title: "Kapcsolat | Rendezvényárnyékolás",
  description: "Lépjen kapcsolatba velünk rendezvénydekorációs és árnyékolási ajánlatért.",
};

export default function KapcsolatPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400">Ajánlatkérés és Kapcsolat</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Lépjen kapcsolatba velünk</h1>
        <p className="mt-3 text-slate-400">
          Írja meg a helyszínt, dátumot és a rendezvény jellegét — 24 órán belül felvesszük Önnel a kapcsolatot.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Elérhetőségek</h2>
          <div className="space-y-4 text-sm text-slate-300">
            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">E-mail</p>
              <a href={`mailto:${SITE_CONFIG.publicEmail}`} className="text-sky-400 hover:underline text-base font-semibold">
                {SITE_CONFIG.publicEmail}
              </a>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">Cégnév</p>
              <p className="font-semibold text-white">{COMPANY_INFO.name}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">Székhely</p>
              <p>{COMPANY_INFO.address}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">Adószám</p>
              <p>{COMPANY_INFO.taxNumber}</p>
            </div>

            <div>
              <p className="text-xs text-slate-500 uppercase font-medium">Cégjegyzékszám</p>
              <p>{COMPANY_INFO.companyRegistrationNumber}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Üzenetküldés</h2>
          <form className="space-y-4" action="/api/contact" method="POST">
            <div>
              <label htmlFor="name" className="block text-xs text-slate-400 mb-1">Név / Cégnév</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Az Ön neve"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-slate-400 mb-1">E-mail cím</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="nev@domain.hu"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-slate-400 mb-1">Üzenet / Ajánlatkérés részletei</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                placeholder="Rendezvény dátuma, helyszíne, várható alapterület..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-sky-400 py-2.5 text-sm font-bold text-slate-950 hover:bg-sky-300 transition-colors"
            >
              Ajánlatkérés elküldése
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
