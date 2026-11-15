'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  BookOpen, Check, Copy, Share2, X, Volume2, ChevronRight, ChevronDown,
  Languages, Zap, Users, Globe, Star, Quote, Sparkles,
} from 'lucide-react';
import {
  Card, Flex, Grid, Box, Text, Heading, Badge, Button, IconButton, Table, Separator, Callout,
} from '@radix-ui/themes';
import type { DialectFilterValue } from '@/components/dictionary/DialectFilter';
import type { LanguageFilterValue } from '@/components/dictionary/LanguageFilter';
import type { DictionaryEntry, SourceContent, SourceSection } from '@/types/dictionary';
import { normalizeDrawerContent } from '@/lib/normalizers/drawerContent';
import PaylasimGorseliModal from '@/components/dictionary/PaylasimGorseliModal';
import { normalizeToSourceContents } from '@/lib/normalizers/sourceContentNormalizer';
import { resolveSourceMetadata } from '@/lib/normalizers/sourceMetadataResolver';
import { CorpusExplorerService } from '@/domain/discovery/services/CorpusExplorerService';
import { CorpusExplorerResult } from '@/domain/discovery/dto/CorpusExplorerDTO';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';
import { generateNounDeclension } from '@/lib/linguistic/declensionGenerator';

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

function cleanHtml(html: string): string {
  if (!html) return '';
  return String(html)
    .replace(/&lt;.*?&gt;/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
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
    const langSources = sources.filter((s) => trgLangOf(s) === lang || srcLangOf(s) === lang);
    if (!langSources.length) continue;
    const priorities = FEATURED_BY_LANG[lang] || [];
    for (const p of priorities) {
      const found = langSources.find((s) =>
        (displayNameOf(s) + ' ' + authorOf(s)).toLowerCase().includes(p.toLowerCase())
      );
      if (found) return found;
    }
    return [...langSources].sort((a, b) => meaningCountOf(a) - meaningCountOf(b))[0] ?? null;
  }
  for (const p of FEATURED_PRIORITY) {
    const found = sources.find((s) => (displayNameOf(s) + ' ' + authorOf(s)).toLowerCase().includes(p));
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
  return (source.meanings ?? []).map(cleanHtml).find((m) => m.includes('◊') || m.includes('—')) ?? null;
}

interface FamilyLexemeMember {
  id: string;
  form: string;
  literalMeaning?: string;
  partOfSpeech?: string;
  etymologyType?: string;
  corpusFrequency?: number;
}

interface WordFamilyInfo {
  id: string;
  rootForm?: string;
  etymologyType?: string;
  members: FamilyLexemeMember[];
}

type WordFamilyRecord = Record<string, WordFamilyInfo>;
let cachedFamilyPromise: Promise<WordFamilyRecord> | null = null;

function loadWordFamilyMap(): Promise<WordFamilyRecord> {
  if (cachedFamilyPromise) return cachedFamilyPromise;
  cachedFamilyPromise = Promise.all([
    fetch('/data/linguistic/word_families.json').then((r) => r.json()).catch(() => []),
    fetch('/data/linguistic/lexemes.json').then((r) => r.json()).catch(() => []),
  ]).then(([familiesRaw, lexemesRaw]) => {
    const families = Array.isArray(familiesRaw) ? familiesRaw : familiesRaw?.wordFamilies || [];
    const lexemes = Array.isArray(lexemesRaw) ? lexemesRaw : lexemesRaw?.lexemes || [];

    const byFamily: Record<string, FamilyLexemeMember[]> = {};
    for (const lx of lexemes) {
      const wfId = lx?.wordFamilyId;
      if (!wfId || !lx?.form) continue;
      if (!byFamily[wfId]) byFamily[wfId] = [];
      byFamily[wfId].push({
        id: lx.id,
        form: lx.form,
        literalMeaning: lx.literalMeaning || lx.dictionaryEvidence?.meanings?.tr || '',
        partOfSpeech: lx.partOfSpeech,
        etymologyType: lx.etymologyType,
        corpusFrequency: lx.corpusFrequency || 0,
      });
    }

    const result: WordFamilyRecord = {};
    for (const fam of families) {
      if (!fam?.id) continue;
      const members = (byFamily[fam.id] || []).sort((a, b) => {
        const rf = (fam.rootForm || '').toLowerCase();
        const aIsRoot = a.form.toLowerCase() === rf ? 1 : 0;
        const bIsRoot = b.form.toLowerCase() === rf ? 1 : 0;
        if (aIsRoot !== bIsRoot) return bIsRoot - aIsRoot;
        return (b.corpusFrequency || 0) - (a.corpusFrequency || 0);
      });
      result[fam.id] = {
        id: fam.id,
        rootForm: fam.rootForm || fam.root || members[0]?.form,
        etymologyType: fam.etymologyType,
        members,
      };
    }
    return result;
  });
  return cachedFamilyPromise;
}

const ETYM_LABELS: Record<string, { label: string; color: 'jade' | 'plum' | 'sky' | 'amber' }> = {
  native: { label: 'Öz Çerkesçe', color: 'jade' },
  loanword: { label: 'Alıntı', color: 'plum' },
  loan_compound: { label: 'Alıntı', color: 'plum' },
  proper_noun: { label: 'Özel İsim', color: 'sky' },
  affix: { label: 'Ek', color: 'amber' },
};

function SectionHead({ icon, children, extra }: { icon: React.ReactNode; children: React.ReactNode; extra?: React.ReactNode }) {
  return (
    <Flex align="center" justify="between" gap="2">
      <Heading as="h3" size="3" weight="bold">
        <Flex align="center" gap="2">{icon}{children}</Flex>
      </Heading>
      {extra}
    </Flex>
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
    <section className="space-y-2" aria-label="Öne çıkan açıklama">
      <SectionHead
        icon={<Sparkles size={16} className="text-[var(--jade-9)]" aria-hidden="true" />}
        extra={<Badge size="1" color="jade" variant="soft" highContrast>Öncelikli kaynak</Badge>}
      >
        Öne Çıkan Açıklama
      </SectionHead>
      <Card size="2" variant="surface">
        <Flex direction="column" gap="2">
          {meanings.map((m, i) => (
            <Flex key={i} gap="2" align="start">
              <Text size="2" weight="bold" color="jade" highContrast>{i + 1}.</Text>
              <Text size="2" weight="medium">{m}</Text>
            </Flex>
          ))}
          {totalMeanings > meanings.length && (
            <Text size="1" weight="bold" color="jade" highContrast>+{totalMeanings - meanings.length} anlam daha (aşağıda)</Text>
          )}
          {example && (
            <Callout.Root size="1" color="gray" variant="soft">
              <Callout.Icon><Quote size={12} aria-hidden="true" /></Callout.Icon>
              <Callout.Text className="italic">{example}</Callout.Text>
            </Callout.Root>
          )}
          <Separator size="4" />
          <Flex align="center" justify="between" gap="2">
            <Flex align="center" gap="2" className="min-w-0 flex-1">
              <BookOpen size={12} className="shrink-0 text-[var(--jade-11)]" aria-hidden="true" />
              <Text size="1" weight="medium" className="truncate">
                {authorOf(source) ? `${authorOf(source)} ` : ''}
                {yearOf(source) ? `(${yearOf(source)}) · ` : ''}
                {displayNameOf(source)}
              </Text>
            </Flex>
            {sl && (
              <Badge size="1" color="jade" variant="soft" highContrast className="font-mono shrink-0">
                {mono ? sl : `${sl}→${tl}`}
              </Badge>
            )}
          </Flex>
        </Flex>
      </Card>
    </section>
  );
}
export default function KelimeDetayDrawer({
  seciliKelime,
  isOpen,
  open,
  onClose,
  metinBoyutu = 16,
  onConceptClick,
}: KelimeDetayDrawerProps) {
  const [corpusData, setCorpusData] = useState<CorpusExplorerResult | null>(null);
  const [familyInfo, setFamilyInfo] = useState<WordFamilyInfo | null>(null);
  const [showAllFamily, setShowAllFamily] = useState(false);
  const [declensionOpen, setDeclensionOpen] = useState(false);
  const [familyOpen, setFamilyOpen] = useState(false);
  const [familyFilter, setFamilyFilter] = useState('');
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
    setShowAllFamily(false);
    const wfId = seciliKelime?.wordFamilyId;
    if (!wfId) { setFamilyInfo(null); return; }
    let cancelled = false;
    loadWordFamilyMap()
      .then((map) => {
        if (!cancelled) setFamilyInfo(map[wfId] || null);
      })
      .catch(() => {
        if (!cancelled) setFamilyInfo(null);
      });
    return () => { cancelled = true; };
  }, [seciliKelime?.wordFamilyId]);

  const isDrawerOpen = open ?? isOpen ?? false;

  useEffect(() => {
    if (isDrawerOpen) {
      setOpenLang(null);
      setOpenSrc(null);
      setDeclensionOpen(false);
      setFamilyOpen(false);
      setFamilyFilter('');
    }
  }, [isDrawerOpen, seciliKelime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      const timer = setTimeout(() => kapatBtnRef.current?.focus(), 50);
      return () => { clearTimeout(timer); window.removeEventListener('keydown', handleKeyDown); };
    }
  }, [isDrawerOpen, onClose]);

  const content = useMemo(() => (seciliKelime ? normalizeDrawerContent(seciliKelime) : null), [seciliKelime]);
  const sourceContents = useMemo(() => (seciliKelime ? normalizeToSourceContents(seciliKelime) : []), [seciliKelime]);

  function extractShortMeaning(text: string): string | null {
    const t = cleanHtml(text);
    if (!t || t.length > 120) return null;
    if (t.includes('букв.') || t.includes('посл.') || t.includes('перен.') || t.includes('погов.') || t.includes('нар.') || t.includes('◊') || t.includes('△')) return null;
    const first = t.split(/[;,/·•]/)[0].trim();
    if (!first || first.length < 2 || first.length > 60) return null;
    return first;
  }

  const cokDilliKarsiliklar = useMemo(() => {
    const map: Record<string, { meanings: string[]; sources: SourceContent[] }> = {};
    for (const src of sourceContents) {
      const tl = trgLangOf(src) || srcLangOf(src) || 'other';
      const ms = extractMeanings(src, 6);
      if (!ms.length) continue;
      if (!map[tl]) map[tl] = { meanings: [], sources: [] };
      for (const m of ms) {
        if (!map[tl].meanings.includes(m)) map[tl].meanings.push(m);
      }
      map[tl].sources.push(src);
    }

    // Lexeme uzerindeki dogrudan Turkce / Ingilizce / Rusca / Arapca karsiliklari da dahil et
    const injectDirect = (langKey: string, rawVal: unknown, label: string) => {
      if (!rawVal) return;
      const parts = (Array.isArray(rawVal) ? rawVal : String(rawVal).split(/[;]+/))
        .map((s) => cleanHtml(String(s || '')))
        .filter(Boolean);
      if (!parts.length) return;
      if (!map[langKey]) map[langKey] = { meanings: [], sources: [] };
      for (const p of parts) {
        if (!map[langKey].meanings.some((ex) => ex.toLowerCase() === p.toLowerCase())) {
          map[langKey].meanings.unshift(p);
        }
      }
      if (!map[langKey].sources.length) {
        map[langKey].sources.push({
          sourceId: `lexeme-${langKey}`,
          sourceName: label,
          title: label,
          sourceLanguage: 'kbd',
          targetLanguage: langKey,
          meanings: parts,
        });
      }
    };

    const trDirect =
      (seciliKelime as any)?.tr ||
      (seciliKelime as any)?.translations?.tr ||
      (seciliKelime as any)?.literalMeaning;
    injectDirect('tr', trDirect, 'Çerkesçe–Türkçe Temel Sözlük');

    const enDirect = (seciliKelime as any)?.en || (seciliKelime as any)?.translations?.en;
    if (!map['en']) injectDirect('en', enDirect, 'Çerkesçe–İngilizce Temel Sözlük');

    const ruDirect = (seciliKelime as any)?.ru || (seciliKelime as any)?.translations?.ru;
    if (!map['ru']) injectDirect('ru', ruDirect, 'Çerkesçe–Rusça Temel Sözlük');

    const arDirect = (seciliKelime as any)?.ar || (seciliKelime as any)?.translations?.ar;
    if (!map['ar']) injectDirect('ar', arDirect, 'Çerkesçe–Arapça Temel Sözlük');

    const ORDER = ['tr', 'en', 'ru', 'ar', 'ady', 'kbd'];
    const ordered: Record<string, { meanings: string[]; sources: SourceContent[] }> = {};
    for (const k of ORDER) {
      if (map[k]) ordered[k] = map[k];
    }
    for (const k of Object.keys(map)) {
      if (!ordered[k]) ordered[k] = map[k];
    }
    return ordered;
  }, [sourceContents, seciliKelime]);

  const lexemeLangCards = useMemo(() => {
    const cleanFirst = (raw: unknown): string => {
      if (!raw) return '';
      const arr = Array.isArray(raw) ? raw : [raw];
      for (const item of arr) {
        const s = cleanHtml(String(item || '')).trim();
        if (s) return s;
      }
      return '';
    };

    const trVal =
      cleanFirst((seciliKelime as any)?.tr) ||
      cleanFirst((seciliKelime as any)?.translations?.tr) ||
      cleanFirst((seciliKelime as any)?.literalMeaning) ||
      cleanFirst(cokDilliKarsiliklar['tr']?.meanings);

    const enVal =
      cleanFirst((seciliKelime as any)?.en) ||
      cleanFirst((seciliKelime as any)?.translations?.en) ||
      cleanFirst(cokDilliKarsiliklar['en']?.meanings);

    const ruVal =
      cleanFirst((seciliKelime as any)?.ru) ||
      cleanFirst((seciliKelime as any)?.translations?.ru) ||
      cleanFirst(cokDilliKarsiliklar['ru']?.meanings);

    const arVal =
      cleanFirst((seciliKelime as any)?.ar) ||
      cleanFirst((seciliKelime as any)?.translations?.ar) ||
      cleanFirst(cokDilliKarsiliklar['ar']?.meanings);

    return [
      {
        key: 'tr',
        tag: 'TR · TÜRKÇE',
        value: trVal,
        boxClass: 'border-sky-200 bg-sky-50/70 dark:border-sky-800/60 dark:bg-sky-950/30',
        tagClass: 'text-sky-700 dark:text-sky-300',
        dir: 'ltr' as const,
      },
      {
        key: 'en',
        tag: 'EN · ENGLISH',
        value: enVal,
        boxClass: 'border-indigo-200 bg-indigo-50/70 dark:border-indigo-800/60 dark:bg-indigo-950/30',
        tagClass: 'text-indigo-700 dark:text-indigo-300',
        dir: 'ltr' as const,
      },
      {
        key: 'ru',
        tag: 'RU · РУССКИЙ',
        value: ruVal,
        boxClass: 'border-rose-200 bg-rose-50/70 dark:border-rose-800/60 dark:bg-rose-950/30',
        tagClass: 'text-rose-700 dark:text-rose-300',
        dir: 'ltr' as const,
      },
      {
        key: 'ar',
        tag: 'AR · العربية',
        value: arVal,
        boxClass: 'border-amber-200 bg-amber-50/70 dark:border-amber-800/60 dark:bg-amber-950/30',
        tagClass: 'text-amber-700 dark:text-amber-300',
        dir: 'rtl' as const,
      },
    ].filter((c) => Boolean(c.value));
  }, [seciliKelime, cokDilliKarsiliklar]);
  if (!isDrawerOpen || !seciliKelime || !content) return null;

  const targetWord = content.cerkesce || content.word;
  const dinle = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(targetWord);
    u.lang = 'ru-RU';
    u.rate = 0.85;
    window.speechSynthesis.speak(u);
  };

  const paylas = () => {
    setPaylasimAcik(true);
  };

  const panoyaKopyala = () => {
    const firstLang = Object.values(cokDilliKarsiliklar)[0];
    const anlam = firstLang?.meanings?.[0] || (seciliKelime as any)?.tr || '';
    const metin = anlam ? `${targetWord} — ${anlam}` : targetWord;
    navigator.clipboard.writeText(metin);
    setKopyalandi(true);
    setTimeout(() => setKopyalandi(false), 2000);
  };
