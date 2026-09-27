const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

/** Возвращает полный URL */
export function url(input: `/${string}`): string {
  const u = `${baseUrl}${input}`;
  console.log(u);
  return u;
}
