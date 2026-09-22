/**
 * File: src/lib/worOfDay.ts
 * Generated: 2026-09-19
 * Layer: Service
 */
import { DictionaryEntry } from "@/types/dictionary";

export function getWordOfDay(words: DictionaryEntry[]): DictionaryEntry | null {
  if (!words || words.length === 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash += today.charCodeAt(i);
  return words[Math.abs(hash) % words.length];
}