"use client";

import { COMPANY_INFO } from "@/config/company-data";
import { SITE_CONFIG } from "@/config/site-config";
import { cn } from "@/lib/utils";

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  className?: string;
  description?: string;
  brandName?: string;
  brandTagline?: string;
  brandSubline?: string;
  foundedYear?: number;
  catalogLinks?: FooterLink[];
  aboutLinks?: FooterLink[];
}

export function Footer({
  className,
  description,
  brandName = "Rendezvényárnyékolás",
  brandTagline,
  brandSubline,
  foundedYear = 2012,
  catalogLinks = [],
  aboutLinks = [],
}: FooterProps) {
  const year = new Date().getFullYear();
  const partnerLink: FooterLink = {
    label: "Partner oldal / Belépés",
    href: "/partner/login",
  };
  const resolvedAboutLinks = [
    ...aboutLinks.filter((l) => l.href !== partnerLink.href),
    partnerLink,
  ];

  return (
    <footer className={cn("border-t border-slate-800 bg-slate-950 text-slate-300 text-sm", className)}>
      <div className="mx-auto max-w-7xl px-4 py-10">
        {description ? (
          <p className="mb-8 text-slate-400">{description}</p>
        ) : null}

        <div className="grid gap-10 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-sky-400 font-semibold">EST. {foundedYear}</p>
              <a href="/" className="inline-block max-w-full hover:opacity-90 transition-opacity">
                <img
                  src="/brand-lockup.png"
                  alt="rendezvenyarnyekolas.hu"
                  className="h-12 w-auto max-w-full object-contain object-left sm:h-14 md:h-16"
                />
              </a>
            </div>
            {brandTagline ? (
              <p className="text-slate-400">{brandTagline}</p>
            ) : null}
            {brandSubline ? (
              <p className="text-xs text-slate-500">{brandSubline}</p>
            ) : null}
            <p className="text-xs text-slate-500 mt-2">
              Üzemeltető: {COMPANY_INFO.name} ({COMPANY_INFO.taxNumber})
            </p>
          </div>

          {catalogLinks.length > 0 ? (
            <div className="flex flex-col gap-3">
              <p className="font-semibold text-white">Teljes katalógus</p>
              <ul className="flex flex-col gap-2">
                {catalogLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-slate-400 hover:text-sky-400 transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-col gap-3">
            <p className="font-semibold text-white">Rólunk</p>
            <ul className="flex flex-col gap-2">
              {resolvedAboutLinks.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500">
          <span>© Copyright {foundedYear} – {year} | Minden jog fenntartva.</span>
          <a href={`mailto:${SITE_CONFIG.publicEmail}`} className="hover:text-sky-400">
            Kérdése van? Írj nekünk! ({SITE_CONFIG.publicEmail})
          </a>
        </div>
      </div>
    </footer>
  );
}
