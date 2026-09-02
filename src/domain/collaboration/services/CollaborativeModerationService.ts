export interface ConceptProposal {
  proposalId: string;
  conceptId: string;
  proposedLabel: string;
  author: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export class CollaborativeModerationService {
  private static proposals = new Map<string, ConceptProposal>();

  public static submitProposal(proposal: Omit<ConceptProposal, 'status'>): ConceptProposal {
    const created: ConceptProposal = { ...proposal, status: 'PENDING' };
    this.proposals.set(proposal.proposalId, created);
    return created;
  }

  public static approveProposal(proposalId: string): ConceptProposal | undefined {
    const proposal = this.proposals.get(proposalId);
    if (proposal) {
      proposal.status = 'APPROVED';
    }
    return proposal;
  }

  public static getProposal(proposalId: string): ConceptProposal | undefined {
    return this.proposals.get(proposalId);
  }

  public static clear(): void {
    this.proposals.clear();
  }
}