// src/repository/InMemoryTranslationRepository.ts
import type { TranslationEntry, TranslationGroup } from '../domain/translation';
import type { ITranslationRepository } from './ITranslationRepository';

// ============================================================
// Varsayılan Mock Verileri
// ============================================================
export const DEFAULT_MOCK_ENTRIES: TranslationEntry[] = [
  {
    id: '1',
    lemma: 'псы',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    word: 'псы',
    sourceWord: 'псы',
    meaning: 'su',
    normalizedLemma: 'псы',
    groupId: 'TRG_WATER',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    groupName: 'Su',
    dialect: 'KBD',
    meanings: [
      { id: 'm-1', language: 'TR', text: 'su', value: 'su' },
      { id: 'm-2', language: 'EN', text: 'water', value: 'water' },
      { id: 'm-2b', language: 'RU', text: 'вода', value: 'вода' },
    ],
  },
  {
    id: 'e-water-gwater',
    lemma: 'пс',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    word: 'пс',
    sourceWord: 'пс',
    meaning: 'su',
    normalizedLemma: 'пс',
    groupId: 'g-water',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    groupName: 'Su ve Sıvı Kavramı',
    dialect: 'ADY',
    meanings: [
      { id: 'm-3', language: 'TR', text: 'su', value: 'su' },
      { id: 'm-4', language: 'EN', text: 'water', value: 'water' },
    ],
  },
  {
    id: '2',
    lemma: 'шъхьэ',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FB4',
    word: 'шъхьэ',
    sourceWord: 'шъхьэ',
    meaning: 'baş',
    normalizedLemma: 'шъхьэ',
    groupId: 'g-head',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB4',
    groupName: 'Baş Kavramı',
    dialect: 'ADY',
    meanings: [
      { id: 'm-5', language: 'TR', text: 'baş', value: 'baş' },
      { id: 'm-6', language: 'EN', text: 'head', value: 'head' },
    ],
  },
  {
    id: 'e-head-kbd',
    lemma: 'щхьэ',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FB4',
    word: 'щхьэ',
    sourceWord: 'щхьэ',
    meaning: 'baş',
    normalizedLemma: 'щхьэ',
    groupId: 'g-head',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB4',
    groupName: 'Baş Kavramı',
    dialect: 'KBD',
    meanings: [{ id: 'm-7', language: 'TR', text: 'baş', value: 'baş' }],
  },
  {
    id: 'e-hope',
    lemma: 'гугъэ',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FB5',
    word: 'гугъэ',
    sourceWord: 'гугъэ',
    meaning: 'umut',
    normalizedLemma: 'гугъэ',
    groupId: 'g-hope',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB5',
    groupName: 'Umut Kavramı',
    dialect: 'ADY',
    meanings: [
      { id: 'm-8', language: 'TR', text: 'umut', value: 'umut' },
      { id: 'm-9', language: 'EN', text: 'hope', value: 'hope' },
    ],
  },
  {
    id: 'e-tree',
    lemma: 'tree',
    word: 'tree',
    sourceWord: 'tree',
    meaning: 'ağaç',
    normalizedLemma: 'tree',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FB2',
    groupId: 'g-tree',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB2',
    groupName: 'Ağaç Kavramı',
    dialect: 'EN',
    meanings: [
      { id: 'm-10', language: 'TR', text: 'ağaç', value: 'ağaç' },
      { id: 'm-11', language: 'EN', text: 'tree', value: 'tree' },
    ],
  },
  {
    id: 'e-horse',
    lemma: 'horse',
    word: 'horse',
    sourceWord: 'horse',
    meaning: 'at',
    normalizedLemma: 'horse',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FB3',
    groupId: 'g-horse',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FB3',
    groupName: 'At Kavramı',
    dialect: 'EN',
    meanings: [
      { id: 'm-12', language: 'TR', text: 'at', value: 'at' },
      { id: 'm-13', language: 'EN', text: 'horse', value: 'horse' },
    ],
  },
  {
    id: 'e-water-psi',
    lemma: 'psı',
    word: 'psı',
    sourceWord: 'psı',
    meaning: 'su',
    normalizedLemma: 'psı',
    concept: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    groupId: 'TRG_WATER',
    conceptId: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    groupName: 'Su',
    dialect: 'ADY',
    meanings: [
      { id: 'm-20', language: 'TR', text: 'su', value: 'su' },
      { id: 'm-21', language: 'EN', text: 'water', value: 'water' },
    ],
  },
];

// ============================================================
// InMemoryTranslationRepository
// ============================================================
export class InMemoryTranslationRepository implements ITranslationRepository {
  private entriesMap: Map<string, TranslationEntry> = new Map();
  private groups: TranslationGroup[] = [];

  constructor(
    initialEntries?: TranslationEntry[],
    groups?: TranslationGroup[]
  ) {
    if (initialEntries && initialEntries.length > 0) {
      for (const entry of initialEntries) {
        this.entriesMap.set(entry.id, entry);
      }
    } else {
      for (const entry of DEFAULT_MOCK_ENTRIES) {
        this.entriesMap.set(entry.id, entry);
      }
    }

    if (groups && groups.length > 0) {
      this.groups = groups;
    }
  }

