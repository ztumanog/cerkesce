'use client';

import { useState, useEffect, useCallback } from 'react';

const KAYIT_KEY = 'acikmektep_kayitli_kelimeler';

export interface KaydedilenKelime {
  id: string;
  kelime: string;
  anlam: string;
  ornekler?: string[];
  ornek?: string;
  tarih?: string;
  kaydedilmeTarihi: string;
}

export function useKaydedilenler() {
  const [kayitlilar, setKayitlilar] = useState<KaydedilenKelime[]>([]);
  const [loading, setLoading] = useState(true);

  const yukle = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(KAYIT_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setKayitlilar(Array.isArray(list) ? list : []);
    } catch {
      setKayitlilar([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    yukle();
  }, [yukle]);

  const sil = useCallback(
    (id: string) => {
      const yeni = kayitlilar.filter((k) => k.id !== id);
      localStorage.setItem(KAYIT_KEY, JSON.stringify(yeni));
      setKayitlilar(yeni);
    },
    [kayitlilar]
  );

  const tumunuSil = useCallback(() => {
    localStorage.removeItem(KAYIT_KEY);
    setKayitlilar([]);
  }, []);

  return { kayitlilar, loading, sil, tumunuSil, yenile: yukle };
}