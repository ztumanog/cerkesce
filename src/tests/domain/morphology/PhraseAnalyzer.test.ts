import { PhraseAnalyzer } from '../../../domain/morphology/PhraseAnalyzer';

describe('PhraseAnalyzer', () => {
    let analyzer: PhraseAnalyzer;

    beforeEach(() => {
        analyzer = new PhraseAnalyzer();
    });

    it('should return EMPTY structure for empty string', () => {
        const result = analyzer.analyzePhrase('');
        expect(result.structurePattern).toBe('EMPTY');
        expect(result.tokens).toHaveLength(0);
    });

    it('should analyze a simple phrase correctly', () => {
        const result = analyzer.analyzePhrase('зы унэ');
        expect(result.sentence).toBe('зы унэ');
        expect(result.tokens).toHaveLength(2);
        expect(result.tokens[0].word).toBe('зы');
        expect(result.tokens[1].word).toBe('унэ');
    });

    it('should map syntax roles properly via SyntaxAnalyzer integration', () => {
        const result = analyzer.analyzePhrase('лӀым шым еуэ');
        expect(result.tokens.length).toBe(3);
        expect(result.tokens[0].role).toBe('subject_ergative');
    });
});
