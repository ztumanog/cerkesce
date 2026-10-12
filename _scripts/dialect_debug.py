import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# TS test dosyasini olustur
test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Debug', () => {
  const converter = new DialectConverter();

  it('debug testleri', () => {
    const testler = [
      'шъу',
      'шъхьэгъусэ',
      'чъыгы',
      'шъэ',
      'шъо',
      'шъы',
    ];

    for (const t of testler) {
      const result = converter.convertWord(t);
      console.log(`${t} -> ${result}`);
    }
    expect(true).toBe(true);
  });
});
'''
Path("src/tests/domain/linguistic/DialectConverter.debug.test.ts").write_text(test_content, encoding="utf-8")
print("Debug test olusturuldu")
