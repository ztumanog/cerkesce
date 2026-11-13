'use client';

import React from 'react';
import { ChevronRight, Star, BookOpen, Tag, Sprout } from 'lucide-react';
import Link from 'next/link';
import { Card, Flex, Box, Text, Heading, Badge, IconButton } from '@radix-ui/themes';
import { KaynakItem } from '@/types/dictionary';
import { resolveDialectVariantDisplay } from '@/lib/linguistic/dialectVariantsHelper';

const POS_TR: Record<string, string> = {
  noun: 'isim',
  verb: 'fiil',
  'transitive verb': 'geçişli fiil',
  'intransitive verb': 'geçişsiz fiil',
  adjective: 'sıfat',
  attr: 'niteleyici',
  'attr.': 'niteleyici',
  adverb: 'zarf',
  adv: 'zarf',
  'adv.': 'zarf',
  numeral: 'sayı',
  pronoun: 'zamir',
  'pron.': 'zamir',
  conjunction: 'bağlaç',
  interjection: 'ünlem',
  int: 'ünlem',
  'int.': 'ünlem',
  particle: 'ilgeç',
  part: 'ilgeç',
  'part.': 'ilgeç',
  possessive_prefix: 'iyelik öneki',
};

const posTR = (p?: string | null): string | null => (p ? (POS_TR[p] ?? p) : null);

const LEHCE_TR: Record<string, string> = {
  western: 'Batı (ADY)',
  eastern: 'Doğu (KBD)',
  dogu: 'Doğu (KBD)',
  bati: 'Batı (ADY)',
  kbd: 'Doğu (KBD)',
  ady: 'Batı (ADY)',
  common: 'Ortak',
};

const lehceTR = (l?: string | null): string | null =>
  l ? (LEHCE_TR[l.toLowerCase()] ?? l.toUpperCase()) : null;

export interface KelimeItem {
  id: string;
  kelime: string;
  madde?: string;
  anlam?: string;
  ilkAnlam?: string;
  literalMeaning?: string;
  literalMeaningAdy?: string;
  full_definition_in_html?: string;
  form?: string;
  anlamlar?: string[];
  kaynaklar?: KaynakItem[];
  lehce?: string;
  dialect?: string;
  kaynakAdlari?: string[];
  hedefDillerSet?: string[];
  hedefDilCanonical?: string;
  rootIds?: string[];
  wordFamilyId?: string | null;
  conceptId?: string | null;
  ipa?: string | null;
  partOfSpeech?: string | null;
  corpusFrequency?: number;
  dialectVariants?: { adyghe?: string; kabardian?: string } | null;
}

export interface KelimeKartiProps {
  data: KelimeItem;
  onClick?: () => void;
  favoriMi?: boolean;
  onFavoriToggle?: (e: React.MouseEvent) => void;
}

