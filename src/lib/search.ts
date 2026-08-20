import { DictionaryItem, Dialect } from "@/types/dictionary";

export function searchWords(
  allWords: DictionaryItem[],
  query: string,
  dialect: "TUMU" | Dialect = "TUMU",
  selectedFile: string = "TUMU",
  limit: number = 50
): DictionaryItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  return allWords
    .filter((item) => {
      if (dialect !== "TUMU" && item.dialect !== dialect) return false;
      if (selectedFile !== "TUMU" && item.file !== selectedFile) return false;
      return (
        item.kelime.toLowerCase().includes(q) ||
        item.tanim.toLowerCase().includes(q)
      );
    })
    .slice(0, limit);
}