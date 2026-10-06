'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  BookOpen, Check, Copy, Share2, X, Volume2, ChevronRight, ChevronDown,
  Languages, Zap, Users, Globe, Star, Info, Quote, Sparkles,
} from 'lucide-react';
import type { DialectFilterValue } from '@/components/dictionary/DialectFilter';
import type { LanguageFilterValue } from '@/components/dictionary/LanguageFilter';
import type { DictionaryEntry, SourceContent, SourceSection } from '@/types/dictionary';
import { normalizeDrawerContent } from '@/lib/normalizers/drawerContent';
import PaylasimGorseliModal from '@/components/dictionary/PaylasimGorseliModal';
import { normalizeToSourceContents } from '@/lib/normalizers/sourceContentNormalizer';
import { resolveSourceMetadata } from '@/lib/normalizers/sourceMetadataResolver';
import { CorpusExplorerService } from '@/domain/discovery/services/CorpusExplorerService';
import { CorpusExplorerResult } from '@/domain/discovery/dto/CorpusExplorerDTO';

/* ═══════════════════ SABİTLER ═══════════════════ */

const FEATURED_PRIORITY = ['yamışa', 'yamisha', 'yamısha', 'şıgaje', 'abaze', 'aşemez', 'huvaj'];

const FEATURED_BY_LANG: Record<string, string[]> = {
  tr: ['huvaj', 'yamisha'],
  en: ['yamisha', 'shagash', 'gish'],
  ar: ['lash', 'yamisha'],
  ady: ['aig', 'apaşev'],
  kbd: ['yamisha', 'kardanov'],
  ru: ['Tharkaho', 'kokov', 'yamisha', 'kardanov'],

};

const FEATURED_LANG_ORDER = ['tr', 'ru', 'en', 'ar', 'ady', 'kbd'];   

/* ═══════════════════ YARDIMCILAR ═══════════════════ */

