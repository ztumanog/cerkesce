// @/lib/dictionaryParser.ts

// Kural: 'any' kesinlikle yasaktır, dışarıdan gelen veriyi 'unknown' ile karşıla.
export function extractDefinition(data: unknown): string {
  // Tip Koruyucu (Type Guard) ile veri yapısını doğrulama
  if (!data || typeof data !== 'object') {
    throw new Error("Geçersiz veri yapısı tespit edildi.");
  }

  const record = data as Record<string, any>;

  // Kural: definitions[].meaning > full_definition_in_html > tanim > meaning
  if (Array.isArray(record.definitions) && record.definitions.length > 0) {
    const firstDef = record.definitions[0] as Record<string, any>;
    if (typeof firstDef.meaning === 'string') return firstDef.meaning;
  }

  if (typeof record.full_definition_in_html === 'string') {
    return record.full_definition_in_html;
  }

  if (typeof record.tanim === 'string') {
    return record.tanim;
  }

  if (typeof record.meaning === 'string') {
    return record.meaning;
  }

  return "Tanım bulunamadı.";
}