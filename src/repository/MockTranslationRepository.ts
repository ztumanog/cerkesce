/**
 * @file src/repository/MockTranslationRepository.ts
 * @description ADR-0007 standardÄ±na uygun Mock Repository - KapsamlÄ± Test ve Bellek Ä°Ã§i Depolama Implementasyonu
 */

import {
  ITranslationRepository,
  PaginationParams,
  PaginatedResult,
  SearchFilters,
} from "./ITranslationRepository";
import { TranslationEntry, TranslationGroup } from "../domain/translation";

/**
 * Mock Ã‡eviri Deposu - Test, GeliÅŸtirme ve Mock veri senaryolarÄ± iÃ§in
 * 
 * Ã–zellikler:
 * - ITranslationRepository arayÃ¼zÃ¼nÃ¼n TÃœM metodlarÄ±nÄ± implement eder
 * - 15+ varsayÄ±lan test verisini Map ve Dizi veri yapÄ±sÄ±nda depolar
 * - save, addEntry, findById, findByMeaning, saveGroup, findGroupById, findAll kontratlarÄ±nÄ± destekler
 * - LehÃ§e (BATI, DOGU) ve Dil (TR, EN, RU) filtreleme
 * - Sayfalama (Pagination) ve ileri dÃ¼zey arama filtreleri
 */
export class MockTranslationRepository implements ITranslationRepository {
  private entriesMap: Map<string, TranslationEntry> = new Map();
  private groupsMap: Map<string, TranslationGroup> = new Map();

  constructor() {
    this.seedInitialData();
  }

