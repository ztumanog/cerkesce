export interface CooldownEntry {
  key: string;
  lastAlerted: number;
  cooldownMs: number;
}

export interface CooldownResult {
  allowed: boolean;
  remainingMs: number;
  key: string;
}

export class AlertCooldownService {
  private static cooldowns: Map<string, CooldownEntry> = new Map();
  private static defaultCooldownMs = 5 * 60 * 1000;

  static setCooldown(key: string, cooldownMs: number): void {
    this.cooldowns.set(key, {
      key,
      lastAlerted: Date.now(),
      cooldownMs,
    });
  }

  static canAlert(key: string): CooldownResult {
    const entry = this.cooldowns.get(key);
    if (!entry) {
      return { allowed: true, remainingMs: 0, key };
    }

    const elapsed = Date.now() - entry.lastAlerted;
    const remaining = Math.max(0, entry.cooldownMs - elapsed);

    if (remaining === 0) {
      return { allowed: true, remainingMs: 0, key };
    }

    return { allowed: false, remainingMs: remaining, key };
  }

  static trigger(key: string, cooldownMs?: number): CooldownResult {
    const result = this.canAlert(key);
    if (!result.allowed) return result;

    this.setCooldown(key, cooldownMs ?? this.defaultCooldownMs);
    return { allowed: true, remainingMs: 0, key };
  }

  static clear(): void {
    this.cooldowns.clear();
  }
}
