"use client";

import { useState } from "react";
import { MENU_ITEMS } from "@/config/menu";
import { useCartStore } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export function Navbar({ logoHref = "/", className }: { logoHref?: string; className?: string }) {
  const [open, setOpen] = useState(false);
  const cartItems = useCartStore();
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-sky-400 text-slate-950 shadow-md",
        className
      )}
    >
      <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:h-20">
        <a
          href={logoHref}
          className="flex min-w-0 flex-1 items-center hover:opacity-90 transition-opacity"
        >
          <img
            src="/brand-lockup-dark.png"
            alt="rendezvenyarnyekolas.hu"
            className="h-12 w-auto max-w-full object-contain object-left sm:h-14 md:h-16"
          />
        </a>

        <ul className="hidden gap-8 md:flex">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm font-bold text-slate-900 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="/kapcsolat"
            className="relative flex items-center justify-center p-2 text-slate-950 hover:text-white"
            aria-label="Kosár"
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
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-bold text-sky-400">
                {totalCartCount}
              </span>
            ) : null}
          </a>

          <button
            type="button"
            aria-label="Menü"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-900 text-slate-950 md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={cn("block h-0.5 w-5 bg-slate-950 transition-transform duration-200", open && "translate-y-2 rotate-45")} />
              <span className={cn("block h-0.5 w-5 bg-slate-950 transition-opacity duration-200", open && "opacity-0")} />
              <span className={cn("block h-0.5 w-5 bg-slate-950 transition-transform duration-200", open && "-translate-y-2 -rotate-45")} />
            </span>
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-sky-500 bg-sky-400 px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-bold text-slate-900 hover:bg-sky-500 hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
