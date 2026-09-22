/**
 * File: src/config/sourcePriority.ts
 * Generated: 2026-09-19
 * Layer: Config
 */

export const SOURCE_PRIORITY: Record<string, string[]> = {
  // Adyghe/Circassian
  'ady': [
    '21', // Hilmi (Adyghe-Adyghe)
    '31', // Teshu (Turkish-Adyghe)
    '30', // Three Volumes (Adyghe-Russian)
    '1',  // AP (Adyghe-Adyghe)
    '18', // Kbd-Ru&En
  ],

  // Kabardian
  'kbd': [
    '18', // Kbd-Ru&En
    '32', // Nalchik 2013 (Russian-Kabardian)
    '1',  // AP
  ],

  // English
  'en': [
    '10', // Adam (English-Adyghe)
    '33', // Jonty (English-Adyghe)
    '11', // Ziwar (English-Adyghe)
  ],

  // Russian
  'ru': [
    '24', // UAG (Russian-Adyghe)
    '32', // Nalchik (Russian-Kabardian)
    '30', // Three Volumes (Adyghe-Russian)
  ],

  // Turkish
  'tr': [
    '31', // Teshu (Turkish-Adyghe)
  ],

  // Default
  'default': [
    '21', // Hilmi
    '30', // Three Volumes
    '24', // UAG
    '32', // Nalchik
    '33', // Jonty
    '10', // Adam
    '31', // Teshu
    '1',  // AP
    '18', // Kbd-Ru&En
    '11', // Ziwar
  ],
};

export interface SourceMetadata {
  id: string;
  title: string;
  language: string;
  targetLanguage: string;
  richness: 'premium' | 'high' | 'medium' | 'low';
  hasExamples: boolean;
  hasIdioms: boolean;
  hasUsagePatterns: boolean;
}

export const SOURCE_METADATA: Record<string, SourceMetadata> = {
  '21': {
    id: '21',
    title: 'Hilmi',
    language: 'ady',
    targetLanguage: 'ady',
    richness: 'premium',
    hasExamples: true,
    hasIdioms: true,
    hasUsagePatterns: true,
  },
  '30': {
    id: '30',
    title: 'Three Volumes',
    language: 'ady',
    targetLanguage: 'ru',
    richness: 'premium',
    hasExamples: true,
    hasIdioms: true,
    hasUsagePatterns: true,
  },
  '24': {
    id: '24',
    title: 'UAG',
    language: 'ru',
    targetLanguage: 'ady',
    richness: 'premium',
    hasExamples: true,
    hasIdioms: true,
    hasUsagePatterns: true,
  },
  '32': {
    id: '32',
    title: 'Nalchik 2013',
    language: 'ru',
    targetLanguage: 'kbd',
    richness: 'high',
    hasExamples: true,
    hasIdioms: false,
    hasUsagePatterns: true,
  },
  '33': {
    id: '33',
    title: 'Jonty',
    language: 'en',
    targetLanguage: 'ady',
    richness: 'high',
    hasExamples: true,
    hasIdioms: false,
    hasUsagePatterns: false,
  },
  '10': {
    id: '10',
    title: 'Adam',
    language: 'en',
    targetLanguage: 'ady',
    richness: 'medium',
    hasExamples: false,
    hasIdioms: false,
    hasUsagePatterns: false,
  },
  '31': {
    id: '31',
    title: 'Teshu',
    language: 'tr',
    targetLanguage: 'ady',
    richness: 'medium',
    hasExamples: true,
    hasIdioms: false,
    hasUsagePatterns: false,
  },
  '1': {
    id: '1',
    title: 'AP',
    language: 'ady',
    targetLanguage: 'ady',
    richness: 'high',
    hasExamples: false,
    hasIdioms: true,
    hasUsagePatterns: false,
  },
  '18': {
    id: '18',
    title: 'Kbd-Ru&En',
    language: 'kbd',
    targetLanguage: 'ru',
    richness: 'medium',
    hasExamples: false,
    hasIdioms: false,
    hasUsagePatterns: false,
  },
  '11': {
    id: '11',
    title: 'Ziwar',
    language: 'en',
    targetLanguage: 'ady',
    richness: 'low',
    hasExamples: false,
    hasIdioms: false,
    hasUsagePatterns: false,
  },
};

export function getPriorityList(language: string): string[] {
  return SOURCE_PRIORITY[language] || SOURCE_PRIORITY['default'];
}

export function getSourceMetadata(sourceId: string): SourceMetadata | null {
  return SOURCE_METADATA[sourceId] || null;
}

/**
 * Kaynak ID dizisini verilen dilin öncelik sırasına göre O(1) arama ile sıralar.
 */
export function sortSourcesByPriority(
  sources: string[],
  language: string
): string[] {
  const priority = getPriorityList(language);
  
  // O(1) erişim için indeks haritası (Indexed Lookup)
  const priorityMap = new Map<string, number>();
  priority.forEach((id, index) => priorityMap.set(id, index));

  return [...sources].sort((a, b) => {
    const aIndex = priorityMap.get(a) ?? Number.MAX_SAFE_INTEGER;
    const bIndex = priorityMap.get(b) ?? Number.MAX_SAFE_INTEGER;

    return aIndex - bIndex;
  });
}