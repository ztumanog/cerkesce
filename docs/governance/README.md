# GOVERNANCE
Proje yönetişim belgeleri: anayasa, kararlar (ADR), faz durumu, envanter ve süreçler.
## Proje Durumu (kanonik)
Kanonik kaynaklar: [status/PHASES.md](status/PHASES.md) ve [status/PROJECT_STATUS.md](status/PROJECT_STATUS.md)
| Faz | Ad | Durum |
|-----|-----|-------|
| 1 | Foundation / Dataset | CLOSED |
| 2 | Translation Platform | CLOSED |
| 3 | Concept Foundations | CLOSED |
| 4 | Morphology Engine | COMPLETED |
| 5 | Discovery Engine | COMPLETED |
| 6 | API Gateway | COMPLETED |
| 7 | Analytics & Export | COMPLETED |
| 8 | Production & Operations | COMPLETED |
| 9 | Platform Intelligence | COMPLETED |
| 10-15 | Platform Intelligence Program | COMPLETED |
**Phase 15 = son büyük faz.** Sonraki geliştirmeler önce Capability Track modeliyle planlandı
(Track A — Operations, Track B — Intelligence, Track C — Knowledge, Track D — Research;
ADR-GOV-013). **Kasım 2026'dan itibaren gelişme MVP modeliyle yürütülür:**
MVP-1 / MVP-1.1 / MVP-2 CLOSED (KARAR-13/14/15), kürasyon doğrudan `lexemes.json`'a yazar
(KARAR-16). Detay: [status/PHASES.md](status/PHASES.md) MVP Dönemi bölümü.
## Doğrulama Durumu
- Ana Test Files: 193
- Ana Tests: 1006
- Cert Test Files: 26
- Cert Tests: 102
- PASS: 1006 + 102 PASS (2026-11-23)

> Kanonik kaynak: [status/CURRENT_TEST_BASELINE.md](status/CURRENT_TEST_BASELINE.md)
> Not: Test sayisi her faz sonunda artar (freeze sistemi). Faz bazli sayilar icin [status/PHASES.md](status/PHASES.md) bakin.
## Kaynaklar
- Kararlar: [decisions/DECISIONS.md](decisions/DECISIONS.md)
- Anayasa: [constitution/CONSTITUTION.md](constitution/CONSTITUTION.md)
- Envanter: [inventory/SYSTEM_INVENTORY.md](inventory/SYSTEM_INVENTORY.md)
- Faz denetimleri: [status/](status/)
**Son Güncelleme:** 2026-11-23 (kanonik durum tarihi)
