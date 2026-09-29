import { WordFamilyResolver } from '../../../domain/discovery/services/WordFamilyResolver';
import { CONCEPT_REGISTRY } from '../../../domain/concept/ConceptRegistry';

const resolver = new WordFamilyResolver();

console.log('=== MIMARIN İSTEDİĞİ EŞLEŞMELER ===');
console.log('щхьэ →', resolver.resolve('щхьэ').conceptId, '(beklenen: HEAD)');
console.log('щхьэгу →', resolver.resolve('щхьэгу').conceptId, '(beklenen: TOP)');
console.log('щхьэусыгъуэ →', resolver.resolve('щхьэусыгъуэ').conceptId, '(beklenen: REASON)');

console.log('\n=== EK EŞLEŞMELER ===');
console.log('щхьэц →', resolver.resolve('щхьэц').conceptId, '(beklenen: HAIR)');
console.log('щхьэгъубжэ →', resolver.resolve('щхьэгъубжэ').conceptId, '(beklenen: WINDOW)');
console.log('щхьэхуит →', resolver.resolve('щхьэхуит').conceptId, '(beklenen: FREEDOM)');

console.log('\n=== ROOT BULMA ===');
console.log('щхьэ root →', resolver.resolveRoot('щхьэ'));
console.log('щхьэгу root →', resolver.resolveRoot('щхьэгу'));

console.log('\n=== щхьэ CONCEPTLERİ ===');
console.log('Tüm conceptler:', resolver.getConceptsByRoot('щхьэ'));
