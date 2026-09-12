/**
 * @file src/domain/IDialectRuleRepository.ts
 * @description Diyalekt kurallarÄ±na eriÅŸim iÃ§in Repository arayÃ¼z tanÄ±mÄ±.
 */

import { DialectRule } from './dialect';

export interface IDialectRuleRepository {
  /**
   * TÃ¼m diyalekt kurallarÄ±nÄ± dÃ¶ndÃ¼rÃ¼r.
   */
  getAllRules(): DialectRule[];

  /**
   * Fonolojik (ses bilgisi) kurallarÄ± dÃ¶ndÃ¼rÃ¼r.
   */
  getPhonologicalRules(): DialectRule[];

  /**
   * Gramer kurallarÄ±nÄ± dÃ¶ndÃ¼rÃ¼r.
   */
  getGrammaticalRules(): DialectRule[];

  /**
   * ID deÄŸerine gÃ¶re spesifik bir kuralÄ± dÃ¶ndÃ¼rÃ¼r.
   */
  getRuleById(id: string): DialectRule | null;
}
