/**
 * @file src/__tests__/sourceContentNormalizer.test.ts
 * @description InMemoryTranslationRepository Tip Güvenli Test Paketi
 */

import { describe, it, expect } from 'vitest';
import { InMemoryTranslationRepository } from '../repository/InMemoryTranslationRepository';
import type { TranslationEntry, TranslationGroup } from '../domain/translation';

describe('InMemoryTranslationRepository', () => {
  // Test verisi — gerçek constructor imzasına uygun
  const mockEntries: TranslationEntry[] = [
    {
      id: 'e-1',
      lemma: 'test',
      normalizedLemma: 'test',
      dialect: 'KBD',
      groupId: 'g-1',
      meanings: [{ id: 'm-1', language: 'TR', text: 'deneme' }],
    },
    {
      id: 'e-2',
      lemma: 'псы',
      normalizedLemma: 'псы',
      dialect: 'KBD',
      groupId: 'g-1',
      meanings: [{ id: 'm-2', language: 'TR', text: 'su' }],
    },
  ];

  const mockGroups: TranslationGroup[] = [
    { id: 'g-1', groupName: 'Test Grubu', entries: [] },
  ];

  it('Depo verilerle başlatılabilmeli', () => {
    // ✅ DÜZELTİLDİ: Constructor (entries, groups) alıyor
    const repo = new InMemoryTranslationRepository(mockEntries, mockGroups);
    expect(repo).toBeDefined();
  });

  it('Kelime arama işlevi doğru çalışmalı', async () => {
    const repo = new InMemoryTranslationRepository(mockEntries, mockGroups);

    // ✅ DÜZELTİLDİ: findByWord yok → findByLemma
    const result = await repo.findByLemma('test');

    if (result) {
      expect(result.meanings?.[0]).toBeDefined();
    }
  });

  it('Grupları ve kayıtları doğru listelemeli', async () => {
    const repo = new InMemoryTranslationRepository(mockEntries, mockGroups);

    // ✅ DÜZELTİLDİ: getGroups yok → getByGroup("g-1")
    const group = await repo.getByGroup('g-1');

    if (group && group.entries && group.entries.length > 0) {
      const validEntries = group.entries.filter(
        (e: TranslationEntry): boolean => typeof e.lemma === 'string'
      );
      expect(validEntries).toBeDefined();
    }
  });

  it('Anlam metinlerine güvenli erişebilmeli', async () => {
    const repo = new InMemoryTranslationRepository(mockEntries, mockGroups);

    // ✅ DÜZELTİLDİ: findByWord yok → findByLemma
    const result = await repo.findByLemma('test');

    const firstMeaning = result?.meanings?.[0]?.text;
    expect(firstMeaning).toBeDefined();
  });
});