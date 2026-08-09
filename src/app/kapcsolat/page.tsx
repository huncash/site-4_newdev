import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site-config";

export const metadata: Metadata = {
  title: "Kapcsolat | Rendezvényárnyékolás",
  description: "Lépjen kapcsolatba velünk rendezvénydekorációs és árnyékolási ajánlatért.",
};

export default function KapcsolatPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">Ajánlatkérés és Kapcsolat</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Lépjen kapcsolatba velünk</h1>
        <p className="mt-3 text-muted-foreground">
          Írja meg a helyszínt, dátumot és a rendezvény jellegét — 24 órán belül felvesszük Önnel a kapcsolatot.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">Elérhetőségek</h2>
          <div className="space-y-4 text-sm text-foreground">
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium">E-mail</p>
              <a href={`mailto:${SITE_CONFIG.publicEmail}`} className="text-brand hover:underline text-base font-semibold">
                {SITE_CONFIG.publicEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">Üzenetküldés</h2>
          <form className="space-y-4" action="/api/contact" method="POST">
            <div>
              <label htmlFor="name" className="block text-xs text-muted-foreground mb-1">Név / Cégnév</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Az Ön neve"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-muted-foreground mb-1">E-mail cím</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="nev@domain.hu"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs text-muted-foreground mb-1">Üzenet / Ajánlatkérés részletei</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand"
                placeholder="Rendezvény dátuma, helyszíne, várható alapterület..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-brand py-2.5 text-sm font-bold text-brand-foreground hover:bg-brand-dark transition-colors"
            >
              Ajánlatkérés elküldése
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
