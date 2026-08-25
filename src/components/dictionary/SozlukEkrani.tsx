'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  AramaModu,
  LehceTipi,
  SearchBoxProps,
} from '@/types/dictionary';

import {
  filterButtonVariants,
  selectBoxVariants,
} from '@/lib/variants';

import { cn } from '@/utils/utils';
import manifestDataRaw from '@/utils/dictionaries.json';
import AkilliKlavye from '@/components/features/AkilliKlavye';

type DictionaryMeta = {
  file?: string;
  title?: string;
  label?: string;
  dialect?: string;
  lehce?: string;
  diyalekt?: string;
  name?: string;
  baslik?: string;
  kaynak_sozluk?: string;
  filename?: string;
  total_words?: number;
  totalWords?: number;
  wordCount?: number;
  wordsCount?: number;
  kayitSayisi?: number;
  kelimeSayisi?: number;
  count?: number;
  entries?: number;
  entryCount?: number;
  entriesCount?: number;
};

type DictionaryInputType = string | DictionaryMeta;

type EnrichedDictionary = {
  file: string;
  title: string;
  label: string;
  dialect: 'BATI' | 'DOGU' | 'TUMU';
  count: number;
};

const manifestData = manifestDataRaw as DictionaryMeta[];

function normalizeFileName(value: unknown): string {
  if (!value) {
    return '';
  }

  return (
    String(value)
      .trim()
      .replace(/\\/g, '/')
      .split('/')
      .pop()
      ?.replace(/\.json$/i, '')
      .trim()
      .toLowerCase() || ''
  );
}

function normalizeDialect(
  dialect?: string
): 'BATI' | 'DOGU' | 'TUMU' {
  if (!dialect) {
    return 'TUMU';
  }

  const value = String(dialect)
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (value === 'BATI') {
    return 'BATI';
  }

  if (value === 'DOGU') {
    return 'DOGU';
  }

  if (value === 'TUMU') {
    return 'TUMU';
  }

  if (
    value.includes('DOGU') ||
    value.includes('KABARDEY') ||
    value.includes('KBD') ||
    value.includes('KABARTAY')
  ) {
    return 'DOGU';
  }

  if (
    value.includes('BATI') ||
    value.includes('ADIGE') ||
    value.includes('ADYGE') ||
    value.includes('ADY')
  ) {
    return 'BATI';
  }

  return 'TUMU';
}

function getDictionaryFile(
  input: DictionaryInputType
): string {
  if (typeof input === 'string') {
    return input;
  }

  return (
    input.file ||
    input.kaynak_sozluk ||
    input.filename ||
    input.name ||
    ''
  );
}

function getManifestDictionary(
  file: unknown
): DictionaryMeta | undefined {
  const normalizedFile = normalizeFileName(file);

  if (!normalizedFile) {
    return undefined;
  }

  return manifestData.find((dictionary) => {
    const dictionaryFile =
      dictionary.file ||
      dictionary.filename ||
      dictionary.name;

    return (
      normalizeFileName(dictionaryFile) === normalizedFile
    );
  });
}

function getDictionaryCount(
  dictionary: unknown
): number {
  const dictionaryObject =
    typeof dictionary === 'object' &&
    dictionary !== null
      ? dictionary as Record<string, unknown>
      : {};

  const dictionaryFile =
    dictionaryObject.file ||
    dictionaryObject.filename ||
    dictionaryObject.name ||
    dictionaryObject.kaynak_sozluk ||
    dictionary;

  const manifestDictionary =
    getManifestDictionary(dictionaryFile);

  const countSource = {
    ...(manifestDictionary || {}),
    ...dictionaryObject,
  };

  const possibleCounts = [
    countSource.total_words,
    countSource.totalWords,
    countSource.wordCount,
    countSource.wordsCount,
    countSource.kayitSayisi,
    countSource.kelimeSayisi,
    countSource.count,
    countSource.entries,
    countSource.entryCount,
    countSource.entriesCount,
  ];

  for (const value of possibleCounts) {
    const count = Number(value);

    if (Number.isFinite(count) && count > 0) {
      return count;
    }
  }

  return 0;
}

