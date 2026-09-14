# ADR-0003: ITranslationRepository ve Veri Erişim Katmanı Ayrışımı

**Status:** Approved
**Date:** 20 Aralık 2025
**Updated:** Eylül 2026

## Context
Veri kaynağının (JSON, In-Memory veya DB) iş mantığına doğrudan bağlı olması test yazmayı imkansız hale getiriyordu.

## Decision
ITranslationRepository arayüzü tanımlanarak veri katmanı iş mantığından tamamen soyutlaştırıldı.

## Consequences
- ✅ **Olumlu:** Veri kaynağı bağımsız, test kolaylaştı
- ⚠️ **Olumsuz:** Arayüz değişikliklerinde tüm implementasyonlar güncellenmeli

## Related ADRs
- ADR-0007: TranslationRepository Contract
- ADR-0010: Concept Repository
