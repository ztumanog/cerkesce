// src/hooks/useTranslation.ts
'use client';
import { useState, useEffect } from 'react';
import { TranslationEntry } from '@/domain/translation';

export interface UseTranslationResult {
  results: TranslationEntry[];
  loading: boolean;
  error: string | null;
}

export function useTranslation(query: string): UseTranslationResult {
  const [results, setResults] = useState<TranslationEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`/api/translation?q=${encodeURIComponent(query)}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setResults(data.data || []);
          setError(null);
        } else {
          setError(data.error || 'Unknown error');
          setResults([]);
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : String(err));
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return { results, loading, error };
}

