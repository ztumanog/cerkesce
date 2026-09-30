import { describe, it, expect } from 'vitest';
import { InflectionHandler } from '@/domain/morphology/InflectionHandler';
import { Inflection } from '@/domain/morphology/InflectionHandler';

describe('Phase 4.5 - Inflection Handler', () => {
  const mockInflections: Inflection[] = [
    { type: 'case', suffix: 'м', meaning: 'ergatif' },
    { type: 'case', suffix: 'кӀэ', meaning: 'instrumental' },
    { type: 'number', suffix: 'хэр', meaning: 'plural' },
    { type: 'possession', suffix: 'р', meaning: 'belirli' },
  ];
  const handler = new InflectionHandler(mockInflections);

  it('4.5.1: gufl em -> gufl e + m', () => {
    const r = handler.analyze('гуфӀэм');
    expect(r.matched).toBe(true);
    expect(r.base).toBe('гуфӀэ');
  });

  it('4.5.2: negur -> negu + r', () => {
    const r = handler.analyze('нэгур');
    expect(r.matched).toBe(true);
    expect(r.base).toBe('нэгу');
  });

  it('4.5.3: plural', () => {
    const r = handler.analyze('гуфӀэхэр');
    expect(r.matched).toBe(true);
  });

  it('4.5.4: eslesmeyen', () => {
    const r = handler.analyze('bilinmeyen');
    expect(r.matched).toBe(false);
  });

  it('4.5.5: batch', () => {
    const rs = handler.analyzeBatch(['гуфӀэм', 'нэгур']);
    expect(rs.length).toBe(2);
  });
});
