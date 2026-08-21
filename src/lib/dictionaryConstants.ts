// @/lib/dictionaryConstants.ts

export const KURUMSAL = {
  kirmizi: "#FF4030",
  kirmiziKoyu: "#E02E1F",
  kirmiziAcik: "#FFF1F0",
  sari: "#FFC604",
  sariKoyu: "#D9A400",
  sariAcik: "#FFFBEB",
};

export const VARSAYILAN_TEMA = {
  arkaPlan: "#ffffff",
  yaziAna: "#000000",
  yaziAlt: "#64748b",
  kenarlik: "#e2e8f0",
  kartArkaPlan: "#ffffff",
  inputArkaPlan: "#f8fafc",
};

export const BATI_SOZLUKLERI: Record<string, string> = {
  "0.Ady-Ady_AIG.json": "Adıgece Açıklamalı Sözlük — Адыгабзэм изэхэф гущı1алъ (2006)",
  "1.Ady-Ady_AP.json": "Adıgece-Rusça Sözlük — Prof. Dr. Mirabil L. Apaşev (2008)",
  // ... diğer batı sözlükleri (sayfadaki tüm listeyi buraya kopyalayın)
};

export const DOGU_SOZLUKLERI: Record<string, string> = {
  "5.Ady-Rus_Qarden.json": "Kardanov Kabardeyce-Rusça Sözlük — B. M. Kardanov (1957)",
  "6.Ady-Rus_Sherdjes.json": "Sherdjes Aliy Kabardeyce/Adıgece-Rusça Sözlük — Ali İ. Çerkes (1994)",
  // ... diğer doğu sözlükleri (sayfadaki tüm listeyi buraya kopyalayın)
};

export const KAYNAK_HARITASI: Record<string, string> = { 
  ...BATI_SOZLUKLERI, 
  ...DOGU_SOZLUKLERI 
};

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