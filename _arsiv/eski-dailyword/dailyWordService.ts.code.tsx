import type { GununKelimesi } from '@/types/dictionary';
import { RawDictionaryEntry, selectDailyWord, DailyWord } from '@/utils/dailyWordEngine';

/**
 * Sözlük verilerini JSON dosyasından yükler
 */
export async function loadDictionaryEntries(): Promise<RawDictionaryEntry[]> {
  try {
    const response = await fetch('/data/dictionary.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as RawDictionaryEntry[];
  } catch (error) {
    console.error('Sözlük verileri yüklenemedi:', error);
    return [];
  }
}

/**
 * Belirli bir tarih için günün kelimesini getirir
 */
export async function getDailyWord(
  dateString?: string
): Promise<GununKelimesi | null> {
  try {
    const entries = await loadDictionaryEntries();
    if (entries.length === 0) {
      console.warn('Sözlük boş, varsayılan veriler kullanılacak');
      return null;
    }
    const selected = selectDailyWord(entries, dateString);
    if (!selected) return null;

    return {
      id: selected.id,
      kelime: selected.kelime,
      anlam: selected.anlam,
      lehce: selected.lehce,
      tarih: selected.tarih,
      meta: selected.meta,
    } satisfies GununKelimesi;
  } catch (error) {
    console.error('Günün kelimesi alınamadı:', error);
    return null;
  }
}

/**
 * Bugünün kelimesini getirir (cache ile)
 */
let cachedDailyWord: GununKelimesi | null = null;
let cachedDate: string = '';

export async function getTodayDailyWord(): Promise<GununKelimesi | null> {
  const today = new Date().toISOString().split('T')[0];

  // Cache kontrol
  if (cachedDailyWord && cachedDate === today) {
    return cachedDailyWord;
  }

  const dailyWord = await getDailyWord(today);
  if (dailyWord) {
    cachedDailyWord = dailyWord;
    cachedDate = today;
  }

  return dailyWord;
}

/**
 * Kelimeyi panoya kopyalar
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Panoya kopyalanamadı:', error);
    return false;
  }
}

/**
 * Kelimeyi paylaş
 */
export async function shareWord(
  kelime: GununKelimesi
): Promise<boolean> {
  try {
    const shareText = `🎓 Günün Kelimesi: ${kelime.kelime}\n\n📖 Anlam: ${kelime.anlam}\n🗣️ Lehçe: ${kelime.lehce}`;

    if (navigator.share) {
      await navigator.share({
        title: 'Günün Kelimesi',
        text: shareText,
      });
      return true;
    } else {
      // Fallback: panoya kopyala
      return await copyToClipboard(shareText);
    }
  } catch (error) {
    console.error('Paylaşılamadı:', error);
    return false;
  }
}

/**
 * Sesi çal
 */
export function playSound(soundUrl?: string): void {
  if (!soundUrl) {
    console.warn('Ses dosyası URL\'si bulunamadı');
    return;
  }

  try {
    const audio = new Audio(soundUrl);
    audio.play().catch((error) => {
      console.error('Ses çalınamadı:', error);
    });
  } catch (error) {
    console.error('Ses oynatıcı hatası:', error);
  }
}

/**
 * Kelime istatistiklerini al
 */
export async function getWordStatistics(): Promise<{
  totalWords: number;
  byDialect: Record<string, number>;
}> {
  try {
    const entries = await loadDictionaryEntries();
    const byDialect: Record<string, number> = {};

    entries.forEach((entry) => {
      const dialect = entry.dialect || 'Bilinmeyen';
      byDialect[dialect] = (byDialect[dialect] || 0) + 1;
    });

    return {
      totalWords: entries.length,
      byDialect,
    };
  } catch (error) {
    console.error('İstatistikler alınamadı:', error);
    return {
      totalWords: 0,
      byDialect: {},
    };
  }
}

/**
 * Kelime ara
 */
export async function searchWords(
  query: string
): Promise<RawDictionaryEntry[]> {
  try {
    const entries = await loadDictionaryEntries();
    const lowerQuery = query.toLowerCase();

    return entries.filter(
      (entry) =>
        entry.lemma.toLowerCase().includes(lowerQuery) ||
        entry.translation.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Arama yapılamadı:', error);
    return [];
  }
}