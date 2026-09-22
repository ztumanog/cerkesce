/**
 * @file src/types/dictionary.ts
 * @description Single Source of Truth (SSOT) - Tüm projenin temel tip tanımları.
 */

/** Diyalekt / Lehçe Kodları */
export type DialectCode = 'KBD' | 'ADY' | string;

/**
 * Sözlük Tipleri / Kategorileri (Genel, Diyalekt, Etimoloji vb.)
 */
export type SozlukTipi = 'general' | 'dialect' | 'etymology' | 'morphology' | string;

/**
 * Kayıtlı Sözlük Kaynağı Yapısı (Source Registry için)
 */
export interface AktifSozlukItem {
  /** Sözlük kaynağının benzersiz kimliği */
  id: string;
  /** Sözlük kaynağının adı */
  name: string;
  /** Sözlük türü */
  type?: SozlukTipi;
  /** Kaynağın aktif/pasif durumu */
  enabled?: boolean;
  /** Alternatif aktiflik kontrol alanı */
  isActive?: boolean;
  /** Öncelik sırası */
  priority?: number;
  /** Açıklama metni */
  description?: string;
  /** Dosya yolu veya API endpoint adresi */
  path?: string;
  /** Ek yapılandırma bilgileri */
  metadata?: Record<string, unknown>;
}

/**
 * Sözlük Üst Bilgisi (Metadata) Yapısı
 */
export interface DictionaryMeta {
  id: string;
  title?: string;
  name?: string;
  version?: string;
  author?: string;
  description?: string;
  totalEntries?: number;
  language?: string;
  updatedAt?: string | Date;
}

/**
 * Kelimenin tekil bir anlamını ifade eden veri yapısı.
 */
export interface TranslationMeaning {
  /** Anlamın benzersiz kimliği */
  id?: string;
  /** Anlam metni / açıklaması */
  text: string;
  /** Anlamın yazıldığı dil (örn: 'tr', 'en') */
  language?: string;
}

/**
 * Temel Çeviri Kaydı Arayüzü (TranslationEntry)
 */
export interface TranslationEntry {
  id: string;
  /** Madde başı / kök kelime */
  lemma?: string;
  word?: string;
  definition?: string;
  normalizedLemma?: string;
  dialect?: DialectCode;
  
  /** Tekil anlam kullanımı (UI ve legacy kütüphane uyumluluğu için) */
  meaning?: string;
  
  /** Detaylı anlam nesnelerinin listesi */
  meanings?: TranslationMeaning[];
  
  /** İlişkili grup kimliği */
  groupId?: string;
  
  /** Grup kimliği alternatif kullanımı (Legacy uyumluluğu için) */
  group?: string;
  
  /** UI & Legacy Uyumlu Türkçe Alan Tanımlamaları */
  kelime?: string;
  madde?: string;
  anlamlar?: string[] | TranslationMeaning[] | unknown[];
  kaynaklar?: string[] | unknown[];
  
  notes?: string;
  pos?: string;
  frequency?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/** 
 * UI Bileşenleri ve servisler için takma adlar (Alias)
 */
export type DictionaryEntry = TranslationEntry;
export type KelimeItem = TranslationEntry;

/**
 * Günün Kelimesi Veri Yapısı (GununKelimesi / DailyWord)
 * Hem İngilizce hem Türkçe alan isimlerini destekler.
 */
export interface GununKelimesi {
  id: string;
  date?: string | Date;
  tarih?: string | Date; // TS2353 'tarih' hatasını çözen alan
  
  /** Standart İsimlendirmeler */
  word?: string;
  meaning?: string;
  dialect?: DialectCode;
  
  /** UI Hook ve Mock Veri İsimlendirmeleri */
  kelime?: string;
  anlam?: string;
  tur?: string;
  okunus?: string;
  ornek?: string;
  ornekAnlam?: string;
  lehce?: string;
  
  entry?: TranslationEntry;
  notes?: string;
}

/** Hook ve harici bileşenler için Takma Ad (Alias) */
export type DailyWord = GununKelimesi;

/**
 * Anlamdaş veya ilişkili çevirileri gruplamak için kullanılan arayüz.
 */
export interface TranslationGroup {
  /** Grubun benzersiz kimliği */
  id: string;
  /** Test verisi ve harici yapılar için alternatif grup kimliği */
  groupId?: string;
  /** Resmi grup adı veya açıklaması */
  name?: string;
  /** Test verileri ve örnek kayıtlar için alternatif grup adı */
  groupName?: string;
  /** Gruba ait çeviri kayıtlarının ID listesi */
  entryIds?: string[];
  /** Gruba ait çeviri kayıtlarının doğrudan nesne listesi (Mock / Sample verileri için) */
  entries?: TranslationEntry[];
}

/**
 * Aynı kökten / madde başından (lemma) türeyen kelimeleri gruplayan arayüz.
 */
export interface LemmaGroup {
  id: string;
  rootLemma: string;
  variants?: string[];
}