const sanitizeAnlam = (html: string): string => {
  if (!html) return '—';
  let text = String(html);
  text = text.replace(/<div[^>]*margin-left:\s*3em[^>]*>.*?<\/div>/gi, ' ');
  text = text.replace(/<font[^>]*color=['"]sienna['"][^>]*>.*?<\/font>/gi, ' ');
  text = text.replace(/<i[^>]*class=['"]p['"][^>]*>.*?<\/i>/gi, ' ');
  text = text.replace(/<i>\s*\([^)]*\)\s*<\/i>/gi, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  text = text.split('◊')[0];
  text = text.split(/\s\/(?:\s|$)/)[0];
  text = text.replace(/\s+/g, ' ').trim();
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');
  text = text.replace(/^[\s,;:.\-–—]+/, '').replace(/[\s,;:.\-–—]+$/, '');

  const firstComma = text.indexOf(',');
  if (firstComma > 0 && firstComma < 40) text = text.slice(0, firstComma).trim();

  if (text.length > 80) {
    const truncated = text.slice(0, 80);
    const lastSpace = truncated.lastIndexOf(' ');
    text = truncated.slice(0, lastSpace > 50 ? lastSpace : 80) + '…';
  }
  return text || '—';
};

const kisaltTurkce = (metin: string): string => {
  let text = metin.replace(/\s+/g, ' ').trim();
  if (text.length > 80) {
    const truncated = text.slice(0, 80);
    const lastSpace = truncated.lastIndexOf(' ');
    text = truncated.slice(0, lastSpace > 50 ? lastSpace : 80) + '…';
  }
  return text || '—';
};

const getAnlamMetin = (data: KelimeItem): string => {
  const turkce = data.ilkAnlam || data.literalMeaning;
  if (typeof turkce === 'string' && turkce.trim()) return kisaltTurkce(turkce);
  const rawAnlam = data.anlamlar?.[0] || data.anlam || data.full_definition_in_html;
  if (!rawAnlam) return '—';
  return typeof rawAnlam === 'string' ? sanitizeAnlam(rawAnlam) : '—';
};

const formatKaynakDetayi = (kaynakItem: unknown): string => {
  if (!kaynakItem) return '';
  if (typeof kaynakItem === 'string') return kaynakItem;
  if (typeof kaynakItem === 'object') {
    const itemObj = kaynakItem as Record<string, unknown>;
    const sourceObj = (itemObj.kaynak || itemObj) as Record<string, unknown>;
    const title = String(
      sourceObj.title || sourceObj.sözlük || sourceObj.kaynak || sourceObj.dictionaryName || sourceObj.name || ''
    );
    const year = String(sourceObj.year || sourceObj.yil || '');
    return [title, year].filter(Boolean).join(' ') || 'Bilinmeyen Kaynak';
  }
  return 'Bilinmeyen Kaynak';
};

const getFrekansRozeti = (freq?: number): { label: string; color: 'amber' | 'orange' | 'indigo' } | null => {
  if (!freq || freq < 50) return null;
  if (freq >= 1000) return { label: 'Çekirdek Kelime', color: 'amber' };
  if (freq >= 250) return { label: 'Çok Sık', color: 'orange' };
  return { label: 'Yaygın', color: 'indigo' };
};

export const KelimeKarti: React.FC<KelimeKartiProps> = ({
  data,
  onClick,
  favoriMi = false,
  onFavoriToggle,
}) => {
  if (!data) return null;

  const ilkAnlamMetin = getAnlamMetin(data);
  const kaynaklar = data.kaynaklar || [];
  const ilkKaynak = kaynaklar[0];
  const frekansRozeti = getFrekansRozeti(data.corpusFrequency);
  const dialectDisplay = resolveDialectVariantDisplay({
    form: data.kelime || data.form,
    dialect: data.dialect || data.lehce,
    dialectVariants: data.dialectVariants,
  });

  const handleFavoriClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFavoriToggle?.(e);
  };

  const headword = data.kelime || data.form || '—';

  return (
    <Card
      size="2"
      variant="surface"
      asChild
      className="relative w-full text-left transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--accent-8)] cursor-pointer group"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`${headword} — detayları görüntüle`}
      >
        <Flex direction="column" gap="2">
          <Flex align="baseline" gap="2" wrap="wrap" pr="7">
            <Heading as="h3" size="5" weight="bold">{headword}</Heading>
            {data.ipa && (
              <Text size="2" color="gray" className="font-mono" aria-label={`Fonetik: ${data.ipa}`}>
                /{data.ipa.replace(/^\/+|\/+$/g, '')}/
              </Text>
            )}
          </Flex>

          <Flex align="center" gap="2" wrap="wrap">
            {lehceTR(data.dialect || data.lehce) && (
              <Badge size="1" color="amber" variant="soft" highContrast>
                {lehceTR(data.dialect || data.lehce)}
              </Badge>
            )}
            {posTR(data.partOfSpeech) && (
              <Badge size="1" color="gray" variant="surface" highContrast>
                {posTR(data.partOfSpeech)}
              </Badge>
            )}
          </Flex>

          <Text as="p" size="2" weight="medium" className="line-clamp-2 leading-relaxed">
            {ilkAnlamMetin}
          </Text>

          {dialectDisplay && dialectDisplay.hasDifference && (
            <Flex wrap="wrap" align="center" gap="2">
              <Badge size="1" color="amber" variant="surface" highContrast>
                <Text size="1" weight="bold">ADY:</Text> {dialectDisplay.adyghePrimary}
                {dialectDisplay.adygheAlternatives[0] ? ` (${dialectDisplay.adygheAlternatives[0].form})` : ''}
              </Badge>
              <Badge size="1" color="sky" variant="surface" highContrast>
                <Text size="1" weight="bold">KBD:</Text> {dialectDisplay.kabardianPrimary}
              </Badge>
            </Flex>
          )}

          <Flex wrap="wrap" align="center" gap="2">
            {kaynaklar.length > 0 && (
              <Badge size="1" color="jade" variant="soft" highContrast>
                <BookOpen className="w-3 h-3" aria-hidden="true" />
                {kaynaklar.length} sözlükte kayıtlı
              </Badge>
            )}

            {frekansRozeti && (
              <Badge size="1" color={frekansRozeti.color} variant="soft" highContrast>
                {frekansRozeti.label}
              </Badge>
            )}

            {data.wordFamilyId && (
              <Badge size="1" color="indigo" variant="soft" highContrast>
                <Sprout className="w-3 h-3" aria-hidden="true" />
                Aile Üyesi
              </Badge>
            )}

            {data.conceptId && (
              <Badge asChild size="1" color="gray" variant="soft" highContrast>
                <Link
                  href={`/kavram/${data.conceptId.toLowerCase()}`}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Kavram sayfasına git: ${data.conceptId}`}
                >
                  <Tag className="w-3 h-3" aria-hidden="true" />
                  {data.conceptId}
                </Link>
              </Badge>
            )}
          </Flex>

          {ilkKaynak && (
            <Box pr="7">
              <Text size="1" color="gray" className="block truncate">
                {formatKaynakDetayi(ilkKaynak)}
              </Text>
            </Box>
          )}
        </Flex>

        {onFavoriToggle && (
          <Box className="absolute top-3 right-3">
            <IconButton
              type="button"
              size="1"
              variant={favoriMi ? 'soft' : 'ghost'}
              color={favoriMi ? 'amber' : 'gray'}
              highContrast
              onClick={handleFavoriClick}
              aria-pressed={favoriMi}
              aria-label={favoriMi ? 'Favoriden çıkar' : 'Favoriye ekle'}
            >
              <Star
                size={16}
                fill={favoriMi ? 'currentColor' : 'none'}
                strokeWidth={favoriMi ? 0 : 2}
                aria-hidden="true"
              />
            </IconButton>
          </Box>
        )}

        <Box
          className="absolute bottom-3 right-3 text-[var(--gray-9)] group-hover:text-[var(--accent-11)] transition-colors"
          aria-hidden="true"
        >
          <ChevronRight size={18} strokeWidth={2.5} />
        </Box>
      </div>
    </Card>
  );
};

export default KelimeKarti;
