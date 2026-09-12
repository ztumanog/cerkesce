/**
 * @file src/services/CircassianDialectConverter.ts
 * @description AdÄ±gece kelimeleri fonolojik kurallarla Kabardeyceye dÃ¶nÃ¼ÅŸtÃ¼ren servis.
 */

import { GrammarDatabase, LexiconMapping, PhonologicalRule } from '../domain/gramer';

export class CircassianDialectConverter {
  constructor(private readonly db?: GrammarDatabase) {}

  /**
   * AdÄ±gece kelimeyi Kabardeyceye dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r.
   * @param word DÃ¶nÃ¼ÅŸtÃ¼rÃ¼lecek AdÄ±gece kelime
   */
  public convertAdygheToKabardian(word: string): string {
    const normalized = word.trim().toLowerCase();

    if (!this.db) {
      // VarsayÄ±lan temel kurallar (PL001 - PL005)
      return normalized
        .replaceAll('ÑˆIÑƒ', 'Ñ„I')
        .replaceAll('Ñ„', 'Ñ…Ñƒ')
        .replaceAll('ÑˆÑŠ', 'Ñ‰')
        .replaceAll('Ğ¶ÑŠ', 'Ğ¶ÑŒ')
        .replaceAll('ÑˆI', 'Ñ‰I');
    }

    // SÃ¶zlÃ¼k eÅŸleÅŸmesi kontrolÃ¼ (m parametresine aÃ§Ä±k tip tanÄ±mÄ± eklenmiÅŸtir)
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
