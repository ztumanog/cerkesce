import { normalizePalochka } from '@/domain/utils/normalizePalochka';

export interface DeclensionRow {
  caseNameTr: string;
  caseNameCircassian: string;
  singularIndefinite: string;
  singularDefinite: string;
  pluralIndefinite: string;
  pluralDefinite: string;
}

export function generateNounDeclension(rawWord?: string | null): DeclensionRow[] | null {
  if (!rawWord) return null;
  const word = normalizePalochka(rawWord).trim();
  if (!word || word.includes(' ')) return null;

  // Unluyle biten koklerde (орн. шыгъажэ, унэ) ek birlesimi dogrudan, unsuzle bitenlerde -ы baglanti unlusuyle
  const endsWithVowel = /[аеёиоуыэюя]$/i.test(word);
  const stem = endsWithVowel ? word : `${word}ы`;

  return [
    {
      caseNameTr: 'Yalın Hal',
      caseNameCircassian: 'Именительнэ',
      singularIndefinite: word,
      singularDefinite: `${stem}р`,
      pluralIndefinite: '—',
      pluralDefinite: `${stem}хэр`,
    },
    {
      caseNameTr: 'Ergatif / Yönelme',
      caseNameCircassian: 'Эргативнэ',
      singularIndefinite: word,
      singularDefinite: `${stem}м`,
      pluralIndefinite: '—',
      pluralDefinite: `${stem}хэм`,
    },
    {
      caseNameTr: 'Enstrümantal / Vasıta',
      caseNameCircassian: 'Послеложнэ',
      singularIndefinite: `${stem}кӀэ`,
      singularDefinite: `${stem}мкӀэ`,
      pluralIndefinite: `${stem}хэкӀэ`,
      pluralDefinite: `${stem}хэмкӀэ`,
    },
    {
      caseNameTr: 'Zarf / Durum',
      caseNameCircassian: 'Обстоятельственнэ',
      singularIndefinite: `${stem}у`,
      singularDefinite: `${stem}рауэ`,
      pluralIndefinite: `${stem}хэу`,
      pluralDefinite: `${stem}хэрауэ`,
    },
  ];
}