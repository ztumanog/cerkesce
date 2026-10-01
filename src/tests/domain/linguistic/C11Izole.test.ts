
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('C11 Izole', () => {
  it('ayni sira', () => {
    const converter = new DialectConverter();
    const testler = ['шъхьэ', 'шъэ', 'шъу', 'шъо', 'шъы'];
    const results: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      results.push(t + '=' + result);
    }
    const fs = require('fs');
    fs.writeFileSync('c11_izole.json', JSON.stringify(results, null, 2));
    expect(true).toBe(true);
  });
});
