// src/domain/morphology/rootAffixes.ts
// Kök kaydındaki etimoloji metninden ("е- + [у] + -э + -н") önek/sonek çıkarır
// ve lehçe varyantlarındaki boşlukları kök kaydından doldurur.
// NOT: page.tsx önekin sonuna kendisi "-" ekler, bu yüzden önek morfemi tiresiz verilir.
// Sonek morfemi tireli kalır ("-э"), UI olduğu gibi gösterir.

export interface AffixItem {
  morpheme: string;
  gloss: string;
  code?: string;
  slot?: string;
}

export function parseEtymologyAffixes(etymology?: string): {
  prefixes: AffixItem[];
  suffixes: AffixItem[];
} {
  const prefixes: AffixItem[] = [];
  const suffixes: AffixItem[] = [];
  if (!etymology) return { prefixes, suffixes };

  const parts = etymology
    .split("+")
    .map((p) => p.trim())
    .filter(Boolean);

  for (const part of parts) {
    if (part.startsWith("[")) continue; // epentez / kök parçası
    if (part.endsWith("-") && !part.startsWith("-")) {
      prefixes.push({ morpheme: part.replace(/-+$/, ""), gloss: "" });
    } else if (part.startsWith("-") && !part.endsWith("-")) {
      suffixes.push({ morpheme: part, gloss: "" });
    }
  }
  return { prefixes, suffixes };
}

// Kelime formu kökün kendisiyse, kök kaydındaki etimolojiden ekleri al.
export function affixesFromRoot(lexeme: any, root: any) {
  if (!lexeme || !root || lexeme.form !== root.form) {
    return { prefixes: [] as AffixItem[], suffixes: [] as AffixItem[] };
  }
  return parseEtymologyAffixes(root.etymology);
}

// Boş lehçe alanlarını (yalnızca aynı formdaki) kök kaydından doldur. Tahmin üretmez.
export function fillDialectVariants(lexeme: any, root: any) {
  const dv: Record<string, string> = { ...(lexeme?.dialectVariants || {}) };
  if (root && lexeme && root.form === lexeme.form && root.dialectVariants) {
    for (const key of ["adyghe", "kabardian"]) {
      if (!dv[key] && root.dialectVariants[key]) dv[key] = root.dialectVariants[key];
    }
  }
  return dv;
}

// Kelime ailesinden formu olmayan (kırık referans) kayıtları ele.
export function cleanWordFamily(family: any[]) {
  return (family || []).filter((w) => w && w.form);
}