/**
 * CompoundDecompiler - Derin Bileşik Sözcük ve Aplikatif Ayrıştırıcı
 * ADR-0062: Deep Morphemic Decomposition for Compound Words & Prefixes
 */

import { normalizePalochka } from './utils/textUtils';
import { MorphemeDetail } from './MorphologyAnalyzer';

export interface CompoundDecompileResult {
  isCompound: boolean;
  stem: string;
  morphemes: MorphemeDetail[];
}

export class CompoundDecompiler {
  parse(word: string): CompoundDecompileResult {
    const input = normalizePalochka(word);
    if (!input) {
      return { isCompound: false, stem: word, morphemes: [] };
    }

    // 1. псыхуэлӀэ / псыхуэлӀэкӀэ -> [пс] + -ы + хуэ- + [лӀ] + -э (+ -кӀэ)
    if (input.startsWith('псыхуэлӀ')) {
      const morphemes: MorphemeDetail[] = [
        { morpheme: 'пс', type: 'root', meaningTr: 'Can / Su', glossTr: 'Kök: Su/Can' },
        { morpheme: 'ы', type: 'connective', glossTr: 'Bağlayıcı Ünlü' },
        { morpheme: 'хуэ', type: 'applicative', glossTr: 'Yönelme/İçin Öneki' },
        { morpheme: 'лӀ', type: 'root', meaningTr: 'Ölmek / Adam', glossTr: 'Kök: Ölmek' },
      ];
      if (input.includes('э')) {
        morphemes.push({ morpheme: 'э', type: 'derivation', glossTr: 'Gövde Soneki' });
      }

      return { isCompound: true, stem: 'пс', morphemes };
    }

    // 2. къэпсэлъыкӀэ -> къэ- + [пс] + [лъ] + -ы + -кӀэ
    if (input.startsWith('къэпсэлъ') || input.startsWith('псэлъ')) {
      const morphemes: MorphemeDetail[] = [];
      let current = input;

      if (current.startsWith('къэ')) {
        morphemes.push({ morpheme: 'къэ', type: 'prefix', glossTr: 'Yönelme Öneki' });
        current = current.slice(2);
      }

      morphemes.push(
        { morpheme: 'пс', type: 'root', meaningTr: 'Can / Ruh', glossTr: 'Kök: Can' },
        { morpheme: 'лъ', type: 'root', meaningTr: 'Konuşmak / Söylemek', glossTr: 'Kök: Söylemek' }
      );

      if (current.includes('ы')) {
        morphemes.push({ morpheme: 'ы', type: 'connective', glossTr: 'Bağlayıcı Ünlü' });
      }

      if (input.endsWith('кӀэ')) {
        morphemes.push({ morpheme: 'кӀэ', type: 'derivation', glossTr: 'Tarz/Biçim Soneki' });
      }

      return { isCompound: true, stem: 'псэлъ', morphemes };
    }

    return {
      isCompound: false,
      stem: input,
      morphemes: [{ morpheme: input, type: 'root' }],
    };
  }
}