// src/lib/DictionaryService.ts

import { isSozlukTanimi } from "@/types/dictionary";

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
  // TS18046 HATASININ ÇÖZÜMÜ: Veri burada Type Guard'dan geçer
  if (!isSozlukTanimi(veri)) return null;

  // Öncelik 1: definitions[].meaning
  if (veri.definitions && veri.definitions.length > 0 && veri.definitions[0].meaning) {
    return veri.definitions[0].meaning;
  }
  
  // Öncelik 2: full_definition_in_html
  if (veri.full_definition_in_html) {
    return veri.full_definition_in_html;
  }
  
  // Öncelik 3: tanim/meaning
  if (veri.tanim && veri.tanim.meaning) {
    return veri.tanim.meaning;
  }

  return null;
}