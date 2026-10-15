import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import fs from 'fs';
import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/morphology/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';

describe('MorphemeParser Debug', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('tum testleri json olarak yaz', () => {
    const testler = [
      { ad: 'faktitif', form: 'йэуыиьэху' },
      { ad: 'lokal', form: 'пэплъэн' },
      { ad: 'birliktelik', form: 'сыдэк1уащ' },
      { ad: 'karsiliklilik', form: 'зэ1уыш1ашь' },
    ];
    const sonuclar: string[] = [];
    for (const t of testler) {
      const result = parser.parse({ lexemeId: 'TEST', form: t.form });
      sonuclar.push(t.ad + ': ' + JSON.stringify(result.morphemes.map(m => m.form)) + ' (method: ' + result.method + ', conf: ' + result.confidence + ')');
    }
    fs.writeFileSync('morph_test.json', JSON.stringify(sonuclar, null, 2));
    expect(sonuclar.length).toBe(testler.length);
  });
});
'''
# NOT: parser src/domain/morphology/ altinda; import yolu ve cikti dizini duzeltildi.
# 'require' yerine ust duzey ESM import'u kullanilir (vitest ESM ortami).
cikti = Path("src/tests/domain/morphology/MorphemeParser.debug.test.ts")
cikti.parent.mkdir(parents=True, exist_ok=True)
cikti.write_text(test_content, encoding="utf-8")
print(f"Debug test olusturuldu: {cikti}")
