export type ProposalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ConceptProposal {
  proposalId: string;
  conceptId: string;
  proposedLabel: string;
  /** Önerilen kelimenin Türkçe karşılığı (isteğe bağlı; Kelime Öner formundan gelir) */
  meaning?: string;
  /** Gönderim zamanı (ISO) — Günlük Özet'in "bugün gelen öneri" sayımı için */
  createdAt?: string;
  author: string;
  status: ProposalStatus;
}

export class CollaborativeModerationService {
  private static proposals = new Map<string, ConceptProposal>();

  public static submitProposal(
    proposal: Omit<ConceptProposal, 'status'>
  ): ConceptProposal {
    if (CollaborativeModerationService.proposals.has(proposal.proposalId)) {
      throw new Error(`Öneri zaten mevcut: ${proposal.proposalId}`);
    }
    const created: ConceptProposal = { ...proposal, status: 'PENDING' };
    CollaborativeModerationService.proposals.set(created.proposalId, created);
    return { ...created };
  }

  public static approveProposal(
    proposalId: string,
    moderatorId: string
  ): ConceptProposal | undefined {
    return CollaborativeModerationService.transition(proposalId, 'APPROVED', moderatorId);
  }

  public static rejectProposal(
    proposalId: string,
    moderatorId: string
  ): ConceptProposal | undefined {
    return CollaborativeModerationService.transition(proposalId, 'REJECTED', moderatorId);
  }

  public static getProposal(proposalId: string): ConceptProposal | undefined {
    const proposal = CollaborativeModerationService.proposals.get(proposalId);
    return proposal ? { ...proposal } : undefined;
  }

  /**
   * Tüm önerilerin kopyasını döndürür (kalıcılık katmanı ve liste uçları için).
   * Görev: moderasyon kalıcılığı — bellek-içi Map'ten dosyaya senkronizasyon.
   */
  public static listProposals(): ConceptProposal[] {
    return Array.from(CollaborativeModerationService.proposals.values()).map((p) => ({ ...p }));
  }

  /**
   * Kalıcı depodan yüklenen durumu hizmete geri yükler (dosya → bellek).
   * Yalnızca proposalId'si geçerli kayıtlar kabul edilir; iş kuralları değişmez.
   */
  public static restoreState(proposals: ConceptProposal[]): void {
    CollaborativeModerationService.proposals.clear();
    for (const p of proposals) {
      if (p && typeof p.proposalId === 'string' && p.proposalId) {
        CollaborativeModerationService.proposals.set(p.proposalId, { ...p });
      }
    }
  }

  public static clear(): void {
    CollaborativeModerationService.proposals.clear();
  }

  private static transition(
    proposalId: string,
    next: Exclude<ProposalStatus, 'PENDING'>,
    moderatorId: string
  ): ConceptProposal | undefined {
    const proposal = CollaborativeModerationService.proposals.get(proposalId);
    if (!proposal) return undefined;

    if (proposal.status !== 'PENDING') {
      throw new Error(`Yalnızca PENDING öneriler değiştirilebilir (mevcut: ${proposal.status})`);
    }
    if (moderatorId === proposal.author) {
      throw new Error('Yazar kendi önerisini moderasyonla değiştiremez');
    }

    proposal.status = next;
    return { ...proposal };
  }
}
