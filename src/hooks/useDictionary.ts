"use client";

import { useState, useEffect } from "react";
import type { 
  AramaModu, 
  LehceTipi, 
  DictionaryItem, 
  DictionaryMeta,
  UseDictionaryReturn 
} from "@/types/dictionary";

export function useDictionary(): UseDictionaryReturn {
  // 1. Arama ve Filtre State Tanımlamaları
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hedefDil, setHedefDil] = useState<string>("TUMU");
  const [seciliLehce, setSeciliLehce] = useState<LehceTipi>("TUMU");
  const [seciliDosya, setSeciliDosya] = useState<string>("TUMU");
  const [aramaModu, setAramaModu] = useState<AramaModu>("prefix");
  const [limit, setLimit] = useState<number>(20);

  // 2. Veri Yükleme ve Sonuç State Tanımlamaları
  const [aktifSozlukler, setAktifSozlukler] = useState<DictionaryMeta[]>([]);
  const [tumKelimeler, setTumKelimeler] = useState<DictionaryItem[]>([]);
  const [filtrelenmisSonuclar, setFiltrelenmisSonuclar] = useState<DictionaryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [wordsCount, setWordsCount] = useState<number>(0);

  /**
   * ADIM 1: Sözlük Manifest Dosyasını (dictionaries.json) Yükleme
   */
  useEffect(() => {
    async function manifestYukle(): Promise<void> {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/data/dictionaries.json");
        if (!res.ok) {
          throw new Error(`Manifest yüklenemedi. Durum Kodu: ${res.status}`);
        }

        const manifest: DictionaryMeta[] = await res.json();
        setAktifSozlukler(manifest);

        // Manifest üzerindeki toplam kelime sayısını hesapla
        const manifestKelimeSayisi = manifest.reduce(
          (sum, dict) => sum + (dict.total_words || dict.wordCount || dict.count || 0), 
          0
        );
        setWordsCount(manifestKelimeSayisi);

      } catch (err) {
        const message = err instanceof Error ? err.message : "Bilinmeyen bir hata oluştu";
        setError(message);
        console.error("❌ Manifest yükleme hatası:", message);
      } finally {
        setLoading(false);
      }
    }

    manifestYukle();
  }, []);

  /**
   * ADIM 2: Aktif Sözlük JSON Dosyalarını Toplu (Batch) Yükleme
   */
  useEffect(() => {
    if (aktifSozlukler.length === 0) return;

    async function sozlukleriYukle(): Promise<void> {
      try {
        setLoading(true);

        const promises = aktifSozlukler.map(async (dict) => {
          const filePath = dict.file.startsWith("/") ? dict.file : `/data/${dict.file}`;
          
          try {
            const res = await fetch(filePath);
            if (!res.ok) {
              console.warn(`⚠️ Dosya okunamadı: ${filePath} (HTTP ${res.status})`);
              return [];
            }
            const data = await res.json();
            
            // Eğer veriler dizi değilse uygun alandan diziyi çıkar
            const items: DictionaryItem[] = Array.isArray(data) ? data : (data.words || data.entries || []);
            
            // Verilere ait oldukları dosya bilgisini ekle
            return items.map((item) => ({
              ...item,
              file: item.file || dict.file,
              dialect: item.dialect || dict.dialect,
            }));

          } catch (fetchErr) {
            console.error(`❌ Fetch hatası (${filePath}):`, fetchErr);
            return [];
          }
        });

        const results = await Promise.all(promises);
        const allItems = results.flat();

        setTumKelimeler(allItems);
        
        // Yüklenen gerçek kelime sayısı varsa güncelle
        if (allItems.length > 0) {
          setWordsCount(allItems.length);
        }

      } catch (err) {
        console.error("❌ Genel sözlük yükleme hatası:", err);
      } finally {
        setLoading(false);
      }
    }

    sozlukleriYukle();
  }, [aktifSozlukler]);

  /**
   * ADIM 3: Gelişmiş Canlı Arama, Çoklu Filtreleme ve Limit Uygulaması
   */
  useEffect(() => {
    // Arama sorgusu boşsa sonuçları temizle
    if (!searchQuery.trim()) {
      setFiltrelenmisSonuclar([]);
      return;
    }

    const aranan = searchQuery.toLowerCase().trim();

    const eşleşenler = tumKelimeler.filter((item) => {
      // 1. Lehçe Filtresi Kontrolü
      if (seciliLehce !== "TUMU") {
        const itemLehce = item.dialect;
        if (itemLehce && itemLehce !== seciliLehce) {
          return false;
        }
      }

      // 2. Hedef Dil Filtresi Kontrolü
      if (hedefDil !== "TUMU") {
        const itemDil = item.targetLanguage || item.hedefDil || item.toLang || item.language;
        if (itemDil && itemDil.toLowerCase() !== hedefDil.toLowerCase()) {
          return false;
        }
      }

      // 3. Sözlük Dosyası Filtresi Kontrolü
      if (seciliDosya !== "TUMU") {
        const itemDosya = item.file || item.kaynakSozluk || item.kaynak_sozluk || item.dictionaryId;
        if (itemDosya && itemDosya !== seciliDosya) {
          return false;
        }
      }

      // 4. Metin Eşleşme Kontrolü (Kelime ve Tanım)
      const kelime = (item.kelime || item.word || "").toLowerCase();
      const tanim = (item.tanim || item.definition || item.meaning || item.birincilTanim || "").toLowerCase();

      if (aramaModu === "exact") {
        return kelime === aranan;
      } else if (aramaModu === "prefix") {
        return kelime.startsWith(aranan);
      } else if (aramaModu === "contains") {
        return kelime.includes(aranan) || tanim.includes(aranan);
      } else if (aramaModu === "fuzzy") {
        return kelime.includes(aranan) || tanim.includes(aranan);
      }

      return true;
    });

    // Seçilen limit kadarlık kısmı sonuç state'ine aktar
    setFiltrelenmisSonuclar(eşleşenler.slice(0, limit));

  }, [searchQuery, aramaModu, seciliLehce, hedefDil, seciliDosya, limit, tumKelimeler]);

  return {
    searchQuery,
    setSearchQuery,
    hedefDil,
    setHedefDil,
    seciliLehce,
    setSeciliLehce,
    seciliDosya,
    setSeciliDosya,
    aramaModu,
    setAramaModu,
    mod: aramaModu,
    setMod: setAramaModu,
    limit,
    setLimit,
    aktifSozlukler,
    filtrelenmisSonuclar,
    loading,
    error,
    wordsCount,
  };
}

export default useDictionary;