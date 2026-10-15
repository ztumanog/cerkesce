import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/morphology/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';

describe('MorphemeParser Yeni Morfemler', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('faktitif + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'йэуыиьэху' });
    console.log('faktitif:', JSON.stringify(result.morphemes.map(m => m.form)));
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('lokal preverb + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'пэплъэн' });
    console.log('lokal:', JSON.stringify(result.morphemes.map(m => m.form)));
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('birliktelik + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'сыдэк1уащ' });
    console.log('birliktelik:', JSON.stringify(result.morphemes.map(m => m.form)));
    expect(result.morphemes.length).toBeGreaterThan(0);
  });

  it('karsiliklilik + kok ayristirir', () => {
    const result = parser.parse({ lexemeId: 'TEST', form: 'зэ1уыш1ашь' });
    console.log('karsiliklilik:', JSON.stringify(result.morphemes.map(m => m.form)));
    expect(result.morphemes.length).toBeGreaterThan(0);
  });
});
'''
# NOT: parser src/domain/morphology/ altinda yasar; testler de ayni semada
# src/tests/domain/morphology/ altina yazilir. Eski '@/domain/linguistic/...'
# yolu artik gecersiz (o klasorde MorphemeParser.ts YOK).
cikti = Path("src/tests/domain/morphology/MorphemeParser.yeni.test.ts")
cikti.parent.mkdir(parents=True, exist_ok=True)
cikti.write_text(test_content, encoding="utf-8")
print(f"Test dosyasi olusturuldu: {cikti}")
