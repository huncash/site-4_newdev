export const CONSENT_STORAGE_KEY = "rendezvenyarnyekolas-gdpr-consent";
export const CONSENT_VERSION = "1";

export type ConsentRecord = {
  version: string;
  acceptedAt: string;
  necessary: true;
};

export function readConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (parsed.version !== CONSENT_VERSION || !parsed.acceptedAt) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    acceptedAt: new Date().toISOString(),
    necessary: true,
  };
  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
  return record;
}
