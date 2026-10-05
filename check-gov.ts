import { GovernanceDashboardViewService } from './src/infra/ui/GovernanceDashboardViewService';
const view = GovernanceDashboardViewService.getView();
console.log('Overall:', view.overallStatus);
console.log('Summary:', view.summary);
console.log('\nWidgets:');
view.widgets.forEach(w => console.log(`  [${w.status}] ${w.title}: ${w.value} (${w.details})`));
