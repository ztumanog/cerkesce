import { describe, it, expect } from 'vitest';
import { DictionaryProvider } from '@/domain/morphology/DictionaryProvider';

describe('DictionaryProvider Sözlük Entegrasyonu', () => {
  const provider = new DictionaryProvider();

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

  it('Bulunmayan kelimeler için null dönmelidir', () => {
    const missing = provider.findEntry('xyz_unknown');
    expect(missing).toBeNull();
  });
});