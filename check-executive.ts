import { ExecutiveViewService } from './src/infra/ui/ExecutiveViewService';
const view = ExecutiveViewService.getView();
console.log(JSON.stringify(view, null, 2));
