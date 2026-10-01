import { describe, it, expect } from 'vitest';
import { LemmaBuilder } from '@/domain/linguistic/LemmaBuilder';

describe('P4-004: LemmaBuilder', () => {
  const builder = new LemmaBuilder();

  const lexemes = [
    { id: 'L-BZE', form: 'бзэ', literalMeaning: 'dil', conceptId: 'LANGUAGE' },
    { id: 'L-BZE2', form: 'бзэ', literalMeaning: 'yay (silah)' },
    { id: 'L-SHE', form: 'шэ', literalMeaning: 'sut' },
    { id: 'L-SHE2', form: 'шэ', literalMeaning: 'mermi' },
    { id: 'L-GU', form: 'гу', literalMeaning: 'kalp', conceptId: 'HEART' },
  ];

  it('homonim gruplari olusturur', () => {
    const lemmas = builder.build(lexemes);
    const bze = lemmas.find(l => l.form === 'бзэ');
    expect(bze).toBeDefined();
    expect(bze!.isHomonym).toBe(true);
    expect(bze!.senses.length).toBe(2);
  });

  it('tekil lexeme homonim degil', () => {
    const lemmas = builder.build(lexemes);
    const gu = lemmas.find(l => l.form === 'гу');
    expect(gu!.isHomonym).toBe(false);
    expect(gu!.senses.length).toBe(1);
  });

  it('lemmaId LEMMA- ile baslar', () => {
    const lemmas = builder.build(lexemes);
    lemmas.forEach(l => expect(l.lemmaId).toMatch(/^LEMMA-/));
  });

  it('getHomonyms sadece homonimler doner', () => {
    const homonyms = builder.getHomonyms(lexemes);
    expect(homonyms.length).toBe(2);
    homonyms.forEach(h => expect(h.isHomonym).toBe(true));
  });

  it('sense listesi dogru', () => {
    const lemmas = builder.build(lexemes);
    const she = lemmas.find(l => l.form === 'шэ');
    const meanings = she!.senses.map(s => s.meaning);
    expect(meanings).toContain('sut');
    expect(meanings).toContain('mermi');
  });
});
