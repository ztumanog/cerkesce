'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import AkilliKlavye from '@/components/features/AkilliKlavye';
import type { KelimeItem } from '@/types/dictionary';

export interface DictionaryItem {
  id: string;
  name: string;
  author?: string;
  year?: string;
}

export interface DictionaryGroup {
  id: string;
  label: string;
  items: DictionaryItem[];
}

const DICTIONARY_GROUPS: DictionaryGroup[] = [
  {
    id: 'adigece',
    label: 'Adıgece',
    items: [
      { id: 'adg_aciklamali', name: 'Adıgece Açıklamalı Sözlük', author: 'A. A. Hatanov', year: '2006' },
      { id: 'adg_ru_apasev', name: 'Adıgece-Rusça Sözlük', author: 'Mirabil L. Apaşev', year: '2008' },
      { id: 'adg_ru_tharkaho', name: 'Adıgece-Rusça Sözlük', author: 'Yunus Tharkaho', year: '1991' },
      { id: 'adg_huvaj', name: 'Adıgece Sözlük', author: 'Fahri Huvaj', year: '2007' },
      { id: 'adg_teshu', name: 'Adıgece-Türkçe Sözlük', author: 'Teshu Mehmet Y. Çelikkıran', year: '1991' },
      { id: 'adg_diger', name: 'Diğer Adıgece Sözlükler' },
    ],
  },
  {
    id: 'kabardeyce',
    label: 'Kabardeyce',
    items: [
      { id: 'kbd_ru_apazhev', name: 'Kabardeyce-Rusça Sözlük', author: 'Apazhev & Bagov', year: '2008' },
      { id: 'kbd_jonty', name: 'Kabardeyce Dil Sözlüğü', author: 'Jonty Yamisha', year: '2010' },
      { id: 'kbd_ziwar', name: 'Kabardeyce-Türkçe Sözlük', author: 'Ziwar Bırseğ', year: '2005' },
      { id: 'kbd_diger', name: 'Diğer Kabardeyce Sözlükler' },
    ],
  },
  {
    id: 'tr_adg',
    label: 'Türkçe → Adıgece',
    items: [
      { id: 'tr_adg_huvaj', name: 'Türkçe-Adıgece Sözlük', author: 'Fahri Huvaj' },
      { id: 'tr_adg_hilmi', name: 'Türkçe-Adıgece Sözlük', author: 'Açumıj Hilmi', year: '2013' },
      { id: 'tr_adg_abaze', name: 'Türkçe-Adıgece Sözlük', author: 'Abaze Halil', year: '2000' },
      { id: 'tr_adg_teshu', name: 'Türkçe-Adıgece Sözlük', author: 'Teshu Mehmet Y. Çelikkıran', year: '1991' },
    ],
  },
  {
    id: 'ingilizce',
    label: 'İngilizce',
    items: [
      { id: 'en_adg', name: 'İngilizce - Adıgece Sözlük', author: 'Circassian Academy', year: '2015' },
      { id: 'en_kbd', name: 'İngilizce - Kabardeyce Sözlük', author: 'John Colarusso', year: '2003' },
    ],
  },
  {
    id: 'rusca',
    label: 'Rusça',
    items: [
      { id: 'ru_adg_genel', name: 'Rusça - Adıgece Genel Sözlük', author: 'Kerashev & Tharkaho', year: '1998' },
      { id: 'ru_kbd_genel', name: 'Rusça - Kabardeyce Genel Sözlük', author: 'Kardanov', year: '1957' },
    ],
  },
  {
    id: 'arapca',
    label: 'Arapça',
    items: [
      { id: 'ar_adg', name: 'Arapça - Adıgece Sözlük', author: 'Shami', year: '2011' },
      { id: 'ar_kbd', name: 'Arapça - Kabardeyce Sözlük', author: 'Amman Circassian Society', year: '2009' },
    ],
  },
];

interface SozlukFiltreMenuProps {
  selectedDictId?: string;
  onSelectDict?: (dictId: string, dictName: string) => void;
}

