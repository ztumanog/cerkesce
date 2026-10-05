import { AdrValidator } from './src/infra/governance/AdrValidator';
import { PhaseStatusValidator } from './src/infra/governance/PhaseStatusValidator';
import { DocumentationConsistencyChecker } from './src/infra/governance/DocumentationConsistencyChecker';
import { GovernanceRecommendationService } from './src/infra/operations/GovernanceRecommendationService';
import { ExecutiveIntelligenceService } from './src/infra/operations/ExecutiveIntelligenceService';
import { IntelligenceDashboardViewService } from './src/infra/ui/IntelligenceDashboardViewService';

console.log('=== AdrValidator ===');
console.log(JSON.stringify(AdrValidator.validate(), null, 2));

console.log('=== PhaseStatusValidator ===');
console.log(JSON.stringify(PhaseStatusValidator.validate(), null, 2));

console.log('=== DocumentationConsistencyChecker ===');
console.log(JSON.stringify(DocumentationConsistencyChecker.check(), null, 2));

console.log('=== GovernanceRecommendationService ===');
console.log(JSON.stringify(GovernanceRecommendationService.generate(), null, 2));

console.log('=== ExecutiveIntelligenceService ===');
console.log(JSON.stringify(ExecutiveIntelligenceService.getDashboard(), null, 2));

console.log('=== IntelligenceDashboardViewService ===');
console.log(JSON.stringify(IntelligenceDashboardViewService.getView(), null, 2));