function getDictionaryLabel(
  item?: DictionaryMeta
): string {
  if (!item) {
    return '';
  }

  return (
    item.label ||
    item.kaynak_sozluk ||
    ''
  );
}

function findManifestItem(
  input: DictionaryInputType
): DictionaryMeta | undefined {
  const inputFile = normalizeFileName(
    getDictionaryFile(input)
  );

  if (!inputFile) {
    return undefined;
  }

  return manifestData.find((item) => {
    const manifestFile =
      item.file ||
      item.filename ||
      item.name ||
      '';

    return (
      normalizeFileName(manifestFile) === inputFile
    );
  });
}

function getEnrichedDictionary(
  input: DictionaryInputType
): EnrichedDictionary {
  const inputFile = getDictionaryFile(input);
  const fileNameOnly = normalizeFileName(inputFile);
  const foundItem = findManifestItem(input);

  if (foundItem) {
    const file =
      foundItem.file ||
      foundItem.filename ||
      foundItem.name ||
      fileNameOnly;

    const title =
      foundItem.title ||
      foundItem.baslik ||
      foundItem.name ||
      file;

    const label = getDictionaryLabel(foundItem);

    const dialect = normalizeDialect(
      foundItem.dialect ||
      foundItem.lehce ||
      foundItem.diyalekt
    );

    return {
      file,
      title,
      label,
      dialect,
      count: getDictionaryCount(input),
    };
  }

  const objectInput =
    typeof input === 'object'
      ? input
      : undefined;

  const fallbackDialect = normalizeDialect(
    objectInput?.dialect ||
    objectInput?.lehce ||
    objectInput?.diyalekt ||
    (fileNameOnly.includes('kbd')
      ? 'DOGU'
      : '')
  );

  return {
    file:
      objectInput?.file ||
      objectInput?.filename ||
      objectInput?.name ||
      fileNameOnly,
    title:
      objectInput?.title ||
      objectInput?.baslik ||
      objectInput?.name ||
      fileNameOnly,
    label: objectInput?.label || '',
    dialect: fallbackDialect,
    count: getDictionaryCount(input),
  };
}

