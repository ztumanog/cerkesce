/**
 * MorphemeParser - Lexeme formundan morfem ayristirma
 * ADR-0040: Morphological Root Taxonomy
 */

import { Morpheme } from '../linguistic/Morpheme';

export interface MorphemeParserInput {
  lexemeId: string;
  form: string;
  derivation?: {
    rootIds?: string[];
    morphemeIds?: string[];
    components?: string[];
    rule?: string;
  };
}

export interface ParsedMorpheme {
  morphemeId: string | null;
  form: string;
  type: 'lexical' | 'grammatical' | 'unknown';
  gloss?: string;
  slot?: string;
  code?: string;
  position: number;
}

export interface MorphemeParserOutput {
  lexemeId: string;
  morphemes: ParsedMorpheme[];
  method: 'dictionary' | 'split' | 'fallback';
  confidence: number;
}

function stripAffixDashes(s: string): string {
  return (s || '').replace(/^[-–—]+/, '').replace(/[-–—]+$/, '');
}

export function norm(text: string): string {
  if (!text) return '';
  let res = text.toLowerCase();
  for (const char of ['ӏ', 'Ӏ', 'і', 'І', 'i', 'l', '1', '|', '!', 'I']) {
    res = res.replaceAll(char, 'Ӏ');
  }
  return res.replace(/\s+/g, ' ').trim();
}

const CORE_ATOMIC_ROOTS = ['цӀыху', 'цӀыхъу', 'щӀалэ', 'кӀалэ', 'унэ', 'псы', 'лӀэ', 'щхьэ', 'бзылъфыгъэ'];

const STRUCTURAL_PREFIXES: Record<string, { slot: string; gloss: string }> = {
  'си': { slot: 'possessive_1sg', gloss: 'İyelik Öneki (Benim)' },
  'уи': { slot: 'possessive_2sg', gloss: 'İyelik Öneki (Senin)' },
  'ди': { slot: 'possessive_1pl', gloss: 'İyelik Öneki (Bizim)' },
  'фи': { slot: 'possessive_2pl', gloss: 'İyelik Öneki (Sizin)' },
  'я':  { slot: 'possessive_3pl', gloss: 'İyelik Öneki (Onların)' },
  'нэхъ': { slot: 'comparative', gloss: 'Üstünlük Öneki (Daha/En)' },
  'нахь': { slot: 'comparative', gloss: 'Üstünlük Öneki (Daha/En)' },
  'хуэ': { slot: 'version', gloss: 'Yönelme / Versiyon Öneki (İçin)' },
  'къы': { slot: 'directional', gloss: 'Yönelme Öneki (Bize Doğru)' },
  'къэ': { slot: 'directional', gloss: 'Yönelme Öneki' },
  'зэ': { slot: 'comitative', gloss: 'Karşılıklılık / Birliktelik' },
  'дэ': { slot: 'locative', gloss: 'Birlikte / İçinde' },
  'гъэ': { slot: 'causative', gloss: 'Ettirgenlik Öneki' },
  'зэры': { slot: 'instrumental', gloss: 'Vasıl / Tarz Öneki' },
  'зы': { slot: 'reflexive', gloss: 'Dönüşlülük Öneki' },
  'и': { slot: 'possessive_3sg', gloss: 'İyelik / Yersel Öneki (Onun)' },
  'мы': { slot: 'negation', gloss: 'Olumsuzluk Öneki' },
  'пы': { slot: 'locative', gloss: 'Bağlı / Yersel' },
  'щӀэ': { slot: 'locative', gloss: 'Altında / Yeni' },
  'фӀэ': { slot: 'version', gloss: 'Kötü / Karşı' },
  'кӀэлъ': { slot: 'directional', gloss: 'Arkasından' },
  'е': { slot: 'directional', gloss: 'Yönelme' },
  'тэ': { slot: 'locative', gloss: 'Üstünde' },
  'ри': { slot: 'connective', gloss: 'Bağlaç / İle' },
};

