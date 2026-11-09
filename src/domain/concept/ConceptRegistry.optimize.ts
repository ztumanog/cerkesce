// src/domain/concept/ConceptRegistry.optimize.ts
// 231KB -> ~2KB ID Set, singleton cache, O(1) validation
let _cache: Set<string> | null = null;
let _loading: Promise<Set<string>> | null = null;

export async function getValidConcepts(): Promise<Set<string>> {
  if (_cache) return _cache;
  if (_loading) return _loading;
  _loading = fetch("/api/curation/concepts", { cache: "force-cache" })
    .then(r => r.json())
    .then((data: any[]) => {
      const s = new Set<string>(data.map((c: any) => c.id || c.conceptId).filter(Boolean));
      _cache = s;
      return s;
    })
    .catch(() => new Set<string>());
  return _loading;
}
export function isValidConceptId(id: string, valid: Set<string>): boolean {
  if (!id) return false;
  if (!/^[A-Z][A-Z0-9_]*$/.test(id)) return false;
  return valid.has(id);
}
export function validateBatch(ids: string[], valid: Set<string>) {
  const invalid: string[] = []; const validList: string[] = [];
  for (const id of ids) { if (isValidConceptId(id, valid)) validList.push(id); else invalid.push(id); }
  return { validList, invalid, validCount: validList.length, invalidCount: invalid.length };
}
export function clearConceptCache() { _cache = null; _loading = null; }
