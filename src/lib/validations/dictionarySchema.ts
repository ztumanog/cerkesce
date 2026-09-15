import { z } from 'zod';

// Kelime türü şeması ve tipi
export const PartOfSpeechSchema = z.string();
export type PartOfSpeech = z.infer<typeof PartOfSpeechSchema>;

// Örnek cümle şeması
export const ExampleSchema = z.object({
  id: z.string().optional(),
  sentence: z.string().optional(),
  translation: z.string().optional(),
  author: z.string().optional(),
}).passthrough();

// Tanım öğesi şeması
export const DefinitionItemSchema = z.object({
  id: z.string().optional(),
  partOfSpeech: PartOfSpeechSchema.optional(),
  meaning: z.string().optional(),
  synonyms: z.array(z.string()).optional(),
  antonyms: z.array(z.string()).optional(),
  examples: z.array(ExampleSchema).optional(),
}).passthrough();

// Telaffuz şeması
export const PronunciationSchema = z.object({
  ipa: z.string().optional(),
  audioUrl: z.string().optional(),
});

// Sözlük girdisi şeması
export const DictionaryEntrySchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  word: z.string().optional(),
  language: z.string().optional(),
  dialect: z.enum([
    'Adıgece Doğu Kiril', 
    'Adıgece Batı Kiril', 
    'Adıgece Doğu Latin', 
    'Adıgece Batı Latin'
  ]).optional(),
  pronunciation: PronunciationSchema.optional(),
  etymology: z.string().optional(),
  definitions: z.array(DefinitionItemSchema).optional(),
  relatedWords: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  full_definition_in_html: z.string().optional(),
  tanim: z.string().optional(),
  meaning: z.string().optional(),
}).passthrough();

// Alias export'ları (import uyumluluğu için)
export const Schema = DictionaryEntrySchema;
export const dictionarySchema = DictionaryEntrySchema;
export const dictionaryEntrySchema = DictionaryEntrySchema;

export type DictionaryEntry = z.infer<typeof DictionaryEntrySchema>;

/**
 * Dışarıdan gelen 'unknown' veriyi doğrular ve hiyerarşik tanım kuralına göre anlamı çıkarır.
 */
export function parseAndExtractMeaning(rawData: unknown): string {
  const parseResult = DictionaryEntrySchema.safeParse(rawData);

  if (!parseResult.success) {
    throw new Error("Geçersiz veri yapısı tespit edildi. Veri sözlük standartlarına uymuyor.");
  }

  const entry = parseResult.data;

  if (Array.isArray(entry.definitions) && entry.definitions.length > 0) {
    const firstMeaning = entry.definitions[0]?.meaning;
    if (typeof firstMeaning === 'string' && firstMeaning.trim() !== '') {
      return firstMeaning;
    }
  }

  if (typeof entry.full_definition_in_html === 'string' && entry.full_definition_in_html.trim() !== '') {
    return entry.full_definition_in_html;
  }

  if (typeof entry.tanim === 'string' && entry.tanim.trim() !== '') {
    return entry.tanim;
  }

  if (typeof entry.meaning === 'string' && entry.meaning.trim() !== '') {
    return entry.meaning;
  }

  return "Tanım bulunamadı.";
}