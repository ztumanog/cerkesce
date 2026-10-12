from pathlib import Path

f = Path('src/tests/domain/linguistic/DialectConverter.cert.test.ts')
content = f.read_text(encoding='utf-8')

# Eski DC-002 bloğunu bul
import re
pattern = r"  it\('DC-002:.*?\n  \}\);"
match = re.search(pattern, content, re.DOTALL)

if not match:
    print('HATA: DC-002 bulunamadi')
    exit(1)

# Yeni DC-002 (doğru yön: ADY -> KBD)
yeni_test = '''  it('DC-002: C-9.2 yeni kurallar testi (ADY -> KBD)', () => {
    const testler: Array<[string, string, string]> = [
      ['гуфӀэ',     'гушӀо',      'фӀ -> шӀу'],
      ['гукӀэгъу',  'гущӀэгъу',   'кӀ -> щӀ'],
      ['гупшысэ',   'гупсысэ',    'пш -> пс'],
      ['шъхьащэ',   'щхьэщэ',     'шъхь -> щхь'],
      ['нэф',       'нэху',       'ф -> ху'],
      ['нэшъу',     'нэф',        'шъу -> ф'],
      ['шъыпкъэ',   'щыпкъэ',     'шъ -> щ'],
    ];
    
    const basarili: string[] = [];
    const basarisiz: string[] = [];
    
    for (const [ady, kbd, aciklama] of testler) {
      const sonuc = converter.convertWord(ady);
      if (sonuc === kbd) {
        basarili.push(`PASS: ${ady} -> ${sonuc} [${aciklama}]`);
      } else {
        basarisiz.push(`FAIL: ${ady} -> ${sonuc} (beklenen: ${kbd}) [${aciklama}]`);
      }
    }
    
    console.log('\\n=== C-9.2 KURAL TESTI (ADY -> KBD) ===');
    basarili.forEach(s => console.log(s));
    basarisiz.forEach(s => console.log(s));
    console.log(`\\nToplam: ${basarili.length}/${testler.length} gecti`);
    
    expect(basarisiz.length).toBe(0);
  });'''

content = content[:match.start()] + yeni_test + content[match.end():]
f.write_text(content, encoding='utf-8')
print('OK: DC-002 guncellendi')