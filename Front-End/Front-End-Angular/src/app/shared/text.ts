/** Divide descripciones guardadas como "item; item; item" en una lista. */
export function toBullets(text?: string | null): string[] {
  if (!text) return [];
  return text
    .split(/;|\n/)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter(Boolean);
}

/** Divide un texto en párrafos usando los saltos de línea del original. */
export function toParagraphs(text?: string | null): string[] {
  if (!text) return [];
  return text.split(/\n+/).map((s) => s.trim()).filter(Boolean);
}

export function safeUrl(url?: string | null): string | null {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}
