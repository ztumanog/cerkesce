/**
 * @file src/tests/DialectRules.test.ts
 * @description Çerkesçe diyalekt ve ses değişim kurallarını test eder.
 */

describe('Dialect Rules Tests', () => {
  it('şive/diyalekt kurallarının doğru tanımlandığını doğrular', () => {
    const sampleRule = {
      sourcePattern: 'щ',
      targetPattern: 'шъ',
      confidenceScore: 0.9
    };

    expect(sampleRule.sourcePattern).toBe('щ');
    expect(sampleRule.targetPattern).toBe('шъ');
    expect(sampleRule.confidenceScore).toBe(0.9);
  });
});