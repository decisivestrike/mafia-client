export function concat(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}
