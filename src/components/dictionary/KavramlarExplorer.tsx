'use client';

import React, { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, Layers, GitBranch, Sparkles, BookOpen, Filter, ArrowUpDown, ChevronDown,
} from 'lucide-react';
import {
  Box, Flex, Grid, Card, Heading, Text, Badge, Button, TextField, Separator,
} from '@radix-ui/themes';
import KelimeDetayDrawer from '@/components/dictionary/KelimeDetayDrawer';
import type { DictionaryEntry } from '@/types/dictionary';

export interface ConceptMemberLexeme {
  id: string;
  form: string;
  dialect: 'ADY' | 'KBD' | 'COMMON';
  partOfSpeech: string;
  ipa?: string;
  wordFamilyId?: string;
  rootIds?: string[];
  translations: { tr: string[]; en: string[]; ru: string[]; ar: string[] };
  dialectVariants?: { adyghe?: string; kabardian?: string };
}

export interface ConceptTranslationGroup {
  conceptId: string;
  titleTr: string;
  subtitleEn: string;
  subtitleRu: string;
  adyLexemes: ConceptMemberLexeme[];
  kbdLexemes: ConceptMemberLexeme[];
  commonLexemes: ConceptMemberLexeme[];
  totalCount: number;
  hasBothDialects: boolean;
  searchBlob: string;
}

interface KavramlarExplorerProps {
  groups: ConceptTranslationGroup[];
  totalLexemeCount: number;
}

type DialectTab = 'ALL' | 'BOTH' | 'ADY' | 'KBD';
type SortMode = 'RICHEST' | 'TR_ASC' | 'CIRC_ASC';
const PAGE_SIZE = 24;

