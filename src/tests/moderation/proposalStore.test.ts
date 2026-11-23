/**
 * Moderasyon kalıcılık testleri (Görev: moderasyon kalıcılığı).
 *
 * Kapsam:
 * - proposalStore: dosya okuma (bozuk/geçersiz kayıt filtresi), yazma (.bak yedeği)
 * - CollaborativeModerationService.restoreState/listProposals (dosya → bellek)
 * - /api/moderasyon rotası uçtan uca: POST öneri dosyaya yazılır, PATCH geçiş
 *   kalıcılaşır, iş kuralları (mükerrer ID, yazar≠moderatör) korunur.
 *
 * Gerçek dosyalar fs mock'u ile değiştirilir (bulk-route.test.ts deseni).
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import path from "path";

const PROPOSALS_PATH = path.join(process.cwd(), "public/data/linguistic/moderation_proposals.json");

let writes: Record<string, string> = {};

function installFsMocks(files: Record<string, string>) {
  writes = {};
  const realStat = fs.statSync.bind(fs);
  const realRead = fs.readFileSync.bind(fs);
  const realExists = fs.existsSync.bind(fs);
  vi.spyOn(fs, "readFileSync").mockImplementation(((p: any, ...rest: any[]) => {
    const key = String(p);
    if (key in files) return files[key];
    return realRead(p, ...rest);
  }) as any);
  vi.spyOn(fs, "writeFileSync").mockImplementation(((p: any, content: any) => {
    writes[String(p)] = String(content);
  }) as any);
  vi.spyOn(fs, "copyFileSync").mockImplementation(((from: any, to: any) => {
    writes[String(to)] = String(files[String(from)] ?? "");
  }) as any);
  vi.spyOn(fs, "existsSync").mockImplementation(((p: any) => {
    const key = String(p);
    // PROPOSALS_PATH gercek dosyasi ASLA okunmamali - test izolasyonu.
    // (Uretimde dosya gercekten varsa - or. arayuzden gonderilmis oneri -
    // mock donusu olmasa yukleme gercek dosyadan yapilir ve test kirilir.)
    if (key === PROPOSALS_PATH) return key in files;
    return key in files || realExists(p);
  }) as any);
  vi.spyOn(fs, "statSync").mockImplementation(((p: any, ...rest: any[]) => {
    const key = String(p);
    if (key in files) return { mtimeMs: key.length + files[key].length };
    return realStat(p, ...rest);
  }) as any);
}

async function callRoute(method: string, body?: unknown, query = "") {
  const { PATCH, POST, GET } = await import("../../../app/api/moderasyon/route");
  const fn = method === "POST" ? POST : method === "PATCH" ? PATCH : GET;
  const res = await fn(
    new Request(`http://localhost/api/moderasyon${query}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }) as any
  );
  return { status: res.status, json: await res.json() };
}

const validProposal = {
  proposalId: "prop-001",
  conceptId: "HOUSE",
  proposedLabel: "унэ",
  author: "zeki",
  status: "PENDING",
};

describe("proposalStore", () => {
  beforeEach(async () => {
    vi.restoreAllMocks();
    const { CollaborativeModerationService } = await import("../../domain/collaboration/services/CollaborativeModerationService");
    CollaborativeModerationService.clear();
  });

  it("dosya yoksa boş liste döner", async () => {
    installFsMocks({});
    const { loadProposals } = await import("../../lib/moderation/proposalStore");
    expect(loadProposals()).toEqual([]);
  });

  it("geçersiz kayıtlar filtrelenir, geçerliler yüklenir", async () => {
    installFsMocks({
      [PROPOSALS_PATH]: JSON.stringify([
        validProposal,
        { proposalId: "", status: "PENDING" }, // boş ID
        { proposalId: "x", status: "HACKED" }, // geçersiz status
        "metin", // obje değil
      ]),
    });
    const { loadProposals } = await import("../../lib/moderation/proposalStore");
    const list = loadProposals();
    expect(list).toHaveLength(1);
    expect(list[0].proposalId).toBe("prop-001");
  });

  it("restoreState + listProposals: dosya durumu servis üzerinden listelenir", async () => {
    installFsMocks({ [PROPOSALS_PATH]: JSON.stringify([validProposal]) });
    const { hydrateService } = await import("../../lib/moderation/proposalStore");
    const { CollaborativeModerationService } = await import("../../domain/collaboration/services/CollaborativeModerationService");
    hydrateService();
    const list = CollaborativeModerationService.listProposals();
    expect(list).toHaveLength(1);
    expect(list[0].proposedLabel).toBe("унэ");
  });
});

describe("/api/moderasyon — kalıcılık uçtan uca", () => {
  beforeEach(async () => {
    vi.restoreAllMocks();
    const { CollaborativeModerationService } = await import("../../domain/collaboration/services/CollaborativeModerationService");
    CollaborativeModerationService.clear();
    installFsMocks({});
  });

  it("POST: öneri dosyaya yazılır", async () => {
    const { status, json } = await callRoute("POST", {
      proposalId: "prop-100",
      conceptId: "SEA",
      proposedLabel: "хы",
      author: "ayse",
    });
    expect(status).toBe(201);
    expect(json.proposal.status).toBe("PENDING");
    const saved = JSON.parse(writes[PROPOSALS_PATH]);
    expect(saved).toHaveLength(1);
    expect(saved[0].proposalId).toBe("prop-100");
  });

  it("POST mükerrer ID reddedilir, dosya yazılmaz", async () => {
    installFsMocks({
      [PROPOSALS_PATH]: JSON.stringify([{ ...validProposal, proposalId: "prop-dup" }]),
    });
    const { status, json } = await callRoute("POST", {
      proposalId: "prop-dup",
      conceptId: "SEA",
      proposedLabel: "хы",
      author: "ayse",
    });
    expect(status).toBe(400);
    expect(json.error).toContain("prop-dup");
    expect(writes[PROPOSALS_PATH]).toBeUndefined();
  });

  it("PATCH: onay kalıcılaşır ve yazar kendi önerisini değiştiremez", async () => {
    installFsMocks({
      [PROPOSALS_PATH]: JSON.stringify([{ ...validProposal, author: "zeki" }]),
    });
    // yazar = moderatör → reddedilmeli
    const self = await callRoute("PATCH", { proposalId: "prop-001", action: "APPROVED", moderatorId: "zeki" });
    expect(self.status).toBe(400);
    // başka moderatör → onaylanmalı
    const ok = await callRoute("PATCH", { proposalId: "prop-001", action: "APPROVED", moderatorId: "mod-9" });
    expect(ok.status).toBe(200);
    expect(ok.json.proposal.status).toBe("APPROVED");
    const saved = JSON.parse(writes[PROPOSALS_PATH]);
    expect(saved[0].status).toBe("APPROVED");
  });

  it("GET: liste dosyadan döner", async () => {
    installFsMocks({ [PROPOSALS_PATH]: JSON.stringify([validProposal]) });
    const { status, json } = await callRoute("GET", undefined, "");
    expect(status).toBe(200);
    expect(json.proposals).toHaveLength(1);
  });
});
