/**
 * P4-005: InflectionHandler
 *
 * Amac: Kok + ek -> cekimli form.
 * ADR-ROOT-001: Sadece veri uretir, Runtime'a baglanmaz.
 */

export interface InflectionHandlerInput {
  rootId: string;
  morphemeIds: string[];
  rule: 'suffix' | 'prefix' | 'compound' | 'reduplication';
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
}

export class InflectionHandler {
  private roots: Map<string, Root>;
  private morphemes: Map<string, Morpheme>;

  constructor(roots: Root[], morphemes: Morpheme[]) {
    this.roots = new Map(roots.map(r => [r.id, r]));
    this.morphemes = new Map(morphemes.map(m => [m.id, m]));
  }

  /**
   * Kok + ek -> cekimli form.
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

    const components: string[] = [root.form];
    let form = root.form;

    for (const mid of input.morphemeIds) {
      const m = this.morphemes.get(mid);
      if (m) {
        components.push(m.form);
        if (input.rule === 'prefix') {
          form = m.form + form;
        } else {
          form = form + m.form;
        }
      }
    }

    return {
      form,
      components,
      rule: input.rule,
      confidence: 1.0,
    };
  }

  /**
   * Toplu cekim.
   */
  inflectAll(inputs: InflectionHandlerInput[]): InflectionHandlerOutput[] {
    return inputs.map(i => this.inflect(i));
  }
}
