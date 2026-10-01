
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter C-11.4 Final', () => {
  const converter = new DialectConverter();

  const testler: Array<[string, string, string]> = [
    ['шъхьэ', 'щхьэ', 'kafa'],
    ['шъэ', 'щэ', 'yuz'],
    ['шъу', 'щу', '?'],
    ['шъо', 'щуэ', '?'],
    ['шъы', 'щы', '?'],
    ['дышъэ', 'дыщэ', 'altin'],
    ['шъхьэгу', 'щхьэгу', 'alin'],
    ['шъхьэгъусэ', 'щхьэгъусэ', 'es'],
    ['шъхьэгъубжэ', 'щхьэгъубжэ', 'pencere'],
    ['шъыпкъэ', 'щыпкъэ', 'gercek'],
    ['шъхьащэ', 'щхьэшэ', '?'],
    ['гукIэгъу', 'гущIэгъу', 'merhamet'],
    ['нэшъу', 'нэф', 'kor'],
    ['чъыгы', 'жыг', 'agac'],
    ['Iофы', 'Iуэху', 'is'],
    ['цIыфы', 'цIыху', 'insan'],
    ['бжьыныф', 'бжьыныху', 'sarimsak'],
    ['фабэ', 'хуабэ', 'sicak'],
    ['мафэ', 'махуэ', 'gun'],
    ['фыжьы', 'хуыжь', 'beyaz'],
  ];

  it('Adigece -> Kabardeyce (20 test)', () => {
    let passed = 0;
    const fails: string[] = [];
    for (const [ady, kbd, anlam] of testler) {
      const result = converter.convertWord(ady);
      if (result === kbd) {
        passed++;
      } else {
        fails.push(ady + ' -> ' + result + ' (beklenen: ' + kbd + ') [' + anlam + ']');
      }
    }
    const fs = require('fs');
    fs.writeFileSync('c11_final.json', JSON.stringify({passed, total: testler.length, fails}, null, 2));
    expect(passed).toBeGreaterThanOrEqual(18);
  });
});
