/**
 * P4-005: InflectionHandler
 *
 * Amaç: Kök + ek -> çekimli form üretimi (ettirgen, yönelme, zaman/kip ve bileşik çekimler dahil).
 * ADR-ROOT-001: Sadece veri üretir, Runtime'a doğrudan bağlanmaz.
 */

import {
  CAUSATIVE_PREFIXES,
  CircassianDialect,
  VERB_INFLECTION_TABLE,
  VerbInflectionRule,
  VerbTemplateZone,
  combineMorphemesPhonologically,
} from '../grammar';

export interface InflectionHandlerInput {
  rootId: string;
  morphemeIds: string[];
  rule: 'suffix' | 'prefix' | 'compound' | 'reduplication';
  dialect?: CircassianDialect;
  applyPhonology?: boolean;
}

export interface InflectionHandlerOutput {
  form: string;
  components: string[];
  rule: string;
  confidence: number;
}

export interface Root {
  id: string;
  form: string;
}

export interface Morpheme {
  id: string;
  form: string;
  type: 'lexical' | 'grammatical';
  zone?: VerbTemplateZone;
}

export class InflectionHandler {
  private roots: Map<string, Root>;
  private morphemes: Map<string, Morpheme>;

  constructor(roots: Root[], morphemes: Morpheme[]) {
    this.roots = new Map(roots.map((r) => [r.id, r]));
    this.morphemes = new Map(morphemes.map((m) => [m.id, m]));
  }

  /**
   * Kök + ek -> çekimli form.
   */
  inflect(input: InflectionHandlerInput): InflectionHandlerOutput {
    const root = this.roots.get(input.rootId);
    if (!root) {
      return {
        form: '',
        components: [],
        rule: input.rule,
        confidence: 0,
      };
    }

    if (input.rule === 'reduplication') {
      const form = `${root.form}-${root.form}`;
      return {
        form,
        components: [root.form, root.form],
        rule: input.rule,
        confidence: 1.0,
      };
    }

    const components: string[] = [root.form];
    let form = root.form;
    let resolvedCount = 0;

    for (const mid of input.morphemeIds) {
      const m = this.morphemes.get(mid);
      if (m) {
        resolvedCount += 1;
        components.push(m.form);
        if (input.rule === 'prefix') {
          form = input.applyPhonology
            ? combineMorphemesPhonologically(m.form, form)
            : m.form + form;
        } else {
          form = form + m.form;
        }
      }
    }

    const confidence =
      input.morphemeIds.length === 0
        ? 1.0
        : Number((resolvedCount / input.morphemeIds.length).toFixed(2));

    return {
      form,
      components,
      rule: input.rule,
      confidence,
    };
  }

  /**
   * Toplu çekim.
   */
  inflectAll(inputs: InflectionHandlerInput[]): InflectionHandlerOutput[] {
    return inputs.map((i) => this.inflect(i));
  }

  /**
   * Verilen fiil kök veya gövdesinden ettirgen (causative, гъэ-) biçimi türetir.
   * Örn: "кӀуэн" -> "гъэкӀуэн", "ухын" -> "гъэухын"
   */
  deriveCausative(
    stem: string,
    dialect: CircassianDialect = 'kabardian'
  ): InflectionHandlerOutput {
    const cleanStem = stem.trim();
    if (!cleanStem) {
      return { form: '', components: [], rule: 'causative', confidence: 0 };
    }

    const prefix = CAUSATIVE_PREFIXES[dialect][0] || 'гъэ';
    // Zaten ettirgen ön eki taşıyorsa çift ettirgenlikten kaçın
    if (CAUSATIVE_PREFIXES[dialect].some((p) => cleanStem.startsWith(p))) {
      return {
        form: cleanStem,
        components: [cleanStem],
        rule: 'causative_already_marked',
        confidence: 0.9,
      };
    }

    const form = combineMorphemesPhonologically(prefix, cleanStem);
    return {
      form,
      components: [prefix, cleanStem],
      rule: 'causative',
      confidence: 1.0,
    };
  }

  /**
   * Mastar veya yalın fiil gövdesini belirtilen zaman/kipe göre çeker.
   */
  inflectVerbStem(
    infinitiveOrStem: string,
    tenseOrMood: VerbInflectionRule['tenseOrMood'],
    dialect: CircassianDialect = 'kabardian',
    negative = false
  ): InflectionHandlerOutput {
    const clean = infinitiveOrStem.trim();
    if (!clean) {
      return { form: '', components: [], rule: tenseOrMood, confidence: 0 };
    }

    const bareStem = clean.endsWith('н') && clean.length > 2 ? clean.slice(0, -1) : clean;
    const rule = VERB_INFLECTION_TABLE.find((r) => r.tenseOrMood === tenseOrMood);
    if (!rule) {
      return { form: clean, components: [clean], rule: tenseOrMood, confidence: 0.5 };
    }

    const suffix =
      negative && rule.negativeSuffix
        ? rule.negativeSuffix
        : dialect === 'adyghe'
          ? rule.adygheSuffix
          : rule.kabardianSuffix;

    const form = bareStem + suffix;
    return {
      form,
      components: [bareStem, suffix],
      rule: `${tenseOrMood}${negative ? '_neg' : ''}`,
      confidence: 1.0,
    };
  }
}
