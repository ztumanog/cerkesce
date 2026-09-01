/**
 * @file src/domain/dialect.ts
 * @description Diyalekt ve ses değişim kurallarının domain tipleri.
 * @architecture circassian_dialect_rules.json ile birebir type-safe uyumludur.
 */

/**
 * Diyalekt kuralının kelime üzerindeki etki alanı
 */
export type RuleScope = 'root' | 'prefix' | 'suffix' | 'preverb';

/**
 * Kuralın dilbilimsel doğruluk/onay durumu
 */
export type RuleStatus = 'CONFIRMED' | 'CANDIDATE';

/**
 * Diyalektler arası ses/fonetik değişim kuralı
 */
export interface DialectRule {
  id: string;
  sourcePattern: string;
  targetPattern: string;
  fromDialect: string;
  toDialect: string;
  description?: string;
}