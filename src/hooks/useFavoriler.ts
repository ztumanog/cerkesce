'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORI_KEY = 'acikmektep_favoriler';

export interface FavoriKelime {
  id: string;
  kelime: string;
  anlam: string;
  lehce?: string;
  tarih?: string;
  kaydedilmeTarihi: string;
}

export function useFavoriler() {
  const [favoriler, setFavoriler] = useState<FavoriKelime[]>([]);
  const [loading, setLoading] = useState(true);

  const yukle = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(FAVORI_KEY);
      const list = raw ? JSON.parse(raw) : [];
      setFavoriler(Array.isArray(list) ? list : []);
    } catch {
      setFavoriler([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    yukle();
  }, [yukle]);

  const favoriMi = useCallback(
    (id: string) => favoriler.some((f) => f.id === id),
    [favoriler]
  );

  const favoriEkle = useCallback(
    (kelime: Omit<FavoriKelime, 'kaydedilmeTarihi'>) => {
      const yeni: FavoriKelime = {
        ...kelime,
        kaydedilmeTarihi: new Date().toISOString(),
      };
      const guncel = [yeni, ...favoriler.filter((f) => f.id !== kelime.id)];
      localStorage.setItem(FAVORI_KEY, JSON.stringify(guncel));
      setFavoriler(guncel);
    },
    [favoriler]
  );

  const favoriCikar = useCallback(
    (id: string) => {
      const yeni = favoriler.filter((f) => f.id !== id);
      localStorage.setItem(FAVORI_KEY, JSON.stringify(yeni));
      setFavoriler(yeni);
    },
    [favoriler]
  );

  const favoriToggle = useCallback(
    (kelime: Omit<FavoriKelime, 'kaydedilmeTarihi'>) => {
      if (favoriMi(kelime.id)) {
        favoriCikar(kelime.id);
      } else {
        favoriEkle(kelime);
      }
    },
    [favoriMi, favoriEkle, favoriCikar]
  );

  const temizle = useCallback(() => {
    localStorage.removeItem(FAVORI_KEY);
    setFavoriler([]);
  }, []);

  return {
    favoriler,
    loading,
    favoriMi,
    favoriEkle,
    favoriCikar,
    favoriToggle,
    temizle,
    yenile: yukle,
  };
}