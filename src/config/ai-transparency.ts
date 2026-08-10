/**
 * EU AI Act (2024/1689) Article 50 — transparency for deployers.
 * Applicable from 2026-08-02. Commission Guidelines / Code of Practice (2026).
 *
 * Rendezvényárnyékolás acts as a deployer (üzembehelyező) when publishing
 * AI-generated or AI-manipulated content in a professional/business context.
 */

export type AiDisclosureKind =
  | "none"
  | "assisted" // AI-assisted draft with substantive human editorial review
  | "generated" // predominantly / fully AI-generated (no or insufficient human review)
  | "modified"; // AI-manipulated (e.g. synthetic image resembling real content)

export const AI_ACT = {
  regulation: "EU 2024/1689",
  article: "50",
  applicableFrom: "2026-08-02",
  guidelinesUrl:
    "https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act",
  codeOfPracticeUrl:
    "https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content",
  iconsUrl:
    "https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content",
} as const;

export const AI_DISCLOSURE_COPY: Record<
  Exclude<AiDisclosureKind, "none">,
  { shortLabel: string; longLabel: string; machineValue: string }
> = {
  assisted: {
    shortLabel: "AI-segített · emberi szerkesztés",
    longLabel:
      "Ez a tartalom mesterséges intelligencia segítségével készült vázlatból indult, majd érdemi emberi felülvizsgálaton és szerkesztői felelősségvállaláson esett át (AI Act 50. cikk — szövegjelölési kötelezettség alóli mentesség feltételei szerint).",
    machineValue: "ai-assisted-human-reviewed",
  },
  generated: {
    shortLabel: "AI GENERATED",
    longLabel:
      "Ez a tartalom mesterséges intelligenciával került előállításra. Az AI Act 50. cikk szerinti átláthatósági tájékoztatás.",
    machineValue: "ai-generated",
  },
  modified: {
    shortLabel: "AI MODIFIED",
    longLabel:
      "Ez a kép / média mesterséges intelligenciával létrehozott vagy módosított elemeket tartalmaz, és valódinak tűnhet. Az AI Act 50. cikk (4) szerinti deepfake / szintetikus tartalom jelölése.",
    machineValue: "ai-modified",
  },
};

/** Default policy for marketing site copy after human editorial pass. */
export const SITE_MARKETING_AI_POLICY: AiDisclosureKind = "assisted";
