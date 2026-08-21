// src/lib/DictionaryService.ts

import { isSozlukTanimi, type DictionaryItem } from "@/types/dictionary";

const SOZLUK_DOSYALARI = [
  "/data/sozluk1.json", "/data/sozluk2.json", "/data/sozluk3.json",
  // ... Kalan 31 sözlük
];

export async function sozlukleriYukle(): Promise<unknown[]> {
  const ilkGrup = SOZLUK_DOSYALARI.slice(0, 3);
  const kalanSozlukler = SOZLUK_DOSYALARI.slice(3);
  const tumVeriler: unknown[] = [];

  // 350 MB Veri İçin Lazy Loading: İlk 3 paralel yüklenir
  const ilkGrupSonuclari = await Promise.all(
    ilkGrup.map(url => fetch(url).then(res => res.json()))
  );
  tumVeriler.push(...ilkGrupSonuclari);

  // Geri kalanlar 4'lü gruplar (chunks) halinde asenkron yüklenir
  for (let i = 0; i < kalanSozlukler.length; i += 4) {
    const islemGrubu = kalanSozlukler.slice(i, i + 4);
    const grupSonuclari = await Promise.all(
      islemGrubu.map(url => fetch(url).then(res => res.json()))
    );
    tumVeriler.push(...grupSonuclari);
  }

  return tumVeriler;
}

export function guvenliTanimAyikla(veri: unknown): string | null {
  // Veri Type Guard'dan geçer
  if (!isSozlukTanimi(veri)) return null;

  const item = veri as DictionaryItem;

  // Öncelik 1: definitions[].meaning
  if (Array.isArray(item.definitions) && item.definitions.length > 0) {
    const ilkTan = item.definitions[0];
    if (typeof ilkTan === "object" && ilkTan !== null && ilkTan.meaning) {
      return String(ilkTan.meaning);
    }
  }
  
  // Öncelik 2: full_definition_in_html
  if (item.full_definition_in_html) {
    return String(item.full_definition_in_html);
  }
  
  // Öncelik 3: tanim veya meaning (String veya Nesne Kontrolü)
  if (item.tanim) {
    if (typeof item.tanim === "string") return item.tanim;
    if (typeof item.tanim === "object" && (item.tanim as any)?.meaning) {
      return String((item.tanim as any).meaning);
    }
  }

  if (item.meaning && typeof item.meaning === "string") {
    return item.meaning;
  }

  return null;
}