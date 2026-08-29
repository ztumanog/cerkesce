/**
 * @file src/utils/alphabet.ts
 * @description Çerkesçe alfabe ve özel karakter sabitleri.
 */

// Çerkesçe tam alfabe listesi
export const CERKES_OZEL_HARFLER = [
  "Ӏ", "а", "б", "в", "г", "гу", "гъ", "д", "дж", "дз", "е", "ё", "ж", "жъ", "жь", 
  "з", "и", "й", "к", "къ", "кӀ", "л", "лъ", "м", "н", "о", "п", "пӀ", "р", "с", 
  "т", "тӀ", "у", "ф", "фӀ", "х", "хь", "хъ", "ц", "цӀ", "ч", "чъ", "чӀ", "ш", 
  "щ", "ы", "э", "ю", "я"
] as const;

// TypeScript tip tanımı (Salt okunur harf tipleri için)
export type CerkesHarf = typeof CERKES_OZEL_HARFLER[number];

// Akıllı klavyede doğrudan buton olarak gösterilecek özel karakterler / birleşik harfler
export const CERKESCE_KARAKTERLER: string[] = [
  "Ӏ", "гъ", "гь", "дж", "дз", "жь", "жъ", 
  "кӀ", "къ", "кь", "пӀ", "тӀ", "фӀ", "хъ", "хь", "цӀ", "чӀ"
];