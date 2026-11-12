# SSOT ConceptId Migration Planı

**Durum:** PLAN — Kod değişikliği içermez
**Tarih:** 2026-11-12
**Sınıf:** Planlama
**Ön koşul:** Kurul kararı + ayrı migration penceresi
**Kanıt etiketi:** Kullanıcı beyanı (envanter + hotspot analizi)

## 1. Mevcut Durum

| Bileşen | Rol | Tüketici |
|---|---|---|
| `src/domain/shared/value-objects/ConceptId.ts` | **SSOT** (otorite) | 11 dosya |
| `src/domain/concept/value-objects/ConceptID.ts` | **Alias** (compatibility) | 14 dosya |
| `src/domain/concept/Concept.ts` | **Köprü** (Compatibility Bridge — iki tipi de kullanır) | — |

**Toplam tüketici:** 25 dosya (14 alias + 11 SSOT), 2'si ikisini de kullanır.

### Concept.ts — Migration Hotspot

`Concept.ts` bir **bug** değil, **bilinçli köprü**:
- Girdi: `ConceptID | ConceptId | string` (geriye dönük uyumluluk)
- İç dönüşüm: `ConceptId.create()` ile SSOT doğrulaması
- Depolanan alan: `readonly id: ConceptID` (hâlâ alias tipi)
- Çıkış: gelen tip `ConceptID` değilse `ConceptID.create(canonical.value)` ile alias'a sarılıyor

Bu dosya, `Concept.id` alanını tek adımda `ConceptId`'ye çevirmek 14 tüketiciyi kıracağı için, SSOT doğrulamasını **kademeli migration**a izin verecek şekilde devreye sokuyor.

## 2. Hedef Durum

- `ConceptId.ts` = tek otorite
- `ConceptID.ts` = **silinmiş**
- Toplam tüketici = 11 (yalnız SSOT)
- `Concept.ts` içinde `ConceptID` importu **yok**

## 3. Migration Aşamaları — Sıralı

### Faz 0 — Hazırlık (kod değişikliği yok)
- [ ] Kurul onayı
- [ ] Gözlem fazı bitişi (7 gün stabilite)
- [ ] Bu doküman onayı
- [ ] Yedek branch (`ssot-migration-backup`)

### Faz 0.5 — Baseline Snapshot (kod değişikliği yok)
Migration başlamadan önce ölçülebilir bir başlangıç noktası alınır:

```powershell
Get-ChildItem -Path src,app -Recurse -Include *.ts,*.tsx |
  Select-String -Pattern "ConceptID" -CaseSensitive -List |
  Select-Object -ExpandProperty Path |
  Out-File -FilePath "docs/governance/reports/ssot-migration-baseline.txt" -Encoding UTF8
Beklenen baseline: 14 dosya.
Amaç: Her fazdan sonra bu sayı düşmeli. Migration sonunda 0 olmalı.
Kanıt: Snapshot dosyası migration başlangıcında commit'lenir.
Faz 1 — Testler (en düşük risk)

Kapsam: 10 test dosyası
Değişiklik: import { ConceptID } → import { ConceptId } + ConceptID.create → ConceptId.create
Risk: Düşük (testler izole)
Geri alma: git revert tek commit
Doğrulama: npx vitest run → yeşil
Faz 2 — Servis (ConceptFacade.ts)

Kapsam: 1 dosya, 1 kullanım
Risk: Düşük
Doğrulama: npx vitest run → yeşil
Faz 3 — Repository interface (ConceptRepository.ts)

Kapsam: 1 dosya, 5 metot imzası
Risk: Orta (interface değişimi)
Dikkat: Implementasyonlar (InMemoryConceptGraphRepository vb.) eşzamanlı güncellenmeli
Doğrulama: npx vitest run → yeşil
Faz 4 — Concept.ts (köprü çözümü)

Kapsam: 1 dosya, 8 satır
Değişiklik:

    import { ConceptID } kaldır

    id: ConceptID | ConceptId | string → id: ConceptId | string

    readonly id: ConceptID → readonly id: ConceptId

    Constructor sadeleşir: this.id = ConceptId.create(rawId)
    Risk: Orta-yüksek (merkezi dosya)
    Geri alma: Dikkat — çok yer etkiler
    Doğrulama: npx vitest run → yeşil

Faz 5 — Alias silme

Kapsam: src/domain/concept/value-objects/ConceptID.ts dosyasını sil
Ön koşul: Faz 1–4 tamam, grep -r "ConceptID" src/ app/ = 0
Risk: Düşük (artık kullanan yok)
Doğrulama: npx vitest run → yeşil
Faz 6 — Guard testi güncelleme

Kapsam: CanonicalIdentityGuard.test.ts
Değişiklik: Test hem ConceptId'yi hem ConceptID'yi kontrol ediyor → sadece ConceptId
Risk: Düşük
Doğrulama: npx vitest run → yeşil
4. Riskler ve Azaltma
RiskAzaltma
Aynı commit'te çok dosyaHer faz ayrı commit
Test kırılmasıHer fazdan sonra npx vitest run
Gizli ConceptID kullanımıFaz 5 öncesi grep -r "ConceptID" src/ app/ çıktısı 0 olmalı
Geri alma zorluğuFaz 4 tek başına revert edilebilir olmalı
Baseline kaymasıFaz 0.5 snapshot'ı referans alınır
5. Başarı Kriterleri

    □

    215/215 test dosyası, 1067/1067 test geçiyor
    □

    tsc --noEmit exit 0
    □

    grep -r "ConceptID" src/ app/ → 0 sonuç
    □

    ConceptID.ts dosyası yok
    □

    CanonicalIdentityGuard yeşil
    □

    ADR-GOV-015 validator yeşil
    □

    Faz 0.5 baseline'ından bu yana 14 → 0 düşüş kanıtlandı

6. Migration Başlatma Ön Koşulları

    Kurul kararı

    Gözlem fazı bitişi (7 gün stabilite)

    Ayrı migration penceresi (yeni özellik/refactor olmayan dönem)

    Yedek branch (ssot-migration-backup)

    Faz 0.5 baseline snapshot commit'lenmiş

7. Yasaklar (Migration Başlayana Kadar)

    ConceptID.ts silme

    Concept.ts iki-import temizliği

    Import değişikliği

    Alias kapatma

Bu yasaklar kurul "SSOT Migration'ı başlatın" kararı gelene kadar geçerlidir.
