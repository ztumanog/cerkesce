/**
 * @file src/index.ts
 * @description Ã‡erkesÃ§e morfolojik eÅŸleÅŸtirme testleri ve ana giriÅŸ noktasÄ±.
 */

import { TranslationEntry } from "./domain/translation";
import { IMorphologyAnalyzer, MorphologicalSegments } from "./domain/morphology";
import { MorphologyAwareMatchingService } from "./services/MatchingService";

/**
 * Testler iÃ§in Sahte Morfolojik Analiz Servisi (MockAnalyzer)
 */
class MockAnalyzer implements IMorphologyAnalyzer {
  segment(lemma: string): MorphologicalSegments {
    if (lemma.includes("Ñ‰Ñ…ÑŠÑƒĞ½Ñ‹Ğ³ÑŠÑ")) {
      return {
        prefixes: [lemma.substring(0, 2)],
        root: "Ñ‰Ñ…ÑŠÑƒ",
        suffixes: ["Ğ½Ñ‹Ğ³ÑŠÑ"],
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
 * Testler iÃ§in Sahte Kural Listesi (Mock Rules)
 */
const mockRules = [
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "Ñ‰",
    targetPattern: "ÑˆÑŠ",
    confidenceScore: 0.9,
    name: "Root Ñ‰ â†” ÑˆÑŠ",
  },
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "Ğ¶ÑŒ",
    targetPattern: "Ğ¶ÑŠ",
    confidenceScore: 0.9,
    name: "Root Ğ¶ÑŒ â†” Ğ¶ÑŠ",
  },
  {
    scope: "root",
    status: "CONFIRMED",
    sourcePattern: "Ñ…Ñƒ",
    targetPattern: "Ñ„",
    confidenceScore: 0.9,
    name: "Root Ñ…Ñƒ â†” Ñ„",
  },
  {
    scope: "prefix",
    status: "CONFIRMED",
    sourcePattern: "Ñ„Ñ",
    targetPattern: "Ñ„Ó€Ñ",
    confidenceScore: 0.9,
    name: "Prefix Ñ„Ñ â†” Ñ„Ó€Ñ",
  },
] as any;

/**
 * Morfolojik eÅŸleÅŸtirme testlerini Ã§alÄ±ÅŸtÄ±rÄ±r
 */
async function runMorphologyMatchingTests() {
  console.log("ğŸš€ Morfolojik EÅŸleÅŸtirme Testleri BaÅŸlatÄ±lÄ±yor...\n");

  // âœ… DÃœZELTME: 2 ayrÄ± parametre geÃ§mek yerine nesne opsiyonlarÄ± veya tek argÃ¼man kullanÄ±ldÄ±.
  // Kurallar nesnesi loadRules metodu veya opsiyon objesi Ã¼zerinden servise tanÄ±mlanÄ±r.
const matcher = new MorphologyAwareMatchingService(mockRules);
  if (typeof (matcher as any).loadRules === "function") {
    (matcher as any).loadRules(mockRules);
  } else if (typeof (matcher as any).setRules === "function") {
    (matcher as any).setRules(mockRules);
  }

  const testCases = [
    {
      kbd: "Ñ‰Ñ…ÑŒÑ",
      adg: "ÑˆÑŠÑ…ÑŒÑ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 1: Root Ñ‰ â†” ÑˆÑŠ",
    },
    {
      kbd: "Ğ¶ÑŒÑ‹",
      adg: "Ğ¶ÑŠÑ‹",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 2: Root Ğ¶ÑŒ â†” Ğ¶ÑŠ",
    },
    {
      kbd: "Ñ…ÑƒĞ°Ğ±Ñ",
      adg: "Ñ„Ğ°Ğ±Ñ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 3: Root Ñ…Ñƒ â†” Ñ„",
    },
    {
      kbd: "Ñ„ÑÑ‰Ñ…ÑŠÑƒĞ½Ñ‹Ğ³ÑŠÑ",
      adg: "Ñ„Ó€ÑÑ‰Ñ…ÑŠÑƒĞ½Ñ‹Ğ³ÑŠÑ",
      expected: "MORPHOLOGY_DIALECT_VARIANT",
      label: "Test 4: Paradigm Ñ„Ñ â†” Ñ„Ó€Ñ",
    },
    {
      kbd: "Ñ„ÑÑ‰Ñ…ÑŠÑƒĞ½Ñ‹Ğ³ÑŠÑ",
      adg: "Ñ…ÑƒÑÑ‰Ñ…ÑŠÑƒĞ½Ñ‹Ğ³ÑŠÑ",
      expected: "NONE",
      label: "Test 5: Global Ñ„ â†” Ñ…Ñƒ (Yasak DÃ¶nÃ¼ÅŸÃ¼m)",
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
        `âœ… ${label}: BaÅŸarÄ±lÄ± (AlÄ±nan Tip: ${result.matchType})`
      );
    } else {
      console.log(
        `âŒ ${label}: BAÅARISIZ! (Beklenen: ${expected}, AlÄ±nan: ${result.matchType})`
      );
    }
  }

  console.log("\nâœ¨ TÃ¼m testler tamamlandÄ±.");
}

/**
 * Ana giriÅŸ noktasÄ± ve Ã¶rnek kullanÄ±m senaryolarÄ±
 */
export function main() {
  const sampleEntry: TranslationEntry = {
    id: "sample-1",
    lemma: "ĞºÓ€ÑƒÑĞ½",
    normalizedLemma: "ĞºÓ€ÑƒÑĞ½",
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
    lemma: "ĞºÓ€Ğ¾Ğ½",
    normalizedLemma: "ĞºÓ€Ğ¾Ğ½",
    dialect: "BATI",
    groupId: "group-go",
    meanings: [
      {
        id: "m-sample-2",
        language: "TR",
        text: "gitmek (AdÄ±ge)",
      },
    ],
  };

  console.log(
    "Ã‡erkesÃ§e SÃ¶zlÃ¼k Servisi BaÅŸlatÄ±ldÄ±:",
    sampleEntry.lemma,
    sampleEntry2.lemma
  );
}

if (require.main === module) {
  main();
  runMorphologyMatchingTests().catch((error) => {
    console.error("âŒ Testler Ã§alÄ±ÅŸtÄ±rÄ±lÄ±rken bir hata oluÅŸtu:", error);
  });
}
