import { MorphologyAnalyzer, MorphemeDetail } from '@/domain/morphology/MorphologyAnalyzer';
import { normalizePalochka } from '@/domain/morphology/utils/textUtils';

export interface VerbConjugationRow {
  personCode: '1SG' | '2SG' | '3SG' | '1PL' | '2PL' | '3PL';
  personLabelTr: string;
  pronounCircassian: string;
  present: string;
  past: string;
  future: string;
  negative: string;
}

export interface VerbMorphologySummary {
  root: string;
  infinitive: string;
  morphemes: MorphemeDetail[];
  rows: VerbConjugationRow[];
}

const analyzer = new MorphologyAnalyzer();

function attachPersonPrefix(prefix: string, stem: string): string {
  if (!prefix) return stem;
  const vowels = ['а', 'э', 'и', 'о', 'у', 'ы', 'е', 'ё', 'ю', 'я'];
  const firstChar = stem[0]?.toLowerCase() || '';
  // Sesliyle baslayan koklerde ы dusmesi (orn. сы + ухын -> сухын)
  if (prefix.endsWith('ы') && vowels.includes(firstChar)) {
    return prefix.slice(0, -1) + stem;
  }
  return prefix + stem;
}

function buildPastStem(stem: string): string {
  if (stem.endsWith('э')) return stem.slice(0, -1) + 'ащ';
  if (stem.endsWith('ы')) return stem.slice(0, -1) + 'ащ';
  if (stem.endsWith('а')) return stem + 'щ';
  return stem + 'ащ';
}

function buildFutureStem(stem: string): string {
  if (stem.endsWith('э') || stem.endsWith('ы')) return stem + 'нущ';
  return stem + 'ынущ';
}

export function generateVerbConjugation(rawWord: string): VerbMorphologySummary | null {
  const cleaned = normalizePalochka((rawWord || '').trim());
  if (!cleaned || !/[а-яА-ЯӀӏ]/.test(cleaned)) return null;

  const analysis = analyzer.analyze(cleaned);
  let root = analysis.root || cleaned;

  // Mastar eki (-н) varsa cekim govdesini cikar (orn. кӀуэн -> кӀуэ, тхын -> тхы)
  if (root.endsWith('н') && root.length >= 3) {
    root = root.slice(0, -1);
  }

  if (root.length < 2) return null;

  const infinitive = root.endsWith('н') ? root : root + 'н';

  const persons: Array<{
    code: VerbConjugationRow['personCode'];
    labelTr: string;
    pronoun: string;
    prefix: string;
    is3Pl?: boolean;
  }> = [
    { code: '1SG', labelTr: 'Ben', pronoun: 'Сэ', prefix: 'сы' },
    { code: '2SG', labelTr: 'Sen', pronoun: 'Уэ', prefix: 'уы' },
    { code: '3SG', labelTr: 'O', pronoun: 'Ар', prefix: '' },
    { code: '1PL', labelTr: 'Biz', pronoun: 'Дэ', prefix: 'ды' },
    { code: '2PL', labelTr: 'Siz', pronoun: 'Фэ', prefix: 'фы' },
    { code: '3PL', labelTr: 'Onlar', pronoun: 'Ахэр', prefix: '', is3Pl: true },
  ];

  const rows: VerbConjugationRow[] = persons.map((p) => {
    const baseStem = attachPersonPrefix(p.prefix, root);
    const present = p.is3Pl ? `${baseStem}хэщ` : `${baseStem}щ`;
    const past = p.is3Pl
      ? `${baseStem}ахэщ`
      : buildPastStem(baseStem);
    const future = p.is3Pl
      ? `${baseStem}нухэщ`
      : buildFutureStem(baseStem);
    const negative = p.is3Pl
      ? `${baseStem}хэкъым`
      : `${baseStem}къым`;

    return {
      personCode: p.code,
      personLabelTr: p.labelTr,
      pronounCircassian: p.pronoun,
      present,
      past,
      future,
      negative,
    };
  });

  return {
    root,
    infinitive,
    morphemes: analysis.morphemes || [{ morpheme: root, type: 'root', meaningTr: 'Fiil Kökü' }],
    rows,
  };
}