import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * ADR-GOV-016 — Seçenek C: Governance Auto Refresh (operasyonel tamamlayıcı).
 *
 * Kürasyon kaydetme akışı lexemes.json'u değiştirdiğinde governance raporları
 * arka planda (fire-and-forget) yeniden üretilir. UI hesap yapmaz (RULE-05);
 * üretici yalnızca repo içinde sürümlü scripts/report-governance.mjs'dir
 * (RULE-04).
 *
 * - Debounce: birbirini izleyen kaydetmeler tek yenilemeye toplanır.
 * - Kaydetme akışı asla bloklanmaz; yenileme hatası kaydetmeyi etkilemez.
 * - Dağıtım ortamında (Vercel) rapor repo'dan gelen JSON ile servis edilir;
 *   script yoksa veya yazma başarısızsa sessizce atlanır.
 */

const REFRESH_DELAY_MS = 5000;
let pendingTimer: ReturnType<typeof setTimeout> | null = null;

export function scheduleReportRefresh(delayMs: number = REFRESH_DELAY_MS): void {
  if (pendingTimer !== null) {
    clearTimeout(pendingTimer);
  }
  pendingTimer = setTimeout(() => {
    pendingTimer = null;
    try {
      const script = path.join(process.cwd(), 'scripts', 'report-governance.mjs');
      if (!fs.existsSync(script)) return; // dağıtım ortamı: sessizce geç
      const child = spawn(process.execPath, [script], {
        detached: true,
        stdio: 'ignore',
      });
      child.unref();
    } catch {
      // Rapor yenileme başarısız olsa da kaydetme akışı etkilenmez.
      // Bayatlık, ekranlardaki bayatlık göstergesi (Seçenek D) ile görünür kalır.
    }
  }, delayMs);
}
