import { describe, it, expect } from 'vitest';
import { InflectionHandler } from '@/domain/linguistic/InflectionHandler';
import rootsData from '../../../../public/data/linguistic/roots.json';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';

describe('P4-005: InflectionHandler', () => {
  const handler = new InflectionHandler(rootsData as any, morphemesData as any);

  it('kok + ek -> cekimli form (suffix)', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E'],
      rule: 'suffix',
    });
    expect(result.form).toBe('гуфӀэ');
    expect(result.confidence).toBe(1.0);
  });

  it('prefix kurali ile cekim', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E'],
      rule: 'prefix',
    });
    expect(result.form).toBe('фӀэгу');
  });

  it('bilinmeyen kok fallback doner', () => {
    const result = handler.inflect({
      rootId: 'UNKNOWN',
      morphemeIds: [],
      rule: 'suffix',
    });
    expect(result.form).toBe('');
    expect(result.confidence).toBe(0);
  });

  it('coklu ek ile cekim', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E', 'M-NE'],
      rule: 'suffix',
    });
    expect(result.components.length).toBeGreaterThan(1);
  });

  it('toplu cekim yapar', () => {
    const results = handler.inflectAll([
      { rootId: 'R-GU', morphemeIds: ['M-F1E'], rule: 'suffix' },
      { rootId: 'R-NE', morphemeIds: [], rule: 'suffix' },
    ]);
    expect(results.length).toBe(2);
  });
});
