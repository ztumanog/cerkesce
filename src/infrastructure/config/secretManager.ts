/**
 * Secret Manager
 * Phase 8.1.2: Secret Management
 *
 * Tum secret'lar environment variable'dan okunur.
 * Hardcoded secret YASAK.
 */

import { z } from 'zod';

// 1. Secret Schema
const secretSchema = z.object({
  // API Keys
  CERKESCE_API_KEY_DEV: z.string().min(1),
  CERKESCE_API_KEY_TEST: z.string().min(1),
  CERKESCE_API_KEY_PROD: z.string().min(1).optional(),

  // JWT
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('1h'),

  // Webhook
  WEBHOOK_SECRET: z.string().min(16).optional(),

  // Database
  DATABASE_URL: z.string().url().optional(),
});

export type SecretConfig = z.infer<typeof secretSchema>;

// 2. Secret Manager
export class SecretManager {
  private static secrets: SecretConfig | null = null;

  /**
   * Secret'lari yukle ve dogrula
   */
  static load(): SecretConfig {
    if (SecretManager.secrets) {
      return SecretManager.secrets;
    }

    const result = secretSchema.safeParse(process.env);

    if (!result.success) {
      throw new Error(
        `Secret validation failed: ${result.error.message}`
      );
    }

    SecretManager.secrets = result.data;
    return SecretManager.secrets;
  }

  /**
   * API Key dogrulama
   */
  static isValidApiKey(apiKey: string): boolean {
    const secrets = SecretManager.load();
    return [
      secrets.CERKESCE_API_KEY_DEV,
      secrets.CERKESCE_API_KEY_TEST,
      secrets.CERKESCE_API_KEY_PROD,
    ].filter(Boolean).includes(apiKey);
  }

  /**
   * JWT Secret
   */
  static getJwtSecret(): string {
    return SecretManager.load().JWT_SECRET;
  }

  /**
   * API Key sayisi
   */
  static getApiKeyCount(): number {
    const secrets = SecretManager.load();
    return [
      secrets.CERKESCE_API_KEY_DEV,
      secrets.CERKESCE_API_KEY_TEST,
      secrets.CERKESCE_API_KEY_PROD,
    ].filter(Boolean).length;
  }
}
