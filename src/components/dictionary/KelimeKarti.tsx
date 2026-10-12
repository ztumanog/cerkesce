// src/components/dictionary/KelimeKarti.tsx
'use client';

import React from 'react';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';
import { KaynakItem } from "@/types/dictionary";

/* ADR-0026 · Aşama 2 — POS Türkçe karşılıkları */
const POS_TR: Record<string, string> = {
  noun: 'isim',
  verb: 'fiil',
  'transitive verb': 'geçişli fiil',
  'intransitive verb': 'geçişsiz fiil',
  adjective: 'sıfat',
  'attr': 'niteleyici',
  'attr.': 'niteleyici',
  adverb: 'zarf',
  'adv': 'zarf',
  'adv.': 'zarf',
  numeral: 'sayı',
  pronoun: 'zamir',
  'pron.': 'zamir',
  conjunction: 'bağlaç',
  interjection: 'ünlem',
  'int': 'ünlem',
  'int.': 'ünlem',
  particle: 'ilgeç',
  'part': 'ilgeç',
  'part.': 'ilgeç',
  possessive_prefix: 'iyelik öneki',
};

const posTR = (p?: string | null): string | null =>
  p ? (POS_TR[p] ?? p) : null;

/* Lehçe Türkçe karşılıkları */
const LEHCE_TR: Record<string, string> = {
  'western': 'Batı',
  'eastern': 'Doğu',
  'dogu': 'Doğu',
  'bati': 'Batı',
  'kbd': 'KBD',
  'ady': 'ADY',
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

const decodeHtmlEntities = (str: string): string => {
  if (!str) return '';
  let text = String(str);
  text = text.replace(/&lt;.*?&gt;/gi, ' ');
  text = text.replace(/<[^>]+>/g, ' ');
  text = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
  return text.replace(/\s+/g, ' ').trim();
};

/* ===== ADR-0027: MEANING SANITIZATION ===== */
/* Ham kaynak metninden yalnızca ilk anlamı çıkarır */
const sanitizeAnlam = (html: string): string => {
  if (!html) return '—';

  let text = String(html);

  // 1. Örnek cümleleri kaldır: <div style='margin-left:3em'>...</div>
  text = text.replace(/<div[^>]*margin-left:\s*3em[^>]*>.*?<\/div>/gi, ' ');

  // 2. Anlam numaralarını kaldır: <font color='sienna'>I</font>, II, vb.
  text = text.replace(/<font[^>]*color=['"]sienna['"][^>]*>.*?<\/font>/gi, ' ');

  // 3. POS etiketlerini kaldır: <i class='p'><font color='green'>...</font></i>
  text = text.replace(/<i[^>]*class=['"]p['"][^>]*>.*?<\/i>/gi, ' ');

  // 4. Çekim eklerini kaldır: <i>(...)</i>
  text = text.replace(/<i>\s*\([^)]*\)\s*<\/i>/gi, ' ');

  // 5. Diğer HTML etiketlerini kaldır
  text = text.replace(/<[^>]+>/g, ' ');

  // 6. HTML entity'lerini çöz
  text = text
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");

  // 6b. Örnek cümleyi (◊ sonrası) ve gönderme/eşanlamlı kısmını ( " / ..." ) at.
  //     Boşluk toplama adımından ÖNCE yapılmalı, çünkü satır sonuna (\n) bakıyor.
  text = text.split('◊')[0];
  text = text.split(/\s\/(?:\s|$)/)[0];

  // 7. Fazla boşlukları temizle
  text = text.replace(/\s+/g, ' ').trim();

  // 7b. Parantez içi boşlukları düzelt: "( о внешнем виде )" → "(о внешнем виде)"
  text = text.replace(/\(\s+/g, '(').replace(/\s+\)/g, ')');

  // 8. Baştaki/sondaki noktalama işaretlerini temizle
  text = text.replace(/^[\s,;:.\-–—]+/, '').replace(/[\s,;:.\-–—]+$/, '');

  // 9. İlk virgülden sonrasını kırp (çoklu anlamlar için)
  //    Örn: "взвешенный, -ая, -ое" → "взвешенный"
  const firstComma = text.indexOf(',');
  if (firstComma > 0 && firstComma < 40) {
    text = text.slice(0, firstComma).trim();
  }

  // 10. Çok uzunsa kırp
  if (text.length > 80) {
    const truncated = text.slice(0, 80);
    const lastSpace = truncated.lastIndexOf(' ');
    text = truncated.slice(0, lastSpace > 50 ? lastSpace : 80) + '…';
  }

  return text || '—';
};

/* Türkçe karşılık (ilkAnlam / literalMeaning): virgülle ayrılmış eş anlamlıları
   ("su, nehir") bozmadan sadece boşlukları toplar ve uzunsa kısaltır. */
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
  // Öncelik sırası:
  // 1. ilkAnlam        (Türkçe karşılık, API'de translations.tr'den gelir)
  // 2. literalMeaning  (Türkçe gloss)
  // 3. anlamlar[0]     (ham kaynak metni — sanitize edilir)
  // 4. anlam
  // 5. full_definition_in_html
  const turkce = data.ilkAnlam || data.literalMeaning;
  if (typeof turkce === 'string' && turkce.trim()) {
    return kisaltTurkce(turkce);
  }

  const rawAnlam =
    data.anlamlar?.[0] ||
    data.anlam ||
    data.full_definition_in_html;
  if (!rawAnlam) return '—';
  if (typeof rawAnlam === 'string') {
    return sanitizeAnlam(rawAnlam);
  }
  return '—';
};

const formatKaynakDetayi = (kaynakItem: unknown): string => {
  if (!kaynakItem) return '';
  if (typeof kaynakItem === 'string') return kaynakItem;
  if (typeof kaynakItem === 'object') {
    const itemObj = kaynakItem as Record<string, unknown>;
    const sourceObj = (itemObj.kaynak || itemObj) as Record<string, unknown>;
    const title = String(sourceObj.title || sourceObj.sözlük || sourceObj.kaynak || sourceObj.dictionaryName || sourceObj.name || '');
    const year = String(sourceObj.year || sourceObj.yil || '');
    const detaylar = [title, year].filter(Boolean);
    return detaylar.join(' ') || 'Bilinmeyen Kaynak';
  }
  return 'Bilinmeyen Kaynak';
};

/* ===== ATRAKSİYON ROZETLERİ ===== */

const getFrekansRozeti = (freq?: number): { label: string; className: string } | null => {
  if (!freq || freq < 50) return null;
  if (freq >= 1000) return {
    label: '⭐ Çekirdek Kelime',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
  };
  if (freq >= 250) return {
    label: '🔥 Çok Sık',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  };
  return {
    label: '📌 Yaygın',
    className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
  };
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

  const handleFavoriClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    onFavoriToggle?.(e);
  };

  return (
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
      aria-label={`${data.kelime || data.form || 'Kelime'} — detayları görüntüle`}
      className="relative w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all hover:border-emerald-500 dark:hover:border-emerald-600 group cursor-pointer"
    >
      {/* Kelime + IPA */}
      <div className="flex items-baseline gap-2 mb-1.5 pr-10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {data.kelime || data.form || '—'}
        </h3>
        {data.ipa && (
          <span className="text-sm font-mono text-slate-500 dark:text-slate-400">
            /{data.ipa}/
          </span>
        )}
      </div>

      {/* Lehçe + POS */}
      <div className="flex items-center gap-3 mb-2 flex-wrap">
        {lehceTR(data.dialect || data.lehce) && (
          <span className="inline-block px-2 py-0.5 text-[11px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-md">
            {lehceTR(data.dialect || data.lehce)}
          </span>
        )}
        {posTR(data.partOfSpeech) && (
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {posTR(data.partOfSpeech)}
          </span>
        )}
      </div>

      {/* Anlam — ADR-0027 ile temizlendi */}
      <div className="text-sm text-gray-700 dark:text-gray-200 mb-2.5 leading-relaxed line-clamp-2">
        {ilkAnlamMetin}
      </div>

      {/* Keşif Rozetleri — Kanıt → Önem → İlişki */}
      <div className="flex flex-wrap items-center gap-1.5 mb-2">
        {kaynaklar.length > 0 && (
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 font-medium">
            📖 {kaynaklar.length} sözlükte kayıtlı
          </span>
        )}

        {frekansRozeti && (
          <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ${frekansRozeti.className}`}>
            {frekansRozeti.label}
          </span>
        )}

        {data.wordFamilyId && (
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 font-medium">
            🌿 Aile Üyesi
          </span>
        )}

        {data.conceptId && (
          <Link
            href={`/kavram/${data.conceptId.toLowerCase()}`}
            onClick={(e) => e.stopPropagation()}
            className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 font-medium transition-colors"
          >
            🏷️ {data.conceptId}
          </Link>
        )}
      </div>

      {/* Kaynak Detayı */}
      {ilkKaynak && (
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400 pr-8 max-w-full overflow-hidden">
          <span className="truncate">{formatKaynakDetayi(ilkKaynak)}</span>
        </div>
      )}

      {/* Favori Butonu */}
      {onFavoriToggle && (
        <button
          type="button"
          onClick={handleFavoriClick}
          aria-label={favoriMi ? 'Favoriden çıkar' : 'Favoriye ekle'}
          className={`absolute top-3 right-3 p-1.5 rounded-full transition-all active:scale-90 ${
            favoriMi
              ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
              : 'text-gray-400 dark:text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
          }`}
        >
          <Star
            size={18}
            fill={favoriMi ? 'currentColor' : 'none'}
            strokeWidth={favoriMi ? 0 : 2}
          />
        </button>
      )}

      {/* Tıklanabilirlik göstergesi */}
      <div
        className="absolute bottom-3 right-3 flex items-center gap-0.5 text-gray-400 dark:text-gray-500 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors"
        aria-hidden="true"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </div>
    </div>
  );
};

export default KelimeKarti;