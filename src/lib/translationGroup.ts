import { DictionaryEntry, GroupedDictionaryEntry, KaynakDetay } from '@/types/dictionary';

export function groupTranslations(entries: DictionaryEntry[]): GroupedDictionaryEntry[] {
  const map = new Map<string, GroupedDictionaryEntry>();

  entries.forEach((entry) => {
    const key = entry.kelime.toLowerCase().trim();
    const tanimMetni = entry.anlam || entry.meaning || entry.tanim || entry.full_definition_in_html || '';
    const kaynakBilgisi = entry.sourceDictionaryId || entry.source || entry.kaynak || 'Bilinmeyen Kaynak';

    if (!map.has(key)) {
      map.set(key, {
        id: entry.id || key,
        kelime: entry.kelime,
        entries: [entry],
        anlamlar: tanimMetni ? [tanimMetni] : [],
        kaynaklar: [{ ad: kaynakBilgisi }],
      });
    } else {
      const grouped = map.get(key)!;
      grouped.entries.push(entry);
      if (tanimMetni && !grouped.anlamlar.includes(tanimMetni)) {
        grouped.anlamlar.push(tanimMetni);
      }
    }
  });

  return Array.from(map.values());
}
