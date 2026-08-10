import "server-only";

import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";

import type { Product, User, UserRole } from "./types";

export type { Product, User, UserRole };

export interface StoredUser extends User {
  passwordHash?: string;
}

export type RawProduct = Product & Record<string, unknown>;

interface SourceData {
  users?: StoredUser[];
  products: RawProduct[];
}

function resolveSourcePath(): string {
  if (process.env.PRODUCTS_DB_PATH) {
    return resolve(process.env.PRODUCTS_DB_PATH);
  }
  const local = resolve(process.cwd(), "private_data", "source_data.json");
  const dockerDefault = "/root/private_data/source_data.json";
  if (existsSync(local)) return local;
  if (existsSync(dockerDefault)) return dockerDefault;
  return local;
}

const SENSITIVE_SPEC_KEY =
  /^(forrás|forras|beszerz|beszállít|beszallit|cost|purchase|wholesale|supplier|gyáriár|gyariar|nettobeszerz)/i;

const SENSITIVE_TOP_LEVEL = new Set([
  "bulbOnlyNetHuf",
  "costPrice",
  "purchasePrice",
  "wholesalePrice",
  "supplier",
  "forras",
  "Forrás",
  "margin",
  "marginMultiplier",
]);

/** Leading brand token duplicated in EUROLITE catalog names (case-insensitive). */
const EUROLITE_NAME_PREFIX = /^EUROLITE\s+/i;

export function stripEuroliteNamePrefix(name: string): string {
  return name.replace(EUROLITE_NAME_PREFIX, "").trim();
}

function getSpecValue(
  specs: Record<string, unknown> | undefined,
  keyPattern: RegExp
): string | undefined {
  if (!specs) return undefined;
  for (const [key, value] of Object.entries(specs)) {
    if (keyPattern.test(key) && value != null && String(value).trim()) {
      return String(value).trim();
    }
  }
  return undefined;
}

function isEuroliteProduct(
  product: Pick<RawProduct, "name" | "specs"> & Record<string, unknown>
): boolean {
  if (EUROLITE_NAME_PREFIX.test(product.name ?? "")) return true;
  const marka = getSpecValue(
    product.specs as Record<string, unknown> | undefined,
    /^márka$|^marka$/i
  );
  if (marka && marka.toUpperCase() === "EUROLITE") return true;
  const forras = getSpecValue(
    product.specs as Record<string, unknown> | undefined,
    /^forrás$|^forras$/i
  );
  if (forras && /eurolite/i.test(forras)) return true;
  const cikkszam = getSpecValue(
    product.specs as Record<string, unknown> | undefined,
    /^cikkszám$|^cikkszam$/i
  );
  if (cikkszam && /^ACC-EUR-/i.test(cikkszam)) return true;
  return false;
}

/**
 * EUROLITE brand appears once in specs.Márka; strip duplicated "EUROLITE "
 * from the display name if present.
 */
export function normalizeEuroliteProduct<T extends RawProduct>(product: T): T {
  if (!isEuroliteProduct(product)) return product;

  const name = stripEuroliteNamePrefix(product.name);
  const prevSpecs = (product.specs ?? {}) as Record<string, string | number>;
  const rest: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(prevSpecs)) {
    if (/^márka$|^marka$/i.test(key)) continue;
    rest[key] = value;
  }

  return {
    ...product,
    name,
    specs: { Márka: "EUROLITE", ...rest },
  };
}

function loadSource(): SourceData {
  try {
    const raw = readFileSync(resolveSourcePath(), "utf-8");
    const parsed = JSON.parse(raw) as SourceData;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      products: Array.isArray(parsed.products) ? parsed.products : [],
    };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      return { products: [], users: [] };
    }
    throw err;
  }
}

export function toPublicProduct(
  product: Product & Record<string, unknown>
): Product {
  const normalized = normalizeEuroliteProduct(product as RawProduct);
  const specs = normalized.specs
    ? Object.fromEntries(
        Object.entries(normalized.specs)
          .filter(([key]) => !SENSITIVE_SPEC_KEY.test(key))
          .sort(([a], [b]) =>
            a.localeCompare(b, "hu", { sensitivity: "base" })
          )
      )
    : undefined;

  return {
    id: normalized.id,
    slug: normalized.slug,
    name: normalized.name,
    price: normalized.price,
    description: normalized.description,
    imageUrl: normalized.imageUrl,
    category: normalized.category,
    badge: normalized.badge,
    specs: specs && Object.keys(specs).length > 0 ? specs : undefined,
  };
}

function stripSensitiveTopLevel(
  product: Product & Record<string, unknown>
): Product & Record<string, unknown> {
  const copy = { ...product };
  for (const key of SENSITIVE_TOP_LEVEL) {
    delete copy[key];
  }
  return copy;
}

export function getProducts(): Product[] {
  return loadSource().products.map((p) =>
    toPublicProduct(stripSensitiveTopLevel(p))
  );
}

export function getProductById(id: number): Product | null {
  const product = loadSource().products.find((p) => p.id === id);
  if (!product) return null;
  return toPublicProduct(stripSensitiveTopLevel(product));
}

export function getRawProducts(): RawProduct[] {
  return loadSource().products;
}

export function getRawProductById(id: number): RawProduct | null {
  return getRawProducts().find((p) => p.id === id) ?? null;
}

function persistSource(data: SourceData): void {
  const sourcePath = resolveSourcePath();
  mkdirSync(dirname(sourcePath), { recursive: true });
  const tmp = `${sourcePath}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  renameSync(tmp, sourcePath);
}

export function saveSourceData(data: SourceData): void {
  if (!Array.isArray(data.products)) {
    throw new Error("Invalid source: products must be an array");
  }
  persistSource({
    users: data.users,
    products: data.products,
  });
}

export function upsertRawProduct(product: RawProduct): RawProduct {
  if (typeof product.id !== "number" || !Number.isFinite(product.id)) {
    throw new Error("Product id must be a finite number");
  }
  if (typeof product.name !== "string" || !product.name.trim()) {
    throw new Error("Product name required");
  }
  if (typeof product.price !== "number" || !Number.isFinite(product.price)) {
    throw new Error("Product price must be a finite number");
  }

  const source = loadSource();
  const idx = source.products.findIndex((p) => p.id === product.id);
  const cleaned = normalizeEuroliteProduct(stripDangerousKeys(product));
  if (idx >= 0) {
    source.products[idx] = { ...source.products[idx], ...cleaned, id: product.id };
  } else {
    source.products.push(cleaned);
  }
  persistSource(source);
  return getRawProductById(product.id)!;
}

export function deleteRawProduct(id: number): boolean {
  const source = loadSource();
  const before = source.products.length;
  source.products = source.products.filter((p) => p.id !== id);
  if (source.products.length === before) return false;
  persistSource(source);
  return true;
}

function stripDangerousKeys(value: RawProduct): RawProduct {
  const banned = new Set(["__proto__", "prototype", "constructor"]);
  return Object.fromEntries(
    Object.entries(value).filter(([key]) => !banned.has(key)),
  ) as RawProduct;
}

export function getUsers(): StoredUser[] {
  return (loadSource().users ?? []).map((u) => ({
    ...u,
    id: String(u.id),
  }));
}

export function getUserById(id: string): StoredUser | null {
  return getUsers().find((u) => u.id === id) ?? null;
}

export function getUserByEmail(email: string): StoredUser | null {
  const normalized = email.trim().toLowerCase();
  return (
    getUsers().find((u) => u.email.trim().toLowerCase() === normalized) ?? null
  );
}

export function closeDataProvider(): void {}
