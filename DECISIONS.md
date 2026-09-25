
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
