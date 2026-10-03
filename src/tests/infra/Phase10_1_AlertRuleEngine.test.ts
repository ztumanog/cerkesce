import { describe, it, expect } from 'vitest';
import { AlertRuleEngine } from '../../infra/operations/AlertRuleEngine';

describe('Sprint 10.1 - AlertRuleEngine', () => {
  it('CPU warning uretir', () => {
    const alert = AlertRuleEngine.evaluate('cpu', 75);
    expect(alert).toBeDefined();
    expect(alert?.severity).toBe('warning');
  });

  it('CPU critical uretir', () => {
    const alert = AlertRuleEngine.evaluate('cpu', 95);
    expect(alert?.severity).toBe('critical');
  });

  it('Normal deger alert uretmez', () => {
    const alert = AlertRuleEngine.evaluate('cpu', 50);
    expect(alert).toBeNull();
  });

  it('Cache dusukse critical', () => {
    const alert = AlertRuleEngine.evaluate('cache', 30);
    expect(alert?.severity).toBe('critical');
  });

  it('Rules listesi', () => {
    const rules = AlertRuleEngine.getRules();
    expect(rules.length).toBe(5);
  });
});
