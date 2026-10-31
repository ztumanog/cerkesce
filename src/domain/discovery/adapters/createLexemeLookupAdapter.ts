/**
 * File: src/domain/discovery/adapters/createLexemeLookupAdapter.ts
 * LexemeConceptLookupAdapter'ı gerçek veri ile oluşturan fabrika.
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { LexemeConceptLookupAdapter } from './LexemeConceptLookupAdapter';

let cachedAdapter: LexemeConceptLookupAdapter | null = null;

export function createLexemeLookupAdapter(): LexemeConceptLookupAdapter {
  if (cachedAdapter) return cachedAdapter;

  try {
    const lexemesPath = join(process.cwd(), 'public', 'data', 'linguistic', 'lexemes.json');
    const formMapPath = join(process.cwd(), 'public', 'data', 'linguistic', 'word_form_mapping.json');

    const lexemes = JSON.parse(readFileSync(lexemesPath, 'utf-8'));
    let formMapping: Record<string, string> = {};
    try {
      formMapping = JSON.parse(readFileSync(formMapPath, 'utf-8'));
    } catch { /* form mapping yoksa boş */ }

    cachedAdapter = new LexemeConceptLookupAdapter({ lexemes, conceptMapping: formMapping });
    return cachedAdapter;
  } catch (e) {
    console.warn('[createLexemeLookupAdapter] Veri yüklenemedi:', e);
    cachedAdapter = new LexemeConceptLookupAdapter();
    return cachedAdapter;
  }
}
