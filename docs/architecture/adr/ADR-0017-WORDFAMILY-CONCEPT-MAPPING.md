# ADR-0017: WordFamily → Concept Mapping

**Durum:** ACCEPTED
**Kabul Tarihi:** 2026-09-30
**Tarih:** 2026-09-26
**İmza:** Dipo
**İlgili ADR:** ADR-0009-CONCEPT_IDENTITY_STRATEGY

## Bağlam

`WordFamilyResolver` (Seviye-1) mevcut ve `Word → Root → WordFamily` çıkarımı yapmaktadır. Ancak `WordFamily → Concept` eşlemesi henüz ontolojik olarak tanımlanmamıştır.

`word-family-shhye.md` belgesi açıkça şöyle demektedir:
> "No Concept assignment yet."

Bu ADR, `WordFamily → Concept` eşleme kurallarını **ontolojik** olarak tanımlar.

## Karar

1. Her `Root`, bir veya birden fazla `Concept`'e bağlanabilir.
2. `Root`'un hangi `Concept`'lere bağlanacağı **ADR seviyesinde** tanımlanır.
3. `WordFamilyResolver` bu ADR'de tanımlanan kurallara göre çalışır.
4. `WordFamilyResolver` **kendi başına** ontolojik karar veremez.

## Kural Tablosu

### ROOT: щхьэ (HEAD)

**Core Meaning:** head, top, roof, surface

**Semantic Expansion:** HEAD → TOP → SURFACE → OVER → INDEPENDENCE

**Allowed Concepts:**
| Türev | Anlam | Concept |
|---|---|---|
| щхьэ | head | HEAD |
| щхьэкуцӀ | brain | HEAD |
| щхьэц | hair | HAIR |
| щхьэгъубжэ | window | WINDOW |
| щхьэусыгъуэ | reason | REASON |
| щхьэхуит | independent | FREEDOM |
| щхьэуз | headache | HEAD |
| щхьэгу | summit | TOP |
| щхьэфэ | surface | SURFACE |
| щхьэрыуэн | wander | MOVEMENT |
| щхьэукъуэн | doze | SLEEP |

### ROOT: псы (WATER)

**Core Meaning:** water, river

**Semantic Expansion:** WATER → LIQUID → FLOW → RIVER → LIFE

**Allowed Concepts:**
| Türev | Anlam | Concept |
|---|---|---|
| псы | water | WATER |
| псынэ | spring | WATER |
| псыжь | great river | RIVER |
| напс | tear | WATER |
| уэсэпс | dew | WATER |

### ROOT: гу (HEART)

**Core Meaning:** heart, inner self, center

**Semantic Expansion:** HEART → FEELING → THOUGHT → CHARACTER → MORALITY

**Allowed Concepts:**
| Türev | Anlam | Concept |
|---|---|---|
| гу | heart | HEART |
| бзэгу | language | LANGUAGE |
| мафӀэгу | train | TRAIN |
| гуфӀэ | joy | JOY |
| губзыгъэ | intelligence | INTELLIGENCE |
| гуэтыныгъэ | loyalty | LOYALTY |
| губжь | anger | ANGER |
| гугъэ | hope | HOPE |

*(Diğer rootlar için WF-CONCEPT-MAPPING.md'ye bakınız.)*

## Sonuçlar

**Olumlu:**
- `WordFamily → Concept` eşlemesi resmileşti
- `WordFamilyResolver`'ın ontolojik sınırları netleşti
- Gelecekteki kod için doğru temel oluştu

**Olumsuz:**
- `Semantic Expansion` (Seviye-2) hâlâ eksik
- Faz 3 kilidi devam ediyor

## İlgili Belgeler

- `WF-CONCEPT-MAPPING.md`
- `MASTER_ONTOLOGY_SYSTEM.md`
- `ADR-0009-CONCEPT_IDENTITY_STRATEGY.md`
- `ADR-0013-QUERY_SEMANTIC_MAPPING.md`
- `ADR-0015-TRANSLATIONENTRY_CANONICAL_IDENTITY.md`
- `PHASES.md`
