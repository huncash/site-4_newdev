import Link from "next/link";

import {
  AI_DISCLOSURE_COPY,
  type AiDisclosureKind,
} from "@/config/ai-transparency";
import { cn } from "@/lib/utils";

export interface AiContentLabelProps {
  kind: Exclude<AiDisclosureKind, "none">;
  /** Compact badge (e.g. media overlay) vs full notice block. */
  variant?: "badge" | "notice";
  className?: string;
  showPolicyLink?: boolean;
}

/**
 * Clear, first-exposure human-readable AI disclosure (AI Act Art. 50(4)–(5)).
 * Includes machine-readable data attributes for detection / auditing.
 */
export function AiContentLabel({
  kind,
  variant = "notice",
  className,
  showPolicyLink = true,
}: AiContentLabelProps) {
  const copy = AI_DISCLOSURE_COPY[kind];

  if (variant === "badge") {
    return (
      <span
        role="note"
        data-ai-generated={kind !== "assisted" ? "true" : "false"}
        data-ai-disclosure={copy.machineValue}
        className={cn(
          "inline-flex items-center gap-1.5 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
          "bg-section-dark text-section-dark-foreground",
          className,
        )}
      >
        <span
          aria-hidden="true"
          className="rounded-sm bg-brand px-1 py-0.5 text-[9px] text-brand-foreground"
        >
          AI
        </span>
        {copy.shortLabel}
      </span>
    );
  }

  return (
    <aside
      role="note"
      aria-label="Mesterséges intelligencia átláthatósági tájékoztatás"
      data-ai-generated={kind !== "assisted" ? "true" : "false"}
      data-ai-disclosure={copy.machineValue}
      className={cn(
        "mb-6 rounded border border-border bg-muted/60 px-3 py-3 text-xs leading-relaxed text-muted-foreground",
        className,
      )}
    >
      <p className="font-semibold text-foreground">
        <span className="mr-2 inline-block rounded bg-section-dark px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-section-dark-foreground">
          AI
        </span>
        {copy.shortLabel}
      </p>
      <p className="mt-1.5">{copy.longLabel}</p>
      {showPolicyLink ? (
        <p className="mt-2">
          <Link href="/ai-atlathatosag" className="underline underline-offset-2">
            AI átláthatósági tájékoztató
          </Link>
        </p>
      ) : null}
    </aside>
  );
}
