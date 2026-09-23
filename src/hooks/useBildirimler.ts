'use client';

import { useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { toast } from 'sonner';
import {
  type BildirimAyar,
  ayarlariYukle,
  ayarlariKaydet,
  izinIste,
  bildirimiPlanla,
  bildirimiIptalEt,
} from '@/lib/bildirimler';

export function useBildirimler(
  gununKelimesi: { kelime: string; anlam: string } | null
) {
  const [ayar, setAyar] = useState<BildirimAyar>({
    aktif: false,
    saat: 9,
    dakika: 0,
  });
  const [yukleniyor, setYukleniyor] = useState(true);
  const [izinDurumu, setİzinDurumu] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  useEffect(() => {
    const yuklenenAyar = ayarlariYukle();
    setAyar(yuklenenAyar);
    setYukleniyor(false);
  }, []);

  const bildirimAcKapat = useCallback(
    async (aktif: boolean) => {
      if (!gununKelimesi) return;

      // ⭐ Web'de bildirim desteklenmiyor
      if (!Capacitor.isNativePlatform()) {
        toast.error('Bildirim sadece mobil uygulamada çalışır');
        return;
      }

      try {
        if (aktif) {
          const izinVar = await izinIste();
          if (!izinVar) {
            setİzinDurumu('denied');
            throw new Error('İzin verilmedi');
          }
          setİzinDurumu('granted');
        }

        const yeniAyar = { ...ayar, aktif };
        setAyar(yeniAyar);
        ayarlariKaydet(yeniAyar);

        if (aktif) {
          await bildirimiPlanla(yeniAyar, gununKelimesi);
        } else {
          await bildirimiIptalEt();
        }
      } catch (err) {
        console.error('Bildirim ayar hatası:', err);
        throw err;
      }
    },
    [ayar, gununKelimesi]
  );

  const saatDegistir = useCallback(
    async (saat: number, dakika: number) => {
      const yeniAyar = { ...ayar, saat, dakika };
      setAyar(yeniAyar);
      ayarlariKaydet(yeniAyar);

      if (yeniAyar.aktif && gununKelimesi && Capacitor.isNativePlatform()) {
        await bildirimiPlanla(yeniAyar, gununKelimesi);
      }
    },
    [ayar, gununKelimesi]
  );

  return {
    ayar,
    yukleniyor,
    izinDurumu,
    bildirimAcKapat,
    saatDegistir,
  };
}