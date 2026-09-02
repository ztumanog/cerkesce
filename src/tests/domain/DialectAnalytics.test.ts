import { describe, it, expect } from 'vitest';
import { DialectAnalyticsService } from '../../domain/analytics/services/DialectAnalyticsService';
import { DialectVariation } from '../../domain/analytics/dto/DialectSemanticAnalysisDTO';

describe('Phase 7.0 - Dialect Analytics Certification Tests', () => {
  it('ANA-001: Perfect match across dialects yields coverage score 1.0', () => {
    const variations: DialectVariation[] = [
      { term: 'Псы', dialect: 'EAST_KABARDIAN' },
      { term: 'Псы', dialect: 'WEST_ADYGHE' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects('CONCEPT_WATER', 'WATER', variations);

    expect(result.coverageScore).toBe(1.0);
    expect(result.isPerfectMatch).toBe(true);
    expect(result.discrepancies).toHaveLength(0);
  });

  it('ANA-002: Detects linguistic divergence and calculates correct partial coverage', () => {
    const variations: DialectVariation[] = [
      { term: 'Шы', dialect: 'EAST_KABARDIAN' },
      { term: 'Шы', dialect: 'WEST_ADYGHE' },
      { term: 'Чы', dialect: 'WEST_ADYGHE' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects('CONCEPT_HORSE', 'HORSE', variations);

    expect(result.coverageScore).toBe(0.5);
    expect(result.isPerfectMatch).toBe(false);
    expect(result.discrepancies[0]).toContain('Linguistic variance');
  });

  it('ANA-003: Correctly flags missing dialect representations', () => {
    const variations: DialectVariation[] = [
      { term: 'Тхылъ', dialect: 'EAST_KABARDIAN' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects('CONCEPT_BOOK', 'BOOK', variations);

    expect(result.westDialect).toHaveLength(0);
    expect(result.discrepancies).toContain('Missing West Adyghe representation');
  });

  it('ANA-004: Deduplicates variation entries before score calculation', () => {
    const variations: DialectVariation[] = [
      { term: 'Псы', dialect: 'EAST_KABARDIAN' },
      { term: 'Псы', dialect: 'EAST_KABARDIAN' },
      { term: 'Псы', dialect: 'WEST_ADYGHE' }
    ];

    const result = DialectAnalyticsService.analyzeConceptDialects('CONCEPT_WATER', 'WATER', variations);

    expect(result.eastDialect).toHaveLength(1);
    expect(result.coverageScore).toBe(1.0);
  });
});