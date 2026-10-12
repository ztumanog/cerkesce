import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
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
'''
Path("src/tests/domain/linguistic/C11Izole.test.ts").write_text(test_content, encoding="utf-8")
print("C11 Izole olusturuldu")
