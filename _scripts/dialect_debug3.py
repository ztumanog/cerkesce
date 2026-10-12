import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Debug2', () => {
  const converter = new DialectConverter();

  it('debug testleri', () => {
    const testler = ['шъэ', 'чъыгы', 'шъу', 'шъо', 'шъы'];
    const results: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      results.push(`${t}=${result}`);
    }
    const fs = require('fs');
    fs.writeFileSync('dialect_debug2.json', JSON.stringify(results, null, 2));
    expect(true).toBe(true);
  });
});
'''
Path("src/tests/domain/linguistic/DialectConverter.debug2.test.ts").write_text(test_content, encoding="utf-8")
print("Debug test olusturuldu")
