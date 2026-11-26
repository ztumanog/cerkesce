import { describe, it, expect } from 'vitest';
import {
  computeHealth,
  computeRootsAudit,
  computeConceptsAudit,
  computeTranslationsAudit,
} from '../../../scripts/report-governance.mjs';

/**
 * ADR-GOV-016 — Rapor üretici saf fonksiyonlarının birim testleri.
 * UI salt-okunur olduğu için test edilebilir mantık script'tedir (RULE-01/RULE-04).
 */

const lexemes = [
  {
    id: 'L-1', form: 'а', conceptId: 'A', concept: 'A', pos: 'noun', partOfSpeech: 'noun',
    rootId: 'R-1', rootIds: ['R-1'], wordFamilyId: 'WF-1', ipa: 'aː',
    translations: { ar: 'ا' }, examples: [{ text: 'x' }],
  },
  {
    // rootId boş + WF boş + AR boş + IPA boş + concept boş + örneksiz
    id: 'L-2', form: 'б', conceptId: '', concept: '', pos: 'noun', partOfSpeech: 'noun',
    rootId: '', rootIds: [], wordFamilyId: '', ipa: '',
    translations: {}, examples: [],
  },
  {
    // legacy conceptIds dizisi + concept != conceptId + rootId != rootIds[0]
    id: 'L-3', form: 'в', conceptId: 'C1', concept: 'FARKLI', pos: 'verb', partOfSpeech: 'verb',
    rootId: 'R-2', rootIds: ['R-9'], wordFamilyId: 'WF-2', ipa: 'v',
    translations: { ar: 'و' }, examples: [], conceptIds: ['C1', 'C2'],
  },
];

const roots = [
  { id: 'R-1', form: 'а', primaryMeaning: 'bir' },
  { id: 'R-2', form: 'б', primaryMeaning: 'iki' },
  { id: 'R-ORPHAN', form: 'гъ', primaryMeaning: 'üyesiz kök' },
];

const wordFamilies = [
  { id: 'WF-1', conceptIds: ['A'] },
  { id: 'WF-2', conceptIds: ['ASILI_X', 'ASILI_Y'] },
];

describe('computeHealth', () => {
  it('sayım, bütünlük ve doluluk metriklerini doğru hesaplar', () => {
    const h = computeHealth(lexemes, roots, wordFamilies);
    expect(h.lexemes).toBe(3);
    expect(h.roots).toBe(3);
    expect(h.wordFamilies).toBe(2);
    expect(h.duplicateIds).toBe(0);
    // L-3: rootId R-2 geçerli ama rootIds[0] olan R-9 kök havuzunda yok → 1 kırık
    expect(h.brokenRootRefs).toBe(1);
    expect(h.posEmpty).toBe(0);
    expect(h.fill.wordFamilyEmpty).toBe(1);
    expect(h.fill.rootEmpty).toBe(1);
    expect(h.fill.arabicEmpty).toBe(1);
    expect(h.fill.ipaEmpty).toBe(1);
    expect(h.fill.conceptEmpty).toBe(1);
    expect(h.fill.withExamples).toBe(1);
    expect(h.fill.exampleCoveragePct).toBeCloseTo(33.33, 1);
    expect(h.fill.conceptFillPct).toBeCloseTo(66.67, 1);
  });

  it('mükerrer ID ve kırık referansı sayar', () => {
    const dupLexemes = [
      ...lexemes,
      { ...lexemes[0] }, // L-1 kopyası → mükerrer
      { ...lexemes[1], id: 'L-4', rootId: 'R-YOK', rootIds: ['R-YOK'], wordFamilyId: 'WF-YOK' },
    ];
    const h = computeHealth(dupLexemes, roots, wordFamilies);
    expect(h.duplicateIds).toBe(1);
    // L-3: R-9 (1) + L-4: R-YOK rootId ve rootIds (2) = 3
    expect(h.brokenRootRefs).toBe(3);
    expect(h.brokenWordFamilyRefs).toBe(1);
  });
});

