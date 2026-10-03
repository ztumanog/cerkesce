import { describe, it, expect, beforeEach } from 'vitest';
import { AlertCooldownService } from '../../infra/operations/AlertCooldownService';

describe('Track A.2 - AlertCooldownService', () => {
  beforeEach(() => {
    AlertCooldownService.clear();
  });

  it('Ilk alert izin verir', () => {
    const result = AlertCooldownService.canAlert('memory');
    expect(result.allowed).toBe(true);
  });

  it('Cooldown aktifken engeller', () => {
    AlertCooldownService.setCooldown('memory', 60000);
    const result = AlertCooldownService.canAlert('memory');
    expect(result.allowed).toBe(false);
    expect(result.remainingMs).toBeGreaterThan(0);
  });

  it('Trigger cooldown baslatir', () => {
    const result = AlertCooldownService.trigger('cpu', 60000);
    expect(result.allowed).toBe(true);
    const second = AlertCooldownService.canAlert('cpu');
    expect(second.allowed).toBe(false);
  });

  it('Farkli keyler bagimsiz', () => {
    AlertCooldownService.setCooldown('memory', 60000);
    const result = AlertCooldownService.canAlert('cpu');
    expect(result.allowed).toBe(true);
  });
});
