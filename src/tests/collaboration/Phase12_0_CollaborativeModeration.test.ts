import { describe, it, expect, beforeEach } from 'vitest';
import { CollaborativeModerationService } from '../../domain/collaboration/services/CollaborativeModerationService';

describe('Phase 12.0 - Collaborative Editing & Moderation Certification', () => {
  beforeEach(() => {
    CollaborativeModerationService.clear();
  });

  it('MOD-001: Manages concept change proposals and approval workflow', () => {
    const proposal = CollaborativeModerationService.submitProposal({
      proposalId: 'prop_001',
      conceptId: 'CONCEPT_TREE',
      proposedLabel: 'Чъыгъ',
      author: 'editor_user'
    });

    expect(proposal.status).toBe('PENDING');

    const approved = CollaborativeModerationService.approveProposal('prop_001');
    expect(approved?.status).toBe('APPROVED');
  });
});