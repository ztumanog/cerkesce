/**
 * @file src/repository/IDialectRuleRepository.ts
 * @description Lehçe değişim kurallarına (DialectRule) erişim sağlayan Repository Sözleşmesi (Interface).
 */

import { DialectRule } from "@/domain/dialect";

export interface IDialectRuleRepository {
  /**
   * Sistemdeki tüm aktif lehçe kurallarını getirir.
   */
  getAllRules(): Promise<DialectRule[]>;

  /**
   * Kaynak lehçeden hedef lehçeye olan kuralları filtreleyerek getirir.
   */
  getRulesByDialects(fromDialect: string, toDialect: string): Promise<DialectRule[]>;
}