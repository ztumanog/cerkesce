# SSOT Phase 1 Report

**Gorev:** GOREV-SSOT-F1
**Durum:** TAMAMLANDI (dogrulama: 2026-11-23 03:55)
**Kapsam:** Sadece test dosyalari

## Metrikler

| Metrik | Once | Sonra |
|---|---|---|
| ConceptID import | 14 | 22 |
| ConceptId import | 11 | 22 |
| tsc --noEmit exit | 0 | 0 |
| Test | 215 / 1067 | [2m Test Files [22m [1m[32m193 passed[39m[22m[90m (193)[39m / [2m      Tests [22m [1m[32m1006 passed[39m[22m[90m (1006)[39m [2m   Duration [22m 22.93s[2m (transform 6.08s, setup 0ms, import 32.08s, tests 38.88s, environment 4.13s)[22m |

## Concept.ts

- Satir: 36
- ConceptID: 6
- ConceptId: 6
- instanceof: 0
- Kopru: Yok

## Kalan ConceptID Gecisleri

- src\domain\discovery\services\WordFamilyResolver.ts:54 - * @returns ConceptID veya undefined
- src\domain\discovery\services\WordFamilyResolver.ts:104 - * @returns ConceptID listesi
- src\tests\domain\concept\CanonicalIdentityGuard.test.ts:7 - it('ConceptID ve ConceptId yalnızca harfle başlayan UPPER_SNAKE_CASE kanonik kimlikleri kabul etmelidir', () => {
- src\tests\domain\concept\CanonicalIdentityGuard.test.ts:28 - fullPath.endsWith('ConceptID.test.ts') ||
- src\tests\domain\concept\CanonicalIdentityGuard.test.ts:82 - it('hem ConceptId hem ConceptID büyük/küçük harfli hex-hash formatlarını çalışma zamanında reddetmeli ve üretim kodunda kabul deseni bulunmamalıdır', () => {
- src\tests\domain\discovery\Sprint4GraphAwareE2E.test.ts:18 - // Create valid ULID-based ConceptIDs

UYARI: CanonicalIdentityGuard.test.ts icindeki endsWith('ConceptID.test.ts') satirina dokunulmayacak. Guard eski dosya adini bilerek ariyor.

## Sonuc

Faz 1 tamam. ConceptID import 22, SSOT ConceptId tek otorite.

