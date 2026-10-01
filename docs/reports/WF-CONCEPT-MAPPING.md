# WF-CONCEPT-MAPPING.md
# Word Family → Concept Eşleme Belgesi

**Tarih:** 2026-09-26
**Durum:** Taslak / Onay Bekliyor

## Amaç

Bu belge, `Word Family` köklerinin hangi `Concept`'lere bağlanacağını tanımlar.
`WordFamilyResolver` yazılmadan önce bu eşleme resmileştirilmelidir.

## Kural

- Bir `Root`, birden fazla `Concept`'e bağlanabilir.
- Her `Concept`, bir `ConceptID` (ULID) ile temsil edilir.
- `ConceptID`'ler `ConceptRepository`'de tanımlı olmalıdır.

---

## Root: щхьэ (HEAD)

### Core Meaning
- head
- top
- roof
- surface

### Semantic Expansion
HEAD → TOP → SURFACE → OVER → INDEPENDENCE

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| щхьэ | head | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьэкуцӀ | brain | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьэц | hair | HAIR | 01ARZ3NDEKTSV4RRFFQ69G5FBB |
| щхьэгъубжэ | window | WINDOW | 01ARZ3NDEKTSV4RRFFQ69G5FB8 |
| щхьэусыгъуэ | reason | REASON | 01ARZ3NDEKTSV4RRFFQ69G5FBA |
| щхьэхуит | independent | FREEDOM | 01ARZ3NDEKTSV4RRFFQ69G5FB9 |
| щхьэуз | headache | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьач | occiput | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьэтелъхьэ | helmet | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьашъо | scalp | HEAD | 01ARZ3NDEKTSV4RRFFQ69G5FB4 |
| щхьэшыгу | crown of head | TOP | 01ARZ3NDEKTSV4RRFFQ69G5FB6 |
| щхьэгу | summit | TOP | 01ARZ3NDEKTSV4RRFFQ69G5FB6 |
| щхьэфэ | surface | SURFACE | 01ARZ3NDEKTSV4RRFFQ69G5FB7 |
| щхьэрыуэн | wander | MOVEMENT | 01ARZ3NDEKTSV4RRFFQ69G5FBC |
| щхьэр щӀын | nod | MOVEMENT | 01ARZ3NDEKTSV4RRFFQ69G5FBC |
| щхьэукъуэн | doze | SLEEP | 01ARZ3NDEKTSV4RRFFQ69G5FBD |

---

## Root: псы (WATER)

### Core Meaning
- water
- river

### Semantic Expansion
WATER → LIQUID → FLOW → RIVER → LIFE

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| псы | water | WATER | 01ARZ3NDEKTSV4RRFFQ69G5FAV |
| псынэ | spring | WATER | 01ARZ3NDEKTSV4RRFFQ69G5FAV |
| псыжь | great river | RIVER | 01ARZ3NDEKTSV4RRFFQ69G5FB1 |
| напс | tear | WATER | 01ARZ3NDEKTSV4RRFFQ69G5FAV |
| уэсэпс | dew | WATER | 01ARZ3NDEKTSV4RRFFQ69G5FAV |

---

## Root: гу (HEART)

### Core Meaning
- heart
- inner self
- center

### Semantic Expansion
HEART → FEELING → THOUGHT → CHARACTER → MORALITY

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| гу | heart | HEART | 01ARZ3NDEKTSV4RRFFQ69G5FBE |
| бзэгу | language | LANGUAGE | 01ARZ3NDEKTSV4RRFFQ69G5FBF |
| мафӀэгу | train | TRAIN | 01ARZ3NDEKTSV4RRFFQ69G5FBG |
| гуфӀэ | joy | JOY | 01ARZ3NDEKTSV4RRFFQ69G5FBH |
| губзыгъэ | intelligence | INTELLIGENCE | 01ARZ3NDEKTSV4RRFFQ69G5FBJ |
| гуэтыныгъэ | loyalty | LOYALTY | 01ARZ3NDEKTSV4RRFFQ69G5FBK |
| губжь | anger | ANGER | 01ARZ3NDEKTSV4RRFFQ69G5FBM |
| гугъэ | hope | HOPE | 01ARZ3NDEKTSV4RRFFQ69G5FB5 |

---

## Root: нэ (EYE)

### Core Meaning
- eye
- vision

### Semantic Expansion
EYE → VISION → PERCEPTION → TRUTH → CHARACTER

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| нэ | eye | EYE | 01ARZ3NDEKTSV4RRFFQ69G5FBN |
| напс | tear | WATER | 01ARZ3NDEKTSV4RRFFQ69G5FAV |
| напӀцӀ | falsehood | FALSEHOOD | 01ARZ3NDEKTSV4RRFFQ69G5FBP |
| наф | blind | BLINDNESS | 01ARZ3NDEKTSV4RRFFQ69G5FBQ |
| нафӀ | goodness | GOODNESS | 01ARZ3NDEKTSV4RRFFQ69G5FBR |
| нэгу | face | FACE | 01ARZ3NDEKTSV4RRFFQ69G5FBS |

---

## Root: Ӏэ (HAND)

### Core Meaning
- hand

### Semantic Expansion
HAND → ACTION → CONTROL → SKILL → CRAFT

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| Ӏэ | hand | HAND | 01ARZ3NDEKTSV4RRFFQ69G5FBT |
| Ӏэпэ | finger | FINGER | 01ARZ3NDEKTSV4RRFFQ69G5FBU |
| Ӏэгу | palm | PALM | 01ARZ3NDEKTSV4RRFFQ69G5FBV |
| Ӏэрытх | manuscript | MANUSCRIPT | 01ARZ3NDEKTSV4RRFFQ69G5FBW |

