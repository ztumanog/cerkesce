/**
 * PhraseAnalyzer - Kelime obegi cozumleyici
 * ADR-0040: Morphological Root Taxonomy
 * P4-018 - Morphology Engine
 *
 * Kaynak: Kumakhov, gl8.pdf (Kelime Obekleri)
 *
 * Desteklenen obek tipleri:
 * - NP     : Isim obegi     (лIыр)
 * - AdjP   : Sifat obegi    (хьалыгъу фыжь)
 * - NumP   : Sayi obegi     (мэфибл)
 * - PossP  : Iyelik obegi   (лIыжьым йыпа1уэ)
 * - PP     : Edat obegi     (унэм дэжь)
 * - VP     : Fiil obegi     (уынэ сэш1ы)
 * - PartP  : Partisip obegi (шысь к1алэр)
 * - BARE   : Tek kelime     (унэ)
 *
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

// ============================================
// TIP TANIMLARI
// ============================================

export type PhraseType =
  | 'NP'
  | 'AdjP'
  | 'NumP'
  | 'PossP'
  | 'PP'
  | 'VP'
  | 'PartP'
  | 'BARE';

export interface PhraseNode {
  type: PhraseType;
  tokens: string[];
  head: string;
  dependents: string[];
  confidence: number;
}

// ============================================
// YARDIMCI KELIME LISTELERI
// ============================================

const POSTPOSITIONS: string[] = [
  'дэжь', 'деж', 'пайэ', 'пIшIондэ', 'лъандэрэ',
  'щхьэкIэ', 'пэмычI', 'нэмычI', 'пачIэ', 'гъунэгъу',
];

const NUMERALS: string[] = [
  'зы', 'тIу', 'щы', 'пIлIы', 'тху', 'хы', 'блы', 'и', 'бгъу', 'пIщIы',
  'тIошI', 'щэ',
];

const ADJECTIVES: string[] = [
  'фыжь', 'плыжь', 'дахэ', 'ин', 'бзаджэ', 'пагэ',
  'лъагэ', 'щIыIу', 'хужь',
];

const POSSESSIVE_PREFIXES: string[] = [
  'си', 'уи', 'йи', 'ди', 'фи', 'йа', 'сэ', 'уэ',
];

const PARTICIPLE_SUFFIXES: string[] = [
  'щ', 'гъэ',
];

const VERB_PREFIXES: string[] = [
  'зы', 'къы', 'ху', 'зды', 'дэ', 'хэ', 'гъэ', 'уы',
];

// ============================================
// PHRASE ANALYZER
// ============================================

export class PhraseAnalyzer {
  analyzePhrases(tokens: string[]): PhraseNode[] {
    const phrases: PhraseNode[] = [];

    if (!tokens || tokens.length === 0) {
      return phrases;
    }

    if (tokens.length === 1) {
      phrases.push(this.makePhrase(tokens, 'BARE'));
      return phrases;
    }

    let currentTokens: string[] = [];

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      const nextToken = tokens[i + 1];

      // Edat
      if (this.isPostposition(token)) {
        if (currentTokens.length > 0) {
          phrases.push(this.makePhrase([...currentTokens, token], 'PP'));
          currentTokens = [];
        } else {
          phrases.push(this.makePhrase([token], 'PP'));
        }
        continue;
      }

      // Sayi
      if (this.isNumeral(token) && nextToken) {
        phrases.push(this.makePhrase([token, nextToken], 'NumP'));
        i++;
        continue;
      }

      // Sifat
      if (this.isAdjective(token) && nextToken) {
        phrases.push(this.makePhrase([nextToken, token], 'AdjP'));
        i++;
        continue;
      }

      // Iyelik
      if (this.isPossessivePrefix(token) && nextToken) {
        phrases.push(this.makePhrase([token, nextToken], 'PossP'));
        i++;
        continue;
      }

      // Partisip
      if (this.isParticiple(token) && nextToken) {
        phrases.push(this.makePhrase([token, nextToken], 'PartP'));
        i++;
        continue;
      }

      // Fiil oneki
      if (this.isVerbPrefix(token) && nextToken) {
        phrases.push(this.makePhrase([token, nextToken], 'VP'));
        i++;
        continue;
      }

      currentTokens.push(token);
    }

    if (currentTokens.length > 0) {
      if (currentTokens.length === 1) {
        phrases.push(this.makePhrase(currentTokens, 'BARE'));
      } else {
        phrases.push(this.makePhrase(currentTokens, 'NP'));
      }
    }

    return phrases;
  }

  private isPostposition(token: string): boolean {
    return POSTPOSITIONS.includes(token);
  }

  private isNumeral(token: string): boolean {
    return NUMERALS.includes(token);
  }

  private isAdjective(token: string): boolean {
    return ADJECTIVES.includes(token);
  }

  private isPossessivePrefix(token: string): boolean {
    return POSSESSIVE_PREFIXES.includes(token);
  }

  private isParticiple(token: string): boolean {
    return PARTICIPLE_SUFFIXES.some(s => token.endsWith(s) && token.length > s.length);
  }

  private isVerbPrefix(token: string): boolean {
    return VERB_PREFIXES.some(p => token.startsWith(p) && token.length > p.length);
  }

  private makePhrase(tokens: string[], type: PhraseType): PhraseNode {
    const validTokens = tokens.filter(t => t && t.length > 0);
    return {
      type,
      tokens: validTokens,
      head: validTokens[validTokens.length - 1] || '',
      dependents: validTokens.slice(0, -1),
      confidence: 0.8,
    };
  }

  analyzeBatch(tokenArrays: string[][]): PhraseNode[][] {
    return tokenArrays.map(tokens => this.analyzePhrases(tokens));
  }

  getTypes(): PhraseType[] {
    return ['NP', 'AdjP', 'NumP', 'PossP', 'PP', 'VP', 'PartP', 'BARE'];
  }
}