  /**
   * VarsayÄ±lan test verilerini Map yapÄ±larÄ±na yÃ¼kler.
   */
  private seedInitialData(): void {
    const defaultEntries: TranslationEntry[] = [
      // ===== BAÅLAR (g-head) =====
      {
        id: "e-1",
        lemma: "ÑˆÑŠÑ…ÑŒÑ",
        normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
        dialect: "BATI",
        groupId: "g-head",
        meanings: [
          { id: "m-1-1", language: "TR", text: "baÅŸ" },
          { id: "m-1-2", language: "EN", text: "head" },
          { id: "m-1-3", language: "RU", text: "Ğ³Ğ¾Ğ»Ğ¾Ğ²Ğ°" },
        ],
      },
      {
        id: "e-2",
        lemma: "Ñ‰Ñ…ÑŒÑ",
        normalizedLemma: "Ñ‰Ñ…ÑŒÑ",
        dialect: "DOGU",
        groupId: "g-head",
        meanings: [
          { id: "m-2-1", language: "TR", text: "baÅŸ" },
          { id: "m-2-2", language: "EN", text: "head" },
        ],
      },
      {
        id: "e-3",
        lemma: "Ğ¶ÑŠÑ‹",
        normalizedLemma: "Ğ¶ÑŠÑ‹",
        dialect: "BATI",
        groupId: "g-head",
        meanings: [
          { id: "m-3-1", language: "TR", text: "eski" },
          { id: "m-3-2", language: "EN", text: "old" },
        ],
      },
      {
        id: "e-4",
        lemma: "Ğ¶Ñ‹",
        normalizedLemma: "Ğ¶Ñ‹",
        dialect: "DOGU",
        groupId: "g-head",
        meanings: [
          { id: "m-4-1", language: "TR", text: "eski" },
          { id: "m-4-2", language: "EN", text: "old" },
        ],
      },

      // ===== SU VE SIVILER (g-water) =====
      {
        id: "e-5",
        lemma: "Ğ¿ÑÑ‹",
        normalizedLemma: "Ğ¿ÑÑ‹",
        dialect: "DOGU",
        groupId: "g-water",
        meanings: [
          { id: "m-5-1", language: "TR", text: "su" },
          { id: "m-5-2", language: "EN", text: "water" },
          { id: "m-5-3", language: "RU", text: "Ğ²Ğ¾Ğ´Ğ°" },
        ],
      },
      {
        id: "e-6",
        lemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
        normalizedLemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
        dialect: "BATI",
        groupId: "g-water",
        meanings: [
          { id: "m-6-1", language: "TR", text: "Ä±rmak" },
          { id: "m-6-2", language: "EN", text: "river" },
          { id: "m-6-3", language: "RU", text: "Ñ€ĞµĞºĞ°" },
        ],
      },
      {
        id: "e-7",
        lemma: "Ğ¿Ñ",
        normalizedLemma: "Ğ¿Ñ",
        dialect: "BATI",
        groupId: "g-water",
        meanings: [
          { id: "m-7-1", language: "TR", text: "su (kÄ±sa)" },
          { id: "m-7-2", language: "EN", text: "water (short)" },
        ],
      },

      // ===== KALP VE DUYGULAR (g-heart) =====
      {
        id: "e-8",
        lemma: "Ğ³Ñƒ",
        normalizedLemma: "Ğ³Ñƒ",
        dialect: "DOGU",
        groupId: "g-heart",
        meanings: [
          { id: "m-8-1", language: "TR", text: "kalp" },
          { id: "m-8-2", language: "EN", text: "heart" },
          { id: "m-8-3", language: "RU", text: "ÑĞµÑ€Ğ´Ñ†Ğµ" },
        ],
      },
      {
        id: "e-9",
        lemma: "Ğ³ÑŠÑƒÑ",
        normalizedLemma: "Ğ³ÑŠÑƒÑ",
        dialect: "BATI",
        groupId: "g-heart",
        meanings: [
          { id: "m-9-1", language: "TR", text: "kalp" },
          { id: "m-9-2", language: "EN", text: "heart" },
        ],
      },
      {
        id: "e-10",
        lemma: "Ğ½ÑÑ…ÑŠ",
        normalizedLemma: "Ğ½ÑÑ…ÑŠ",
        dialect: "DOGU",
        groupId: "g-heart",
        meanings: [
          { id: "m-10-1", language: "TR", text: "sevgi" },
          { id: "m-10-2", language: "EN", text: "love" },
        ],
      },

      // ===== HAYVANLAR (g-animals) =====
      {
        id: "e-11",
        lemma: "Ğ»IÑ",
        normalizedLemma: "Ğ»IÑ",
        dialect: "BATI",
        groupId: "g-animals",
        meanings: [
          { id: "m-11-1", language: "TR", text: "at" },
          { id: "m-11-2", language: "EN", text: "horse" },
          { id: "m-11-3", language: "RU", text: "Ğ»Ğ¾ÑˆĞ°Ğ´ÑŒ" },
        ],
      },
      {
        id: "e-12",
        lemma: "Ğ»Ñ",
        normalizedLemma: "Ğ»Ñ",
        dialect: "DOGU",
        groupId: "g-animals",
        meanings: [
          { id: "m-12-1", language: "TR", text: "at" },
          { id: "m-12-2", language: "EN", text: "horse" },
        ],
      },
      {
        id: "e-13",
        lemma: "ÑˆÑ‹",
        normalizedLemma: "ÑˆÑ‹",
        dialect: "BATI",
        groupId: "g-animals",
        meanings: [
          { id: "m-13-1", language: "TR", text: "kÃ¶pek" },
          { id: "m-13-2", language: "EN", text: "dog" },
        ],
      },

      // ===== RENKLER (g-colors) =====
      {
        id: "e-14",
        lemma: "Ñ„Ñ",
        normalizedLemma: "Ñ„Ñ",
        dialect: "DOGU",
        groupId: "g-colors",
        meanings: [
          { id: "m-14-1", language: "TR", text: "beyaz" },
          { id: "m-14-2", language: "EN", text: "white" },
        ],
      },
      {
        id: "e-15",
        lemma: "Ñ…ÑŒÑ",
        normalizedLemma: "Ñ…ÑŒÑ",
        dialect: "BATI",
        groupId: "g-colors",
        meanings: [
          { id: "m-15-1", language: "TR", text: "siyah" },
          { id: "m-15-2", language: "EN", text: "black" },
        ],
      },
    ];

    const defaultGroups: TranslationGroup[] = [
      { id: "g-head", groupName: "BaÅŸ KavramÄ±", entries: [] },
      { id: "g-water", groupName: "Su ve SÄ±vÄ± KavramÄ±", entries: [] },
      { id: "g-heart", groupName: "Kalp ve Duygular", entries: [] },
      { id: "g-animals", groupName: "Hayvanlar", entries: [] },
      { id: "g-colors", groupName: "Renkler", entries: [] },
    ];

    for (const entry of defaultEntries) {
      this.entriesMap.set(entry.id, entry);
    }
    for (const group of defaultGroups) {
      this.groupsMap.set(group.id, group);
    }
  }

