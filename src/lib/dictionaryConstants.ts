// src/lib/dictionaryConstants.ts

/**
 * Açık Mektep Kurumsal Renk Paleti
 */
export const KURUMSAL = {
  kirmizi: "#FF4030",
  kirmiziKoyu: "#E02E1F",
  kirmiziAcik: "#FFF1F0",
  kirmiziOpak: "rgba(255, 64, 48, 0.12)",
  sari: "#FFC604",
  sariKoyu: "#D9A400",
  sariAcik: "#FFFBEB",
  sariOpak: "rgba(255, 198, 4, 0.15)",
  mavi: "#2B6CB0",
  yesil: "#2F855A",
} as const;

/**
 * Tema Renk Tanımları (Açık & Karanlık Mod)
 */
export interface TemaSemasi {
  kartArkaPlan: string;
  inputArkaPlan: string;
  inputFocusArkaPlan: string;
  yaziAna: string;
  yaziAlt: string;
  kenarlik: string;
  kenarlikHover: string;
  golge: string;
}

export const TEMA: { acik: TemaSemasi; karanlik: TemaSemasi } = {
  acik: {
    kartArkaPlan: "#FFFFFF",
    inputArkaPlan: "#F8FAFC",
    inputFocusArkaPlan: "#FFFFFF",
    yaziAna: "#1E293B",
    yaziAlt: "#64748B",
    kenarlik: "#E2E8F0",
    kenarlikHover: "#CBD5E1",
    golge: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
  },
  karanlik: {
    kartArkaPlan: "#1E293B",
    inputArkaPlan: "#0F172A",
    inputFocusArkaPlan: "#1E293B",
    yaziAna: "#F8FAFC",
    yaziAlt: "#94A3B8",
    kenarlik: "#334155",
    kenarlikHover: "#475569",
    golge: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3)",
  },
};

export const VARSAYILAN_TEMA = TEMA.acik;

/**
 * Sözlük Meta Veri Tipleri
 */
export interface SozlukMeta {
  dilCifti: string;
  yazar: string;
}

/**
 * Batı Adıgece Sözlük Haritası
 */
export const BATI_SOZLUKLERI: Record<string, SozlukMeta> = {
  "0.Ady-Ady_AIG.json": {
    dilCifti: "Adıgece Açıklamalı Sözlük",
    yazar: "Адыгабзэм изэхэф (2006)",
  },
  "1.Ady-Rus_AP.json": {
    dilCifti: "Adıgece-Rusça",
    yazar: "Mirabil Apaşev",
  },
  "2.Ady-Ara_Lash.json": {
    dilCifti: "Adıgece-Arapça",
    yazar: "Adel Lash",
  },
  "3.Ady-En_Community.json": {
    dilCifti: "Adıgece-İngilizce",
    yazar: "Topluluk Katkısı",
  },
  "4.Ady-En_Adam.json": {
    dilCifti: "Adıgece-İngilizce",
    yazar: "Adam Shagash",
  },
  "10.En-Ady_Adam.json": {
    dilCifti: "İngilizce-Adıgece",
    yazar: "Adam Shagash",
  },
  "14.Tur-Ady_Huvaj.json": {
    dilCifti: "Türkçe-Adıgece",
    yazar: "Fahri Huvaj",
  },
  "15.Ady-Tur_Huvaj.json": {
    dilCifti: "Adıgece-Türkçe",
    yazar: "Fahri Huvaj",
  },
  "adigece_turkce.json": {
    dilCifti: "Adıgece-Türkçe",
    yazar: "Açık Mektep",
  },
};

/**
 * Doğu Adıgece (Kabardeyce) Sözlük Haritası
 */
export const DOGU_SOZLUKLERI: Record<string, SozlukMeta> = {
  "5.Ady-Rus_Qarden.json": {
    dilCifti: "Kabardeyce-Rusça",
    yazar: "B. M. Kardanov",
  },
  "6.Ady-Rus_Sherdjes.json": {
    dilCifti: "Kabardeyce/Adıgece-Rusça",
    yazar: "Ali İ. Çerkes",
  },
  "17.Kbd-En_Amjad.json": {
    dilCifti: "Kabardeyce-İngilizce",
    yazar: "Amjad Jaimoukha",
  },
  "18.Kbd-En_Jonty_v2.json": {
    dilCifti: "Kabardeyce-İngilizce v2",
    yazar: "Jonty Yamisha",
  },
  "19.Kbd-En_Jonty_v1.json": {
    dilCifti: "Kabardeyce-İngilizce v1",
    yazar: "Jonty Yamisha",
  },
  "20.Kbd-En_Ziwar.json": {
    dilCifti: "Kabardeyce-İngilizce",
    yazar: "Ziwar Gish",
  },
  "kab_tr.json": {
    dilCifti: "Kabardeyce-Türkçe",
    yazar: "Açık Mektep",
  },
};

/**
 * Birleşik Ana Sözlük Haritası (Tek Doğruluk Kaynağı)
 */
export const SOZLUK_META: Record<string, SozlukMeta> = {
  ...BATI_SOZLUKLERI,
  ...DOGU_SOZLUKLERI,
};

export const KAYNAK_HARITASI = SOZLUK_META;

/**
 * Dilbilgisi Tür Haritası
 */
export const TUR_MAP: Record<string, string> = {
  verb: "Fiil",
  noun: "İsim",
  adjective: "Sıfat",
  adverb: "Zarf",
  "auxiliary verb": "Yardımcı Fiil",
  auxiliary: "Yardımcı Fiil",
  suffix: "Ek",
  "verbal suffix": "Fiil Eki",
  prefix: "Önek",
  preposition: "Edat",
  conjunction: "Bağlaç",
  pronoun: "Zamir",
};