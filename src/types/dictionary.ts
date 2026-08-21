import { RefObject, Dispatch, SetStateAction } from "react";
import { type TemaTipi } from "@/utils/helpers";

export type AramaModu = "baslayan" | "icinde" | "tam";
export type LehceTipi = "TUMU" | "BATI" | "DOGU";

// Dialect tipini esnetiyoruz
export type Dialect = "BATI" | "DOGU" | string;

export interface SozlukAnlam {
  [key: string]: any;
}

export interface DictionaryMeta {
  file: string;
  title?: string;
  dialect?: string;
  total_words?: number;
  lang?: string;
  [key: string]: any;
}

export interface DictionaryItem {
  kelime: string;
  tanim: string;
  file?: string;
  kaynak_sozluk?: string;
  dialect?: Dialect | string;
  normalizedKelime?: string;
  normalizedTanim?: string;
  id?: string | number;
  meaning?: string;
  definitions?: SozlukAnlam[];
  full_definition_in_html?: string;
  language?: string;
  dictionaryName?: string;
  [key: string]: any;
}

export interface GruplanmisKelime {
  kelime: string;
  kaynaklar?: DictionaryItem[]; // <-- Drawer ve kartlar için eklendi
  anlamlar: {
    tanim: string;
    file?: string;
    kaynak_sozluk?: string;
    dialect?: string;
    language?: string;
    [key: string]: any;
  }[];
  dialect?: string;
  [key: string]: any;
}

export interface SozlukEkraniProps {
  loading?: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  seciliLehce: LehceTipi;
  setSeciliLehce: (lehce: LehceTipi) => void;
  seciliDosya: string;
  setSeciliDosya: (dosya: string) => void;
  gununKelimesi?: DictionaryItem | null;
  filtrelenmisSonuclar: DictionaryItem[] | GruplanmisKelime[];
  aktifSozlukler: DictionaryMeta[];
  wordsCount?: number;
  [key: string]: any;
}

export interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  mod: AramaModu;
  setMod: (mod: AramaModu) => void;
  hedefDil: string;
  setHedefDil: (dil: string) => void;
  seciliLehce: LehceTipi;
  setSeciliLehce: (lehce: LehceTipi) => void;
  seciliDosya: string;
  setSeciliDosya: (dosya: string) => void;
  aktifSozlukler: DictionaryMeta[];
  metinBoyutu: number;
  karanlikMod: boolean;
  tema: TemaTipi;
  inputRef: RefObject<HTMLInputElement | null>;
  harfEkle: (harf: string) => void;
  kaynagiDuzenle: (dosyaAdi?: string) => string;
  setGoruntulenenAdet: Dispatch<SetStateAction<number>>;
  limit: number;
}

export interface ConceptRow {
  id?: string | number;
  kelime?: string;
  tanim?: string;
  word?: string;
  meaning?: string;
  file?: string;
  dialect?: string;
  language?: string;
  definitions?: any[];
  full_definition_in_html?: string;
  [key: string]: any;
}

// ==========================================
// EKSİK TYPE GUARD (TİP DOĞRULAYICI)
// ==========================================
export function isSozlukTanimi(veri: unknown): veri is DictionaryItem {
  return (
    typeof veri === "object" &&
    veri !== null &&
    ("kelime" in veri || "tanim" in veri || "meaning" in veri || "word" in veri)
  );
}