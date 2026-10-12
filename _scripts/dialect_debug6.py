import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Debug5', () => {
  const converter = new DialectConverter();

  it('test sirasinda dene', () => {
    // C-11.4 testindeki tam sira
    const testler = [
      'шъхьэ', 'шъэ', 'шъу', 'шъо', 'шъы',
      'дышъэ', 'шъхьэгу', 'шъхьэгъусэ', 'шъхьэгъубжэ', 'шъыпкъэ',
      'шъхьащэ', 'гукIэгъу', 'нэшъу', 'чъыгы',
      'Iофы', 'цIыфы', 'бжьыныф', 'фабэ', 'мафэ', 'фыжьы'
    ];
    const results: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      results.push(`${t}=${result}`);
    }
    const fs = require('fs');
    fs.writeFileSync('dialect_debug5.json', JSON.stringify(results, null, 2));
    expect(true).toBe(true);
  });
});
'''
Path("src/tests/domain/linguistic/DialectConverter.debug5.test.ts").write_text(test_content, encoding="utf-8")
print("Debug5 olusturuldu")
