import { describe, it, expect } from 'vitest';
import { LemmaBuilder } from '@/domain/morphology/LemmaBuilder';
import { Lexeme } from '@/domain/linguistic/Lexeme';

describe('Phase 4.4 - Lemma Builder', () => {
  const mockLexemes: Lexeme[] = [
    { id: 'L-GUF1E', form: 'гуфӀэ', literalMeaning: 'sevgi' } as Lexeme,
    { id: 'L-NEGU', form: 'нэгу', literalMeaning: 'yuz' } as Lexeme,
    { id: 'L-PSYNE', form: 'псынэ', literalMeaning: 'kuyu' } as Lexeme,
  ];
  const builder = new LemmaBuilder(mockLexemes);

  it('4.4.1: gufl e', () => {
    const r = builder.build('гуфӀэ');
    expect(r.matched).toBe(true);
    expect(r.lemma?.id).toBe('L-GUF1E');
  });

  it('4.4.2: negu', () => {
    const r = builder.build('нэгу');
    expect(r.matched).toBe(true);
    expect(r.lemma?.id).toBe('L-NEGU');
  });

  it('4.4.3: psyne', () => {
    const r = builder.build('псынэ');
    expect(r.matched).toBe(true);
  });

  it('4.4.4: eslesmeyen', () => {
    const r = builder.build('bilinmeyen');
    expect(r.matched).toBe(false);
  });

  it('4.4.5: batch', () => {
    const rs = builder.buildBatch(['гуфӀэ', 'нэгу']);
    expect(rs.length).toBe(2);
  });
});
