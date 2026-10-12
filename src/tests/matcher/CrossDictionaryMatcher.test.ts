// src/__tests__/CrossDictionaryMatcher.test.ts

import { CrossDictionaryMatcherImpl } from '@/matcher/CrossDictionaryMatcherImpl';

describe('CrossDictionaryMatcher', () => {
  let matcher: CrossDictionaryMatcherImpl;

  beforeEach(() => {
    matcher = new CrossDictionaryMatcherImpl();
  });

  test('exact match returns 1.0', () => {
    const score = matcher.match('su', 'su');
    expect(score).toBe(1.0);
  });

  test('different words return < 1.0', () => {
    const score = matcher.match('su', 'water');
    expect(score).toBeLessThan(1.0);
  });

  test('findMatches returns array', () => {
    const matches = matcher.findMatches('su', ['su', 'water', 'agua']);
    expect(matches.length).toBeGreaterThan(0);
  });

  test('rankMatches sorts by confidence', () => {
    const matches = matcher.findMatches('su', ['su', 'water', 'agua']);
    const ranked = matcher.rankMatches(matches);
    for (let i = 0; i < ranked.length - 1; i++) {
      expect(ranked[i].confidence).toBeGreaterThanOrEqual(ranked[i + 1].confidence);
    }
  });
});
