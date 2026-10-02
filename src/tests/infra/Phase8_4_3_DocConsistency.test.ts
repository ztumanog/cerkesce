import { describe, it, expect } from 'vitest';
import { DocumentationConsistencyChecker } from '../../infra/governance/DocumentationConsistencyChecker';

describe('Sprint 8.4.3 - Documentation Consistency Checker', () => {
  it('Check sonucu dondurur', () => {
    const result = DocumentationConsistencyChecker.check();
    expect(result.timestamp).toBeDefined();
    expect(result.status).toMatch(/^(ok|warning|error)$/);
    expect(result.totalDocs).toBeGreaterThan(0);
    expect(Array.isArray(result.brokenReferences)).toBe(true);
  });

  it('Tum docs taranir', () => {
    const result = DocumentationConsistencyChecker.check();
    expect(result.totalDocs).toBeGreaterThan(50);
  });
});
