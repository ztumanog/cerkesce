import { GovernanceDashboardService } from './src/infra/governance/GovernanceDashboardService';
import { GovernanceRiskEngine } from './src/infra/intelligence/GovernanceRiskEngine';
import { ReleaseReadinessAdvisor } from './src/infra/intelligence/ReleaseReadinessAdvisor';

console.log('===== GovernanceDashboardService =====');
console.log(JSON.stringify(GovernanceDashboardService.getDashboard(), null, 2));

console.log('\n===== GovernanceRiskEngine =====');
console.log(JSON.stringify(GovernanceRiskEngine.evaluate(), null, 2));

console.log('\n===== ReleaseReadinessAdvisor =====');
console.log(JSON.stringify(ReleaseReadinessAdvisor.assess(), null, 2));
