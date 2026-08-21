import { RefObject, Dispatch, SetStateAction } from "react";
import { type TemaTipi } from "@/utils/helpers";

export type AramaModu = "baslayan" | "icinde" | "tam";
export type LehceTipi = "TUMU" | "BATI" | "DOGU";
export type Dialect = "BATI" | "DOGU";

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
  dialect?: string;
  file?: string;
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