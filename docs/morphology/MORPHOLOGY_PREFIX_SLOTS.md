# Verb Prefix Slot Grammar (ADR-0022)

## Slot Sirasi (Outer -> Inner)

| Slot | Ad | Ornek | Islev |
|------|-----|-------|-------|
| 7 | Reflexive | зы- | Donusluluk |
| 6 | Directional | къэ-, нэ- | Yonelim |
| 5 | Version | хуэ-, фIэ- | Yararina/zararina |
| 4 | Comitative | дэ-, зэ- | Birliktelik/karsiliklilik |
| 3 | Locative | пэ-, лъэ-, гуэ-, хьэ- | Yer/uzam |
| 2 | Causative | гъэ- | Ettirgenlik |
| 1 | Factitive | уы-, гъэ- | Isimden fiil |
| 0 | ROOT | — | Kok |

## Slot 3 Alt Gruplari (Mimar onerisi)

| Alt Grup | Ornek | Anlam |
|----------|-------|-------|
| LOCATIVE | дэ-, хэ-, щIэ- | icinde/uzerinde |
| SPATIAL | пэ-, лъэ-, гуэ- | on/yan/arka |
| BODY-BASED | бгъуэ-, пщэ- | vucut bolgeleri |
| DIRECTIONAL | къэ-, нэ- | yonelim |

## Golden Test Data

**Karmasik fiil:** зыкъыхуздыхэдэщIын

**Ayrisma:**
- зы- (Slot 7: Reflexive)
- къы- (Slot 6: Directional)
- ху- (Slot 5: Version)
- зды- (Slot 4: Comitative)
- хэ- (Slot 3: Locative)
- дэ- (Slot 3: Locative)
- щIы- (ROOT: yapmak)
- -н (Suffix: mastar)

## Kullanim

`MorphemeParser` bu slot sirasini kullanarak:
1. Outer'dan inner'a dogru soyar
2. Her slot'ta eslesme arar
3. ROOT'a ulasinca durur
