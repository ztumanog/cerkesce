import { useState, useCallback, useMemo } from 'react';
import { TranslationEntry } from '@/types/dictionary';
import { createTranslationGroups, TranslationGroup } from '@/lib/translationGroup';

export function useDictionary() {
  const [results, setResults] = useState<TranslationEntry[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const executeSearch = useCallback(async (
    query: string,
    mode: string = 'contains',
    dialect: string = 'all',
    source: string = 'all'
  ) => {
    if (!query.trim()) {
      setResults([]);
      setTotal(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanDialect = (dialect === 'TUMU' || dialect === 'ALL') ? 'all' : dialect;
      const cleanSource = source === 'ALL' ? 'all' : source;

      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}&mode=${encodeURIComponent(mode)}&dialect=${encodeURIComponent(cleanDialect)}&source=${encodeURIComponent(cleanSource)}`
      );

      if (!response.ok) {
        throw new Error(`Arama hatası: ${response.statusText}`);
      }

      const data = await response.json();
      const rawResults = Array.isArray(data)
        ? data
        : Array.isArray(data?.results)
        ? data.results
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setResults(rawResults);
      setTotal(typeof data?.total === 'number' ? data.total : rawResults.length);
    } catch (err: any) {
      setError(err.message || 'Arama sırasında bir hata oluştu.');
      setResults([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const groups = useMemo(() => createTranslationGroups(results), [results]);

  return {
    results,
    groups,
    total,
    loading,
    error,
    executeSearch,
    search: executeSearch,
  };
}

export default useDictionary;