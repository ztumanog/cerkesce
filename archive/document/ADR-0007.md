# ADR-0007 — TranslationRepository Contract

* **Tarih:** 2026-08-30
* **Durum:** Kabul Edildi
* **Faz:** Faz 2 (Translation Platform)
* **Etkilenen Katmanlar:** Repository, Service

## Bağlam
Repository katmanının sınırlarının çizilmesi ve iş mantığından (business logic) soyutlanması gerekmektedir.

## Mimari Akış
`Source` → `Loader` → `Normalizer` → `Repository` → `Service` → `Hook` → `UI`

## Karar
1. `TranslationRepository` üst katmanları (Service, UI vb.) import edemez.
2. Sorumluluk Ayrımı:
   - **Repository:** Veriyi döndürür, lookup sağlar, sorguyu çalıştırır, deterministik sonuç verir.
   - **Repository Yapamaz:** `TranslationGroup` oluşturmaz, Word Family işlemez, semantik çıkarım yapmaz, CrossDictionary kararı vermez (Bu işler `Service` katmanındadır).

### Minimum Interface Kontratı

```typescript
export interface TranslationMeaning {
  meaningId: string;
  targetLanguage: string;
  value: string;
}

export interface TranslationEntry {
  entryId: string;
  sourceLanguage: string;
  lemma: string;
  meanings: TranslationMeaning[];
}

export interface TranslationRepository {
  getByLemma(language: string, lemma: string): TranslationEntry | null;
  getTranslations(language: string, lemma: string): TranslationMeaning[];
  searchByMeaning(text: string): TranslationEntry[];
  reverseLookup(targetLanguage: string, text: string): TranslationEntry[];
}