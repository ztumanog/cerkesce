import sys
sys.stdout.reconfigure(encoding="utf-8")
from pathlib import Path

test_content = '''
import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/linguistic/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

describe('MorphemeParser Gercek Kelimeler', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('gercek lexemeleri test et', () => {
    const testler = (lexemesData as any[])
      .filter(l => l.derivation?.morphemeIds?.length > 0)
      .slice(0, 10);
    
    const sonuclar: string[] = [];
    for (const lex of testler) {
      const result = parser.parse({
        lexemeId: lex.id,
        form: lex.form,
        derivation: lex.derivation,
      });
      sonuclar.push(
        lex.id + ' | ' + lex.form + ' | morphemes: ' + 
        JSON.stringify(result.morphemes.map(m => m.form)) + 
        ' | conf: ' + result.confidence
      );
    }
    const fs = require('fs');
    fs.writeFileSync('morph_gercek.json', JSON.stringify(sonuclar, null, 2));
    expect(true).toBe(true);
  });
});
'''
Path("src/tests/domain/linguistic/MorphemeParser.gercek.test.ts").write_text(test_content, encoding="utf-8")
print("Gercek test olusturuldu")
