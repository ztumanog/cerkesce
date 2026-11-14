import { describe, it, expect } from 'vitest';
import { InflectionHandler } from '@/domain/linguistic/InflectionHandler';
import {
  normalizePartOfSpeech,
  combineMorphemesPhonologically,
  stripStemFinalVowel,
} from '@/domain/grammar';
import {
  Lexeme,
  resolveLexemeTurkishMeaning,
  resolveLexemePos,
} from '@/domain/linguistic/Lexeme';
import rootsData from '../../../../public/data/linguistic/roots.json';
import morphemesData from '../../../../public/data/linguistic/morphemes.json';

describe('P4-005: InflectionHandler', () => {
  const handler = new InflectionHandler(rootsData as any, morphemesData as any);

  it('kok + ek -> cekimli form (suffix)', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E'],
      rule: 'suffix',
    });
    expect(result.form).toBe('гуфӀэ');
    expect(result.confidence).toBe(1.0);
  });

  it('prefix kurali ile cekim', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E'],
      rule: 'prefix',
    });
    expect(result.form).toBe('фӀэгу');
  });

  it('bilinmeyen kok fallback doner', () => {
    const result = handler.inflect({
      rootId: 'UNKNOWN',
      morphemeIds: [],
      rule: 'suffix',
    });
    expect(result.form).toBe('');
    expect(result.confidence).toBe(0);
  });

  it('coklu ek ile cekim', () => {
    const result = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: ['M-F1E', 'M-NE'],
      rule: 'suffix',
    });
    expect(result.components.length).toBeGreaterThan(1);
  });

  it('toplu cekim yapar', () => {
    const results = handler.inflectAll([
      { rootId: 'R-GU', morphemeIds: ['M-F1E'], rule: 'suffix' },
      { rootId: 'R-NE', morphemeIds: [], rule: 'suffix' },
    ]);
    expect(results.length).toBe(2);
  });

  it('deriveCausative yalin fiilden ettirgen (гъэ-) bicimi uretir ve cift eki onler', () => {
    const res = handler.deriveCausative('кӀуэн', 'kabardian');
    expect(res.form).toBe('гъэкӀуэн');
    expect(res.rule).toBe('causative');
    expect(res.confidence).toBe(1.0);

    const already = handler.deriveCausative('гъэкӀуэн', 'kabardian');
    expect(already.form).toBe('гъэкӀуэн');
    expect(already.rule).toBe('causative_already_marked');
  });

  it('inflectVerbStem zaman ve olumsuzluk cekimlerini dogru uretir', () => {
    expect(handler.inflectVerbStem('кӀуэн', 'present', 'kabardian').form).toBe('кӀуэр');
    expect(handler.inflectVerbStem('кӀуэн', 'past', 'kabardian').form).toBe('кӀуэгъэщ');
    expect(handler.inflectVerbStem('кӀуэн', 'future', 'kabardian', true).form).toBe('кӀуэнукъым');
    expect(handler.inflectVerbStem('кӀуэн', 'past', 'adyghe').form).toBe('кӀуэгъ');
  });

  it('reduplication kuralıyla ikileme uretir', () => {
    const dup = handler.inflect({
      rootId: 'R-GU',
      morphemeIds: [],
      rule: 'reduplication',
    });
    expect(dup.form).toBe('гу-гу');
    expect(dup.components).toEqual(['гу', 'гу']);
  });
});

describe('Grammar & Lexeme Helpers', () => {
  it('normalizePartOfSpeech kanonik turleri ve deyim sizintilarini dogru indirger', () => {
    expect(normalizePartOfSpeech('VERB')).toBe('verb');
    expect(normalizePartOfSpeech('adv')).toBe('adverb');
    expect(normalizePartOfSpeech('ADJ')).toBe('adjective');
    expect(normalizePartOfSpeech('PROPER_NAME')).toBe('proper_noun');
    expect(normalizePartOfSpeech('verb/phrase')).toBe('phrase');
    expect(normalizePartOfSpeech('Ӏэлъэдакъэнэ зигъэуэн')).toBe('phrase');
    expect(normalizePartOfSpeech('')).toBe('unknown');
    expect(normalizePartOfSpeech(null)).toBe('unknown');
  });

  it('combineMorphemesPhonologically unlu catismasinda ы dusmesini uygular', () => {
    expect(combineMorphemesPhonologically('сы', 'ухын')).toBe('сухын');
    expect(combineMorphemesPhonologically('гъэ', 'кӀуэн')).toBe('гъэкӀуэн');
  });

  it('stripStemFinalVowel labialize unsuzleri (кӀу, гу) korur ve gercek son unluyu dusurur', () => {
    expect(stripStemFinalVowel('гуфӀэ')).toBe('гуфӀ');
    expect(stripStemFinalVowel('кӀу')).toBe('кӀу');
    expect(stripStemFinalVowel('гу')).toBe('гу');
  });

  it('resolveLexemeTurkishMeaning ve resolveLexemePos temizlenmis alanlari okur', () => {
    const sample: Partial<Lexeme> = {
      id: 'L-TEST-1',
      form: 'гъэкӀуэн',
      literalMeaning: '?',
      translations: { tr: 'göndermek, yollamak' },
      partOfSpeech: 'VERB',
    };

    expect(resolveLexemeTurkishMeaning(sample)).toBe('göndermek, yollamak');
    expect(resolveLexemePos(sample)).toBe('verb');
  });
});
