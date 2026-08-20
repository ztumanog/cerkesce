import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useDeferredValue,
} from "react";
import {
  ExtendedDictionaryItem,
  DictionaryMeta,
  ConceptRow,
} from "@/types/dictionary";
import { temizleHtml } from "@/utils/cleanHtml";

const DEMO_SOZLUKLER: DictionaryMeta[] = [
  { file: "adigece_turkce.json", title: "Demo Sözlük", total_words: 6, dialect: "BATI" },
];

const DEMO_KELIMELER: ExtendedDictionaryItem[] = [
  { kelime: "псы", tanim: "su", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI" },
  { kelime: "Ӏупэ", tanim: "kapı", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI" },
  { kelime: "мафэ", tanim: "güneş / gün", kaynak_sozluk: "Demo", file: "demo", dialect: "BATI" },
];

function normalizeText(text: any): string {
  if (!text || typeof text !== "string") return "";
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

function getLanguageName(item: ExtendedDictionaryItem): string {
  if (item.language) return item.language;
  if (item.dialect === "BATI") return "Adıgece";
  if (item.dialect === "DOGU") return "Kabardeyce";
  return "Bilinmeyen";
}

function parseTanim(val: any): string {
  if (Array.isArray(val?.definitions) && val.definitions.length > 0) {
    const meanings = val.definitions
      .map((d: any) => (typeof d === "string" ? d : d?.meaning || ""))
      .map((m: string) => m.trim())
      .filter(Boolean);
    if (meanings.length > 0) {
      const tip = val?.type?.trim();
      const tipEki = tip ? `[${tip}] ` : "";
      return tipEki + meanings.join("\n");
    }
  }
  if (val?.full_definition_in_html) return temizleHtml(val.full_definition_in_html);
  if (typeof val === "string") return val.trim();
  if (typeof val?.tanim === "string") return val.tanim.trim();
  if (typeof val?.meaning === "string") return val.meaning.trim();
  return "";
}

function parseDictionaryData(rawData: any, meta: DictionaryMeta): ExtendedDictionaryItem[] {
  const wordsObj = rawData?.words || rawData;
  let parsed: ExtendedDictionaryItem[] = [];

  if (Array.isArray(wordsObj)) {
    parsed = wordsObj.map((item: any) => {
      const kelime = item?.kelime || item?.spelling || "";
      const tanim = item?.tanim ? temizleHtml(item.tanim) : parseTanim(item);
      return {
        ...item,
        kelime,
        tanim,
        file: meta.file,
        kaynak_sozluk: meta.title,
        dialect: meta.dialect,
        normalizedKelime: normalizeText(kelime),
        normalizedTanim: normalizeText(tanim),
      };
    });
  } else if (typeof wordsObj === "object" && wordsObj !== null) {
    parsed = Object.entries(wordsObj).map(([key, val]: [string, any]) => {
      const kelime = val?.spelling || key;
      const tanim = parseTanim(val);
      return {
        kelime,
        tanim,
        file: meta.file,
        kaynak_sozluk: meta.title,
        dialect: meta.dialect,
        normalizedKelime: normalizeText(kelime),
        normalizedTanim: normalizeText(tanim),
      };
    });
  }

  return parsed.filter((item) => item.kelime && item.tanim);
}

export function useDictionary() {
  const [aktifSozlukler, setAktifSozlukler] = useState<DictionaryMeta[]>([]);
  const [rawWords, setRawWords] = useState<ExtendedDictionaryItem[]>([]);
  const [wordsCount, setWordsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [seciliLehce, setSeciliLehce] = useState<"TUMU" | "BATI" | "DOGU">("TUMU");
  const [seciliDosya, setSeciliDosya] = useState<string>("TUMU");
  const [gununKelimesi, setGununKelimesi] = useState<ExtendedDictionaryItem | null>(null);

  const cacheRef = useRef<Record<string, ExtendedDictionaryItem[]>>({});
  const deferredSearch = useDeferredValue(searchQuery);

  const loadOne = async (meta: DictionaryMeta): Promise<ExtendedDictionaryItem[]> => {
    if (!meta.file) return []; // Undefined hatasını önleyen güvenlik kontrolü
    if (cacheRef.current[meta.file]) return cacheRef.current[meta.file];
    const res = await fetch(`/data/${meta.file}`);
    if (!res.ok) throw new Error(`${meta.file} 404`);
    const raw = await res.json();
    const result = parseDictionaryData(raw, meta);
    cacheRef.current[meta.file] = result;
    return result;
  };

  useEffect(() => {
    let isMounted = true;

    async function init() {
      setLoading(true);

      // 1. Manifest yükle
      let manifest: DictionaryMeta[] = [];
      try {
        const res = await fetch("/data/dictionaries.json");
        if (res.ok) manifest = await res.json();
      } catch {
        console.warn("Manifest yüklenemedi.");
      }
      if (!Array.isArray(manifest) || manifest.length === 0) {
        manifest = DEMO_SOZLUKLER;
      }
      if (isMounted) setAktifSozlukler(manifest);

      // 2. Hedef sözlükleri belirle
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

      // 3. İlk 3 sözlüğü hemen yükle
      const ilkGrup = hedef.slice(0, 3);
      const kalanGrup = hedef.slice(3);

      let ilkKelimeler: ExtendedDictionaryItem[] = [];
      const ilkSonuclar = await Promise.allSettled(ilkGrup.map(loadOne));
      ilkSonuclar.forEach((r) => {
        if (r.status === "fulfilled") ilkKelimeler.push(...r.value);
      });

      if (!isMounted) return;

      if (ilkKelimeler.length === 0) {
        setRawWords(DEMO_KELIMELER);
        setWordsCount(DEMO_KELIMELER.length);
      } else {
        setRawWords(ilkKelimeler);
        setWordsCount(ilkKelimeler.length);
      }
      setLoading(false);

      // 4. Kalan sözlükleri batch'ler halinde arka planda yükle
      if (kalanGrup.length === 0) return;
      const BATCH = 4;
      let tumKelimeler = [...ilkKelimeler];

      for (let i = 0; i < kalanGrup.length; i += BATCH) {
        if (!isMounted) return;
        const batch = kalanGrup.slice(i, i + BATCH);
        const sonuclar = await Promise.allSettled(batch.map(loadOne));
        const yeni: ExtendedDictionaryItem[] = [];
        sonuclar.forEach((r) => {
          if (r.status === "fulfilled") yeni.push(...r.value);
        });
        if (yeni.length > 0 && isMounted) {
          tumKelimeler = [...tumKelimeler, ...yeni];
          setRawWords([...tumKelimeler]);
          setWordsCount(tumKelimeler.length);
        }
      }
    }

    init();
    return () => { isMounted = false; };
  }, [seciliDosya, seciliLehce]);

  useEffect(() => {
    if (rawWords.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    const idx = hashString(today) % rawWords.length;
    setGununKelimesi(rawWords[idx]);
  }, [rawWords]);

  const filtrelenmisSonuclar = useMemo(() => {
    let veri = rawWords;
    if (seciliLehce !== "TUMU") veri = veri.filter((i) => i.dialect === seciliLehce);
    if (seciliDosya !== "TUMU") veri = veri.filter((i) => i.file === seciliDosya);
    if (deferredSearch.trim()) {
      const q = normalizeText(deferredSearch);
      veri = veri.filter(
        (i) => i.normalizedKelime?.includes(q) || i.normalizedTanim?.includes(q)
      );
    }
    return veri;
  }, [rawWords, seciliLehce, seciliDosya, deferredSearch]);

  const conceptRows = useMemo(() => {
    const groups = new Map<string, ConceptRow>();
    filtrelenmisSonuclar.forEach((item) => {
      const key = item.normalizedTanim || item.tanim;
      if (!groups.has(key)) groups.set(key, {});
      const row = groups.get(key)!;
      const lang = getLanguageName(item);
      row[lang] = item.kelime;
      if (!row["Türkçe"] && item.tanim) row["Türkçe"] = item.tanim.split(";")[0].trim();
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
    gununKelimesi,
    filtrelenmisSonuclar,
    conceptRows,
    aktifSozlukler,
  };
}