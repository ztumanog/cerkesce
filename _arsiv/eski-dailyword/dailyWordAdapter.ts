// Dış API'den gelen ham veri tipi
export interface RawDailyWordResponse {
  word_id: string;
  title?: string;
  definition_text: string;
  example_sentence?: string;
  created_at: string;
}

// Uygulama içinde kullanılacak alan modeli
export interface DailyWord {
  readonly id: string;
  readonly word: string;
  readonly definition: string;
  readonly example?: string;
  readonly date: Date;
}

// User-Defined Type Guard (Kullanıcı Tanımlı Tip Koruması)
export const isRawDailyWord = (data: unknown): data is RawDailyWordResponse => {
  return (
    typeof data === 'object' &&
    data !== null &&
    'word_id' in data &&
    'definition_text' in data &&
    'created_at' in data &&
    typeof (data as Record<string, unknown>).word_id === 'string' &&
    typeof (data as Record<string, unknown>).definition_text === 'string' &&
    typeof (data as Record<string, unknown>).created_at === 'string'
  );
};

// Adaptör fonksiyonu
export const dailyWordAdapter = (raw: unknown): DailyWord => {
  if (!isRawDailyWord(raw)) {
    throw new Error("Gelen veri geçersiz: Zorunlu alanlar eksik veya türleri hatalı.");
  }

  const parsedDate = new Date(raw.created_at);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Gelen veri geçersiz: Tarih formatı hatalı.");
  }

  return {
    id: raw.word_id,
    word: raw.title ?? 'Bilinmeyen Kelime',
    definition: raw.definition_text,
    example: raw.example_sentence,
    date: parsedDate,
  } satisfies DailyWord;
};