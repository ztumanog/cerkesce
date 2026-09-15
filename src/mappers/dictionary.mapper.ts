import {
  dictionaryEntrySchema,
  type DictionaryEntry,
  type PartOfSpeech,
} from '@/lib/validations/dictionarySchema';

// Ham API Yanıtı (snake_case / tutarsız veri yapısı simülasyonu)
export interface RawDictionaryEntryDto {
  entry_id: string;
  target_word: string;
  lang_code: string;
  ipa_symbol?: string;
  audio_link?: string;
  origin?: string;
  meanings: Array<{
    def_id: string;
    pos: string;
    description: string;
    syns?: string[];
    ants?: string[];
    examples_list?: Array<{
      ex_id: string;
      text: string;
      trans?: string;
      by?: string;
    }>;
  }>;
  related?: string[];
  created_at: string;
  updated_at: string;
}

export class DictionaryMapper {
  public static toCanonical(raw: RawDictionaryEntryDto): DictionaryEntry {
    const rawMapped = {
      id: raw.entry_id,
      word: raw.target_word,
      language: raw.lang_code,
      pronunciation: (raw.ipa_symbol || raw.audio_link) ? {
        ipa: raw.ipa_symbol,
        audioUrl: raw.audio_link,
      } : undefined,
      etymology: raw.origin,
      definitions: raw.meanings.map((m) => ({
        id: m.def_id,
        partOfSpeech: m.pos as PartOfSpeech,
        meaning: m.description,
        synonyms: m.syns,
        antonyms: m.ants,
        examples: m.examples_list?.map((e) => ({
          id: e.ex_id,
          sentence: e.text,
          translation: e.trans,
          author: e.by,
        })),
      })),
      relatedWords: raw.related,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    };

    // Parse işlemi runtime'da hatalı veriyi reddeder ve tip güvenliği sağlar
    return dictionaryEntrySchema.parse(rawMapped);
  }
}