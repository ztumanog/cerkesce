"use server";

import { z } from "zod";
import {
  DictionaryItemSchema,
  type DictionaryItem,
} from "@/types/dictionary";

// Arama girdisi doğrulama şeması (Kanonik lehçe tipleri tanımlandı)
const SearchQuerySchema = z.object({
  query: z.string().trim().min(1, "Arama terimi en az 1 karakter olmalıdır."),
  dialect: z.enum(["BATI", "DOGU", "TUMU"]).default("TUMU"),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type SearchInput = z.infer<typeof SearchQuerySchema>;

export type SearchResult =
  | {
      success: true;
      data: DictionaryItem[];
      pagination: {
        total: number;
        page: number;
        limit: number;
      };
    }
  | {
      success: false;
      error: string;
    };

export async function searchDictionaryAction(
  rawInput: unknown
): Promise<SearchResult> {
  const parsedInput = SearchQuerySchema.safeParse(rawInput);

  if (!parsedInput.success) {
    const errorMessage = parsedInput.error.issues
      .map((issue) => issue.message)
      .join(", ");

    return {
      success: false,
      error: errorMessage,
    };
  }

  const { query, dialect, page, limit } = parsedInput.data;

  try {
    const mockDbResponse: unknown[] = [
      {
        id: "1",
        word: "Псэ",
        definition: "Can, ruh",
        kelime: "Псэ",
        tanim: "Can, ruh",
        dictionaryId: "sozluk-1",
        dialect: "BATI",
        fromLang: "ady",
        toLang: "tr",
      },
    ];

    const validatedItems: DictionaryItem[] = [];

    for (const rawItem of mockDbResponse) {
      const parsedItem = DictionaryItemSchema.safeParse(rawItem);

      if (parsedItem.success) {
        // dialect ve parsedItem.data.dialect tipleri birebir eşleştiği için TS2367 hatası çözülmüştür
        if (dialect === "TUMU" || parsedItem.data.dialect === dialect) {
          validatedItems.push(parsedItem.data);
        }
      }
    }

    return {
      success: true,
      data: validatedItems,
      pagination: {
        total: validatedItems.length,
        page,
        limit,
      },
    };
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Bilinmeyen bir sunucu hatası oluştu.";

    return {
      success: false,
      error: errorMessage,
    };
  }
}