
---

## ADR-P5-002: Arama Modu Semantiği

**Tarih:** 2026-09-25
**Durum:** KABUL EDİLDİ
**Faz:** 2 (MultiLanguage Search)

### Bağlam

Arama motoru 3 modda çalışıyor: `tam`, `baslayan`, `iceren`.
Ancak modların semantiği net değildi ve `tam` modu `t.includes()` kullanıyordu.

### Karar

| Mod | w (headword) | t (meaning) |
|-----|--------------|-------------|
| tam | w === q, wParsed.mainTokens | t === q, tParsed.mainTokens |
| baslayan | w.startsWith, wParsed.mainTokens | t.startsWith, tParsed.mainTokens |
| iceren | w.includes, wParsed.mainTokens | t.includes, tParsed.mainTokens |

**Ek normalizasyon:**
- Arapça ال (el-) ön eki temizlenir
- Arapça virgül (،) tokenize edilir

### Sonuç

- псы (tam) → 19 kaynak
- псы (baslayan) → псы* kelimeleri
- псы (iceren) → açıklamalardaki referanslar
- ماء (tam) → 2 kaynak
- Yanlış pozitifler temizlendi

### Referans

- ADR-P5-001 (Corpus Coverage)
- P5-001-CORPUS_AUDIT.md

---

## ADR-GOV-004: Phase Gate Modeli

**Tarih:** 2026-09-26
**Durum:** ✅ Kabul Edildi
**Kategori:** Governance

### Karar

Her faz **3 aşamalıdır:**

| Aşama | Anlam |
|-------|-------|
| **Charter** | Faz hedefleri onaylandı |
| **Audit** | Mevcut durum analizi |
| **Full Development** | Geliştirme başladı |

### Faz 5 Uygulaması

| Aşama | Durum |
|-------|-------|
| Charter | ✅ APPROVED |
| Audit | ✅ COMPLETED (P5-001 + P5-002) |
| Full Development | ⏳ PENDING (P5-003 + P5-004) |

### Sonuç

"Phase 5 IN PROGRESS" = Audit aşaması
"Full Development PENDING" = Geliştirme aşaması
Bu iki ifade **çelişmez.**

### Referans

- PHASES.md
- ROADMAP.md
- PROJECT_STATUS.md

