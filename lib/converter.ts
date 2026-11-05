// Адыгэбзэ Псалъалъэ
export const trToAdMap: Record<string, string[]> = {
  "kedi": ["шы", "чъэтыу", "кэт"],
  "psı": ["шы"],
  "köpek": ["хьэ"],
  "ev": ["унэ"],
  "su": ["псы"],
}
export const adToTrMap: Record<string, string> = Object.fromEntries(
  Object.entries(trToAdMap).flatMap(([tr, adList]) => adList.map(ad => [ad, tr]))
);
export function normalizeQuery(q: string): string[] {
  if (!q) return [];
  const clean = q.trim().toLowerCase();
  if (trToAdMap[clean]) return [clean, ...trToAdMap[clean]];
  if (adToTrMap[clean]) return [clean, adToTrMap[clean]];
  return [clean];
}
