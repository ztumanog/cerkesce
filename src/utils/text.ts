export function parseNodeLabel(rawLabel: string, fallbackId: string) {
  const text = String(rawLabel || fallbackId || '').trim();
  const conceptMatch = text.match(/^(.*?)\s*\[([A-Z0-9_-]+)\]$/);
  if (conceptMatch) return { primary: conceptMatch[1].trim() || conceptMatch[2], secondary: conceptMatch[2] };
  const parenMatch = text.match(/^([^(]+?)\s*\(([^)]+)\)$/);
  if (parenMatch) return { primary: parenMatch[1].trim(), secondary: parenMatch[2].trim() };
  return { primary: text, secondary: /^[A-Z0-9_-]{3,}$/.test(text) ? 'Kavram' : '' };
}

export function clip(str: string, max: number): string { 
  return str.length <= max ? str : `${str.slice(0, max - 1)}…`; 
}

export function splitHighlight(text: string, q: string) {
  if (!q) return [{ t: text, m: false }];
  const i = text.toLowerCase().indexOf(q);
  if (i < 0) return [{ t: text, m: false }];
  return [
    { t: text.slice(0, i), m: false },
    { t: text.slice(i, i + q.length), m: true },
    { t: text.slice(i + q.length), m: false },
  ].filter((p) => p.t.length > 0);
}