const MULTI_LETTER_SUFFIXES: Array<[string, Array<{ morpheme: string; code: string; gloss: string }>]> = [
  ['ныгъэ', [{ morpheme: 'ныгъэ', code: 'ABSTRACT', gloss: 'Soyut İsim Eki (-ныгъэ)' }]],
  ['ышхуэ', [{ morpheme: 'ышхуэ', code: 'MAGNIFICATIVE', gloss: 'Büyüklük Eki (-ышхуэ)' }]],
  ['шхуэ', [{ morpheme: 'шхуэ', code: 'MAGNIFICATIVE', gloss: 'Büyüklük Eki (-шхуэ)' }]],
  ['цӀыкӀу', [{ morpheme: 'цӀыкӀу', code: 'DIMINUTIVE', gloss: 'Küçültme Eki (-цӀыкӀу)' }]],
  ['гъэ', [{ morpheme: 'гъэ', code: 'NOMINALIZER', gloss: 'İsimleştirme Eki (-гъэ)' }]],
  ['алъэ', [{ morpheme: 'а', code: 'CONNECTIVE', gloss: 'Bağlantı Ünlüsü (-а)' }, { morpheme: 'лъ', code: 'CONTAINER', gloss: 'Yer / Kap Morfemi (-лъ)' }, { morpheme: 'э', code: 'BASE', gloss: 'Vokal / Durum Eki (-э)' }]],
  ['лъэ', [{ morpheme: 'лъ', code: 'CONTAINER', gloss: 'Yer / Kap Morfemi (-лъ)' }, { morpheme: 'э', code: 'BASE', gloss: 'Vokal / Durum Eki (-э)' }]],
  ['хэрауэ', [{ morpheme: 'хэ', code: 'PLURAL', gloss: 'Çoğul Eki (-хэ)' }, { morpheme: 'р', code: 'NOMINATIVE', gloss: 'Belirli / Yalın Eki (-р)' }, { morpheme: 'ауэ', code: 'ADVERBIAL', gloss: 'Zarf / Durum Eki (-ауэ)' }]],
  ['хэр', [{ morpheme: 'хэ', code: 'PLURAL', gloss: 'Çoğul Eki (-хэ)' }, { morpheme: 'р', code: 'NOMINATIVE', gloss: 'Belirli / Yalın Eki (-р)' }]],
  ['хэм', [{ morpheme: 'хэ', code: 'PLURAL', gloss: 'Çoğul Eki (-хэ)' }, { morpheme: 'м', code: 'ERGATIVE', gloss: 'Ergatif Eki (-м)' }]],
  ['хэ', [{ morpheme: 'хэ', code: 'PLURAL', gloss: 'Çoğul Eki (-хэ)' }]],
  ['рауэ', [{ morpheme: 'р', code: 'NOMINATIVE', gloss: 'Belirli / Yalın Eki (-р)' }, { morpheme: 'ауэ', code: 'ADVERBIAL', gloss: 'Zarf / Durum Eki (-ауэ)' }]],
  ['ауэ', [{ morpheme: 'ауэ', code: 'ADVERBIAL', gloss: 'Zarf / Durum Eki (-ауэ)' }]],
  ['уэ', [{ morpheme: 'уэ', code: 'ADVERBIAL', gloss: 'Zarf Eki (-уэ)' }]],
  ['эу', [{ morpheme: 'э', code: 'BASE', gloss: 'Bağlantı Eki (-э)' }, { morpheme: 'у', code: 'ADVERBIAL', gloss: 'Zarf-Fiil / Durum Eki (-у)' }]],
  ['кӀэ', [{ morpheme: 'кӀэ', code: 'INSTRUMENTAL', gloss: 'Vasıta / Araç Eki (-кӀэ)' }]],
];

const SINGLE_LETTER_SUFFIXES: Record<string, Array<{ morpheme: string; code: string; gloss: string }>> = {
  'э': [{ morpheme: 'э', code: 'BASE', gloss: 'Vokal / Durum Eki (-э)' }],
  'ы': [{ morpheme: 'ы', code: 'BASE', gloss: 'Bağlantı Ünlüsü (-ы)' }],
  'у': [{ morpheme: 'у', code: 'ADVERBIAL', gloss: 'Zarf-Fiil / Durum Eki (-у)' }],
  'м': [{ morpheme: 'м', code: 'ERGATIVE', gloss: 'Ergatif / Bükün Eki (-м)' }],
  'р': [{ morpheme: 'р', code: 'NOMINATIVE', gloss: 'Yalın Durum Eki (-р)' }],
  'щ': [{ morpheme: 'щ', code: 'PREDICATIVE', gloss: 'Bildirme Eki (-щ)' }],
};

export class MorphemeParser {
  private morphemes: Map<string, Morpheme>;
  private byForm: Map<string, Morpheme[]>;
  private byStrippedForm: Map<string, Morpheme[]>;

  constructor(morphemes: Morpheme[]) {
    this.morphemes = new Map(morphemes.map(m => [m.id, m]));
    this.byForm = new Map();
    this.byStrippedForm = new Map();
    for (const m of morphemes) {
      const form = m.form || '';
      if (!form) continue;
      const nForm = norm(form);
      if (!this.byForm.has(nForm)) {
        this.byForm.set(nForm, []);
      }
      this.byForm.get(nForm)!.push(m);

      const stripped = norm(stripAffixDashes(form));
      if (stripped && stripped !== nForm) {
        if (!this.byStrippedForm.has(stripped)) {
          this.byStrippedForm.set(stripped, []);
        }
        this.byStrippedForm.get(stripped)!.push(m);
      }
    }
  }

