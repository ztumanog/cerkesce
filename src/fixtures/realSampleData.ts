import { TranslationEntry, TranslationGroup } from "../domain/translation";

export const mockTranslationGroups: TranslationGroup[] = [
  { id: "TRG_WATER", groupName: "Water / Su / Ğ’Ğ¾Ğ´Ğ° / ĞŸÑÑ‹", entries: [] },
  { id: "TRG_HEAD", groupName: "Head / BaÅŸ / Ğ“Ğ¾Ğ»Ğ¾Ğ²Ğ° / Ğ©Ñ…ÑŒÑ", entries: [] },
  { id: "TRG_HEART", groupName: "Heart / Kalp / Ğ¡ĞµÑ€Ğ´Ñ†Ğµ / Ğ“Ñƒ", entries: [] },
  { id: "TRG_EYE", groupName: "Eye / GÃ¶z / Ğ“Ğ»Ğ°Ğ· / ĞÑ", entries: [] },
];

export const mockRealSampleEntries: TranslationEntry[] = [
  {
    id: "ENTRY_PSY_EAST",
    lemma: "Ğ¿ÑÑ‹",
    normalizedLemma: "Ğ¿ÑÑ‹",
    dialect: "DOGU",
    groupId: "TRG_WATER",
    meanings: [
      { id: "m_psy_tr", text: "su", language: "TR" },
      { id: "m_psy_ru", text: "Ğ²Ğ¾Ğ´Ğ°", language: "RU" },
      { id: "m_psy_en", text: "water", language: "EN" },
    ],
  },
  {
    id: "ENTRY_SCHHE_EAST",
    lemma: "Ñ‰Ñ…ÑŒÑ",
    normalizedLemma: "Ñ‰Ñ…ÑŒÑ",
    dialect: "DOGU",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m_schhe_tr", text: "baÅŸ, kafa", language: "TR" },
      { id: "m_schhe_ru", text: "Ğ³Ğ¾Ğ»Ğ¾Ğ²Ğ°", language: "RU" },
      { id: "m_schhe_en", text: "head", language: "EN" },
    ],
  },
  {
    id: "ENTRY_SHHE_WEST",
    lemma: "ÑˆÑŠÑ…ÑŒÑ",
    normalizedLemma: "ÑˆÑŠÑ…ÑŒÑ",
    dialect: "BATI",
    groupId: "TRG_HEAD",
    meanings: [
      { id: "m_shhe_tr", text: "baÅŸ, kafa", language: "TR" },
      { id: "m_shhe_ru", text: "Ğ³Ğ¾Ğ»Ğ¾Ğ²Ğ°", language: "RU" },
    ],
  },
  {
    id: "ENTRY_GU",
    lemma: "Ğ³Ñƒ",
    normalizedLemma: "Ğ³Ñƒ",
    dialect: "GENEL",
    groupId: "TRG_HEART",
    meanings: [
      { id: "m_gu_tr", text: "kalp, yÃ¼rek", language: "TR" },
      { id: "m_gu_ru", text: "ÑĞµÑ€Ğ´Ñ†Ğµ", language: "RU" },
      { id: "m_gu_en", text: "heart", language: "EN" },
    ],
  },
  {
    id: "ENTRY_NE",
    lemma: "Ğ½Ñ",
    normalizedLemma: "Ğ½Ñ",
    dialect: "GENEL",
    groupId: "TRG_EYE",
    meanings: [
      { id: "m_ne_tr", text: "gÃ¶z", language: "TR" },
      { id: "m_ne_ru", text: "Ğ³Ğ»Ğ°Ğ·", language: "RU" },
      { id: "m_ne_en", text: "eye", language: "EN" },
    ],
  },
];
