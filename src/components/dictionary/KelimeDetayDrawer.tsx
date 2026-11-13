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
    const byLang: Record<string, { meanings: string[]; sources: SourceContent[] }> = {};
    sourceContents.forEach((source) => {
      const meta = metaOf(source);
      const tgt = (meta?.targetLanguage || source.targetLanguage || '').toLowerCase();
      if (!tgt) return;
      if (!byLang[tgt]) byLang[tgt] = { meanings: [], sources: [] };
      byLang[tgt].sources.push(source);
      const extracted = extractMeanings(source, 5).map(extractShortMeaning).filter(Boolean) as string[];
      for (const m of extracted) byLang[tgt].meanings.push(m);
    });
    Object.keys(byLang).forEach((lang) => {
      byLang[lang].meanings = [...new Set(byLang[lang].meanings.map((m) => m.trim()).filter(Boolean))].slice(0, 10);
    });
    const order = ['tr', 'en', 'ru', 'ar', 'ady', 'kbd'];
    const sorted: Record<string, { meanings: string[]; sources: SourceContent[] }> = {};
    order.forEach((lang) => { if (byLang[lang]) sorted[lang] = byLang[lang]; });
    Object.keys(byLang).forEach((lang) => { if (!sorted[lang]) sorted[lang] = byLang[lang]; });
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
      ...sourceContents.map((s) => '• ' + displayNameOf(s) + ': ' + (s.meanings ?? []).map(cleanHtml).join(', ')),
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

  const targetWord = content.cerkesce || content.word;
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

          {declension && (
            <section className="space-y-2" aria-label="İsim çekim tablosu">
              <SectionHead icon={<BookOpen size={16} className="text-[var(--jade-9)]" aria-hidden="true" />} extra={<Badge size="1" color="gray" variant="soft" highContrast>Закъуэ / Куэд</Badge>}>
                Склоненэ (İsim Çekimi)
              </SectionHead>
              <Table.Root size="1" variant="surface">
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
            </section>
          )}

          {(seciliKelime.rootIds?.length || seciliKelime.wordFamilyId || seciliKelime.conceptId) && (
            <section className="space-y-2" aria-label="Morfolojik pasaport">
              <SectionHead icon={<Zap size={16} className="text-[var(--orange-9)]" aria-hidden="true" />}>Morfolojik Pasaport</SectionHead>
              <Grid columns="3" gap="2">
                <Card size="1" variant="surface">
                  <Text as="div" size="1" weight="bold" color="jade" highContrast className="uppercase">Kök</Text>
                  <Text size="1" className="font-mono">{seciliKelime.rootIds?.join(', ') || '—'}</Text>
                </Card>
                <Card size="1" variant="surface">
                  <Text as="div" size="1" weight="bold" color="purple" highContrast className="uppercase">Aile</Text>
                  <Text size="1" className="font-mono">{seciliKelime.wordFamilyId || '—'}</Text>
                </Card>
                <Card size="1" variant="surface">
                  <Text as="div" size="1" weight="bold" color="orange" highContrast className="uppercase">Kavram</Text>
                  <Text size="1" className="font-mono">{seciliKelime.conceptId || '—'}</Text>
                </Card>
              </Grid>
            </section>
          )}

          {seciliKelime.wordFamilyId && familyMembers.length > 0 && (
            <section className="space-y-2" aria-label="Aynı aileden kelimeler">
              <SectionHead icon={<Users size={16} className="text-[var(--purple-9)]" aria-hidden="true" />}>
                Aynı Aileden Kelimeler ({familyMembers.length})
              </SectionHead>
              <Card size="2" variant="surface">
                <Flex wrap="wrap" gap="2">
                  {familyMembers.slice(0, 12).map((m: any) => (
                    <Button key={m.id} type="button" size="1" variant="soft" color="purple" highContrast title={m.literalMeaning} onClick={() => { if (m.form && onConceptClick) onConceptClick(m.form); }}>
                      {m.form}{m.literalMeaning ? ` (${m.literalMeaning})` : ''}
                    </Button>
                  ))}
                </Flex>
                {familyMembers.length > 12 && (
                  <Text as="p" size="1" weight="bold" color="purple" mt="2">+{familyMembers.length - 12} kelime daha</Text>
                )}
              </Card>
            </section>
          )}

          {featured && <OneCikanAciklama source={featured} />}

          {Object.keys(cokDilliKarsiliklar).length > 0 && (
            <section className="space-y-2" aria-label="Çok dilli karşılıklar ve sözlük kaynakları">
              <SectionHead
                icon={<Globe size={16} className="text-[var(--orange-9)]" aria-hidden="true" />}
                extra={<Badge size="1" color="orange" variant="soft" highContrast><BookOpen size={10} aria-hidden="true" />{sourceContents.length} sözlük</Badge>}
              >
                Çok Dilli Karşılıklar
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
