/**
 * @file src/index.ts
 * @description Çerkesçe morfolojik eşleştirme testleri ve ana giriş noktası.
 */

import { TranslationEntry } from "./domain/translation";
import { IMorphologyAnalyzer, MorphologicalSegments } from "./domain/morphology";
import { MorphologyAwareMatchingService } from "./services/MatchingService";

/**
 * Testler için Sahte Morfolojik Analiz Servisi (MockAnalyzer)
 */
class MockAnalyzer implements IMorphologyAnalyzer {
  segment(lemma: string): MorphologicalSegments {
    if (lemma.includes("щхъуныгъэ")) {
      return {
        prefixes: [lemma.substring(0, 2)],
        root: "щхъу",
        suffixes: ["ныгъэ"],
      };
    }
    return { root: lemma, prefixes: [], suffixes: [] };
  }

  async analyze(word: string): Promise<any> {
    const seg = this.segment(word);
    const prefixes = seg.prefixes || [];
    const suffixes = seg.suffixes || [];

    return {
      root: seg.root,
      affixes: [...prefixes, ...suffixes],
    };
  }
}

/**
 * Testler için Sahte Kural Listesi (Mock Rules)
 */
const mockRules = [
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "щ",
    targetPattern: "шъ",
    confidenceScore: 0.9,
    name: "Root щ ↔ шъ",
  },
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "жь",
    targetPattern: "жъ",
    confidenceScore: 0.9,
    name: "Root жь ↔ жъ",
  },
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "ху",
    targetPattern: "ф",
    confidenceScore: 0.9,
    name: "Root ху ↔ ф",
  },
  {
    scope: "prefix",
    status: "CONFIRMED",
    sourcePattern: "фэ",
    targetPattern: "фӀэ",
    confidenceScore: 0.9,
    name: "Prefix фэ ↔ фӀэ",
  },
] as any;

/**
 * Morfolojik eşleştirme testlerini çalıştırır
 */
async function runMorphologyMatchingTests() {
  console.log("🚀 Morfolojik Eşleştirme Testleri Başlatılıyor...\n");

  // ✅ DÜZELTME: 2 ayrı parametre geçmek yerine nesne opsiyonları veya tek argüman kullanıldı.
  // Kurallar nesnesi loadRules metodu veya opsiyon objesi üzerinden servise tanımlanır.
const matcher = new MorphologyAwareMatchingService(mockRules);
  if (typeof (matcher as any).loadRules === "function") {
    (matcher as any).loadRules(mockRules);
  } else if (typeof (matcher as any).setRules === "function") {
    (matcher as any).setRules(mockRules);
  }

  const testCases = [
    {
      kbd: "щхьэ",
      adg: "шъхьэ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 1: Root щ ↔ шъ",
    },
    {
      kbd: "жьы",
      adg: "жъы",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 2: Root жь ↔ жъ",
    },
    {
      kbd: "хуабэ",
      adg: "фабэ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 3: Root ху ↔ ф",
    },
    {
      kbd: "фэщхъуныгъэ",
      adg: "фӀэщхъуныгъэ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 4: Paradigm фэ ↔ фӀэ",
    },
    {
      kbd: "фэщхъуныгъэ",
      adg: "хуэщхъуныгъэ",
      expected: "NONE",
      label: "Test 5: Global ф ↔ ху (Yasak Dönüşüm)",
    },
  ];

  for (const testCase of testCases) {
    const { kbd, adg, expected, label } = testCase;

    const entry1: TranslationEntry = {
      id: "entry-1",
      lemma: kbd,
      normalizedLemma: kbd,
      dialect: "DOGU",
      groupId: "group-test",
      meanings: [
        {
          id: "m1",
          language: "TR",
          text: "test",
        },
      ],
    };

    const entry2: TranslationEntry = {
      id: "entry-2",
      lemma: adg,
      normalizedLemma: adg,
      dialect: "BATI",
      groupId: "group-test",
      meanings: [
        {
          id: "m2",
          language: "TR",
          text: "test",
        },
      ],
    };

    const result = await matcher.matchEntries(entry1, entry2);

    if (result.matchType === expected) {
      console.log(
        `✅ ${label}: Başarılı (Alınan Tip: ${result.matchType})`
      );
    } else {
      console.log(
        `❌ ${label}: BAŞARISIZ! (Beklenen: ${expected}, Alınan: ${result.matchType})`
      );
    }
  }

  console.log("\n✨ Tüm testler tamamlandı.");
}

/**
 * Ana giriş noktası ve örnek kullanım senaryoları
 */
export function main() {
  const sampleEntry: TranslationEntry = {
    id: "sample-1",
    lemma: "кӀуэн",
    normalizedLemma: "кӀуэн",
    dialect: "DOGU",
    groupId: "group-go",
    meanings: [
      {
        id: "m-sample-1",
        language: "TR",
        text: "gitmek",
      },
    ],
  };

  const sampleEntry2: TranslationEntry = {
    id: "sample-2",
    lemma: "кӀон",
    normalizedLemma: "кӀон",
    dialect: "BATI",
    groupId: "group-go",
    meanings: [
      {
        id: "m-sample-2",
        language: "TR",
        text: "gitmek (Adıge)",
      },
    ],
  };

  console.log(
    "Çerkesçe Sözlük Servisi Başlatıldı:",
    sampleEntry.lemma,
    sampleEntry2.lemma
  );
}

if (require.main === module) {
  main();
  runMorphologyMatchingTests().catch((error) => {
    console.error("❌ Testler çalıştırılırken bir hata oluştu:", error);
  });
}