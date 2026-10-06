import { describe, it, expect } from 'vitest';
import { buildLexemeIndex, pickLexeme, normKey, type Lexeme } from '@/lib/lexemeIndex';

// ───────────────────────────────────────────────
// ADR-0026 K3 — Normalizasyon
// ───────────────────────────────────────────────
describe('ADR-0026 K3 · normKey', () => {
  it('palochka varyantlarını eşitler', () => {
    // Latin I (U+0049) vs Kiril Ӏ (U+04C0)
    expect(normKey('кIуэ')).toBe(normKey('кӀуэ'));
  });

  it('trim + lowercase uygular', () => {
    expect(normKey('  SU  ')).toBe('su');
    expect(normKey('ПСЫ')).toBe(normKey('псы'));
  });

  it('null / undefined / boş güvenli', () => {
    expect(normKey(undefined)).toBe('');
    expect(normKey(null)).toBe('');
    expect(normKey('   ')).toBe('');
  });
});

// ───────────────────────────────────────────────
// ADR-0026 K2 — Determinizm
// ───────────────────────────────────────────────
describe('ADR-0026 K2 · determinizm', () => {
  it('yükleme sırasından bağımsız (ADR-0015)', () => {
    const lexemes: Lexeme[] = [
      { id: 'L-200', form: 'псы',  literalMeaning: 'su', corpusFrequency: 5 },
      { id: 'L-100', form: 'псыхъо', literalMeaning: 'su', corpusFrequency: 5 },
    ];

    const forward  = buildLexemeIndex(lexemes).get('su')?.id;
    const backward = buildLexemeIndex([...lexemes].reverse()).get('su')?.id;

    expect(forward).toBe(backward);
    expect(forward).toBe('L-100');        // eşit freq → id ASC
  });

  it('exact form match frekansa rağmen kazanır', () => {
    const idx = buildLexemeIndex([
      { id: 'L-A', form: 'xyz', literalMeaning: 'su', corpusFrequency: 9999 },
      { id: 'L-B', form: 'su',  literalMeaning: 'qqq', corpusFrequency: 1 },
    ]);
    expect(idx.get('su')?.id).toBe('L-B');
  });

  it('corpusFrequency DESC sıralar', () => {
    const idx = buildLexemeIndex([
      { id: 'L-A', form: 'a', literalMeaning: 'keder', corpusFrequency: 3 },
      { id: 'L-B', form: 'b', literalMeaning: 'keder', corpusFrequency: 9 },
    ]);
    expect(idx.get('keder')?.id).toBe('L-B');
  });

  it('frekans yoksa (-1) frekansı olan kazanır', () => {
    const idx = buildLexemeIndex([
      { id: 'L-A', form: 'a', literalMeaning: 'su' },                        // yok
      { id: 'L-B', form: 'b', literalMeaning: 'su', corpusFrequency: 1 },    // var
    ]);
    expect(idx.get('su')?.id).toBe('L-B');
  });
});

// ───────────────────────────────────────────────
// ADR-0026 K2 — Ön filtre (placeholder)
// ───────────────────────────────────────────────
describe('ADR-0026 K2 · placeholder ön filtresi', () => {
  it('"?" literalMeaning indekse girmez, form girer', () => {
    // Gerçek veri: L-DEHAN / дэхан / literalMeaning="?"
    const idx = buildLexemeIndex([
      { id: 'L-DEHAN', form: 'дэхан', literalMeaning: '?' },
    ]);
    expect(idx.has('?')).toBe(false);
    expect(idx.get(normKey('дэхан'))?.id).toBe('L-DEHAN');
  });

  it('boş, tire ve çoklu soru işareti filtrelenir', () => {
    const idx = buildLexemeIndex([
      { id: 'L-1', form: 'a', literalMeaning: '-'   },
      { id: 'L-2', form: 'b', literalMeaning: ''    },
      { id: 'L-3', form: 'c', literalMeaning: '???' },
    ]);
    expect(idx.has('-')).toBe(false);
    expect(idx.has('???')).toBe(false);
    expect(idx.size).toBe(3);               // yalnız 3 form
  });

  it('77 "?" kaydı tek anahtara yığılmaz', () => {
    const many: Lexeme[] = Array.from({ length: 77 }, (_, i) => ({
      id: `L-${i}`, form: `f${i}`, literalMeaning: '?',
    }));
    const idx = buildLexemeIndex(many);
    expect(idx.has('?')).toBe(false);
    expect(idx.size).toBe(77);              // 77 form, 0 placeholder
  });
});

// ───────────────────────────────────────────────
// Çift yönlü join (kök neden)
// ───────────────────────────────────────────────
describe('ADR-0026 · çift yönlü join', () => {
  it('literalMeaning üzerinden erişim (ESKİ KODUN BOZULDUĞU YER)', () => {
    const idx = buildLexemeIndex([
      { id: 'L-PSY', form: 'псы', literalMeaning: 'su', conceptId: 'WATER' },
    ]);
    // Eski: lexemeMap.set(l.form, l) → "su" bulunamazdı → conceptId: null → [Kavram]
    expect(idx.get('su')?.conceptId).toBe('WATER');
    expect(idx.get('псы')?.conceptId).toBe('WATER');
  });

  it('virgüllü literalMeaning parçalanır', () => {
    const idx = buildLexemeIndex([
      { id: 'L-X', form: 'тхылъ', literalMeaning: 'kitap, defter' },
    ]);
    expect(idx.get('kitap')?.id).toBe('L-X');
    expect(idx.get('defter')?.id).toBe('L-X');
  });
});

// ───────────────────────────────────────────────
// pickLexeme izolasyonu
// ───────────────────────────────────────────────
describe('ADR-0026 K2 · pickLexeme', () => {
  it('boş dizide undefined', () => {
    expect(pickLexeme([], 'su')).toBeUndefined();
  });

  it('tek adayda kendisini döndürür', () => {
    const only: Lexeme = { id: 'L-1', form: 'a' };
    expect(pickLexeme([only], 'a')).toBe(only);
  });

  it('girdi dizisini mutasyona uğratmaz', () => {
    const arr: Lexeme[] = [
      { id: 'L-B', form: 'b', corpusFrequency: 1 },
      { id: 'L-A', form: 'a', corpusFrequency: 9 },
    ];
    const before = arr.map(l => l.id).join(',');
    pickLexeme(arr, 'x');
    expect(arr.map(l => l.id).join(',')).toBe(before);
  });
});
