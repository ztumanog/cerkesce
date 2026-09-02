import { DialectRule } from '../domain/dialect/DialectRule';

export class DialectRuleRepository {
  private rules: Map<string, DialectRule> = new Map();

  public save(rule: DialectRule): void {
    this.rules.set(rule.id, rule);
  }

  public findById(id: string): DialectRule | undefined {
    return this.rules.get(id);
  }

  public findByDialects(sourceDialect: string, targetDialect: string): DialectRule[] {
    return Array.from(this.rules.values()).filter(
      r => r.sourceDialect === sourceDialect && r.targetDialect === targetDialect
    );
  }

  public findAll(): DialectRule[] {
    return Array.from(this.rules.values());
  }

  public clear(): void {
    this.rules.clear();
  }
}