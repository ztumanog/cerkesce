'use client';

import React, { useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Search, Layers, GitBranch, Sparkles, ArrowLeft, ArrowUpDown, ChevronDown, X,
} from 'lucide-react';
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
  isBroadBucket: boolean;
  searchBlob: string;
}

interface KavramlarExplorerProps {
  groups: ConceptTranslationGroup[];
  totalLexemeCount: number;
}

type DialectTab = 'ALL' | 'BOTH' | 'ADY' | 'KBD';
type SortMode = 'RICHEST' | 'TR_ASC' | 'CIRC_ASC';
const PAGE_SIZE = 20;
const MAX_CHIPS_PER_DIALECT = 6;

const POS_TR_MAP: Record<string, string> = {
  noun: 'isim',
  verb: 'fiil',
  'transitive verb': 'geçişli fiil',
  'intransitive verb': 'geçişsiz fiil',
  adjective: 'sıfat',
  adj: 'sıfat',
  adverb: 'zarf',
  adv: 'zarf',
  pronoun: 'zamir',
  numeral: 'sayı',
  conjunction: 'bağlaç',
  interjection: 'ünlem',
  particle: 'ilgeç',
};

function formatPosTr(pos?: string): string {
  if (!pos) return '';
  const key = pos.trim().toLowerCase();
  return POS_TR_MAP[key] || key;
}

