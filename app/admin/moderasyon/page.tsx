"use client";

import { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Theme, Card, Badge, Button, TextField, Callout, Table, Flex, Text, Heading, Box } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { CollaborativeModerationService, ConceptProposal } from "@/domain/collaboration/services/CollaborativeModerationService";

export default function ModerasyonPage() {
  const [proposals, setProposals] = useState<ConceptProposal[]>([]);
  const [form, setForm] = useState({ proposalId: "", conceptId: "", proposedLabel: "", author: "" });
  const [moderatorId, setModeratorId] = useState("mod-1");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [confirm, setConfirm] = useState<{ id: string; action: "APPROVED" | "REJECTED" } | null>(null);

  const stats = useMemo(() => ({
    total: proposals.length,
    pending: proposals.filter(p => p.status === "PENDING").length,
    approved: proposals.filter(p => p.status === "APPROVED").length,
    rejected: proposals.filter(p => p.status === "REJECTED").length,
  }), [proposals]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const submit = () => {
    setError("");
    if (!form.proposalId || !form.conceptId || !form.proposedLabel || !form.author) {
      setError("Tüm alanlar gerekli");
      return;
    }
    try {
      const created = CollaborativeModerationService.submitProposal(form);
      setProposals([...proposals, created]);
      setForm({ proposalId: "", conceptId: "", proposedLabel: "", author: "" });
      showToast(`Oluşturuldu: ${created.proposalId}`);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleTransition = () => {
    if (!confirm) return;
    try {
      const fn = confirm.action === "APPROVED" ? CollaborativeModerationService.approveProposal : CollaborativeModerationService.rejectProposal;
      const updated = fn(confirm.id, moderatorId);
      if (updated) {
        setProposals(proposals.map(p => p.proposalId === confirm.id ? updated : p));
        showToast(`${confirm.id} -> ${confirm.action}`);
      }
    } catch (e: any) {
      setError(e.message);
    }
    setConfirm(null);
  };

  return (
    <Theme accentColor="violet" radius="large" appearance="light">
      <div className="min-h-screen bg-gray-50 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold">Moderasyon Paneli</h1>
            <p className="text-sm text-gray-500">Çerkesçe Sözlük - Faz 12 · Topluluk Önerileri</p>
          </div>
          <div className="flex gap-3 items-center">
            <Badge color="violet" variant="soft">Canlı</Badge>
            <div className="w-36"><TextField.Root placeholder="mod-1" value={moderatorId} onChange={e => setModeratorId(e.target.value)} /></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card><Flex justify="between" align="center"><Box><Text size="2" color="gray">Toplam</Text><Heading size="6">{stats.total}</Heading></Box><Badge color="violet" size="2">{stats.total}</Badge></Flex></Card>
          <Card><Flex justify="between" align="center"><Box><Text size="2" color="gray">Bekleyen</Text><Heading size="6">{stats.pending}</Heading></Box><Badge color="yellow" size="2">{stats.pending}</Badge></Flex></Card>
          <Card><Flex justify="between" align="center"><Box><Text size="2" color="gray">Onaylanan</Text><Heading size="6">{stats.approved}</Heading></Box><Badge color="green" size="2">{stats.approved}</Badge></Flex></Card>
          <Card><Flex justify="between" align="center"><Box><Text size="2" color="gray">Reddedilen</Text><Heading size="6">{stats.rejected}</Heading></Box><Badge color="red" size="2">{stats.rejected}</Badge></Flex></Card>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Card>
              <Heading size="4" mb="4">Yeni Öneri</Heading>
              <Flex direction="column" gap="3">
                <TextField.Root placeholder="proposalId (örn: prop-001)" value={form.proposalId} onChange={e => setForm({ ...form, proposalId: e.target.value })} />
                <TextField.Root placeholder="conceptId (örn: concept-ev)" value={form.conceptId} onChange={e => setForm({ ...form, conceptId: e.target.value })} />
                <TextField.Root placeholder="proposedLabel (örn: унэ)" value={form.proposedLabel} onChange={e => setForm({ ...form, proposedLabel: e.target.value })} />
                <TextField.Root placeholder="author (örn: zeki)" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                {error && <Callout.Root color="red"><Callout.Text>{error}</Callout.Text></Callout.Root>}
                <Button onClick={submit} size="3" className="w-full">Öneri Gönder</Button>
              </Flex>
            </Card>
            {toast && <div className="mt-3"><Callout.Root color="green"><Callout.Text>{toast}</Callout.Text></Callout.Root></div>}
          </div>

          <div className="col-span-8">
            <Card>
              <Flex justify="between" align="center" mb="4">
                <Heading size="4">Öneriler ({proposals.length})</Heading>
                <Badge variant="soft">{proposals.length} kayıt</Badge>
              </Flex>
              {proposals.length === 0 ? (
                <div className="py-16 text-center bg-gray-50 rounded-lg border border-dashed">
                  <Text color="gray">Henüz öneri yok. Soldan yeni öneri oluştur.</Text>
                </div>
              ) : (
                <Table.Root variant="surface">
                  <Table.Header><Table.Row><Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell><Table.ColumnHeaderCell>Concept</Table.ColumnHeaderCell><Table.ColumnHeaderCell>Label</Table.ColumnHeaderCell><Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell><Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell><Table.ColumnHeaderCell>İşlem</Table.ColumnHeaderCell></Table.Row></Table.Header>
                  <Table.Body>
                    {proposals.map(p => (
                      <Table.Row key={p.proposalId}>
                        <Table.Cell><Text weight="bold">{p.proposalId}</Text></Table.Cell>
                        <Table.Cell>{p.conceptId}</Table.Cell>
                        <Table.Cell><Badge variant="soft">{p.proposedLabel}</Badge></Table.Cell>
                        <Table.Cell>{p.author}</Table.Cell>
                        <Table.Cell><Badge color={p.status === "PENDING" ? "yellow" : p.status === "APPROVED" ? "green" : "red"}>{p.status}</Badge></Table.Cell>
                        <Table.Cell>
                          <Flex gap="2">
                            <Button size="1" color="green" variant="soft" disabled={p.status !== "PENDING"} onClick={() => setConfirm({ id: p.proposalId, action: "APPROVED" })}>Onayla</Button>
                            <Button size="1" color="red" variant="soft" disabled={p.status !== "PENDING"} onClick={() => setConfirm({ id: p.proposalId, action: "REJECTED" })}>Reddet</Button>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              )}
            </Card>
          </div>
        </div>

        <Dialog.Root open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
            <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-[420px] shadow-2xl z-50">
              <Heading size="4">{confirm?.action === "APPROVED" ? "Onaylıyor musun?" : "Reddediyor musun?"}</Heading>
              <Text as="div" mt="3" size="2" color="gray">{confirm?.id} önerisini {confirm?.action === "APPROVED" ? "onaylamak" : "reddetmek"} üzeresin. Moderatör: {moderatorId}</Text>
              <Flex gap="3" mt="5" justify="end">
                <Dialog.Close asChild><Button variant="soft" color="gray">İptal</Button></Dialog.Close>
                <Button color={confirm?.action === "APPROVED" ? "green" : "red"} onClick={handleTransition}>{confirm?.action === "APPROVED" ? "Onayla" : "Reddet"}</Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </Theme>
  );
}