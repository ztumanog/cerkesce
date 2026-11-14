import { TranslationMeaning } from "../../domain/translation";

export function getMeaningText(meaning: string | TranslationMeaning): string {
  return typeof meaning === 'string' ? meaning : (meaning.text ?? '');
}

export function getMeaningLanguage(meaning: string | TranslationMeaning): string | undefined {
  return typeof meaning === 'string' ? undefined : meaning.language;
}