import { describe, it, expect } from 'vitest';
import { QuerySemanticMapper } from '../../../domain/discovery/services/QuerySemanticMapper';

describe('Phase 5.3 - Query-Semantic Mapping Certification (QSM)', () => {
  const mapper = new QuerySemanticMapper();
  const WATER_CONCEPT_ID = '01ARZ3NDEKTSV4RRFFQ69G5FAV';

  it('QSM-001: TR, EN, RU ve ADY kelimeleri ayni CONCEPT_WATER id sine maplenmelidir', () => {
    const trResult = mapper.map('su');
    const enResult = mapper.map('WATER');
    const ruResult = mapper.map('вода');
    const adyResult = mapper.map('псы');

    expect(trResult.candidates[0].conceptId).toBe(WATER_CONCEPT_ID);
    expect(enResult.candidates[0].conceptId).toBe(WATER_CONCEPT_ID);
    expect(ruResult.candidates[0].conceptId).toBe(WATER_CONCEPT_ID);
    expect(adyResult.candidates[0].conceptId).toBe(WATER_CONCEPT_ID);

    expect(trResult.candidates[0].confidence).toBe(1.0);
    expect(enResult.candidates[0].confidence).toBe(1.0);
  });

  it('QSM-002: Diller dogru tespit edilmelidir (TR, EN, RU, ADY)', () => {
    expect(mapper.map('su').detectedLanguage).toBe('TR');
    expect(mapper.map('water').detectedLanguage).toBe('EN');
    expect(mapper.map('вода').detectedLanguage).toBe('RU');
    expect(mapper.map('псы').detectedLanguage).toBe('ADY');
  });

  it('QSM-003: Girdi buyuk/kucuk harf ve bosluklardan arindirilmalidir (Normalization)', () => {
    const result = mapper.map('  WaTeR  ');
    expect(result.normalizedQuery).toBe('water');
    expect(result.candidates[0].conceptId).toBe(WATER_CONCEPT_ID);
  });

  it('QSM-004: Bilinmeyen sorguda güvenli UNKNOWN dili ve bos kandidat listesi donmelidir', () => {
    const result = mapper.map('xyz_unknown_query_123');
    expect(result.detectedLanguage).toBe('UNKNOWN');
    expect(result.candidates).toEqual([]);
  });

  it('QSM-005: Kısmi eşleşmelerde (Partial Match) 0.7 confidence skoru verilmelidir', () => {
    const result = mapper.map('akarsular');
    expect(result.candidates.length).toBeGreaterThan(0);
    expect(result.candidates[0].confidence).toBe(0.7);
  });
});