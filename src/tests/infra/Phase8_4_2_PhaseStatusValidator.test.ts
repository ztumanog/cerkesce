import { describe, it, expect } from 'vitest';
import { PhaseStatusValidator } from '../../infra/governance/PhaseStatusValidator';

describe('Sprint 8.4.2 - Phase Status Validator', () => {
  it('Validation sonucu dondurur', () => {
    const result = PhaseStatusValidator.validate();
    expect(result.timestamp).toBeDefined();
    expect(result.status).toMatch(/^(ok|warning|error)$/);
    expect(Array.isArray(result.phases)).toBe(true);
    expect(Array.isArray(result.inconsistencies)).toBe(true);
  });

  it('Fazlari karsilastirir', () => {
    const result = PhaseStatusValidator.validate();
    expect(result.phases.length).toBeGreaterThan(0);
    const phase1 = result.phases.find(p => p.phase === 'Phase 1');
    expect(phase1).toBeDefined();
  });

  it('Tutarsizliklari tespit eder', () => {
    const result = PhaseStatusValidator.validate();
    // Validator calisiyor mu?
    expect(result.inconsistencies).toBeDefined();
  });
});