  parse(
    input: MorphemeParserInput | string,
    atomicRootsList: string[] = [],
    lexemeRootsList: string[] = []
  ): MorphemeParserOutput {
    const inp: MorphemeParserInput =
      typeof input === 'string'
        ? { lexemeId: 'UNKNOWN', form: input }
        : input;

    const normWord = norm(inp.form);
    const prefixesSorted = Object.entries(STRUCTURAL_PREFIXES).sort((a, b) => b[0].length - a[0].length);

    // Çekirdek Öz Kökler ile Gelen Kökleri Birleştir ve Uzunluğa Göre Sırala
    const mergedAtomicRoots = Array.from(new Set([...CORE_ATOMIC_ROOTS.map(r => norm(r)), ...atomicRootsList])).sort((a, b) => b.length - a.length);

    let rem = normWord;
    const parsedMorphemes: ParsedMorpheme[] = [];
    let position = 0;
    let hasFoundRoot = false;

    while (rem.length > 0) {
      let matched = false;

      if (!hasFoundRoot) {
        for (const [pKey, pInfo] of prefixesSorted) {
          if (rem.startsWith(pKey) && rem.length > pKey.length) {
            parsedMorphemes.push({
              morphemeId: null,
              form: pKey,
              type: 'grammatical',
              slot: pInfo.slot,
              gloss: pInfo.gloss,
              position: position++,
            });
            rem = rem.slice(pKey.length);
            matched = true;
            break;
          }
        }
        if (matched) continue;

        for (const r of mergedAtomicRoots) {
          if (rem.startsWith(r)) {
            parsedMorphemes.push({
              morphemeId: null,
              form: r,
              type: 'lexical',
              gloss: 'Kök',
              position: position++,
            });
            rem = rem.slice(r.length);
            matched = true;
            hasFoundRoot = true;
            break;
          }
        }
        if (matched) continue;

        for (const r of lexemeRootsList) {
          if (rem.startsWith(r)) {
            parsedMorphemes.push({
              morphemeId: null,
              form: r,
              type: 'lexical',
              gloss: 'Kök',
              position: position++,
            });
            rem = rem.slice(r.length);
            matched = true;
            hasFoundRoot = true;
            break;
          }
        }
        if (matched) continue;
      } else {
        for (const [sufKey, sufItems] of MULTI_LETTER_SUFFIXES) {
          if (rem.startsWith(sufKey)) {
            for (const item of sufItems) {
              parsedMorphemes.push({
                morphemeId: null,
                form: item.morpheme,
                type: 'grammatical',
                code: item.code,
                gloss: item.gloss,
                position: position++,
              });
            }
            rem = rem.slice(sufKey.length);
            matched = true;
            break;
          }
        }
        if (matched) continue;

        for (const [pKey, pInfo] of prefixesSorted) {
          if (rem.startsWith(pKey) && rem.length > pKey.length) {
            const remAfter = rem.slice(pKey.length);
            if (
              mergedAtomicRoots.some(r => remAfter.startsWith(r)) ||
              lexemeRootsList.some(r => remAfter.startsWith(r))
            ) {
              parsedMorphemes.push({
                morphemeId: null,
                form: pKey,
                type: 'grammatical',
                slot: pInfo.slot,
                gloss: pInfo.gloss,
                position: position++,
              });
              rem = rem.slice(pKey.length);
              matched = true;
              hasFoundRoot = false;
              break;
            }
          }
        }
        if (matched) continue;

        for (const r of mergedAtomicRoots) {
          if (rem.startsWith(r)) {
            parsedMorphemes.push({
              morphemeId: null,
              form: r,
              type: 'lexical',
              gloss: 'Kök',
              position: position++,
            });
            rem = rem.slice(r.length);
            matched = true;
            break;
          }
        }
        if (matched) continue;
      }

      for (const [sKey, sItems] of Object.entries(SINGLE_LETTER_SUFFIXES)) {
        if (rem.startsWith(sKey)) {
          for (const item of sItems) {
            parsedMorphemes.push({
              morphemeId: null,
              form: item.morpheme,
              type: 'grammatical',
              code: item.code,
              gloss: item.gloss,
              position: position++,
            });
          }
          rem = rem.slice(sKey.length);
          matched = true;
          break;
        }
      }
      if (matched) continue;

      parsedMorphemes.push({
        morphemeId: null,
        form: rem[0],
        type: 'unknown',
        position: position++,
      });
      rem = rem.slice(1);
    }

    const knownCount = parsedMorphemes.filter(m => m.morphemeId !== null || m.type !== 'unknown').length;
    const confidence = parsedMorphemes.length > 0 ? knownCount / parsedMorphemes.length : 0;

    return {
      lexemeId: inp.lexemeId,
      morphemes: parsedMorphemes,
      method: confidence > 0.5 ? 'dictionary' : 'split',
      confidence,
    };
  }

  parseAll(inputs: MorphemeParserInput[]): MorphemeParserOutput[] {
    return inputs.map(i => this.parse(i));
  }

  parseBatch(forms: string[]): MorphemeParserOutput[] {
    return forms.map(f => this.parse(f));
  }

  getSuccessRate(results: MorphemeParserOutput[]): number {
    if (results.length === 0) return 0;
    const matched = results.filter(r => r.morphemes.length > 0).length;
    return matched / results.length;
  }
}