# ADR-0008: TranslationMeaning Representation Strategy

- **Status:** ACCEPTED / IMPLEMENTED
- **Date:** 2026-09-01
- **Scope:** Phase 2 — Translation Platform

## Context
Çeviri girdilerinde (`TranslationEntry`) anlam yapısının standartlaştırılmış bir dizi olarak temsil edilmesi gerekiyordu.

## Decision
1. `TranslationEntry` içerisindeki anlamlar `meanings: TranslationMeaning[]` dizisi olarak temsil edilecektir.
2. `TranslationMeaning` tipi `text` ve `language` alanlarını içermek zorundadır.
3. Bu ADR sadece Phase 2 veri temsilini kapsar; semantik kavram kimliği yönetimini kapsamaz.
