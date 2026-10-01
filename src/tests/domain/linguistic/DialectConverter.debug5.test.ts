
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
