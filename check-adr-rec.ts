import { AdrRecommendationAssistant } from './src/infra/intelligence/AdrRecommendationAssistant';
const result = AdrRecommendationAssistant.generate();
console.log(JSON.stringify(result, null, 2));
