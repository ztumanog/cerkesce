# ADR-LEX-002: Concept Registry Freeze

- **Durum:** KABUL EDILDI
- **Tarih:** 2026-10-24
- **Kanit:** concept_registry_audit.json (ULID=0, ortak=405, yetim=120)
- **Iliskili:** ADR-LEX-001 (Lexeme SSoT)

## Kararlar
- K1: concept_mapping.json READ-ONLY. Yazma yasagi.
- K2: Yeni ULID concept uretimi YASAK.
- K3: KAVRAM_* uretimi KAPALI (yeni kayitlarda).
- K4: Concept sahibi = LEXEME. Registry SSoT degil.
- K5: Registry yalnizca lookup/index gorevi gorur.

## Sonuclar
- Sprint 2C: 12.735 lexeme migration (12.320 KAVRAM_* + 415 SERBEST -> slug)
- 6.842 bos conceptId: 2C ikincil kalem
- 120 yetim registry kaydi: arsivde kalir, lexeme tarafina tasinmaz
