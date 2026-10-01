import { describe, it, expect } from 'vitest';
import { RootExtractor } from '@/domain/morphology/RootExtractor';
import { Root } from '@/domain/linguistic/Root';
import rootsData from '../../../../public/data/linguistic/roots.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

// ============================================
// STRING-BASED TESTLER (morphology'den)
// ============================================

describe('Phase 4.2 - RootExtractor (String-based)', () => {
  const mockRoots: Root[] = [
    { id: 'R-GU', form: 'гу', primaryMeaning: 'kalp' } as Root,
    { id: 'R-NE', form: 'нэ', primaryMeaning: 'goz' } as Root,
    { id: 'R-PSY', form: 'псы', primaryMeaning: 'su' } as Root,
    { id: 'R-SHHYE', form: 'щхьэ', primaryMeaning: 'bas' } as Root,
  ];
  const extractor = new RootExtractor(mockRoots);

  it('4.2.1: gu -> gu', () => {
    const r = extractor.extract('гушӀо');
    expect(r.rootId).toBe('R-GU');
    expect(r.rootType).toBeDefined();
  });

  it('4.2.2: ne -> ne', () => {
    const r = extractor.extract('нэгу');
    expect(r.rootId).toBe('R-NE');
  });

  it('4.2.3: psy -> psy', () => {
    const r = extractor.extract('псынэ');
    expect(r.rootId).toBe('R-PSY');
  });

  it('4.2.4: shhye -> shhye', () => {
    const r = extractor.extract('щхьэгу');
    expect(r.rootId).toBe('R-SHHYE');
  });

  it('4.2.5: eslesmeyen', () => {
    const r = extractor.extract('bilinmeyen');
    expect(r.rootId).toBeNull();
    expect(r.method).toBe('fallback');
  });

  it('4.2.6: batch', () => {
    const rs = extractor.extractBatch(['гушӀо', 'нэгу', 'псынэ']);
    expect(rs.length).toBe(3);
    expect(rs.filter(r => r.rootId !== null).length).toBe(3);
  });
});

// ============================================
// OBJECT-BASED TESTLER (linguistic'ten)
// ============================================

describe('P4-002: RootExtractor (Object-based)', () => {
  const extractor = new RootExtractor(rootsData as any, lexemesData as any);

  it('lexeme.derivation.rootIds varsa onu kullanir', () => {
    const result = extractor.extract({ lexemeId: 'L-GUF1E', form: 'гуфӀэ' });
    expect(result.rootId).toBe('R-GU');
    expect(result.method).toBe('dictionary');
    expect(result.confidence).toBeGreaterThanOrEqual(0.95);
  });

  it('tam eslesme ile kok bulur', () => {
    const result = extractor.extract({ lexemeId: 'UNKNOWN', form: 'гу' });
    expect(result.rootId).toBe('R-GU');
    expect(result.method).toBe('dictionary');
  });

  it('prefix eslesmesi ile kok bulur', () => {
    const result = extractor.extract({ lexemeId: 'UNKNOWN', form: 'гуфӀэ' });
    expect(result.rootId).toBe('R-GU');
    expect(result.method).toBe('morpheme');
  });

  it('bulunamazsa fallback doner', () => {
    const result = extractor.extract({ lexemeId: 'UNKNOWN', form: 'xyzabc' });
    expect(result.rootId).toBeNull();
    expect(result.method).toBe('fallback');
    expect(result.confidence).toBe(0);
  });

  it('toplu cikarim yapar', () => {
    const results = extractor.extractAll(lexemesData.slice(0, 10) as any);
    expect(results.length).toBe(10);
  });
});

// ============================================
// ADR-0040 ENTEGRASYON TESTLERI
// ============================================

describe('ADR-0040: RootExtractor + RootClassifier', () => {
  const mockRoots: Root[] = [
    { id: 'R-GU', form: 'гу', primaryMeaning: 'kalp' } as Root,
    { id: 'R-PSY', form: 'псы', primaryMeaning: 'su' } as Root,
  ];
  const extractor = new RootExtractor(mockRoots);

  it('rootType doner', () => {
    const r = extractor.extract('гу');
    expect(r.rootType).toBe('STABLE');
  });

  it('bulunamazsa NEUTRAL rootType', () => {
    const r = extractor.extract('xyzabc');
    expect(r.rootType).toBe('NEUTRAL');
  });
});
