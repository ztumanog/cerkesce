
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Full Debug', () => {
  const converter = new DialectConverter();

  it('tum testleri listele', () => {
    const testler = [
      'шъхьэ', 'шъэ', 'шъу', 'шъо', 'шъы',
      'дышъэ', 'шъхьэгу', 'шъхьэгъусэ', 'шъхьэгъубжэ', 'шъыпкъэ',
      'шъхьащэ', 'гукIэгъу', 'нэшъу', 'чъыгы',
      'Iофы', 'цIыфы', 'бжьыныф', 'фабэ', 'мафэ', 'фыжьы'
    ];
    const sonuclar: string[] = [];
    for (const t of testler) {
      const result = converter.convertWord(t);
      sonuclar.push(`${t} -> ${result}`);
    }
    const fs = require('fs');
    fs.writeFileSync('dialect_full_debug.json', JSON.stringify(sonuclar, null, 2));
    expect(true).toBe(true);
  });
});
