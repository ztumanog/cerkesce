import manifestData from "@/utils/dictionaries.json";export const KAYNAK_HARITASI: Record<string, string> = {
  // ... harita içeriğin aynen devam ediyor
"1": "Huvaj — Adıgece-Türkçe Sözlük",
  "2": "Kerasheva — Çerkesçe Temel Kelimeler",
  "3": "Paranuk — Adıgece Kavramlar",
  "3.Ady-En": "Adıgece-İngilizce Sözlük",
  "4": "Boran — Çerkesçe Dil Kartları",
  "5": "Tuguz — Çerkesçe Sözlük",
  "6": "Abaza — Abazaca-Türkçe Sözlük",
  "7": "Kube — Çerkesçe Kelimeler",
  "8.Ady-Tur_Huvaj": "Fahri Huvaj — Adıgece-Türkçe Sözlük",
  "9.KBD-TUR_Keras": "Zeynab Kerasheva — Kabardeyce-Türkçe Sözlük",
  "10.Ady-Tur_Paran": "Nihat Paranuk — Adıgece-Türkçe Sözlük",
  "11.KBD-TUR_Boran": "Murat Boran — Kabardeyce-Türkçe Sözlük",
  "12.Ady-TUR_Tuguz": "Ramazan Tuguz — Adıgece-Türkçe Sözlük",
  "13.ABZ-TUR_Abaz": "Abazaca-Türkçe Sözlük",
  "14.KBD-TUR_Kube": "Cevdet Kube — Kabardeyce-Türkçe Sözlük",
  "15.Tur-Ady_Huvaj": "Fahri Huvaj — Türkçe-Adıgece Sözlük",
  "16.Tur-KBD_Boran": "Murat Boran — Türkçe-Kabardeyce Sözlük",
  "17.KBD-RUS_Apazh": "Apazhev & Kokov — Kabardeyce-Rusça Sözlük",
  "18.RUS-KBD_Apazh": "Apazhev & Kokov (2008) — Rusça-Kabardeyce Sözlük",
  "19.Ady-RUS_Thark": "Yusuf Tharkaho — Adıgece-Rusça Sözlük",
  "20.RUS-Ady_Thark": "Yusuf Tharkaho — Rusça-Adıgece Sözlük",
  "21.Ady-ARA_Huvaj": "Fahri Huvaj — Adıgece-Arapça Sözlük",
  "22.ARA-Ady_Huvaj": "Fahri Huvaj — Arapça-Adıgece Sözlük",
  "23.KBD-ENG_Amjad": "Amjad Jaimoukha — Kabardeyce-İngilizce Sözlük",
  "24.Ady-RUS_Vodoz": "Vodozhdokova (1960) — Adıgece-Rusça Sözlük",
  "25.ENG-KBD_Amjad": "Amjad Jaimoukha — İngilizce-Kabardeyce Sözlük",
  "26.Ady-Tur_Lamiq": "Lamiq — Adıgece-Türkçe Sözlük",
  "27.KBD-TUR_Lamiq": "Lamiq — Kabardeyce-Türkçe Sözlük",
  "28.Ady-RUS_Blyag": "Blyagoz — Adıgece-Rusça Sözlük",
  "29.RUS-Ady_Blyag": "Blyagoz — Rusça-Adıgece Sözlük",
  "30.Ady-ETM_Thark": "Tharkaho (1991) — Adıgece Etimoloji Sözlüğü",
};

export const metneCevir = (veri: any): string => {
  if (veri === null || veri === undefined) return "";
  if (typeof veri === "string") return veri;
  if (typeof veri === "number") return String(veri);
  if (typeof veri === "object") {
    return (
      veri.text ||
      veri.word ||
      veri.value ||
      veri.title ||
      veri.name ||
      veri.file ||
      JSON.stringify(veri)
    );
  }
  return String(veri);
};

export const temizeCevir = (metin: string): string => {
  return metin ? metin.trim() : "";
};

// Gelişmiş Normalizasyon (Sayı öneklerini, uzantıları ve büyük/küçük harf farkını temizler)
const normalizeKey = (val: string): string => {
  return val
    .replace(/^\d+[\.\-_]?/, "") // Baştaki sayı öneklerini temizler (Örn: "8." veya "8-")
    .replace(/\.js[oa]?n?$/i, "") // Uzantıları temizler (.json, .jso vs.)
    .replace(/\.txt$/i, "")
    .trim()
    .toLowerCase();
};

export const kaynagiDuzenle = (
  dosyaAdi?: any,
  sozluklerListesi?: any[]
): string => {
  const hamMetin = metneCevir(dosyaAdi);
  if (!hamMetin) return "";

  const arananNormalized = normalizeKey(hamMetin);
  const hedefListe =
    sozluklerListesi && sozluklerListesi.length > 0
      ? sozluklerListesi
      : manifestData;

  // 1. MANIFEST / DICTIONARIES DİNAMİK ARAMA
  if (Array.isArray(hedefListe) && hedefListe.length > 0) {
    const bulunan = hedefListe.find((s) => {
      const sFileNormalized = s?.file ? normalizeKey(s.file) : "";
      const sIdNormalized = s?.id ? String(s.id).trim().toLowerCase() : "";
      
      return (
        sFileNormalized === arananNormalized ||
        sIdNormalized === arananNormalized ||
        sFileNormalized.includes(arananNormalized)
      );
    });

    if (bulunan) {
      const yazar = bulunan.author ? `${bulunan.author} — ` : "";
      return `${yazar}${bulunan.title || bulunan.name}`;
    }
  }

  // 2. YEDEK HARİTA ARAMASI (Fallback)
  const haritaAnahtari = Object.keys(KAYNAK_HARITASI).find(
    (k) => normalizeKey(k) === arananNormalized
  );

  if (haritaAnahtari) {
    return KAYNAK_HARITASI[haritaAnahtari];
  }

  return hamMetin;
};