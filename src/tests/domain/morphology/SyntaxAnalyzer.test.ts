import { SyntaxAnalyzer } from '../../../domain/morphology/SyntaxAnalyzer';

describe('SyntaxAnalyzer', () => {
    let analyzer: SyntaxAnalyzer;

    beforeEach(() => {
        analyzer = new SyntaxAnalyzer();
    });

    it('should return EMPTY structure for empty string', () => {
        const result = analyzer.analyzeSentence('');
        expect(result.structurePattern).toBe('EMPTY');
        expect(result.tokens).toHaveLength(0);
    });

    it('should identify ergative subject correctly', () => {
        const result = analyzer.analyzeSentence('лӀым шым еуэ');
        // 'лӀым' ends with 'м', should be subject_ergative
        expect(result.tokens[0].role).toBe('subject_ergative');
        expect(result.structurePattern).toContain('ERG_SUBJ');
    });

    it('should identify nominative subject correctly', () => {
        const result = analyzer.analyzeSentence('унэр инщ');
        // 'унэр' ends with 'р', no ergative in sentence, so it is nominative
        expect(result.tokens[0].role).toBe('subject_nominative');
    });

    it('should identify clauses correctly', () => {
        const result = analyzer.analyzeSentence('кӀуэмэ');
        expect(result.tokens[0].role).toBe('conditional_clause');
        expect(result.structurePattern).toBe('CONDITIONAL_CLAUSE');
    });
});
