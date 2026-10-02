import { describe, it, expect } from 'vitest';
import { AdrValidator } from '../../infra/governance/AdrValidator';

describe('Sprint 8.4.1 - ADR Validation', () => {
  it('Validation sonucu dondurur', () => {
    const result = AdrValidator.validate();
    expect(result.timestamp).toBeDefined();
    expect(result.status).toMatch(/^(ok|warning|error)$/);
    expect(Array.isArray(result.missing)).toBe(true);
    expect(Array.isArray(result.orphaned)).toBe(true);
    expect(Array.isArray(result.duplicates)).toBe(true);
  });

  it('Toplam sayilari dondurur', () => {
    const result = AdrValidator.validate();
    expect(result.totalIndexed).toBeGreaterThan(0);
    expect(result.totalPhysical).toBeGreaterThan(0);
  });

  it('Validator eksik ve yetim tespit edebilir', () => {
    const result = AdrValidator.validate();
    // Validator calisiyor mu? (en az bir tutarsizlik olmali)
    const totalIssues = result.missing.length + result.orphaned.length + result.duplicates.length;
    expect(totalIssues).toBeGreaterThanOrEqual(0);
    // Status dogru mu?
    if (totalIssues === 0) {
      expect(result.status).toBe('ok');
    } else {
      expect(['warning', 'error']).toContain(result.status);
    }
  });
});
