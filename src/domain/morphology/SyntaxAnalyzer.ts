/**
 * SyntaxAnalyzer - Cumle yapisi cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-019 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl9.pdf (Cumle Yapisi)
 *
 * Desteklenen cumle tipleri:
 * - SOV       : Ozne-Nesne-Yuklem (Пшъашъэм тхылъыр ехы)
 * - OSV       : Nesne-Ozne-Yuklem (Л1ыр псым йытхъэлъэгъ)
 * - SV        : Ozne-Yuklem (Сабийм къ1ежых)
 * - OV        : Nesne-Yuklem (йыльэсыр йыуыхащь)
 * - ERGATIVE  : Ergatif yapi
 * - AFFECTIVE : Affektif yapi
 * - BARE      : Tek obek
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type SentenceType =
  | 'SOV'
  | 'OSV'
  | 'SV'
  | 'OV'
  | 'ERGATIVE'
  | 'AFFECTIVE'
  | 'BARE';

export interface SentenceNode {
  type: SentenceType;
  subject: string | null;
  object: string | null;
  predicate: string;
  isErgative: boolean;
  confidence: number;
}

// ============================================
// YARDIMCI
// ============================================

// Ergatif ekler
const ERGATIVE_SUFFIXES: string[] = ['м', 'хэм'];

// Absolutive ekler
const ABSOLUTIVE_SUFFIXES: string[] = ['р', 'хэр'];

// Affektif fiil onekleri
const AFFECTIVE_PREFIXES: string[] = ['йы1э', 'фэ', 'хуэ', 'ф1эф1'];

// ============================================
// SYNTAX ANALYZER
// ============================================

export class SyntaxAnalyzer {
  /**
   * Bir cumleyi cozumler.
   */
  analyze(phrases: string[]): SentenceNode {
    const tokens = phrases.filter(t => t && t.length > 0);

    if (tokens.length === 0) {
      return {
        type: 'BARE',
        subject: null,
        object: null,
        predicate: '',
        isErgative: false,
        confidence: 0,
      };
    }

    if (tokens.length === 1) {
      return {
        type: 'BARE',
        subject: null,
        object: null,
        predicate: tokens[0],
        isErgative: false,
        confidence: 0.5,
      };
    }

    // Ergatif tespit: cumlede en az 3 kelime VE hem ergatif (-м) hem absolutive (-р) olmali
    const hasErgative = tokens.some(t => this.hasErgativeSuffix(t));
    const hasAbsolutive = tokens.some(t => this.hasAbsolutiveSuffix(t));
    const isErgative = tokens.length >= 3 && hasErgative && hasAbsolutive;

    // Affektif tespit
    const isAffective = tokens.some(t => this.hasAffectivePrefix(t));

    // Fiil (son token genelde yuklem)
    const predicate = tokens[tokens.length - 1];

    // Ozne/nesne ayrimi
    let subject: string | null = null;
    let object: string | null = null;

    if (tokens.length >= 2) {
      // Ergatif varsa: ilk tokenlar arasinda ergatif olan ozne
      if (isErgative) {
        const ergIdx = tokens.findIndex(t => this.hasErgativeSuffix(t));
        if (ergIdx >= 0 && ergIdx < tokens.length - 1) {
          subject = tokens[ergIdx];
          object = tokens.filter((_, i) => i !== ergIdx && i !== tokens.length - 1)[0] || null;
        }
      } else {
        // Ergatif yoksa: SV veya OV
        subject = tokens[0];
        if (tokens.length >= 3) {
          object = tokens[1];
        }
      }
    }

    // Cumle tipi
    let type: SentenceType;
    if (isAffective) {
      type = 'AFFECTIVE';
    } else if (isErgative && subject && object) {
      type = 'ERGATIVE';
    } else if (tokens.length >= 3 && subject && object) {
      type = 'SOV';
    } else if (tokens.length === 2) {
      type = 'SV';
    } else {
      type = 'BARE';
    }

    return {
      type,
      subject,
      object,
      predicate,
      isErgative,
      confidence: 0.8,
    };
  }

  private hasErgativeSuffix(token: string): boolean {
    return ERGATIVE_SUFFIXES.some(s => token.endsWith(s) && token.length > s.length);
  }

  private hasAffectivePrefix(token: string): boolean {
    return AFFECTIVE_PREFIXES.some(p => token.startsWith(p));
  }

  private hasAbsolutiveSuffix(token: string): boolean {
    return ABSOLUTIVE_SUFFIXES.some(s => token.endsWith(s) && token.length > s.length);
  }

  analyzeBatch(sentences: string[][]): SentenceNode[] {
    return sentences.map(s => this.analyze(s));
  }

  getTypes(): SentenceType[] {
    return ['SOV', 'OSV', 'SV', 'OV', 'ERGATIVE', 'AFFECTIVE', 'BARE'];
  }

  isErgative(tokens: string[]): boolean {
    return this.analyze(tokens).isErgative;
  }

  getSubject(tokens: string[]): string | null {
    return this.analyze(tokens).subject;
  }

  getPredicate(tokens: string[]): string {
    return this.analyze(tokens).predicate;
  }
}
