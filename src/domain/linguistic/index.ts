/**
 * Linguistic Dataset Layer - Barrel Export
 *
 * ADR-ROOT-001 geregi:
 * - Bu katman runtime'dan IZOLE
 * - Tum tipler buradan export edilir
 * - Runtime import YASAK
 */

// Tip modelleri
export type { Root, SemanticDomain } from './Root';
export type { Morpheme, MorphemeType, DialectMark } from './Morpheme';
export type { WordFamily } from './WordFamily';
export type { Lexeme } from './Lexeme';
export type { SemanticRelation, RelationType } from './SemanticRelation';

// Diyalekt donusturucu (veri uretimi icin)
export { DialectConverter } from './DialectConverter';