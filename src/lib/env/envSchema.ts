import { z } from 'zod';

/**
 * Environment variable schema.
 * Sprint 8.1.1 - Environment Separation
 * Ref: ADR-GOV-007
 */
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'test', 'staging', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  SENTRY_ENABLED: z.enum(['true', 'false']).default('false'),
  SENTRY_DSN: z.string().url().optional(),
  METRICS_ENABLED: z.enum(['true', 'false']).default('true'),
  HEALTH_CHECK_ENABLED: z.enum(['true', 'false']).default('true'),
});

export type Env = z.infer<typeof envSchema>;

/**
 * Validate environment variables.
 * Called at app startup. Throws if invalid.
 */
export function validateEnv(): Env {
  const parsed = envSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_APP_ENV: process.env.NEXT_PUBLIC_APP_ENV,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    API_BASE_URL: process.env.API_BASE_URL,
    SENTRY_ENABLED: process.env.SENTRY_ENABLED,
    SENTRY_DSN: process.env.SENTRY_DSN,
    METRICS_ENABLED: process.env.METRICS_ENABLED,
    HEALTH_CHECK_ENABLED: process.env.HEALTH_CHECK_ENABLED,
  });

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
}

export const env = validateEnv();
