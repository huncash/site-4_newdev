# Admin port notes — Supabase → saját motor (későbbi munka)

A régi Lovable projekt (`inspiration old/rendezvenyarnyekolas-main`) admin funkciói. **Most nem implementáljuk**; ez a specifikáció a függőségmentes újraépítéshez.

## Forrásfájlok

| Terület | Fájlok |
|--------|--------|
| Készlet UI | `src/routes/admin.keszlet.tsx` |
| Árrés UI | `src/routes/admin.arreskalkulacio.tsx` |
| Admin gate | `src/components/admin/AdminGate.tsx`, `AdminHeader.tsx` |
| Pricing RPC | `src/lib/pricing.functions.ts` |
| Supplier scrape | `src/lib/supplier.functions.ts`, `supplier.server.ts` |
| Publikus override | `src/lib/public-pricing.functions.ts`, `pricing-overrides.tsx` |
| Auth | `src/integrations/supabase/*`, `src/routes/auth.tsx` |
| SQL | `supabase/migrations/*` |

## 1. Készlet (`/admin/keszlet`)

- **Már localStorage**, nem Supabase: kulcs `rh-admin-keszlet-v1`.
- Termékenként: `{ status, note }` ahol `status ∈ kesz | foglalt | kifutott | ismeretlen`.
- Katalógus slug-okra épül (`products` a `catalog.ts`-ből).
- **Port:** JSON fájl `private_data/inventory.json` + site-4 admin session (partner/admin cookie), ugyanaz a státuszmodell.

## 2. Árréskalkuláció (`/admin/arreskalkulacio`)

### Táblák (Supabase)

**`catalog_pricing`** (slug PK / unique):

- `slug`
- `cost_eur`, `cost_huf`, `public_list_eur`
- `eur_huf_rate`
- `margin_pct`
- `approved_net_huf`, `sale_net_huf`
- `source_url`, `notes`, `supplier_art_no`
- `updated_by`, timestamps

**`competitor_prices`:**

- konkurens nettó árak slug-hoz, `scraped_at`, bulk TSV import

**`user_roles`:**

- `user_id`, `role` (`admin`) — AdminGate ezt ellenőrzi

### Üzleti logika

- Két mód: (a) beszerzés + X% árrés (min. ~20% állítható), (b) konkurens nettó alá Y% undercut.
- Élő EUR→HUF: frankfurter.dev (ECB), kézi felülírás lehetséges.
- `upsertPricing` / `deletePricing` / `listPricing` / `searchCompetitorPrices`.
- Publikus oldal: `getPublicPricing` → `applyPricingOverride` a `featuredPrice` / `salePrice` fölé.

### Port cél (site-4)

- Tárolás: `private_data/catalog_pricing.json` + `competitor_prices.json` (vagy egy DB fájl).
- Auth: meglévő `session-token` + admin role a `source_data.json` users-ben (vagy külön admin store).
- Publikus katalógus: opcionális merge a statikus `catalog.ts` árak fölé — **jelenleg a katalógus a `catalog.ts` fix árait használja**.

## 3. Auth (régi)

- Supabase Auth session + `user_roles.admin`.
- Illetéktelennek 404 maszkolás (AdminGate).
- **Port:** site-4 partner/admin session cookie; ne hozzunk be Supabase SDK-t.

## 4. Megrendelés (régi `submitOrder`)

- Server fn + DB sor.
- **Most:** `/megrendeles` → `/api/contact` (`type: "order"`) + console log.
- **Később:** `private_data/orders.json` vagy hasonló saját store, e-mail küldéssel.

## 5. Ajánlott implementációs sorrend (később)

1. Admin session + szerepkör a meglévő auth mintára.
2. Készlet JSON CRUD (egyszerű, már localStorage-modell).
3. `catalog_pricing` JSON + admin UI (árrés / undercut / EUR rate).
4. Publikus `applyPricingOverride` a katalógus olvasáskor.
5. Orders store a contact API mellé.

## 6. Nem portolandó

- `@supabase/supabase-js`, TanStack Start server fn middleware.
- Külső beszállítói scrape, ha instabil — opcionális, külön epic.
