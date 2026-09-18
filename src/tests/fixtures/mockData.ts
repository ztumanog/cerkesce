/**
 * File: UNKNOWN
 * Generated: CURRENT_SESSION_DATE
 */
import { LemmaEntry, MeaningItem } from "../../types/dictionary";

export const mockMeanings: MeaningItem[] = [
  { id: "m1", text: "water", language: "EN", definition: "A clear liquid", example: "I drink water", context: "general" },
  { id: "m2", text: "su", language: "TR", definition: "Berrak sıvı", example: "Su içiyorum", context: "genel" },
  { id: "m3", text: "вода", language: "RU", definition: "Прозрачная жидкость", example: "Я пью воду", context: "общее" },
  { id: "m4", text: "hope", language: "EN", definition: "A feeling of expectation" },
  { id: "m5", text: "umut", language: "TR", definition: "Beklenti hissi" },
  { id: "m6", text: "надежда", language: "RU", definition: "Чувство ожидания" },
  { id: "m7", text: "head", language: "EN", definition: "Upper part of body" },
  { id: "m8", text: "baş", language: "TR", definition: "Vücudun üst kısmı" },
  { id: "m9", text: "голова", language: "RU", definition: "Верхняя часть тела" },
];

export const mockLemmaEntries: LemmaEntry[] = [
  { id: "entry-1", lemma: "water", normalizedLemma: "water", meanings: [mockMeanings[0], mockMeanings[1]], language: "EN", dialect: "WESTERN", groupId: "g1", partOfSpeech: "noun", etymology: "Old English wæter", notes: "Common word", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-01-01") },
  { id: "entry-2", lemma: "вода", normalizedLemma: "voda", meanings: [mockMeanings[2], mockMeanings[1]], language: "RU", dialect: "EASTERN", groupId: "g1", partOfSpeech: "noun", etymology: "Proto-Slavic *voda", notes: "Common word", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-01-01") },
  { id: "entry-3", lemma: "hope", normalizedLemma: "hope", meanings: [mockMeanings[3], mockMeanings[4], mockMeanings[5]], language: "EN", dialect: "WESTERN", groupId: "g2", partOfSpeech: "noun", etymology: "Old English hopa", notes: "Emotional word", createdAt: new Date("2024-01-02"), updatedAt: new Date("2024-01-02") },
  { id: "entry-4", lemma: "head", normalizedLemma: "head", meanings: [mockMeanings[6], mockMeanings[7], mockMeanings[8]], language: "EN", dialect: "WESTERN", groupId: "g3", partOfSpeech: "noun", etymology: "Old English heafod", notes: "Body part", createdAt: new Date("2024-01-03"), updatedAt: new Date("2024-01-03") },
];

export const setupMockData = () => mockLemmaEntries;