const variantDisplay = resolveDialectVariantDisplay({
    form: targetWord,
    dialect: seciliKelime.dialect,
    dialectVariants: seciliKelime.dialectVariants,
  });
  const posLower = String(seciliKelime.partOfSpeech || '').toLowerCase();
  const isNoun = /[а-яА-ЯӀӏ]/.test(targetWord) && (!posLower || posLower.includes('noun') || posLower.includes('щыӀэцӀэ'));
  const declension = isNoun ? generateNounDeclension(targetWord) : null;

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="drawer-title" className="fixed inset-0 z-[9999] flex justify-end">
      <div onClick={onClose} aria-hidden="true" className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" />
      <Box
        ref={drawerRef}
        style={{ fontSize: `${metinBoyutu}px`, backgroundColor: 'var(--color-background)' }}
        className="relative z-10 w-full max-w-[540px] h-full shadow-2xl flex flex-col border-l border-[var(--gray-6)]"
      >
        <Flex align="center" justify="between" p="4" className="border-b border-[var(--gray-6)] shrink-0 sticky top-0 z-20" style={{ backgroundColor: 'var(--color-panel-solid)' }}>
          <Heading id="drawer-title" as="h2" size="6" weight="bold" color="orange" highContrast className="truncate">{content.word}</Heading>
          <IconButton ref={kapatBtnRef} type="button" variant="ghost" color="gray" size="2" onClick={onClose} aria-label="Detay çekmecesini kapat">
            <X size={20} aria-hidden="true" />
          </IconButton>
        </Flex>

        {corpusData && corpusData.totalDictionaries > 0 && (
          <Flex align="center" gap="4" px="4" py="2" className="border-b border-[var(--amber-6)] shrink-0" style={{ backgroundColor: 'var(--amber-2)' }}>
            <Text size="1" weight="medium">{corpusData.meaningCount} anlam</Text>
            <Text size="1" weight="medium">{corpusData.languages.length} dil</Text>
            <Text size="1" weight="medium">{corpusData.totalDictionaries} sözlük</Text>
          </Flex>
        )}

        <Box className="flex-1 overflow-y-auto p-4 sm:p-5 pb-28 space-y-5">
          <Flex wrap="wrap" gap="2">
            {seciliKelime.dialect && seciliKelime.dialect !== 'western' && seciliKelime.dialect !== 'eastern' && (
              <Badge size="1" color="indigo" variant="soft" highContrast>{seciliKelime.dialect}</Badge>
            )}
            {seciliKelime.partOfSpeech && (
              <Badge size="1" color="gray" variant="surface" highContrast>{seciliKelime.partOfSpeech.toUpperCase()}</Badge>
            )}
            {seciliKelime.ipa && (
              <Badge size="1" color="cyan" variant="soft" highContrast className="font-mono">[{seciliKelime.ipa}]</Badge>
            )}
            {seciliKelime.etymologyType && ETYM_LABELS[String(seciliKelime.etymologyType).toLowerCase()] && (
              <Badge
                size="1"
                color={ETYM_LABELS[String(seciliKelime.etymologyType).toLowerCase()].color}
                variant="soft"
                highContrast
              >
                {ETYM_LABELS[String(seciliKelime.etymologyType).toLowerCase()].label}
              </Badge>
            )}
            {seciliKelime.corpusFrequency ? (
              <Badge size="1" color="amber" variant="soft" highContrast>{seciliKelime.corpusFrequency} kullanım</Badge>
            ) : null}
          </Flex>

          {variantDisplay && variantDisplay.hasDifference && (
            <section className="space-y-2" aria-label="Diyalekt karşılıkları">
              <SectionHead icon={<Languages size={16} className="text-[var(--orange-9)]" aria-hidden="true" />} extra={<Badge size="1" color="indigo" variant="soft" highContrast>Huvaj &amp; AIG</Badge>}>
                Diyalekt Karşılıkları
              </SectionHead>
              <Card size="2" variant="surface">
                <Flex direction="column" gap="2">
                  <Flex wrap="wrap" align="center" gap="2">
                    <Badge size="1" color="amber" variant="solid" highContrast>ADY</Badge>
                    <Text size="3" weight="bold">{variantDisplay.adyghePrimary}</Text>
                    {variantDisplay.adygheAlternatives.map((alt) => (
                      <Badge key={alt.form} size="1" color="gray" variant="soft">alt: <strong>{alt.form}</strong> ({alt.sourceLabel})</Badge>
                    ))}
                  </Flex>
                  <Flex wrap="wrap" align="center" gap="2">
                    <Badge size="1" color="sky" variant="solid" highContrast>KBD</Badge>
                    <Text size="3" weight="bold">{variantDisplay.kabardianPrimary}</Text>
                  </Flex>
                </Flex>
              </Card>
            </section>
          )}

          {lexemeLangCards.length > 0 && (
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" aria-label="Temel dil karşılıkları">
              {lexemeLangCards.map((card) => (
                <div
                  key={card.key}
                  dir={card.dir}
                  className={`rounded-xl border px-3.5 py-2.5 transition-colors ${card.boxClass}`}
                >
                  <div className={`text-[11px] font-bold tracking-wider uppercase ${card.tagClass}`}>
                    {card.tag}
                  </div>
                  <div className="mt-1 text-sm font-bold leading-snug text-[var(--gray-12)] break-words">
                    {card.value}
                  </div>
                </div>
              ))}
            </section>
          )}

          {Object.keys(cokDilliKarsiliklar).length > 0 && (
            <section className="space-y-2" aria-label="Çok dilli karşılıklar ve sözlük kaynakları">
              <SectionHead
                icon={<Globe size={16} className="text-[var(--orange-9)]" aria-hidden="true" />}
                extra={<Badge size="1" color="orange" variant="soft" highContrast><BookOpen size={10} aria-hidden="true" />{sourceContents.length} sözlük</Badge>}
              >
                Sözlük Kaynakları
              </SectionHead>

              <Card size="1" variant="surface">
                <Flex direction="column">
                  {Object.entries(cokDilliKarsiliklar).map(([langKey, data], idx) => {
                    const isNative = langKey === 'ady' || langKey === 'kbd';
                    const isLangOpen = openLang === langKey;
                    const langLabel = isNative ? 'ÇRK' : langKey.toUpperCase();
                    return (
                      <Box key={langKey}>
                        {idx > 0 && <Separator size="4" />}
                        <Flex align="center" gap="2" px="2" py="2">
                          <span className="w-5 shrink-0 text-center text-sm" aria-hidden="true">
                            {isNative ? <Star size={13} className="fill-amber-500 text-amber-500 inline" /> : langKey === 'tr' ? '🇹🇷' : langKey === 'en' ? '🇬🇧' : langKey === 'ru' ? '🇷🇺' : langKey === 'ar' ? '🇸🇦' : '🏳️'}
                          </span>
                          <Badge size="1" color={isLangOpen ? 'orange' : isNative ? 'amber' : 'sky'} variant="soft" highContrast className="w-10 justify-center shrink-0 font-mono">
                            {langLabel}
                          </Badge>
                          <Box className="min-w-0 flex-1">
                            <Text size="2" weight={isNative ? 'bold' : 'medium'} className="block break-words">
                              {data.meanings.slice(0, 3).map(cleanHtml).join(' · ')}
                              {data.meanings.length > 3 && ` +${data.meanings.length - 3}`}
                            </Text>
                          </Box>
                          <IconButton type="button" size="1" variant="ghost" color="gray" onClick={() => navigator.clipboard.writeText(data.meanings.join(', '))} aria-label={`${langLabel} karşılıklarını kopyala`}>
                            <Copy size={12} aria-hidden="true" />
                          </IconButton>
                          <Button type="button" size="1" variant={isLangOpen ? 'solid' : 'soft'} color={isLangOpen ? 'orange' : isNative ? 'amber' : 'gray'} highContrast aria-expanded={isLangOpen} onClick={() => { setOpenLang(isLangOpen ? null : langKey); setOpenSrc(null); }}>
                            <BookOpen size={10} aria-hidden="true" />
                            {data.sources.length}
                            <ChevronRight size={11} className={`transition-transform ${isLangOpen ? 'rotate-90' : ''}`} aria-hidden="true" />
                          </Button>
                        </Flex>

                        {isLangOpen && (
                          <Box pl="5" pr="2" pb="2" className="space-y-1">
                            {data.sources.map((s) => {
                              const meta = metaOf(s);
                              const srcKey = s.sourceId || s.sourceName;
                              const sOpen = openSrc === srcKey;
                              const src = meta?.sourceLanguage?.toUpperCase() || '??';
                              const trg = meta?.targetLanguage?.toUpperCase() || '??';
                              const isMono = src === trg;
                              const author = meta?.author || s.sourceName || s.title || 'Bilinmeyen';
                              const year = meta?.year || '';
                              return (
                                <Box key={srcKey} className="border-t border-[var(--gray-5)] pt-1">
                                  <button type="button" onClick={() => setOpenSrc(sOpen ? null : srcKey)} aria-expanded={sOpen} className="flex w-full items-start gap-2 py-1.5 px-2 rounded text-left hover:bg-[var(--gray-3)] focus-visible:outline-2 focus-visible:outline-[var(--accent-8)]">
                                    <ChevronDown size={12} className={`mt-1 shrink-0 transition-transform ${sOpen ? '' : '-rotate-90'}`} aria-hidden="true" />
                                    <Box className="min-w-0 flex-1">
                                      <Text as="div" size="1" weight="bold" className="truncate">{author} {year ? `(${year})` : ''}</Text>
                                      <Text as="div" size="1" color="gray" className="truncate">{meta?.displayName || s.title || s.sourceName}</Text>
                                    </Box>
                                    <Badge size="1" color={isMono ? 'amber' : 'gray'} variant="soft" className="font-mono shrink-0">{isMono ? src : `${src}→${trg}`}</Badge>
                                  </button>
                                  {sOpen && (
                                    <Box pl="5" py="1" className="space-y-1">
                                      {(s.meanings || []).slice(0, 8).map((m, mIdx) => (
                                        <Text key={mIdx} as="p" size="1" className="border-l-2 border-[var(--orange-8)] pl-2">{mIdx + 1}. {cleanHtml(m)}</Text>
                                      ))}
                                    </Box>
                                  )}
                                </Box>
                              );
                            })}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Flex>
              </Card>
            </section>
          )}

          {declension && (
            <Card size="1" variant="surface">
              <button
                type="button"
                onClick={() => setDeclensionOpen((v) => !v)}
                aria-expanded={declensionOpen}
                className="flex w-full items-center justify-between gap-2 py-1 px-1 text-left"
              >
                <Flex align="center" gap="2">
                  <BookOpen size={15} className="text-[var(--jade-9)]" aria-hidden="true" />
                  <Text size="2" weight="bold">Склоненэ (İsim Çekimi)</Text>
                  <Badge size="1" color="gray" variant="soft">Закъуэ / Куэд</Badge>
                </Flex>
                <ChevronDown
                  size={15}
                  className={`text-[var(--gray-10)] transition-transform ${declensionOpen ? '' : '-rotate-90'}`}
                  aria-hidden="true"
                />
              </button>
              {declensionOpen && (
                <Box pt="2">
                  <Table.Root size="1" variant="ghost">
                    <Table.Header>
                      <Table.Row>
                        <Table.ColumnHeaderCell>Hal</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Tekil Belirtili</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell>Çoğul Belirtili</Table.ColumnHeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {declension.map((row) => (
                        <Table.Row key={row.caseNameCircassian}>
                          <Table.RowHeaderCell>
                            <Text as="div" weight="bold" size="1">{row.caseNameCircassian}</Text>
                            <Text as="div" size="1" color="gray">{row.caseNameTr}</Text>
                          </Table.RowHeaderCell>
                          <Table.Cell>{row.singularDefinite}</Table.Cell>
                          <Table.Cell>{row.pluralDefinite}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Root>
                </Box>
              )}
            </Card>
          )}

          {(seciliKelime.rootIds?.length || seciliKelime.wordFamilyId || seciliKelime.conceptId) && (
            <Card size="1" variant="surface">
              <button
                type="button"
                onClick={() => setFamilyOpen((v) => !v)}
                aria-expanded={familyOpen}
                className="flex w-full items-center justify-between gap-2 py-1 px-1 text-left"
              >
                <Flex align="center" gap="2" wrap="wrap">
                  <Users size={15} className="text-[var(--purple-9)]" aria-hidden="true" />
                  <Text size="2" weight="bold">Kök &amp; Türev Ailesi</Text>
                  {familyInfo?.rootForm && (
                    <Badge size="1" color="jade" variant="soft" highContrast>
                      Kök: {familyInfo.rootForm}
                    </Badge>
                  )}
                  {familyInfo && familyInfo.members.length > 0 && (
                    <Badge size="1" color="purple" variant="soft" highContrast>
                      {familyInfo.members.length} üye
                    </Badge>
                  )}
                </Flex>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-[var(--gray-10)] transition-transform ${familyOpen ? '' : '-rotate-90'}`}
                  aria-hidden="true"
                />
              </button>

              {familyOpen && (
                <Flex direction="column" gap="2.5" pt="3">
                  <Flex wrap="wrap" gap="2" className="pb-2 border-b border-[var(--gray-5)]">
                    {seciliKelime.rootIds?.length ? (
                      <Badge size="1" color="jade" variant="outline" className="font-mono">
                        Kök ID: {seciliKelime.rootIds.join(', ')}
                      </Badge>
                    ) : null}
                    {seciliKelime.wordFamilyId ? (
                      <Badge size="1" color="purple" variant="outline" className="font-mono">
                        Aile: {seciliKelime.wordFamilyId}
                      </Badge>
                    ) : null}
                    {seciliKelime.conceptId ? (
                      <Badge size="1" color="orange" variant="outline" className="font-mono">
                        Kavram: {seciliKelime.conceptId}
                      </Badge>
                    ) : null}
                  </Flex>

                  {familyInfo && familyInfo.members.length > 0 && (() => {
                    const qf = familyFilter.trim().toLowerCase();
                    const filteredMembers = qf
                      ? familyInfo.members.filter(
                          (m) =>
                            m.form.toLowerCase().includes(qf) ||
                            (m.literalMeaning || '').toLowerCase().includes(qf)
                        )
                      : familyInfo.members;
                    const visibleMembers = showAllFamily || qf ? filteredMembers : filteredMembers.slice(0, 14);
return (
                      <>
                        {familyInfo.members.length > 8 && (
                          <input
                            type="text"
                            value={familyFilter}
                            onChange={(e) => setFamilyFilter(e.target.value)}
                            placeholder={`${familyInfo.members.length} türev içinde ara...`}
                            className="w-full rounded-md border border-[var(--gray-6)] bg-[var(--color-background)] px-2.5 py-1 text-xs outline-none focus:border-[var(--purple-8)]"
                          />
                        )}
                        <Flex wrap="wrap" gap="1.5">
                          {visibleMembers.map((m) => {
                            const isCurrent = m.form === targetWord || m.id === seciliKelime.id;
                            const isRoot = familyInfo.rootForm && m.form.toLowerCase() === familyInfo.rootForm.toLowerCase();
                            return (
                              <Button
                                key={m.id}
                                type="button"
                                size="1"
                                variant={isCurrent ? 'solid' : isRoot ? 'surface' : 'soft'}
                                color={isCurrent ? 'purple' : isRoot ? 'jade' : 'gray'}
                                highContrast
                                title={m.literalMeaning || m.form}
                                onClick={() => {
                                  if (!isCurrent && m.form && onConceptClick) onConceptClick(m.form);
                                }}
                              >
                                {m.form}
                                {m.literalMeaning ? ` · ${m.literalMeaning.slice(0, 22)}` : ''}
                              </Button>
                            );
                          })}
                        </Flex>
                        {!qf && filteredMembers.length > 14 && (
                          <Button
                            type="button"
                            size="1"
                            variant="ghost"
                            color="purple"
                            onClick={() => setShowAllFamily((v) => !v)}
                          >
                            {showAllFamily
                              ? 'Daralt'
                              : `Tümünü göster (+${filteredMembers.length - 14} türev)`}
                          </Button>
                        )}
                      </>
                    );
                  })()}
                </Flex>
              )}
            </Card>
          )}
        </Box>

        <PaylasimGorseliModal
          isOpen={paylasimAcik}
          onClose={() => setPaylasimAcik(false)}
          kelime={{
            kelime: content.cerkesce || content.word,
            anlam: content.cerkesce ? content.word : sourceContents[0]?.meanings?.[0] || '',
            cerkesce: content.cerkesce || '',
            kaynaklar: sourceContents.map((s) => displayNameOf(s)),
            tarih: new Date().toLocaleDateString('tr-TR'),
            ornekler: sourceContents.flatMap((s) => (s.meanings || []).filter((m) => m.includes('◊') || m.includes('-') || m.includes(':'))).slice(0, 5),
          }}
        />

        <Flex gap="2" p="3" className="absolute inset-x-0 bottom-0 z-20 border-t border-[var(--gray-6)]" style={{ backgroundColor: 'var(--color-panel-solid)' }}>
          <Button type="button" size="2" variant="soft" color="gray" highContrast onClick={panoyaKopyala} className="flex-1">
            {kopyalandi ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
            {kopyalandi ? 'Kopyalandı' : 'Kopyala'}
          </Button>
          <Button type="button" size="2" variant="soft" color="indigo" highContrast onClick={dinle} disabled={!hasSpeechSupport} className="flex-1">
            <Volume2 size={16} aria-hidden="true" />
            Dinle
          </Button>
          <Button type="button" size="2" variant="solid" color="orange" highContrast onClick={paylas} className="flex-1">
            <Share2 size={16} aria-hidden="true" />
            Paylaş
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
