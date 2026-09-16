export interface ClassifiedContent {
translations: string[];
definitions: string[];
examples: string[];
relatedTerms: string[];
usages: string[];           // Drawer'ın eski kodunu kırmak istemiyoruz
}

export function cleanUsageLabel(text: string): string {
if (!text) return "";
let cleaned = text.trim();
while (/^(\d+|[а-яёӀa-z])\)\s*/iu.test(cleaned)) {
  cleaned = cleaned.replace(/^(\d+|[а-яёӀa-z])\)\s*/iu, "").trim();
}
return cleaned;
}

export function classifyContent(rawValues: string[], lemma: string): ClassifiedContent {
const result: ClassifiedContent = {
  translations: [],
  definitions: [],
  examples: [],
  relatedTerms: [],
  usages: [],
};

const processed = new Set<string>();
const cleanLemma = lemma.trim().toLowerCase();
const upperLemma = cleanLemma.toUpperCase();

rawValues.forEach((raw) => {
  if (!raw) return;

  const parts = raw.split(';').map(p => p.trim()).filter(Boolean);

  parts.forEach((part) => {
    const cleaned = cleanUsageLabel(part);
    if (!cleaned || processed.has(cleaned.toLowerCase())) return;
    processed.add(cleaned.toLowerCase());

    const upper = cleaned.toUpperCase();

    // 1. ÖRNEKLER - Yeni ve daha esnek kurallar
    if (
      cleaned.includes('—') ||
      cleaned.includes('->') ||
      cleaned.includes('-su ') ||
      cleaned.includes(' su ') ||
      cleaned.length > 45 ||                    // uzun olanlar büyük ihtimal örnek
      cleaned.includes('(') && cleaned.includes(')')
    ) {
      result.examples.push(cleaned);
      return;
    }

    // 2. İLGİLİ TERİMLER (Büyük harfli alt maddeler)
    if (upper.startsWith(upperLemma + " ") || upper.startsWith(upperLemma + "-")) {
      result.relatedTerms.push(cleaned);
      return;
    }

    // 3. Çeviriler (temiz ve kısa olanlar)
    const hasPunctuation = /[(),.;:!?]/.test(cleaned);
    const wordCount = cleaned.trim().split(/\s+/).length;
    const containsLemma = cleaned.toLowerCase().includes(cleanLemma) && cleaned !== lemma;

    if (!hasPunctuation && wordCount <= 3 && !containsLemma && result.translations.length < 3) {
      result.translations.push(cleaned);
    } else {
      result.usages.push(cleaned);
    }
  });
});

// Hiç çeviri çıkmadıysa ilk uygun maddeyi çeviri olarak al
if (result.translations.length === 0 && result.usages.length > 0) {
  result.translations.push(result.usages.shift()!);
}

// Usages'tan kalanları da relatedTerms'e ekle (Drawer uyumluluğu için)
result.relatedTerms = [...new Set([...result.relatedTerms, ...result.usages])];

return result;
}