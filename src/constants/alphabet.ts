/**
 * Sprint: Multi-Language Klavye Haritaları (UDL)
 */

export type KeyboardLang = 'circassian' | 'tr' | 'en' | 'ru' | 'ar';

export const LANG_OPTIONS = [
  { id: 'circassian' as KeyboardLang, label: 'Çerkesçe', flag: '🌐' },
  { id: 'tr' as KeyboardLang, label: 'Türkçe', flag: '🇹🇷' },
  { id: 'en' as KeyboardLang, label: 'English', flag: '🇬🇧' },
  { id: 'ru' as KeyboardLang, label: 'Русский', flag: '🇷🇺' },
  { id: 'ar' as KeyboardLang, label: 'العربية', flag: '🇸🇦' },
];

export const CERKES_SIK_KULLANILANLAR = [
  "къ", "кӀ", "пӀ", "тӀ", "щӀ", "Ӏ", "гъ", "хь"
] as const;

export const KEYBOARD_LAYOUTS: Record<KeyboardLang, string[]> = {
  circassian: [
    "А", "Б", "В", "Г", "Гъ", "Д", "Дж", "Е", "Ж", "Жъ", "З", "И", "Й",
    "К", "Къ", "КӀ", "Л", "Лъ", "М", "Н", "О", "П", "ПӀ",
    "Р", "С", "Т", "ТӀ", "У", "Ф", "Х", "Хъ", "Хь",
    "Ц", "ЦӀ", "Ч", "Чъ", "Ш", "Щ", "ЩӀ", "Ы", "Э", "Ю", "Я", "Ӏ"
  ],
  tr: [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ",
    "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç"
  ],
  en: [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L",
    "Z", "X", "C", "V", "B", "N", "M"
  ],
  ru: [
    "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ",
    "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э",
    "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю"
  ],
  ar: [
    "ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح", "ج", "د",
    "ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك", "ط",
    "ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"
  ]
};
