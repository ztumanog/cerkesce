import { TranslationEntry, Meaning, KaynakItem } from "../types/dictionary";

export function normalizeEntry(raw: any): TranslationEntry {
  const meanings: Meaning[] = (raw.meanings || []).map((m: any, index: number) => ({
    id: m.id || `m-${index}`,
    language: m.language || m.lang || "TR",
    text: m.text || m.value || "",
    value: m.value || m.text || "",
  }));

  const kaynaklar: KaynakItem[] = (raw.kaynaklar || []).map((k: any, index: number) => {
    if (typeof k === "string") {
      return { id: `k-${index}`, name: k };
    }
    return {
      id: k.id || `k-${index}`,
      title: k.title || k.name || "",
      name: k.name || k.title || "",
      url: k.url,
    };
  });

  return {
    id: raw.id || "",
    lemma: raw.lemma || raw.word || "",
    word: raw.word || raw.lemma || "",
    meaning: raw.meaning || (meanings[0] ? meanings[0].text : ""),
    normalizedLemma: raw.normalizedLemma || (raw.lemma ? raw.lemma.toLowerCase() : ""),
    dialect: raw.dialect,
    groupId: raw.groupId,
    groupName: raw.groupName,
    meanings,
    kaynaklar,
  };
}
