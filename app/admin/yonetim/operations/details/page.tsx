import { AlertDeduplicationService } from '@/infra/operations/AlertDeduplicationService';
import { AlertCooldownService } from '@/infra/operations/AlertCooldownService';
import { AlertAggregationService } from '@/infra/operations/AlertAggregationService';
import { IncidentCorrelationService } from '@/infra/operations/IncidentCorrelationService';
import { CapacityScalingService } from '@/infra/operations/CapacityScalingService';
import { MultiRegionReadinessService } from '@/infra/operations/MultiRegionReadinessService';
import OperationsDetailsClient from './OperationsDetailsClient';

export default function OperationsDetailsPage() {
  const dedup = AlertDeduplicationService.getReport();
  const cooldown = AlertCooldownService.getReport();
  const aggregation = AlertAggregationService.getReport();
  const correlation = IncidentCorrelationService.getReport();
  const scaling = CapacityScalingService.getReport();
  const regions = MultiRegionReadinessService.getReport();

  const seed = {
    alerts: (dedup as any).uniqueAlerts ?? [],
    incidents: (correlation as any).correlatedIncidents ?? [],
    regions: (regions as any).regions ?? [],
    generatedAt: new Date().toISOString(),
  };

  return <OperationsDetailsClient seed={seed} />;
}
