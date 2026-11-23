// Curation dogrulama - KARAR-16 kurallarinin TEK OTORITESI.
// Hem istemci (admin/curation/single) hem sunucu (api/curation/bulk) bu modulu kullanir;
// kural tekrarlari (inline regex) yazilmaz.
//
// Kurallar (yalnizca giriste belirtilen alanlar icin calisir - undefined alan denetlenmez):
// - root / family / concept (form baglami): bos olamaz
// - tr: kelime ortasinda ? yasak: a?g?z -> hata; sondaki soru (Ne? / Kim? / aday?) serbest
// - literalMeaning / notes: <<...>> capraz referanslari yok sayilir, gercek / yarim HTML hata
// - conceptId: bos olamaz; allowedConcepts verildiyse turetilmis kavram listesinde olmalidir

export type CurationIssue = {
  field: string;
  message: string;
  severity: "error" | "warning";
};

export type CurationInput = {
  root?: string;
  family?: string;
  concept?: string;
  tr?: string;
  literalMeaning?: string;
  notes?: string;
  conceptId?: string;
  allowedConcepts?: readonly string[];
};

const MID_WORD_Q = /[A-Za-zÇĞİÖŞÜçğıöşü]\?[A-Za-zÇĞİÖŞÜçğıöşü]/;
const HTML_TAG = /<\/?[A-Za-z][^>]*>?|<div|<span|<\/fon|<\/div|<\/span/i;

function stripCrossRefs(s: string): string {
  return s.replace(/<<[^>]*>>/g, "");
}

export function validateCuration(input: CurationInput): CurationIssue[] {
  const issues: CurationIssue[] = [];

  if (input.root !== undefined && !String(input.root ?? "").trim()) {
    issues.push({ field: "root", message: "Kok bos olamaz", severity: "error" });
  }
  if (input.family !== undefined && !String(input.family ?? "").trim()) {
    issues.push({ field: "family", message: "Aile bos olamaz", severity: "error" });
  }
  if (input.concept !== undefined && !String(input.concept ?? "").trim()) {
    issues.push({ field: "concept", message: "Kavram bos olamaz", severity: "error" });
  }

  if (input.tr !== undefined) {
    const tr = String(input.tr ?? "");
    if (MID_WORD_Q.test(tr)) {
      issues.push({ field: "tr", message: "tr'de kelime ortasinda ? var (a?g?z gibi). Sondaki soru (Ne?, Kim?) serbest.", severity: "error" });
    }
  }

  for (const field of ["literalMeaning", "notes"] as const) {
    if (input[field] === undefined) continue;
    const cleaned = stripCrossRefs(String(input[field] ?? ""));
    if (HTML_TAG.test(cleaned)) {
      issues.push({ field, message: `${field} icinde gercek / yarim HTML var (<<...>> sayilmaz)`, severity: "error" });
    }
  }

  if (input.conceptId !== undefined) {
    const cid = input.conceptId == null ? "" : String(input.conceptId).trim();
    if (!cid) {
      issues.push({ field: "conceptId", message: "conceptId bos olamaz", severity: "error" });
    } else if (input.allowedConcepts && input.allowedConcepts.length > 0 && !input.allowedConcepts.includes(cid)) {
      issues.push({ field: "conceptId", message: `conceptId turetilmis kavram listesinde yok: ${cid}`, severity: "error" });
    }
  }

  return issues;
}

export function isCurationValid(input: CurationInput): boolean {
  return validateCuration(input).every((i) => i.severity !== "error");
}

