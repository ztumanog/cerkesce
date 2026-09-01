/**
 * @file src/domain/grammar.ts
 * @description Çerkesçe Ses ve Dilbilgisi Kuralları Tipleri.
 */

export interface PhonologicalRule {
  id: string;
  name: string;
  adyghe_symbol: string;
  kabardian_symbol: string;
  type: string;
  description: string;
}

export interface GrammaticalAffix {
  id: string;
  name: string;
  adyghe_form: string;
  kabardian_form: string;
  meaning: string;
}

export interface LexiconMapping {
  adyghe: string;
  kabardian: string;
  meaning: string;
}

export interface GrammarDatabase {
  phonological_rules: PhonologicalRule[];
  grammatical_rules: {
    prefixes: GrammaticalAffix[];
    suffixes: GrammaticalAffix[];
  };
  lexicon_mappings: LexiconMapping[];
}