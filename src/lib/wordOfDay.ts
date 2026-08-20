import { DictionaryItem } from "@/types/dictionary";

export function getWordOfDay(words: DictionaryItem[]): DictionaryItem | null {
  if (!words || words.length === 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash += today.charCodeAt(i);
  return words[Math.abs(hash) % words.length];
}