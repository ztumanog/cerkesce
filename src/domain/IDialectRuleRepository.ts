/**
 * @file src/domain/IDialectRuleRepository.ts
 * @description Diyalekt kurallarına erişim için Repository arayüz tanımı.
 */

import { DialectRule } from './dialect';

export interface IDialectRuleRepository {
  /**
   * Tüm diyalekt kurallarını döndürür.
   */
  getAllRules(): DialectRule[];

  /**
   * Fonolojik (ses bilgisi) kuralları döndürür.
   */
  getPhonologicalRules(): DialectRule[];

  /**
   * Gramer kurallarını döndürür.
   */
  getGrammaticalRules(): DialectRule[];

  /**
   * ID değerine göre spesifik bir kuralı döndürür.
   */
  getRuleById(id: string): DialectRule | null;
}