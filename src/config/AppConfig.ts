export interface AppEnvironmentConfig {
  env: 'development' | 'staging' | 'production';
  version: string;
  apiBaseUrl: string;
  enableAuditLogs: boolean;
  maxViewportNodes: number;
}

export const AppConfig: AppEnvironmentConfig = {
  env: 'production',
  version: '8.2.0-rc1',
  apiBaseUrl: '/api/v1',
  enableAuditLogs: true,
  maxViewportNodes: 200
};