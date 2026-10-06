import { normalizePalochka } from '@/domain/utils/normalizePalochka';

export interface Lexeme {
  id: string;
  form?: string;
  literalMeaning?: string;
  conceptId?: string;
  conceptIds?: string[];
  partOfSpeech?: string;
  ipa?: string;
  corpusFrequency?: number;
  wordFamilyId?: string;
  derivation?: { rootIds?: string[] } | null;      // ⭐ EKLE
  dialectVariants?: { adyghe?: string; kabardian?: string } | null;  // ⭐ EKLE
}

/** ADR-0026 K3 — tek normalizasyon noktası */
export function normKey(s: string | undefined | null): string {
  if (!s) return '';
  return normalizePalochka(s).trim().toLowerCase();
}

/** ADR-0026 K2 ön filtre */
const PLACEHOLDERS = new Set(['?', '??', '???', '-', '--', '']);

function isUsableMeaning(lm: string | undefined): boolean {
  if (!lm) return false;
  return !PLACEHOLDERS.has(lm.trim());
}

/** ADR-0026 K2 — Deterministik seçim */
export function pickLexeme(candidates: Lexeme[], key: string): Lexeme | undefined {
  if (candidates.length === 0) return undefined;
  if (candidates.length === 1) return candidates[0];

  return [...candidates].sort((a, b) => {
    const af = normKey(a.form) === key ? 1 : 0;
    const bf = normKey(b.form) === key ? 1 : 0;
    if (af !== bf) return bf - af;

    const afr = a.corpusFrequency ?? -1;
    const bfr = b.corpusFrequency ?? -1;
    if (afr !== bfr) return bfr - afr;

    return a.id.localeCompare(b.id);
  })[0];
}

/** Çift yönlü indeks */
export function buildLexemeIndex(lexemes: Lexeme[]): Map<string, Lexeme> {
  const buckets = new Map<string, Lexeme[]>();

  const push = (raw: string | undefined, lx: Lexeme) => {
    const k = normKey(raw);
    if (!k) return;
    const b = buckets.get(k);
    if (b) b.push(lx);
    else buckets.set(k, [lx]);
  };

  for (const lx of lexemes) {
    push(lx.form, lx);
    if (isUsableMeaning(lx.literalMeaning)) {
      for (const part of lx.literalMeaning!.split(',')) {
        push(part, lx);
      }
    }
  }

  const index = new Map<string, Lexeme>();
  for (const [k, cands] of buckets) {
    const winner = pickLexeme(cands, k);
    if (winner) index.set(k, winner);
  }
  return index;
}
