import type { Product } from "@/data/catalog";

const VAT_RATE = 0.27;

function formatNetHuf(value: number): string {
  return `${value.toLocaleString("hu-HU").replace(/\u00A0/g, "\u202F")}\u202FFt`;
}

type Variant = "card" | "detail";

export function PriceBadge({
  product,
  variant = "card",
}: {
  product: Product;
  variant?: Variant;
}) {
  const fp = product.featuredPrice;
  if (!fp) return null;

  const sp = product.salePrice;
  const hasSale = !!sp && sp.netHuf > 0 && sp.netHuf < fp.netHuf;

  const activeNet = hasSale ? sp!.netHuf : fp.netHuf;
  const activeUnit = hasSale ? (sp!.unit ?? fp.unit) : fp.unit;
  const gross = Math.round(activeNet * (1 + VAT_RATE));

  const saveFt = hasSale ? fp.netHuf - sp!.netHuf : 0;
  const savePct = hasSale ? Math.round((saveFt / fp.netHuf) * 100) : 0;
  const unitLabel = activeUnit ?? "";

  if (variant === "detail") {
    return (
      <div className="rounded-md border border-border bg-muted/40 p-4">
        {hasSale ? (
          <div className="mt-2 text-sm text-muted-foreground">
            Katalógus ár:{" "}
            <span className="line-through">
              {formatNetHuf(fp.netHuf)} + ÁFA
              {fp.unit ? ` ${fp.unit}` : "\u00A0"}
            </span>
          </div>
        ) : null}

        <div className="mt-1 flex flex-wrap items-baseline gap-3">
          <div className="text-xs text-muted-foreground">
            {hasSale ? "Jelenlegi ár:" : "Ár:"}
          </div>
          <div
            className={`font-semibold tracking-tight ${
              hasSale
                ? "text-3xl text-brand md:text-4xl"
                : "text-2xl text-foreground md:text-3xl"
            }`}
          >
            {formatNetHuf(activeNet)}
          </div>
          <div className="text-xs text-muted-foreground">
            + ÁFA{activeUnit ? ` ${activeUnit}` : "\u00A0"}
          </div>
          {hasSale ? (
            <div className="text-xs italic text-brand/80">
              Kedvezmény mértéke: −({formatNetHuf(saveFt)} + ÁFA)
              {unitLabel ? ` ${unitLabel}` : "\u00A0"}, −{savePct}%
            </div>
          ) : null}
        </div>

        <div className="mt-1 text-sm text-muted-foreground">
          Bruttó: {formatNetHuf(gross)}
          {activeUnit ? ` ${activeUnit}` : ""}
        </div>
      </div>
    );
  }

  if (hasSale) {
    return (
      <div className="mt-2">
        <div className="text-[11px] text-muted-foreground">
          Katalógus ár:{" "}
          <span className="line-through">
            {formatNetHuf(fp.netHuf)} + ÁFA
            {fp.unit ? ` ${fp.unit}` : "\u00A0"}
          </span>
        </div>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-2">
          <span className="text-[10px] text-muted-foreground">Jelenlegi ár:</span>
          <div className="text-lg font-semibold text-brand">
            {formatNetHuf(activeNet)}
          </div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            + ÁFA{activeUnit ? ` ${activeUnit}` : "\u00A0"}
          </div>
          <span className="text-[10px] italic text-brand/80">
            Kedvezmény mértéke: −({formatNetHuf(saveFt)} + ÁFA)
            {unitLabel ? ` ${unitLabel}` : "\u00A0"}, −{savePct}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 flex flex-wrap items-baseline gap-2">
      <div className="text-base font-semibold text-foreground">
        {formatNetHuf(fp.netHuf)}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        + ÁFA{fp.unit ? ` ${fp.unit}` : "\u00A0"}
      </div>
    </div>
  );
}
