import { CONCEPT_REGISTRY } from '@/domain/concept/ConceptRegistry';

export type WordFamilyConceptMap = Record<string, Record<string, string>>;

export const WORD_FAMILY_CONCEPT_MAP: WordFamilyConceptMap = {
  // === лъэ (FOOT) AİLESİ ===
  'лъэ': {
    'лъэ': CONCEPT_REGISTRY.FOOT,
    'лъэгу': CONCEPT_REGISTRY.FOOT,
    'лъэпс': CONCEPT_REGISTRY.SHOE,
    'лъэбакъуэ': CONCEPT_REGISTRY.MOVEMENT,
    'лъэбжьэ': CONCEPT_REGISTRY.NAIL,
    'лъакъуэ': CONCEPT_REGISTRY.LEG,
  },

  // === щхьэ (HEAD) AİLESİ ===
  'щхьэ': {
    'щхьэ': CONCEPT_REGISTRY.HEAD,
    'щхьэкуцӀ': CONCEPT_REGISTRY.HEAD,
    'щхьэц': CONCEPT_REGISTRY.HAIR,
    'щхьэпхэтӀыгу': CONCEPT_REGISTRY.HEAD,
    'щхьэщӀыб': CONCEPT_REGISTRY.HEAD,
    'щхьэгу': CONCEPT_REGISTRY.TOP,
    'щхьэфэ': CONCEPT_REGISTRY.SURFACE,
    'щхьэщыгу': CONCEPT_REGISTRY.TOP,
    'щхьэгъубжэ': CONCEPT_REGISTRY.WINDOW,
    'щхьэгъубжащхьэ': CONCEPT_REGISTRY.WINDOW,
    'щхьэгъубжэӀупӀэ': CONCEPT_REGISTRY.WINDOW,
    'щхьэхуит': CONCEPT_REGISTRY.FREEDOM,
    'щхьэхуитыныгъэ': CONCEPT_REGISTRY.FREEDOM,
    'щхьэхуитщӀыжакӀуэ': CONCEPT_REGISTRY.FREEDOM,
    'щхьэусыгъуэ': CONCEPT_REGISTRY.REASON,
    'щхьэусыгъуэншэ': CONCEPT_REGISTRY.REASON,
    'щхьэрыуэн': CONCEPT_REGISTRY.MOVEMENT,
    'щхьэр щӀын': CONCEPT_REGISTRY.MOVEMENT,
    'щхьэукъуэн': CONCEPT_REGISTRY.SLEEP,
    'щхьэуз': CONCEPT_REGISTRY.HEAD,
    'щхьач': CONCEPT_REGISTRY.HEAD,
    'щхьэтелъхьэ': CONCEPT_REGISTRY.HEAD,
    'щхьашъо': CONCEPT_REGISTRY.HEAD,
    'щхьэшыгу': CONCEPT_REGISTRY.TOP,
  },

// === гу (HEART) AİLESİ ===
  'гу': {
    'гу': CONCEPT_REGISTRY.HEART,
    'бзэгу': CONCEPT_REGISTRY.LANGUAGE,
    'мафӀэгу': CONCEPT_REGISTRY.TRAIN,
    'губзыгъэ': CONCEPT_REGISTRY.INTELLIGENCE,
    'губзыгъагъэ': CONCEPT_REGISTRY.INTELLIGENCE,
    'гуфӀэ': CONCEPT_REGISTRY.JOY,
    'гужьей': CONCEPT_REGISTRY.ANXIETY,
    'гумыгъуэ': CONCEPT_REGISTRY.COMPASSION,
    'губжь': CONCEPT_REGISTRY.ANGER,
    'губжьыныгъэ': CONCEPT_REGISTRY.ANGER,
    'гугъэ': CONCEPT_REGISTRY.HOPE,
    'гугъэзагъэ': CONCEPT_REGISTRY.HOPE,
    'гуэтыныгъэ': CONCEPT_REGISTRY.LOYALTY,
    'гуилъхьэныгъэ': CONCEPT_REGISTRY.INTENTION,
    'гукъыдэжыншагъэ': CONCEPT_REGISTRY.DEPRESSION,
    'гумызагъэ': CONCEPT_REGISTRY.RESTLESSNESS,
    'гупсэхугъэ': CONCEPT_REGISTRY.SATISFACTION,
    'гурыӀуэныгъэ': CONCEPT_REGISTRY.INFORMATION,
    'гурыгъугъэ': CONCEPT_REGISTRY.EXPERIENCE,
    'гурыгъэӀуэныгъэ': CONCEPT_REGISTRY.EXPLANATION,
    'гурыхуагъэ': CONCEPT_REGISTRY.MEMORY,
    'гушхуэныгъэ': CONCEPT_REGISTRY.CONFIDENCE,
    'гущӀыӀагъэ': CONCEPT_REGISTRY.COOLNESS,
    'гущӀэгъуншагъэ': CONCEPT_REGISTRY.CRUELTY,
    'гуэшыныгъэ': CONCEPT_REGISTRY.DIVISION,
  },

// === нэ (EYE) AİLESİ ===
  'нэ': {
    'нэ': CONCEPT_REGISTRY.EYE,
    'наф': CONCEPT_REGISTRY.BLINDNESS,
    'напс': CONCEPT_REGISTRY.WATER,
    'напӀцӀ': CONCEPT_REGISTRY.FALSEHOOD,
    'нафӀ': CONCEPT_REGISTRY.GOODNESS,
    'нэгу': CONCEPT_REGISTRY.FACE,
  },

  // === Ӏэ (HAND) AİLESİ ===
  'Ӏэ': {
    'Ӏэ': CONCEPT_REGISTRY.HAND,
    'Ӏэпэ': CONCEPT_REGISTRY.FINGER,
    'Ӏэгу': CONCEPT_REGISTRY.PALM,
    'Ӏэрытх': CONCEPT_REGISTRY.MANUSCRIPT,
    'Ӏэбэ': CONCEPT_REGISTRY.HAND,
    'ӀэкӀуэлъакӀуэ': CONCEPT_REGISTRY.SKILLFUL,
    'Ӏэщэ': CONCEPT_REGISTRY.WEAPON,
    'Ӏэпщацагъэ': CONCEPT_REGISTRY.BRUTE_FORCE,
  },

// === псы (WATER) AİLESİ ===
  'псы': {
    'псы': CONCEPT_REGISTRY.WATER,
    'псынкӀэ': CONCEPT_REGISTRY.LIGHT,
  },

  // === мафӀэ (FIRE) AİLESİ ===
  'мафӀэ': {
    'мафӀэ': CONCEPT_REGISTRY.FIRE,
    'мафӀащэ': CONCEPT_REGISTRY.SPARK,
  },

  // === дзэ (TOOTH) AİLESİ ===
  'дзэ': {
    'дзэ': CONCEPT_REGISTRY.TOOTH,
    'дзэжь': CONCEPT_REGISTRY.TOOTH,
    'дзэпапцӀэ': CONCEPT_REGISTRY.TOOTH,
    'дзэпкъ': CONCEPT_REGISTRY.JAW,
    'дзэликӀ': CONCEPT_REGISTRY.ARMY,
  },

  // === дэ (WALNUT) AİLESİ ===
  'дэ': {
    'дэ': CONCEPT_REGISTRY.WALNUT,
    'дэжъый': CONCEPT_REGISTRY.WALNUT,
    'дэшхо': CONCEPT_REGISTRY.WALNUT,
    'мэзыдэ': CONCEPT_REGISTRY.WALNUT,
    'дэцӀыкӀу': CONCEPT_REGISTRY.WALNUT,
  },

  // === сэ (KNIFE) AİLESİ ===
  'сэ': {
    'сэ': CONCEPT_REGISTRY.KNIFE,
    'сэжь': CONCEPT_REGISTRY.KNIFE,
    'сэшхуэ': CONCEPT_REGISTRY.KNIFE,
    'сэцӀыкӀу': CONCEPT_REGISTRY.KNIFE,
    'сэкӀэ': CONCEPT_REGISTRY.KNIFE,
    'сэкъута': CONCEPT_REGISTRY.KNIFE,
  },
  // === бзэ (TONGUE) AİLESİ ===
  'бзэ': {
    'бзэ': CONCEPT_REGISTRY.TONGUE,
    'бзэгу': CONCEPT_REGISTRY.LANGUAGE,
    'бзэпс': CONCEPT_REGISTRY.SPEECH,
    'бзэщӀэныгъэ': CONCEPT_REGISTRY.GRAMMAR,
  },

  // === псэ (SOUL) AİLESİ ===
  'псэ': {
    'псэ': CONCEPT_REGISTRY.SOUL,
    'псэукӀэ': CONCEPT_REGISTRY.LIFE,
    'псэлъыхъу': CONCEPT_REGISTRY.LOVE,
    'псэф': CONCEPT_REGISTRY.PEACE,
  },

  // === пэ (NOSE) AİLESİ ===
  'пэ': {
    'пэ': CONCEPT_REGISTRY.NOSE,
    'пэщӀэдзэ': CONCEPT_REGISTRY.BEGINNING,
    'пэш': CONCEPT_REGISTRY.ROOM,
    'пэрыт': CONCEPT_REGISTRY.LEADER,
    'Ӏэпэ': CONCEPT_REGISTRY.FINGER,
    'лъапэ': CONCEPT_REGISTRY.FOOT,
  },
  // === тхьэкӀумэчӀыхь AİLESİ ===
  'тхьэкӀумэчӀыхь': {
    'тхьэкӀумэчӀыхь': CONCEPT_REGISTRY.RABBIT,
  },

  // === дыгъужь AİLESİ ===
  'дыгъужь': {
    'дыгъужь': CONCEPT_REGISTRY.WOLF,
  },

  // === хыкъа AİLESİ ===
  'хыкъа': {
    'хыкъа': CONCEPT_REGISTRY.DOLPHIN,
  },

  // === фо (HONEY) AİLESİ ===
  'фо': {
    'фо': CONCEPT_REGISTRY.HONEY,
    'фошыгъу': CONCEPT_REGISTRY.SUGAR,
  },

  // === фошыгъу AİLESİ ===
  'фошыгъу': {
    'фошыгъу': CONCEPT_REGISTRY.SUGAR,
  },

  // === мэзчэт AİLESİ ===
  'мэзчэт': {
    'мэзчэт': CONCEPT_REGISTRY.PHEASANT,
  },

  // === бжьэ (BEE) AİLESİ ===
  'бжьэ': {
    'бжьэ': CONCEPT_REGISTRY.BEE,
    'бжьэхэр': CONCEPT_REGISTRY.BEE,
    'бжьэпчӀы': CONCEPT_REGISTRY.BEE,
    'бжьэпщы': CONCEPT_REGISTRY.BEE,
    'бжьаӀо': CONCEPT_REGISTRY.BEE,
    'бжьахъо': CONCEPT_REGISTRY.BEE,
    'бжьашӀо': CONCEPT_REGISTRY.BEE,
    'бжьащ': CONCEPT_REGISTRY.BEE,
    'бжьышӀо': CONCEPT_REGISTRY.BEE,
    'Ӏэшъын': CONCEPT_REGISTRY.BEE,
  },

};