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
    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      fetch(`/api/translation?q=${encodeURIComponent(trimmed)}`, { signal: controller.signal })
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
          if (err instanceof Error && err.name === 'AbortError') return;
          setError(err instanceof Error ? err.message : String(err));
          setResults([]);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return { results, loading, error };
}
