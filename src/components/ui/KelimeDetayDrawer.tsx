'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  BookOpen,
  Check,
  Copy,
  Share2,
  X,
  Volume2,
  ChevronRight,
  Languages,
  Filter,
} from 'lucide-react';
import type {
  DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import type {
  LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';
import { normalizeLanguage } from '@/lib/normalizers/languageNormalizer';
import type {
  DictionaryEntry,
  SourceContent,
  SourceSection,
} from '@/types/dictionary';
import { normalizeDrawerContent } from '@/lib/normalizers/drawerContent';
import { normalizeToSourceContents } from '@/lib/normalizers/sourceContentNormalizer';

import dictionariesData from '@/data/dictionaries.json';

interface DictionaryMeta {
  file: string;
  title: string;
  displayName: string;
  dialect: string;
  author?: string;
  year?: string;
  sourceLanguage: string;
  targetLanguage: string;
  total_words?: number;
  shortLabel?: string;
  shortLabelKiril?: string;
}

interface KelimeDetayDrawerProps {
  seciliKelime: DictionaryEntry | null;
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  metinBoyutu?: number;
  dialectFilter?: DialectFilterValue;
  languageFilter?: LanguageFilterValue;
}

function getDictMeta(source: SourceContent): DictionaryMeta | undefined {
  const list = dictionariesData as DictionaryMeta[];

  const cleanSourceId = String(source.sourceId || '').replace(/-\d+$/, '');

  return list.find(
    (d) =>
      d.file === cleanSourceId ||
      d.file === source.sourceId ||
      d.file === (source as any).file ||
      d.displayName === source.sourceName ||
      d.title === source.title ||
      d.title === source.sourceName ||
      d.displayName === source.title
  );
}

function matchesDialect(source: SourceContent, target: DialectFilterValue): boolean {
  if (target === 'ALL') return true;

  const meta = getDictMeta(source);

  if (meta) {
    const metaDialect = meta.dialect?.toUpperCase();
    const srcLang = meta.sourceLanguage?.toLowerCase();

    if (target === 'KBD') {
      return metaDialect === 'DOGU' || metaDialect === 'KBD' || srcLang === 'kbd';
    }
    if (target === 'ADY') {
      return metaDialect === 'BATI' || metaDialect === 'ADY' || srcLang === 'ady';
    }
  }

  if (source.dialect) {
    const d = source.dialect.toUpperCase();
    if (target === 'KBD' && (d.includes('DOGU') || d.includes('KBD'))) return true;
    if (target === 'ADY' && (d.includes('BATI') || d.includes('ADY'))) return true;
  }

  return false;
}

function matchesLanguage(source: SourceContent, target: LanguageFilterValue): boolean {
  if (target === 'ALL') return true;

  const meta = getDictMeta(source);
  if (!meta) return false;

  const src = String(meta.sourceLanguage || '').toLowerCase();
  const tgt = String(meta.targetLanguage || '').toLowerCase();
  const isCirc = (l: string) => l === 'ady' || l === 'kbd';

  if (target === 'MULTI') {
    return meta.file === '18.Kbd-Ru&En.json';
  }
  if (target === 'CIRC') {
    return isCirc(src) && isCirc(tgt);
  }

  const other = !isCirc(src) ? src : tgt;
  return other === target.toLowerCase();
}

function SectionRenderer({
  section,
  depth = 0,
}: {
  section: SourceSection;
  depth?: number;
}) {
  const indent = depth * 12;

  if (section.type === 'roman') {
    return (
      <div style={{ marginLeft: indent }} className="mt-3">
        <div className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 pb-1">
          {section.label}
        </div>
        {section.children?.map((c, i) => (
          <SectionRenderer key={i} section={c} depth={depth + 1} />
        ))}
      </div>
    );
  }

  if (section.type === 'arabic') {
    return (
      <div style={{ marginLeft: indent }} className="mt-1.5">
        <div className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <span className="text-orange-600 dark:text-orange-400 mr-1">
            {section.label}
          </span>
          {section.text}
        </div>
        {section.children?.map((c, i) => (
          <SectionRenderer key={i} section={c} depth={depth + 1} />
        ))}
      </div>
    );
  }

  if (section.type === 'example') {
    return (
      <p
        style={{ marginLeft: indent }}
        className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-400 mt-1"
      >
        <span className="text-amber-500 mr-1">◊</span>
        {section.text}
      </p>
    );
  }

  return (
    <p
      style={{ marginLeft: indent }}
      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1"
    >
      {section.text}
    </p>
  );
}

export default function KelimeDetayDrawer({
  seciliKelime,
  isOpen,
  open,
  onClose,
  metinBoyutu = 16,
  dialectFilter = 'ALL',
  languageFilter = 'ALL',
}: KelimeDetayDrawerProps) {
  const isDrawerOpen = open ?? isOpen ?? false;

  const drawerRef = useRef<HTMLDivElement>(null);
  const kapatBtnRef = useRef<HTMLButtonElement>(null);

  const [kopyalandi, setKopyalandi] = useState<boolean>(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(false);

  const [sozlukFilter, setSozlukFilter] = useState<string>('ALL');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSpeechSupport(true);
    }
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      setSozlukFilter('ALL');
    }
  }, [isDrawerOpen, seciliKelime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => kapatBtnRef.current?.focus(), 50);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isDrawerOpen, onClose]);

  const content = useMemo(() => {
    return seciliKelime ? normalizeDrawerContent(seciliKelime) : null;
  }, [seciliKelime]);

  const sourceContents = useMemo(() => {
    return seciliKelime ? normalizeToSourceContents(seciliKelime) : [];
  }, [seciliKelime]);

  const filtrelenmisKaynaklar = useMemo(() => {
    return sourceContents.filter((source) => {
      if (!matchesDialect(source, dialectFilter)) return false;
      if (!matchesLanguage(source, languageFilter)) return false;

      if (sozlukFilter !== 'ALL') {
        const meta = getDictMeta(source);
        const name = meta?.displayName || source.sourceName || source.title || '';
        if (name !== sozlukFilter) return false;
      }

      return true;
    });
  }, [sourceContents, dialectFilter, languageFilter, sozlukFilter]);

  // Sözlük seçenekleri (dile göre gruplu)
  const sozlukGroups = useMemo(() => {
    const groups: Record<string, string[]> = {
      'ÇERKESÇE': [],
      'TÜRKÇE': [],
      'İNGİLİZCE': [],
      'RUSÇA': [],
      'ARAPÇA': [],
      'ÇOK DİLLİ (Ru-En)': [],
    };

    const seen = new Set<string>();

    sourceContents.forEach((source) => {
      const meta = getDictMeta(source);
      const name = meta?.displayName || source.sourceName || source.title;
      if (!name || seen.has(name)) return;
      seen.add(name);

      const src = String(meta?.sourceLanguage || '').toLowerCase();
      const tgt = String(meta?.targetLanguage || '').toLowerCase();
      const isCirc = (l: string) => l === 'ady' || l === 'kbd';

      let group = '';
      if (meta?.file === '18.Kbd-Ru&En.json') group = 'ÇOK DİLLİ (Ru-En)';
      else if (isCirc(src) && isCirc(tgt)) group = 'ÇERKESÇE';
      else {
        const other = !isCirc(src) ? src : tgt;
        if (other === 'tr') group = 'TÜRKÇE';
        else if (other === 'en') group = 'İNGİLİZCE';
        else if (other === 'ru') group = 'RUSÇA';
        else if (other === 'ar') group = 'ARAPÇA';
      }

      if (group) groups[group].push(name);
    });

    const SIRA = ['ÇERKESÇE', 'TÜRKÇE', 'İNGİLİZCE', 'RUSÇA', 'ARAPÇA', 'ÇOK DİLLİ (Ru-En)'];

    return SIRA
      .filter((g) => groups[g].length > 0)
      .map((g) => ({
        group: g,
        items: groups[g].sort((a, b) => a.localeCompare(b, 'tr')),
      }));
  }, [sourceContents]);

  // Sözlük sayıları
  const sozlukCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: sourceContents.length };
    sourceContents.forEach((source) => {
      const meta = getDictMeta(source);
      const name = meta?.displayName || source.sourceName || source.title;
      if (name) {
        counts[name] = (counts[name] ?? 0) + 1;
      }
    });
    return counts;
  }, [sourceContents]);

  const paylasimMetni = useMemo(() => {
    if (!content) return '';
    return [
      `Kelime: ${content.word}`,
      content.cerkesce ? `Çerkesçe: ${content.cerkesce}` : '',
      `Sözlük Kaynak Sayısı: ${filtrelenmisKaynaklar.length}`,
      ...filtrelenmisKaynaklar.map((s) => {
        const meta = getDictMeta(s);
        const name = meta?.displayName || s.sourceName || s.title || 'Kaynak';
        return `• ${name}: ${(s.meanings ?? []).join(', ')}`;
      }),
    ].filter(Boolean).join('\n');
  }, [content, filtrelenmisKaynaklar]);

  const panoyaKopyala = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(paylasimMetni);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1800);
    } catch (error) {
      console.error('Kopyalama hatası:', error);
    }
  }, [paylasimMetni]);

  const paylas = useCallback(async () => {
    if (navigator.share && content) {
      try {
        await navigator.share({ title: content.word, text: paylasimMetni });
        return;
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
      }
    }
    await panoyaKopyala();
  }, [content, paylasimMetni, panoyaKopyala]);

  const dinle = useCallback(() => {
    if (hasSpeechSupport && content) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(content.word);
      utterance.lang = 'tr-TR';
      window.speechSynthesis.speak(utterance);
    }
  }, [hasSpeechSupport, content]);

  if (!isDrawerOpen || !seciliKelime || !content) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-[9999] flex justify-end transition-opacity duration-300"
    >
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer active:opacity-80"
      />

      <div
        ref={drawerRef}
        style={{ fontSize: `${metinBoyutu}px` }}
        className="relative z-10 w-full max-w-[540px] h-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col border-l border-slate-300 dark:border-slate-800 overscroll-contain touch-pan-y"
      >
        <div className="flex items-center justify-between p-4 sm:p-6 pb-4 border-b border-slate-300 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <h2 id="drawer-title" className="text-xl sm:text-2xl font-bold text-orange-500 truncate">
              {content.word}
            </h2>
            {content.dialect && (
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md border bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 shrink-0">
                {content.dialect}
              </span>
            )}
          </div>
          <button
            ref={kapatBtnRef}
            onClick={onClose}
            aria-label="Kapat"
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 pb-28 space-y-5 scroll-smooth -webkit-overflow-scrolling-touch">
          {content.cerkesce && (
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 dark:border-amber-900/40 dark:bg-amber-950/20">
              <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block mb-0.5">
                Çerkesçe Karşılık
              </span>
              <p className="text-base font-bold text-amber-950 dark:text-amber-100">
                {content.cerkesce}
              </p>
            </div>
          )}

          <section className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-800 pb-2">
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <BookOpen size={16} className="text-orange-500" />
                Sözlük Kaynakları ({filtrelenmisKaynaklar.length} / {sourceContents.length})
              </h3>
            </div>

            {sourceContents.length > 1 && sozlukGroups.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 border-b border-slate-100 dark:border-slate-800 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Filter size={14} className="text-orange-500" /> Kaynak Filtreleri
                  </span>
                  {sozlukFilter !== 'ALL' && (
                    <button
                      onClick={() => setSozlukFilter('ALL')}
                      className="text-orange-500 hover:underline text-[11px]"
                    >
                      Sıfırla
                    </button>
                  )}
                </div>

                <div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1">Sözlük Seçimi</span>
                  <select
                    value={sozlukFilter}
                    onChange={(e) => setSozlukFilter(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                  >
                    <option value="ALL">Tüm Sözlükler ({sourceContents.length})</option>
                    {sozlukGroups.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.items.map((displayName) => (
                          <option key={displayName} value={displayName}>
                            {displayName} ({sozlukCounts[displayName] ?? 0})
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-1">
              {filtrelenmisKaynaklar.map((source: SourceContent, index: number) => {
                const meta = getDictMeta(source);
                const displayTitle = meta?.displayName || source.sourceName || source.title || 'Kaynak';

                const srcLang = meta?.sourceLanguage?.toUpperCase() || source.sourceLanguage?.toUpperCase();
                const trgLang = meta?.targetLanguage?.toUpperCase() || source.targetLanguage?.toUpperCase();
                const langBadge = srcLang && trgLang ? `${srcLang} → ${trgLang}` : null;

                return (
                  <div
                    key={`${source.sourceId || 'src'}-${index}`}
                    className="overflow-hidden rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-800/50 shadow-sm transition-all"
                  >
                    <details className="group" open={index === 0}>
                      <summary className="flex cursor-pointer list-none items-center justify-between p-3.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                            {displayTitle}
                          </span>
                          {meta?.author && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal truncate">
                              Yazar: {meta.author} {meta.year ? `(${meta.year})` : ''}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {langBadge && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800/50 flex items-center gap-1">
                              <Languages size={10} />
                              {langBadge}
                            </span>
                          )}
                          <ChevronRight
                            size={16}
                            className="text-slate-400 transition-transform duration-200 group-open:rotate-90 shrink-0"
                          />
                        </div>
                      </summary>

                      <div className="border-t border-slate-200 dark:border-slate-700/60 p-3.5 space-y-3 bg-slate-50/50 dark:bg-slate-900/30">
                        {source.sections && source.sections.length > 0 && (
                          <div className="space-y-1">
                            {source.sections.map((section, sIdx) => (
                              <SectionRenderer key={sIdx} section={section} depth={0} />
                            ))}
                          </div>
                        )}

                        {source.notes && (
                          <div className="text-xs text-slate-600 dark:text-slate-400 bg-amber-50/50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-amber-200/60 dark:border-slate-700">
                            <span className="font-semibold block text-amber-800 dark:text-amber-300">
                              Not:
                            </span>
                            {source.notes}
                          </div>
                        )}
                      </div>
                    </details>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 flex gap-2 border-t border-slate-300 bg-white/95 p-3.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <button
            type="button"
            onClick={panoyaKopyala}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 text-xs sm:text-sm font-semibold text-slate-700 transition-colors active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {kopyalandi ? <Check size={16} /> : <Copy size={16} />}
            {kopyalandi ? 'Kopyalandı' : 'Kopyala'}
          </button>

          <button
            type="button"
            onClick={dinle}
            disabled={!hasSpeechSupport}
            className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 text-xs sm:text-sm font-semibold transition-colors active:scale-95 dark:border-slate-700 dark:bg-slate-800 ${hasSpeechSupport
              ? 'text-slate-700 dark:text-slate-200'
              : 'text-slate-400 opacity-50 cursor-not-allowed'
              }`}
          >
            <Volume2 size={16} />
            Dinle
          </button>

          <button
            type="button"
            onClick={paylas}
            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 text-xs sm:text-sm font-semibold text-white transition-colors active:scale-95 hover:bg-orange-600"
          >
            <Share2 size={16} />
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}