# ADR-0015 — TranslationEntry Canonical Identity

* **Tarih:** 16 Eylül 2026
* **Durum:** Onaylandı
* **Faz:** Faz 2 (Translation Platform)
* **Etkilenen Katmanlar:** Normalizer, Repository, Service

## Context & Problem
Farklı kaynak sözlüklerden gelen verilerin tekil ikili çeviri girdileri (`TranslationEntry`) seviyesinde tanımlanması gerekmektedir. Phase 3'teki soyut `ConceptID` yapısına geçmeden önce, Phase 2 özelinde ikili dil eşleşmelerini ve tersine aramayı (*Reverse Translation Search*) yönetecek hafif ve deterministik bir kimlik standardına ihtiyaç vardır.

## Decision
TranslationEntry kimliği, kaynak ve hedef kelimelerin normalizasyonu ile oluşan metinsel birleşimden (`sourceWord|targetWord`) türetilir (Seçenek B):
- Örnek: `normalize("su") + "|" + normalize("псы")` → `su|псы`

## Consequences
- ✅ **Hızlı Eşleşme:** Arama ve tersine arama sorgularında anında erişim olanağı.
- ✅ **Faz 3 Uyumu:** Phase 3 kilitleri açıldığında bağımsız `Concept Engine` ve `ConceptID` mimarisine kolayca bağlanabilir esnek altyapı[cite: 11].
- ⚠️ **Varyant Yönetimi:** Varyant kelimelerde kimlik kaydı sayısı artabilir (Faz 3 gruplaması ile çözülecektir).

## Related ADRs
- ADR-0002: Domain Modelinde Çok Dilli Standartlaşma[cite: 2]
- ADR-0005: TranslationGroup Strategy[cite: 4]
- ADR-0007: TranslationRepository Contract
- ADR-0008: TranslationMeaning Representation Strategy[cite: 10]