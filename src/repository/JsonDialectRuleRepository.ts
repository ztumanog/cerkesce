/**
 * @file src/repository/JsonDialectRuleRepository.ts
 * @description IDialectRuleRepository arayüzünü tam uygulayan repository.
 */

import { DialectRule } from "@/domain/dialect";
import { IDialectRuleRepository } from "./IDialectRuleRepository";

export class JsonDialectRuleRepository implements IDialectRuleRepository {
  private rules: DialectRule[];

  constructor(initialRules: DialectRule[] = []) {
    this.rules = initialRules;
  }

  async getAllRules(): Promise<DialectRule[]> {
    return [...this.rules];
  }

  /**
   * IDialectRuleRepository sözleşmesinin zorunlu kıldığı filtreleme metodu.
   */
  async getRulesByDialects(fromDialect: string, toDialect: string): Promise<DialectRule[]> {
    return this.rules.filter(
      (rule) =>
        (rule.fromDialect === fromDialect || rule.fromDialect === "ALL") &&
        (rule.toDialect === toDialect || rule.toDialect === "ALL")
    );
  }

  public loadRules(newRules: DialectRule[]): void {
    this.rules = newRules;
  }
}