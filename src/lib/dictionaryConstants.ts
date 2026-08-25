import type {
  DictionaryItem,
  DictionaryMeta,
  LehceTipi,
} from "@/types/dictionary";

type SozlukVerisi =
  | DictionaryMeta
  | DictionaryItem
  | Record<string, unknown>;

/**
 * Bilinmeyen değeri güvenli biçimde metne çevirir.
 */
const metin = (value: unknown): string => {
  return typeof value === "string"
    ? value.trim()
    : "";
};

/**
 * Türkçe karakterleri filtre karşılaştırmasına
 * uygun standart biçime dönüştürür.
 */
const kucult = (value: unknown): string => {
  return metin(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .trim();
};

/**
 * Sözlüğün gerçek dosya adını döndürür.
 *
 * file yalnızca eşleştirme ve yükleme için kullanılır.
 */
export const sozlukDosyasi = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<
    string,
    unknown
  >;

  return (
    metin(item.file) ||
    metin(item.kaynak_sozluk) ||
    metin(item.filename) ||
    metin(item.dictionaryFile)
  );
};

/**
 * Kullanıcıya gösterilecek sözlük adını döndürür.
 *
 * Öncelik sırası:
 * title → shortLabel → label → ad →
 * dictionaryName → dosya adı
 */
export const sozlukGorunenAdi = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<
    string,
    unknown
  >;

  return (
    metin(item.title) ||
    metin(item.shortLabel) ||
    metin(item.label) ||
    metin(item.ad) ||
    metin(item.dictionaryName) ||
    sozlukDosyasi(sozluk).replace(
      /\.json$/i,
      ""
    ) ||
    "İsimsiz sözlük"
  );
};

/**
 * Huvaj ve İbrahim Alhaz Abaze
 * istisnasını tespit eder.
 *
 * Bu iki sözlük hem BATI hem DOGU
 * filtresinde gösterilir.
 */
export const ciftDiyalektIstisnasiMi = (
  sozluk: SozlukVerisi
): boolean => {
  const item = sozluk as Record<
    string,
    unknown
  >;

  const dosya = kucult(
    sozlukDosyasi(sozluk)
  );

  const baslik = kucult(item.title);

  const yazar = kucult(
    item.author || item.yazar
  );

  return (
    dosya.includes("huvaj") ||
    baslik.includes("huvaj") ||
    yazar.includes("huvaj") ||
    dosya.includes("abaze") ||
    baslik.includes("abaze") ||
    yazar.includes("abaze") ||
    yazar.includes("ibrahim alhaz")
  );
};

/**
 * Sözlüğün hangi diyalektlerde
 * gösterileceğini döndürür.
 */
export const sozlukDiyalektleri = (
  sozluk: SozlukVerisi
): string[] => {
  if (
    ciftDiyalektIstisnasiMi(sozluk)
  ) {
    return ["BATI", "DOGU"];
  }

  const item = sozluk as Record<
    string,
    unknown
  >;

  const dialect = kucult(
    item.dialect ||
      item.lehce ||
      item.diyalekt ||
      item.dialectName ||
      item.lehceAdi
  );

  if (
    dialect === "bati" ||
    dialect.includes("bati") ||
    dialect.includes("adige")
  ) {
    return ["BATI"];
  }

  if (
    dialect === "dogu" ||
    dialect.includes("dogu") ||
    dialect.includes("kabardey")
  ) {
    return ["DOGU"];
  }

  return [];
};

/**
 * Arayüzdeki diyalekt değerini
 * sistem değerine çevirir.
 */
export const diyalektKodunaCevir = (
  lehce: LehceTipi | string
): string => {
  const filtre = kucult(lehce);

  if (
    !filtre ||
    filtre === "tumu" ||
    filtre === "hepsi" ||
    filtre === "all" ||
    filtre === "tum"
  ) {
    return "TUMU";
  }

  if (
    filtre.includes("bati") ||
    filtre.includes("adige")
  ) {
    return "BATI";
  }

  if (
    filtre.includes("dogu") ||
    filtre.includes("kabardey")
  ) {
    return "DOGU";
  }

  return "";
};

/**
 * Sözlük diyalekt filtresine uyuyor mu?
 */
export const diyalektUyuyorMu = (
  sozluk: SozlukVerisi,
  seciliLehce: LehceTipi | string
): boolean => {
  const filtre =
    diyalektKodunaCevir(seciliLehce);

  if (
    !filtre ||
    filtre === "TUMU"
  ) {
    return true;
  }

  return sozlukDiyalektleri(
    sozluk
  ).includes(filtre);
};

/**
 * targetLanguage alanını standartlaştırır.
 */
export const hedefDilKodu = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<
    string,
    unknown
  >;

  const dil = kucult(
    item.targetLanguage ||
      item.target_language ||
      item.toLang ||
      item.hedefDili ||
      item.hedefDil ||
      item.language ||
      item.dil
  );

  if (
    dil === "en" ||
    dil === "eng" ||
    dil === "ingilizce"
  ) {
    return "en";
  }

  if (
    dil === "ar" ||
    dil === "ara" ||
    dil === "arapca"
  ) {
    return "ar";
  }

  if (
    dil === "tr" ||
    dil === "tur" ||
    dil === "tu" ||
    dil === "turkce"
  ) {
    return "tr";
  }

  if (
    dil === "ru" ||
    dil === "rus"
  ) {
    return "ru";
  }

  if (
    dil === "ady" ||
    dil === "adigece" ||
    dil === "adige"
  ) {
    return "ady";
  }

  if (
    dil === "kbd" ||
    dil === "kabardeyce" ||
    dil === "kabardey"
  ) {
    return "kbd";
  }

  return "";
};

