// @/lib/dictionary-resolver.ts
import { RawDefinition } from '@/types/source';

/**
 * TanÄ±m SeÃ§me MantÄ±ÄŸÄ± HiyerarÅŸisi:
 * 1. definitions[].meaning
 * 2. full_definition_in_html
 * 3. tanim
 * 4. meaning
 * 
 * Bellek dostu ve sÄ±fÄ±r nesne kopyalamasÄ± ile Ã§alÄ±ÅŸÄ±r.
 */
export function resolveDefinition(entry: RawDefinition): string | null {
  if (entry.definitions && entry.definitions.length > 0) {
    const primaryMeaning = entry.definitions[0]?.meaning;
    if (primaryMeaning && primaryMeaning.trim().length > 0) {
      return primaryMeaning;
    }
  }

  if (entry.full_definition_in_html && entry.full_definition_in_html.trim().length > 0) {
    return entry.full_definition_in_html;
  }

  if (entry.tanim && entry.tanim.trim().length > 0) {
    return entry.tanim;
  }

  if (entry.meaning && entry.meaning.trim().length > 0) {
    return entry.meaning;
  }

  return null;
}
