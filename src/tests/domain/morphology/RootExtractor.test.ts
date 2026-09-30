import { describe, it, expect } from 'vitest';
import { RootExtractor } from '@/domain/morphology/RootExtractor';
import { Root } from '@/domain/linguistic/Root';

describe('Phase 4.2 - Root Extractor', () => {
  const mockRoots: Root[] = [
    { id: 'R-GU', form: 'гу', primaryMeaning: 'kalp' } as Root,
    { id: 'R-NE', form: 'нэ', primaryMeaning: 'goz' } as Root,
    { id: 'R-PSY', form: 'псы', primaryMeaning: 'su' } as Root,
    { id: 'R-SHHYE', form: 'щхьэ', primaryMeaning: 'bas' } as Root,
  ];
  const extractor = new RootExtractor(mockRoots);

  it('4.2.1: gu -> gu', () => {
    const r = extractor.extract('гушӀо');
    expect(r.matched).toBe(true);
    expect(r.root?.id).toBe('R-GU');
  });
  it('4.2.2: ne -> ne', () => {
    const r = extractor.extract('нэгу');
    expect(r.matched).toBe(true);
    expect(r.root?.id).toBe('R-NE');
  });
  it('4.2.3: psy -> psy', () => {
    const r = extractor.extract('псынэ');
    expect(r.matched).toBe(true);
    expect(r.root?.id).toBe('R-PSY');
  });
  it('4.2.4: shhye -> shhye', () => {
    const r = extractor.extract('щхьэгу');
    expect(r.matched).toBe(true);
    expect(r.root?.id).toBe('R-SHHYE');
  });
  it('4.2.5: eslesmeyen', () => {
    const r = extractor.extract('bilinmeyen');
    expect(r.matched).toBe(false);
  });
  it('4.2.6: batch', () => {
    const rs = extractor.extractBatch(['гушӀо', 'нэгу', 'псынэ']);
    expect(rs.length).toBe(3);
    expect(rs.filter(r => r.matched).length).toBe(3);
  });
});
