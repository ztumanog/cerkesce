/**
 * @file src/services/CircassianDialectConverter.ts
 * @description Adıgece kelimeleri fonolojik kurallarla Kabardeyceye dönüştüren servis.
 */

import { GrammarDatabase, LexiconMapping, PhonologicalRule } from '../domain/gramer';

export class CircassianDialectConverter {
  constructor(private readonly db?: GrammarDatabase) {}

  /**
   * Adıgece kelimeyi Kabardeyceye dönüştürür.
   * @param word Dönüştürülecek Adıgece kelime
   */
  public convertAdygheToKabardian(word: string): string {
    const normalized = word.trim().toLowerCase();

    if (!this.db) {
      // Varsayılan temel kurallar (PL001 - PL005)
      return normalized
        .replaceAll('шIу', 'фI')
        .replaceAll('ф', 'ху')
        .replaceAll('шъ', 'щ')
        .replaceAll('жъ', 'жь')
        .replaceAll('шI', 'щI');
    }

    // Sözlük eşleşmesi kontrolü (m parametresine açık tip tanımı eklenmiştir)
    const lexiconMatch = this.db.lexicon_mappings?.find(
      (m: LexiconMapping) => m.adyghe.toLowerCase() === normalized
    );
    if (lexiconMatch) return lexiconMatch.kabardian;

    let result = normalized;
    const sortedRules: PhonologicalRule[] = [...(this.db.phonological_rules || [])].sort(
      (a: PhonologicalRule, b: PhonologicalRule) => b.adyghe_symbol.length - a.adyghe_symbol.length
    );

    for (const rule of sortedRules) {
      result = result.replaceAll(rule.adyghe_symbol, rule.kabardian_symbol);
    }

    return result;
  }
}