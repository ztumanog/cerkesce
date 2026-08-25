import type {
  DictionaryItem,
  DictionaryMeta,
  LehceTipi,
} from "@/types/dictionary";

type SozlukVerisi =
  | DictionaryMeta
  | DictionaryItem
  | Record<string, unknown>;

const metin = (value: unknown): string => {
  return typeof value === "string"
    ? value.trim()
    : "";
};

const kucult = (value: unknown): string => {
  return metin(value)
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};




/**
 * Veriyi arama yapılabilir metne dönüştürür.
 */
const veriyiMetneCevir = (
  veri: unknown
): string => {
  if (veri === null || veri === undefined) {
    return "";
  }

  if (
    typeof veri === "string" ||
    typeof veri === "number" ||
    typeof veri === "boolean"
  ) {
    return String(veri);
  }

  if (Array.isArray(veri)) {
    return veri
      .map((item) =>
        veriyiMetneCevir(item)
      )
      .join(" ");
  }

  if (
    typeof veri === "object"
  ) {
    return Object.entries(veri)
      .map(([anahtar, deger]) => {
        return `${anahtar} ${veriyiMetneCevir(
          deger
        )}`;
      })
      .join(" ");
  }

  return "";
};

/**
 * Tek bir sözlük kaydının arama metnine
 * uyup uymadığını kontrol eder.
 */
export const sozlukAramayaUyuyorMu = (
  sozluk: unknown,
  aramaMetni: string
): boolean => {
  const filtre = kucult(aramaMetni);

  if (!filtre) {
    return true;
  }

  const sozlukMetni = kucult(
    veriyiMetneCevir(sozluk)
  );

  return sozlukMetni.includes(filtre);
};

/**
 * Sözlük kayıtlarını arama metnine göre filtreler.
 */
export const sozlukAra = <T>(
  sozlukler: T[],
  aramaMetni: string
): T[] => {
  const filtre = kucult(aramaMetni);

  if (!filtre) {
    return sozlukler;
  }

  return sozlukler.filter((sozluk) =>
    sozlukAramayaUyuyorMu(
      sozluk,
      filtre
    )
  );
};


/**
 * Sözlüğün gerçek dosya adını döndürür.
 * file yalnızca eşleştirme ve yükleme için kullanılır.
 */
export const sozlukDosyasi = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<string, unknown>;

  return (
    metin(item.file) ||
    metin(item.kaynak_sozluk) ||
    metin(item.filename)
  );
};

/**
 * Kullanıcıya gösterilecek sözlük adını döndürür.
 * Öncelik title alanındadır.
 */
export const sozlukGorunenAdi = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<string, unknown>;

  return (
    metin(item.title) ||
    metin(item.shortLabel) ||
    metin(item.label) ||
    metin(item.ad) ||
    metin(item.dictionaryName) ||
    sozlukDosyasi(sozluk).replace(/\.json$/i, "") ||
    "İsimsiz sözlük"
  );
};

/**
 * Huvaj ve İbrahim Alhaz Abaze istisnasını tespit eder.
 */
export const ciftDiyalektIstisnasiMi = (
  sozluk: SozlukVerisi
): boolean => {
  const item = sozluk as Record<string, unknown>;

  const dosya = kucult(sozlukDosyasi(sozluk));
  const baslik = kucult(item.title);
  const yazar = kucult(
    item.author || item.yazar
  );

  const huvajMi =
    dosya.includes("huvaj") ||
    baslik.includes("huvaj") ||
    yazar.includes("huvaj");

  const abazeMi =
    dosya.includes("abaze") ||
    baslik.includes("abaze") ||
    yazar.includes("abaze") ||
    yazar.includes("ibrahim alhaz");

  return huvajMi || abazeMi;
};

/**
 * Sözlüğün hangi diyalektlerde gösterileceğini döndürür.
 */
export const sozlukDiyalektleri = (
  sozluk: SozlukVerisi
): string[] => {
  if (ciftDiyalektIstisnasiMi(sozluk)) {
    return ["BATI", "DOGU"];
  }

  const item = sozluk as Record<string, unknown>;

  const dialect = kucult(
    item.dialect ||
      item.lehce ||
      item.diyalekt
  );

  if (
    dialect === "bati" ||
    dialect.includes("bati")
  ) {
    return ["BATI"];
  }

  if (
    dialect === "dogu" ||
    dialect.includes("dogu")
  ) {
    return ["DOGU"];
  }

  return [];
};

/**
 * Arayüzdeki diyalekt değerini sistem değerine çevirir.
 */
export const diyalektKodunaCevir = (
  lehce: LehceTipi
): string => {
  const filtre = kucult(lehce);

  if (
    !filtre ||
    filtre === "tumu" ||
    filtre === "hepsi" ||
    filtre === "all"
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
  seciliLehce: LehceTipi
): boolean => {
  const filtre = diyalektKodunaCevir(seciliLehce);

  if (!filtre || filtre === "TUMU") {
    return true;
  }

  return sozlukDiyalektleri(sozluk)
    .includes(filtre);
};

/**
 * targetLanguage alanını standartlaştırır.
 */
/**
 * targetLanguage alanını standartlaştırır.
 */
export const hedefDilKodu = (
  sozluk: SozlukVerisi
): string => {
  const item = sozluk as Record<string, unknown>;

  const dil = kucult(
    item.targetLanguage ||
      item.target_language ||
      item.toLang ||
      item.language ||
      item.dil
  );

  if (
    dil === "en" ||
    dil === "eng" ||
    dil.includes("ingiliz")
  ) {
    return "en";
  }

  if (
    dil === "ar" ||
    dil === "ara" ||
    dil.includes("arap")
  ) {
    return "ar";
  }

  if (
    dil === "tr" ||
    dil === "tur" ||
    dil === "tu" ||
    dil.includes("turk")
  ) {
    return "tr";
  }

  if (
    dil === "ru" ||
    dil === "rus" ||
    dil.includes("rus")
  ) {
    return "ru";
  }

  if (dil === "ady") {
    return "ady";
  }

  if (dil === "kbd") {
    return "kbd";
  }

  return "";
};

/**
 * Arayüzde seçilen hedef dil değerini
 * sistem koduna dönüştürür.
 */
const hedefDilFiltresiniKodaCevir = (dil: string): string => {
  const filtre = kucult(dil);

  if (!filtre || filtre === "tumu" || filtre === "hepsi" || filtre === "all") {
    return "TUMU";
  }

  if (filtre === "tr" || filtre === "tur" || filtre === "tu" || filtre.includes("turk")) {
    return "tr";
  }

  if (filtre === "en" || filtre === "eng" || filtre.includes("ingiliz")) {
    return "en";
  }

  if (filtre === "ar" || filtre === "ara" || filtre.includes("arap")) {
    return "ar";
  }

  if (filtre === "ru" || filtre === "rus" || filtre.includes("rus")) {
    return "ru";
  }

  if (filtre === "ady" || filtre.includes("bati")) {
    return "ady";
  }

  if (filtre === "kbd" || filtre.includes("dogu")) {
    return "kbd";
  }

  return filtre;
};

/**
 * Dil filtresine göre sözlük kontrolü.
 */
export const hedefDilUyuyorMu = (sozluk: SozlukVerisi, seciliDil: string): boolean => {
  const filtre = hedefDilFiltresiniKodaCevir(seciliDil);

  if (!filtre || filtre === "TUMU") {
    return true;
  }

  return hedefDilKodu(sozluk) === filtre;
};
