"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useDeferredValue,
} from "react";
import type {
  DictionaryItem,
  DictionaryMeta,
  ConceptRow,
  LehceTipi,
} from "@/types/dictionary";
import { temizleHtml } from "@/utils/cleanHtml";

// Sözlük başlığından Dil Çifti ve Yazar bilgisini otomatik ayıklayan yardımcı fonksiyon
export function formatDictionaryTitle(title: string) {
  if (!title) return { dilCifti: "Bilinmeyen Sözlük", yazar: "Kaynak Belirtilmedi" };

  const parts = title.split(/\s+[\?—-]\s+/);

  if (parts.length >= 2) {
    const dilCifti = parts[0].replace(/\(.*?\)/g, "").trim();
    const yazar = parts[1].replace(/\(.*?\)/g, "").trim();
    return { dilCifti, yazar };
  }

  const temizTitle = title.replace(/\(.*?\)/g, "").trim();
  return { dilCifti: temizTitle, yazar: "Genel Kaynak" };
}

const DEMO_SOZLUKLER: DictionaryMeta[] = [
  { file: "8.Ady-Tur_Huvaj.json", title: "Demo Sözlük", total_words: 6, dialect: "BATI", fromLang: "ady", toLang: "tr" },
];

const DEMO_KELIMELER: DictionaryItem[] = [
  { kelime: "псы", tanim: "su", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI", toLang: "tr" },
  { kelime: "Ӏупэ", tanim: "kapı", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI", toLang: "tr" },
  { kelime: "мафэ", tanim: "güneş / gün", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI", toLang: "tr" },
];

function normalizeText(text: unknown): string {
  if (typeof text !== "string" || !text) return "";
  return text.normalize("NFC").toLocaleLowerCase("tr").trim();
}

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function getLanguageName(item: DictionaryItem): string {
  if (item.language) return item.language;
  if (item.dialect === "BATI") return "Adigece";
  if (item.dialect === "DOGU") return "Kabardeyce";
  return "Bilinmeyen";
}

function parseTanim(val: unknown): string {
  if (typeof val !== "object" || val === null) {
    return typeof val === "string" ? val.trim() : "";
  }

  const obj = val as Record<string, unknown>;

  if (Array.isArray(obj.definitions) && obj.definitions.length > 0) {
    const meanings = obj.definitions
      .map((d) => {
        if (typeof d === "string") return d.trim();
        if (typeof d === "object" && d !== null && "meaning" in d) {
          const m = (d as Record<string, unknown>).meaning;
          return typeof m === "string" ? m.trim() : "";
        }
        return "";
      })
      .filter(Boolean);

    if (meanings.length > 0) {
      const tip = typeof obj.type === "string" ? obj.type.trim() : "";
      return (tip ? `[${tip}] ` : "") + meanings.join("\n");
    }
  }

  if (typeof obj.full_definition_in_html === "string" && obj.full_definition_in_html) {
    return temizleHtml(obj.full_definition_in_html);
  }

  if (typeof obj.tanim === "string" && obj.tanim) return obj.tanim.trim();
  if (typeof obj.meaning === "string" && obj.meaning) return obj.meaning.trim();

  return "";
}

function parseDictionaryData(rawData: unknown, meta: DictionaryMeta): DictionaryItem[] {
  if (typeof rawData !== "object" || rawData === null) return [];

  const record = rawData as Record<string, unknown>;
  const wordsObj = record.words ?? rawData;
  
  // JSON dosyasının üst seviyesinde veya manifest'te toLang / fromLang varsa al
  const rootFromLang = (record.fromLang || meta.fromLang || "") as string;
  const rootToLang = (record.toLang || meta.toLang || "") as string;

  let parsed: DictionaryItem[] = [];

  if (Array.isArray(wordsObj)) {
    parsed = wordsObj.map((item) => {
      if (typeof item !== "object" || item === null) return { kelime: "", tanim: "" };
      const itemObj = item as Record<string, unknown>;
      const kelime =
        typeof itemObj.kelime === "string"
          ? itemObj.kelime
          : typeof itemObj.spelling === "string"
          ? itemObj.spelling
          : "";
      const tanim =
        typeof itemObj.tanim === "string" && itemObj.tanim
          ? temizleHtml(itemObj.tanim)
          : parseTanim(itemObj);

      return {
        ...(itemObj as unknown as DictionaryItem),
        kelime,
        tanim,
        file: meta.file,
        kaynak_sozluk: meta.title,
        dialect: meta.dialect,
        fromLang: (itemObj.fromLang as string) || rootFromLang,
        toLang: (itemObj.toLang as string) || rootToLang,
        normalizedKelime: normalizeText(kelime),
        normalizedTanim: normalizeText(tanim),
      };
    });
  } else if (typeof wordsObj === "object" && wordsObj !== null) {
    parsed = Object.entries(wordsObj as Record<string, unknown>).map(([key, val]) => {
      const valObj = typeof val === "object" && val !== null ? (val as Record<string, unknown>) : {};
      const kelime = typeof valObj.spelling === "string" ? valObj.spelling : key;
      const tanim = parseTanim(val);

      return {
        kelime,
        tanim,
        file: meta.file,
        kaynak_sozluk: meta.title,
        dialect: meta.dialect,
        fromLang: rootFromLang,
        toLang: rootToLang,
        normalizedKelime: normalizeText(kelime),
        normalizedTanim: normalizeText(tanim),
      };
    });
  }

  return parsed.filter((item) => item.kelime && item.tanim);
}

// Ana Hook Tanımı
export function useDictionary() {
  const [aktifSozlukler, setAktifSozlukler] = useState<DictionaryMeta[]>([]);
  const [rawWords, setRawWords] = useState<DictionaryItem[]>([]);
  const [wordsCount, setWordsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seciliLehce, setSeciliLehce] = useState<LehceTipi>("TUMU");
  const [seciliDosya, setSeciliDosya] = useState<string>("TUMU");
  const [hedefDil, setHedefDil] = useState<string>("tumu"); // DÜZELTME: hedefDil State'i Eklendi
  const [gununKelimesi, setGununKelimesi] = useState<DictionaryItem | null>(null);

  const cacheRef = useRef<Record<string, DictionaryItem[]>>({});
  const deferredSearch = useDeferredValue(searchQuery);

  const loadOne = async (meta: DictionaryMeta, signal?: AbortSignal): Promise<DictionaryItem[]> => {
    if (!meta.file) return [];
    if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];

    try {
      const safeFileName = encodeURIComponent(meta.file.trim());
      const res = await fetch(`/data/${safeFileName}`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const raw: unknown = await res.json();
      const result = parseDictionaryData(raw, meta);
      cacheRef.current[meta.file] = result;
      return result;
    } catch (error: any) {
      if (error.name === "AbortError") {
        return [];
      }
      console.error(`[Sözlük Yükleme Hatası - ${meta.file}]:`, error);
      return [];
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function init() {
      setLoading(true);

      let manifest: DictionaryMeta[] = [];
      try {
        const res = await fetch("/data/dictionaries.json", { signal: controller.signal });
        if (res.ok) manifest = (await res.json()) as DictionaryMeta[];
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.warn("Manifest okunamadı, fallback sözlükler aktif.");
        }
      }

      if (!Array.isArray(manifest) || manifest.length === 0) {
        manifest = DEMO_SOZLUKLER;
      }
      if (isMounted) setAktifSozlukler(manifest);

      const hedef =
        seciliDosya !== "TUMU"
          ? manifest.filter((d) => d.file === seciliDosya)
          : seciliLehce !== "TUMU"
          ? manifest.filter((d) => d.dialect === seciliLehce)
          : manifest;

      if (hedef.length === 0) {
        if (isMounted) {
          setRawWords(DEMO_KELIMELER);
          setWordsCount(DEMO_KELIMELER.length);
          setLoading(false);
        }
        return;
      }

      const ilkGrup = hedef.slice(0, 3);
      const kalanGrup = hedef.slice(3);

      const ilkKelimeler: DictionaryItem[] = [];
      const ilkSonuclar = await Promise.allSettled(
        ilkGrup.map((meta) => loadOne(meta, controller.signal))
      );
      
      ilkSonuclar.forEach((r) => {
        if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
      });

      if (!isMounted || controller.signal.aborted) return;

      if (ilkKelimeler.length === 0) {
        setRawWords(DEMO_KELIMELER);
        setWordsCount(DEMO_KELIMELER.length);
      } else {
        setRawWords(ilkKelimeler);
        setWordsCount(ilkKelimeler.length);
      }
      setLoading(false);

      if (kalanGrup.length === 0) return;
      
      const BATCH = 3;
      let tumKelimeler = [...ilkKelimeler];

      for (let i = 0; i < kalanGrup.length; i += BATCH) {
        if (!isMounted || controller.signal.aborted) return;
        const batch = kalanGrup.slice(i, i + BATCH);
        
        const sonuclar = await Promise.allSettled(
          batch.map((meta) => loadOne(meta, controller.signal))
        );

        const yeni: DictionaryItem[] = [];
        sonuclar.forEach((r) => {
          if (r.status === "fulfilled") yeni.push(...r.value);
        });

        if (yeni.length > 0 && isMounted && !controller.signal.aborted) {
          tumKelimeler = [...tumKelimeler, ...yeni];
          setRawWords([...tumKelimeler]);
          setWordsCount(tumKelimeler.length);
        }
      }
    }

    init();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [seciliDosya, seciliLehce]);

  useEffect(() => {
    if (rawWords.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const idx = hashString(today) % rawWords.length;
    setGununKelimesi(rawWords[idx]);
  }, [rawWords]);

  // DÜZELTME: Hedef Dil Filtrelemesi Entegre Edildi
  const filtrelenmisSonuclar = useMemo(() => {
    let veri = rawWords;
    
    if (seciliLehce !== "TUMU") {
      veri = veri.filter((i) => i.dialect === seciliLehce);
    }
    
    if (seciliDosya !== "TUMU") {
      veri = veri.filter((i) => i.file === seciliDosya);
    }

    if (hedefDil !== "tumu") {
      const targetLang = hedefDil.toLowerCase();
      veri = veri.filter((i) => {
        const itemToLang = (i.toLang || "").toLowerCase();
        return itemToLang === targetLang || itemToLang.startsWith(targetLang);
      });
    }

    if (deferredSearch.trim()) {
      const q = normalizeText(deferredSearch);
      veri = veri.filter(
        (i) => i.normalizedKelime?.includes(q) || i.normalizedTanim?.includes(q)
      );
    }
    
    return veri;
  }, [rawWords, seciliLehce, seciliDosya, hedefDil, deferredSearch]);

  const conceptRows = useMemo(() => {
    const groups = new Map<string, ConceptRow>();
    filtrelenmisSonuclar.forEach((item) => {
      const key = normalizeText(item.kelime);
      if (!key) return;

      if (!groups.has(key)) {
        groups.set(key, {});
      }
      const row = groups.get(key)!;
      const lang = getLanguageName(item);
      row[lang] = item.kelime;
      if (!row["Türkçe"] && item.tanim) {
        row["Türkçe"] = item.tanim.split(";")[0].trim();
      }
    });
    return Array.from(groups.values());
  }, [filtrelenmisSonuclar]);

  return {
    wordsCount,
    loading,
    searchQuery,
    setSearchQuery,
    seciliLehce,
    setSeciliLehce,
    seciliDosya,
    setSeciliDosya,
    hedefDil,        // DÜZELTME: Dışarı aktarıldı
    setHedefDil,    // DÜZELTME: Dışarı aktarıldı
    gununKelimesi,
    filtrelenmisSonuclar,
    conceptRows,
    aktifSozlukler,
  };
}

export default useDictionary;