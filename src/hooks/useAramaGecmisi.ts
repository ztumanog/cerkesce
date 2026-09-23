'use client';

import { useState, useEffect, useCallback } from 'react';

const GECMIS_KEY = 'acikmektep_arama_gecmisi';
const MAX_GECMIS = 10;

export function useAramaGecmisi() {
  const [gecmis, setGecmis] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(GECMIS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setGecmis(Array.isArray(list) ? list : []);
    } catch {
      setGecmis([]);
    }
    setLoading(false);
  }, []);

  const ekle = useCallback((sorgu: string) => {
    if (!sorgu || !sorgu.trim()) return;
    const temiz = sorgu.trim();

    setGecmis((eski) => {
      // Aynı sorgu varsa çıkar
      const filtrelenmis = eski.filter((s) => s !== temiz);
      // Başa ekle
      const yeni = [temiz, ...filtrelenmis].slice(0, MAX_GECMIS);

      if (typeof window !== 'undefined') {
        localStorage.setItem(GECMIS_KEY, JSON.stringify(yeni));
      }
      return yeni;
    });
  }, []);

  const sil = useCallback((sorgu: string) => {
    setGecmis((eski) => {
      const yeni = eski.filter((s) => s !== sorgu);
      if (typeof window !== 'undefined') {
        localStorage.setItem(GECMIS_KEY, JSON.stringify(yeni));
      }
      return yeni;
    });
  }, []);

  const temizle = useCallback(() => {
    setGecmis([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GECMIS_KEY);
    }
  }, []);

  return { gecmis, loading, ekle, sil, temizle };
}