/**
 * Public catalog presentation rules (customer-facing):
 * - Brand name (EUROLITE / Omnilux) is stripped from product titles.
 * - Brand appears only once in specs as "Márka" (sorted with other specs).
 * - Supplier / procurement fields ("Forrás", Steinigke prefixes, etc.) are never shown.
 *
 * Always use getPublicProduct / getPublicProducts for storefront UI.
 * Raw `products` in catalog.ts may still contain internal fields for future admin.
 */

import {
  getProduct as getRawProduct,
  products as rawProducts,
  type Product,
} from "@/data/catalog";

const SENSITIVE_SPEC_KEY =
  /^(forrás|forras|beszerz|beszállít|beszallit|cost|purchase|wholesale|supplier|gyáriár|gyariar|nettobeszerz)/i;

const BRAND_NAME_PREFIX = /^(EUROLITE|Eurolite|OMNILUX|Omnilux)\s+/i;
const SUPPLIER_CIKK_PREFIX = /^(Steinigke|EUROLITE|Eurolite|Omnilux|OMNILUX)\s+/i;

function detectBrand(product: Product): string | undefined {
  const prefix = product.name.match(BRAND_NAME_PREFIX)?.[1];
  if (prefix) {
    return prefix.toUpperCase() === "OMNILUX" ? "Omnilux" : "EUROLITE";
  }
  for (const [key, value] of Object.entries(product.specs ?? {})) {
    if (/^márka$|^marka$/i.test(key) && value) {
      const v = String(value).trim();
      if (/eurolite/i.test(v)) return "EUROLITE";
      if (/omnilux/i.test(v)) return "Omnilux";
      return v;
    }
    if (/^forrás$|^forras$/i.test(key) && value) {
      const v = String(value);
      if (/eurolite/i.test(v)) return "EUROLITE";
      if (/omnilux/i.test(v)) return "Omnilux";
    }
  }
  if (/^ACC-EUR-/i.test(product.sku) || /eurolite/i.test(product.slug)) {
    return "EUROLITE";
  }
  if (/omnilux/i.test(product.slug) || /omnilux/i.test(product.sku)) {
    return "Omnilux";
  }
  return undefined;
}

function stripBrandFromName(name: string): string {
  return name.replace(BRAND_NAME_PREFIX, "").trim();
}

function cleanCikkszam(value: string): string {
  return value.replace(SUPPLIER_CIKK_PREFIX, "").trim();
}

function cleanImageAlt(alt: string | undefined, productName: string): string {
  if (!alt) return productName;
  if (/Steinigke|EUROLITE|Eurolite|Omnilux|gyártó/i.test(alt)) {
    return `${productName} — termékkép (illusztráció)`;
  }
  return alt;
}

/** Spec entries for display: sensitive keys removed, Márka set, ABC (hu) order. */
export function publicSpecEntries(
  specs: Record<string, string> | undefined
): [string, string][] {
  if (!specs) return [];
  return Object.entries(specs)
    .filter(([key]) => !SENSITIVE_SPEC_KEY.test(key))
    .map(([key, value]) => {
      if (/^cikkszám$|^cikkszam$/i.test(key)) {
        return [key, cleanCikkszam(String(value))] as [string, string];
      }
      return [key, String(value)] as [string, string];
    })
    .sort(([a], [b]) => a.localeCompare(b, "hu", { sensitivity: "base" }));
}

export function toPublicCatalogProduct(product: Product): Product {
  const brand = detectBrand(product);
  const name = stripBrandFromName(product.name);

  const prev = product.specs ?? {};
  const next: Record<string, string> = {};
  for (const [key, value] of Object.entries(prev)) {
    if (SENSITIVE_SPEC_KEY.test(key)) continue;
    if (/^márka$|^marka$/i.test(key)) continue;
    if (/^cikkszám$|^cikkszam$/i.test(key)) {
      next[key] = cleanCikkszam(String(value));
      continue;
    }
    next[key] = value;
  }
  if (brand) {
    next.Márka = brand;
  }

  // Stable ABC order when iterating Object.entries in older engines / React
  const ordered = Object.fromEntries(
    Object.entries(next).sort(([a], [b]) =>
      a.localeCompare(b, "hu", { sensitivity: "base" })
    )
  );

  return {
    ...product,
    name,
    coverImageAlt: cleanImageAlt(product.coverImageAlt, name),
    uvActiveImageAlt: product.uvActiveImageAlt
      ? cleanImageAlt(product.uvActiveImageAlt, name)
      : product.uvActiveImageAlt,
    specs: ordered,
  };
}

export function getPublicProducts(): Product[] {
  return rawProducts.map(toPublicCatalogProduct);
}

export function getPublicProduct(slug: string): Product | undefined {
  const raw = getRawProduct(slug);
  return raw ? toPublicCatalogProduct(raw) : undefined;
}
