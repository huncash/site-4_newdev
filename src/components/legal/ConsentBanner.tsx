"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { readConsent, writeConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

export function ConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setVisible(!readConsent());
    } catch {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.paddingBottom = visible ? "7.5rem" : "";
    return () => {
      document.body.style.paddingBottom = "";
    };
  }, [mounted, visible]);

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="gdpr-consent-title"
      aria-describedby="gdpr-consent-desc"
      className={cn(
        "fixed inset-x-0 bottom-0 z-[200] border-t border-white/15",
        "bg-section-dark text-section-dark-foreground",
        "shadow-[0_-12px_40px_rgba(0,0,0,0.45)]",
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:py-4">
        <div className="min-w-0 flex-1">
          <p id="gdpr-consent-title" className="text-sm font-semibold">
            Adatkezelési tájékoztatás és beleegyező nyilatkozat
          </p>
          <p
            id="gdpr-consent-desc"
            className="mt-1 text-xs leading-relaxed text-section-dark-foreground/80 sm:text-sm"
          >
            Csak a kapcsolatfelvételhez, ajánlatadáshoz és az elektronikus ügymenethez
            szükséges adatokat kezeljük (pl. név, e-mail, telefon, cégnév, üzenet). A cél:
            hatékony kommunikáció és lehetőség szerint papírmentes folyamat. Részletek:{" "}
            <Link
              href="/adatvedelem"
              className="underline underline-offset-2 hover:text-white"
            >
              Adatvédelmi tájékoztató
            </Link>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            try {
              writeConsent();
            } catch {
              /* ignore storage failures */
            }
            setVisible(false);
          }}
          className={cn(
            "shrink-0 rounded bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground",
            "transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-section-dark",
          )}
        >
          Elfogadom
        </button>
      </div>
    </div>
  );
}
