# ADR-0001: Modüler Tip Mimarisi ve Merkezi Yönetim

**Status:** Approved
**Date:** 15 Aralık 2025
**Updated:** Eylül 2026

## Context
Bileşenler, hook'lar ve sayfalar arasında veri tiplerinin tekrar tanımlanması tip çatışmalarına yol açıyordu.

## Decision
Tüm uygulama veri yapıları (`ExtendedDictionaryItem`, `DictionaryMeta`, `ConceptRow`) tek bir merkezde, `@/types/dictionary.ts` modülü altında toplanmıştır.

## Consequences
- ✅ **Olumlu:** Tip güvenliği %100, kod tekrarı engellendi
- ⚠️ **Olumsuz:** Büyük dosya → alt modüllere bölünebilir

## Related ADRs
- ADR-0002: Çok Dilli Standart
- ADR-0003: Repository Ayrışımı
- ADR-0004: Heterojen Normalizasyon
