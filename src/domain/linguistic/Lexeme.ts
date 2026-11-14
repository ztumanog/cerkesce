/**
 * Lexeme - Sözlükbirim (somut sözlük girdisi)
 *
 * ADR-ROOT-001 gereği:
 * - "Word" yerine "Lexeme" terimi kullanılır
 * - Lexeme bir WordFamily üyesidir
 * - Lexeme, Concept'e bağlanabilir (opsiyonel)
 *
 * Runtime bu tipe DOĞRUDAN erişmez.
 */

import {
  CanonicalPartOfSpeech,
  CircassianDialect,
  EtymologyType,
  VerbTransitivity,
  normalizePartOfSpeech,
} from '../grammar';

export interface LexemeTranslations {
  tr?: string;
  en?: string;
  ru?: string;
  ar?: string;
  [langCode: string]: string | undefined;
}

export interface LexemeDerivation {
  /** Kaynak kök(ler). Örnek: ["R-GU"] */
  rootIds: string[];

  /** Kullanılan biçimbirim(ler). Örnek: ["M-F1E"] */
  morphemeIds: string[];

  /** Türetim kuralı */
  rule: 'suffix' | 'prefix' | 'infix' | 'compound' | 'root' | 'reduplication';

  /** Bileşik ise kaynak lexeme'ler. Örnek: ["L-FO", "L-SHYGHU"] */
  sourceLexemeIds?: string[];

  /** Bileşik yapıyı oluşturan yüzey bileşenleri. Örnek: ["зы", "къом", "рэ"] */
  components?: string[];

  /** Ayrıştırılmış ön ek listesi (LemmaBuilder uyumlu) */
  prefixes?: string[];

  /** Ayrıştırılmış son ek listesi (LemmaBuilder uyumlu) */
  suffixes?: string[];

  /** Temel gövde formu (LemmaBuilder uyumlu) */
  baseStem?: string;
}

export interface LexemeGrammarMetadata {
  transitivity?: VerbTransitivity;
  isCausative?: boolean;
  baseLexemeId?: string;
  dialect?: CircassianDialect;
}

export interface Lexeme {
  /** Benzersiz kimlik. Örnek: "L-GUF1E" */
  id: string;

  /** Sözlük formu. Örnek: "гуфӀэ" */
  form: string;

  /** IPA gösterimi. Örnek: "/gufʔa/" */
  ipa: string;

  /**
   * Kelimenin gerçek anlamı (literal).
   * Örnek: "kalbin iyiliği"
   */
  literalMeaning: string;

  /** Çok dilli sözlük karşılıkları (Faz 16A temizlenmiş tr katmanı dahil) */
  translations?: LexemeTranslations;

  /** Sözcük türü (ham veya kanonik) */
  partOfSpeech?: CanonicalPartOfSpeech | string;

  /** Etimolojik köken sınıfı */
  etymologyType?: EtymologyType;

  /** Doğrudan bağlı kök kimlikleri */
  rootIds?: string[];

  /**
   * Türetim bilgisi.
   * Root + Morpheme ilişkisini kaydeder.
   */
  derivation: LexemeDerivation;

  /**
   * Bağlı olduğu WordFamily. Örnek: "WF-GU"
   * Compound ise undefined olabilir.
   */
  wordFamilyId?: string;

  /**
   * Kavramsal karşılık (opsiyonel).
   * ADR-ROOT-002 ile runtime'a bağlanana kadar veri olarak kalır.
   */
  conceptId?: string;

  /** Diyalekt varyantları */
  dialectVariants?: {
    adyghe?: string;
    kabardian?: string;
  };

  /** Dilbilgisel üst veriler (ettirgenlik, geçişlilik, taban fiil bağı) */
  grammarMeta?: LexemeGrammarMetadata;

  /** Korpus sıklığı */
  corpusFrequency?: number;

  /** Serbest notlar */
  notes?: string;
}

/**
 * Bir Lexeme kaydından en güvenilir Türkçe karşılığı döndürür.
 */
export function resolveLexemeTurkishMeaning(lexeme: Partial<Lexeme>): string {
  const rawTr = lexeme.translations?.tr; const tr = Array.isArray(rawTr) ? rawTr.map((s) => String(s || "").trim()).filter(Boolean).join("; ") : typeof rawTr === "string" ? rawTr.trim() : "";
  if (tr) return tr;
  const lit = lexeme.literalMeaning?.trim();
  if (lit && lit !== '?') return lit;
  return '';
}

/**
 * Bir Lexeme kaydının sözcük türünü kanonik kategoriye dönüştürür.
 */
export function resolveLexemePos(lexeme: Partial<Lexeme>): CanonicalPartOfSpeech {
  return normalizePartOfSpeech(lexeme.partOfSpeech);
}