  private get entries(): TranslationEntry[] {
    return Array.from(this.entriesMap.values());
  }

  // ===== TEMEL METOTLAR =====

  async save(entry: TranslationEntry): Promise<TranslationEntry> {
    this.entriesMap.set(entry.id, entry);
    return entry;
  }

  async addEntry(entry: TranslationEntry): Promise<TranslationEntry> {
    return this.save(entry);
  }

  async saveBatch(entries: TranslationEntry[]): Promise<void> {
    for (const entry of entries) {
      this.entriesMap.set(entry.id, entry);
    }
  }

  async loadEntries(entries: TranslationEntry[]): Promise<void> {
    await this.saveBatch(entries);
  }

  async loadGroups(groups: TranslationGroup[]): Promise<void> {
    this.groups = [...groups];
  }

  clear(): void {
    this.entriesMap.clear();
    this.groups = [];
  }

  async getAll(): Promise<TranslationEntry[]> {
    return Array.from(this.entriesMap.values());
  }

  async findAll(): Promise<TranslationEntry[]> {
    return this.getAll();
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.entriesMap.get(id) || null;
  }

  async findCanonicalById(id: string): Promise<TranslationEntry | null> {
    return this.entriesMap.get(id) || null;
  }

  async findBySourceWord(word: string): Promise<TranslationEntry[]> {
    if (!word || !word.trim()) return [];
    const trimmed = word.trim().toLowerCase();
    return this.entries.filter((e: any) => {
      const srcWord = e.sourceWord || e.source_word;
      return srcWord && String(srcWord).trim().toLowerCase() === trimmed;
    });
  }

  async findByLemma(
    lemma: string
  ): Promise<TranslationEntry[] | TranslationEntry | null> {
    if (!lemma) return null;
    const trimmed = lemma.trim().toLowerCase();
    return (
      this.entries.find((e) => (e.lemma || '').toLowerCase() === trimmed) ||
      null
    );
  }

  async searchByMeaning(
    meaningQuery: string,
    langFilter?: string
  ): Promise<TranslationEntry[]> {
    if (!meaningQuery || !meaningQuery.trim()) return this.entries;
    const trimmed = meaningQuery.trim().toLowerCase();
    return this.entries.filter((e) =>
      e.meanings?.some((m: any) => {
        if (
          langFilter &&
          m.language?.toUpperCase() !== langFilter.toUpperCase()
        )
          return false;
        return (m.text || m.value || '').toLowerCase().includes(trimmed);
      })
    );
  }

  async reverseLookup(meaningQuery: string): Promise<TranslationEntry[]> {
    return this.searchByMeaning(meaningQuery);
  }

  async getTranslations(query: string): Promise<TranslationEntry[]> {
    return this.searchCrossDictionary(query);
  }

  async findByMeaning(meaningQuery: string): Promise<TranslationEntry[]> {
    return this.searchByMeaning(meaningQuery);
  }

  async findGroupSenses(
    groupId: string
  ): Promise<TranslationGroup | null> {
    const group = this.groups.find(
      (g: any) => g.id === groupId || g.groupId === groupId
    );
    if (group) return group;

    const groupEntries = this.entries.filter(
      (e: any) => e.groupId === groupId
    );
    if (groupEntries.length === 0) return null;

    let groupName = 'Kavram Grubu';
    if (groupId === 'g-water') groupName = 'Su ve Sıvı Kavramı';
    else if (groupId === 'TRG_WATER') groupName = 'Su';
    else if (groupId === 'g-head') groupName = 'Baş Kavramı';
    else if (groupId === 'g-hope') groupName = 'Umut Kavramı';
    else
      groupName =
        groupEntries.find((e: any) => e.groupName)?.groupName ||
        'Kavram Grubu';

    return {
      id: groupId,
      groupName,
      entries: groupEntries,
    } as TranslationGroup;
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    return this.findGroupSenses(groupId);
  }

  async searchCrossDictionary(
    query: string,
    languageFilter?: string
  ): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) return this.entries;
    const trimmed = query.trim().toLowerCase();
    return this.entries.filter((e: any) => {
      const matchLemma = (e.lemma || '').toLowerCase().includes(trimmed);
      const matchWord = (e.word || '').toLowerCase().includes(trimmed);
      const matchMeaning = e.meanings?.some((m: any) => {
        if (
          languageFilter &&
          m.language?.toUpperCase() !== languageFilter.toUpperCase()
        )
          return false;
        return (m.text || m.value || '').toLowerCase().includes(trimmed);
      });
      return matchLemma || matchWord || matchMeaning;
    });
  }

  async search(query: string): Promise<TranslationEntry[]> {
    return this.searchCrossDictionary(query);
  }

  async count(): Promise<number> {
    return this.entriesMap.size;
  }

  async exists(lemma: string): Promise<boolean> {
    const trimmed = lemma.trim().toLowerCase();
    return this.entries.some(
      (e) => (e.lemma || '').toLowerCase() === trimmed
    );
  }

  async getAllGroups(): Promise<TranslationGroup[]> {
    return [...this.groups];
  }
}

// ============================================================
// MockTranslationRepository — aynı davranışı gösteren alt sınıf
// ============================================================
export class MockTranslationRepository extends InMemoryTranslationRepository {}