/**
 * Kullanıcının seçtiği dil değerini
 * sistem koduna çevirir.
 */
export const seciliDilKodu = (
  seciliDil: string
): string => {
  const dil = kucult(seciliDil);

  if (
    !dil ||
    dil === "tumu" ||
    dil === "hepsi" ||
    dil === "all" ||
    dil === "tum"
  ) {
    return "TUMU";
  }

  if (
    dil === "en" ||
    dil === "eng" ||
    dil === "ingilizce"
  ) {
    return "en";
  }

  if (
    dil === "ar" ||
    dil === "ara" ||
    dil === "arapca"
  ) {
    return "ar";
  }

  if (
    dil === "tr" ||
    dil === "tur" ||
    dil === "tu" ||
    dil === "turkce"
  ) {
    return "tr";
  }

  if (
    dil === "ru" ||
    dil === "rus" ||
    dil === "rusca"
  ) {
    return "ru";
  }

  if (
    dil === "ady" ||
    dil === "adigece" ||
    dil === "adige"
  ) {
    return "ady";
  }

  if (
    dil === "kbd" ||
    dil === "kabardeyce" ||
    dil === "kabardey"
  ) {
    return "kbd";
  }

  return dil;
};

/**
 * Dil filtresine göre sözlük
 * kontrolü yapar.
 */
export const hedefDilUyuyorMu = (
  sozluk: SozlukVerisi,
  seciliDil: string
): boolean => {
  const filtre =
    seciliDilKodu(seciliDil);

  if (
    !filtre ||
    filtre === "TUMU"
  ) {
    return true;
  }

  return (
    hedefDilKodu(sozluk) === filtre
  );
};

/**
 * Sözlükte kaynak dil ile ilgili
 * filtre kontrolü yapar.
 */
export const kaynakDilKodu = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<
    string,
    unknown
  >;

  const dil = kucult(
    item.sourceLanguage ||
      item.source_language ||
      item.fromLang ||
      item.kaynakDili ||
      item.kaynakDil
  );

  if (
    dil === "en" ||
    dil === "eng" ||
    dil === "ingilizce"
  ) {
    return "en";
  }

  if (
    dil === "ar" ||
    dil === "ara" ||
    dil === "arapca"
  ) {
    return "ar";
  }

  if (
    dil === "tr" ||
    dil === "tur" ||
    dil === "tu" ||
    dil === "turkce"
  ) {
    return "tr";
  }

  if (
    dil === "ru" ||
    dil === "rus" ||
    dil === "rusca"
  ) {
    return "ru";
  }

  if (
    dil === "ady" ||
    dil === "adigece" ||
    dil === "adige"
  ) {
    return "ady";
  }

  if (
    dil === "kbd" ||
    dil === "kabardeyce" ||
    dil === "kabardey"
  ) {
    return "kbd";
  }

  return "";
};

/**
 * Dil kodunun kullanıcıya gösterilecek
 * Türkçe adını döndürür.
 */
export const dilAdi = (
  kod: string
): string => {
  switch (kucult(kod)) {
    case "ady":
    case "adige":
    case "adigece":
      return "Adıgece";

    case "kbd":
    case "kabardey":
    case "kabardeyce":
      return "Kabardeyce";

    case "en":
    case "eng":
    case "ingilizce":
      return "İngilizce";

    case "ar":
    case "ara":
    case "arapca":
      return "Arapça";

    case "ru":
    case "rus":
    case "rusca":
      return "Rusça";

    case "tr":
    case "tur":
    case "tu":
    case "turkce":
      return "Türkçe";

    default:
      return metin(kod);
  }
};

/**
 * Eski fonksiyon adıyla uyumluluk.
 */
export const dilAdiBul = dilAdi;

/**
 * Sözlüğün kullanıcıya gösterilecek
 * adını döndürür.
 */
export const sozlukAdiBul = (
  sozluk: SozlukVerisi
): string => {
  return sozlukGorunenAdi(sozluk);
};

/**
 * Dosya adına göre sözlük adı döndürür.
 */
export const dosyadanSozlukAdiBul = (
  sozlukler: SozlukVerisi[],
  file: string
): string => {
  const arananDosya = metin(file);

  const sozluk = sozlukler.find(
    (item) =>
      sozlukDosyasi(item) === arananDosya
  );

  return sozluk
    ? sozlukGorunenAdi(sozluk)
    : arananDosya.replace(
        /\.json$/i,
        ""
      );
};

/**
 * Dilbilgisi türlerinin Türkçe karşılıkları.
 */
export const TUR_MAP: Record<
  string,
  string
> = {
  verb: "Fiil",
  noun: "İsim",
  adjective: "Sıfat",
  adverb: "Zarf",
  auxiliary: "Yardımcı Fiil",
  "auxiliary verb": "Yardımcı Fiil",
  suffix: "Ek",
  "verbal suffix": "Fiil Eki",
  prefix: "Önek",
  preposition: "Edat",
  conjunction: "Bağlaç",
  pronoun: "Zamir",
  interjection: "Ünlem",
  numeral: "Sayı",
  particle: "Edat",
};
export const VARSAYILAN_TEMA = {
  arkaPlan: "#ffffff",
  kartArkaPlan: "#f9fafb",
  yaziAna: "#111827",
  yaziAlt: "#4b5563",
  kenarlik: "#e5e7eb",
  inputArkaPlan: "#ffffff",
};
export const KURUMSAL = {
  ad: 'Açık Mektep',
  slogan: 'Dijital Dil Kaynakları',
  url: 'https://acikmektep.org',
  kirmizi: '#FF4030',
} as const;
export interface SozlukMeta {
  dilCifti: string;
  yazar: string;
}

export const SOZLUK_META: Record<
  string,
  SozlukMeta
> = {};