export default function KavramlarExplorer({ groups, totalLexemeCount }: KavramlarExplorerProps) {
  const [query, setQuery] = useState('');
  const [dialectTab, setDialectTab] = useState<DialectTab>('ALL');
  const [sortMode, setSortMode] = useState<SortMode>('RICHEST');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const [selectedEntry, setSelectedEntry] = useState<DictionaryEntry | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleExpandCard = useCallback((conceptId: string) => {
    setExpandedCards((prev) => ({ ...prev, [conceptId]: !prev[conceptId] }));
  }, []);

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
        if (a.isBroadBucket !== b.isBroadBucket) return Number(a.isBroadBucket) - Number(b.isBroadBucket);
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      {/* Üst Başlık Kartı */}
      <div className="mb-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-2.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 px-3 py-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                Kavram &amp; Çeviri Grupları
              </span>
              <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                {groups.length.toLocaleString('tr-TR')} Kavram • {totalLexemeCount.toLocaleString('tr-TR')} Kayıt
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Çerkesçe Kavram ve Lehçe Grupları
            </h1>
            <p className="mt-1.5 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
              Ortak anlam çekirdeğine sahip Adıgece (Batı) ve Kabardeyce (Doğu) kelimeleri yan yana karşılaştırın;
              bir kelimeye tıklayarak 35 klasik sözlükteki tüm karşılıklarını sağ panelde inceleyin.
            </p>
          </div>

          <Link
            href="/sozluk"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Ana Sözlüğe Dön
          </Link>
        </div>
      </div>

      {/* Arama ve Filtre Çubuğu */}
      <div className="mb-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <label htmlFor="kavram-search-input" className="sr-only">Kavram veya kelime ara</label>
            <input
              id="kavram-search-input"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setVisibleCount(PAGE_SIZE); }}
              placeholder="Türkçe anlam (örn. boşuna, su, kalp, dargın), Kirilce kelime veya kavram kodu ara..."
              className="h-11 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 pl-10 pr-10 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); setVisibleCount(PAGE_SIZE); }}
                aria-label="Aramayı temizle"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-200/70 dark:hover:bg-slate-700 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative flex items-center">
            <ArrowUpDown className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" aria-hidden="true" />
            <label htmlFor="kavram-sort-select" className="sr-only">Sıralama ölçütü</label>
            <select
              id="kavram-sort-select"
              value={sortMode}
              onChange={(e) => setSortMode(e.target.value as SortMode)}
              className="h-11 w-full sm:w-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 pl-10 pr-8 text-sm font-medium text-slate-700 dark:text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="RICHEST">En Zengin Lehçe Eşleşmesi</option>
              <option value="TR_ASC">Türkçe Anlam (A-Z)</option>
              <option value="CIRC_ASC">Kirilce Alfabetik (А-Ӏ)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 pt-3.5">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Lehçe kapsam filtresi">
            <button
              type="button"
              onClick={() => { setDialectTab('ALL'); setVisibleCount(PAGE_SIZE); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                dialectTab === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Tümü ({groups.length.toLocaleString('tr-TR')})
            </button>
            <button
              type="button"
              onClick={() => { setDialectTab('BOTH'); setVisibleCount(PAGE_SIZE); }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                dialectTab === 'BOTH'
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              ADY + KBD Çift Lehçeli ({bothDialectCount.toLocaleString('tr-TR')})
            </button>
            <button
              type="button"
              onClick={() => { setDialectTab('ADY'); setVisibleCount(PAGE_SIZE); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                dialectTab === 'ADY'
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Adıgece (Batı)
            </button>
            <button
              type="button"
              onClick={() => { setDialectTab('KBD'); setVisibleCount(PAGE_SIZE); }}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                dialectTab === 'KBD'
                  ? 'bg-purple-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Kabardeyce (Doğu)
            </button>
          </div>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-200">{filteredGroups.length.toLocaleString('tr-TR')}</strong> kavram grubu
          </span>
        </div>
      </div>

      {/* Kavram Kartları Izgarası */}
      {visibleGroups.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center shadow-xs">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-200">
            Aradığınız ölçüte uygun kavram grubu bulunamadı.
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Farklı bir Türkçe karşılık veya Kirilce kök ile tekrar deneyebilirsiniz.
          </p>
          <button
            type="button"
            onClick={() => { setQuery(''); setDialectTab('ALL'); }}
            className="mt-4 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {visibleGroups.map((group) => {
            const isExpanded = !!expandedCards[group.conceptId];
            const adyShown = isExpanded ? group.adyLexemes : group.adyLexemes.slice(0, MAX_CHIPS_PER_DIALECT);
            const kbdShown = isExpanded ? group.kbdLexemes : group.kbdLexemes.slice(0, MAX_CHIPS_PER_DIALECT);
            const adyHiddenCount = group.adyLexemes.length - adyShown.length;
            const kbdHiddenCount = group.kbdLexemes.length - kbdShown.length;

            return (
              <article
                key={group.conceptId}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all"
              >
                <div>
                  {/* Kart Başlığı */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold leading-snug text-slate-900 dark:text-white capitalize">
                        {group.titleTr}
                      </h2>
                      {(group.subtitleEn || group.subtitleRu) && (
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {[group.subtitleEn, group.subtitleRu].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
                      {group.hasBothDialects && (
                        <span className="rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                          ADY ↔ KBD
                        </span>
                      )}
                      <span className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {group.conceptId}
                      </span>
                    </div>
                  </div>

                  {/* Yan Yana ADY / KBD Lehçe Kutuları */}
                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {/* Batı Çerkesçesi (Adıgece) */}
                    <div className="rounded-xl border border-sky-100 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wider text-sky-700 dark:text-sky-300 uppercase">
                          Adıgece (Batı)
                        </span>
                        <span className="rounded-full bg-sky-100 dark:bg-sky-900/70 px-2 py-0.5 text-[11px] font-semibold text-sky-700 dark:text-sky-300">
                          {group.adyLexemes.length}
                        </span>
                      </div>
                      {adyShown.length === 0 ? (
                        <p className="text-xs italic text-slate-400">Kayıt bulunmuyor</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {adyShown.map((lex) => {
                            const posLabel = formatPosTr(lex.partOfSpeech);
                            return (
                              <button
                                key={lex.id}
                                type="button"
                                onClick={() => handleOpenLexeme(lex, group)}
                                className="inline-flex items-baseline gap-1.5 rounded-lg border border-sky-200 dark:border-sky-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-sm font-semibold text-sky-950 dark:text-sky-100 shadow-2xs hover:bg-sky-600 hover:text-white hover:border-sky-600 transition-colors cursor-pointer"
                              >
                                <span>{lex.form}</span>
                                {posLabel && (
                                  <span className="text-[11px] font-normal opacity-70">{posLabel}</span>
                                )}
                              </button>
                            );
                          })}
                          {adyHiddenCount > 0 && (
                            <button
                              type="button"
                              onClick={() => toggleExpandCard(group.conceptId)}
                              className="rounded-lg border border-dashed border-sky-300 dark:border-sky-700 px-2.5 py-1 text-xs font-medium text-sky-700 dark:text-sky-300 hover:bg-sky-100/70 dark:hover:bg-sky-900/40"
                            >
                              +{adyHiddenCount} daha
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Doğu Çerkesçesi (Kabardeyce) */}
                    <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[11px] font-bold tracking-wider text-indigo-700 dark:text-indigo-300 uppercase">
                          Kabardeyce (Doğu)
                        </span>
                        <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/70 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                          {group.kbdLexemes.length}
                        </span>
                      </div>
                      {kbdShown.length === 0 ? (
                        <p className="text-xs italic text-slate-400">Kayıt bulunmuyor</p>
                      ) : (
                        <div className="flex flex-wrap gap-1.5">
                          {kbdShown.map((lex) => {
                            const posLabel = formatPosTr(lex.partOfSpeech);
                            return (
                              <button
                                key={lex.id}
                                type="button"
                                onClick={() => handleOpenLexeme(lex, group)}
                                className="inline-flex items-baseline gap-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900 px-2.5 py-1 text-sm font-semibold text-indigo-950 dark:text-indigo-100 shadow-2xs hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-colors cursor-pointer"
                              >
                                <span>{lex.form}</span>
                                {posLabel && (
                                  <span className="text-[11px] font-normal opacity-70">{posLabel}</span>
                                )}
                              </button>
                            );
                          })}
                          {kbdHiddenCount > 0 && (
                            <button
                              type="button"
                              onClick={() => toggleExpandCard(group.conceptId)}
                              className="rounded-lg border border-dashed border-indigo-300 dark:border-indigo-700 px-2.5 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/40"
                            >
                              +{kbdHiddenCount} daha
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ortak Biçimler */}
                  {group.commonLexemes.length > 0 && (
                    <div className="mt-2.5 rounded-xl border border-amber-100 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/15 px-3 py-2">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="mr-1 text-[11px] font-bold uppercase text-amber-700 dark:text-amber-300">
                          Ortak:
                        </span>
                        {group.commonLexemes.slice(0, MAX_CHIPS_PER_DIALECT).map((lex) => (
                          <button
                            key={lex.id}
                            type="button"
                            onClick={() => handleOpenLexeme(lex, group)}
                            className="rounded-lg border border-amber-200 dark:border-amber-800 bg-white dark:bg-slate-900 px-2.5 py-0.5 text-sm font-semibold text-amber-900 dark:text-amber-200 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer"
                          >
                            {lex.form}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Kart Alt Çubuğu */}
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Toplam {group.totalCount} kayıt</span>
                    {isExpanded && (group.adyLexemes.length > MAX_CHIPS_PER_DIALECT || group.kbdLexemes.length > MAX_CHIPS_PER_DIALECT) && (
                      <button
                        type="button"
                        onClick={() => toggleExpandCard(group.conceptId)}
                        className="font-medium text-slate-600 dark:text-slate-300 hover:underline"
                      >
                        Daralt
                      </button>
                    )}
                  </div>
                  <Link
                    href={`/kavram/${encodeURIComponent(group.conceptId)}`}
                    className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 hover:underline"
                  >
                    <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
                    Kavram Grafiği →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Daha Fazla Göster */}
      {visibleCount < filteredGroups.length && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronDown className="h-4 w-4" aria-hidden="true" />
            Daha Fazla Göster ({(filteredGroups.length - visibleCount).toLocaleString('tr-TR')} kavram kaldı)
          </button>
        </div>
      )}

      {/* Sağ Detay Çekmecesi */}
      <KelimeDetayDrawer
        seciliKelime={selectedEntry}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onConceptClick={(word) => { setQuery(word.trim()); setVisibleCount(PAGE_SIZE); setDrawerOpen(false); }}
      />
    </div>
  );
}
