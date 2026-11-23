/**
 * Moderasyon önerileri dosya deposu — kalıcılık katmanı.
 *
 * Görev: moderasyon kalıcılığı. CollaborativeModerationService bellek-içi Map
 * kullanıyordu; sayfa yenilenince / sunucu yeniden başlayınca öneriler kayboluyordu.
 * Bu modül durumu public/data/linguistic/moderation_proposals.json'da tutar:
 *
 * - loadProposals(): dosyayı okur, geçerli kayıtları döndürür (bozuk dosya = boş liste)
 * - saveProposals(): .bak yedeği alıp atomik yazar (curation rotalarının deseni)
 *
 * İş kuralları (tek öneri ID'si, yalnız PENDING geçişi, yazar≠moderatör) serviste
 * kalır — bu katman yalnızca saklar. Kullanım: app/api/moderasyon rotası.
 * Sayfa artık servisi doğrudan değil bu rotayı çağırır.
 */

import fs from 'fs';
import path from 'path';
import { CollaborativeModerationService, ConceptProposal } from '@/domain/collaboration/services/CollaborativeModerationService';

const PROPOSALS_PATH = path.join(
  process.cwd(),
  'public/data/linguistic/moderation_proposals.json'
);

const VALID_STATUSES = new Set(['PENDING', 'APPROVED', 'REJECTED']);

function isValidProposal(p: unknown): p is ConceptProposal {
  if (!p || typeof p !== 'object') return false;
  const rec = p as Record<string, unknown>;
  return (
    typeof rec.proposalId === 'string' && rec.proposalId.length > 0 &&
    typeof rec.conceptId === 'string' &&
    typeof rec.proposedLabel === 'string' &&
    typeof rec.author === 'string' &&
    typeof rec.status === 'string' && VALID_STATUSES.has(rec.status)
  );
}

/** Dosyadaki önerileri yükler. Dosya yoksa/bozuksa boş dizi döner. */
export function loadProposals(): ConceptProposal[] {
  try {
    if (!fs.existsSync(PROPOSALS_PATH)) return [];
    const raw = fs.readFileSync(PROPOSALS_PATH, 'utf-8').replace(/^﻿/, '');
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed) ? parsed : parsed?.proposals;
    if (!Array.isArray(list)) return [];
    return list.filter(isValidProposal);
  } catch {
    return [];
  }
}

/**
 * Önerileri dosyaya yazar. Önce .bak yedeği alır (dosya varsa).
 * @returns yedek dosya yolu (yedek alınmadıysa null)
 */
export function saveProposals(proposals: ConceptProposal[]): string | null {
  let backup: string | null = null;
  if (fs.existsSync(PROPOSALS_PATH)) {
    backup = PROPOSALS_PATH + '.bak-' + new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync(PROPOSALS_PATH, backup);
  }
  fs.writeFileSync(PROPOSALS_PATH, JSON.stringify(proposals, null, 2) + '\n', 'utf-8');
  return backup;
}

/**
 * Dosyadaki durumu servise yükler (dosya → bellek). Rota başında çağrılır;
 * böylece servisin iş kuralları dosyadan gelen durum üzerinde çalışır.
 */
export function hydrateService(): void {
  CollaborativeModerationService.restoreState(loadProposals());
}
