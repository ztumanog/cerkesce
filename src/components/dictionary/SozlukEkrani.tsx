'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import SearchBox from '@/components/dictionary/SearchBox';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import KelimeDetayDrawer from '@/components/ui/KelimeDetayDrawer';
import GununKelimesiKart from '@/components/dictionary/GununKelimesiKart';
import {
  type DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import FilterDropdown from '@/components/dictionary/FilterDropdown';
import {
  type LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';
import type { KelimeItem } from '@/components/dictionary/KelimeKarti';
import type { DictionaryEntry } from '@/types/dictionary';

import dictionariesData from '@/data/dictionaries.json';

const DICT_ARRAY: any[] = Array.isArray(dictionariesData)
  ? (dictionariesData as any[])
  : ((dictionariesData as any)?.default ?? []);

const DICT_MAP = new Map<string, any>(
  DICT_ARRAY.map((d) => [d.file, d])
);

function getMeta(k: any) {
  if (!k) return null;
  const file =
    typeof k === 'string' ? k : k.sourceFile || k.file || '';
  return file ? DICT_MAP.get(file) ?? null : null;
}

function normalizeLang(lang?: string | null): LanguageFilterValue {
  if (!lang) return 'ALL';
  const c = String(lang).trim().toLowerCase();
  if (c === 'tr' || c.startsWith('tr')) return 'TR';
  if (c === 'en' || c.startsWith('en')) return 'EN';
  if (c === 'ru' || c.startsWith('ru')) return 'RU';
  if (c === 'ar' || c.startsWith('ar')) return 'AR';
  return 'ALL';
}

function getLangFromDict(d: any): LanguageFilterValue {
  const src = String(d.sourceLanguage || '').toLowerCase();
  const tgt = String(d.targetLanguage || '').toLowerCase();
  const isCirc = (l: string) => l === 'ady' || l === 'kbd';

  if (d.file === '18.Kbd-Ru&En.json') return 'MULTI';
  if (isCirc(src) && isCirc(tgt)) return 'CIRC';

  const other = !isCirc(src) ? src : tgt;

  if (other === 'tr') return 'TR';
  if (other === 'en') return 'EN';
  if (other === 'ru') return 'RU';
  if (other === 'ar') return 'AR';
  return 'ALL';
}

export default function SozlukEkrani() {
  const [sonuclar, setSonuclar] = useState<KelimeItem[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [toplam, setToplam] = useState(0);
  const [seciliKelime, setSeciliKelime] = useState<DictionaryEntry | null>(null);
  const [drawerAcik, setDrawerAcik] = useState(false);
  const [aramaMetni, setAramaMetni] = useState('');
  const ilkAramaYapildi = useRef(false);
  const [tumunuGoster, setTumunuGoster] = useState(false);

  const [dialectFilter, setDialectFilter] = useState<DialectFilterValue>('ALL');
  const [languageFilter, setLanguageFilter] = useState<LanguageFilterValue>('ALL');

  const handleSearch = useCallback(
    async (query: string, mode: string = 'baslayan') => {
      if (!query.trim()) {
        setSonuclar([]);
        setAramaMetni('');
        setToplam(0);
        return;
      }

      setYukleniyor(true);
      setAramaMetni(query);
      setTumunuGoster(false);

      if (ilkAramaYapildi.current) {
        setDialectFilter('ALL');
        setLanguageFilter('ALL');
      }
      ilkAramaYapildi.current = true;

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&mode=${mode}`
        );
        const data = await response.json();

        if (data.success && data.results && Array.isArray(data.results)) {
          const results: KelimeItem[] = data.results.map(
            (entry: any, idx: number) => {
              const word =
                entry.spelling ||
                entry.word ||
                entry.kelime ||
                entry.headword ||
                '';

              let meaning = '';

              if (Array.isArray(entry.anlamlar) && entry.anlamlar.length > 0) {
                const first = entry.anlamlar[0];
                meaning =
                  typeof first === 'string'
                    ? first
                    : first?.metin || first?.anlam || first?.text || '';
              }

              if (!meaning && Array.isArray(entry.definitions) && entry.definitions.length > 0) {
                meaning =
                  entry.definitions[0]?.meaning ||
                  entry.definitions[0]?.tanim ||
                  '';
              }

              if (!meaning) {
                meaning =
                  entry.ilkAnlam ||
                  entry.anlam ||
                  entry.translation ||
                  entry.definition ||
                  entry.meaning ||
                  entry.tanim ||
                  '';
              }

              return {
                id: entry.id || `${query}-${idx}`,
                kelime: word,
                madde: entry.headword || word,
                anlam: meaning,
                ilkAnlam: meaning,
                anlamlar: [meaning].filter(Boolean),
                kaynaklar: entry.kaynaklar || [],
                lehce: entry.dialect || entry.lehce || 'ADY',
                kaynakAdlari: (() => {
                  const adlar = new Set<string>();
                  (entry.kaynaklar || []).forEach((k: any) => {
                    const meta = getMeta(k);
                    if (meta) {
                      adlar.add(meta.shortLabel || meta.title || meta.file);
                    }
                  });
                  return Array.from(adlar);
                })(),
              };
            }
          );

          setSonuclar(results);
          setToplam(results.length);
        } else {
          setSonuclar([]);
          setToplam(0);
        }
      } catch (error) {
        console.error('Arama hatası:', error);
        setSonuclar([]);
        setToplam(0);
      } finally {
        setYukleniyor(false);
      }
    },
    []
  );

  const handleKelimeSec = (kelime: KelimeItem) => {
    const dictionaryEntry: DictionaryEntry = {
      id: kelime.id,
      word: kelime.kelime,
      meaning: kelime.anlam || kelime.ilkAnlam || '',
      anlam: kelime.anlam || kelime.ilkAnlam || '',
      definition: kelime.anlam || kelime.ilkAnlam || '',
      tanim: kelime.anlam || kelime.ilkAnlam || '',
      definitions:
        kelime.anlamlar?.map((anlam) => ({ meaning: anlam, tanim: anlam })) || [],
      kaynaklar: kelime.kaynaklar || [],
      lehce: kelime.lehce || 'ADY',
      dialect: kelime.lehce || 'ADY',
      group: kelime.kaynaklar?.[0] as any,
    };

    setSeciliKelime(dictionaryEntry);
    setDrawerAcik(true);
  };

  // ⭐ Filtrelenmiş sonuçlar
  const filtrelenmisSonuclar = useMemo(() => {
    return sonuclar.filter((kelime) => {
      const kaynaklar = kelime.kaynaklar || [];

      // 1. Dil filtresi
      if (languageFilter !== 'ALL') {
        const hasLang = kaynaklar.some((k: any) => {
          const meta = getMeta(k);
          if (!meta) return false;

          const src = String(meta.sourceLanguage || '').toLowerCase();
          const tgt = String(meta.targetLanguage || '').toLowerCase();
          const isCirc = (l: string) => l === 'ady' || l === 'kbd';

          if (languageFilter === 'MULTI') {
            return meta.file === '18.Kbd-Ru&En.json';
          }
          if (languageFilter === 'CIRC') {
            return isCirc(src) && isCirc(tgt);
          }

          const other = !isCirc(src) ? src : tgt;
          return other === languageFilter.toLowerCase();
        });
        if (!hasLang) return false;
      }

      // 2. Lehçe filtresi
      if (dialectFilter !== 'ALL') {
        const hasDialect = kaynaklar.some((k: any) => {
          const meta = getMeta(k);
          if (!meta) return false;
          const d = String(meta.dialect || '').toLowerCase();
          if (dialectFilter === 'KBD') {
            return d === 'dogu' || d === 'kbd';
          }
          if (dialectFilter === 'ADY') {
            return d === 'western' || d === 'ady';
          }
          return false;
        });
        if (!hasDialect) return false;
      }

      return true;
    });
  }, [sonuclar, dialectFilter, languageFilter]);

  // ⭐ Lehçe sayıları (her zaman dictionaries.json'dan)
  const dialectCounts = useMemo(() => {
    const counts: Record<DialectFilterValue, number> = {
      ALL: 0,
      ADY: 0,
      KBD: 0,
    };

    DICT_ARRAY.forEach((d: any) => {
      const dl = String(d.dialect || '').toLowerCase();
      if (dl === 'dogu' || dl === 'kbd') counts.KBD++;
      else if (dl === 'western' || dl === 'ady') counts.ADY++;
    });

    counts.ALL = counts.ADY + counts.KBD;
    return counts;
  }, []);

  // ⭐ Dil sayıları (her zaman dictionaries.json'dan)
  const languageCounts = useMemo(() => {
    const counts: Record<LanguageFilterValue, number> = {
      ALL: 0,
      CIRC: 0,
      TR: 0,
      EN: 0,
      RU: 0,
      AR: 0,
      MULTI: 0,
    };

    DICT_ARRAY.forEach((d: any) => {
      const lang = getLangFromDict(d);
      if (lang !== 'ALL') counts[lang]++;
    });

    counts.ALL =
      counts.CIRC + counts.TR + counts.EN +
      counts.RU + counts.AR + counts.MULTI;

    return counts;
  }, []);

  const bosArama = sonuclar.length === 0 && !aramaMetni && !yukleniyor;
  const goruntulenenSonuclar = tumunuGoster
    ? filtrelenmisSonuclar
    : filtrelenmisSonuclar.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6">
      <SearchBox
        onSearch={handleSearch}
        filterSlot={
          <FilterDropdown
            activeCount={
              (dialectFilter !== 'ALL' ? 1 : 0) +
              (languageFilter !== 'ALL' ? 1 : 0)
            }
            dialectFilter={dialectFilter}
            onDialectChange={setDialectFilter}
            dialectCounts={dialectCounts}
            languageFilter={languageFilter}
            onLanguageChange={setLanguageFilter}
            languageCounts={languageCounts}
          />
        }
      />

      {bosArama && <GununKelimesiKart />}

      {yukleniyor && (
        <div className="text-center py-8 text-slate-500 font-medium">
          Aranıyor…
        </div>
      )}

      {!yukleniyor && sonuclar.length > 0 && (
        <div className="flex items-center justify-between border-b pb-2 dark:border-slate-800">
          <h2 className="text-base font-bold text-slate-800 dark:text-slate-200">
            Sonuçlar ({filtrelenmisSonuclar.length} / {toplam})
          </h2>
        </div>
      )}

      {!yukleniyor && (
        <div className="flex flex-col gap-3">
          {goruntulenenSonuclar.map((kelime, index) => (
            <KelimeKarti
              key={`${kelime.id}-${index}`}
              data={kelime}
              onClick={() => handleKelimeSec(kelime)}
            />
          ))}
        </div>
      )}

      {!tumunuGoster && filtrelenmisSonuclar.length > 5 && (
        <div className="flex justify-center">
          <button
            onClick={() => setTumunuGoster(true)}
            className="px-4 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors"
          >
            📂 Tüm Sonuçları Göster ({filtrelenmisSonuclar.length - 5} daha)
          </button>
        </div>
      )}

      <KelimeDetayDrawer
        open={drawerAcik}
        onClose={() => setDrawerAcik(false)}
        seciliKelime={seciliKelime}
        dialectFilter={dialectFilter}
        languageFilter={languageFilter}
      />
    </div>
  );
}