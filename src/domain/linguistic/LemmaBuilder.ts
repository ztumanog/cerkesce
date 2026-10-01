export interface LemmaSense {
  lexemeId: string;
  meaning: string;
  conceptId?: string;
  dialectVariants?: Record<string, string>;
}

export interface Lemma {
  lemmaId: string;
  form: string;
  senses: LemmaSense[];
  isHomonym: boolean;
}

export interface LexemeInput {
  id: string;
  form: string;
  literalMeaning?: string;
  conceptId?: string;
  dialectVariants?: Record<string, string>;
}

export class LemmaBuilder {
  build(lexemes: LexemeInput[]): Lemma[] {
    const byForm = new Map<string, LexemeInput[]>();

    for (const lex of lexemes) {
      const form = lex.form.trim();
      if (!byForm.has(form)) byForm.set(form, []);
      byForm.get(form)!.push(lex);
    }

    const result: Lemma[] = [];

    for (const [form, group] of byForm.entries()) {
      const slug = form
        .replace(/[^a-zA-Zа-яёА-ЯЁа-яА-ЯёЁ\u04C0\u04CF]/g, '')
        .toUpperCase()
        .slice(0, 12) || 'X';

      const lemmaId = 'LEMMA-' + slug;

      const senses: LemmaSense[] = group.map(l => ({
        lexemeId: l.id,
        meaning: l.literalMeaning || '',
        conceptId: l.conceptId,
        dialectVariants: l.dialectVariants,
      }));

      result.push({
        lemmaId,
        form,
        senses,
        isHomonym: group.length > 1,
      });
    }

    return result;
  }

  getHomonyms(lexemes: LexemeInput[]): Lemma[] {
    return this.build(lexemes).filter(l => l.isHomonym);
  }
}
