import { GovernanceDashboardViewService } from './src/infra/ui/GovernanceDashboardViewService';
const view = GovernanceDashboardViewService.getView();
console.log(JSON.stringify(view, null, 2));
