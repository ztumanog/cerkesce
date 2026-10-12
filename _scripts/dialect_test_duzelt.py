import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter C-11.4 Dogru Testler', () => {
  const converter = new DialectConverter();

  // ADIGECE -> KABARDEYCE (gercek kurallar)
  const testler: Array<[string, string, string]> = [
    // шъ -> щ (sibilant kaymasi)
    ['шъхьэ', 'щхьэ', 'kafa'],
    ['шъэ', 'щэ', 'yuz'],
    ['шъу', 'щу', '?'],
    ['шъо', 'що', '?'],
    ['шъы', 'щы', '?'],
    ['дышъэ', 'дыщэ', 'altin'],
    ['шъхьэгу', 'щхьэгу', 'alın'],
    ['шъхьэгъусэ', 'щхьэгъусэ', 'es'],
    ['шъхьэгъубжэ', 'щхьэгъубжэ', 'pencere'],
    ['шъыпкъэ', 'щыпкъэ', 'gercek'],
    ['шъхьащэ', 'щхьэщэ', '?'],
    ['гукIэгъу', 'гущIэгъу', 'merhamet'],
    ['нэшъу', 'нэф', 'kor'],
    ['чъыгы', 'щыгы', 'agac'],
    ['Iофы', 'Iуэху', 'is'],
    ['цIыфы', 'цIыху', 'insan'],
    ['бжьыныф', 'бжьыныху', 'sarimsak'],
    ['фабэ', 'хуабэ', 'sicak'],
    ['мафэ', 'махуэ', 'gun'],
    ['фыжьы', 'хуыжь', 'beyaz'],
  ];

  it('Adigece -> Kabardeyce (20 test)', () => {
    let passed = 0;
    for (const [ady, kbd, anlam] of testler) {
      const result = converter.convertWord(ady);
      if (result === kbd) {
        passed++;
      } else {
        console.log(`FAIL: ${ady} -> ${result} (beklenen: ${kbd}) [${anlam}]`);
      }
    }
    console.log(`Adigece->Kabardeyce: ${passed}/${testler.length}`);
    expect(passed).toBeGreaterThanOrEqual(15);
  });
});
'''

Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts").write_text(test_content, encoding="utf-8")
print("Test dosyasi guncellendi: DialectConverter.c11.test.ts")
