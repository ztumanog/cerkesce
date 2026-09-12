import { RefObject, Dispatch, SetStateAction } from "react";
import { type TemaTipi } from "@/utils/helpers";
import { 
  DictionaryMeta, 
  DictionaryItem 
} from "@/types/dictionary";

export type AramaModu = "baslayan" | "icinde" | "tam";
export type LehceTipi = "TUMU" | "western" | "DOGU";
export type Dialect = "western" | "DOGU";

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

