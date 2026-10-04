/**
 * WiktionaryParser - Vikisozluk wikitext parser
 */

export interface WiktionaryEntry {
  word: string;
  partOfSpeech?: string;
  ipa?: string;
  root?: string;
  meanings: string[];
  examples: Array<{ text: string; translation?: string }>;
  translations?: { english?: string[]; russian?: string[] };
}

export class WiktionaryParser {
  static parse(word: string, wikitext: string): WiktionaryEntry {
    const entry: WiktionaryEntry = {
      word,
      meanings: [],
      examples: [],
    };

    // 1. Kelime turu
    const posMatch = wikitext.match(/\|лъэпкъыгъуэ=([^}|]+)/);
    if (posMatch) {
      entry.partOfSpeech = this.translatePOS(posMatch[1].trim());
    }

    // 2. IPA
    const ipaMatch = wikitext.match(/\|къэпсэлъ=([^}|]+)/);
    if (ipaMatch) {
      entry.ipa = '/' + ipaMatch[1].trim() + '/';
    }

    // 3. Kok
    const rootMatch = wikitext.match(/\|пс-лъабжьэ=([^}|]+)/);
    if (rootMatch) {
      entry.root = rootMatch[1].trim();
    }

    // 4. Anlamlar
    const meaningsSection = wikitext.split('{{мыхьэнэ}}')[1];
    if (meaningsSection) {
      const lines = meaningsSection.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('#')) {
          const meaning = trimmed.replace(/^#+\s*/, '').trim();
          if (meaning && !meaning.startsWith('{{')) {
            entry.meanings.push(meaning);
          }
        }
        if (trimmed.startsWith('{{щапхъэхэр}}') || trimmed.startsWith('{{зэпхахэр}}')) break;
      }
    }

    // 5. Ornek cumleler
    const examplesSection = wikitext.split('{{щапхъэхэр}}')[1];
    if (examplesSection) {
      const lines = examplesSection.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('*')) {
          const example = trimmed.replace(/^\*+\s*/, '').trim();
          if (example && !example.startsWith('{{')) {
            const cleaned = example.replace(/\{\{автор\|[^}]+\}\}/g, '').trim();
            if (cleaned) entry.examples.push({ text: cleaned });
          }
        }
        if (trimmed.startsWith('{{зэпхахэр}}') || trimmed.startsWith('{{зэдзэкӀахэр}}')) break;
      }
    }

    // 6. Ceviriler
    const engSection = wikitext.split('{{инджылыбзэ}}')[1];
    if (engSection) {
      const lines = engSection.split('\n');
      const eng: string[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('*')) {
          const translation = trimmed.replace(/^\*+\s*/, '').trim();
          if (translation && !translation.startsWith('{{')) {
              const cleaned = translation.replace(/^[^:]+:\s*/, '').trim();
              if (cleaned) eng.push(cleaned);
            }
        }
        if (trimmed.startsWith('{{урысыбзэ}}') || trimmed.startsWith('{{библиографие}}')) break;
      }
      if (eng.length > 0) entry.translations = { ...entry.translations, english: eng };
    }

    const rusSection = wikitext.split('{{урысыбзэ}}')[1];
    if (rusSection) {
      const lines = rusSection.split('\n');
      const rus: string[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('*')) {
          const translation = trimmed.replace(/^\*+\s*/, '').trim();
          if (translation && !translation.startsWith('{{')) {
              const cleaned = translation.replace(/^[^:]+:\s*/, '').trim();
              if (cleaned) rus.push(cleaned);
            }
        }
        if (trimmed.startsWith('{{библиографие}}') || trimmed.startsWith('<div')) break;
      }
      if (rus.length > 0) entry.translations = { ...entry.translations, russian: rus };
    }

    return entry;
  }

  private static translatePOS(pos: string): string {
    const map: Record<string, string> = {
      'ЩЫӀЭЦӀЭ': 'noun',
      'ПЛЪЫФЭЦӀЭ': 'adjective',
      'ГЛАГОЛ': 'verb',
      'ГЛАГОЛ ЛЪЭӀЭС': 'transitive_verb',
      'ГЛАГОЛ ЛЪЭМЫӀЭС': 'intransitive_verb',
      'ПСАЛЪЭ ЗЭПХА': 'adverb',
      'ПСАЛЪЭ ЛЪАБЖЬЭ': 'numeral',
      'ЦӀЭПАПЩӀЭ': 'pronoun',
    };
    return map[pos] ?? pos.toLowerCase();
  }
}


