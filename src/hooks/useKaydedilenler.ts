'use client';

import { useState, useEffect, useCallback } from 'react';

const KAYIT_KEY = 'acikmektep_kayitli_kelimeler';
const ESKI_FAVORI_KEY = 'acikmektep_favoriler';

export interface KaydedilenKelime {
  id: string;
  kelime: string;
  anlam: string;
  lehce?: string;
  ornekler?: string[];
  ornek?: string;
  tarih?: string;
  kaydedilmeTarihi: string;
}

export type YeniKayitGirdisi = Omit<KaydedilenKelime, 'kaydedilmeTarihi'>;

export function useKaydedilenler() {
  const [kayitlilar, setKayitlilar] = useState<KaydedilenKelime[]>([]);
  const [loading, setLoading] = useState(true);

  const yukle = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const rawKayit = localStorage.getItem(KAYIT_KEY);
      const kayitList: KaydedilenKelime[] = rawKayit ? JSON.parse(rawKayit) : [];
      const gecerliKayitlar = Array.isArray(kayitList) ? kayitList : [];

      // Eski acikmektep_favoriler verisi varsa otomatik birleştir ve temizle
      const rawEskiFavori = localStorage.getItem(ESKI_FAVORI_KEY);
      if (rawEskiFavori) {
        const eskiList: KaydedilenKelime[] = JSON.parse(rawEskiFavori);
        if (Array.isArray(eskiList) && eskiList.length > 0) {
          const mevcutIdler = new Set(gecerliKayitlar.map((k) => k.id));
          const eklenecekler = eskiList.filter((f) => f && f.id && !mevcutIdler.has(f.id));
          const birlesik = [...eklenecekler, ...gecerliKayitlar];
          localStorage.setItem(KAYIT_KEY, JSON.stringify(birlesik));
          localStorage.removeItem(ESKI_FAVORI_KEY);
          setKayitlilar(birlesik);
          setLoading(false);
          return;
        }
        localStorage.removeItem(ESKI_FAVORI_KEY);
      }

      setKayitlilar(gecerliKayitlar);
    } catch {
      setKayitlilar([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    yukle();
  }, [yukle]);

  const kayitliMi = useCallback(
    (id: string) => kayitlilar.some((k) => k.id === id),
    [kayitlilar]
  );

  const kaydet = useCallback((kelime: YeniKayitGirdisi) => {
    setKayitlilar((onceki) => {
      const yeni: KaydedilenKelime = {
        ...kelime,
        kaydedilmeTarihi: new Date().toISOString(),
      };
      const guncel = [yeni, ...onceki.filter((k) => k.id !== kelime.id)];
      if (typeof window !== 'undefined') {
        localStorage.setItem(KAYIT_KEY, JSON.stringify(guncel));
      }
      return guncel;
    });
  }, []);

  const sil = useCallback((id: string) => {
    setKayitlilar((onceki) => {
      const yeni = onceki.filter((k) => k.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(KAYIT_KEY, JSON.stringify(yeni));
      }
      return yeni;
    });
  }, []);

  const kayitToggle = useCallback(
    (kelime: YeniKayitGirdisi): boolean => {
      const varMi = kayitlilar.some((k) => k.id === kelime.id);
      if (varMi) {
        sil(kelime.id);
        return false;
      } else {
        kaydet(kelime);
        return true;
      }
    },
    [kayitlilar, sil, kaydet]
  );

  const tumunuSil = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(KAYIT_KEY);
    }
    setKayitlilar([]);
  }, []);

  return {
    kayitlilar,
    loading,
    kayitliMi,
    kaydet,
    sil,
    kayitToggle,
    tumunuSil,
    yenile: yukle,
  };
}
