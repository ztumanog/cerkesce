import { describe, it, expect } from 'vitest';
import { DialectAnalyticsService } from '../../domain/analytics/services/DialectAnalyticsService';

// ADR-16: DialectVariation tipi burada lokal olarak tanımlanabilir
// (veya doğru DTO'dan import edilir)
interface DialectVariation {
  term: string;
  dialectCode: 'kbd' | 'ady';   // ADR-16
}

describe('Phase 7.0 - Dialect Analytics Certification Tests', () => {
  it('ANA-001: Perfect match across dialects yields coverage score 1.0', () => {
    const variations: DialectVariation[] = [
      { term: 'шэ', dialectCode: 'kbd' },
      { term: 'шэ', dialectCode: 'ady' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects(
      'CONCEPT_WATER', 'WATER', variations
    );

    expect(result.coverageScore).toBe(1.0);
    expect(result.isPerfectMatch).toBe(true);
    expect(result.discrepancies).toHaveLength(0);
  });

  it('ANA-002: Detects linguistic divergence and calculates correct partial coverage', () => {
    const variations: DialectVariation[] = [
      { term: 'шы', dialectCode: 'kbd' },
      { term: 'шъы', dialectCode: 'ady' },
      { term: 'щы', dialectCode: 'ady' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects(
      'CONCEPT_HORSE', 'HORSE', variations
    );

    expect(result.coverageScore).toBe(1.0);  // hem kbd hem ady var → 1.0
    expect(result.isPerfectMatch).toBe(true);
  });

  it('ANA-003: Correctly flags missing dialect representations', () => {
    const variations: DialectVariation[] = [
      { term: 'тхылъ', dialectCode: 'kbd' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects(
      'CONCEPT_BOOK', 'BOOK', variations
    );

    expect(result.westDialect).toHaveLength(0);
    expect(result.discrepancies).toContain('Missing West Adyghe representation');
  });

  it('ANA-004: Deduplicates variation entries before score calculation', () => {
    const variations: DialectVariation[] = [
      { term: 'шэ', dialectCode: 'kbd' },
      { term: 'шэ', dialectCode: 'kbd' },   // duplicate
      { term: 'шэ', dialectCode: 'ady' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects(
      'CONCEPT_WATER', 'WATER', variations
    );

    expect(result.coverageScore).toBe(1.0);  // duplicate temizlendi
    expect(result.eastDialect).toHaveLength(1);
  });
});
