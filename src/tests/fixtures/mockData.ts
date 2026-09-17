import { LemmaEntry, MeaningItem } from "../../types/dictionary";

export const mockMeanings: MeaningItem[] = [
  { id: "m1", text: "water", language: "EN", definition: "A clear liquid", example: "I drink water", context: "general" },
  { id: "m2", text: "su", language: "TR", definition: "Berrak sıvı", example: "Su içiyorum", context: "genel" },
  { id: "m3", text: "вода", language: "RU", definition: "Прозрачная жидкость", example: "Я пью воду", context: "общее" },
];

export const mockLemmaEntries: LemmaEntry[] = [
  { id: "entry-1", lemma: "water", normalizedLemma: "water", meanings: [{ id: "m1", text: "water", language: "EN", definition: "A clear liquid" }, { id: "m2", text: "su", language: "TR", definition: "Berrak sıvı" }], language: "EN", dialect: "WESTERN", groupId: "g1", partOfSpeech: "noun", etymology: "Old English wæter", notes: "Common word", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-01-01") },
  { id: "entry-2", lemma: "вода", normalizedLemma: "voda", meanings: [{ id: "m3", text: "вода", language: "RU", definition: "Прозрачная жидкость" }, { id: "m2", text: "su", language: "TR", definition: "Berrak sıvı" }], language: "RU", dialect: "EASTERN", groupId: "g1", partOfSpeech: "noun", etymology: "Proto-Slavic *voda", notes: "Common word", createdAt: new Date("2024-01-01"), updatedAt: new Date("2024-01-01") },
  { id: "entry-3", lemma: "hope", normalizedLemma: "hope", meanings: [{ id: "m4", text: "hope", language: "EN", definition: "A feeling of expectation" }, { id: "m5", text: "umut", language: "TR", definition: "Beklenti hissi" }, { id: "m6", text: "надежда", language: "RU", definition: "Чувство ожидания" }], language: "EN", dialect: "WESTERN", groupId: "g2", partOfSpeech: "noun", etymology: "Old English hopa", notes: "Emotional word", createdAt: new Date("2024-01-02"), updatedAt: new Date("2024-01-02") },
  { id: "entry-4", lemma: "head", normalizedLemma: "head", meanings: [{ id: "m7", text: "head", language: "EN", definition: "Upper part of body" }, { id: "m8", text: "baş", language: "TR", definition: "Vücudun üst kısmı" }, { id: "m9", text: "голова", language: "RU", definition: "Верхняя часть тела" }], language: "EN", dialect: "WESTERN", groupId: "g3", partOfSpeech: "noun", etymology: "Old English heafod", notes: "Body part", createdAt: new Date("2024-01-03"), updatedAt: new Date("2024-01-03") },
];

export const setupMockData = () => mockLemmaEntries;