const SozlukFiltreMenu: React.FC<SozlukFiltreMenuProps> = ({
  selectedDictId = 'tumu',
  onSelectDict,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubgroup, setActiveSubgroup] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>('Sözlükler');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveSubgroup(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string, displayName: string) => {
    setSelectedName(displayName);
    onSelectDict?.(id, displayName);
    setIsOpen(false);
    setActiveSubgroup(null);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3 py-2 bg-stone-100 dark:bg-stone-800 text-zinc-800 dark:text-zinc-200 rounded-lg border border-stone-200 dark:border-stone-700 text-sm font-medium flex items-center justify-between gap-2 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors focus:outline-none"
      >
        <span className="truncate max-w-[140px] sm:max-w-[200px]">{selectedName}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-50 py-1 text-sm text-zinc-800 dark:text-zinc-200 animate-in fade-in zoom-in-95 duration-100">
          <button
            type="button"
            onClick={() => handleSelect('tumu', 'Sözlükler')}
            className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ${selectedDictId === 'tumu' ? 'font-semibold text-amber-600 dark:text-amber-400' : ''
              }`}
          >
            <span>Sözlükler</span>
            {selectedDictId === 'tumu' && <span className="text-amber-500 font-bold">✓</span>}
          </button>

          <div className="my-1 border-t border-stone-100 dark:border-stone-800" />

          {DICTIONARY_GROUPS.map((group) => {
            const isSubOpen = activeSubgroup === group.id;
            return (
              <div key={group.id} className="relative" onMouseEnter={() => setActiveSubgroup(group.id)}>
                <button
                  type="button"
                  onClick={() => setActiveSubgroup(isSubOpen ? null : group.id)}
                  className="w-full text-left px-3 py-2 flex items-center justify-between hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <span>{group.label}</span>
                  <ChevronDown size={14} className="text-zinc-400" />
                </button>

                {isSubOpen && (
                  <div
                    className="absolute left-full top-0 ml-1 w-72 sm:w-80 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl z-50 py-1 max-h-80 overflow-y-auto animate-in fade-in slide-in-from-left-1 duration-100"
                    onMouseLeave={() => setActiveSubgroup(null)}
                  >
                    {group.items.map((item) => {
                      const isSelected = selectedDictId === item.id;
                      const subtitle = [item.author, item.year].filter(Boolean).join(' • ');
                      const buttonDisplayName = item.author ? item.author : item.name;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelect(item.id, buttonDisplayName)}
                          className={`w-full text-left px-3.5 py-2.5 flex items-start justify-between hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border-b last:border-b-0 border-stone-100 dark:border-stone-800/50 ${isSelected ? 'bg-amber-50/50 dark:bg-amber-950/20' : ''
                            }`}
                        >
                          <div className="flex flex-col min-w-0 pr-2">
                            <span
                              className={`truncate font-medium text-xs sm:text-sm ${isSelected ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-zinc-800 dark:text-zinc-200'
                                }`}
                            >
                              {item.name}
                            </span>
                            {subtitle && (
                              <span className="truncate text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-normal mt-0.5">
                                {subtitle}
                              </span>
                            )}
                          </div>
                          {isSelected && <span className="text-amber-500 font-bold ml-1 flex-shrink-0 mt-0.5">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export interface SearchBoxProps {
  onResults?: (results: KelimeItem[], total: number, loading: boolean) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ onResults }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('baslayan');
  const [dialect, setDialect] = useState('tumu');
  const [targetLang, setTargetLang] = useState('hepsi');
  const [dict, setDict] = useState('tumu');
  const [isKlavyeOpen, setIsKlavyeOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onResultsRef = useRef(onResults);
  useEffect(() => {
    onResultsRef.current = onResults;
  }, [onResults]);

 const handleSearch = useCallback(async () => {
  if (!query.trim()) {
    onResultsRef.current?.([], 0, false);
    return;
  }

  onResultsRef.current?.([], 0, true);
  try {
    const params = new URLSearchParams({
      q: query,
      mode,
      dialect,
      targetLang,
      dict,
      page: '1',
      limit: '50',
    });
    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json();

    if (Array.isArray(data.results)) {
      const normalize = (s: string) =>
        s
          .trim()
          .toLowerCase()
          .replace(/\s+/g, ' ');

      // Daha akıllı gruplama anahtarı
const getGroupKey = (item: any): string => {
  const kelime = normalize(item.anaKelime || item.kelime || '');
  
  const hasCyrillic = (s: string) => /[\u0400-\u04FF]/.test(s);
  
  // Kelime zaten Kiril ise direkt kullan
  if (hasCyrillic(kelime)) return kelime;
  
  // Kelime Latin ise → anlamın sadece İLK Kiril kelimesini al
  const anlam = normalize(
    item.ilkAnlam ||
    (Array.isArray(item.anlamlar)
      ? typeof item.anlamlar[0] === 'string'
        ? item.anlamlar[0]
        : item.anlamlar[0]?.metin || ''
      : '') || ''
  );
  
  if (hasCyrillic(anlam)) {
    // Sadece ilk Kiril token'ı al
    const match = anlam.match(/^[\u0400-\u04FFIıӀ]+/);
    if (match) return match[0];
  }
  
  // Kiril yoksa kelimeyi direkt kullan
  return kelime;
};
      const grupMap = new Map<string, KelimeItem>();

      data.results.forEach((item: any) => {
        const anahtar = getGroupKey(item);
        if (!anahtar) return;

        if (grupMap.has(anahtar)) {
          const mevcut = grupMap.get(anahtar)!;

          // Kaynakları birleştir
          const yeniKaynaklar = item.kaynaklar || [];
          const mevcutSozlukler = new Set(
            mevcut.kaynaklar?.map(
              (k: any) => k.sözlük || k.title || k.kaynak || ''
            ) ?? []
          );

          yeniKaynaklar.forEach((k: any) => {
            const sozlukAdi = k.sözlük || k.title || k.kaynak || '';
            if (!mevcutSozlukler.has(sozlukAdi)) {
              mevcut.kaynaklar = [...(mevcut.kaynaklar || []), k];
              mevcutSozlukler.add(sozlukAdi);
            }
          });

          // Anlamları birleştir
          const yeniAnlamlar = Array.isArray(item.anlamlar)
            ? item.anlamlar
            : [];
          yeniAnlamlar.forEach((a: any) => {
            const anlamMetni =
              typeof a === 'string' ? a : a?.metin || '';
            if (anlamMetni && !mevcut.anlamlar?.includes(anlamMetni)) {
              mevcut.anlamlar = [...(mevcut.anlamlar || []), anlamMetni];
            }
          });

          // Latin yerine Kiril kelimeyi tercih et
          const mevcutKelime = mevcut.kelime || '';
          const yeniKelime = item.kelime || item.anaKelime || '';
          if (
            !/[\u0400-\u04FF]/.test(mevcutKelime) &&
            /[\u0400-\u04FF]/.test(yeniKelime)
          ) {
            mevcut.kelime = yeniKelime;
            mevcut.madde = item.anaKelime || yeniKelime;
          }
        } else {
          
          // data.results.forEach'dan önce:
if (process.env.NODE_ENV === 'development') {
  data.results.slice(0, 5).forEach((item: any) => {
    console.log('ITEM:', item.kelime, '| anaKelime:', item.anaKelime, '| KEY:', getGroupKey(item));
  });
}

          
          grupMap.set(anahtar, {
            id: item.id || item.kelime || '',
            kelime: item.kelime || '',
            madde: item.anaKelime || item.kelime || '',
            anlam:
              item.ilkAnlam ||
              (Array.isArray(item.anlamlar) && item.anlamlar[0]
                ? typeof item.anlamlar[0] === 'string'
                  ? item.anlamlar[0]
                  : item.anlamlar[0].metin
                : '') ||
              '',
            ilkAnlam: item.ilkAnlam,
            anlamlar: Array.isArray(item.anlamlar)
              ? item.anlamlar.map((a: any) =>
                  typeof a === 'string' ? a : a.metin || ''
                )
              : [],
            kaynaklar: item.kaynaklar || [],
          });
        }
      });

      const donusturulenSonuclar = Array.from(grupMap.values());
      onResultsRef.current?.(donusturulenSonuclar, data.total || 0, false);
    } else {
      onResultsRef.current?.([], 0, false);
    }
  } catch (error) {
    console.error('Arama hatası:', error);
    onResultsRef.current?.([], 0, false);
  }
}, [query, mode, dialect, targetLang, dict]);  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);
    return () => clearTimeout(timer);
  }, [handleSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    inputRef.current?.focus();
  }, []);

  const toggleKlavye = useCallback(() => {
    setIsKlavyeOpen((prev) => !prev);
  }, []);

  return (
    <div className="w-full flex flex-col gap-3">
      {/* ARAMA KUTUSU + AYARLAR BUTONU */}
      <div className="flex gap-2 items-stretch">
        <div className="relative flex-1 flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kelime veya anlam ara..."
            className="w-full px-4 py-3.5 pl-11 pr-24 text-base bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />

          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              type="button"
              onClick={toggleKlavye}
              className={`flex items-center justify-center p-2 rounded-xl text-base transition-all ${isKlavyeOpen ? 'bg-amber-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                }`}
              title="Sanal Klavyeyi Aç/Kapat"
            >
              ⌨️
            </button>
          </div>
        </div>

        {/* AYARLAR BUTONU */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="px-4 py-3.5 bg-amber-400 hover:bg-amber-500 text-stone-900 rounded-2xl font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          ⚙ Ayarlar
          <ChevronDown size={18} className={`transition-transform ${showSettings ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* AKILLI KLAVYE */}
      {isKlavyeOpen && <AkilliKlavye sorgu={query} setSorgu={setQuery} inputRef={inputRef} />}

      {/* AYARLAR PANELİ */}
      {showSettings && (
        <div className="bg-stone-100 dark:bg-stone-800 p-4 rounded-xl border border-stone-300 dark:border-stone-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-4">⚙ Arama Ayarları</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* İLE BAŞLAYAN */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                İle Başlayan
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 text-zinc-800 dark:text-zinc-200 rounded-lg border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="baslayan">İle Başlayan</option>
                <option value="iceren">İçeren</option>
                <option value="tam">Tam Eşleşme</option>
              </select>
            </div>

            {/* LEHÇELER */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Lehçeler
              </label>
              <select
                value={dialect}
                onChange={(e) => setDialect(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 text-zinc-800 dark:text-zinc-200 rounded-lg border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="tumu">Tümü</option>
                <option value="ady">ADY</option>
                <option value="kbd">KBD</option>
              </select>
            </div>

            {/* SONUÇ DİLİ */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Sonuç Dili
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-stone-900 text-zinc-800 dark:text-zinc-200 rounded-lg border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="hepsi">Hepsi</option>
                <option value="tr">Türkçe</option>
                <option value="en">İngilizce</option>
                <option value="ru">Rusça</option>
                <option value="ar">Arapça</option>
              </select>
            </div>

            {/* SÖZLÜKLER */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Sözlükler
              </label>
              <SozlukFiltreMenu selectedDictId={dict} onSelectDict={(dictId) => setDict(dictId)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;