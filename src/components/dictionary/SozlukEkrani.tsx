'use client';

import { useState, useCallback, useMemo, useRef } from 'react';
import SearchBox from '@/components/dictionary/SearchBox';
import KelimeKarti from '@/components/dictionary/KelimeKarti';
import KelimeDetayDrawer from '@/components/ui/KelimeDetayDrawer';
import GununKelimesiKart from '@/components/dictionary/GununKelimesiKart';
import DialectFilter, {
  type DialectFilterValue,
} from '@/components/dictionary/DialectFilter';
import LanguageFilter, {
  type LanguageFilterValue,
} from '@/components/dictionary/LanguageFilter';
import FilterDropdown from '@/components/dictionary/FilterDropdown';
import AramaGecmisi from '@/components/dictionary/AramaGecmisi';
import { normalizeDialect } from '@/lib/normalizers/dialectNormalizer';
import { normalizeLanguage } from '@/lib/normalizers/languageNormalizer';
import { resolveSourceMetadata } from '@/lib/normalizers/sourceMetadataResolver';
import { useAramaGecmisi } from '@/hooks/useAramaGecmisi';
import type { KelimeItem } from '@/components/dictionary/KelimeKarti';
import { useFavoriler } from '@/hooks/useFavoriler';
import { useKlavyeKisayollari } from '@/hooks/useKlavyeKisayollari';
import type { DictionaryEntry } from '@/types/dictionary';