export default function KavramlarExplorer({ groups, totalLexemeCount }: KavramlarExplorerProps) {
  const [query, setQuery] = useState('');
  const [dialectTab, setDialectTab] = useState<DialectTab>('ALL');
  const [sortMode, setSortMode] = useState<SortMode>('RICHEST');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = groups.filter((g) => {
      if (dialectTab === 'BOTH' && !g.hasBothDialects) return false;
      if (dialectTab === 'ADY' && g.adyLexemes.length === 0 && g.commonLexemes.length === 0) return false;
      if (dialectTab === 'KBD' && g.kbdLexemes.length === 0 && g.commonLexemes.length === 0) return false;
      if (!q) return true;
      return g.searchBlob.includes(q);
    });

    return [...filtered].sort((a, b) => {
      if (sortMode === 'RICHEST') {
        if (b.hasBothDialects !== a.hasBothDialects) return Number(b.hasBothDialects) - Number(a.hasBothDialects);
        if (b.totalCount !== a.totalCount) return b.totalCount - a.totalCount;
        return a.titleTr.localeCompare(b.titleTr, 'tr');
      }
      if (sortMode === 'TR_ASC') return a.titleTr.localeCompare(b.titleTr, 'tr');
      const aFirst = a.adyLexemes[0]?.form || a.kbdLexemes[0]?.form || a.commonLexemes[0]?.form || '';
      const bFirst = b.adyLexemes[0]?.form || b.kbdLexemes[0]?.form || b.commonLexemes[0]?.form || '';
      return aFirst.localeCompare(bFirst, 'ru');
    });
  }, [groups, query, dialectTab, sortMode]);

  const visibleGroups = useMemo(() => filteredGroups.slice(0, visibleCount), [filteredGroups, visibleCount]);

  const buildFallbackEntry = useCallback((lex: ConceptMemberLexeme, group: ConceptTranslationGroup): DictionaryEntry => {
    const trText = lex.translations.tr.join(', ') || group.titleTr;
    const enText = lex.translations.en.join(', ') || group.subtitleEn;
    const ruText = lex.translations.ru.join(', ') || group.subtitleRu;
    return {
      id: lex.id,
      word: lex.form,
      spelling: lex.form,
      kelime: lex.form,
      dialect: lex.dialect,
      partOfSpeech: lex.partOfSpeech,
      ipa: lex.ipa,
      wordFamilyId: lex.wordFamilyId,
      rootIds: lex.rootIds,
      conceptId: group.conceptId,
      dialectVariants: lex.dialectVariants,
      translations: lex.translations,
      definitions: [
        ...(trText ? [{ lang: 'tr', meaning: trText, tanim: trText, source: 'Kavram Veritabanı' }] : []),
        ...(enText ? [{ lang: 'en', meaning: enText, tanim: enText, source: 'Kavram Veritabanı' }] : []),
        ...(ruText ? [{ lang: 'ru', meaning: ruText, tanim: ruText, source: 'Kavram Veritabanı' }] : []),
      ],
    } as unknown as DictionaryEntry;
  }, []);

  const handleOpenLexeme = useCallback(async (lex: ConceptMemberLexeme, group: ConceptTranslationGroup) => {
    const fallback = buildFallbackEntry(lex, group);
    setSelectedEntry(fallback);
    setDrawerOpen(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(lex.form)}&limit=5`);
      if (!res.ok) return;
      const data = await res.json();
      const items: DictionaryEntry[] = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
      const exact = items.find((it) => String(it.word || it.spelling || it.kelime || '').trim() === lex.form) || items[0];
      if (exact) {
        setSelectedEntry({
          ...fallback,
          ...exact,
          dialectVariants: exact.dialectVariants || fallback.dialectVariants,
          conceptId: group.conceptId,
        } as DictionaryEntry);
      }
    } catch {}
  }, [buildFallbackEntry]);

  const bothDialectCount = useMemo(() => groups.filter((g) => g.hasBothDialects).length, [groups]);

  return (
    <Box className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Flex direction={{ initial: 'column', md: 'row' }} justify="between" align={{ initial: 'start', md: 'end' }} gap="4" mb="6">
        <Box>
          <Flex align="center" gap="2" mb="2">
            <Badge color="amber" variant="soft" size="2">
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              Kavram &amp; Çeviri Grupları
            </Badge>
            <Badge color="indigo" variant="outline" size="2">
              {groups.length.toLocaleString('tr-TR')} Kavram
            </Badge>
          </Flex>
          <Heading as="h1" size="7" weight="bold" mb="2">Çerkesçe Kavram ve Lehçe Grupları</Heading>
          <Text as="p" size="3" color="gray" className="max-w-2xl">
            {totalLexemeCount.toLocaleString('tr-TR')} sözlük kaydı ortak anlam çekirdekleri altında gruplanmıştır.
            Adıgece ve Kabardeyce karşılıkları yan yana inceleyip 35 sözlükteki detayları açabilirsiniz.
          </Text>
        </Box>
        <Button asChild variant="soft" color="gray" size="2">
          <Link href="/sozluk">
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            Ana Sözlüğe Dön
          </Link>
        </Button>
      </Flex>

      <Card size="3" mb="6">
        <Flex direction="column" gap="4">
          <Flex direction={{ initial: 'column', sm: 'row' }} gap="3" align="stretch">
            <Box className="flex-1">
              <label htmlFor="kavram-search-input" className="sr-only">Kavram veya kelime ara</label>
              <TextField.Root
                id="kavram-search-input"
                size="3"
                placeholder="Türkçe anlam (örn. boşuna, su, kalp), Kirilce kelime veya ConceptId ara..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
              >
                <TextField.Slot><Search className="h-4 w-4 text-gray-400" aria-hidden="true" /></TextField.Slot>
                {query && (
                  <TextField.Slot>
                    <Button type="button" variant="ghost" size="1" onClick={() => { setQuery(''); setVisibleCount(PAGE_SIZE); }}>
                      Temizle
                    </Button>
                  </TextField.Slot>
                )}
              </TextField.Root>
            </Box>
            <Flex align="center" gap="2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
              <label htmlFor="kavram-sort-select" className="sr-only">Sıralama ölçütü</label>
              <select
                id="kavram-sort-select"
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as SortMode)}
                className="h-10 rounded-md border border-gray-700 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="RICHEST">Sırala: En Zengin Lehçe Eşleşmesi</option>
                <option value="TR_ASC">Sırala: Türkçe Anlam (A-Z)</option>
                <option value="CIRC_ASC">Sırala: Kirilce (А-Ӏ)</option>
              </select>
            </Flex>
          </Flex>

          <Flex justify="between" align="center" wrap="wrap" gap="3">
            <Flex align="center" gap="2" wrap="wrap" role="group" aria-label="Lehçe kapsam filtresi">
              <Filter className="h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
              <Button type="button" size="1" variant={dialectTab === 'ALL' ? 'solid' : 'soft'} color={dialectTab === 'ALL' ? 'amber' : 'gray'} onClick={() => { setDialectTab('ALL'); setVisibleCount(PAGE_SIZE); }}>
                Tümü ({groups.length.toLocaleString('tr-TR')})
              </Button>
              <Button type="button" size="1" variant={dialectTab === 'BOTH' ? 'solid' : 'soft'} color={dialectTab === 'BOTH' ? 'green' : 'gray'} onClick={() => { setDialectTab('BOTH'); setVisibleCount(PAGE_SIZE); }}>
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                ADY + KBD ({bothDialectCount.toLocaleString('tr-TR')})
              </Button>
              <Button type="button" size="1" variant={dialectTab === 'ADY' ? 'solid' : 'soft'} color={dialectTab === 'ADY' ? 'blue' : 'gray'} onClick={() => { setDialectTab('ADY'); setVisibleCount(PAGE_SIZE); }}>
                Adıgece (Batı)
              </Button>
              <Button type="button" size="1" variant={dialectTab === 'KBD' ? 'solid' : 'soft'} color={dialectTab === 'KBD' ? 'purple' : 'gray'} onClick={() => { setDialectTab('KBD'); setVisibleCount(PAGE_SIZE); }}>
                Kabardeyce (Doğu)
              </Button>
            </Flex>
            <Text size="2" color="gray"><strong>{filteredGroups.length.toLocaleString('tr-TR')}</strong> kavram grubu</Text>
          </Flex>
        </Flex>
      </Card>

      {visibleGroups.length === 0 ? (
        <Card size="3">
          <Flex direction="column" align="center" justify="center" py="8" gap="3">
            <Text size="4" weight="medium">Aradığınız ölçüte uygun kavram grubu bulunamadı.</Text>
            <Button type="button" variant="soft" color="amber" onClick={() => { setQuery(''); setDialectTab('ALL'); }}>Filtreleri Sıfırla</Button>
          </Flex>
        </Card>
      ) : (
        <Grid columns={{ initial: '1', md: '2' }} gap="4">
          {visibleGroups.map((group) => (
            <Card key={group.conceptId} size="2" className="flex flex-col justify-between">
              <Box>
                <Flex justify="between" align="start" gap="3" mb="2">
                  <Box className="min-w-0 flex-1">
                    <Heading as="h2" size="4" weight="bold" className="capitalize">{group.titleTr}</Heading>
                    {(group.subtitleEn || group.subtitleRu) && (
                      <Text as="p" size="2" color="gray" mt="1">{[group.subtitleEn, group.subtitleRu].filter(Boolean).join(' • ')}</Text>
                    )}
                  </Box>
                  <Flex align="center" gap="2" className="shrink-0">
                    {group.hasBothDialects && <Badge color="green" variant="soft" size="1">ADY ↔ KBD</Badge>}
                    <Badge color="gray" variant="outline" size="1">{group.conceptId}</Badge>
                  </Flex>
                </Flex>

                <Separator size="4" my="3" />

                <Grid columns={{ initial: '1', sm: '2' }} gap="3">
                  <Box>
                    <Text as="div" size="1" weight="bold" color="blue" mb="2">ADIGECE (BATI) · {group.adyLexemes.length}</Text>
                    {group.adyLexemes.length === 0 ? <Text size="1" color="gray">—</Text> : (
                      <Flex gap="2" wrap="wrap">
                        {group.adyLexemes.map((lex) => (
                          <Button key={lex.id} type="button" size="2" variant="soft" color="blue" onClick={() => handleOpenLexeme(lex, group)}>
                            <span className="font-semibold">{lex.form}</span>
                            {lex.partOfSpeech && <span className="text-xs opacity-75">({lex.partOfSpeech})</span>}
                          </Button>
                        ))}
                      </Flex>
                    )}
                  </Box>

                  <Box>
                    <Text as="div" size="1" weight="bold" color="purple" mb="2">KABARDEYCE (DOĞU) · {group.kbdLexemes.length}</Text>
                    {group.kbdLexemes.length === 0 ? <Text size="1" color="gray">—</Text> : (
                      <Flex gap="2" wrap="wrap">
                        {group.kbdLexemes.map((lex) => (
                          <Button key={lex.id} type="button" size="2" variant="soft" color="purple" onClick={() => handleOpenLexeme(lex, group)}>
                            <span className="font-semibold">{lex.form}</span>
                            {lex.partOfSpeech && <span className="text-xs opacity-75">({lex.partOfSpeech})</span>}
                          </Button>
                        ))}
                      </Flex>
                    )}
                  </Box>
                </Grid>

                {group.commonLexemes.length > 0 && (
                  <Box mt="3">
                    <Text as="div" size="1" weight="bold" color="amber" mb="1">ORTAK BİÇİM · {group.commonLexemes.length}</Text>
                    <Flex gap="2" wrap="wrap">
                      {group.commonLexemes.map((lex) => (
                        <Button key={lex.id} type="button" size="2" variant="soft" color="amber" onClick={() => handleOpenLexeme(lex, group)}>
                          <span className="font-semibold">{lex.form}</span>
                        </Button>
                      ))}
                    </Flex>
                  </Box>
                )}
              </Box>

              <Box mt="4" pt="2">
                <Separator size="4" mb="2" />
                <Flex justify="between" align="center">
                  <Text size="1" color="gray">Toplam {group.totalCount} kayıt</Text>
                  <Button asChild variant="ghost" size="1" color="amber">
                    <Link href={`/kavram/${encodeURIComponent(group.conceptId)}`}>
                      <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                      Kavram Grafiği
                    </Link>
                  </Button>
                </Flex>
              </Box>
            </Card>
          ))}
        </Grid>
      )}

      {visibleCount < filteredGroups.length && (
        <Flex justify="center" mt="6">
          <Button type="button" size="3" variant="soft" color="amber" onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}>
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
            Daha Fazla Göster ({(filteredGroups.length - visibleCount).toLocaleString('tr-TR')} kavram kaldı)
          </Button>
        </Flex>
      )}

      <KelimeDetayDrawer
        seciliKelime={selectedEntry}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onConceptClick={(word) => { setQuery(word.trim()); setVisibleCount(PAGE_SIZE); setDrawerOpen(false); }}
      />
    </Box>
  );
}
