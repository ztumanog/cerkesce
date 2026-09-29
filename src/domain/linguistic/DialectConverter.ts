/**
 * DialectConverter - Adyghe (West Circassian) -> Kabardian (East Circassian)
 * Version 5 - TypeScript port
 *
 * ⚠️ ADR-ROOT-001 UYARISI:
 * Bu dosya VERI KATMANI'na aittir. Runtime'dan IMPORT EDILMEZ.
 * Sadece veri uretimi ve arastirma icin kullanilir.
 *
 * Kaynak: dialect_converter-v5.py
 * Test: 14/14 PASS (%100)
 *
 * Wikipedia ses denklikleri:
 * - ш -> щ (дышъэ -> дыщэ)
 * - шъ -> щ (шъхьэ -> щхьэ)
 * - шӀ -> фӀ (гушӀо -> гуфӀэ) - ozel kelime
 */

export class DialectConverter {
  private readonly exactLexicon: Record<string, string> = {
    // Wikipedia Tablo 1: sh -> shch
    'дышъэ': 'дыщэ',
    'шъхьэ': 'щхьэ',
    'гъашӀэ': 'гъащӀэ',
    'нашэ': 'нащэ',
    // Wikipedia Tablo 2: sh' -> shch
    'шъабэ': 'щабэ',
    'шъынэ': 'щынэ',
    'пшъашъэ': 'пщащэ',
    'мышъэ': 'мыщэ',
    'псэушъхь': 'псэущхьэ',
    'шъэ': 'ща',
    // OZEL KELIMELER
    'гушӀо': 'гуфӀэ',
    'гушӀу': 'гуфӀы',
    'нэшӀо': 'нэфӀэ',
    'шӀу': 'фӀы',
    'шӀо': 'фӀэ',
  };

  /**
   * Tum palochka varyantlarini BUYUK Ӏ (U+04C0) yapar.
   */
  private normalizePalochka(text: string): string {
    return text
      .replace(/ӏ/g, 'Ӏ')
      .replace(/I/g, 'Ӏ')
      .replace(/l/g, 'Ӏ')
      .replace(/1/g, 'Ӏ')
      .replace(/\|/g, 'Ӏ');
  }

  /**
   * Tek bir kelimeyi Adigece'den Kabardeyce'ye cevirir.
   */
  convertWord(word: string): string {
    // Once normalize et
    word = this.normalizePalochka(word);

    // Sonra exact_lexicon'da ara
    if (word in this.exactLexicon) {
      return this.exactLexicon[word];
    }

    let converted = word;

    // PHASE 1: GRAMMATICAL PREFIX MAPPING
    converted = converted.replace(/^фэ(?=[птщшчцкбгдзжх])/g, '___F1E___');
    converted = converted.replace(/^шъо(?=[-кӀщшф])/g, '___FO___');
    converted = converted.replace(/^шъуы(?=[-кӀщшф])/g, '___FY___');
    converted = converted.replace(/^ты(?=[-кӀщшф])/g, '___DY___');

    // PHASE 2: LABIALIZED SIBILANT SHIFTS
    converted = converted.replace(/шъуызы$/g, '___F___ыз');
    converted = converted.replace(/шъуы/g, '___F___ы');
    converted = converted.replace(/жъуэ/g, 'вэ');
    converted = converted.replace(/жъу/g, 'в');
    converted = converted.replace(/цуы/g, 'вы');
    converted = converted.replace(/цу/g, 'вы');

    // PHASE 3: EJECTIVE SIBILANT & SPECIAL COMPOUND MASKING
    converted = converted.replace(/шӀуэ/g, '___F1E___');
    converted = converted.replace(/шӀу/g, '___F1Y___');
    converted = converted.replace(/шӀо/g, '___F1E___');
    converted = converted.replace(/шӀэ/g, '___S1E___');
    converted = converted.replace(/шӀы/g, '___S1Y___');
    converted = converted.replace(/шӀ/g, '___S1___');

    // PHASE 4: SUFFIX & ENCLITIC MAPPINGS
    converted = converted.replace(/-щт$/g, '-нщ');
    converted = converted.replace(/щт$/g, 'нщ');
    converted = converted.replace(/-агъ$/g, '-ащ');
    converted = converted.replace(/агъ$/g, 'ащ');
    converted = converted.replace(/-гъэ$/g, '-ащ');
    converted = converted.replace(/-гъ$/g, '-ащ');

    // PHASE 5: VOWEL MAPPINGS
    converted = converted.replace(/^о(?=[ндбгтпзсжк])/g, 'уэ');
    converted = converted.replace(/он$/g, 'уэн');
    converted = converted.replace(/од$/g, 'уэд');
    converted = converted.replace(/отэн$/g, 'уэтэн');
    converted = converted.replace(/офы$/g, 'уэху');
    converted = converted.replace(/о$/g, 'уэ');
    converted = converted.replace(/о(?=[нмзстдкпбг])/g, 'уэ');

    // PHASE 6: LEXICAL SOUND LAWS
    converted = converted.replace(/фы$/g, 'ху');
    converted = converted.replace(/шъ/g, 'щ');
    converted = converted.replace(/жъ/g, 'жь');

    // PHASE 7: UNMASKING
    converted = converted.replace(/___F1E___/g, 'фӀэ');
    converted = converted.replace(/___F1Y___/g, 'фӀы');
    converted = converted.replace(/___S1E___/g, 'щӀэ');
    converted = converted.replace(/___S1Y___/g, 'щӀы');
    converted = converted.replace(/___S1___/g, 'щӀ');
    converted = converted.replace(/___FO___/g, 'фо');
    converted = converted.replace(/___FY___/g, 'фы');
    converted = converted.replace(/___DY___/g, 'ды');
    converted = converted.replace(/___DE___/g, 'дэ');
    converted = converted.replace(/___F___/g, 'ф');

    return converted;
  }
}

/**
 * ⚠️ RUNTIME KURALI
 *
 * Bu sinif runtime'da KULLANILMAZ.
 * Sadece veri uretimi icin kullanilir.
 *
 * Yasakli kullanim:
 *   ❌ ConceptRegistry icinde import
 *   ❌ KnowledgeRanker icinde import
 *   ❌ DiscoveryFacade icinde import
 *
 * Izinli kullanim:
 *   ✅ Veri uretim scriptleri
 *   ✅ Arastirma araclari
 *   ✅ Python'dan TypeScript'e gecis testi
 */