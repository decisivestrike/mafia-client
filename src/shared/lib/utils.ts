/** Конкатенация имен классов */
export function cn(...parts: (string | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
