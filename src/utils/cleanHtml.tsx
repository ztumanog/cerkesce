const ENTITY_MAP: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&cent;": "¢",
  "&pound;": "£",
  "&yen;": "¥",
  "&euro;": "€",
  "&copy;": "©",
  "&reg;": "®",
};

export function temizleHtml(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  let text = html
    .replace(/<\/(?:h[1-6]|p|div|li|tr)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  text = text.replace(/<[^>]*>/g, "");

  text = text.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    if (ENTITY_MAP[entity]) {
      return ENTITY_MAP[entity];
    }

    if (entity.startsWith("&#") && !entity.startsWith("&#x")) {
      const code = parseInt(entity.slice(2, -1), 10);
      return !isNaN(code) ? String.fromCharCode(code) : entity;
    }

    if (entity.startsWith("&#x")) {
      const code = parseInt(entity.slice(3, -1), 16);
      return !isNaN(code) ? String.fromCharCode(code) : entity;
    }

    return entity;
  });

  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n/g, "\n\n")
    .trim();
}