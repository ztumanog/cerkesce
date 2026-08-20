export interface DictionaryItem {
  kelime: string;
  tanim: string;
  kaynak_sozluk?: string;
}

// Dosya yükleme
export async function loadDictionary(fileName = "0.Ady-Ady_AIG.json"): Promise<DictionaryItem[]> {
  const res = await fetch(`/data/${fileName}`);
  if (!res.ok) throw new Error("JSON verisi okunamadı.");
  return res.json();
}

// Bellekte hızlı arama
export function searchInJSON(data: DictionaryItem[], query: string, limit = 50): DictionaryItem[] {
  const clean = query.trim().toLowerCase();
  if (!clean) return [];

  return data
    .filter(
      (item) =>
        item.kelime?.toLowerCase().includes(clean) ||
        item.tanim?.toLowerCase().includes(clean)
    )
    .slice(0, limit);
}

// Günün kelimesi
export function getDailyWordFromJSON(data: DictionaryItem[]): DictionaryItem | null {
  if (!data || data.length === 0) return null;
  const today = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash += today.charCodeAt(i);
  return data[hash % data.length];
}