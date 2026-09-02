# ADR-0013: Deterministic Query Semantic Mapping & Rule Registry Architecture

- **Status:** ACCEPTED
- **Date:** 2026-09-02
- **Context:** Discovery Engine (Phase 5.3)

## Context
Arama sorgularının semantik niyete (Intent) ve kök kavramlara haritalanması sürecinde LLM belirsizliğini engellemek, %100 test edilebilir ve izlenebilir bir yapı sunmak gerekmektedir.

## Decision
1. **Deterministik Haritalama:** Yapay zeka tabanlı skorlama yerine kural ve şablon tabanlı (Rule-Based Pattern Match) çözümleme benimsenmiştir.
2. **Unicode NFC Normalizasyonu:** Çok dilli sorgularda (Çerkesçe, Türkçe, İngilizce vb.) karakter uyumsuzluğunu önlemek için `NFC` normalizasyonu uygulanır.
3. **MatchType Esası:** Yapay float skorlar yerine `EXACT`, `NORMALIZED`, `TRANSLATED` ve `FALLBACK` seviyelerini belirten `MatchType` kontratı kullanılır.
4. **Modüler Rule Registry:** `QuerySemanticMapper` bileşeninin şişmesini engellemek için kurallar `DefinitionRules`, `LocationRules`, `ClassificationRules` ve `PropertyRules` olarak ayrıştırılmıştır.

## Consequences
- Sorgu haritalama tamamen deterministiktir ve milisaniye seviyesinde yanıt verir.
- Yeni niyet kuralları `SemanticRuleRegistry` üzerinden sisteme tescil edilebilir.