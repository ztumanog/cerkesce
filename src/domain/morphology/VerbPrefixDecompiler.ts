/**
 * VerbPrefixDecompiler - Fiil Önek Çözümleyici
 * ADR-0042: Verbal Prefix Unstacking (Causative, Reflexive, Reciprocal, Locative, 3SG Person)
 */

export interface VerbPrefix {
  type: 'causative' | 'reflexive' | 'reciprocal' | 'person' | 'locative' | 'directional' | 'applicative';
  morpheme: string;
  glossTr: string;
}

export interface VerbPrefixDecompileResult {
  word: string;
  stem: string;
  prefixes: VerbPrefix[];
}

export class VerbPrefixDecompiler {
  parse(verbWord: string): VerbPrefixDecompileResult {
    const input = verbWord ? verbWord.trim() : '';
    if (!input) {
      return { word: '', stem: '', prefixes: [] };
    }

    let stem = input;
    const prefixes: VerbPrefix[] = [];

    // 1. Şahıs Önekleri (сы-, у-, и-, т-, ф-) - preverb'lerle çakışma korumalı
    if (stem.startsWith('сы') && stem.length > 3) {
      prefixes.push({ type: 'person', morpheme: 'сы', glossTr: '1. Tekil Şahıs (Ben)' });
      stem = stem.slice(2);
    } else if (stem.startsWith('у') && stem.length > 2 && !stem.startsWith('ун')) {
      prefixes.push({ type: 'person', morpheme: 'у', glossTr: '2. Tekil Şahıs (Sen)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('и') && stem.length > 2) {
      prefixes.push({ type: 'person', morpheme: 'и', glossTr: '3. Tekil Şahıs (O / Onun)' });
      stem = stem.slice(1);
    } else if (
      stem.startsWith('т') &&
      stem.length > 2 &&
      !stem.startsWith('тх') &&
      !stem.startsWith('те') &&
      !stem.startsWith('ты')
    ) {
      prefixes.push({ type: 'person', morpheme: 'т', glossTr: '1. Çoğul Şahıs (Biz)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('ф') && stem.length > 2 && !stem.startsWith('фэ')) {
      prefixes.push({ type: 'person', morpheme: 'ф', glossTr: '2. Çoğul Şahıs (Siz)' });
      stem = stem.slice(1);
    }

    // 2. Yönelim / Versiyon Önekleri (къы-, хуэ-, фэ-)
    if (stem.startsWith('къы') && stem.length > 3) {
      prefixes.push({ type: 'directional', morpheme: 'къы', glossTr: 'Yönelim Öneki (Buraya / Bize)' });
      stem = stem.slice(3);
    } else if (stem.startsWith('хуэ') && stem.length > 3) {
      prefixes.push({ type: 'applicative', morpheme: 'хуэ', glossTr: 'Yarar / Yönelme Öneki (İçin / Ona)' });
      stem = stem.slice(3);
    } else if (stem.startsWith('фэ') && stem.length > 2) {
      prefixes.push({ type: 'applicative', morpheme: 'фэ', glossTr: 'Yarar / Yönelme Öneki (İçin / Ona)' });
      stem = stem.slice(2);
    }

    // 3. Dönüşlülük (зы-) ve İşteşlik (зэ-) Önekleri
    if (stem.startsWith('зы') && stem.length > 2) {
      prefixes.push({ type: 'reflexive', morpheme: 'зы', glossTr: 'Dönüşlülük Öneki (Kendi)' });
      stem = stem.slice(2);
    } else if (stem.startsWith('зэ') && stem.length > 2) {
      prefixes.push({ type: 'reciprocal', morpheme: 'зэ', glossTr: 'İşteşlik Öneki (Birbiri)' });
      stem = stem.slice(2);
    }

    // 4. Yer / Yön & Birliktelik Önekleri (те-, де-, хэ-, щӀэ-, дэ-)
    if (stem.startsWith('те') && stem.length > 2) {
      prefixes.push({ type: 'locative', morpheme: 'те', glossTr: 'Üzerine / Üstünde Öneki' });
      stem = stem.slice(2);
    } else if (stem.startsWith('де') && stem.length > 2) {
      prefixes.push({ type: 'locative', morpheme: 'де', glossTr: 'Birliktelik / Yer Öneki' });
      stem = stem.slice(2);
    } else if (stem.startsWith('хэ') && stem.length > 2) {
      prefixes.push({ type: 'locative', morpheme: 'хэ', glossTr: 'İçinde / Arasında Öneki' });
      stem = stem.slice(2);
    } else if (stem.startsWith('щӀэ') && stem.length > 3) {
      prefixes.push({ type: 'locative', morpheme: 'щӀэ', glossTr: 'Altında / İçinde Öneki' });
      stem = stem.slice(3);
    } else if (stem.startsWith('дэ') && stem.length > 2) {
      prefixes.push({ type: 'locative', morpheme: 'дэ', glossTr: 'İçinde / Birlikte Öneki' });
      stem = stem.slice(2);
    }

    // 5. Ettirgenlik Öneki (гъэ-)
    if (stem.startsWith('гъэ') && stem.length > 3) {
      prefixes.push({ type: 'causative', morpheme: 'гъэ', glossTr: 'Ettirgenlik Öneki (Yaptırma)' });
      stem = stem.slice(3);
    }

    return {
      word: input,
      stem,
      prefixes,
    };
  }

  static decompile(word: string): VerbPrefixDecompileResult {
    return new VerbPrefixDecompiler().parse(word);
  }
}
