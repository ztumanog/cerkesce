/**
 * PossessiveParser - Çerkesçe Sahiplik Önekleri ve Çoğul Ek Çözümleyici
 * ADR-0050: Possessive Prefixes & Plural Suffix Decomposition
 */

export interface PossessiveInfo {
  prefix: string;
  person: string;
  glossTr: string;
}

export interface PluralInfo {
  suffix: string;
  isPlural: boolean;
  glossTr: string;
}

export interface PossessiveParseResult {
  word: string;
  stem: string;
  possessive?: PossessiveInfo | null;
  plural?: PluralInfo | null;
}

export class PossessiveParser {
  parse(word: string): PossessiveParseResult {
    const input = word ? word.trim() : '';
    if (!input) {
      return { word: '', stem: '', possessive: null, plural: null };
    }

    let stem = input;
    let possessive: PossessiveInfo | null = null;
    let plural: PluralInfo | null = null;

    // 1. Sahiplik Önekleri Kontrolü (си-, уи-, и-, ти-, фи-, я-)
    if (stem.startsWith('си') && stem.length > 2) {
      possessive = { prefix: 'си', person: '1SG', glossTr: 'Benim' };
      stem = stem.slice(2);
    } else if (stem.startsWith('уи') && stem.length > 2) {
      possessive = { prefix: 'уи', person: '2SG', glossTr: 'Senin' };
      stem = stem.slice(2);
    } else if (stem.startsWith('ти') && stem.length > 2) {
      possessive = { prefix: 'ти', person: '1PL', glossTr: 'Bizim' };
      stem = stem.slice(2);
    } else if (stem.startsWith('фи') && stem.length > 2) {
      possessive = { prefix: 'фи', person: '2PL', glossTr: 'Sizin' };
      stem = stem.slice(2);
    } else if (stem.startsWith('я') && stem.length > 1) {
      possessive = { prefix: 'я', person: '3PL', glossTr: 'Onların' };
      stem = stem.slice(1);
    } else if (stem.startsWith('и') && stem.length > 2 && !stem.startsWith('ин')) {
      possessive = { prefix: 'и', person: '3SG', glossTr: 'Onun' };
      stem = stem.slice(1);
    }

    // 2. Çoğul Eki Kontrolü (-хэр, -хэм, -хэ)
    if (stem.endsWith('хэр')) {
      plural = { suffix: 'хэр', isPlural: true, glossTr: 'Çoğul (Yalın/Belirli)' };
      stem = stem.slice(0, -3);
    } else if (stem.endsWith('хэм')) {
      plural = { suffix: 'хэм', isPlural: true, glossTr: 'Çoğul (Ergative/Eğik)' };
      stem = stem.slice(0, -3);
    } else if (stem.endsWith('хэ') && stem.length > 2) {
      plural = { suffix: 'хэ', isPlural: true, glossTr: 'Çoğul Eki' };
      stem = stem.slice(0, -2);
    }

    return {
      word: input,
      stem,
      possessive,
      plural,
    };
  }
}