
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Debug4', () => {
  const converter = new DialectConverter();

  it('debug', () => {
    const testler = ['шъэ', 'шъэбзэ', 'шъэжъые', 'дышъэ'];
    const results: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      results.push(`${t}=${result}`);
    }
    const fs = require('fs');
    fs.writeFileSync('dialect_debug4.json', JSON.stringify(results, null, 2));
    expect(true).toBe(true);
  });
});