  // ==========================================
  // Primary Repository Contract (ITranslationRepository)
  // ==========================================

  async save(entry: TranslationEntry): Promise<TranslationEntry> {
    if (!entry.id) {
      entry.id = `e-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    }
    this.entriesMap.set(entry.id, entry);
    return entry;
  }

  async addEntry(entry: TranslationEntry): Promise<TranslationEntry> {
    return this.save(entry);
  }

  async findById(id: string): Promise<TranslationEntry | null> {
    return this.entriesMap.get(id) || null;
  }

  async findByLemma(lemma: string): Promise<TranslationEntry[]> {
    const normalized = lemma.trim().toLocaleLowerCase("tr");
    return Array.from(this.entriesMap.values()).filter(
      (e) => e.lemma.trim().toLocaleLowerCase("tr") === normalized
    );
  }

  async search(query: string): Promise<TranslationEntry[]> {
    if (!query || !query.trim()) return Array.from(this.entriesMap.values());
    const normalized = query.trim().toLocaleLowerCase("tr");

    return Array.from(this.entriesMap.values()).filter((e) => {
      const matchLemma =
        e.lemma?.toLocaleLowerCase("tr").includes(normalized) ||
        e.normalizedLemma?.toLocaleLowerCase("tr").includes(normalized);

      const matchMeaning = e.meanings?.some((m) =>
        m.text.toLocaleLowerCase("tr").includes(normalized)
      );

      return matchLemma || matchMeaning;
    });
  }

  async findByMeaning(text: string, language?: string): Promise<TranslationEntry[]> {
    if (!text || !text.trim()) return [];
    const queryNormalized = text.trim().toLocaleLowerCase("tr");
    const targetLang = language?.trim().toUpperCase();

    return Array.from(this.entriesMap.values()).filter((entry) => {
      return entry.meanings?.some((m) => {
        const matchesText = m.text.trim().toLocaleLowerCase("tr").includes(queryNormalized);
        const matchesLang = targetLang ? m.language.toUpperCase() === targetLang : true;
        return matchesText && matchesLang;
      });
    });
  }

  async saveGroup(group: TranslationGroup): Promise<TranslationGroup> {
    const gId = group.id || (group as any).groupId || `g-${Date.now()}`;
    const groupToSave = { ...group, id: gId };
    this.groupsMap.set(gId, groupToSave);
    return groupToSave;
  }

  async findGroupById(groupId: string): Promise<TranslationGroup | null> {
    const group = this.groupsMap.get(groupId);
    if (!group) return null;

    const groupEntries = Array.from(this.entriesMap.values()).filter(
      (e) => e.groupId === groupId
    );

    return {
      ...group,
      entries: groupEntries,
    };
  }

  async findAll(): Promise<TranslationEntry[]> {
    return Array.from(this.entriesMap.values());
  }

  // ==========================================
  // ADR-0007 / Extended Methods
  // ==========================================

  async getByLemma(lemma: string): Promise<TranslationEntry | null> {
    const results = await this.findByLemma(lemma);
    return results.length > 0 ? results[0] : null;
  }

  async getTranslations(query: string): Promise<TranslationEntry[]> {
    const cleanQuery = query.trim().toLocaleLowerCase("tr");
    if (!cleanQuery) return this.findAll();

    return Array.from(this.entriesMap.values()).filter((e) =>
      e.lemma.toLocaleLowerCase("tr").includes(cleanQuery)
    );
  }

  async reverseLookup(meaningQuery: string): Promise<TranslationEntry[]> {
    return this.findByMeaning(meaningQuery);
  }

  async getByGroup(groupId: string): Promise<TranslationGroup | null> {
    return this.findGroupById(groupId);
  }

  // Backward Compatibility Helpers
  async findCanonicalById(id: string): Promise<TranslationEntry | null> {
    return this.findById(id);
  }

  async findGroupSenses(groupId: string): Promise<TranslationGroup | null> {
    return this.findGroupById(groupId);
  }

  async searchCrossDictionary(query: string): Promise<TranslationEntry[]> {
    return this.search(query);
  }

  filterByDialect(entries: TranslationEntry[], dialect: string): TranslationEntry[] {
    const targetDialect = dialect.trim().toLowerCase();
    return entries.filter((e) => e.dialect?.toLowerCase() === targetDialect);
  }

  filterByLanguage(entries: TranslationEntry[], language: string): TranslationEntry[] {
    const targetLang = language.trim().toUpperCase();
    return entries.filter((e) =>
      e.meanings?.some((m) => m.language.toUpperCase() === targetLang)
    );
  }

  async searchWithFilters(
    query: string,
    filters: SearchFilters
  ): Promise<TranslationEntry[]> {
    let results = await this.search(query);

    if (filters.dialect) {
      results = this.filterByDialect(results, filters.dialect);
    }

    if (filters.language) {
      results = this.filterByLanguage(results, filters.language);
    }

    if (filters.groupId) {
      results = results.filter((e) => e.groupId === filters.groupId);
    }

    return results;
  }

  async getWithPagination(
    query: string,
    params: PaginationParams
  ): Promise<PaginatedResult<TranslationEntry>> {
    const results = await this.search(query);
    const total = results.length;
    const totalPages = Math.ceil(total / params.limit);
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;

    return {
      data: results.slice(start, end),
      total,
      page: params.page,
      limit: params.limit,
      totalPages,
    };
  }

  async getAll(): Promise<TranslationEntry[]> {
    return this.findAll();
  }

  async getAllGroups(): Promise<TranslationGroup[]> {
    return Array.from(this.groupsMap.values());
  }

  async count(): Promise<number> {
    return this.entriesMap.size;
  }

  async exists(lemma: string): Promise<boolean> {
    const entry = await this.getByLemma(lemma);
    return entry !== null;
  }
}

/**
 * Test ve varsayÄ±lan veriler iÃ§in baÄŸÄ±msÄ±z sabit Ã¶rnekler
 */
export const MOCK_REPOSITORY_ENTRIES: TranslationEntry[] = [
  {
    id: "ENTRY_1",
    lemma: "Ğ¿ÑÑ‹",
    normalizedLemma: "Ğ¿ÑÑ‹",
    dialect: "DOGU",
    groupId: "g-water",
    meanings: [
      { id: "m1", language: "TR", text: "su" },
      { id: "m1-en", language: "EN", text: "water" },
    ],
  },
  {
    id: "ENTRY_2",
    lemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
    normalizedLemma: "Ğ¿ÑÑ‹Ñ…ÑŠĞ¾",
    dialect: "BATI",
    groupId: "g-water",
    meanings: [
      { id: "m2", language: "TR", text: "Ä±rmak" },
      { id: "m2-en", language: "EN", text: "river" },
    ],
  },
  {
    id: "ENTRY_3",
    lemma: "Ğ³Ñƒ",
    normalizedLemma: "Ğ³Ñƒ",
    dialect: "DOGU",
    groupId: "g-heart",
    meanings: [
      { id: "m3", language: "TR", text: "kalp" },
      { id: "m3-en", language: "EN", text: "heart" },
    ],
  },
  {
    id: "ENTRY_4",
    lemma: "ÑˆÑŠÑ…ÑŒÑ",
    normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
    dialect: "BATI",
    groupId: "g-head",
    meanings: [
      { id: "m4", language: "TR", text: "baÅŸ" },
      { id: "m4-en", language: "EN", text: "head" },
    ],
  },
  {
    id: "ENTRY_5",
    lemma: "Ğ»IÑ",
    normalizedLemma: "Ğ»IÑ",
    dialect: "BATI",
    groupId: "g-animals",
    meanings: [
      { id: "m5", language: "TR", text: "at" },
      { id: "m5-en", language: "EN", text: "horse" },
    ],
  },
];

export const MOCK_REPOSITORY_GROUPS: TranslationGroup[] = [
  { id: "g-head", groupName: "BaÅŸ KavramÄ±", entries: [] },
  { id: "g-water", groupName: "Su ve SÄ±vÄ± KavramÄ±", entries: [] },
  { id: "g-heart", groupName: "Kalp ve Duygular", entries: [] },
  { id: "g-animals", groupName: "Hayvanlar", entries: [] },
  { id: "g-colors", groupName: "Renkler", entries: [] },
];