describe('computeRootsAudit', () => {
  it('rootId boş lexeme ile üyesiz kökü ayrı sayar (metrik sözlüğü)', () => {
    const r = computeRootsAudit(lexemes, roots, wordFamilies);
    expect(r.rootIdMissing).toBe(1);          // L-2: kayıt düzeyinde boş kök bağlantısı
    expect(r.rootIdsMissing).toBe(1);         // L-2: rootIds dizisi de boş
    expect(r.unusedRoots).toBe(1);            // R-ORPHAN: kök havuzunda üyesiz kök
    expect(r.orphanRoots).toEqual([
      { id: 'R-ORPHAN', form: 'гъ', primaryMeaning: 'üyesiz kök' },
    ]);
    expect(r.rootIdMismatch).toBe(1);         // L-3: rootId R-2, rootIds[0] R-9
    expect(r.rootIdMissingSamples).toEqual(['L-2']);
  });

  it('üyesiz wordFamily sayar (hiçbir lexeme referans etmeyen aile)', () => {
    const r = computeRootsAudit(lexemes, roots, [
      ...wordFamilies,
      { id: 'WF-ORPHAN', rootForm: 'гъ' },
    ]);
    expect(r.unusedWordFamilies).toBe(1);
    expect(r.orphanWordFamilies).toEqual([{ id: 'WF-ORPHAN', rootForm: 'гъ' }]);
  });

  it('kırık kök referansını sayar', () => {
    const r = computeRootsAudit(
      [{ ...lexemes[1], rootId: 'R-YOK', rootIds: ['R-YOK'] }],
      roots,
    );
    expect(r.brokenRootRefs).toBe(2);
    expect(r.rootIdsMissing).toBe(0); // rootId boş ama rootIds dolu
  });
});

describe('computeConceptsAudit', () => {
  it('legacy, boş, uyuşmazlık ve asılı WF metriklerini doğru hesaplar', () => {
    const c = computeConceptsAudit(lexemes, wordFamilies);
    expect(c.emptyConceptIds).toBe(1);            // L-2
    expect(c.legacyConceptIdRecords).toBe(1);     // L-3
    expect(c.legacyConceptIdValues).toBe(2);      // C1 + C2
    expect(c.conceptIdMismatch).toBe(0);          // conceptId == conceptIds[0]
    expect(c.conceptFieldMismatch).toBe(1);       // L-3: concept FARKLI
    expect(c.wfDanglingConceptRefs).toBe(1);      // WF-2
    expect(c.wfDanglingConceptValues).toBe(2);    // ASILI_X + ASILI_Y
    expect(c.emptyConceptSamples).toEqual(['L-2']);
    expect(c.legacyRecordSamples[0].id).toBe('L-3');
  });
});

describe('computeTranslationsAudit', () => {
  const trLexemes = [
    {
      id: 'L-OK', translations: { tr: 'ağaç', en: 'tree', ru: 'дерево', ar: 'شجرة' },
    },
    {
      // TR'de Kiril + EN'de Kiril + TR==EN (harf duyarsız) + AR boş
      id: 'L-CYR', translations: { tr: 'ağaç (дерево)', en: 'Ağaç (дерево)', ru: 'дерево', ar: '' },
    },
    {
      // TR İngilizce şüpheli + RU'da Latin kelime + EN'de Arapça
      id: 'L-ENG', translations: { tr: 'indefinite someone', en: 'شخص', ru: 'бук восточный (Fadus orientalis)', ar: 'شخص' },
    },
    {
      // Tümü boş
      id: 'L-EMPTY', translations: {},
    },
  ];

  it('sızıntı, şüpheli ve doluluk metriklerini doğru hesaplar', () => {
    const t = computeTranslationsAudit(trLexemes);
    expect(t.trCyrillic).toBe(1);        // L-CYR
    expect(t.trEnglishSuspect).toBe(1);  // L-ENG ("someone")
    expect(t.trEqualsEn).toBe(1);        // L-CYR: 'ağaç (дерево)' == 'Ağaç (дерево)' (harf duyarsız)
    expect(t.ruLatinWords).toBe(1);      // L-ENG: 'Fadus orientalis'
    expect(t.enArabic).toBe(1);          // L-ENG
    expect(t.trEmpty).toBe(1);           // L-EMPTY
    expect(t.enEmpty).toBe(1);
    expect(t.arEmpty).toBe(2);           // L-CYR + L-EMPTY
    expect(t.samples.trCyrillic[0].id).toBe('L-CYR');
    expect(t.samples.trEqualsEn[0].id).toBe('L-CYR');
  });

  it('meşru Türkçe içeriği şüpheli işaretlemez', () => {
    const t = computeTranslationsAudit([
      { id: 'L-TR', translations: { tr: 'her ne olursa olsun', en: 'whatever', ru: 'что бы ни было', ar: 'أي' } },
    ]);
    expect(t.trEnglishSuspect).toBe(0); // "her" Türkçedir, listede yok
    expect(t.trEqualsEn).toBe(0);
  });
});
