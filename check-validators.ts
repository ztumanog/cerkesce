import { AdrValidator } from './src/infra/governance/AdrValidator';
import { PhaseStatusValidator } from './src/infra/governance/PhaseStatusValidator';

console.log('=== ADR VALIDATOR ===');
const adr = AdrValidator.validate();
console.log(JSON.stringify(adr, null, 2));

console.log('\n=== PHASE VALIDATOR ===');
const phase = PhaseStatusValidator.validate();
console.log(JSON.stringify(phase, null, 2));
