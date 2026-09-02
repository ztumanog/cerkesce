export interface ApiKeyPolicy {
  key: string;
  tier: 'FREE' | 'PRO' | 'ENTERPRISE';
  rateLimitPerMin: number;
}

export class ApiKeyGovernanceService {
  private static policies = new Map<string, ApiKeyPolicy>();

  public static registerKey(key: string, tier: 'FREE' | 'PRO' | 'ENTERPRISE'): ApiKeyPolicy {
    const rateLimitPerMin = tier === 'FREE' ? 60 : tier === 'PRO' ? 600 : 6000;
    const policy: ApiKeyPolicy = { key, tier, rateLimitPerMin };
    this.policies.set(key, policy);
    return policy;
  }

  public static getPolicy(key: string): ApiKeyPolicy | undefined {
    return this.policies.get(key);
  }

  public static clear(): void {
    this.policies.clear();
  }
}