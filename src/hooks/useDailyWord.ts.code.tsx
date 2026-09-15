'use client';

import { useEffect, useState } from 'react';
import type { GununKelimesi } from '@/types/dictionary';
import { selectDailyWord, RawDictionaryEntry } from '@/utils/dailyWordEngine';

interface UseDailyWordOptions {
  veri?: GununKelimesi;
  entries?: RawDictionaryEntry[];
  dateString?: string;
}

interface UseDailyWordReturn {
  bugunKelimesi: GununKelimesi | null;
  loading: boolean;
  error: Error | null;
  refresh: () => void;
}

export function useDailyWord({
  veri,
  entries = [],
  dateString,
}: UseDailyWordOptions = {}): UseDailyWordReturn {
  const [bugunKelimesi, setBugunKelimesi] = useState<GununKelimesi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchDailyWord = () => {
    try {
      setLoading(true);
      setError(null);

      // Eğer veri gönderildiyse onu kullan
      if (veri) {
        setBugunKelimesi(veri);
        setLoading(false);
        return;
      }

      // Eğer entries gönderildiyse motor ile seç
      if (entries.length > 0) {
        const selected = selectDailyWord(entries, dateString);
        if (selected) {
          setBugunKelimesi(selected);
        } else {
          setError(new Error('Uygun kelime bulunamadı'));
        }
        setLoading(false);
        return;
      }

      // Varsayılan veriler (API'den gelmeyene kadar)
      const defaultKelimeler: GununKelimesi[] = [
        {
          id: '1',
          kelime: 'СиIэшIу',
          anlam: 'Tatlım, canım',
          lehce: 'Adigece',
          tarih: new Date().toISOString(),
          meta: {
            seviye: 'Başlangıç',
            kategori: 'Adıgece kökenli',
            notlar: 'СиIэшIу, уэ дахэ? - Tatlım, nasılsın?',
          },
        },
        {
          id: '2',
          kelime: 'адыгэ',
          anlam: 'Çerkes, Adıgeli',
          lehce: 'Adigece',
          tarih: new Date().toISOString(),
          meta: {
            seviye: 'Orta',
            kategori: 'Proto-Kafkas kökünden',
            notlar: 'Адыгэ адыгабзэ ихьэу. - Çerkesçe konuşuyorum.',
          },
        },
        {
          id: '3',
          kelime: 'адыгабзэ',
          anlam: 'Adıgece dili',
          lehce: 'Adigece',
          tarih: new Date().toISOString(),
          meta: {
            seviye: 'Orta',
            kategori: 'Adıgece + dil anlamında',
          },
        },
        {
          id: '4',
          kelime: 'нарт',
          anlam: 'Kahraman, efsanevi figür',
          lehce: 'Kabardeyce',
          tarih: new Date().toISOString(),
          meta: {
            seviye: 'İleri',
            kategori: 'Eski Kafkas mitolojisinden',
          },
        },
        {
          id: '5',
          kelime: 'къэбэрдей',
          anlam: 'Kabarday, Kabardeyce',
          lehce: 'Kabardeyce',
          tarih: new Date().toISOString(),
        },
        {
          id: '6',
          kelime: 'адыгэ хабзэ',
          anlam: 'Adıgece geleneği, adab-ı muaşeret',
          lehce: 'Adigece',
          tarih: new Date().toISOString(),
          meta: {
            seviye: 'İleri',
            kategori: 'Adıgece + gelenek',
          },
        },
        {
          id: '7',
          kelime: 'къэбэрдей хабзэ',
          anlam: 'Kabarday geleneği',
          lehce: 'Kabardeyce',
          tarih: new Date().toISOString(),
        },
      ];

      const rastgeleIndex = Math.floor(Math.random() * defaultKelimeler.length);
      const secilen = defaultKelimeler[rastgeleIndex];

      console.log('🎲 Rastgele kelime seçildi:', secilen.kelime);

      setBugunKelimesi(secilen);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Bilinmeyen hata'));
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyWord();
  }, [veri, entries, dateString]);

  return {
    bugunKelimesi,
    loading,
    error,
    refresh: fetchDailyWord,
  };
}