/**
 * VerbSuffixDecompiler - Fiil zaman ekleri cozumleyici
 * LemmaBuilderV2'den bagimsiz, basit versiyon
 */

import fs from 'fs';
import path from 'path';

export interface SuffixResult {
  morpheme: string;
  code: string;
  gloss: string;
}

// Lexeme set (kok kontrolu icin)
let LEXEME_SET: Set<string> | null = null;
function getLexemeSet(): Set<string> {
  if (LEXEME_SET) return LEXEME_SET;
  try {
    const lexPath = path.resolve('./public/data/linguistic/lexemes.json');
    const lex = JSON.parse(fs.readFileSync(lexPath, 'utf-8'));
    LEXEME_SET = new Set(lex.map((l: any) => l.form));
  } catch {
    LEXEME_SET = new Set();
  }
  return LEXEME_SET;
}

const VERB_SUFFIXES: Array<{ pattern: RegExp; code: string; gloss: string }> = [
  { pattern: /щтэп$/, code: 'FUTURE_NEGATION', gloss: 'Olumsuz Gelecek' },
  { pattern: /тэп$/, code: 'IMPERFECT_NEGATION', gloss: 'Olumsuz Genis/Gecmis' },
  { pattern: /къым$/, code: 'FINITE_NEGATION', gloss: 'Olumsuzluk' },
  { pattern: /ащ$/, code: 'PRETERITE_DECLARATIVE', gloss: 'Belirli Gecmis Bildirme' },
  { pattern: /гъат$/, code: 'ANTERIOR_PLUPERFECT', gloss: 'Uzak Gecmis Anterior' },
  { pattern: /гъа$/, code: 'PLUPERFECT', gloss: 'Uzak Gecmis' },
  { pattern: /ат$/, code: 'PAST_ANTERIOR', gloss: 'Gecmis Anterior' },
  { pattern: /а$/, code: 'PRETERITE', gloss: 'Belirli Gecmis' },
  { pattern: /рт$/, code: 'IMPERFECT_DYN', gloss: 'Simdiki Hikaye' },
  { pattern: /т$/, code: 'IMPERFECT', gloss: 'Gecmis Sureklilik' },
  { pattern: /нущ$/, code: 'FACTUAL_FUTURE', gloss: 'Kesin Gelecek' },
  { pattern: /ну$/, code: 'FUTURE_BASE', gloss: 'Gelecek Tabani' },
  { pattern: /нщ$/, code: 'CATEGORICAL_FUTURE', gloss: 'Kategorik Gelecek' },
  { pattern: /жь$/, code: 'REPETITIVE', gloss: 'Tekrar' },
  { pattern: /ж$/, code: 'REPETITIVE', gloss: 'Tekrar' },
  { pattern: /ф$/, code: 'POTENTIAL', gloss: 'Yeterlilik' },
  { pattern: /пэ$/, code: 'TOTALITIVE', gloss: 'Tamamen' },
  { pattern: /мэ$/, code: 'CONDITIONAL', gloss: 'Sart' },
  { pattern: /м$/, code: 'CONDITIONAL_SHORT', gloss: 'Sart' },
  { pattern: /щ$/, code: 'INDICATIVE', gloss: 'Bildirme' },
];

export class VerbSuffixDecompiler {
  static decompile(word: string): { stripped: string; suffixes: SuffixResult[] } {
    let remaining = word.trim();
    const suffixes: SuffixResult[] = [];
    let changed = true;
    let iterations = 0;

    while (changed && iterations < 5) {
      changed = false;
      iterations++;

      for (const s of VERB_SUFFIXES) {
        const match = remaining.match(s.pattern);
        if (match) {
          const stripped = remaining.slice(0, -match[0].length);
          if (stripped.length >= 2) {
            let finalStripped = stripped;
            // "у" ile biten koklerde "э" geri ekle (кIу -> кIуэ)
            if (stripped.endsWith('у') && (match[0] === 'ащ' || match[0] === 'а')) {
              const withE = stripped + 'э';
              if (getLexemeSet().has(withE)) {
                finalStripped = withE;
              }
            }
            suffixes.unshift({
              morpheme: match[0],
              code: s.code,
              gloss: s.gloss,
            });
            remaining = finalStripped;
            changed = true;
            break;
          }
        }
      }
    }

    return { stripped: remaining, suffixes };
  }
}
