# PHASES.md

## Faz Durumu (Tek Gercek)

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

**NOT:** Phase 15 = SON BUYUK Faz
Bundan sonrasi Capability Tracks olarak planlanmisti (ADR-GOV-013).
Kasim 2026'dan itibaren gelisme MVP modeliyle yurutuluyor (asagiya bakin).
Detay: FUTURE_CAPABILITIES.md
Karar: ADR-GOV-013

## Ayri Arastirma Hatti (Faz Değil)

| Ad | Durum |
|----|-------|
| Embedding Research | Research Track |

**Not:** ADR-GOV-003'e gore Faz 6 = API Gateway'dir.

---

## MVP Donemi (2026-11)

Capability Track modelinin yerini MVP modeli aldi (KARAR-13 / KARAR-14).
P1 servisleri donduruldu, P2 grubu arsiv adayi (KARAR-14).

| MVP | Kapsam | Durum | Karar / Tarih |
|---|---|---|---|
| MVP-1 | Arama → Sonuç Listesi → Kelime Detayı | CLOSED | KARAR-13 + KARAR-14 (2026-11-08) |
| MVP-1.1 | Öneriler (/api/search yan ürünü) | CLOSED | KARAR-14 (2026-11-08) |
| MVP-2 | Latin Arama (normalize katmanı, KARAR-15 test tablosu) | CLOSED | KARAR-15 + Mimar onayı (2026-11-11) |

**İlke (KARAR-14):** Yeni özellikler mevcut MVP-1 akışına eklenir; yeni paralel sistem kurulmaz.
**Kürasyon yazma yeri:** doğrudan `lexemes.json` (KARAR-16, 2026-11-14).
**SSOT ConceptId migration:** TAMAMLANDI (2026-11-13).

---

## Faz Kronolojisi (Tüm Kuşaklar)

Numerik büyük fazlar (1-15) dışındaki faz kuşakları da burada listelenir.
Amaç: depodaki tüm faz tanımlarına tek bakışta ulaşmak.

| Kuşak | Dönem | Kapsam | Durum | Kaynak |
|---|---|---|---|---|
| Faz 1-9 | 2026 (bkz. üst tablo) | Numerik büyük fazlar | CLOSED / COMPLETED | Bu belge |
| C-Serisi (C-3 … C-11.4) | 2026-09-29/30 | Veri kürasyonu: temizlik, DialectConverter (kural motoru), kelime aileleri, Semantic Relations (768 lexeme: 532 aktif / 232 nadir) | TAMAMLANDI | docs/phases/c-series/, docs/reports/ |
| Faz 10-15 | 2026-10-03 | Platform Intelligence Program | COMPLETED | Bu belge, ADR-GOV-013 |
| Faz 16A/16B/16C | 2026-11-05 | Concept envanteri ve temizliği; 255 bitki `translations.tr` doldurma; aile-kök türetme | Onaylandı (commit 62b3a45) | governance/decisions/DECISIONS_FAZ16_17.md, docs/reports/faz16a, faz16c |
| Faz 17A/17B | 2026-11-05 | 17A: salt okunur envanter; 17B: backup/.gitignore düzeni | TAMAMLANDI (commit 80be4f4) | governance/decisions/DECISIONS_FAZ16_17.md |
| MVP Dönemi | 2026-11-08/11 | MVP-1 / MVP-1.1 / MVP-2 (yukarıdaki tablo) | CLOSED | KARAR-13/14/15 |
| Kürasyon dönemi | 2026-11-14 → | lexemes.json'a doğrudan yazım (KARAR-16), navigasyon/curation iyileştirmeleri | AKTİF | KARAR-16, governance/reports/CURATION_AND_NAVIGATION_UPDATE_2026-11-15.md |

---

## Capability Track Modeli (Tarihsel Plan)

**Phase 15 = SON BÜYÜK Faz**
Bundan sonraki tüm geliştirmeler Capability Track modeliyle yürütülür.

| Track | Durum |
|-------|-------|
| Track A — Operations | Aktif |
| Track B — Intelligence | Tamamlandı |
| Track C — Knowledge | Tamamlandı |
| Track D — Research | Araştırma |

**Referans:** PHASE_PROGRAM_CLOSURE.md, ADR-GOV-013

> **Güncelleme (2026-11):** MVP modeline geçildi (KARAR-13/14). Track listesi tarihsel planlamadır;
> güncel durum için MVP Dönemi bölümüne bakın.

---

**Son Güncelleme:** 2026-11-23
