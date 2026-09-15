import { RefObject, Dispatch, SetStateAction } from "react";
import { DictionaryMeta } from "@/types/dictionary";

export type AramaModu = "baslayan" | "icinde" | "tam";
export type Dialect = "western" | "DOGU";
export type LehceTipi = "TUMU" | Dialect;

export interface SearchBoxProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  mod: AramaModu;
  setMod: Dispatch<SetStateAction<AramaModu>>;
  hedefDil: string;
  setHedefDil: Dispatch<SetStateAction<string>>;
  seciliLehce: LehceTipi;
  setSeciliLehce: Dispatch<SetStateAction<LehceTipi>>;
  seciliDosya: string;
  setSeciliDosya: Dispatch<SetStateAction<string>>;
  aktifSozlukler: DictionaryMeta[];
  metinBoyutu: number;
  karanlikMod: boolean;
  tema: string;
  inputRef: RefObject<HTMLInputElement | null>;
  harfEkle: (harf: string) => void;
  kaynagiDuzenle: (dosyaAdi?: string) => string;
  setGoruntulenenAdet: Dispatch<SetStateAction<number>>;
  limit: number;
}