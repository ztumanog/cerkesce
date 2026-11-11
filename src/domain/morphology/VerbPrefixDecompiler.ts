/**
 * VerbPrefixDecompiler - Fiil Önek Çözümleyici
 * ADR-0042: Verbal Prefix Unstacking (Causative, Reflexive, Reciprocal, Locative, 3SG Person)
 */

export interface VerbPrefix {
  type: 'causative' | 'reflexive' | 'reciprocal' | 'person' | 'locative';
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

    // 1. Şahıs Önekleri (сы-, у-, и-, т-, ф-)
    if (stem.startsWith('сы')) {
      prefixes.push({ type: 'person', morpheme: 'сы', glossTr: '1. Tekil Şahıs (Ben)' });
      stem = stem.slice(2);
    } else if (stem.startsWith('у') && stem.length > 2 && !stem.startsWith('ун')) {
      prefixes.push({ type: 'person', morpheme: 'у', glossTr: '2. Tekil Şahıs (Sen)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('и') && stem.length > 2) {
      prefixes.push({ type: 'person', morpheme: 'и', glossTr: '3. Tekil Şahıs (O / Onun)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('т') && stem.length > 2 && !stem.startsWith('тх')) {
      prefixes.push({ type: 'person', morpheme: 'т', glossTr: '1. Çoğul Şahıs (Biz)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('ф') && stem.length > 2) {
      prefixes.push({ type: 'person', morpheme: 'ф', glossTr: '2. Çoğul Şahıs (Siz)' });
      stem = stem.slice(1);
    }

    // 2. Dönüşlülük (зы-) ve İşteşlik (зэ-) Önekleri
    if (stem.startsWith('зы')) {
      prefixes.push({ type: 'reflexive', morpheme: 'зы', glossTr: 'Dönüşlülük Öneki (Kendi)' });
      stem = stem.slice(2);
    } else if (stem.startsWith('зэ')) {
      prefixes.push({ type: 'reciprocal', morpheme: 'зэ', glossTr: 'İşteşlik Öneki (Birbiri)' });
      stem = stem.slice(2);
    }

    // 3. Yer / Yön & Birliktelik Önekleri (де-, хэ-, щӀэ-, дэ-)
    if (stem.startsWith('де')) {
      prefixes.push({ type: 'locative', morpheme: 'де', glossTr: 'Birliktelik / Yer Öneki' });
      stem = stem.slice(2);
    } else if (stem.startsWith('хэ')) {
      prefixes.push({ type: 'locative', morpheme: 'хэ', glossTr: 'İçinde / Arasında Öneki' });
      stem = stem.slice(2);
    } else if (stem.startsWith('щӀэ')) {
      prefixes.push({ type: 'locative', morpheme: 'щӀэ', glossTr: 'Altında / İçinde Öneki' });
      stem = stem.slice(3);
    } else if (stem.startsWith('дэ')) {
      prefixes.push({ type: 'locative', morpheme: 'дэ', glossTr: 'İçinde / Birlikte Öneki' });
      stem = stem.slice(2);
    }

    // 4. Ettirgenlik Öneki (гъэ-)
    if (stem.startsWith('гъэ')) {
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