import { useSyncExternalStore } from "react";

import type { CartItem } from "./cart-types";

export type { CartItem };

type Listener = () => void;

const STORAGE_KEY = "rendezvenyarnyekolas-cart-v1";

let state: CartItem[] = [];
let hydrated = false;
const listeners = new Set<Listener>();

function notify() {
  for (const l of listeners) l();
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): CartItem[] {
  return state;
}

function clampQty(qty: number): number {
  if (!Number.isFinite(qty)) return 1;
  return Math.max(1, Math.min(99, Math.floor(qty)));
}

function readLocal(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (x): x is CartItem =>
          !!x &&
          typeof x.slug === "string" &&
          typeof x.name === "string" &&
          typeof x.sku === "string" &&
          typeof x.qty === "number" &&
          x.qty > 0
      )
      .map((x) => ({ ...x, qty: clampQty(x.qty) }));
  } catch {
    return [];
  }
}

function writeLocal(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // quota / private mode
  }
}

function ensureHydrated() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  state = readLocal();
}

function setState(next: CartItem[]) {
  state = next;
  writeLocal(state);
  notify();
}

export function addItem(
  item: Omit<CartItem, "qty">,
  qty = 1
): void {
  ensureHydrated();
  const addQty = clampQty(qty);
  const existing = state.find((i) => i.slug === item.slug);
  if (existing) {
    setState(
      state.map((i) =>
        i.slug === item.slug
          ? { ...i, qty: clampQty(i.qty + addQty) }
          : i
      )
    );
  } else {
    setState([...state, { ...item, qty: addQty }]);
  }
}

export function removeItem(slug: string): void {
  ensureHydrated();
  setState(state.filter((i) => i.slug !== slug));
}

export function setQty(slug: string, qty: number): void {
  ensureHydrated();
  const q = Math.floor(qty);
  if (!Number.isFinite(q) || q <= 0) {
    setState(state.filter((i) => i.slug !== slug));
    return;
  }
  setState(
    state.map((i) => (i.slug === slug ? { ...i, qty: clampQty(q) } : i))
  );
}

export function getCartItems(): CartItem[] {
  ensureHydrated();
  return state;
}

export function getCartCount(): number {
  ensureHydrated();
  return state.reduce((s, x) => s + x.qty, 0);
}

export function clearCart(): void {
  ensureHydrated();
  setState([]);
}

export function replaceCart(items: CartItem[]): void {
  ensureHydrated();
  setState(Array.isArray(items) ? items : []);
}

export function mergeCart(items: CartItem[]): CartItem[] {
  ensureHydrated();
  const map = new Map<string, CartItem>();
  for (const item of state) map.set(item.slug, { ...item });
  for (const item of items) {
    const prev = map.get(item.slug);
    if (prev) {
      map.set(item.slug, {
        ...prev,
        qty: clampQty(prev.qty + item.qty),
        name: item.name,
        sku: item.sku,
      });
    } else {
      map.set(item.slug, { ...item, qty: clampQty(item.qty) });
    }
  }
  const merged = Array.from(map.values());
  setState(merged);
  return merged;
}

export function cartToMessageBlock(items: CartItem[] = state): string {
  if (items.length === 0) return "";
  return items
    .map((x) => `- ${x.qty} × ${x.name} (cikkszám: ${x.sku})`)
    .join("\n");
}

export function useCartStore(): CartItem[] {
  ensureHydrated();
  return useSyncExternalStore(subscribe, getSnapshot, () => []);
}

export function useCartCount(): number {
  const items = useCartStore();
  return items.reduce((s, x) => s + x.qty, 0);
}

const STORAGE_USER_KEY = "rendezvenyarnyekolas-cart-user-id";

export function getCartUserId(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_USER_KEY);
}

export function setCartUserId(userId: string | null): void {
  if (typeof window === "undefined") return;
  if (userId) localStorage.setItem(STORAGE_USER_KEY, userId);
  else localStorage.removeItem(STORAGE_USER_KEY);
}
