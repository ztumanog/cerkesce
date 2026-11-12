import { convertAdyToKbd, convertKbdToAdy } from '@/lib/dialectConverter';
import { normalizePalochka } from '@/domain/utils/normalizePalochka';

export interface DialectVariantDisplay {
  adyghePrimary: string;
  adygheAlternatives: { form: string; sourceLabel: string }[];
  kabardianPrimary: string;
  kabardianAlternatives: { form: string; sourceLabel: string }[];
  hasDifference: boolean;
}

function norm(s?: string | null): string {
  return s ? normalizePalochka(s).trim() : '';
}

export function resolveDialectVariantDisplay(input: {
  form?: string | null;
  dialect?: string | null;
  dialectVariants?: { adyghe?: string; kabardian?: string } | null;
}): DialectVariantDisplay | null {
  const form = norm(input.form);
  const storedAdy = norm(input.dialectVariants?.adyghe);
  const storedKbd = norm(input.dialectVariants?.kabardian);
  const d = (input.dialect || '').toLowerCase();

  const isEastern = d === 'dogu' || d === 'eastern' || d === 'kbd' || d === 'kabardian';
  const isWestern = d === 'western' || d === 'bati' || d === 'ady' || d === 'adyghe';

  let kbdBase = storedKbd || (isEastern ? form : '');
  let adyBase = storedAdy || (isWestern ? form : '');

  if (!kbdBase && adyBase) {
    kbdBase = norm(convertAdyToKbd(adyBase));
  }
  if (!adyBase && kbdBase) {
    adyBase = norm(convertKbdToAdy(kbdBase));
  }
  if (!kbdBase && !adyBase && form) {
    kbdBase = form;
    adyBase = norm(convertKbdToAdy(form));
  }

  if (!adyBase && !kbdBase) return null;

  // Motorun Huvaj/akademik birincil ciktisi ile stored varyant farkliysa ikisini de goster
  const engineAdy = kbdBase ? norm(convertKbdToAdy(kbdBase)) : '';
  const engineKbd = adyBase ? norm(convertAdyToKbd(adyBase)) : '';

  let adyghePrimary = engineAdy || adyBase;
  const adygheAlternatives: { form: string; sourceLabel: string }[] = [];

  if (adyBase && adyghePrimary && adyBase !== adyghePrimary) {
    adygheAlternatives.push({
      form: adyBase,
      sourceLabel: 'Sözlük Varyantı (AIG / Tharkaho)',
    });
  }

  let kabardianPrimary = kbdBase || engineKbd;
  const kabardianAlternatives: { form: string; sourceLabel: string }[] = [];

  if (engineKbd && kabardianPrimary && engineKbd !== kabardianPrimary) {
    kabardianAlternatives.push({
      form: engineKbd,
      sourceLabel: 'Dönüştürücü Karşılığı',
    });
  }

  return {
    adyghePrimary,
    adygheAlternatives,
    kabardianPrimary,
    kabardianAlternatives,
    hasDifference: adyghePrimary !== kabardianPrimary || adygheAlternatives.length > 0,
  };
}