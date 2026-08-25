'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';

import type {
  AramaModu,
  SearchBoxProps,
  LehceTipi,
  ManifestData,
} from '@/types/dictionary';

import {
  filterButtonVariants,
  selectBoxVariants,
} from '@/lib/variants';

import { cn } from '@/utils/utils';
import manifestDataRaw from '@/utils/dictionaries.json';
import AkilliKlavye from '@/components/features/AkilliKlavye';

const manifestData =
  manifestDataRaw as unknown as ManifestData;

function getEnrichedDictionary(file: string) {
  const fileNameOnly = file.replace(
    /\.json$/,
    ''
  );

  const foundItem = manifestData?.items?.find(
    (item) =>
      item.file === file ||
      item.file === fileNameOnly
  );

  if (foundItem) {
    return {
      file: foundItem.file,
      title: foundItem.title,
      label: foundItem.label,
      dialect: foundItem.dialect,
    };
  }

  return {
    file: fileNameOnly,
    title: fileNameOnly,
    label: '',
    dialect: fileNameOnly.includes('Kbd')
      ? 'DOGU'
      : 'BATI',
  };
}

export function SearchBox({
  searchQuery,
  setSearchQuery,
  mod,
  setMod,
  hedefDil,
  setHedefDil,
  seciliLehce,
  setSeciliLehce,
  seciliDosya,
  setSeciliDosya,
  aktifSozlukler = [],
  inputRef,
  setGoruntulenenAdet,
  limit,
}: SearchBoxProps) {
  const [dropdownAcik, setDropdownAcik] =
    useState(false);

  const [
    gelismisFiltrelerAcik,
    setGelismisFiltrelerAcik,
  ] = useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setDropdownAcik(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
    };
  }, []);

  const handleSearchChange = useCallback(
    (
      value:
        | string
        | ((previous: string) => string)
    ) => {
      setSearchQuery(value);
      setGoruntulenenAdet(limit);
    },
    [
      setSearchQuery,
      setGoruntulenenAdet,
      limit,
    ]
  );

  const batiSozlukleri = useMemo(
    () =>
      aktifSozlukler
        .map((dictionary) =>
          getEnrichedDictionary(
            dictionary.file
          )
        )
        .filter(
          (dictionary) =>
            dictionary.dialect === 'BATI'
        ),
    [aktifSozlukler]
  );

  const doguSozlukleri = useMemo(
    () =>
      aktifSozlukler
        .map((dictionary) =>
          getEnrichedDictionary(
            dictionary.file
          )
        )
        .filter(
          (dictionary) =>
            dictionary.dialect === 'DOGU'
        ),
    [aktifSozlukler]
  );

  const seciliSozlukEtiketi = useMemo(() => {
    if (seciliDosya === 'TUMU') {
      if (seciliLehce === 'TUMU') {
        return 'Tüm sözlüklerde arama';
      }

      return seciliLehce === 'BATI'
        ? 'Tüm Batı Adığece sözlükleri'
        : 'Tüm Doğu Kabardeyce sözlükleri';
    }

    const dictionary =
      getEnrichedDictionary(seciliDosya);

    return `${dictionary.title}${
      dictionary.label
        ? ` — ${dictionary.label}`
        : ''
    }`;
  }, [seciliDosya, seciliLehce]);

  const lehceSecenekleri = [
    {
      kod: 'TUMU' as LehceTipi,
      etiket: 'Tümü',
      aciklama: 'Tüm lehçeler',
    },
    {
      kod: 'BATI' as LehceTipi,
      etiket: 'Batı',
      aciklama: 'Adığece',
    },
    {
      kod: 'DOGU' as LehceTipi,
      etiket: 'Doğu',
      aciklama: 'Kabardeyce',
    },
  ];

  const dilSecenekleri = [
    {
      kod: 'tumu',
      etiket: 'Tümü',
      emoji: '🌐',
    },
    {
      kod: 'tr',
      etiket: 'Türkçe',
      emoji: '🇹🇷',
    },
    {
      kod: 'ar',
      etiket: 'Arapça',
      emoji: 'ع',
    },
    {
      kod: 'en',
      etiket: 'İngilizce',
      emoji: '🇬🇧',
    },
    {
      kod: 'ru',
      etiket: 'Rusça',
      emoji: '🇷🇺',
    },
  ];

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {/* Ana arama kartı */}
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50 transition-shadow focus-within:shadow-rose-900/10 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20">
        {/* Arama alanı */}
        <div className="relative">
          <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-xl text-rose-700 dark:text-rose-400">
            ⌕
          </div>

          <input
            id="arama-input"
            ref={inputRef}
            type="search"
            value={searchQuery}
            onChange={(event) =>
              handleSearchChange(
                event.target.value
              )
            }
            placeholder="Kelime, tanım veya kök ara..."
            autoComplete="off"
            className="h-16 w-full border-0 bg-transparent px-14 pr-5 text-base text-stone-900 outline-none placeholder:text-stone-400 focus:ring-0 dark:text-stone-100 dark:placeholder:text-stone-600 sm:h-20 sm:text-lg"
          />

          <div className="pointer-events-none absolute bottom-2 right-5 hidden text-xs text-stone-400 sm:block">
            Örn: псэ, adige, yürek
          </div>
        </div>

        {/* Hızlı lehçe filtreleri */}
        <div className="border-t border-stone-100 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-950/50 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-stone-400">
              Lehçe
            </span>

            {lehceSecenekleri.map((lehce) => {
              const aktif =
                seciliLehce === lehce.kod;

              return (
                <button
                  key={lehce.kod}
                  type="button"
                  onClick={() => {
                    setSeciliLehce(
                      lehce.kod
                    );
                    setSeciliDosya('TUMU');
                    setGoruntulenenAdet(limit);
                  }}
                  className={cn(
                    'rounded-full border px-4 py-2 text-left transition-all',
                    aktif
                      ? 'border-rose-700 bg-rose-800 text-white shadow-md shadow-rose-900/20 dark:border-rose-500 dark:bg-rose-700'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-rose-300 hover:bg-rose-50 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:border-rose-800 dark:hover:bg-rose-950/30'
                  )}
                >
                  <span className="block text-xs font-bold">
                    {lehce.etiket}
                  </span>

                  <span
                    className={cn(
                      'block text-[10px]',
                      aktif
                        ? 'text-rose-100'
                        : 'text-stone-400 dark:text-stone-500'
                    )}
                  >
                    {lehce.aciklama}
                  </span>
                </button>
              );
            })}

            <div className="ml-auto flex items-center gap-1.5">
              <AkilliKlavye
                inputRef={inputRef}
                sorgu={searchQuery}
                setSorgu={handleSearchChange}
              />

              {searchQuery && (
                <button
                  type="button"
                  aria-label="Aramayı temizle"
                  onClick={() => {
                    handleSearchChange('');
                    inputRef.current?.focus();
                  }}
                  className="rounded-lg px-2.5 py-2 text-sm text-stone-400 transition-colors hover:bg-stone-200 hover:text-rose-700 dark:hover:bg-stone-800 dark:hover:text-rose-400"
                >
                  ✕
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  inputRef.current?.focus()
                }
                className="rounded-full bg-rose-800 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-rose-900/20 transition-all hover:bg-rose-900 active:scale-95 dark:bg-rose-700 dark:hover:bg-rose-600"
              >
                Ara
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Seçili sözlük ve gelişmiş filtre düğmesi */}
      <div className="mt-4 flex items-center justify-between gap-3 px-1">
        <div className="flex min-w-0 items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm dark:bg-amber-950/40">
            📚
          </span>

          <span className="truncate font-medium">
            {seciliSozlukEtiketi}
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setGelismisFiltrelerAcik(
              (previous) => !previous
            )
          }
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-100 hover:text-rose-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-rose-300"
        >
          <span>⚙</span>
          <span className="hidden sm:inline">
            Gelişmiş filtreler
          </span>
          <span>
            {gelismisFiltrelerAcik ? '⌃' : '⌄'}
          </span>
        </button>
      </div>

      {/* Gelişmiş filtreler */}
      {gelismisFiltrelerAcik && (
        <div className="mt-4 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg shadow-stone-200/40 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20">
          {/* Sözlük seçimi */}
          <div ref={dropdownRef}>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Sözlük seçimi
            </label>

            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={dropdownAcik}
                onClick={() =>
                  setDropdownAcik(
                    (previous) => !previous
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:border-rose-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-rose-800"
              >
                <span className="truncate">
                  {seciliSozlukEtiketi}
                </span>

                <span className="ml-3 text-xs text-stone-400">
                  {dropdownAcik ? '▲' : '▼'}
                </span>
              </button>

              {dropdownAcik && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-72 overflow-y-auto rounded-xl border border-stone-200 bg-white p-1 shadow-2xl dark:border-stone-700 dark:bg-stone-900"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={
                      seciliDosya === 'TUMU'
                    }
                    onClick={() => {
                      setSeciliDosya('TUMU');
                      setDropdownAcik(false);
                      setGoruntulenenAdet(limit);
                    }}
                    className={cn(
                      'w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-colors',
                      seciliDosya === 'TUMU'
                        ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
                    )}
                  >
                    📚{' '}
                    {seciliLehce === 'TUMU'
                      ? 'Tüm sözlüklerde ara'
                      : seciliLehce === 'BATI'
                        ? 'Tüm Batı Adığece sözlükleri'
                        : 'Tüm Doğu Kabardeyce sözlükleri'}
                  </button>

                  {(seciliLehce === 'TUMU' ||
                    seciliLehce === 'BATI') &&
                    batiSozlukleri.length > 0 && (
                      <DictionaryGroup
                        title="Batı Adığece"
                        dictionaries={
                          batiSozlukleri
                        }
                        selectedFile={
                          seciliDosya
                        }
                        setSelectedFile={
                          setSeciliDosya
                        }
                        closeDropdown={() =>
                          setDropdownAcik(false)
                        }
                        resetCount={() =>
                          setGoruntulenenAdet(
                            limit
                          )
                        }
                      />
                    )}

                  {(seciliLehce === 'TUMU' ||
                    seciliLehce === 'DOGU') &&
                    doguSozlukleri.length > 0 && (
                      <DictionaryGroup
                        title="Doğu Kabardeyce"
                        dictionaries={
                          doguSozlukleri
                        }
                        selectedFile={
                          seciliDosya
                        }
                        setSelectedFile={
                          setSeciliDosya
                        }
                        closeDropdown={() =>
                          setDropdownAcik(false)
                        }
                        resetCount={() =>
                          setGoruntulenenAdet(
                            limit
                          )
                        }
                      />
                    )}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-5 border-t border-stone-100 pt-5 dark:border-stone-800 md:grid-cols-2">
            {/* Arama modu */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Eşleşme modu
              </label>

              <select
                value={mod}
                onChange={(event) =>
                  setMod(
                    event.target.value as AramaModu
                  )
                }
                className={cn(
                  selectBoxVariants(),
                  'w-full'
                )}
                aria-label="Arama modu seçimi"
              >
                <option value="baslayan">
                  İle başlayan
                </option>
                <option value="icinde">
                  İçinde geçen
                </option>
                <option value="tam">
                  Tam eşleşen
                </option>
              </select>
            </div>

            {/* Hedef dil */}
            <div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Hedef sonuç dili
              </span>

              <div className="flex flex-wrap gap-2">
                {dilSecenekleri.map((dil) => {
                  const aktif =
                    hedefDil === dil.kod;

                  return (
                    <button
                      key={dil.kod}
                      type="button"
                      onClick={() => {
                        setHedefDil(dil.kod);
                        setGoruntulenenAdet(limit);
                      }}
                      className={filterButtonVariants({
                        active: aktif,
                      })}
                    >
                      <span aria-hidden="true">
                        {dil.emoji}
                      </span>

                      <span>{dil.etiket}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

type DictionaryGroupProps = {
  title: string;
  dictionaries: Array<{
    file: string;
    title: string;
    label?: string;
    dialect: string;
  }>;
  selectedFile: string;
  setSelectedFile: (
    file: string
  ) => void;
  closeDropdown: () => void;
  resetCount: () => void;
};

function DictionaryGroup({
  title,
  dictionaries,
  selectedFile,
  setSelectedFile,
  closeDropdown,
  resetCount,
}: DictionaryGroupProps) {
  return (
    <div className="mt-2 border-t border-stone-100 pt-2 dark:border-stone-800">
      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
        {title}
      </div>

      {dictionaries.map((dictionary) => {
        const aktif =
          selectedFile === dictionary.file;

        return (
          <button
            key={dictionary.file}
            type="button"
            role="option"
            aria-selected={aktif}
            onClick={() => {
              setSelectedFile(dictionary.file);
              closeDropdown();
              resetCount();
            }}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
              aktif
                ? 'bg-rose-50 font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
            )}
          >
            <span className="truncate">
              {dictionary.title}
            </span>

            {dictionary.label && (
              <span className="shrink-0 text-[10px] italic text-stone-400">
                {dictionary.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SearchBox;
