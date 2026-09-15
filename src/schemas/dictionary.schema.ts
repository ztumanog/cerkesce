import { z } from 'zod';

export const partOfSpeechSchema = z.enum([
  'noun', 'verb', 'adjective', 'adverb',
  'pronoun', 'preposition', 'conjunction', 'interjection'
]);

export const exampleSchema = z.object({
  id: z.string().min(1),
  sentence: z.string().min(1),
  translation: z.string().optional(),
  author: z.string().optional(),
});

export const definitionSchema = z.object({
  id: z.string().min(1),
  partOfSpeech: partOfSpeechSchema,
  meaning: z.string().min(1),
  examples: z.array(exampleSchema).optional(),
  synonyms: z.array(z.string()).optional(),
  antonyms: z.array(z.string()).optional(),
});

export const pronunciationSchema = z.object({
  ipa: z.string().optional(),
  audioUrl: z.string().url().optional(),
});

export const dictionaryEntrySchema = z.object({
  id: z.string().min(1),
  word: z.string().min(1),
  language: z.string().length(2), // örn: 'tr', 'en'
  pronunciation: pronunciationSchema.optional(),
  etymology: z.string().optional(),
  definitions: z.array(definitionSchema).min(1),
  relatedWords: z.array(z.string()).optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});