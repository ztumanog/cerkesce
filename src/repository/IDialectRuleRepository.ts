/**
 * @file src/repository/IDialectRuleRepository.ts
 * @description LehÃ§e deÄŸiÅŸim kurallarÄ±na (DialectRule) eriÅŸim saÄŸlayan Repository SÃ¶zleÅŸmesi (Interface).
 */

import { DialectRule } from "@/domain/dialect";

export interface IDialectRuleRepository {
  /**
   * Sistemdeki tÃ¼m aktif lehÃ§e kurallarÄ±nÄ± getirir.
   */
  getAllRules(): Promise<DialectRule[]>;

  /**
   * Kaynak lehÃ§eden hedef lehÃ§eye olan kurallarÄ± filtreleyerek getirir.
   */
  getRulesByDialects(fromDialect: string, toDialect: string): Promise<DialectRule[]>;
}
