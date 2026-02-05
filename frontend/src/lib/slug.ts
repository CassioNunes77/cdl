/**
 * Gera slug a partir do título.
 * Remove acentos, lowercase, espaços/símbolos → hífens.
 */
export function slugify(title: string): string {
  if (!title?.trim()) return '';
  return title
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Gera slug único quando há itens existentes com mesmo slug base.
 */
export function slugifyUnique(title: string, existingSlugs: string[], currentSlug?: string): string {
  const base = slugify(title);
  if (!base) return '';
  const current = currentSlug ? slugify(currentSlug) : null;
  const others = existingSlugs.filter((s) => s && s !== current);
  if (!others.includes(base)) return base;
  let n = 1;
  while (others.includes(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
