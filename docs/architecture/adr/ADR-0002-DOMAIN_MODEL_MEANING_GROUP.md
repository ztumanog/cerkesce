# ADR-0002: Domain Modelinde Çok Dilli Meaning ve Group Name Standartlaşması

**Status:** Approved
**Date:** 15 Aralık 2025
**Updated:** Eylül 2026

## Context
Çeviri anlamlarında hedef dil bilgisinin olmaması çok dilli altyapıyı zorlaştırıyordu.

## Decision
1. TranslationMeaning arabirimine zorunlu `language: "TR" | "RU" | "EN"` alanı eklendi
2. TranslationGroup arabirimindeki alan adı `groupName` olarak standartlaştırıldı

## Consequences
- ✅ **Olumlu:** Çok dilli altyapı tip seviyesinde garantiye alındı
- ⚠️ **Olumsuz:** Mevcut mock verilerin tamamına language alanı eklenmesi gerekti

## Related ADRs
- ADR-0001: Modüler Tip Mimarisi
- ADR-0005: TranslationGroup Strategy
- ADR-0008: TranslationMeaning Representation
