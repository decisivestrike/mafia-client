import { BASE_URL } from '../env';

/** Добавляет baseUrl */
export function fetchApi(endpoint: string, init?: RequestInit) {
  return fetch(new URL(endpoint, `http://${BASE_URL}`), init);
}
