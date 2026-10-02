# Çerkesçe Knowledge Engine — Anayasa

**Proje Adı:** Çerkesçe Sözlük ve Bilgi Motoru
**Versiyon:** v13.0
**Tarih:** 2026-10-02
**Durum:** ACTIVE
**Önceki Versiyon:** v12.0-enterprise-certified (13 Eylül 2026)

---

## 0. ANAYASA HİYERARŞİSİ

Bu belge, projenin **tek bağlayıcı anayasasıdır.**

| Belge | Konum | Rol | Bağlayıcı? |
|-------|-------|-----|------------|
| **CONSTITUTION.md** | `docs/governance/constitution/` | Ana anayasa | ✅ EVET |
| ENGINEERING_CONSTITUTION.md | `docs/architecture/` | Mühendislik eki | ⚠️ Türev |
| GEMSA_FRAMEWORK.md | `docs/governance/constitution/` | Çerçeve | ⚠️ Türev |
| MASTER_GOVERNANCE_FRAMEWORK.md | `docs/archive/` | Arşiv (2026-09-24) | ❌ HAYIR |

**Kural:** Çelişki durumunda `CONSTITUTION.md` üstündür.
Diğer belgeler bu anayasaya tabidir ve ondan türetilir.

---

## 1. PROJE VİZYONU

Çerkesçe dilinin dijital çağda yaşatılması ve modern teknoloji ile entegrasyonu.

---

## 2. TEMEL DEĞERLER

- **Doğruluk:** 428.000+ kayıt, ontolojik yapı
- **Güvenlik:** A+ notu, %99.99 uptime hedefi
- **Sürdürülebilirlik:** 0 kritik teknik borç
- **Tek Gerçeklik:** Tüm belgeler tek kaynaktan türetilir

---

## 3. PROJE METRİKLERİ (2026-10-02)

| Metrik | Değer | Kaynak |
|--------|-------|--------|
| Test Başarısı | **527/527 (%100)** | `npm test` |
| Test Dosyası | 89/89 PASS | `npm test` |
| Kod Kapsamı | (güncellenecek) | — |
| Performans | A+ | — |
| Güvenlik | A+ | — |

> **Not:** Önceki versiyondaki `193/193` metriği geçersizdir.
> Güncel metrik için `docs/governance/status/PROJECT_STATUS.md`'ye bakın.

---

## 4. FAZ DURUMU (TEK GERÇEK)

| Faz | Ad | Durum |
|-----|-----|-------|
| 1 | Foundation / Dataset | CLOSED |
| 2 | Lexeme Model | CLOSED |
| 3 | Morphological Analysis | CLOSED |
| 4 | Morphology Engine | COMPLETED |
| 5 | Discovery Engine | COMPLETED |
| 6 | API Gateway | TAMAMLANDI |
| 7 | Analytics & Export | DEVAM EDIYOR |
| 8 | Production & Operations | PROPOSED (ADR-GOV-006) |

**Ayrı Araştırma Hattı (Faz Değil):**

| Ad | Durum |
|----|-------|
| Embedding Research | GATE_COMPLETED |

> **Detay:** `docs/governance/status/PHASES.md`
> **Faz geçmişi:** `docs/governance/PHASE_TIMELINE_RECONCILIATION.md`

---

## 5. KARAR MEKANİZMASI

- **ADR (Architecture Decision Records)**
- **SSOT:** `docs/architecture/adr/ADR_INDEX.md`
- Tüm ADR'ler `ADR_INDEX.md`'de listelenir
- Canonical ↔ Physical eşlemesi orada yapılır

---

## 6. KALİTE KAPILARI

- TypeScript PASS
- Build PASS
- Test Files PASS
- Tests PASS
- Android Build PASS
- Vercel Deployment PASS

---

## 7. KRİTİK TARİHLER

| Tarih | Olay |
|-------|------|
| 15 Aralık 2025 | Proje Başlangıcı |
| 30 Eylül 2026 | Production Go-Live |
| 31 Aralık 2027 | v1.0 Release |

---

## 8. YÖNETİŞİM İLKELERİ

1. **Tek Gerçeklik (SSOT):** Her bilgi tek bir otorite belgede yaşar.
2. **Immutable Phases:** Tamamlanan fazlar değiştirilemez.
3. **Supersession:** Eski kararlar, yeni ADR ile açıkça geçersiz kılınır.
4. **ADR Zorunluluğu:** Mimari kararlar ADR olmadan alınamaz.
5. **Belge Hiyerarşisi:** CONSTITUTION > ENGINEERING_CONSTITUTION > GEMSA

---

**İmza:** Mimari Ekip
**Tarih:** 2026-10-02
**Versiyon:** v13.0