function cleanHtml(html: string): string {
  if (!html) return '';

  let text = String(html);

  // 1. ÖNCE encoded HTML entity'lerini sil (&lt;...&gt;)
  text = text.replace(/&lt;.*?&gt;/gi, ' ');

  // 2. Sonra normal HTML tag'lerini sil
  text = text.replace(/<[^>]+>/g, ' ');

  // 3. Entity'leri çöz
  text = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // 4. Fazla boşlukları temizle
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

interface KelimeDetayDrawerProps {
  seciliKelime: DictionaryEntry | null;
  isOpen?: boolean;
  open?: boolean;
  onClose: () => void;
  metinBoyutu?: number;
  dialectFilter?: DialectFilterValue;
  languageFilter?: LanguageFilterValue;
  onConceptClick?: (word: string) => void;
}

function metaOf(source: SourceContent) {
  return resolveSourceMetadata(source.sourceId || source.sourceName || '');
}

function srcLangOf(source: SourceContent): string {
  return String(metaOf(source)?.sourceLanguage || source.sourceLanguage || '').toLowerCase();
}

function trgLangOf(source: SourceContent): string {
  return String(metaOf(source)?.targetLanguage || source.targetLanguage || '').toLowerCase();
}

function displayNameOf(source: SourceContent): string {
  const meta = metaOf(source);
  return meta?.shortLabel || meta?.author || meta?.displayName || source.sourceName || source.title || 'Kaynak';
}

function authorOf(source: SourceContent): string {
  return metaOf(source)?.author || source.author || '';
}

function yearOf(source: SourceContent): string {
  return String(metaOf(source)?.year || source.year || '');
}

function meaningCountOf(source: SourceContent): number {
  const direct = (source.meanings ?? []).length;
  if (direct) return direct;
  let n = 0;
  const walk = (secs?: SourceSection[]) => {
    secs?.forEach((sec) => {
      if (sec.type === 'arabic' || sec.type === 'plain' || !sec.type) n += 1;
      walk(sec.children);
    });
  };
  walk(source.sections);
  return n;
}

function pickFeatured(sources: SourceContent[]): SourceContent | null {
  if (!sources.length) return null;

  for (const lang of FEATURED_LANG_ORDER) {
    const langSources = sources.filter(
      (s) => trgLangOf(s) === lang || srcLangOf(s) === lang
    );
    if (!langSources.length) continue;

    const priorities = FEATURED_BY_LANG[lang] || [];
    for (const p of priorities) {
      const found = langSources.find((s) => {
        const haystack = (displayNameOf(s) + ' ' + authorOf(s)).toLowerCase();
        return haystack.includes(p);
      });
      if (found) return found;
    }

    return [...langSources].sort((a, b) => meaningCountOf(a) - meaningCountOf(b))[0] ?? null;
  }

  for (const p of FEATURED_PRIORITY) {
    const found = sources.find((s) => {
      const haystack = (displayNameOf(s) + ' ' + authorOf(s)).toLowerCase();
      return haystack.includes(p);
    });
    if (found) return found;
  }

  return [...sources].sort((a, b) => meaningCountOf(a) - meaningCountOf(b))[0] ?? null;
}

function extractMeanings(source: SourceContent, limit = 3): string[] {
  const direct = (source.meanings ?? []).map(cleanHtml).filter(Boolean);
  if (direct.length) {
    const expanded: string[] = [];
    for (const m of direct) {
      if (expanded.length >= limit) break;
      if (m.length > 150) {
        const parts = m.split(/[.;·]\s+/).filter(Boolean);
        for (const p of parts) {
          if (expanded.length >= limit) break;
          expanded.push(p.length > 150 ? p.slice(0, 150) + '...' : p);
        }
      } else {
        expanded.push(m);
      }
    }
    return expanded.slice(0, limit);
  }
  const out: string[] = [];
  const walk = (secs?: SourceSection[]) => {
    secs?.forEach((sec) => {
      if (out.length >= limit) return;
      if (sec.type === 'arabic' || sec.type === 'plain' || !sec.type) {
        const t = cleanHtml(sec.text || '');
        if (t) out.push(t.length > 150 ? t.slice(0, 150) + '...' : t);
      }
      walk(sec.children);
    });
  };
  walk(source.sections);
  return out.slice(0, limit);
}

function extractExample(source: SourceContent): string | null {
  const walk = (secs?: SourceSection[]): string | null => {
    if (!secs) return null;
    for (const sec of secs) {
      if (sec.type === 'example') {
        const t = cleanHtml(sec.text || '');
        if (t) return t;
      }
      const nested = walk(sec.children);
      if (nested) return nested;
    }
    return null;
  };
  const fromSections = walk(source.sections);
  if (fromSections) return fromSections;
  const marked = (source.meanings ?? []).map(cleanHtml).find((m) => m.includes('◊') || m.includes('—'));
  return marked ?? null;
}

function matchesDialect(source: SourceContent, target: DialectFilterValue): boolean {
  if (target === 'ALL') return true;
  const meta = metaOf(source);
  if (meta) {
    const metaDialect = meta.dialect?.toUpperCase();
    const sl = String(meta.sourceLanguage || '').toLowerCase();
    if (target === 'KBD') return metaDialect === 'DOGU' || metaDialect === 'KBD' || sl === 'kbd';
    if (target === 'ADY') return metaDialect === 'BATI' || metaDialect === 'ADY' || sl === 'ady';
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
  const meta = metaOf(source);
  if (!meta) return false;
  const s = String(meta.sourceLanguage || '').toLowerCase();
  const t = String(meta.targetLanguage || '').toLowerCase();
  const isCirc = (l: string) => l === 'ady' || l === 'kbd';
  if (target === 'MULTI') return meta.file === '18.Kbd-Ru&En.json';
  if (target === 'CIRC') return isCirc(s) && isCirc(t);
  const other = !isCirc(s) ? s : t;
  return other === String(target).toLowerCase();
}

function SectionHead({
  icon, children, extra,
}: { icon: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
        {icon}{children}
      </h3>
      {extra}
    </div>
  );
}

function OneCikanAciklama({ source }: { source: SourceContent }) {
  const meanings = extractMeanings(source, 3);
  const example = extractExample(source);
  const totalMeanings = meaningCountOf(source);
  const sl = srcLangOf(source).toUpperCase();
  const tl = trgLangOf(source).toUpperCase();
  const mono = sl === tl;

  if (!meanings.length) return null;

  return (
    <section className="space-y-2">
      <SectionHead
        icon={<Sparkles size={16} className="text-emerald-500" />}
        extra={
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            öncelikli kaynak
          </span>
        }
      >
        Öne Çıkan Açıklama
      </SectionHead>

      <div className="overflow-hidden rounded-xl border-2 border-emerald-300 bg-white shadow-sm dark:border-emerald-800 dark:bg-slate-800">
        <div className="space-y-1.5 p-3.5">
          {meanings.map((m, i) => (
            <p key={i} className="flex gap-2 text-sm">
              <span className="shrink-0 font-bold text-emerald-600 dark:text-emerald-400">{i + 1}.</span>
              <span className="font-medium text-slate-800 dark:text-slate-100">{m}</span>
            </p>
          ))}

          {totalMeanings > meanings.length && (
            <p className="pt-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              +{totalMeanings - meanings.length} anlam daha (aşağıda)
            </p>
          )}

          {example && (
            <p className="mt-2 flex items-start gap-1.5 border-l-2 border-emerald-300 pl-2 text-xs italic text-slate-600 dark:border-emerald-700 dark:text-slate-400">
              <Quote size={10} className="mt-0.5 shrink-0" />{example}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 border-t border-emerald-200 bg-emerald-50 px-3.5 py-2 dark:border-emerald-900 dark:bg-emerald-950">
          <BookOpen size={11} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span className="min-w-0 flex-1 truncate text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            {authorOf(source) && authorOf(source) + ' '}
            {yearOf(source) && '(' + yearOf(source) + ') · '}
            {displayNameOf(source)}
          </span>
          {sl && (
            <span className="shrink-0 rounded bg-emerald-200 px-1.5 py-0.5 font-mono text-xs text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
              {mono ? sl : sl + '→' + tl}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ ANA BİLEŞEN ═══════════════════ */

export default function KelimeDetayDrawer({
  seciliKelime,
  isOpen,
  open,
  onClose,
  metinBoyutu = 16,
  dialectFilter = 'ALL',
  languageFilter = 'ALL',
  onConceptClick,
}: KelimeDetayDrawerProps) {
  const [corpusData, setCorpusData] = useState<CorpusExplorerResult | null>(null);
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [kopyalandi, setKopyalandi] = useState(false);
  const [paylasimAcik, setPaylasimAcik] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(false);
  const [openLang, setOpenLang] = useState<string | null>(null);
  const [openSrc, setOpenSrc] = useState<string | null>(null);
  const corpusExplorerServiceRef = useRef<CorpusExplorerService | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const kapatBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) setHasSpeechSupport(true);
  }, []);

  useEffect(() => {
    if (!corpusExplorerServiceRef.current) corpusExplorerServiceRef.current = new CorpusExplorerService();
    fetch('/data/dictionaries.json')
      .then((r) => r.json())
      .then((dicts) => corpusExplorerServiceRef.current?.loadDictionaries(dicts))
      .catch((e) => console.warn('CorpusExplorerService: dictionaries yuklenemedi', e));
  }, []);

  useEffect(() => {
    if (!corpusExplorerServiceRef.current || !seciliKelime) { setCorpusData(null); return; }
    const word = seciliKelime.lemma || seciliKelime.word || '';
    if (!word) { setCorpusData(null); return; }
    const sc = normalizeToSourceContents(seciliKelime);
    const allLangs = new Set<string>();
    let totalMeanings = 0;
    for (const source of sc) {
      totalMeanings += (source.meanings || []).length;
      if (source.sourceLanguage) allLangs.add(source.sourceLanguage);
      if (source.targetLanguage) allLangs.add(source.targetLanguage);
    }
    setCorpusData({
      word,
      meaningCount: totalMeanings,
      languages: Array.from(allLangs),
      dictionaries: sc.map((s) => ({
        file: s.sourceId || s.sourceName || '',
        title: s.sourceName || s.title || '',
        sourceLanguage: s.sourceLanguage || '',
        targetLanguage: s.targetLanguage || '',
        dialect: s.dialect || '',
        year: String(s.year || ''),
        author: s.author || '',
      })),
      totalDictionaries: sc.length,
    });
  }, [seciliKelime]);

  useEffect(() => {
    if (!seciliKelime?.wordFamilyId) { setFamilyMembers([]); return; }
    fetch('/api/sozluk/family/' + seciliKelime.wordFamilyId)
      .then((r) => r.json())
      .then((data) => setFamilyMembers(data.members || []))
      .catch(() => setFamilyMembers([]));
  }, [seciliKelime?.wordFamilyId]);

  const isDrawerOpen = open ?? isOpen ?? false;

  useEffect(() => {
    if (isDrawerOpen) { setOpenLang(null); setOpenSrc(null); }
  }, [isDrawerOpen, seciliKelime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => kapatBtnRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isDrawerOpen, onClose]);

  const content = useMemo(
    () => (seciliKelime ? normalizeDrawerContent(seciliKelime) : null),
    [seciliKelime]
  );

  const sourceContents = useMemo(
    () => (seciliKelime ? normalizeToSourceContents(seciliKelime) : []),
    [seciliKelime]
  );

 function extractShortMeaning(text: string): string | null {
  const t = cleanHtml(text);

  if (!t) return null;

  // Çok uzun sözlük tanımlarını ele
  if (t.length > 120) return null;

  // Açıklama/paragraf gibi görünenleri ele
  if (
    t.includes('букв.') ||
    t.includes('посл.') ||
    t.includes('перен.') ||
    t.includes('погов.') ||
    t.includes('нар.') ||
    t.includes('◊') ||
    t.includes('△')
  ) {
    return null;
  }

  // İlk anlamı çek
  const first = t
    .split(/[;,/·•]/)[0]
    .trim();

  if (!first) return null;
  if (first.length < 2) return null;

  // Çok uzun cümleleri ele
  if (first.length > 60) return null;

  return first;
}

const cokDilliKarsiliklar = useMemo(() => {
  const byLang: Record<
    string,
    {
      meanings: string[];
      sources: SourceContent[];
    }
  > = {};

  sourceContents.forEach((source) => {
    const meta = metaOf(source);
    const tgt = (
      meta?.targetLanguage ||
      source.targetLanguage ||
      ''
    ).toLowerCase();

    if (!tgt) return;

    if (!byLang[tgt]) {
      byLang[tgt] = {
        meanings: [],
        sources: [],
      };
    }

    byLang[tgt].sources.push(source);

    const extracted =
      extractMeanings(source, 5)
        .map(extractShortMeaning)
        .filter(Boolean) as string[];

    for (const m of extracted) {
      byLang[tgt].meanings.push(m);
    }
  });

  // tekrar temizleme
  Object.keys(byLang).forEach((lang) => {
    byLang[lang].meanings = [
      ...new Set(
        byLang[lang].meanings
          .map((m) => m.trim())
          .filter(Boolean)
      ),
    ].slice(0, 10);
  });

  const order = [
    'tr',
    'en',
    'ru',
    'ar',
    'ady',
    'kbd',
  ];

  const sorted: Record<
    string,
    {
      meanings: string[];
      sources: SourceContent[];
    }
  > = {};

  order.forEach((lang) => {
    if (byLang[lang]) {
      sorted[lang] = byLang[lang];
    }
  });

  Object.keys(byLang).forEach((lang) => {
    if (!sorted[lang]) {
      sorted[lang] = byLang[lang];
    }
  });

  return sorted;
}, [sourceContents]);

  const featured = useMemo(() => pickFeatured(sourceContents), [sourceContents]);

  const paylasimMetni = useMemo(() => {
    if (!content) return '';
    return [
      'Kelime: ' + content.word,
      content.cerkesce ? 'Çerkesçe: ' + content.cerkesce : '',
      featured ? 'Öne çıkan: ' + extractMeanings(featured, 3).join('; ') + ' — ' + displayNameOf(featured) : '',
      'Sözlük Kaynak Sayısı: ' + sourceContents.length,
      ...sourceContents.map((s) => {
        const name = displayNameOf(s);
        return '• ' + name + ': ' + (s.meanings ?? []).map(cleanHtml).join(', ');
      }),
    ].filter(Boolean).join('\n');
  }, [content, featured, sourceContents]);

  const panoyaKopyala = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(paylasimMetni);
      setKopyalandi(true);
      setTimeout(() => setKopyalandi(false), 1800);
    } catch (error) {
      console.error('Kopyalama hatası:', error);
    }
  }, [paylasimMetni]);

  const paylas = useCallback(() => setPaylasimAcik(true), []);

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
    <div role="dialog" aria-modal="true" aria-labelledby="drawer-title" className="fixed inset-0 z-[9999] flex justify-end transition-opacity duration-300">
      <div onClick={onClose} aria-hidden="true" className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer active:opacity-80" />
      <div ref={drawerRef} style={{ fontSize: metinBoyutu + 'px' }} className="relative z-10 w-full max-w-[540px] h-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-2xl flex flex-col border-l border-slate-300 dark:border-slate-800 overscroll-contain touch-pan-y">

        <div className="flex items-center justify-between p-4 sm:p-6 pb-4 border-b border-slate-300 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900 sticky top-0 z-20">
          <h2 id="drawer-title" className="text-xl sm:text-2xl font-bold text-orange-500 truncate">{content.word}</h2>
          <button ref={kapatBtnRef} onClick={onClose} aria-label="Kapat" className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0"><X size={20} /></button>
        </div>

        {corpusData && corpusData.totalDictionaries > 0 && (
          <div className="flex items-center gap-4 px-4 py-2 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-200 dark:border-amber-800 text-xs text-slate-600 dark:text-slate-400 shrink-0">
            <span>📖 {corpusData.meaningCount} anlam</span>
            <span>🌍 {corpusData.languages.length} dil</span>
            <span>📚 {corpusData.totalDictionaries} sözlük</span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 pb-28 space-y-5 scroll-smooth">

          <section className="space-y-2">
            <div className="flex flex-wrap gap-1.5">
              {seciliKelime.dialect && seciliKelime.dialect !== 'western' && seciliKelime.dialect !== 'eastern' && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800">{seciliKelime.dialect}</span>
              )}
              {seciliKelime.partOfSpeech && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700">{seciliKelime.partOfSpeech.toUpperCase()}</span>
              )}
              {seciliKelime.ipa && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800 font-mono">{seciliKelime.ipa}</span>
              )}
              {seciliKelime.corpusFrequency ? (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800">{seciliKelime.corpusFrequency} kullanım</span>
              ) : null}
            </div>
          </section>

          {seciliKelime.dialectVariants && (seciliKelime.dialectVariants.adyghe || seciliKelime.dialectVariants.kabardian) && (
            <section className="space-y-2">
              <SectionHead icon={<Languages size={16} className="text-orange-500" />}>Lehçe Karşılıkları</SectionHead>
              <div className="space-y-1.5 rounded-xl border border-sky-200 bg-sky-50/60 p-3 dark:border-sky-900/40 dark:bg-sky-950/20">
                {seciliKelime.dialectVariants.adyghe && (
                  <div className="flex items-baseline gap-3">
                    <span className="w-12 shrink-0 rounded-md border border-sky-300 bg-sky-200 px-2 py-0.5 text-center text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-200">ADY</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{seciliKelime.dialectVariants.adyghe}</span>
                  </div>
                )}
                {seciliKelime.dialectVariants.kabardian && (
                  <div className="flex items-baseline gap-3">
                    <span className="w-12 shrink-0 rounded-md border border-sky-300 bg-sky-200 px-2 py-0.5 text-center text-xs font-bold text-sky-800 dark:border-sky-800 dark:bg-sky-900 dark:text-sky-200">KBD</span>
                    <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{seciliKelime.dialectVariants.kabardian}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {(seciliKelime.rootIds?.length || seciliKelime.wordFamilyId || seciliKelime.conceptId) && (
            <section className="space-y-2">
              <SectionHead icon={<Zap size={16} className="text-orange-500" />}>Morfolojik Pasaport</SectionHead>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase block mb-1">Kök</span>
                  <span className="text-xs font-mono text-emerald-900 dark:text-emerald-100">{seciliKelime.rootIds?.join(', ') || '—'}</span>
                </div>
                <div className="rounded-xl border border-purple-200 bg-purple-50/80 p-3 dark:border-purple-900/40 dark:bg-purple-950/20">
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-400 uppercase block mb-1">Family</span>
                  <span className="text-xs font-mono text-purple-900 dark:text-purple-100">{seciliKelime.wordFamilyId || '—'}</span>
                </div>
                <div className="rounded-xl border border-orange-200 bg-orange-50/80 p-3 dark:border-orange-900/40 dark:bg-orange-950/20">
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-400 uppercase block mb-1">Concept</span>
                  <span className="text-xs font-mono text-orange-900 dark:text-orange-100">{seciliKelime.conceptId || '—'}</span>
                </div>
              </div>
            </section>
          )}

          {seciliKelime.wordFamilyId && familyMembers.length > 0 && (
            <section className="space-y-2">
              <SectionHead icon={<Users size={16} className="text-purple-500" />}>Aynı Aileden Kelimeler ({familyMembers.length})</SectionHead>
              <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-3 dark:border-purple-900/40 dark:bg-purple-950/20">
                <div className="flex flex-wrap gap-1.5">
                  {familyMembers.slice(0, 12).map((m: any) => (
                    <span key={m.id} className="text-xs px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200 font-medium cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors" title={m.literalMeaning} onClick={() => { if (m.form && onConceptClick) onConceptClick(m.form); }}>
                      {m.form}
                      {m.literalMeaning && (<span className="ml-1 text-[10px] text-purple-500 dark:text-purple-400 font-normal">({m.literalMeaning})</span>)}
                    </span>
                  ))}
                </div>
                {familyMembers.length > 12 && (<p className="text-[11px] text-purple-600 dark:text-purple-400 mt-2 font-semibold">+{familyMembers.length - 12} kelime daha</p>)}
              </div>
            </section>
          )}

          {featured && <OneCikanAciklama source={featured} />}

          {Object.keys(cokDilliKarsiliklar).length > 0 && (
            <section className="space-y-2">
              <SectionHead icon={<Globe size={16} className="text-orange-500" />} extra={<span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-950 dark:text-orange-300"><BookOpen size={10} />{sourceContents.length} sözlük</span>}>
                Çok Dilli Karşılıklar
              </SectionHead>
              <div className="overflow-hidden rounded-xl border border-sky-200 bg-white shadow-sm dark:border-sky-900 dark:bg-slate-800">
                {Object.entries(cokDilliKarsiliklar).map(([langKey, data], idx) => {
                  const isNative = langKey === 'ady' || langKey === 'kbd';
                  const isOpen = openLang === langKey;
                  const langLabel = isNative ? 'ÇRK' : langKey.toUpperCase();
                  return (
                    <div key={langKey} className={isNative ? 'border-b last:border-b-0 border-amber-200 dark:border-amber-900' : 'border-b last:border-b-0 border-sky-100 dark:border-slate-700'}>
                      <div className={isOpen ? 'flex items-center gap-2 px-3 py-2.5 transition-colors bg-orange-50 dark:bg-slate-900' : isNative ? 'flex items-center gap-2 px-3 py-2.5 transition-colors bg-amber-50 dark:bg-amber-950' : idx % 2 === 1 ? 'flex items-center gap-2 px-3 py-2.5 transition-colors bg-sky-50 dark:bg-slate-900' : 'flex items-center gap-2 px-3 py-2.5 transition-colors'}>
                        <span className="w-5 shrink-0 text-center text-sm">{isNative ? <Star size={13} className="fill-amber-500 text-amber-500" /> : (langKey === 'tr' ? '🇹🇷' : langKey === 'en' ? '🇬🇧' : langKey === 'ru' ? '🇷🇺' : langKey === 'ar' ? '🇸🇦' : '🏳️')}</span>
                        <span className={isOpen ? 'w-8 shrink-0 text-xs font-bold uppercase text-orange-600 dark:text-orange-400' : isNative ? 'w-8 shrink-0 text-xs font-bold uppercase text-amber-700 dark:text-amber-400' : 'w-8 shrink-0 text-xs font-bold uppercase text-sky-700 dark:text-sky-300'}>{langLabel}</span>
                        <div className="min-w-0 flex-1">
                          <span className={isNative ? 'block break-words text-sm font-bold text-amber-950 dark:text-amber-100' : 'block break-words text-sm font-medium text-slate-800 dark:text-slate-200'}>
                            {data.meanings.slice(0, 3).map(cleanHtml).join(' · ')}
                            {data.meanings.length > 3 && <span className="text-slate-400"> +{data.meanings.length - 3}</span>}
                          </span>
                        </div>
                        <button onClick={() => { navigator.clipboard.writeText(data.meanings.join(', ')); }} aria-label={langLabel + ' kopyala'} className={isNative ? 'shrink-0 rounded-md p-1 text-amber-500 hover:bg-amber-200 dark:hover:bg-amber-900' : 'shrink-0 rounded-md p-1 text-slate-400 hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-slate-700'}><Copy size={12} /></button>
                        <button onClick={() => { setOpenLang(isOpen ? null : langKey); setOpenSrc(null); }} aria-expanded={isOpen} className={isOpen ? 'flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-bold transition-colors border-orange-400 bg-orange-500 text-white' : isNative ? 'flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-bold transition-colors border-amber-300 bg-amber-100 text-amber-700 hover:border-amber-400 dark:border-amber-800 dark:bg-amber-900 dark:text-amber-200' : 'flex shrink-0 items-center gap-0.5 rounded-md border px-1.5 py-0.5 text-xs font-bold transition-colors border-slate-200 bg-slate-100 text-slate-500 hover:border-orange-300 hover:text-orange-600 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-300'}><BookOpen size={10} />{data.sources.length}<ChevronRight size={11} className={isOpen ? 'transition-transform rotate-90' : 'transition-transform'} /></button>
                      </div>
                      {isOpen && (
                        <div className="bg-slate-50 dark:bg-slate-900">
                          {data.sources.map((s) => {
                            const meta = metaOf(s);
                            const sOpen = openSrc === (s.sourceId || s.sourceName);
                            const src = meta?.sourceLanguage?.toUpperCase() || '??';
                            const trg = meta?.targetLanguage?.toUpperCase() || '??';
                            const isMono = src === trg;
                            const author = meta?.author || s.sourceName || s.title || 'Bilinmeyen';
                            const year = meta?.year || '';
                            return (
                              <div key={s.sourceId || s.sourceName} className="border-t border-slate-200 dark:border-slate-800">
                                <button onClick={() => setOpenSrc(sOpen ? null : (s.sourceId || s.sourceName))} className="flex w-full items-start gap-2 py-2 pl-7 pr-3 text-left hover:bg-white dark:hover:bg-slate-800">
                                  <ChevronDown size={11} className={sOpen ? 'mt-1 shrink-0 text-slate-400 transition-transform' : 'mt-1 shrink-0 text-slate-400 transition-transform -rotate-90'} />
                                  <div className="min-w-0 flex-1">
                                    <span className="block truncate text-xs font-bold text-slate-700 dark:text-slate-300">{author} <span className="font-normal text-slate-400">({year})</span></span>
                                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{meta?.displayName || s.title || s.sourceName}</span>
                                  </div>
                                  <span className={isMono ? 'mt-0.5 shrink-0 rounded px-1 py-0.5 font-mono text-xs bg-amber-200 text-amber-800 dark:bg-amber-900 dark:text-amber-200' : 'mt-0.5 shrink-0 rounded px-1 py-0.5 font-mono text-xs bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}>{isMono ? src : src + '→' + trg}</span>
                                </button>
                                {sOpen && (<div className="space-y-1 bg-white py-2 pl-12 pr-3 dark:bg-slate-800">{(s.meanings || []).slice(0, 8).map((m, mIdx) => (<p key={mIdx} className="border-l-2 border-orange-300 pl-2 text-xs font-medium text-slate-700 dark:border-orange-700 dark:text-slate-200">{mIdx + 1}. {cleanHtml(m)}</p>))}</div>)}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-center text-xs text-slate-400">📚 sayısına tıkla → o dilin sözlüklerini gör</p>
            </section>
          )}

        </div>

        <PaylasimGorseliModal isOpen={paylasimAcik} onClose={() => setPaylasimAcik(false)} kelime={{ kelime: content.word, anlam: sourceContents[0]?.meanings?.[0] || content.cerkesce || '', cerkesce: content.cerkesce || '', kaynaklar: sourceContents.map((s) => displayNameOf(s)), tarih: new Date().toLocaleDateString('tr-TR'), ornekler: sourceContents.flatMap((s) => (s.meanings || []).filter((m) => m.includes('◊') || m.includes('-') || m.includes(':'))).slice(0, 5) }} />

        <div className="absolute inset-x-0 bottom-0 z-20 flex gap-2 border-t border-slate-300 bg-white/95 p-3.5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <button type="button" onClick={panoyaKopyala} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 text-xs sm:text-sm font-semibold text-slate-700 transition-colors active:scale-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            {kopyalandi ? <Check size={16} /> : <Copy size={16} />}
            {kopyalandi ? 'Kopyalandı' : 'Kopyala'}
          </button>
          <button type="button" onClick={dinle} disabled={!hasSpeechSupport} className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3 text-xs sm:text-sm font-semibold transition-colors active:scale-95 dark:border-slate-700 dark:bg-slate-800 ${hasSpeechSupport ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 opacity-50 cursor-not-allowed'}`}>
            <Volume2 size={16} />Dinle
          </button>
          <button type="button" onClick={paylas} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-500 px-3 text-xs sm:text-sm font-semibold text-white transition-colors active:scale-95 hover:bg-orange-600">
            <Share2 size={16} />Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}