export default function SozlukEkrani() {
  const [sonuclar, setSonuclar] = useState<KelimeItem[]>([]);
  const [yukleniyor, setYukleniyor] = useState<boolean>(false);
  const [toplam, setToplam] = useState<number>(0);
  const [seciliKelime, setSeciliKelime] = useState<DictionaryEntry | null>(null);
  const [drawerAcik, setDrawerAcik] = useState<boolean>(false);
  const [aramaMetni, setAramaMetni] = useState<string>('');
  const [tumunuGoster, setTumunuGoster] = useState<boolean>(false);
  const [klavyeAcik, setKlavyeAcik] = useState<boolean>(false);
  const aramaInputRef = useRef<HTMLInputElement>(null);

  const [dialectFilter, setDialectFilter] = useState<DialectFilterValue>('ALL');  const [languageFilter, setLanguageFilter] = useState<LanguageFilterValue>('ALL');
  

  // ⭐ Favoriler
    // ⭐ Favoriler
  const { favoriMi, favoriToggle } = useFavoriler();

  // ⭐ Klavye Kısayolları
  useKlavyeKisayollari({
    onAramaOdak: () => {
      aramaInputRef.current?.focus();
    },
    onKlavyeToggle: () => {
      setKlavyeAcik((v) => !v);
    },
    onEscape: () => {
      setDrawerAcik(false);
    },
  });

  const {
    gecmis,
    ekle: gecmiseEkle,
    sil: gecmistenSil,
    temizle: gecmisiTemizle,
  } = useAramaGecmisi();

  const handleSearch = useCallback(
    async (query: string, mode: string = 'baslayan') => {
      if (!query.trim()) {
        setSonuclar([]);
        setAramaMetni('');
        return;
      }

      setYukleniyor(true);
      setAramaMetni(query);
      setTumunuGoster(false);
      setDialectFilter('ALL');
      setLanguageFilter('ALL');

      gecmiseEkle(query);

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
                entry.lemma ||
                '';

              // ANLAMLARI TOPLA
              const anlamlarSet = new Set<string>();

              if (Array.isArray(entry.meanings)) {
                entry.meanings.forEach((m: any) => {
                  const text = m?.text || m?.value || m?.meaning || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              if (Array.isArray(entry.definitions)) {
                entry.definitions.forEach((d: any) => {
                  const text = d?.meaning || d?.tanim || d?.text || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              if (Array.isArray(entry.kaynaklar)) {
                entry.kaynaklar.forEach((k: any) => {
                  const text = k?.anlam || k?.meaning || '';
                  if (text.trim()) anlamlarSet.add(text.trim());
                });
              }

              const tekilAnlam =
                entry.anlam ||
                entry.translation ||
                entry.definition ||
                entry.meaning ||
                entry.tanim ||
                '';
              if (tekilAnlam.trim()) anlamlarSet.add(tekilAnlam.trim());

              const anlamlar = Array.from(anlamlarSet);
              const ilkAnlam = anlamlar[0] || '';

              const kaynakDialect = entry.kaynaklar?.[0]?.sourceFile
                ? resolveSourceMetadata(entry.kaynaklar[0].sourceFile).dialect
                : null;

              return {
                id: entry.id || `${query}-${idx}`,
                kelime: word,
                madde: entry.headword || word,
                anlam: ilkAnlam,
                ilkAnlam,
                anlamlar,
                kaynaklar: entry.kaynaklar || [],
                lehce: kaynakDialect || entry.dialect || entry.lehce || 'ADY',
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
    [gecmiseEkle]
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
        kelime.anlamlar?.map((anlam) => ({ meaning: anlam, tanim: anlam })) ||
        [],
      kaynaklar: kelime.kaynaklar || [],
      lehce: kelime.lehce || 'ADY',
      dialect: kelime.lehce || 'ADY',
      group: kelime.kaynaklar?.[0] as any,
    };

    setSeciliKelime(dictionaryEntry);
    setDrawerAcik(true);
  };

  const filtrelenmisSonuclar = useMemo(() => {
    return sonuclar.filter((kelime) => {
      if (dialectFilter !== 'ALL') {
        const canonical = normalizeDialect(kelime.lehce);
        if (canonical !== dialectFilter) return false;
      }

      if (languageFilter !== 'ALL') {
        const ilkKaynak = kelime.kaynaklar?.[0];
        const targetLang = ilkKaynak?.sourceFile
          ? resolveSourceMetadata(ilkKaynak.sourceFile).targetLanguage
          : null;
        const canonical = normalizeLanguage(targetLang);
        if (canonical !== languageFilter) return false;
      }

      return true;
    });
  }, [sonuclar, dialectFilter, languageFilter]);

  const dialectCounts = useMemo(() => {
    const counts: Record<DialectFilterValue, number> = {
      ALL: sonuclar.length,
      ADY: 0,
      KBD: 0,
    };

    sonuclar.forEach((kelime) => {
      const canonical = normalizeDialect(kelime.lehce);
      if (canonical === 'ADY') counts.ADY++;
      else if (canonical === 'KBD') counts.KBD++;
    });

    return counts;
  }, [sonuclar]);

  const languageCounts = useMemo(() => {
    const counts: Record<LanguageFilterValue, number> = {
      ALL: sonuclar.length,
      TR: 0,
      EN: 0,
      RU: 0,
      AR: 0,
      CIRC: 0,
      MULTI: 0,
    };

    sonuclar.forEach((kelime) => {
      const ilkKaynak = kelime.kaynaklar?.[0];
      const targetLang = ilkKaynak?.sourceFile
        ? resolveSourceMetadata(ilkKaynak.sourceFile).targetLanguage
        : null;
      const canonical = normalizeLanguage(targetLang);

      if (canonical === 'TR') counts.TR++;
      else if (canonical === 'EN') counts.EN++;
      else if (canonical === 'RU') counts.RU++;
      else if (canonical === 'AR') counts.AR++;
    });

    return counts;
  }, [sonuclar]);

  const bosArama = sonuclar.length === 0 && !aramaMetni && !yukleniyor;
  const goruntulenenSonuclar = tumunuGoster
    ? filtrelenmisSonuclar
    : filtrelenmisSonuclar.slice(0, 3);
  const dahaFazlaSonucVarmi =
    filtrelenmisSonuclar.length > 3 && !tumunuGoster;

  return (
    <div className="w-full flex-1 bg-[#fbf8ef] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-3 py-3 space-y-3">
        <div className="bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-700 rounded-2xl shadow-md ring-1 ring-amber-100/80 dark:ring-amber-500/10 p-3 sm:p-5">
          <SearchBox
            onSearch={handleSearch}
            inputRef={aramaInputRef}
            klavyeAcik={klavyeAcik}
            setKlavyeAcik={setKlavyeAcik}
            filterSlot={
              sonuclar.length > 1 ? (
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
              ) : null
            }
          />
        </div>

        {gecmis.length > 0 && !aramaMetni && (
          <AramaGecmisi
            gecmis={gecmis}
            onSec={(sorgu) => {
              handleSearch(sorgu, 'baslayan');
            }}
            onSil={gecmistenSil}
            onTemizle={gecmisiTemizle}
          />
        )}

        {bosArama && (
          <div className="animate-in fade-in duration-300">
            <GununKelimesiKart />
          </div>
        )}

        {yukleniyor && (
          <div className="flex justify-center items-center py-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-spin" />
                <div className="absolute inset-1 bg-[#fbf8ef] dark:bg-slate-950 rounded-full" />
              </div>
              <p className="text-xs text-stone-600 dark:text-slate-400 font-medium">
                Aranıyor...
              </p>
            </div>
          </div>
        )}

        {sonuclar.length > 0 && (
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xs sm:text-sm font-bold text-stone-800 dark:text-slate-200">
              Sonuçlar ({filtrelenmisSonuclar.length}
              {(dialectFilter !== 'ALL' || languageFilter !== 'ALL') &&
                ` / ${sonuclar.length}`})
            </h2>
          </div>
        )}

        <div className="space-y-2">
          {goruntulenenSonuclar.map((kelime, index) => (
                        <KelimeKarti
              key={kelime.id ?? `kelime-${index}`}
              data={kelime}
              onClick={() => handleKelimeSec(kelime)}
              favoriMi={favoriMi(kelime.id)}
              onFavoriToggle={() =>
                favoriToggle({
                  id: kelime.id,
                  kelime: kelime.kelime,
                  anlam: kelime.anlam || kelime.ilkAnlam || '',
                  lehce: kelime.lehce,
                  tarih: new Date().toISOString(),
                })
              }
            />
          ))}
        </div>

        {!yukleniyor &&
          aramaMetni &&
          sonuclar.length > 0 &&
          filtrelenmisSonuclar.length === 0 && (
            <div className="text-center py-6 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-stone-200/60 dark:border-slate-800">
              <div className="text-2xl mb-2">🌐</div>
              <h3 className="text-sm font-semibold text-stone-800 dark:text-slate-200 mb-1">
                Bu filtrelerde sonuç yok
              </h3>
              <p className="text-xs text-stone-500 dark:text-slate-400">
                Farklı bir lehçe veya dil seçmeyi deneyin.
              </p>
            </div>
          )}

        {dahaFazlaSonucVarmi && (
          <div className="flex justify-center pt-1">
            <button
              onClick={() => setTumunuGoster(true)}
              className="px-4 py-2 text-xs bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              📂 Tüm Sonuçları Göster ({filtrelenmisSonuclar.length - 3} daha)
            </button>
          </div>
        )}

        {!yukleniyor && aramaMetni && sonuclar.length === 0 && (
          <div className="text-center py-8 bg-white/50 dark:bg-slate-900/50 rounded-xl border border-stone-200/60 dark:border-slate-800">
            <div className="text-3xl mb-2">🔍</div>
            <h3 className="text-sm font-semibold text-stone-800 dark:text-slate-200 mb-1">
              Sonuç bulunamadı
            </h3>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              Lütfen arama terimini kontrol edin ve tekrar deneyin.
            </p>
          </div>
        )}

        <KelimeDetayDrawer
          isOpen={drawerAcik}
          onClose={() => setDrawerAcik(false)}
          seciliKelime={seciliKelime}
        />
      </div>
    </div>
  );
}