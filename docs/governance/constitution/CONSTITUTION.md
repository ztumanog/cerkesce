# Ã‡erkesÃ§e Knowledge Engine â€” Anayasa

**Proje AdÄ±:** Ã‡erkesÃ§e SÃ¶zlÃ¼k ve Bilgi Motoru
**Versiyon:** v13.0
**Tarih:** 2026-10-02
**Durum:** ACTIVE
**Ã–nceki Versiyon:** v12.0-enterprise-certified (13 EylÃ¼l 2026)

---

## 0. ANAYASA HÄ°YERARÅÄ°SÄ°

Bu belge, projenin **tek baÄŸlayÄ±cÄ± anayasasÄ±dÄ±r.**

| Belge | Konum | Rol | BaÄŸlayÄ±cÄ±? |
|-------|-------|-----|------------|
| **CONSTITUTION.md** | `docs/governance/constitution/` | Ana anayasa | âœ… EVET |
| ENGINEERING_CONSTITUTION.md | `docs/architecture/` | MÃ¼hendislik eki | âš ï¸ TÃ¼rev |
| GEMSA_FRAMEWORK.md | `docs/governance/constitution/` | Ã‡erÃ§eve | âš ï¸ TÃ¼rev |
| MASTER_GOVERNANCE_FRAMEWORK.md | `docs/archive/` | ArÅŸiv (2026-09-24) | âŒ HAYIR |

**Kural:** Ã‡eliÅŸki durumunda `CONSTITUTION.md` Ã¼stÃ¼ndÃ¼r.
DiÄŸer belgeler bu anayasaya tabidir ve ondan tÃ¼retilir.

---

## 1. PROJE VÄ°ZYONU

Ã‡erkesÃ§e dilinin dijital Ã§aÄŸda yaÅŸatÄ±lmasÄ± ve modern teknoloji ile entegrasyonu.

---

## 2. TEMEL DEÄERLER

- **DoÄŸruluk:** 428.000+ kayÄ±t, ontolojik yapÄ±
- **GÃ¼venlik:** A+ notu, %99.99 uptime hedefi
- **SÃ¼rdÃ¼rÃ¼lebilirlik:** 0 kritik teknik borÃ§
- **Tek GerÃ§eklik:** TÃ¼m belgeler tek kaynaktan tÃ¼retilir

---

## 3. PROJE METRÄ°KLERÄ° (2026-10-02)

| Metrik | DeÄŸer | Kaynak |
|--------|-------|--------|
| Test BaÅŸarÄ±sÄ± | **653/653 (%100)** | `npm test` |
| Test DosyasÄ± | 97/97 PASS | `npm test` |
| Kod KapsamÄ± | (gÃ¼ncellenecek) | â€” |
| Performans | A+ | â€” |
| GÃ¼venlik | A+ | â€” |

> **Not:** Ã–nceki versiyondaki `193/193` metriÄŸi geÃ§ersizdir.
> GÃ¼ncel metrik iÃ§in `docs/governance/status/PROJECT_STATUS.md`'ye bakÄ±n.

---

## 4. FAZ DURUMU (TEK GERÃ‡EK)

| Faz | Ad | Durum |
|-----|-----|-------|
| 1 | Foundation / Dataset | CLOSED |
| 2 | Translation Platform | CLOSED |
| 3 | Morphological Analysis | CLOSED |
| 4 | Morphology Engine | COMPLETED |
| 5 | Discovery Engine | COMPLETED |
| 6 | API Gateway | TAMAMLANDI |
| 7 | Analytics & Export | DEVAM EDIYOR |
| 8 | Production & Operations | PROPOSED (ADR-GOV-006) |

**AyrÄ± AraÅŸtÄ±rma HattÄ± (Faz DeÄŸil):**

| Ad | Durum |
|----|-------|
| Embedding Research | GATE_COMPLETED |

> **Detay:** `docs/governance/status/PHASES.md`
> **Faz geÃ§miÅŸi:** `docs/governance/PHASE_TIMELINE_RECONCILIATION.md`

---

## 5. KARAR MEKANÄ°ZMASI

- **ADR (Architecture Decision Records)**
- **SSOT:** `docs/architecture/adr/ADR_INDEX.md`
- TÃ¼m ADR'ler `ADR_INDEX.md`'de listelenir
- Canonical â†” Physical eÅŸlemesi orada yapÄ±lÄ±r

---

## 6. KALÄ°TE KAPILARI

- TypeScript PASS
- Build PASS
- Test Files PASS
- Tests PASS
- Android Build PASS
- Vercel Deployment PASS

---

## 7. KRÄ°TÄ°K TARÄ°HLER

| Tarih | Olay |
|-------|------|
| 15 AralÄ±k 2025 | Proje BaÅŸlangÄ±cÄ± |
| 30 EylÃ¼l 2026 | Production Go-Live |
| 31 AralÄ±k 2027 | v1.0 Release |

---

## 8. YÃ–NETÄ°ÅÄ°M Ä°LKELERÄ°

1. **Tek GerÃ§eklik (SSOT):** Her bilgi tek bir otorite belgede yaÅŸar.
2. **Immutable Phases:** Tamamlanan fazlar deÄŸiÅŸtirilemez.
3. **Supersession:** Eski kararlar, yeni ADR ile aÃ§Ä±kÃ§a geÃ§ersiz kÄ±lÄ±nÄ±r.
4. **ADR ZorunluluÄŸu:** Mimari kararlar ADR olmadan alÄ±namaz.
5. **Belge HiyerarÅŸisi:** CONSTITUTION > ENGINEERING_CONSTITUTION > GEMSA

---

**Ä°mza:** Mimari Ekip
**Tarih:** 2026-10-02
**Versiyon:** v13.0
