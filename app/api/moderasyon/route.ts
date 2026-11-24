import { NextRequest, NextResponse } from 'next/server';
import { CollaborativeModerationService } from '@/domain/collaboration/services/CollaborativeModerationService';
import { hydrateService, saveProposals } from '@/lib/moderation/proposalStore';

/**
 * Moderasyon API — kalıcılık katmanının tek girişi.
 *
 * Görev: moderasyon kalıcılığı. Sayfa daha önce servisi client'ta doğrudan
 * çağırıyordu (tarayıcı belleği — yenilemede kayıp). Artık tüm işlemler bu
 * rotadan geçer: dosyadan yüklenir (hydrate), servisin iş kuralları uygulanır,
 * sonuç dosyaya yazılır (.bak yedeğiyle).
 *
 * İş kuralları serviste (tek otorite): mükerrer ID yasak, yalnız PENDING
 * geçebilir, yazar kendi önerisini moderasyonla değiştiremez.
 */

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  hydrateService();
  if (id) {
    const proposal = CollaborativeModerationService.getProposal(id);
    if (!proposal) return NextResponse.json({ error: 'bulunamadi' }, { status: 404 });
    return NextResponse.json(proposal);
  }
  return NextResponse.json({ proposals: CollaborativeModerationService.listProposals() });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'geçersiz gövde' }, { status: 400 });
  }
  hydrateService();
  try {
    // Öneri numarası istemciden gelmezse otomatik üretilir (Kelime Öner formu ID istemez).
    const proposalId =
      typeof body.proposalId === 'string' && body.proposalId.trim()
        ? body.proposalId.trim()
        : `prop-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const created = CollaborativeModerationService.submitProposal({
      ...body,
      proposalId,
      createdAt: new Date().toISOString(),
    });
    const backup = saveProposals(CollaborativeModerationService.listProposals());
    return NextResponse.json({ proposal: created, backup }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'öneri oluşturulamadı' }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const { proposalId, action, moderatorId } = body || {};
  if (!proposalId || !moderatorId || (action !== 'APPROVED' && action !== 'REJECTED')) {
    return NextResponse.json(
      { error: 'proposalId, moderatorId ve action (APPROVED|REJECTED) gerekli' },
      { status: 400 }
    );
  }
  hydrateService();
  try {
    const updated =
      action === 'APPROVED'
        ? CollaborativeModerationService.approveProposal(proposalId, moderatorId)
        : CollaborativeModerationService.rejectProposal(proposalId, moderatorId);
    if (!updated) return NextResponse.json({ error: 'bulunamadi' }, { status: 404 });
    const backup = saveProposals(CollaborativeModerationService.listProposals());
    return NextResponse.json({ proposal: updated, backup });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'geçiş uygulanamadı' }, { status: 400 });
  }
}
