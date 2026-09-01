import { TranslationEntry, TranslationGroup } from "../domain/translation";

export const mockTranslationGroups: TranslationGroup[] = [
  { id: "TRG_WATER", groupName: "Water / Su / Вода / Псы", entries: [] },
  { id: "TRG_HEAD", groupName: "Head / Baş / Голова / Щхьэ", entries: [] },
  { id: "TRG_HEART", groupName: "Heart / Kalp / Сердце / Гу", entries: [] },
  { id: "TRG_EYE", groupName: "Eye / Göz / Глаз / Нэ", entries: [] },
];

export const mockRealSampleEntries: TranslationEntry[] = [
  {
    id: "ENTRY_PSY_EAST",
    lemma: "псы",
    normalizedLemma: "псы",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m_psy_tr", text: "su", language: "TR" },
      { id: "m_psy_ru", text: "вода", language: "RU" },
      { id: "m_psy_en", text: "water", language: "EN" },
    ],
  },
  {
    id: "ENTRY_SCHHE_EAST",
    lemma: "щхьэ",
    normalizedLemma: "щхьэ",
    dialect: "DOGU",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m_schhe_tr", text: "baş, kafa", language: "TR" },
      { id: "m_schhe_ru", text: "голова", language: "RU" },
      { id: "m_schhe_en", text: "head", language: "EN" },
    ],
  },
  {
    id: "ENTRY_SHHE_WEST",
    lemma: "шъхьэ",
    normalizedLemma: "шъхьэ",
    dialect: "BATI",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m_shhe_tr", text: "baş, kafa", language: "TR" },
      { id: "m_shhe_ru", text: "голова", language: "RU" },
    ],
  },
  {
    id: "ENTRY_GU",
    lemma: "гу",
    normalizedLemma: "гу",
    dialect: "GENEL",
    groupId: "TRG_HEART",
    meanings: [
      { id: "m_gu_tr", text: "kalp, yürek", language: "TR" },
      { id: "m_gu_ru", text: "сердце", language: "RU" },
      { id: "m_gu_en", text: "heart", language: "EN" },
    ],
  },
  {
    id: "ENTRY_NE",
    lemma: "нэ",
    normalizedLemma: "нэ",
    dialect: "GENEL",
    groupId: "TRG_EYE",
    meanings: [
      { id: "m_ne_tr", text: "göz", language: "TR" },
      { id: "m_ne_ru", text: "глаз", language: "RU" },
      { id: "m_ne_en", text: "eye", language: "EN" },
    ],
  },
];