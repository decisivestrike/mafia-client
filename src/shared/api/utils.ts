const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

/** Добавляет baseUrl */
export function fetchApi(endpoint: string, init?: RequestInit) {
  return fetch(new URL(endpoint, BASE_URL), init);
}
