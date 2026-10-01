import { describe, it, expect } from 'vitest';
import { LemmaBuilder } from '@/domain/morphology/LemmaBuilder';
import { Lexeme } from '@/domain/linguistic/Lexeme';

// ============================================
// MODEL A TESTLERI
// ============================================

describe('P4-004: LemmaBuilder — Model A', () => {
  const builder = new LemmaBuilder();

  const lexemes = [
    { id: 'L-BZE',  form: 'бзэ', literalMeaning: 'dil',        conceptId: 'LANGUAGE' },
    { id: 'L-BZE2', form: 'бзэ', literalMeaning: 'yay (silah)' },
    { id: 'L-SHE',  form: 'шэ',  literalMeaning: 'sut' },
    { id: 'L-SHE2', form: 'шэ',  literalMeaning: 'mermi' },
    { id: 'L-GU',   form: 'гу',  literalMeaning: 'kalp',       conceptId: 'HEART' },
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

// ============================================
// TEKIL ARAMA TESTLERI
// ============================================

describe('P4-004: LemmaBuilder — Tekil Arama', () => {
  const mockLexemes: Lexeme[] = [
    { id: 'L-GUF1E', form: 'гуфӀэ', literalMeaning: 'sevgi' } as Lexeme,
    { id: 'L-NEGU',  form: 'нэгу',  literalMeaning: 'yuz' }   as Lexeme,
    { id: 'L-PSYNE', form: 'псынэ', literalMeaning: 'kuyu' }  as Lexeme,
  ];
  const builder = new LemmaBuilder(mockLexemes);

  it('4.4.1: gufl e', () => {
    const r = builder.resolve('гуфӀэ');
    expect(r.matched).toBe(true);
    expect(r.lemma?.id).toBe('L-GUF1E');
  });

  it('4.4.2: negu', () => {
    const r = builder.resolve('нэгу');
    expect(r.matched).toBe(true);
    expect(r.lemma?.id).toBe('L-NEGU');
  });

  it('4.4.3: psyne', () => {
    const r = builder.resolve('псынэ');
    expect(r.matched).toBe(true);
  });

  it('4.4.4: eslesmeyen', () => {
    const r = builder.resolve('bilinmeyen');
    expect(r.matched).toBe(false);
  });

  it('4.4.5: batch', () => {
    const rs = builder.buildBatch(['гуфӀэ', 'нэгу']);
    expect(rs.length).toBe(2);
  });
});
