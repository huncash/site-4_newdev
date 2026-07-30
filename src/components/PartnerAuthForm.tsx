"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

import {
  getCartItems,
  mergeCart,
  replaceCart,
  setCartUserId,
} from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export type PartnerAuthMode = "login" | "register";

export interface PartnerAuthFormProps {
  mode: PartnerAuthMode;
  className?: string;
  onSuccessRedirect?: string;
}

async function syncCartAfterAuth(
  userId: string,
  serverCart: unknown
): Promise<void> {
  setCartUserId(userId);
  const remote = Array.isArray(serverCart) ? serverCart : [];
  const local = getCartItems();
  if (remote.length === 0 && local.length > 0) {
    await fetch("/api/partner/cart", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: local }),
    });
    return;
  }
  if (local.length === 0 && remote.length > 0) {
    replaceCart(remote as Parameters<typeof replaceCart>[0]);
    return;
  }
  if (remote.length > 0) {
    const merged = mergeCart(remote as Parameters<typeof mergeCart>[0]);
    await fetch("/api/partner/cart", {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: merged }),
    });
  }
}

export function PartnerAuthForm({
  mode,
  className,
  onSuccessRedirect = "/",
}: PartnerAuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const isRegister = mode === "register";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch(
        isRegister ? "/api/partner/register" : "/api/partner/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), password }),
        }
      );
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        user?: { id: string };
        cart?: unknown;
      };
      if (!res.ok) {
        setError(
          data.error ||
            (res.status === 401
              ? "Érvénytelen e-mail vagy jelszó."
              : res.status === 409
                ? "Ez az e-mail már regisztrálva van."
                : "Sikertelen művelet.")
        );
        return;
      }
      if (data.user?.id) {
        await syncCartAfterAuth(data.user.id, data.cart);
      }
      setPassword("");
      window.location.assign(onSuccessRedirect);
    } catch {
      setError("Hálózati hiba.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={cn("mx-auto w-full max-w-md", className)}>
      <div className="mb-8 text-center">
        <div className="text-xs font-medium uppercase tracking-[0.25em] text-sky-400">
          Partner / ügyfél
        </div>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white">
          {isRegister ? "Regisztráció" : "Belépés"}
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Kosár mentése a fiókodhoz. Nincs ügyvezetői / admin hozzáférés.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-sm"
      >
        <div className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm text-slate-200">
            <span className="font-medium">E-mail</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm text-slate-200">
            <span className="font-medium">Jelszó</span>
            <input
              type="password"
              required
              minLength={8}
              autoComplete={isRegister ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 rounded-md border border-slate-700 bg-slate-950 px-3 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            />
          </label>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
          <button
            type="submit"
            disabled={pending}
            className="h-10 rounded-md bg-sky-500 px-4 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-50"
          >
            {pending
              ? "…"
              : isRegister
                ? "Fiók létrehozása"
                : "Belépés"}
          </button>
        </div>
      </form>

      <p className="mt-4 text-center text-sm text-slate-400">
        {isRegister ? (
          <>
            Már van fiókod?{" "}
            <Link href="/partner/login" className="underline hover:text-white">
              Belépés
            </Link>
          </>
        ) : (
          <>
            Nincs még fiókod?{" "}
            <Link
              href="/partner/register"
              className="underline hover:text-white"
            >
              Regisztráció
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
