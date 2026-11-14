import { describe, it, expect } from 'vitest';
import { DictionaryProvider } from '@/domain/morphology/DictionaryProvider';
import lexemesData from '../../../public/data/linguistic/lexemes.json';
import { Lexeme, resolveLexemeTurkishMeaning } from '@/domain/linguistic/Lexeme';

describe('DictionaryProvider Sözlük Entegrasyonu', () => {
  const provider = new DictionaryProvider();
  const typedLexemes = lexemesData as Partial<Lexeme>[];
  provider.loadLexemes(typedLexemes);

  it('Sözlükteki kök veya lemmaları doğru bulmalıdır', () => {
    const entryNoun = provider.findEntry('щӀалэ');
    expect(entryNoun).not.toBeNull();
    expect(entryNoun?.pos).toBe('NOUN');
    expect(entryNoun?.meaningTr).toBe('Genç, delikanlı, oğlan');

    const entryVerb = provider.findEntry('щӀа');
    expect(entryVerb).not.toBeNull();
    expect(entryVerb?.pos).toBe('VERB');
    expect(entryVerb?.lemma).toBe('щӀын');
  });

  it('Temizlenmis lexemes.json kayitlarini translations.tr ve kanonik POS ile cozumler', () => {
    const sampleVerb = typedLexemes.find(
      (x) => x.partOfSpeech === 'verb' && x.form && resolveLexemeTurkishMeaning(x).length > 0
    );
    expect(sampleVerb).toBeDefined();

    const lexEntry = provider.findEntry(sampleVerb!.form!);
    expect(lexEntry).not.toBeNull();
    expect(lexEntry?.pos).toBe('verb');
    expect(lexEntry?.meaningTr.length).toBeGreaterThan(0);
    expect(lexEntry?.meaningTr).not.toBe('?');
  });

  it('Bulunmayan kelimeler için null dönmelidir', () => {
    const missing = provider.findEntry('xyz_unknown');
    expect(missing).toBeNull();
  });
});
