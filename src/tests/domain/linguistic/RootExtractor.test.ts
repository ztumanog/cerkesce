import { describe, it, expect } from 'vitest';
import { RootExtractor } from '@/domain/linguistic/RootExtractor';
import rootsData from '../../../../public/data/linguistic/roots.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

describe('P4-002: RootExtractor', () => {
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
