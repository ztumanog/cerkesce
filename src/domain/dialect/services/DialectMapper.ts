import { DialectCode } from '../types/DialectTypes';

export interface TransformationRule {
  sourceDialect: DialectCode;
  targetDialect: DialectCode;
  pattern: RegExp | string;
  replacement: string;
}

export class DialectMapper {
  private rules: TransformationRule[] = [];

  public addRule(rule: TransformationRule): void {
    this.rules.push(rule);
  }

  /**
   * Bir diyalekteki metni sadece tanımlı ortografik ve fonolojik kurallara göre dönüştürür.
   * Hiçbir semantik müdahalede veya tahminde bulunmaz.
   */
  public transform(text: string, source: DialectCode, target: DialectCode): string {
    let result = text;
    const applicableRules = this.rules.filter(
      r => r.sourceDialect === source && r.targetDialect === target
    );

    for (const rule of applicableRules) {
      if (typeof rule.pattern === 'string') {
        result = result.split(rule.pattern).join(rule.replacement);
      } else {
        result = result.replace(rule.pattern, rule.replacement);
      }
    }

    return result;
  }
}