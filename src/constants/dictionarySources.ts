export interface DictionarySource {
  file: string;
  title: string;
  dialect: 'ADY' | 'KBD' | 'western' | string;
  sourceLanguage?: string;
  targetLanguage?: string;
  author?: string;
  publisher?: string;
  year?: string | number;
  total_words?: number;
}

export const MANIFEST_FILE = '/data/dictionaries.json';

// Varsayılan/Fallback sözlük kaynakları listesi (34 Sözlük)
export const DICTIONARY_SOURCES: DictionarySource[] = [
  { file: "0.Ady-Ady_AIG.json", title: "Adıgece Açıklamalı Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "ady" },
  { file: "1.Ady-Ady_AP.json", title: "Adıgece-Rusça Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "ru" },
  { file: "10.En-Ady_Adam.json", title: "English-Adyghe Dictionary", dialect: "western", sourceLanguage: "en", targetLanguage: "ady" },
  { file: "11.En-Kbd-Jonty.json", title: "English-Kabardian Dictionary", dialect: "KBD", sourceLanguage: "en", targetLanguage: "kbd" },
  { file: "12.En-Kbd-Ziwar.json", title: "English-Kabardian Circassian Dictionary", dialect: "KBD", sourceLanguage: "en", targetLanguage: "kbd" },
  { file: "13.Kbd-Ar-Jonty.json", title: "Kabardian-Arabic Dictionary", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ar" },
  { file: "14.Kbd-En-2-Jonty.json", title: "Kabardian-English Dictionary (Version 2)", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "en" },
  { file: "15.Kbd-En-Jonty.json", title: "Kabardian-English Dictionary (Version 1)", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "en" },
  { file: "16.Kbd-En-Ziwar.json", title: "Kabardian-English Dictionary", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "en" },
  { file: "17.Kbd-En_Amjad.json", title: "Kabardian-English Dictionary", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "en" },
  { file: "18.Kbd-Ru&En.json", title: "Kabardeyce - Rusça & İngilizce Çok Dilli Sözlük", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ru" },
  { file: "19.Kbd-Ru-2-Jonty.json", title: "Kabardeyce-Rusça Sözlük (Version 2)", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ru" },
  { file: "2.Ady-Ara.json", title: "Adıgece-Arapça Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "ar" },
  { file: "20.Kbd-Ru-Jonty.json", title: "Kabardeyce-Rusça Sözlük (Version 1)", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ru" },
  { file: "21.Kbd-Tu-Jonty.json", title: "Kabardeyce-Türkçe Sözlük", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "tr" },
  { file: "22.Ru-Kbd-Jonty.json", title: "Rusça-Kabardeyce Sözlük", dialect: "KBD", sourceLanguage: "ru", targetLanguage: "kbd" },
  { file: "23.Rus-Ady_Blaghoj.json", title: "Rusça-Adıgece Sözlük", dialect: "western", sourceLanguage: "ru", targetLanguage: "ady" },
  { file: "24.Rus-Ady_UAG.json", title: "Rusça-Adıgece Sözlük (Vodozhdokova)", dialect: "western", sourceLanguage: "ru", targetLanguage: "ady" },
  { file: "25.Rus-Ady_UASP.json", title: "Rusça-Adıgece Okul Sözlüğü", dialect: "western", sourceLanguage: "ru", targetLanguage: "ady" },
  { file: "26.Tu-Kbd-Jonty.json", title: "Türkçe-Kabardeyce Sözlük", dialect: "KBD", sourceLanguage: "tr", targetLanguage: "kbd" },
  { file: "27.Tur-Ady_Abaze.json", title: "Türkçe-Adıgece (Kabardeyce) Sözlük", dialect: "KBD", sourceLanguage: "tr", targetLanguage: "ady" },
  { file: "28.Tur-Ady_Huvaj.json", title: "Türkçe-Çerkesçe Sözlük", dialect: "KBD", sourceLanguage: "tr", targetLanguage: "ady" },
  { file: "29.Tur-Ady_Teshu.json", title: "Türkçe-Adıgece Sözlük", dialect: "western", sourceLanguage: "tr", targetLanguage: "ady" },
  { file: "3.Ady-En.json", title: "Adıgece-İngilizce Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "en" },
  { file: "30.Ady-Rus_ThreeVolumes.json", title: "3 Ciltlik Adıgece Açıklamalı Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "ru" },
  { file: "31.Tu-Ady_Hilmi.json", title: "Türkçe-Adıgece Sözlük", dialect: "western", sourceLanguage: "tr", targetLanguage: "ady" },
  { file: "32.Rus-Kbd_Nalchik_2013.json", title: "Rusça-Kabardeyce Okul Sözlüğü", dialect: "KBD", sourceLanguage: "ru", targetLanguage: "kbd" },
  { file: "33.Ady-Rus-1960.json", title: "Adıгейско-русский словарь (1960)", dialect: "western", sourceLanguage: "ady", targetLanguage: "ru" },
  { file: "4.Ady-En_Adam.json", title: "Adyghe-English Dictionary", dialect: "western", sourceLanguage: "ady", targetLanguage: "en" },
  { file: "5.Ady-Rus_Qarden.json", title: "Kabardeyce-Rusça Sözlük (Kardanov)", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ru" },
  { file: "6.Ady-Rus_Sherdjes.json", title: "Kabardeyce/Adıgece-Rusça Sözlük", dialect: "KBD", sourceLanguage: "kbd", targetLanguage: "ru" },
  { file: "7.Ady-Rus_Tharkaho.json", title: "Adıgece-Rusça Sözlük (Tharkaho)", dialect: "western", sourceLanguage: "ady", targetLanguage: "ru" },
  { file: "8.Ady-Tur_Huvaj.json", title: "Adıgece-Türkçe Sözlük", dialect: "western", sourceLanguage: "ady", targetLanguage: "tr" },
  { file: "9.En-Ady.json", title: "English-Adyghe Dictionary", dialect: "western", sourceLanguage: "en", targetLanguage: "ady" }
];

export const KAYNAK_HARITASI = DICTIONARY_SOURCES;

export function kaynagiDuzenle(source: any) {
  return source ? { ...source, updated: true } : null;
}

export function metneCevir(val: any): string {
  if (!val) return '';
  if (typeof val === 'string') return val;
  if (typeof val === 'object') return Object.values(val).filter((v) => typeof v === 'string').join(' ');
  return String(val);
}

export function temizeCevir(val: any): string {
  return metneCevir(val).normalize('NFC').trim();
}

export default DICTIONARY_SOURCES;

