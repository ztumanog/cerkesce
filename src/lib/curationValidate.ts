// Curation dogrulama - dictionarySchema'dan ayri, kok -> aile -> kavram tutarliligi icin
// Kurallar:
// - root / family / concept bos olamaz
// - tr'de ? sadece kelime ortasinda yasak: a?g?z -> hata, Ne? / Kim? / aday? -> serbest
// - literalMeaning'de <<...>> capraz referanslar yok sayilir, gercek / yarim HTML (<div, <span, </fon) hata

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
};

const MID_WORD_Q = /[A-Za-zÇĞİÖŞÜçğıöşü]\?[A-Za-zÇĞİÖŞÜçğıöşü]/;
const HTML_TAG = /<\/?[A-Za-z][^>]*>?|<div|<span|<\/fon|<\/div|<\/span/i;

function stripCrossRefs(s: string): string {
  return s.replace(/<<[^>]*>>/g, "");
}

export function validateCuration(input: CurationInput): CurationIssue[] {
  const issues: CurationIssue[] = [];
  if (!String(input.root || "").trim()) {
    issues.push({ field: "root", message: "Kok bos olamaz", severity: "error" });
  }
  if (!String(input.family || "").trim()) {
    issues.push({ field: "family", message: "Aile bos olamaz", severity: "error" });
  }
  if (!String(input.concept || "").trim()) {
    issues.push({ field: "concept", message: "Kavram bos olamaz", severity: "error" });
  }
  const tr = String(input.tr || "");
  if (MID_WORD_Q.test(tr)) {
    issues.push({ field: "tr", message: "trde kelime ortasinda ? var (a?g?z gibi). Sondaki soru (Ne?, Kim?) serbest.", severity: "error" });
  }
  for (const field of ["literalMeaning", "notes"] as const) {
    const val = String(input[field] || "");
    const cleaned = stripCrossRefs(val);
    if (HTML_TAG.test(cleaned)) {
      issues.push({ field, message: `${field} icinde gercek / yarim HTML var (<<...>> sayilmaz)`, severity: "error" });
    }
  }
  return issues;
}

export function isCurationValid(input: CurationInput): boolean {
  return validateCuration(input).every((i) => i.severity !== "error");
}
