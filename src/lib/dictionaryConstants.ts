export interface DictionaryMeta {
  file: string;
  title: string;
  dialect: "BATI" | "DOGU" | string;
  total_words?: number;   // Soru işareti (?) ile opsiyonel hale getirildi
  author?: string;        // Eklendi
  publisher?: string;     // Eklendi
  year?: number | string; // Eklendi (varsa desteklemesi için)
  [key: string]: any;     // Gelecekte gelebilecek ekstra alanlar için esneklik
}