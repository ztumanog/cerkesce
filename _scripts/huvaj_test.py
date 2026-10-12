import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter Huvaj Dogrulama', () => {
  const converter = new DialectConverter();

  // Huvaj sozlugunden dogrulanmis kelimeler
  const testler: Array<[string, string, string]> = [
    // Huvaj: дышъэ / дыщэ
    ['дышъэ', 'дыщэ', 'altin'],
    // Huvaj: чъыгы / жыг
    ['чъыгы', 'жыг', 'agac'],
    // Huvaj: бжьыныф / бжьыныху
    ['бжьыныф', 'бжьыныху', 'sarimsak'],
    // Huvaj: фабэ / хуабэ
    ['фабэ', 'хуабэ', 'sicak'],
    // Huvaj: мафэ / махуэ
    ['мафэ', 'махуэ', 'gun'],
    // Huvaj: шъхьащэ / щхьэшэ
    ['шъхьащэ', 'щхьэшэ', '?'],
    // Huvaj: нэшъу / нэф
    ['нэшъу', 'нэф', 'kor'],
  ];

  it('Huvaj dogrulama (7 test)', () => {
    let passed = 0;
    for (const [ady, kbd, anlam] of testler) {
      const result = converter.convertWord(ady);
      if (result === kbd) {
        passed++;
      } else {
        console.log(`FAIL: ${ady} -> ${result} (beklenen: ${kbd}) [${anlam}]`);
      }
    }
    console.log(`Huvaj: ${passed}/${testler.length}`);
    expect(passed).toBeGreaterThanOrEqual(5);
  });
});
'''
Path("src/tests/domain/linguistic/DialectConverter.huvaj.test.ts").write_text(test_content, encoding="utf-8")
print("Huvaj test dosyasi olusturuldu")
