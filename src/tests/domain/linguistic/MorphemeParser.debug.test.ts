
import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/linguistic/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';

describe('MorphemeParser Yeni Morfemler', () => {
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
    const fs = require('fs');
    fs.writeFileSync('morph_test.json', JSON.stringify(sonuclar, null, 2));
    expect(true).toBe(true);
  });
});
