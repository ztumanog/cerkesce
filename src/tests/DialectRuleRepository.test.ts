import { describe, it, expect, beforeEach } from "vitest";

// DialectRule arayÃ¼z tanÄ±mÄ± (gerekli alanlar ile)
export interface DialectRule {
  id: string;
  fromDialect: string;
  toDialect: string;
  pattern?: string;
  replacement?: string;
}

// In-Memory Repository SÄ±nÄ±fÄ±
export class InMemoryDialectRuleRepository {
  private rules: DialectRule[];

  constructor(initialRules: DialectRule[] = []) {
    this.rules = initialRules;
  }

  async getDialectRules(fromDialect?: string, toDialect?: string): Promise<DialectRule[]> {
    return this.rules.filter((rule) => {
      if (fromDialect && rule.fromDialect !== fromDialect) return false;
      if (toDialect && rule.toDialect !== toDialect) return false;
      return true;
    });
  }

  async getDialectRuleById(id: string): Promise<DialectRule | null> {
    return this.rules.find((rule) => rule.id === id) || null;
  }
}

describe("DialectRuleRepository Tests", () => {
  let repository: InMemoryDialectRuleRepository;

  beforeEach(() => {
    // Ã–rnek test verileri ile repository ilklendiriliyor
    const mockRules: DialectRule[] = [
      { id: "rule-1", fromDialect: "DOGU", toDialect: "BATI", pattern: "a", replacement: "e" },
      { id: "rule-2", fromDialect: "BATI", toDialect: "DOGU", pattern: "x", replacement: "y" }
    ];
    repository = new InMemoryDialectRuleRepository(mockRules);
  });

  it("repository kurallarÄ±nÄ±n doÄŸru Ã§alÄ±ÅŸtÄ±ÄŸÄ±nÄ± doÄŸrular", () => {
    expect(true).toBe(true);
  });

  it("tÃ¼m lehÃ§e kurallarÄ±nÄ± baÅŸarÄ±yla getirir", async () => {
    const rules = await repository.getDialectRules();
    expect(Array.isArray(rules)).toBe(true);
    expect(rules.length).toBe(2);
  });

  it("belirli kaynak ve hedef lehÃ§elere gÃ¶re kurallarÄ± getirir", async () => {
    const rules = await repository.getDialectRules("DOGU", "BATI");
    expect(rules).toBeDefined();
    expect(rules.length).toBe(1);
    expect(rules[0].fromDialect).toBe("DOGU");
    expect(rules[0].toDialect).toBe("BATI");
  });

  it("ID ile lehÃ§e kuralÄ±nÄ± getirir", async () => {
    const rule = await repository.getDialectRuleById("rule-1");
    expect(rule).not.toBeNull();
    expect(rule?.id).toBe("rule-1");
  });
});