---

## Root: лъэ (FOOT)

### Core Meaning
- foot
- leg

### Semantic Expansion
FOOT → MOVEMENT → PATH → FOUNDATION

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| лъэ | foot | FOOT | 01ARZ3NDEKTSV4RRFFQ69G5FBX |
| лъэгу | sole | FOOT | 01ARZ3NDEKTSV4RRFFQ69G5FBX |
| лъэпс | shoelace | SHOE | 01ARZ3NDEKTSV4RRFFQ69G5FBY |
| лъапэ | foothill | FOOT | 01ARZ3NDEKTSV4RRFFQ69G5FBX |
| лъэбакъуэ | step | MOVEMENT | 01ARZ3NDEKTSV4RRFFQ69G5FBC |

---

## Root: бзэ (TONGUE)

### Core Meaning
- tongue
- speech
- language

### Semantic Expansion
TONGUE → SPEECH → EXPRESSION → LANGUAGE → GRAMMAR

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| бзэ | tongue | TONGUE | 01ARZ3NDEKTSV4RRFFQ69G5FBZ |
| бзэгу | language | LANGUAGE | 01ARZ3NDEKTSV4RRFFQ69G5FBF |
| бзэрабзэ | fluent speech | SPEECH | 01ARZ3NDEKTSV4RRFFQ69G5FC0 |
| бзэшапхъэ | grammar rule | GRAMMAR | 01ARZ3NDEKTSV4RRFFQ69G5FC1 |

---

## Root: псэ (SOUL)

### Core Meaning
- soul
- spirit
- life

### Semantic Expansion
SOUL → SPIRIT → VITALITY → LIFE → FEELING

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| псэ | soul | SOUL | 01ARZ3NDEKTSV4RRFFQ69G5FC2 |
| псэу | alive | LIFE | 01ARZ3NDEKTSV4RRFFQ69G5FC3 |
| псэун | life | LIFE | 01ARZ3NDEKTSV4RRFFQ69G5FC3 |
| гупсэ | beloved | LOVE | 01ARZ3NDEKTSV4RRFFQ69G5FC4 |
| псэху | calm | PEACE | 01ARZ3NDEKTSV4RRFFQ69G5FC5 |

---

## Root: пэ (NOSE)

### Core Meaning
- nose
- front
- tip
- beginning

### Semantic Expansion
NOSE → FRONT → TIP → BEGINNING → ORIGIN

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| пэ | nose | NOSE | 01ARZ3NDEKTSV4RRFFQ69G5FC6 |
| пэщӀэдзэ | beginning | BEGINNING | 01ARZ3NDEKTSV4RRFFQ69G5FC7 |
| пэш | room | ROOM | 01ARZ3NDEKTSV4RRFFQ69G5FC8 |
| Ӏэпэ | finger | FINGER | 01ARZ3NDEKTSV4RRFFQ69G5FBU |
| лъапэ | foothill | FOOT | 01ARZ3NDEKTSV4RRFFQ69G5FBX |
| пэрыт | leader | LEADER | 01ARZ3NDEKTSV4RRFFQ69G5FC9 |

---

## Root: дзэ (TOOTH)

### Core Meaning
- tooth
- row
- army
- edge

### Semantic Expansion
TOOTH → ROW → ARMY → EDGE

### Concept Eşlemesi

| Türev | Anlam | Concept | ConceptID |
|---|---|---|---|
| дзэ | tooth | TOOTH | 01ARZ3NDEKTSV4RRFFQ69G5FCA |
| дзэжь | old tooth | TOOTH | 01ARZ3NDEKTSV4RRFFQ69G5FCA |
| дзэпапцӀэ | sharp tooth | TOOTH | 01ARZ3NDEKTSV4RRFFQ69G5FCA |
| дзэпкъ | jaw | JAW | 01ARZ3NDEKTSV4RRFFQ69G5FCB |
| дзэликӀ | military squad | ARMY | 01ARZ3NDEKTSV4RRFFQ69G5FCC |

---

## Özet

| Root | Türev Sayısı | Concept Sayısı |
|---|---|---|
| щхьэ | 150+ | HEAD, TOP, SURFACE, WINDOW, FREEDOM, REASON, HAIR, MOVEMENT, SLEEP |
| псы | 5+ | WATER, RIVER |
| гу | 8+ | HEART, LANGUAGE, TRAIN, JOY, INTELLIGENCE, LOYALTY, ANGER, HOPE |
| нэ | 6+ | EYE, WATER, FALSEHOOD, BLINDNESS, GOODNESS, FACE |
| Ӏэ | 4+ | HAND, FINGER, PALM, MANUSCRIPT |
| лъэ | 5+ | FOOT, SHOE, MOVEMENT |
| бзэ | 4+ | TONGUE, LANGUAGE, SPEECH, GRAMMAR |
| псэ | 5+ | SOUL, LIFE, LOVE, PEACE |
| пэ | 6+ | NOSE, BEGINNING, ROOM, FINGER, FOOT, LEADER |
| дзэ | 5+ | TOOTH, JAW, ARMY |

## Sonraki Adımlar

1. **Bu belge mimara onaylatılacak.**
2. **Onaylanırsa, `ConceptID`'ler `ConceptRepository`'ye eklenecek.**
3. **Sonra `WordFamilyConceptMap` oluşturulacak.**
4. **En son `WordFamilyResolver` yazılacak.**


