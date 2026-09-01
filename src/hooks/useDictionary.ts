"use client";

/**
 * @file src/hooks/useDictionary.ts
 * @description Projenin TEK state sahibidir. 
 * Debounce ve useTransition ile Server Action entegrasyonunu sağlar.
 */

import { useState, useEffect, useTransition } from "react";
import type { 
  AramaModu, 
  LehceTipi, 
  DictionaryItem, 
  DictionaryMeta,
  UseDictionaryReturn 
} from "@/types/dictionary";
import { searchTranslations } from "@/app/actions/dictionaryActions";

export function useDictionary(): UseDictionaryReturn {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hedefDil, setHedefDil] = useState<string>("TUMU");
  const [seciliLehce, setSeciliLehce] = useState<LehceTipi>("TUMU");
  const [seciliDosya, setSeciliDosya] = useState<string>("TUMU");
  const [aramaModu, setAramaModu] = useState<AramaModu>("prefix");
  const [limit, setLimit] = useState<number>(20);

  const [aktifSozlukler] = useState<DictionaryMeta[]>([]);
  const [filtrelenmisSonuclar, setFiltrelenmisSonuclar] = useState<DictionaryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [wordsCount, setWordsCount] = useState<number>(0);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFiltrelenmisSonuclar([]);
      setWordsCount(0);
      setError(null);
      return;
    }

    const timer = setTimeout(() => {
      startTransition(async () => {
        try {
          // searchTranslations doğrudan query string alır ve dizi döner
          const results = await searchTranslations(searchQuery);

          setFiltrelenmisSonuclar(results as unknown as DictionaryItem[]);
          setWordsCount(results.length);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Sunucu hatası oluştu.");
          setFiltrelenmisSonuclar([]);
          setWordsCount(0);
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, seciliLehce, limit]);

  return {
    searchQuery,
    setSearchQuery,
    hedefDil,
    setHedefDil,
    seciliLehce,
    setSeciliLehce,
    seciliDosya,
    setSeciliDosya,
    aramaModu,
    setAramaModu,
    mod: aramaModu,
    setMod: setAramaModu,
    limit,
    setLimit,
    aktifSozlukler,
    filtrelenmisSonuclar,
    loading: isPending,
    error,
    wordsCount,
  };
}

export default useDictionary;