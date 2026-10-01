
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Debug', () => {
  const converter = new DialectConverter();

  it('debug testleri', () => {
    const testler = ['шъу', 'шъхьэгъусэ', 'чъыгы', 'шъэ', 'шъо', 'шъы'];
    const results: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      results.push(`${t}=${result}`);
    }
    // JSON olarak yaz
    const fs = require('fs');
    fs.writeFileSync('dialect_debug.json', JSON.stringify(results, null, 2));
    expect(true).toBe(true);
  });
});
