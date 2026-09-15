/**
 * @file src/domain/dialect.ts
 * @description Diyalekt ve ses deÄŸiÅŸim kurallarÄ±nÄ±n domain tipleri.
 * @architecture circassian_dialect_rules.json ile birebir type-safe uyumludur.
 */

/**
 * Diyalekt kuralÄ±nÄ±n kelime Ã¼zerindeki etki alanÄ±
 */
export type RuleScope = 'root' | 'prefix' | 'suffix' | 'preverb';

/**
 * KuralÄ±n dilbilimsel doÄŸruluk/onay durumu
 */
export type RuleStatus = 'CONFIRMED' | 'CANDIDATE';

/**
 * Diyalektler arasÄ± ses/fonetik deÄŸiÅŸim kuralÄ±
 */
export interface DialectRule {
  id: string;
  sourcePattern: string;
  targetPattern: string;
  fromDialect: string;
  toDialect: string;
  description?: string;
}
