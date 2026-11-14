/**
 * @file src/domain/grammar.ts
 * @description Çerkesçe (Adıgece / Kabardeyce) sesbilim, biçimbilim, sözcük türü ve dilbilgisi kural tanımları.
 */

export type CircassianDialect = 'adyghe' | 'kabardian' | 'common';

export type CanonicalPartOfSpeech =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'pronoun'
  | 'numeral'
  | 'postposition'
  | 'conjunction'
  | 'particle'
  | 'interjection'
  | 'participle'
  | 'prefix'
  | 'proper_noun'
  | 'phrase'
  | 'unknown';

export type EtymologyType = 'native' | 'loanword' | 'proper_noun' | 'hybrid' | 'unknown';

/**
 * Çerkesçe fiil yapısındaki 5 ardışık biçimbirim bölgesi (slot şablonu).
 */
export type VerbTemplateZone =
  | 'argument_person'     // 1. Üye / Şahıs ön ekleri (сы-, у-, ды-, фы-, е-, къы-)
  | 'preverb_directional' // 2. Yönelme / Yer-yön ön ekleri (къэ-, нэ-, хэ-, щӀэ-, дэ-, пы-, те-, кӀуэцӀ-)
  | 'causative_negation'  // 3. Ettirgen (гъэ-) ve kök-öncesi olumsuzluk (мы-) bölgesi
  | 'stem_root'           // 4. Yalın veya türemiş fiil kökü / gövdesi
  | 'tense_mood_suffix';  // 5. Zaman, kip, soru ve zarf-fiil son ekleri (-р, -щ, -гъэ, -н, -у, -мэ, -къым)

export type VerbTransitivity = 'intransitive' | 'transitive' | 'ditransitive' | 'labile';

export type NounCase =
  | 'absolutive'   // Yalın / Belirtme (-р)
  | 'ergative'     // Ergatif / Eğik hal (-м)
  | 'instrumental' // Araç / Vasıta (-кӀэ / -мкӀэ)
  | 'adverbial';   // Durum / Zarf hali (-у / -эу)

export type PersonCode = '1SG' | '2SG' | '3SG' | '1PL' | '2PL' | '3PL';

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
  zone?: VerbTemplateZone;
  posTarget?: CanonicalPartOfSpeech;
  allomorphs?: string[];
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

export interface VerbInflectionRule {
  tenseOrMood: 'infinitive' | 'present' | 'past' | 'future' | 'imperative' | 'conditional' | 'gerund';
  kabardianSuffix: string;
  adygheSuffix: string;
  negativeSuffix?: string;
  requiresErgativeSubject?: boolean;
}

export const CIRCASSIAN_VOWELS = ['а', 'э', 'и', 'о', 'у', 'ы', 'е', 'ё', 'ю', 'я'] as const;

export const CAUSATIVE_PREFIXES: Record<CircassianDialect, readonly string[]> = {
  kabardian: ['гъэ', 'гъа', 'гъы', 'гъу'],
  adyghe: ['гъэ', 'гъа', 'гъы', 'гъо'],
  common: ['гъэ', 'гъа', 'гъы'],
};

export const DIRECTIONAL_PREVERBS: readonly string[] = [
  'къы', 'къэ', 'нэ', 'ны', 'хэ', 'хы', 'щӀэ', 'щӀы',
  'дэ', 'ды', 'пы', 'фӀэ', 'те', 'блэ', 'чӀэ', 'кӀэ',
  'лъэ', 'Ӏэ', 'зэ', 'зе', 'зы', 'и', 'у',
];

export const VERB_INFLECTION_TABLE: readonly VerbInflectionRule[] = [
  { tenseOrMood: 'infinitive', kabardianSuffix: 'н', adygheSuffix: 'н' },
  { tenseOrMood: 'present', kabardianSuffix: 'р', adygheSuffix: 'р', negativeSuffix: 'къым' },
  { tenseOrMood: 'past', kabardianSuffix: 'гъэщ', adygheSuffix: 'гъ', negativeSuffix: 'гъэкъым', requiresErgativeSubject: true },
  { tenseOrMood: 'future', kabardianSuffix: 'нущ', adygheSuffix: 'щт', negativeSuffix: 'нукъым' },
  { tenseOrMood: 'conditional', kabardianSuffix: 'мэ', adygheSuffix: 'мэ', negativeSuffix: 'мы...мэ' },
  { tenseOrMood: 'gerund', kabardianSuffix: 'у', adygheSuffix: 'эу' },
];

const POS_NORMALIZATION_MAP: Record<string, CanonicalPartOfSpeech> = {
  noun: 'noun',
  verb: 'verb',
  adjective: 'adjective',
  adj: 'adjective',
  adverb: 'adverb',
  adv: 'adverb',
  pronoun: 'pronoun',
  numeral: 'numeral',
  postposition: 'postposition',
  conjunction: 'conjunction',
  particle: 'particle',
  interjection: 'interjection',
  participle: 'participle',
  prefix: 'prefix',
  proper_noun: 'proper_noun',
  proper_name: 'proper_noun',
  phrase: 'phrase',
  'verb/phrase': 'phrase',
  'adjective/phrase': 'phrase',
  month: 'noun',
};

/**
 * Sözlükteki (lexemes.json) büyük/küçük harf veya deyim sızıntısı içeren
 * partOfSpeech değerlerini kanonik kategoriye indirger.
 */
export function normalizePartOfSpeech(rawPos?: string | null): CanonicalPartOfSpeech {
  if (!rawPos) return 'unknown';
  const cleaned = rawPos.trim().toLowerCase();
  if (POS_NORMALIZATION_MAP[cleaned]) {
    return POS_NORMALIZATION_MAP[cleaned];
  }
  if (cleaned.includes(' ') || /[\u0400-\u04FF]/.test(cleaned)) {
    return 'phrase';
  }
  return 'unknown';
}

/**
 * Ön ek ile kök/gövde birleşiminde sesli çatışmasını ve 'ы' düşmesini çözer.
 */
export function combineMorphemesPhonologically(prefix: string, stem: string): string {
  if (!prefix) return stem;
  if (!stem) return prefix;
  const firstChar = stem[0].toLowerCase();
  const isVowelStart = (CIRCASSIAN_VOWELS as readonly string[]).includes(firstChar);

  if (prefix.endsWith('ы') && isVowelStart) {
    return prefix.slice(0, -1) + stem;
  }
  return prefix + stem;
}

/**
 * Gövde sonundaki ünlüyü düşürerek yalın kök adayını döndürür (stem_normalize uyumlu).
 */
const LABIALIZED_CONSONANTS = ['кӀу', 'къу', 'хъу', 'гъу', 'гу', 'ку', 'Ӏу'];

export function stripStemFinalVowel(stem: string): string {
  if (!stem) return stem;
  const lower = stem.toLowerCase();
  if (LABIALIZED_CONSONANTS.some((digraph) => lower.endsWith(digraph))) {
    return stem;
  }
  const effectiveLen = stem.replace(/Ӏ/g, '').length;
  if (effectiveLen < 3) return stem;
  const lastChar = lower[lower.length - 1];
  if ((CIRCASSIAN_VOWELS as readonly string[]).includes(lastChar)) {
    return stem.slice(0, -1);
  }
  return stem;
}

