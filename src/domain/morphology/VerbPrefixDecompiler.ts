/**
 * VerbPrefixDecompiler - Fiil Önek Çözümleyici
 * ADR-0042: Verbal Prefix Unstacking (Directional, Person, Applicative, Locative, Causative)
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

    // 1. En Dış Yönelim Öneki (къы-) veya Başlangıç Şahıs Önekleri (сы-, у-, и-, т-, ф-)
    if (stem.startsWith('къы') && stem.length > 3) {
      prefixes.push({ type: 'directional', morpheme: 'къы', glossTr: 'Yönelim Öneki (Buraya / Bize)' });
      stem = stem.slice(3);

      // къы- hemen ardından gelen dolaylı nesne şahıs önekleri (с-, у-, т-, ф-)
      if (stem.startsWith('с') && stem.length > 3 && !stem.startsWith('сы')) {
        prefixes.push({ type: 'person', morpheme: 'с', glossTr: '1. Tekil Şahıs (Bana / Benim)' });
        stem = stem.slice(1);
      } else if (stem.startsWith('у') && stem.length > 3 && !stem.startsWith('ун')) {
        prefixes.push({ type: 'person', morpheme: 'у', glossTr: '2. Tekil Şahıs (Sana / Senin)' });
        stem = stem.slice(1);
      } else if (
        stem.startsWith('т') &&
        stem.length > 3 &&
        (!stem.startsWith('тх') || stem.startsWith('тху')) &&
        !stem.startsWith('те') &&
        !stem.startsWith('ты')
      ) {
        prefixes.push({ type: 'person', morpheme: 'т', glossTr: '1. Çoğul Şahıs (Bize / Bizim)' });
        stem = stem.slice(1);
      } else if (stem.startsWith('ф') && stem.length > 3 && !stem.startsWith('фэ') && !stem.startsWith('ху')) {
        prefixes.push({ type: 'person', morpheme: 'ф', glossTr: '2. Çoğul Şahıs (Size / Sizin)' });
        stem = stem.slice(1);
      }
    } else if (stem.startsWith('сы') && stem.length > 3) {
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
      (!stem.startsWith('тх') || stem.startsWith('тху')) &&
      !stem.startsWith('те') &&
      !stem.startsWith('ты')
    ) {
      prefixes.push({ type: 'person', morpheme: 'т', glossTr: '1. Çoğul Şahıs (Biz)' });
      stem = stem.slice(1);
    } else if (stem.startsWith('ф') && stem.length > 2 && !stem.startsWith('фэ')) {
      prefixes.push({ type: 'person', morpheme: 'ф', glossTr: '2. Çoğul Şahıs (Siz)' });
      stem = stem.slice(1);
    }

    // 2. Yarar / Yönelme & Enstrümental Önekleri (хуэ-, хуи-, хуа-, фэ-, ри-)
    if (stem.startsWith('хуэ') && stem.length > 3) {
      prefixes.push({ type: 'applicative', morpheme: 'хуэ', glossTr: 'Yarar / Yönelme Öneki (İçin / Ona)' });
      stem = stem.slice(3);
    } else if (stem.startsWith('хуи') && stem.length > 3) {
      prefixes.push({ type: 'applicative', morpheme: 'хуи', glossTr: 'Yarar + 3. Tekil Ergatif (Onun İçin)' });
      stem = stem.slice(3);
    } else if (stem.startsWith('хуа') && stem.length > 3) {
      prefixes.push({ type: 'applicative', morpheme: 'хуа', glossTr: 'Yarar + 3. Çoğul Ergatif (Onlar İçin)' });
      stem = stem.slice(3);
    } else if (stem.startsWith('фэ') && stem.length > 2) {
      prefixes.push({ type: 'applicative', morpheme: 'фэ', glossTr: 'Yarar / Yönelme Öneki (İçin / Ona)' });
      stem = stem.slice(2);
    } else if (stem.startsWith('ри') && stem.length > 3) {
      prefixes.push({ type: 'applicative', morpheme: 'ри', glossTr: 'Dolaylı / Araç Öneki (Onunla / Ona)' });
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