function uniqueDictionaries(
  dictionaries: EnrichedDictionary[]
): EnrichedDictionary[] {
  const seen = new Set<string>();

  return dictionaries.filter((dictionary) => {
    const key = normalizeFileName(dictionary.file);

    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
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
  const [listeAcik, setListeAcik] =
    useState(false);

  const [
    gelismisFiltrelerAcik,
    setGelismisFiltrelerAcik,
  ] = useState(false);

  const listeRef =
    useRef<HTMLDivElement>(null);

  const resetCount = useCallback(() => {
    setGoruntulenenAdet(limit);
  }, [
    setGoruntulenenAdet,
    limit,
  ]);

  const handleSearchChange = useCallback(
    (
      value:
        | string
        | ((previous: string) => string)
    ) => {
      setSearchQuery(value);
      resetCount();
    },
    [
      setSearchQuery,
      resetCount,
    ]
  );

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        listeRef.current &&
        !listeRef.current.contains(
          event.target as Node
        )
      ) {
        setListeAcik(false);
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

  const zenginSozlukler = useMemo(() => {
    const enriched = aktifSozlukler.map(
      (dictionary) =>
        getEnrichedDictionary(
          dictionary as DictionaryInputType
        )
    );

    return uniqueDictionaries(enriched);
  }, [aktifSozlukler]);

  const batiSozlukleri = useMemo(
    () =>
      zenginSozlukler.filter(
        (dictionary) =>
          dictionary.dialect === 'BATI'
      ),
    [zenginSozlukler]
  );

  const doguSozlukleri = useMemo(
    () =>
      zenginSozlukler.filter(
        (dictionary) =>
          dictionary.dialect === 'DOGU'
      ),
    [zenginSozlukler]
  );

  const digerSozlukler = useMemo(
    () =>
      zenginSozlukler.filter(
        (dictionary) =>
          dictionary.dialect !== 'BATI' &&
          dictionary.dialect !== 'DOGU'
      ),
    [zenginSozlukler]
  );

  const normalizedLehce =
    normalizeDialect(seciliLehce);

  const seciliSozlukEtiketi = useMemo(() => {
    if (
      normalizeFileName(seciliDosya) === 'tumu'
    ) {
      if (normalizedLehce === 'TUMU') {
        return 'Tüm sözlüklerde arama';
      }

      if (normalizedLehce === 'BATI') {
        return 'Tüm Batı Adığece sözlükleri';
      }

      return 'Tüm Doğu Kabardeyce sözlükleri';
    }

    const dictionary =
      getEnrichedDictionary(seciliDosya);

    return `${dictionary.title}${
      dictionary.label
        ? ` — ${dictionary.label}`
        : ''
    }`;
  }, [
    seciliDosya,
    normalizedLehce,
  ]);

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

  const seciliDilEtiketi =
    dilSecenekleri.find(
      (dil) => dil.kod === hedefDil
    )?.etiket || 'Tümü';

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-xl shadow-stone-200/50 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20">
        <div className="relative px-4 py-3">
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
            className="h-16 w-full rounded-2xl border-2 border-stone-200 bg-white px-4 text-base text-stone-900 shadow-sm outline-none transition focus:border-rose-600 focus:ring-4 focus:ring-rose-100 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-rose-500 dark:focus:ring-rose-950 sm:pr-72"
          />

          <div className="mt-3 flex w-full items-center gap-2 sm:absolute sm:right-6 sm:top-1/2 sm:mt-0 sm:w-auto sm:-translate-y-1/2">
            <select
              value={mod}
              onChange={(event) => {
                setMod(
                  event.target.value as AramaModu
                );
                resetCount();
              }}
              className={cn(
                selectBoxVariants(),
                'h-9 w-28 min-w-0 rounded-lg px-2 text-xs sm:w-32 sm:flex-none'
              )}
              aria-label="Eşleşme modu"
            >
              <option value="baslayan">
                Başlayan
              </option>
              <option value="icinde">
                İçinde
              </option>
              <option value="tam">
                Tam eşleşme
              </option>
            </select>

            <button
              type="button"
              onClick={() => {
                resetCount();
                inputRef.current?.focus();
              }}
              className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-900 via-rose-800 to-rose-700 px-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-rose-900/30 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-95 sm:flex-none sm:px-6"
            >
              <span aria-hidden="true">
                🔍
              </span>
              Ara
            </button>
          </div>
        </div>

        <div className="border-t border-stone-100 bg-stone-50/80 px-4 py-3 dark:border-stone-800 dark:bg-stone-950/50">
          <div className="flex justify-end">
            <div className="max-w-full overflow-x-auto">
              <div className="flex min-w-max items-center justify-end gap-2">
                <span className="mr-1 shrink-0 text-xs text-stone-500 dark:text-stone-400">
                  ⌨
                </span>

                <AkilliKlavye
                  inputRef={inputRef}
                  sorgu={searchQuery}
                  setSorgu={handleSearchChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex w-full gap-2 px-1">
        {lehceSecenekleri.map((lehce) => {
          const aktif =
            normalizedLehce === lehce.kod;

          return (
            <button
              key={lehce.kod}
              type="button"
              onClick={() => {
                setSeciliLehce(lehce.kod);
                setSeciliDosya('TUMU');
                setListeAcik(false);
                resetCount();
              }}
              className={cn(
                filterButtonVariants({
                  active: aktif,
                }),
                'flex flex-1 flex-col items-center justify-center px-3 py-1.5 text-center'
              )}
            >
              <span className="font-semibold">
                {lehce.etiket}
              </span>

              <span className="text-[10px] opacity-70">
                {lehce.aciklama}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
        <div className="flex min-w-0 items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm dark:bg-amber-950/40">
            📚
          </span>

          <span className="truncate font-medium">
            {seciliSozlukEtiketi}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
          <span aria-hidden="true">🌐</span>

          <span>
            Sonuç Dili:{' '}
            <strong>{seciliDilEtiketi}</strong>
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            setGelismisFiltrelerAcik(
              (previous) => !previous
            )
          }
          className="flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-stone-500 transition-colors hover:bg-stone-100 hover:text-rose-800 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-rose-300 sm:ml-auto"
        >
          <span aria-hidden="true">⚙</span>

          <span className="hidden sm:inline">
            Gelişmiş filtreler
          </span>

          <span aria-hidden="true">
            {gelismisFiltrelerAcik
              ? '⌃'
              : '⌄'}
          </span>
        </button>
      </div>

      {gelismisFiltrelerAcik && (
        <div className="mt-4 space-y-5 rounded-2xl border border-stone-200 bg-white p-5 shadow-lg shadow-stone-200/40 dark:border-stone-800 dark:bg-stone-900 dark:shadow-black/20">
          <div ref={listeRef}>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Sözlük seçimi
            </label>

            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={listeAcik}
                onClick={() =>
                  setListeAcik(
                    (previous) => !previous
                  )
                }
                className="flex w-full items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-4 py-3 text-left text-sm font-medium text-stone-800 transition-colors hover:border-rose-300 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-200 dark:hover:border-rose-800"
              >
                <span className="truncate">
                  {seciliSozlukEtiketi}
                </span>

                <span
                  className={cn(
                    'ml-3 transition-transform',
                    listeAcik && 'rotate-180'
                  )}
                >
                  ▾
                </span>
              </button>

              {listeAcik && (
                <div
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-stone-200 bg-white p-2 shadow-2xl dark:border-stone-700 dark:bg-stone-900"
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={
                      normalizeFileName(
                        seciliDosya
                      ) === 'tumu'
                    }
                    onClick={() => {
                      setSeciliDosya('TUMU');
                      setListeAcik(false);
                      resetCount();
                    }}
                    className={cn(
                      'flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-colors',
                      normalizeFileName(
                        seciliDosya
                      ) === 'tumu'
                        ? 'bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300'
                        : 'text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
                    )}
                  >
                    <span aria-hidden="true">
                      📚
                    </span>

                    {normalizedLehce === 'TUMU'
                      ? 'Tüm sözlüklerde ara'
                      : normalizedLehce === 'BATI'
                      ? 'Tüm Batı Adığece sözlükleri'
                      : 'Tüm Doğu Kabardeyce sözlükleri'}
                  </button>

                  {(normalizedLehce === 'TUMU' ||
                    normalizedLehce === 'DOGU') && (
                    <DictionaryGroup
                      title="Doğu Kabardeyce"
                      dictionaries={doguSozlukleri}
                      selectedFile={seciliDosya}
                      setSelectedFile={
                        setSeciliDosya
                      }
                      closeDropdown={() =>
                        setListeAcik(false)
                      }
                      resetCount={resetCount}
                    />
                  )}

                  {(normalizedLehce === 'TUMU' ||
                    normalizedLehce === 'BATI') && (
                    <DictionaryGroup
                      title="Batı Adığece"
                      dictionaries={batiSozlukleri}
                      selectedFile={seciliDosya}
                      setSelectedFile={
                        setSeciliDosya
                      }
                      closeDropdown={() =>
                        setListeAcik(false)
                      }
                      resetCount={resetCount}
                    />
                  )}

                  {normalizedLehce === 'TUMU' &&
                    digerSozlukler.length > 0 && (
                      <DictionaryGroup
                        title="Diğer Kaynaklar"
                        dictionaries={
                          digerSozlukler
                        }
                        selectedFile={seciliDosya}
                        setSelectedFile={
                          setSeciliDosya
                        }
                        closeDropdown={() =>
                          setListeAcik(false)
                        }
                        resetCount={resetCount}
                      />
                    )}
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-stone-100 pt-5 dark:border-stone-800">
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
                      resetCount();
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
      )}
    </section>
  );
}

type DictionaryGroupProps = {
  title: string;
  dictionaries: EnrichedDictionary[];
  selectedFile: string;
  setSelectedFile: (file: string) => void;
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
  if (dictionaries.length === 0) {
    return null;
  }

  return (
    <div className="mt-2 border-t border-stone-100 pt-2 dark:border-stone-800">
      <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
        {title} ({dictionaries.length})
      </div>

      {dictionaries.map((dictionary) => {
        const aktif =
          normalizeFileName(selectedFile) ===
          normalizeFileName(dictionary.file);

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
            <span className="min-w-0 truncate">
              {dictionary.title}
            </span>

            {dictionary.count > 0 && (
              <span className="shrink-0 text-xs font-medium text-stone-400">
                {dictionary.count.toLocaleString('tr-TR')}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SearchBox;