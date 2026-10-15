
import fs from 'fs';
import { describe, it, expect } from 'vitest';
import { MorphemeParser } from '@/domain/morphology/MorphemeParser';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';
import lexemesData from '../../../../public/data/linguistic/lexemes.json';

describe('MorphemeParser Gercek Kelimeler', () => {
  const parser = new MorphemeParser(morphemesData as any);

  it('gercek lexemeleri test et', () => {
    // morphemeIds artik hic doldurulmuyor (0 kayit); guncel sema derivation.components
    const testler = (lexemesData as any[])
      .filter(l => l.derivation?.morphemeIds?.length > 0 || l.derivation?.components?.length > 0)
      .slice(0, 10);

    expect(testler.length).toBeGreaterThan(0);

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
        ' | method: ' + result.method +
        ' | conf: ' + result.confidence
      );
    }
    fs.writeFileSync('morph_gercek.json', JSON.stringify(sonuclar, null, 2));
    expect(sonuclar.length).toBe(testler.length);
  });
});
