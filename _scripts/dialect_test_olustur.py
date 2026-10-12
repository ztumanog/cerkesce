import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

# DialectConverter'i TypeScript'ten cagirmak icin test dosyasi olustur
test_content = '''
import { describe, it, expect } from 'vitest';
import { DialectConverter } from '@/domain/linguistic/DialectConverter';

describe('DialectConverter C-11.4 Ek Testler', () => {
  const converter = new DialectConverter();

  // щ <-> ш kurali testleri (20)
  const shchTestleri: Array<[string, string]> = [
    ['шъхьэ', 'щхьэ'],
    ['шъэ', 'щэ'],
    ['шъу', 'щу'],
    ['шъо', 'що'],
    ['шъы', 'щы'],
    ['шъа', 'ща'],
    ['шъэбзэщ', 'щабзэ'],
    ['шъыды', 'щыд'],
    ['шъынагъо', 'щынагъуэ'],
    ['шъыбжьый', 'щыбжьый'],
    ['шъэбзащ', 'щабзэ'],
    ['шъхьащэ', 'щхьащэ'],
    ['шъхьэгу', 'щхьэгу'],
    ['шъхьэусыгъуэ', 'щхьэусыгъуэ'],
    ['шъхьэгъусэ', 'щхьэгъусэ'],
    ['шъхьэгъубжэ', 'щхьэгъубжэ'],
    ['шъыгъу', 'щыгъу'],
    ['шъэбзащ', 'щабзэ'],
    ['шъай', 'щай'],
    ['шъэ', 'щэ'],
  ];

  // фI <-> шIу kurali testleri (20)
  const f1Testleri: Array<[string, string]> = [
    ['шIу', 'фI'],
    ['шIуэ', 'фIэ'],
    ['шIуагъэ', 'фIагъэ'],
    ['шIуэныгъэ', 'фIэныгъэ'],
    ['шIуэгъу', 'фIэгъу'],
    ['шIуэпс', 'фIэпс'],
    ['шIуэгъуэ', 'фIэгъуэ'],
    ['шIуэщ', 'фIэщ'],
    ['шIуэш', 'фIэш'],
    ['шIуэкъ', 'фIэкъ'],
    ['шIуэх', 'фIэх'],
    ['шIуэз', 'фIэз'],
    ['шIуэт', 'фIэт'],
    ['шIуэд', 'фIэд'],
    ['шIуэж', 'фIэж'],
    ['шIуэл', 'фIэл'],
    ['шIуэм', 'фIэм'],
    ['шIуэн', 'фIэн'],
    ['шIуэр', 'фIэр'],
    ['шIуэу', 'фIэу'],
  ];

  it('shch testleri (20)', () => {
    let passed = 0;
    for (const [ady, kbd] of shchTestleri) {
      const result = converter.convertWord(ady);
      if (result === kbd) passed++;
      else console.log(`FAIL: ${ady} -> ${result} (beklenen: ${kbd})`);
    }
    console.log(`shch: ${passed}/${shchTestleri.length}`);
    expect(passed).toBeGreaterThanOrEqual(15);
  });

  it('f1 testleri (20)', () => {
    let passed = 0;
    for (const [ady, kbd] of f1Testleri) {
      const result = converter.convertWord(ady);
      if (result === kbd) passed++;
      else console.log(`FAIL: ${ady} -> ${result} (beklenen: ${kbd})`);
    }
    console.log(`f1: ${passed}/${f1Testleri.length}`);
    expect(passed).toBeGreaterThanOrEqual(15);
  });
});
'''

Path("src/tests/domain/linguistic/DialectConverter.c11.test.ts").write_text(test_content, encoding="utf-8")
print("Test dosyasi olusturuldu: DialectConverter.c11.test.ts")
