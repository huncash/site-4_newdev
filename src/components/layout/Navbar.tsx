"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { MENU_ITEMS } from "@/config/menu";
import { useCartCount } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function Navbar({ logoHref = "/", className }: { logoHref?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const totalCartCount = useCartCount();

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/termekek?q=${encodeURIComponent(q)}` : "/termekek");
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-brand text-brand-foreground shadow-sm",
        className
      )}
    >
      <nav className="mx-auto flex min-h-[7.5rem] max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2 md:h-20 md:min-h-0 md:flex-row md:items-center md:justify-between md:gap-4 md:py-0">
        <a
          href={logoHref}
          className="flex w-full shrink-0 items-center justify-center md:w-auto md:min-w-0 md:justify-start"
        >
          <img
            src="/brand-lockup-dark.png"
            alt="rendezvenyarnyekolas.hu"
            className="h-12 w-full max-w-none object-contain object-center sm:h-14 md:h-16 md:w-auto md:max-w-none md:object-left"
          />
        </a>

        <ul className="hidden gap-8 md:flex">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-bold text-brand-foreground transition-colors hover:underline underline-offset-8"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex w-full shrink-0 items-center gap-2 md:ml-auto md:w-auto sm:gap-3">
          <a
            href="/kosar"
            className="relative flex shrink-0 items-center justify-center p-2 text-brand-foreground hover:bg-white/10 rounded-md"
            aria-label={`Kosár megtekintése (${totalCartCount} tétel)`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {totalCartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand">
                {totalCartCount}
              </span>
            ) : null}
          </a>

          <form onSubmit={handleSearch} className="flex min-w-0 flex-1 items-center md:flex-none" role="search">
            <label htmlFor="header-catalog-search" className="sr-only">
              Keresés a katalógusban
            </label>
            <input
              id="header-catalog-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Keresés…"
              className="h-8 w-full rounded-md border border-brand-foreground/30 bg-brand-foreground/90 px-2 text-xs text-foreground placeholder:text-foreground/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-foreground sm:h-9 sm:px-3 sm:text-sm md:w-36"
            />
          </form>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/40 text-brand-foreground md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={cn("block h-0.5 w-5 bg-brand-foreground transition-transform duration-200", open && "translate-y-2 rotate-45")} />
              <span className={cn("block h-0.5 w-5 bg-brand-foreground transition-opacity duration-200", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-5 bg-brand-foreground transition-transform duration-200", open && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/20 bg-brand px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-bold text-brand-foreground hover:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/kosar"
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 text-sm font-bold text-brand-foreground hover:bg-white/10"
              >
                Kosár {totalCartCount > 0 ? `(${totalCartCount})` : ""}
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
